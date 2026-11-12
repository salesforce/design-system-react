/*
 * End-to-end test for scripts/api-report.ts (`npm run api:check` / `api:update`).
 *
 * Runs the real script with `--root` pointed at a throwaway fixture project: a
 * tiny `components/` tree with a public component, a private module it
 * references, and a private module nothing public reaches.
 */
import { spawnSync } from 'child_process';
import {
	existsSync,
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

const SCRIPT = fileURLToPath(new URL('../api-report.ts', import.meta.url));
const TSX = fileURLToPath(
	new URL('../../node_modules/.bin/tsx', import.meta.url)
);

const FIXTURE = {
	'package.json': JSON.stringify({ name: 'fixture-pkg' }),
	'tsconfig.dts.json': JSON.stringify({
		compilerOptions: {
			target: 'ES2022',
			module: 'ESNext',
			moduleResolution: 'bundler',
			strict: true,
			declaration: true,
			emitDeclarationOnly: true,
			rootDir: '.',
			skipLibCheck: true,
		},
		include: ['components/**/*'],
	}),
	'components/widget/index.ts': `
import type { WidgetItem } from './private/item';
/** Docs that should not appear in the snapshot. */
export interface WidgetProps {
	items: WidgetItem[];
	size?: 'small' | 'large';
}
export default function widget(props: WidgetProps): string {
	return String(props.items.length);
}
`,
	'components/widget/private/item.ts': `export interface WidgetItem { id: string }\n`,
	'components/widget/private/internal.ts': `export const secret = (n: number): number => n;\n`,
};

let root;

const write = (file, text) => {
	mkdirSync(dirname(join(root, file)), { recursive: true });
	writeFileSync(join(root, file), text);
};
const run = (...args) =>
	spawnSync(TSX, [SCRIPT, '--root', root, ...args], { encoding: 'utf8' });
const snapshot = () =>
	readFileSync(join(root, 'api/components/widget.api.d.ts'), 'utf8');

beforeEach(() => {
	root = mkdtempSync(join(tmpdir(), 'api-report-test-'));
	for (const [file, text] of Object.entries(FIXTURE)) write(file, text);
	spawnSync('git', ['init', '-q'], { cwd: root });
});

afterEach(() => {
	rmSync(root, { recursive: true, force: true });
});

describe('api-report', () => {
	it('snapshots public files and referenced private files, without comments', () => {
		expect(run('--update').status).toBe(0);
		const text = snapshot();
		expect(text).toContain('// ── fixture-pkg/components/widget ──');
		expect(text).toContain('size?: "small" | "large";');
		expect(text).toContain(
			'// ── components/widget/private/item (internal; referenced by public types) ──'
		);
		expect(text).not.toContain('private/internal');
		expect(text).not.toContain('secret');
		expect(text).not.toContain('Docs that should not appear');
	});

	it('passes when up to date and ignores comment-only and private-only edits', () => {
		run('--update');
		write(
			'components/widget/index.ts',
			FIXTURE['components/widget/index.ts'].replace(
				'Docs that',
				'Reworded docs that'
			)
		);
		write(
			'components/widget/private/internal.ts',
			`export const secret = (n: string): string => n;\n`
		);
		const result = run('--check');
		expect(result.status).toBe(0);
		expect(result.stdout).toContain('up to date');
	});

	it('fails with a diff when a public type changes, then passes after update', () => {
		run('--update');
		write(
			'components/widget/index.ts',
			FIXTURE['components/widget/index.ts'].replace(
				"'small' | 'large'",
				"'small'"
			)
		);
		const result = run('--check');
		expect(result.status).toBe(1);
		expect(result.stderr).toContain('-    size?: "small" | "large";');
		expect(result.stderr).toContain('+    size?: "small";');
		expect(result.stderr).toContain('npm run api:update');

		expect(run('--update').status).toBe(0);
		expect(run('--check').status).toBe(0);
	});

	it('fails when a referenced private type changes', () => {
		run('--update');
		write(
			'components/widget/private/item.ts',
			`export interface WidgetItem { id: number }\n`
		);
		expect(run('--check').status).toBe(1);
	});

	it('reports a missing snapshot and removes orphaned files on update', () => {
		expect(run('--check').status).toBe(1);
		write('api/components/removed.api.d.ts', 'stale\n');
		run('--update');
		expect(existsSync(join(root, 'api/components/removed.api.d.ts'))).toBe(
			false
		);
		expect(existsSync(join(root, 'api/components/widget.api.d.ts'))).toBe(true);
	});

	it('fails cleanly when declaration emit fails', () => {
		write('components/widget/broken.ts', 'export const x: number = "nope";\n');
		const result = run('--check');
		expect(result.status).toBe(1);
		expect(result.stderr).toContain('declaration emit failed');
	});
});
