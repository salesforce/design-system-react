import { appendFileSync } from 'node:fs';
import path from 'node:path';
import type { Reporter, TestModule } from 'vitest/node';

// Reports the unexpected `console.error`/`console.warn` output that
// `vitest.console-guard.ts` records on each test, so a pull request that adds
// a warning tells the maintainer:
//  - every run prints a summary after the tests;
//  - on GitHub Actions, each test file gets a warning annotation (shown on
//    the pull request's "Files changed" tab) and the job summary lists every
//    message;
//  - the run fails once the total is over `maxWarnings`.
//
// `maxWarnings` is the budget, like `eslint --max-warnings`: lower it as
// warnings are fixed, and never raise it to land new ones.
export const maxWarnings = 0;

declare module 'vitest' {
	interface TaskMeta {
		// Set by `vitest.console-guard.ts`.
		unexpectedConsole?: string[];
	}
}

type Finding = { file: string; test: string; message: string };

const firstLine = (message: string) => message.split('\n')[0];

// GitHub workflow commands need `%`, CR and LF escaped in the message, and
// also `,` and `:` in properties.
const escapeData = (value: string) =>
	value.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
const escapeProperty = (value: string) =>
	escapeData(value).replace(/:/g, '%3A').replace(/,/g, '%2C');

const markdownCell = (value: string) =>
	value.replace(/\|/g, '\\|').replace(/\s+/g, ' ').slice(0, 300);

export default class ConsoleReporter implements Reporter {
	onTestRunEnd(testModules: ReadonlyArray<TestModule>) {
		const findings: Finding[] = [];
		testModules.forEach((testModule) => {
			const file = path.relative(process.cwd(), testModule.moduleId);
			for (const testCase of testModule.children.allTests()) {
				(testCase.meta().unexpectedConsole ?? []).forEach((message) => {
					findings.push({ file, test: testCase.fullName, message });
				});
			}
		});
		if (findings.length === 0) {
			return;
		}

		const overBudget = findings.length > maxWarnings;
		const heading = `${findings.length} unexpected console ${
			findings.length === 1 ? 'warning' : 'warnings'
		} in tests (max ${maxWarnings})`;

		process.stdout.write(
			`\n${heading}. Fix the cause, or assert it with vi.spyOn(console, '<method>'):\n${findings
				.map((f) => `  ${f.file} > ${f.test}\n    ${firstLine(f.message)}`)
				.join('\n')}\n\n`
		);

		if (process.env.GITHUB_ACTIONS === 'true') {
			// One annotation per file, because GitHub shows only the first 10
			// warning annotations of a step. The job summary lists every message.
			const byFile = new Map<string, Finding[]>();
			findings.forEach((f) => {
				byFile.set(f.file, [...(byFile.get(f.file) ?? []), f]);
			});
			byFile.forEach((fileFindings, file) => {
				const body = fileFindings
					.map((f) => `${f.test}: ${firstLine(f.message)}`)
					.join('\n');
				process.stdout.write(
					`::${overBudget ? 'error' : 'warning'} file=${escapeProperty(
						file
					)},title=${escapeProperty(
						`${fileFindings.length} unexpected console output`
					)}::${escapeData(body)}\n`
				);
			});

			if (process.env.GITHUB_STEP_SUMMARY) {
				appendFileSync(
					process.env.GITHUB_STEP_SUMMARY,
					[
						`### ${heading}`,
						'',
						'| File | Test | Message |',
						'| --- | --- | --- |',
						...findings.map(
							(f) =>
								`| \`${f.file}\` | ${markdownCell(f.test)} | ${markdownCell(
									firstLine(f.message)
								)} |`
						),
						'',
					].join('\n')
				);
			}
		}

		if (overBudget) {
			process.exitCode = 1;
			process.stdout.write(
				`Failing: ${findings.length} unexpected console warnings is over the max of ${maxWarnings} in scripts/vitest-console-reporter.ts.\n`
			);
		}
	}
}
