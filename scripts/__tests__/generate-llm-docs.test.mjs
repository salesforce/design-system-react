/*
 * Test for scripts/generate-llm-docs.ts (`npm run build:llm-docs`).
 *
 * `test:ci` runs the tests before `build`, so this emits the declarations
 * itself (into a gitignored `.tmp-*` directory inside the repo, so `react`
 * types resolve from node_modules) and runs the generator on them.
 */
import { execFileSync } from 'child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../..', import.meta.url));
const bin = (name) => join(root, 'node_modules/.bin', name);

let tmp;
let out;
const read = (path) => readFileSync(join(out, path), 'utf8');
/** The props-table row for `prop` in a component file */
const row = (file, prop) =>
	read(`components/${file}.md`)
		.split('\n')
		.find((line) => line.startsWith(`| \`${prop}\` |`));

beforeAll(() => {
	tmp = mkdtempSync(join(root, '.tmp-llm-docs-'));
	out = join(tmp, 'llms');
	const types = join(tmp, 'types');
	execFileSync(bin('tsc'), ['-p', 'tsconfig.dts.json', '--outDir', types], {
		cwd: root,
		stdio: 'pipe',
	});
	execFileSync(
		bin('tsx'),
		['scripts/generate-llm-docs.ts', '--types', types, '--out', out],
		{ cwd: root, stdio: 'pipe' }
	);
}, 120000);

afterAll(() => {
	if (tmp) rmSync(tmp, { recursive: true, force: true });
});

describe('generate-llm-docs', () => {
	it('writes a file for every public component', () => {
		// Independent of the generator: component directories whose index the
		// package root re-exports.
		const rootIndex = readFileSync(join(root, 'components/index.js'), 'utf8');
		const exported = new Set(
			[...rootIndex.matchAll(/from '\.\/([^/']+)/g)].map(([, dir]) => dir)
		);
		const publicDirs = readdirSync(join(root, 'components')).filter(
			(dir) =>
				exported.has(dir) &&
				existsSync(join(root, 'components', dir, 'component.json'))
		);
		expect(publicDirs.length).toBeGreaterThan(40);

		const written = readdirSync(join(out, 'components'));
		expect(written.sort()).toEqual(publicDirs.map((dir) => `${dir}.md`).sort());

		const index = read('llms.txt');
		for (const dir of publicDirs) {
			expect(index).toContain(`(components/${dir}.md)`);
		}
		expect(written).not.toContain('utilities.md');
		expect(written).not.toContain('settings.md');
	});

	it('writes llms.txt with install and import lines, and llms-full.txt with every file', () => {
		const index = read('llms.txt');
		expect(index).toMatch(/^# @salesforce\/design-system-react /);
		expect(index).toContain('npm install @salesforce/design-system-react@alpha');
		expect(index).toContain(
			"import Button from '@salesforce/design-system-react/components/button';"
		);

		const full = read('llms-full.txt');
		for (const file of readdirSync(join(out, 'components'))) {
			expect(full).toContain(read(`components/${file}`));
		}
	});

	it('marks required props', () => {
		expect(row('combobox', 'selection')).toMatch(/\| Yes \|/);
		expect(row('simple-data-table', 'items')).toMatch(/\| Yes \|/);
		expect(row('combobox', 'value')).not.toMatch(/\| Yes \|/);
	});

	it('shows the replacement of a @deprecated prop', () => {
		expect(row('page-header', 'onRenderActions')).toContain(
			'**Deprecated.** Use `actions` instead.'
		);
		expect(row('progress-indicator', 'errorSteps')).toContain(
			"**Deprecated.** Set `status: 'error'` on the step."
		);
	});

	it('lists the values of a literal-union prop', () => {
		expect(row('tooltip', 'variant')).toContain(
			"`TooltipVariant` (`'base' \\| 'learnMore' \\| 'list-item'`)"
		);
	});

	it('merges the members of a union props type', () => {
		// Button's props are a union on `variant`; `iconVariant` comes from one member.
		expect(row('button', 'iconVariant')).toBeDefined();
		expect(row('button', 'variant')).toContain("'icon'");
	});

	it('copies examples verbatim from component.json site-stories', () => {
		const md = read('components/button.md');
		const { 'site-stories': stories } = JSON.parse(
			readFileSync(join(root, 'components/button/component.json'), 'utf8')
		);
		for (const story of stories.slice(0, 3)) {
			const code = readFileSync(
				join(root, 'components/button', story.path),
				'utf8'
			);
			expect(md).toContain(`### ${story.heading}\n\n\`\`\`jsx\n${code}`);
		}
	});
});
