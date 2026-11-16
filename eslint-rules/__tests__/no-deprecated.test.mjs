import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import tseslint from 'typescript-eslint';
import { describe, expect, it } from 'vitest';
import noDeprecated from '../no-deprecated.mjs';

const fixtures = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	'fixtures'
);

// Lint with `cwd` set to the fixture project, so ownership is resolved from
// `tsconfigRootDir` rather than the directory Vitest was started in.
const lint = async () => {
	const eslint = new ESLint({
		cwd: fixtures,
		overrideConfigFile: true,
		overrideConfig: [
			{
				files: ['**/*.ts'],
				languageOptions: {
					parser: tseslint.parser,
					parserOptions: {
						project: ['./tsconfig.json'],
						tsconfigRootDir: fixtures,
					},
				},
				plugins: { local: { rules: { 'no-deprecated': noDeprecated } } },
				rules: { 'local/no-deprecated': 'error' },
			},
		],
	});
	const results = await eslint.lintFiles(['components', 'utilities']);
	return Object.fromEntries(
		results.map((result) => [
			path.relative(fixtures, result.filePath),
			result.messages.map((message) => message.message),
		])
	);
};

describe('local/no-deprecated', () => {
	it('allows a component to read its own deprecated props', async () => {
		expect((await lint())['components/foo/index.ts']).toEqual([]);
	});

	it("reports another component's deprecated prop", async () => {
		expect((await lint())['components/bar/index.ts']).toEqual([
			'`text` is deprecated. Use `label` instead.',
		]);
	});

	it('reports a deprecated DOM API', async () => {
		expect((await lint())['utilities/keys/index.ts']).toEqual([
			expect.stringMatching(/^`keyCode` is deprecated\./),
		]);
	});
});
