/*
 * Unit tests for the pure helpers in scripts/package-entry-points.ts, shared
 * by `check-packed-install.ts` (`npm run test:packed`) and
 * `check-package-exports.mjs`.
 */
import { describe, expect, it } from 'vitest';

import {
	entryPointSpecifiers,
	matchExport,
	runtimeFixtureSource,
	typesFixtureSource,
} from '../package-entry-points.ts';

const target = (name) => ({ import: `./dist/es/${name}.js` });
const exportsMap = {
	'.': target('components/index'),
	'./components': target('components/index'),
	'./components/*': target('components/*'),
	'./components/*check-props': null,
	'./components/card/private': null,
	'./components/card/private/*': null,
	'./package.json': './package.json',
};

describe('matchExport', () => {
	it('prefers an exact key', () => {
		expect(matchExport(exportsMap, './components')).toBe(
			exportsMap['./components']
		);
	});

	it('matches a pattern key', () => {
		expect(matchExport(exportsMap, './components/menu-list/list')).toBe(
			exportsMap['./components/*']
		);
	});

	it('prefers the pattern with the longest prefix, as Node does', () => {
		expect(matchExport(exportsMap, './components/card/private/x')).toBeNull();
	});

	it('applies a pattern with a suffix', () => {
		expect(
			matchExport(exportsMap, './components/radio/check-props')
		).toBeNull();
		expect(matchExport(exportsMap, './components/radio/index')).toBe(
			exportsMap['./components/*']
		);
	});

	it('returns undefined when no key matches', () => {
		expect(matchExport(exportsMap, './utilities/key-code')).toBeUndefined();
	});
});

describe('entryPointSpecifiers', () => {
	it('lists exact keys and the candidates a pattern exports, without blocked or JSON paths', () => {
		expect(
			entryPointSpecifiers('pkg', exportsMap, [
				'components/button',
				'components/menu-list/list',
				'components/card/private/header',
				'components/radio/check-props',
				'utilities/key-code',
			])
		).toEqual([
			'pkg',
			'pkg/components',
			'pkg/components/button',
			'pkg/components/menu-list/list',
		]);
	});
});

describe('fixture sources', () => {
	it('imports and uses every specifier in the TypeScript fixture', () => {
		expect(typesFixtureSource(['a', 'b/c'])).toBe(
			"import * as entry0 from 'a';\n" +
				"import * as entry1 from 'b/c';\n" +
				'\n' +
				'export const entries = [entry0, entry1];\n'
		);
	});

	it.each([
		['esm', 'await import(spec)'],
		['cjs', 'require(spec)'],
	])('loads each entry point with the %s loader', (kind, load) => {
		const source = runtimeFixtureSource(kind, { a: ['default'] });
		expect(source).toContain(`mod = ${load};`);
		expect(source).toContain('"a": [\n\t\t"default"\n\t]');
	});
});
