import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import tseslint from 'typescript-eslint';
import { beforeAll, describe, expect, it } from 'vitest';
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
				files: ['**/*.{ts,tsx}'],
				languageOptions: {
					parser: tseslint.parser,
					parserOptions: {
						project: ['./tsconfig.json'],
						tsconfigRootDir: fixtures,
						// typescript-eslint switches to single-run mode when `CI=true`,
						// which isn't meant for creating several ESLint instances in one
						// process: TypeScript then crashes resolving `bar`'s import.
						disallowAutomaticSingleRunInference: true,
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
	let messages;
	beforeAll(async () => {
		messages = await lint();
	});

	it('allows a component to read its own deprecated props', () => {
		expect(messages['components/foo/index.ts']).toEqual([]);
	});

	it('allows a component to pass its own deprecated prop as a JSX attribute', () => {
		expect(messages['components/foo/button.tsx']).toEqual([]);
	});

	it("reports another component's deprecated prop", () => {
		expect(messages['components/bar/index.ts']).toEqual([
			'`text` is deprecated. Use `label` instead.',
		]);
	});

	it("reports another component's deprecated JSX attribute", () => {
		expect(messages['components/bar/button.tsx']).toEqual([
			'`text` is deprecated. Use `label` instead.',
		]);
	});

	it('reports a deprecated DOM API', () => {
		expect(messages['utilities/keys/index.ts']).toEqual([
			expect.stringMatching(/^`keyCode` is deprecated\./),
		]);
	});
});
