/*
 * Unit test for scripts/eslint-github-formatter.cjs (used by `npm run lint`).
 */
import { mkdtempSync, readFileSync, rmSync } from 'fs';
import { createRequire } from 'module';
import { tmpdir } from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const format = require('../eslint-github-formatter.cjs');

const results = [
	{
		filePath: path.join(process.cwd(), 'components/a/index.tsx'),
		messages: [
			{
				ruleId: 'react-hooks/refs',
				severity: 1,
				line: 12,
				column: 4,
				message:
					'Error: Cannot access refs, during render\n\n> 12 | code frame',
			},
			{
				ruleId: 'react-hooks/refs',
				severity: 1,
				line: 12,
				column: 4,
				message:
					'Error: Cannot access refs, during render\n\n> 12 | other frame',
			},
		],
		errorCount: 0,
		warningCount: 2,
		fixableErrorCount: 0,
		fixableWarningCount: 0,
		suppressedMessages: [],
	},
];
const context = { cwd: process.cwd(), rulesMeta: {} };

describe('eslint-github-formatter', () => {
	let env;
	let dir;

	beforeEach(() => {
		env = { ...process.env };
		dir = mkdtempSync(path.join(tmpdir(), 'eslint-formatter-'));
	});

	afterEach(() => {
		process.env = env;
		rmSync(dir, { recursive: true, force: true });
	});

	it('prints only the stylish output outside GitHub Actions', async () => {
		delete process.env.GITHUB_ACTIONS;
		const output = await format(results, context);

		expect(output).toContain('react-hooks/refs');
		expect(output).not.toContain('::warning');
	});

	it('annotates each problem and lists it in the job summary on GitHub Actions', async () => {
		process.env.GITHUB_ACTIONS = 'true';
		process.env.GITHUB_STEP_SUMMARY = path.join(dir, 'summary.md');
		const output = await format(results, context);

		// One annotation per location, without the code frame; the stylish output
		// above keeps it.
		const annotations = output
			.split('\n')
			.filter((line) => line.startsWith('::'));
		expect(annotations).toEqual([
			'::warning file=components/a/index.tsx,line=12,col=4,title=react-hooks/refs::Error: Cannot access refs, during render (reported 2 times)',
		]);
		expect(readFileSync(process.env.GITHUB_STEP_SUMMARY, 'utf8')).toContain(
			'| `components/a/index.tsx:12` | react-hooks/refs | Error: Cannot access refs, during render |'
		);
	});
});
