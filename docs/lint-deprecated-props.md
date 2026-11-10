# Catch deprecated props with ESLint

v11 keeps some 0.10.x and early-alpha props working under a deprecation. They still type-check, and in development they log a warning once. Every one is tagged `@deprecated` in the published `.d.ts`, with its replacement, so `@typescript-eslint/no-deprecated` can turn them into lint errors. That matters for coding agents: they read `tsc` and lint output, not the editor strikethrough or the browser console.

Add the rule to your flat config. `configs.base` registers the parser and plugin, and the rule needs type information, so turn on the project service:

```js
// eslint.config.mjs
import tseslint from 'typescript-eslint';

export default tseslint.config(tseslint.configs.base, {
	files: ['**/*.{ts,tsx}'],
	languageOptions: { parserOptions: { projectService: true } },
	rules: { '@typescript-eslint/no-deprecated': 'error' },
});
```

If your config already sets up `typescript-eslint` with type information, you only need the rule line. For `.js`/`.jsx` files, add them to `files` and set `allowJs` in your tsconfig. A use of a deprecated prop then reports the replacement:

```text
error  `onRenderActions` is deprecated. Use `actions` instead.  @typescript-eslint/no-deprecated
```

Use `'warn'` instead of `'error'` while you migrate an existing codebase.
