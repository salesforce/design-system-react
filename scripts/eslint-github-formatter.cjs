/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ESLint formatter: prints the usual `stylish` output and, on GitHub Actions,
// a `::warning`/`::error` workflow command per problem, so each lint warning
// shows up on the pull request's "Files changed" tab next to its line. GitHub
// shows only the first 10 per step, so the job summary also lists them all.
// `--max-warnings` still decides whether the run fails.
// ESLint loads formatters with `require`, hence CommonJS.
const { appendFileSync } = require('node:fs');
const path = require('node:path');
const { loadESLint } = require('eslint');

const escapeData = (value) =>
	String(value)
		.replace(/%/g, '%25')
		.replace(/\r/g, '%0D')
		.replace(/\n/g, '%0A');
const escapeProperty = (value) =>
	escapeData(value).replace(/:/g, '%3A').replace(/,/g, '%2C');

// React Compiler rules append a code frame after a blank line; the annotation
// already points at the line, so keep only the first paragraph.
const summary = (message) => message.split(/\n\s*\n/)[0].trim();

const markdownCell = (value) =>
	String(value).replace(/\|/g, '\\|').replace(/\s+/g, ' ');

module.exports = async function githubFormatter(results, context) {
	const ESLint = await loadESLint();
	const stylish = await new ESLint().loadFormatter('stylish');
	const output = [await stylish.format(results, context)];

	if (process.env.GITHUB_ACTIONS === 'true') {
		const rows = [];
		results.forEach((result) => {
			const file = path.relative(process.cwd(), result.filePath);
			result.messages.forEach((message) => {
				rows.push(
					`| \`${file}:${message.line ?? 1}\` | ${message.ruleId ?? ''} | ${markdownCell(
						summary(message.message)
					)} |`
				);
				const level = message.severity === 2 ? 'error' : 'warning';
				const properties = [
					`file=${escapeProperty(file)}`,
					`line=${message.line ?? 1}`,
					`col=${message.column ?? 1}`,
					`title=${escapeProperty(message.ruleId ?? 'eslint')}`,
				].join(',');
				output.push(
					`::${level} ${properties}::${escapeData(summary(message.message))}`
				);
			});
		});

		if (rows.length > 0 && process.env.GITHUB_STEP_SUMMARY) {
			appendFileSync(
				process.env.GITHUB_STEP_SUMMARY,
				[
					`### ${rows.length} lint ${rows.length === 1 ? 'problem' : 'problems'}`,
					'',
					'| Location | Rule | Message |',
					'| --- | --- | --- |',
					...rows,
					'',
				].join('\n')
			);
		}
	}

	return output.join('\n');
};
