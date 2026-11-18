/*
 * Unit tests for the pure helpers in scripts/emit-node16-types.ts (run by
 * `npm run build`).
 */
import { describe, expect, it } from 'vitest';

import {
	rewriteRelativeSpecifiers,
	withExtension,
} from '../emit-node16-types.ts';

describe('rewriteRelativeSpecifiers', () => {
	const source = [
		"import React from 'react';",
		"import type { A } from './a';",
		"export * from '../b/index';",
		'export { default } from "./c";',
		"type D = import('./d').D;",
		"// from './comment'",
		"declare const s = './string';",
	].join('\n');

	it('rewrites import, export and import-type specifiers, keeping quotes', () => {
		expect(rewriteRelativeSpecifiers(source, (spec) => `${spec}.js`)).toBe(
			[
				"import React from 'react';",
				"import type { A } from './a.js';",
				"export * from '../b/index.js';",
				'export { default } from "./c.js";',
				"type D = import('./d.js').D;",
				"// from './comment'",
				"declare const s = './string';",
			].join('\n')
		);
	});

	it('keeps a specifier the resolver returns undefined for', () => {
		expect(rewriteRelativeSpecifiers(source, () => undefined)).toBe(source);
	});
});

describe('withExtension', () => {
	const files = new Set([
		'/t/button.d.ts',
		'/t/button/index.d.ts',
		'/t/grid/index.d.ts',
	]);
	const exists = (file) => files.has(file);

	it('names the file a specifier resolves to', () => {
		expect(withExtension('./button', '/t', '.js', exists)).toBe('./button.js');
		expect(withExtension('./button', '/t', '.cjs', exists)).toBe(
			'./button.cjs'
		);
	});

	it("falls back to the folder's index", () => {
		expect(withExtension('./grid', '/t', '.js', exists)).toBe(
			'./grid/index.js'
		);
	});

	it('replaces an existing JS extension', () => {
		expect(withExtension('./button.js', '/t', '.cjs', exists)).toBe(
			'./button.cjs'
		);
	});

	it('returns undefined when no declaration exists', () => {
		expect(withExtension('./missing', '/t', '.js', exists)).toBeUndefined();
	});
});
