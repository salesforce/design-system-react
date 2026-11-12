/*
 * Tests for scripts/tinynod-pre-push-review.ts, the optional advisory TinyNod
 * review in the husky pre-push hook.
 *
 * End-to-end cases run the real script in a throwaway repo with a stub
 * `tinynod` on PATH that records its arguments and prints canned output.
 * Nothing is sent to the AI gateway.
 */
import { spawnSync } from 'child_process';
import {
	chmodSync,
	existsSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
	classify,
	describeFinding,
	isEnabled,
	selectTarget,
	versionOk,
} from '../tinynod-pre-push-review.ts';

const SCRIPT = fileURLToPath(
	new URL('../tinynod-pre-push-review.ts', import.meta.url)
);
// The throwaway repo has no node_modules, so run the script with this repo's tsx.
const TSX = fileURLToPath(
	new URL('../../node_modules/.bin/tsx', import.meta.url)
);
const ZERO = '0'.repeat(40);

const TINYNOD_STUB = `#!/bin/sh
if [ "$1" = "--version" ]; then echo "$STUB_VERSION"; exit 0; fi
printf '%s\\n' "$@" > "$STUB_ARGS_FILE"
printf '%s' "$STUB_OUTPUT"
exit 1
`;

let tmp;
let work;
let env;

const sh = (cmd, args) => {
	const r = spawnSync(cmd, args, { cwd: work, encoding: 'utf8', env });
	if (r.status !== 0)
		throw new Error(`${cmd} ${args.join(' ')} failed:\n${r.stderr}`);
	return r.stdout.trim();
};

const commit = (file, content) => {
	writeFileSync(join(work, file), content);
	sh('git', ['add', file]);
	sh('git', ['commit', '-qm', `change ${file}`]);
	return sh('git', ['rev-parse', 'HEAD']);
};

const runHook = (stdin, extraEnv = {}) =>
	spawnSync(TSX, [SCRIPT], {
		cwd: work,
		encoding: 'utf8',
		input: stdin,
		env: { ...env, ...extraEnv },
	});

const reviewed = () =>
	existsSync(env.STUB_ARGS_FILE)
		? readFileSync(env.STUB_ARGS_FILE, 'utf8').trim().split('\n')
		: null;

beforeEach(() => {
	tmp = mkdtempSync(join(tmpdir(), 'tinynod-hook-'));
	work = join(tmp, 'work');
	const bin = join(tmp, 'bin');
	mkdirSync(work);
	mkdirSync(bin);
	writeFileSync(join(bin, 'tinynod'), TINYNOD_STUB);
	chmodSync(join(bin, 'tinynod'), 0o755);
	env = {
		PATH: `${bin}:${process.env.PATH}`,
		HOME: tmp,
		GIT_CONFIG_NOSYSTEM: '1',
		GIT_AUTHOR_NAME: 't',
		GIT_AUTHOR_EMAIL: 't@example.com',
		GIT_COMMITTER_NAME: 't',
		GIT_COMMITTER_EMAIL: 't@example.com',
		STUB_VERSION: 'tinynod 2.5.0',
		STUB_ARGS_FILE: join(tmp, 'args'),
		STUB_OUTPUT: JSON.stringify({ failed: false, comments: [] }),
	};
	sh('git', ['init', '-q', '-b', 'master']);
	commit('a.js', 'a\n');
	// Stand in for a fetched origin/master.
	sh('git', ['update-ref', 'refs/remotes/origin/master', 'HEAD']);
	sh('git', ['switch', '-qc', 'feature']);
});

afterEach(() => {
	rmSync(tmp, { recursive: true, force: true });
});

const branchPush = (oid, remoteOid = ZERO) =>
	`refs/heads/feature ${oid} refs/heads/feature ${remoteOid}\n`;

describe('tinynod pre-push review (end to end)', () => {
	it('does nothing unless opted in', () => {
		const oid = commit('b.js', 'b\n');
		const r = runHook(branchPush(oid));
		expect(r.status).toBe(0);
		expect(r.stdout).toBe('');
		expect(reviewed()).toBeNull();
	});

	it('reviews the pushed commit against its merge-base with origin/master', () => {
		const base = sh('git', ['rev-parse', 'origin/master']);
		const oid = commit('b.js', 'b\n');
		sh('git', ['config', 'dsr.tinynod.enabled', 'true']);
		const r = runHook(branchPush(oid));
		expect(r.status).toBe(0);
		expect(reviewed()).toEqual(['review', '--base', base, '--format', 'json']);
		expect(r.stdout).toContain(
			'pre-push: tinynod review (advisory) clean: no findings'
		);
	});

	it('reviews only new commits when the remote branch is an ancestor', () => {
		const pushedBefore = commit('b.js', 'b\n');
		const oid = commit('c.js', 'c\n');
		runHook(branchPush(oid, pushedBefore), { DSR_TINYNOD_REVIEW: '1' });
		expect(reviewed()).toContain(pushedBefore);
	});

	it('prints findings and still exits 0', () => {
		const oid = commit('b.js', 'b\n');
		const r = runHook(branchPush(oid), {
			DSR_TINYNOD_REVIEW: '1',
			STUB_OUTPUT: `log line\n${JSON.stringify({
				failed: true,
				comments: [
					{
						severity: 'high',
						filePath: 'b.js',
						lineNumber: 1,
						comment: 'Bug\nmore',
					},
				],
			})}`,
		});
		expect(r.status).toBe(0);
		expect(r.stdout).toContain('(advisory) findings: 1 finding');
		expect(r.stdout).toContain('  [high] b.js:1 Bug');
		expect(r.stdout).toContain('Re-run: tinynod review --base');
	});

	it('reports non-JSON output as a warning, not a clean review', () => {
		const oid = commit('b.js', 'b\n');
		const r = runHook(branchPush(oid), {
			DSR_TINYNOD_REVIEW: '1',
			STUB_OUTPUT: 'Access denied',
		});
		expect(r.status).toBe(0);
		expect(r.stdout).toContain('(advisory) warning: no JSON result');
	});

	it.each([
		['TINYNOD_SKIP_HOOK', { DSR_TINYNOD_REVIEW: '1', TINYNOD_SKIP_HOOK: '1' }],
		['DSR_TINYNOD_REVIEW=0', { DSR_TINYNOD_REVIEW: '0' }],
	])('%s overrides git config', (_, extraEnv) => {
		const oid = commit('b.js', 'b\n');
		sh('git', ['config', 'dsr.tinynod.enabled', 'true']);
		const r = runHook(branchPush(oid), extraEnv);
		expect(r.stdout).toBe('');
		expect(reviewed()).toBeNull();
	});

	it('skips an old tinynod', () => {
		const oid = commit('b.js', 'b\n');
		const r = runHook(branchPush(oid), {
			DSR_TINYNOD_REVIEW: '1',
			STUB_VERSION: 'tinynod 2.4.9',
		});
		expect(r.stdout).toContain('skipped: tinynod 2.5.0+ required');
		expect(reviewed()).toBeNull();
	});

	it('skips docs-only pushes', () => {
		const oid = commit('notes.md', '# notes\n');
		const r = runHook(branchPush(oid), { DSR_TINYNOD_REVIEW: '1' });
		expect(r.stdout).toContain('skipped: docs-only push');
		expect(reviewed()).toBeNull();
	});
});

describe('selectTarget', () => {
	const checks = {
		head: 'h',
		isAncestor: () => true,
		mergeBase: () => 'mb',
	};
	const tuple = (remoteRef, localOid = 'h', remoteOid = ZERO) => ({
		localRef: 'refs/heads/x',
		localOid,
		remoteRef,
		remoteOid,
	});

	it('skips pushes to master and tags', () => {
		expect(selectTarget([tuple('refs/heads/master')], checks).skip).toMatch(
			/master/
		);
		expect(selectTarget([tuple('refs/tags/v1')], checks).skip).toMatch(/tag/);
	});

	it('skips deletions, multi-commit pushes and non-HEAD pushes', () => {
		expect(selectTarget([tuple('refs/heads/x', ZERO)], checks).skip).toBe(
			'nothing to review'
		);
		expect(
			selectTarget([tuple('refs/heads/x'), tuple('refs/heads/y', 'o')], checks)
				.skip
		).toMatch(/more than one/);
		expect(selectTarget([tuple('refs/heads/x', 'o')], checks).skip).toMatch(
			/HEAD/
		);
	});

	it('falls back to the merge-base after a force-push', () => {
		expect(
			selectTarget([tuple('refs/heads/x', 'h', 'r')], {
				...checks,
				isAncestor: () => false,
			})
		).toEqual({ oid: 'h', base: 'mb' });
	});
});

describe('helpers', () => {
	it('isEnabled', () => {
		expect(isEnabled({}, null)).toBe(false);
		expect(isEnabled({}, 'true')).toBe(true);
		expect(isEnabled({}, 'bogus')).toBe(false);
		expect(isEnabled({ DSR_TINYNOD_REVIEW: 'true' }, 'false')).toBe(true);
	});

	it('versionOk', () => {
		expect(versionOk('2.5.0')).toBe(true);
		expect(versionOk('tinynod v3.0.1')).toBe(true);
		expect(versionOk('2.4.12')).toBe(false);
		expect(versionOk('')).toBe(false);
	});

	it('classify never reports a failed review as clean', () => {
		expect(classify({ timedOut: true, error: new Error('x') }).status).toBe(
			'warning'
		);
		expect(classify({ stdout: '{"error":"denied"}' })).toEqual({
			status: 'warning',
			message: 'denied',
		});
		expect(classify({ stdout: '{"ok":true}' }).status).toBe('warning');
		expect(
			classify({ stdout: '{"failed":false,"noChanges":true}' }).status
		).toBe('no_changes');
		expect(
			classify({
				stdout:
					'{"failed":false,"summary":"Partial review: 3 of 9","comments":[]}',
			}).status
		).toBe('partial');
		expect(classify({ stdout: '{"failed":true,"comments":[]}' }).status).toBe(
			'findings'
		);
	});

	it('describeFinding', () => {
		expect(describeFinding({ title: 'Nit' })).toBe('  [unknown] Nit');
	});
});
