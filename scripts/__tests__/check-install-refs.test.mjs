/*
 * Unit tests for scripts/check-install-refs.ts (pure parsing, no git or network).
 */
import { describe, expect, it } from 'vitest';
import { findRefs } from '../check-install-refs.ts';

const allowed = new Set(['react', 'playwright', 'eslint']);
const check = (text) =>
	findRefs(text, allowed).map((r) => [r.reason, r.target]);

describe('check-install-refs', () => {
	it('flags the TinyNod case: a global install of a package we do not own', () => {
		expect(check('- **npm**: `npm install -g @cc-oms/tinynod`')).toEqual([
			['unreviewed package', '@cc-oms/tinynod'],
		]);
	});

	it('passes reviewed packages, owned scopes, and version suffixes', () => {
		expect(
			check(
				'npm install @salesforce/design-system-react@alpha react@^19.2.0 --legacy-peer-deps'
			)
		).toEqual([]);
		expect(check('npm i @salesforce-ux/design-system-2')).toEqual([]);
		expect(check('npx playwright install --with-deps chromium')).toEqual([]);
	});

	it('ignores bare installs and prose after a backticked command', () => {
		expect(
			check('`npm install`, then `npx playwright install chromium`')
		).toEqual([]);
		expect(check('npm install')).toEqual([]);
	});

	it('only treats the first npx argument as a package', () => {
		expect(check('npx eslint run some-other-word')).toEqual([]);
		expect(check('npx evil-pkg eslint')).toEqual([
			['unreviewed package', 'evil-pkg'],
		]);
	});

	it('flags every unreviewed package in a multi-package install', () => {
		expect(check('npm install react left-pad @acme/thing')).toEqual([
			['unreviewed package', 'left-pad'],
			['unreviewed package', '@acme/thing'],
		]);
	});

	it('flags non-registry targets such as URLs and paths', () => {
		expect(check('npm install https://example.com/pkg.tgz')).toEqual([
			['not a registry package', 'https://example.com/pkg.tgz'],
		]);
		expect(check('npm install git+ssh://git@host/x.git')).toEqual([
			['not a registry package', 'git+ssh://git@host/x.git'],
		]);
	});

	it('flags curl piped to a shell, including process substitution', () => {
		expect(check('curl -sSL https://example.com/i.sh | bash')).toHaveLength(1);
		expect(check('bash <(curl -sSL https://example.com/i.sh)')).toHaveLength(1);
		expect(check('curl -o out.json https://example.com/x.json')).toEqual([]);
	});

	it('honors the inline allow marker and reports 1-based line numbers', () => {
		expect(check('npm install left-pad <!-- install-refs: allow -->')).toEqual(
			[]
		);
		const [ref] = findRefs('ok\nnpm install left-pad', allowed);
		expect(ref.line).toBe(2);
	});
});
