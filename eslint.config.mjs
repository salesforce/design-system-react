import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11yX from 'eslint-plugin-jsx-a11y-x';
import importX from 'eslint-plugin-import-x';
import storybook from 'eslint-plugin-storybook';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The maintained forks `eslint-plugin-jsx-a11y-x` and `eslint-plugin-import-x`
// expose their rules under `jsx-a11y-x/` and `import-x/`. This codebase, though,
// carries ~80 inline `eslint-disable jsx-a11y/…` / `import/…` comments and a
// large set of rule overrides written against the legacy `jsx-a11y/` / `import/`
// namespaces. Rather than rewrite every comment tree-wide, re-key each fork's
// recommended ruleset onto the legacy prefix and register the plugin under that
// same legacy name, so recommended rules, overrides, and inline disables all
// speak one prefix.
const remapRulePrefix = (rules, fromPrefix, toPrefix) =>
	Object.fromEntries(
		Object.entries(rules ?? {}).map(([key, value]) => [
			key.startsWith(`${fromPrefix}/`)
				? `${toPrefix}/${key.slice(fromPrefix.length + 1)}`
				: key,
			value,
		])
	);

const jsxA11yRecommended = {
	...jsxA11yX.configs.recommended,
	plugins: { 'jsx-a11y': jsxA11yX },
	rules: remapRulePrefix(
		jsxA11yX.configs.recommended.rules,
		'jsx-a11y-x',
		'jsx-a11y'
	),
};

const importRecommended = {
	...importX.configs['flat/recommended'],
	plugins: { import: importX },
	rules: remapRulePrefix(
		importX.configs['flat/recommended'].rules,
		'import-x',
		'import'
	),
};

export default tseslint.config(
	// Global ignores. A flat-config block with only `ignores` replaces the old
	// `.eslintignore` file (which ESLint 9+/10 no longer reads).
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'coverage/**',
			'storybook-static/**',
			'storybook-based-tests/**',
			'icons/**',
			'**/*.config.js',
			'**/*.config.cjs',
			'**/*.config.mjs',
			'.storybook/**',
			'eslint-plugin/**',
			// Build/release tooling (Node scripts), outside the type-aware program.
			'scripts/**',
			// Legacy Karma/chai/sinon browser tests, excluded from the Vitest run
			// and not migrated. They reference globals (sinon) that no longer
			// exist, so linting them only produces no-undef noise.
			'**/*.browser-test.*',
			// Sidecar type declarations paired with a same-named source file. TS
			// treats them as non-root program files, so the type-aware parser
			// rejects them. They carry no lintable logic and are slated for removal
			// in the TS migration, so exclude them from linting.
			'**/*.d.ts',
		],
	},

	// Base recommended rule sets, ported from the previous `extends` list.
	js.configs.recommended,
	...tseslint.configs.recommended,
	react.configs.flat.recommended,
	react.configs.flat['jsx-runtime'],
	reactHooks.configs.flat['recommended-latest'],
	jsxA11yRecommended,
	importRecommended,
	...storybook.configs['flat/recommended'],
	// `prettier` must stay last so it can turn off any stylistic rules the
	// preceding configs enabled.
	prettier,

	// Project-wide language options and settings.
	{
		// Flat config defaults `reportUnusedDisableDirectives` to "warn", whereas
		// the prior .eslintrc setup left it off. The legacy source carries ~300
		// inline `eslint-disable` comments for rules this config no longer enables
		// (e.g. `max-len`, now owned by Prettier). Restore the prior behavior —
		// off — so the upgrade does not spam ~300 unrelated warnings; directive
		// hygiene can be cleaned up separately from the dependency bump.
		linterOptions: {
			reportUnusedDisableDirectives: 'off',
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022,
			},
			parserOptions: {
				ecmaFeatures: { jsx: true },
				// Resolve `project` paths relative to this config file (not
				// process.cwd()), so ESLint does not try to read a non-existent
				// repo-root tsconfig.json.
				tsconfigRootDir: __dirname,
				// Use the lint-only tsconfig, which widens `include` to cover
				// stories, docs, examples, tests, and sidecar `.d.ts` files. The
				// build tsconfig excludes those, which caused "TSConfig does not
				// include this file" parse errors for type-aware linting.
				project: ['./tsconfig.eslint.json', './tsconfig.node.json'],
			},
		},
		settings: {
			// Pin the React version instead of 'detect'. eslint-plugin-react's
			// auto-detection calls the `context.getFilename()` API that ESLint 10
			// removed, which throws; a concrete version skips that code path.
			react: { version: '19.2' },
			// eslint-plugin-import-x resolves TS path/extension imports via these.
			// Keyed under the legacy `import/` settings namespace, which the fork
			// still reads (it is registered under that name above).
			'import/resolver': {
				node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
			},
			'import/parsers': {
				'@typescript-eslint/parser': ['.ts', '.tsx'],
			},
		},
		rules: {
			// TypeScript handles these
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],

			// Allow any for gradual migration
			'@typescript-eslint/no-explicit-any': 'warn',

			// React 19 doesn't require importing React
			'react/react-in-jsx-scope': 'off',

			// PropTypes are being replaced with TypeScript
			'react/prop-types': 'off',

			// Allow function expressions for component definitions
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',

			// Hooks rules
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// eslint-plugin-react-hooks 7 bundles the React Compiler rule set,
			// which flags a large pre-existing backlog (ref access during render,
			// setState-in-effect, mutation patterns) that the airbnb-era codebase
			// never satisfied. Surface as warnings — matching this config's
			// gradual-migration stance — so they stay visible without breaking the
			// "zero errors" gate. Ratchet back to `error` as the backlog is worked
			// down (and as components migrate to function-component form).
			'react-hooks/refs': 'warn',
			'react-hooks/set-state-in-effect': 'warn',
			'react-hooks/immutability': 'warn',

			// Rules newly introduced by the ESLint 10 core and typescript-eslint 8
			// recommended sets. Each flags long-standing patterns in legacy source
			// (redundant assignments, intentional `while (true)` loops, expression
			// statements, rethrow-without-cause). Demote to warnings for the same
			// gradual-migration reason; they were not errors under the prior
			// ESLint 8 config.
			'no-useless-assignment': 'warn',
			'no-constant-condition': 'warn',
			'preserve-caught-error': 'warn',
			'@typescript-eslint/no-unused-expressions': 'warn',
			'@typescript-eslint/no-empty-object-type': 'warn',

			// Allow require() for legacy compatibility during migration
			'@typescript-eslint/no-require-imports': 'off',

			// Allow non-null assertions during migration
			'@typescript-eslint/no-non-null-assertion': 'warn',

			// Console warnings for debugging (will clean up later)
			'no-console': ['warn', { allow: ['warn', 'error'] }],

			// Module resolution is validated by TypeScript + Vite, both of which
			// understand this codebase's mixed `.jsx`-import/`.tsx`-on-disk paths
			// and `paths` aliases. The import node resolver does not, so these are
			// false-positive generators here — turn them off. (`namespace` and
			// `default` require a working resolver too; the recommended set had
			// them via a TS resolver that is broken under ESLint 10.)
			'import/no-unresolved': 'off',
			'import/named': 'off',
			'import/namespace': 'off',
			'import/default': 'off',
			'import/no-named-as-default': 'off',
			'import/no-named-as-default-member': 'off',
			'import/no-duplicates': 'off',

			// The airbnb-era codebase carries a large, pre-existing accessibility
			// and import-hygiene backlog. Surface it as warnings (matching this
			// config's gradual-migration philosophy for `any`, non-null
			// assertions, etc.) so it stays visible without blocking the "zero
			// errors" goal. Ratchet these back to `error` as the backlog is worked
			// down. The maintained fork's rules are re-keyed onto the legacy
			// `jsx-a11y/` prefix above, so overrides and inline disables match.
			'jsx-a11y/anchor-is-valid': 'warn',
			'jsx-a11y/click-events-have-key-events': 'warn',
			'jsx-a11y/no-static-element-interactions': 'warn',
			'jsx-a11y/no-noninteractive-element-interactions': 'warn',
			'jsx-a11y/interactive-supports-focus': 'warn',
			'jsx-a11y/role-has-required-aria-props': 'warn',
			'jsx-a11y/label-has-associated-control': 'warn',
			'jsx-a11y/no-noninteractive-tabindex': 'warn',
			'jsx-a11y/no-autofocus': 'warn',
		},
	},

	// JavaScript files (legacy, being migrated). Turn off type-aware parsing
	// (no tsconfig `project`) so untyped `.js`/`.jsx` do not trip the program.
	{
		files: ['**/*.js', '**/*.jsx'],
		languageOptions: {
			parserOptions: { project: null, projectService: false },
		},
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	},

	// Test files
	{
		files: [
			'**/__tests__/**/*.{ts,tsx,js,jsx}',
			'**/*.test.{ts,tsx,js,jsx}',
			'**/*.spec.{ts,tsx,js,jsx}',
			'vitest.setup.ts',
		],
		languageOptions: {
			globals: { ...globals.jest },
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
		},
	},

	// Storybook files
	{
		files: ['**/__docs__/**/*.{ts,tsx,js,jsx}', '**/*.stories.{ts,tsx,js,jsx}'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'no-console': 'off',
			// CSF3 `render: () => { ... }` functions legitimately call hooks
			// (useState, etc.) but are not recognized as React components by this
			// rule, producing false positives. Hooks-correctness in real
			// components is still enforced everywhere else.
			'react-hooks/rules-of-hooks': 'off',
		},
	},

	// Example files
	{
		files: ['**/__examples__/**/*.{ts,tsx,js,jsx}'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'no-console': 'off',
		},
	}
);
