/*
 * Tests for scripts/api-compat.ts, the advisory breaking-change classifier.
 *
 * Runs the real script with `--base-dir` / `--head-dir` pointed at small
 * hand-written declaration trees, so no git or tsc emit is involved. Each case
 * changes one thing between base and head and checks the verdict.
 */
import { spawnSync } from 'child_process';
import {
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const SCRIPT = fileURLToPath(new URL('../api-compat.ts', import.meta.url));
const TSX = fileURLToPath(
	new URL('../../node_modules/.bin/tsx', import.meta.url)
);

const WIDGET = `
export type Size = 'small' | 'medium' | 'large';
export interface WidgetData { value: string }
export type ChangeHandler = (event: Event, data: WidgetData) => void;
export interface WidgetProps {
	size?: Size;
	label?: string;
	onChange?: ChangeHandler;
}
declare const Widget: (props: WidgetProps) => null;
export declare const helper: (n: number) => string;
export default Widget;
`;

let dir;

const write = (side, files) => {
	for (const [file, text] of Object.entries(files)) {
		const path = join(dir, side, file);
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, text);
	}
};

const run = (env = {}) =>
	spawnSync(
		TSX,
		[
			SCRIPT,
			'--base-dir',
			join(dir, 'base'),
			'--head-dir',
			join(dir, 'head'),
			...(env.GITHUB_ACTIONS ? [] : ['--json']),
		],
		{
			encoding: 'utf8',
			env: { ...process.env, GITHUB_ACTIONS: '', ...env },
		}
	);

const findings = () => JSON.parse(run().stdout).findings;
const verdictOf = (symbol, all = findings()) =>
	all.find((f) => f.symbol === symbol);

/** Base is WIDGET; head is WIDGET with `edit` applied. */
const change = (edit) => {
	write('base', { 'components/widget/index.d.ts': WIDGET });
	write('head', { 'components/widget/index.d.ts': edit(WIDGET) });
};

beforeEach(() => {
	dir = mkdtempSync(join(tmpdir(), 'api-compat-test-'));
});

afterEach(() => {
	rmSync(dir, { recursive: true, force: true });
});

describe('api-compat', () => {
	it('reports nothing when the API is unchanged', () => {
		change((s) => s);
		expect(findings()).toEqual([]);
	});

	it('flags a removed export as breaking', () => {
		change((s) => s.replace(/^export declare const helper.*$/m, ''));
		expect(verdictOf('helper')).toMatchObject({
			verdict: 'breaking',
			reason: 'Export removed.',
		});
	});

	it('flags a removed import path as breaking', () => {
		write('base', {
			'components/widget/index.d.ts': WIDGET,
			'components/gone.d.ts': 'export declare const g: 1;\n',
		});
		write('head', { 'components/widget/index.d.ts': WIDGET });
		expect(findings()).toContainEqual(
			expect.objectContaining({
				verdict: 'breaking',
				entry: 'components/gone',
				symbol: '*',
			})
		);
	});

	it('flags a narrowed prop as breaking for the component', () => {
		change((s) => s.replace(" | 'large'", ''));
		const all = findings();
		expect(verdictOf('default', all)).toMatchObject({
			verdict: 'breaking',
			reason: 'Incompatible props: `size`.',
		});
		expect(verdictOf('Size', all).verdict).toBe('possibly-breaking');
	});

	it('flags a newly required prop as breaking', () => {
		change((s) => s.replace('label?: string', 'label: string'));
		expect(verdictOf('default').reason).toBe(
			'Incompatible props: `label (now required)`.'
		);
	});

	it('flags a removed prop as breaking', () => {
		change((s) => s.replace('label?: string;', ''));
		expect(verdictOf('default')).toMatchObject({
			verdict: 'breaking',
			reason: 'Removed props: `label`.',
		});
	});

	it('flags swapped callback parameters as breaking', () => {
		change((s) =>
			s.replace(
				'(event: Event, data: WidgetData)',
				'(data: WidgetData, event: Event)'
			)
		);
		const all = findings();
		expect(verdictOf('ChangeHandler', all).verdict).toBe('breaking');
		expect(verdictOf('default', all).reason).toBe(
			'Incompatible props: `onChange`.'
		);
	});

	it('flags an added optional prop as additive', () => {
		change((s) =>
			s.replace('label?: string;', 'label?: string; hint?: string;')
		);
		expect(verdictOf('default')).toMatchObject({
			verdict: 'additive',
			reason: 'Added props: `hint`.',
		});
	});

	it('flags a widened function parameter as additive', () => {
		change((s) => s.replace('(n: number)', '(n: number | string)'));
		expect(verdictOf('helper').verdict).toBe('additive');
	});

	it('flags an added export as additive', () => {
		change((s) => s + 'export declare const extra: () => void;\n');
		expect(verdictOf('extra')).toMatchObject({
			verdict: 'additive',
			reason: 'Export added.',
		});
	});

	it('treats a rename of an equivalent alias as no change', () => {
		change((s) =>
			s.replace(
				"export type Size = 'small' | 'medium' | 'large';",
				"type Sizes = 'small' | 'medium' | 'large'; export type Size = Sizes;"
			)
		);
		expect(findings()).toEqual([]);
	});

	it('follows private types referenced by public props', () => {
		const widget = (id) => ({
			'components/widget/index.d.ts': `
import { type Item } from './private/item';
declare const Widget: (props: { items?: Item[] }) => null;
export default Widget;
`,
			'components/widget/private/item.d.ts': `export interface Item { id: ${id} }\n`,
		});
		write('base', widget('string'));
		write('head', widget('number'));
		const all = findings();
		expect(verdictOf('default', all).verdict).toBe('breaking');
		// The private module itself is not an entry point.
		expect(all.every((f) => !f.entry.includes('private'))).toBe(true);
	});

	it('reports a re-exported declaration once, under its own import path', () => {
		const files = (s) => ({
			'components/widget/index.d.ts': s,
			'components/index.d.ts':
				"export { default as Widget } from './widget';\n",
		});
		write('base', files(WIDGET));
		write('head', files(WIDGET.replace('label?: string;', '')));
		const component = findings().filter((f) =>
			f.reason.startsWith('Removed props')
		);
		expect(component).toHaveLength(1);
		expect(component[0]).toMatchObject({
			entry: 'components/widget',
			alsoIn: ['components'],
		});
	});

	it('emits GitHub annotations and never fails', () => {
		change((s) =>
			s.replace('label?: string', 'label: string').replace(" | 'large'", '')
		);
		const summary = join(dir, 'summary.md');
		const result = run({
			GITHUB_ACTIONS: 'true',
			GITHUB_STEP_SUMMARY: summary,
		});
		expect(result.status).toBe(0);
		const lines = result.stdout.split('\n');
		expect(lines).toContainEqual(
			expect.stringMatching(
				/^::warning file=api\/components\/widget\.api\.d\.ts,line=\d+,title=Breaking type change%3A components\/widget → default::Incompatible props/
			)
		);
		const markdown = readFileSync(summary, 'utf8');
		expect(markdown).toContain('### Public type changes');
		expect(markdown).toMatch(/\| 🔴 \| `components\/widget` \| `default` \|/);
	});

	it('caps warning annotations at 10', () => {
		const many = (n) =>
			Array.from(
				{ length: 12 },
				(_, i) => `export declare const f${i}: (x: ${n}) => void;`
			).join('\n') + '\n';
		write('base', { 'components/many.d.ts': many('number') });
		write('head', { 'components/many.d.ts': many('string') });
		const warnings = run({ GITHUB_ACTIONS: 'true' })
			.stdout.split('\n')
			.filter((l) => l.startsWith('::warning'));
		expect(warnings).toHaveLength(10);
	});

	it('turns a crash into a warning and exits 0', () => {
		const result = spawnSync(
			TSX,
			[
				SCRIPT,
				'--base-dir',
				join(dir, 'missing'),
				'--head-dir',
				join(dir, 'missing'),
			],
			{ encoding: 'utf8' }
		);
		expect(result.status).toBe(0);
		expect(result.stdout).toMatch(
			/^::warning title=api-compat::api-compat failed/m
		);
	});
});
