/*
 * End-to-end test for scripts/release.ts (`npm run release-pr`).
 *
 * Runs the real script against throwaway git repos: a local bare repo named
 * `salesforce/design-system-react.git` stands in for `origin`, and a stub `gh`
 * on PATH records the `pr create` call instead of hitting GitHub. Nothing real
 * is pushed or opened.
 */
import { spawnSync } from 'child_process';
import {
	chmodSync,
	copyFileSync,
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

const SCRIPT = fileURLToPath(new URL('../release.ts', import.meta.url));
// The throwaway repos have no node_modules, so run the script with this repo's tsx.
const TSX = fileURLToPath(
	new URL('../../node_modules/.bin/tsx', import.meta.url)
);

const GH_STUB = `#!/bin/sh
case "$1 $2" in
  "auth status") exit 0 ;;
  "pr create")
    printf '%s\\n' "$@" > "$GH_ARGS_FILE"
    cat > "$GH_BODY_FILE"
    echo "https://github.com/salesforce/design-system-react/pull/1"
    exit 0 ;;
esac
echo "unexpected gh call: $*" >&2
exit 1
`;

const BASE_PACKAGE = {
	name: '@salesforce/design-system-react',
	version: '11.0.0-alpha.3',
	publishConfig: { tag: 'alpha' },
	description: 'Salesforce Lightning Design System for React',
	scripts: { 'release-pr': 'tsx scripts/release.ts' },
};

let tmp;
let origin;
let work;
let env;

const sh = (cwd, cmd, args) => {
	const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', env });
	if (r.status !== 0)
		throw new Error(`${cmd} ${args.join(' ')} failed:\n${r.stderr}`);
	return r.stdout.trim();
};
const git = (...args) => sh(work, 'git', args);

const writePackage = (pkg) =>
	writeFileSync(
		join(work, 'package.json'),
		`${JSON.stringify(pkg, null, 2)}\n`
	);
const releasedPackage = (branch) =>
	JSON.parse(git('show', `origin/${branch}:package.json`));

/** Run the release script inside the work repo. */
const release = (...args) => {
	const r = spawnSync(TSX, ['scripts/release.ts', ...args], {
		cwd: work,
		encoding: 'utf8',
		env,
	});
	return { status: r.status, stdout: r.stdout, stderr: r.stderr };
};

/** Set up master at `version`, tagged and pushed, plus one commit after the tag. */
const seedMaster = (pkg) => {
	writePackage(pkg);
	git('add', '-A');
	git('commit', '-m', 'chore: release baseline');
	git('tag', `v${pkg.version}`);
	writeFileSync(join(work, 'feature.txt'), 'x\n');
	git('add', '-A');
	git('commit', '-m', 'feat: a change shipped since the last tag');
	git('push', '-u', 'origin', 'master', '--tags');
};

beforeEach(() => {
	tmp = mkdtempSync(join(tmpdir(), 'release-test-'));
	origin = join(tmp, 'salesforce', 'design-system-react.git');
	work = join(tmp, 'work');
	mkdirSync(origin, { recursive: true });
	mkdirSync(join(work, 'scripts'), { recursive: true });
	mkdirSync(join(tmp, 'bin'));

	writeFileSync(join(tmp, 'bin', 'gh'), GH_STUB);
	chmodSync(join(tmp, 'bin', 'gh'), 0o755);

	env = {
		...process.env,
		PATH: `${join(tmp, 'bin')}:${process.env.PATH}`,
		GH_ARGS_FILE: join(tmp, 'gh-args.txt'),
		GH_BODY_FILE: join(tmp, 'gh-body.txt'),
		GIT_CONFIG_GLOBAL: '/dev/null',
		GIT_CONFIG_SYSTEM: '/dev/null',
		GIT_AUTHOR_NAME: 'Test',
		GIT_AUTHOR_EMAIL: 'test@example.com',
		GIT_COMMITTER_NAME: 'Test',
		GIT_COMMITTER_EMAIL: 'test@example.com',
	};

	sh(origin, 'git', ['init', '--bare', '-b', 'master']);
	git('init', '-b', 'master');
	git('config', 'commit.gpgsign', 'false');
	git('remote', 'add', 'origin', origin);
	copyFileSync(SCRIPT, join(work, 'scripts', 'release.ts'));
	git('add', '-A');
	seedMaster(BASE_PACKAGE);
});

afterEach(() => rmSync(tmp, { recursive: true, force: true }));

describe('release script', () => {
	it('bumps a prerelease on a branch from origin/master, pushes it, and opens the PR', () => {
		// Start on an unrelated branch with unpushed work to prove the release
		// is cut from origin/master and the original branch is restored.
		git('switch', '-c', 'feat/unrelated');
		writeFileSync(join(work, 'unrelated.txt'), 'wip\n');
		git('add', '-A');
		git('commit', '-m', 'wip: should not ship');

		const r = release('next');
		expect(r.status, r.stderr).toBe(0);

		const branch = 'chore/release-11.0.0-alpha.4';
		git('fetch', 'origin', branch);

		// package.json: version bumped, dist-tag kept, key order preserved
		const pkg = releasedPackage(branch);
		expect(pkg.version).toBe('11.0.0-alpha.4');
		expect(pkg.publishConfig).toEqual({ tag: 'alpha' });
		expect(Object.keys(pkg)).toEqual(Object.keys(BASE_PACKAGE));

		// Only package.json differs from master; the unrelated work didn't leak in
		expect(
			git('diff', '--name-only', 'origin/master', `origin/${branch}`)
		).toBe('package.json');
		expect(git('log', '-1', '--format=%s', `origin/${branch}`)).toBe(
			'chore(release): update version to 11.0.0-alpha.4'
		);

		// Original branch restored, working tree clean
		expect(git('branch', '--show-current')).toBe('feat/unrelated');
		expect(git('status', '--porcelain', '--untracked-files=no')).toBe('');

		// gh pr create got the right args and a body listing changes since the tag
		const args = readFileSync(env.GH_ARGS_FILE, 'utf8').split('\n');
		const arg = (flag) => args[args.indexOf(flag) + 1];
		expect(arg('--repo')).toBe('salesforce/design-system-react');
		expect(arg('--base')).toBe('master');
		expect(arg('--head')).toBe(branch);
		expect(arg('--title')).toBe(
			'chore(release): update version to 11.0.0-alpha.4'
		);
		const body = readFileSync(env.GH_BODY_FILE, 'utf8');
		expect(body).toContain('`11.0.0-alpha.3` to `11.0.0-alpha.4`');
		expect(body).toContain('feat: a change shipped since the last tag');
		expect(body).not.toContain('wip: should not ship');

		// Tells the maintainer the follow-up step
		expect(r.stdout).toContain('pull/1');
		expect(r.stdout).toContain(
			'gh release create v11.0.0-alpha.4 --target master --generate-notes --prerelease'
		);
	});

	it('accepts an explicit version and sets the matching dist-tag', () => {
		const r = release('11.0.0-beta.1');
		expect(r.status, r.stderr).toBe(0);
		git('fetch', 'origin', 'chore/release-11.0.0-beta.1');
		const pkg = releasedPackage('chore/release-11.0.0-beta.1');
		expect(pkg.version).toBe('11.0.0-beta.1');
		expect(pkg.publishConfig.tag).toBe('beta');
	});

	it('drops publishConfig.tag for a stable release so it publishes as latest', () => {
		const r = release('11.0.0');
		expect(r.status, r.stderr).toBe(0);
		git('fetch', 'origin', 'chore/release-11.0.0');
		const pkg = releasedPackage('chore/release-11.0.0');
		expect(pkg.version).toBe('11.0.0');
		expect(pkg).not.toHaveProperty('publishConfig');
		expect(r.stdout).toContain(
			'gh release create v11.0.0 --target master --generate-notes'
		);
		expect(r.stdout).not.toContain('--prerelease');
	});

	it('keeps other publishConfig keys when removing the tag', () => {
		writePackage({
			...BASE_PACKAGE,
			publishConfig: { tag: 'alpha', access: 'public' },
		});
		git('commit', '-am', 'chore: extra publishConfig');
		git('push', 'origin', 'master');

		expect(release('11.0.0').status).toBe(0);
		git('fetch', 'origin', 'chore/release-11.0.0');
		expect(releasedPackage('chore/release-11.0.0').publishConfig).toEqual({
			access: 'public',
		});
	});

	it('--dry-run reports the plan and changes nothing', () => {
		const r = release('next', '--dry-run');
		expect(r.status, r.stderr).toBe(0);
		expect(r.stdout).toContain(
			'[dry-run] 11.0.0-alpha.3 -> 11.0.0-alpha.4 (dist-tag: alpha)'
		);

		expect(git('ls-remote', '--heads', 'origin', 'chore/release-*')).toBe('');
		expect(git('branch', '--list', 'chore/release-*')).toBe('');
		expect(existsSync(env.GH_ARGS_FILE)).toBe(false);
		expect(
			JSON.parse(readFileSync(join(work, 'package.json'), 'utf8')).version
		).toBe('11.0.0-alpha.3');
	});

	describe('refuses to run', () => {
		const expectFailure = (r, message) => {
			expect(r.status).toBe(1);
			expect(r.stderr).toContain(message);
			// Nothing was pushed or opened
			expect(git('ls-remote', '--heads', 'origin', 'chore/release-*')).toBe('');
			expect(existsSync(env.GH_ARGS_FILE)).toBe(false);
		};

		it('with no version', () => {
			expectFailure(release(), 'usage:');
		});

		it.each(['bogus', '11.0', 'v11.0.0', '11.0.0-alpha'])(
			'for unsupported version %s',
			(v) => {
				expectFailure(release(v), 'is not a supported version');
			}
		);

		it('when the version is already on master', () => {
			expectFailure(
				release('11.0.0-alpha.3'),
				'master is already at 11.0.0-alpha.3'
			);
		});

		it('when the tag already exists on origin', () => {
			git('tag', 'v11.0.0-alpha.4');
			git('push', 'origin', 'v11.0.0-alpha.4');
			expectFailure(release('next'), 'tag v11.0.0-alpha.4 already exists');
		});

		it('when "next" is used on a stable version', () => {
			writePackage({ ...BASE_PACKAGE, version: '11.0.0' });
			git('commit', '-am', 'chore: stable');
			git('push', 'origin', 'master');
			expectFailure(release('next'), '"next" needs a prerelease version');
		});

		it('when tracked files are modified', () => {
			writeFileSync(join(work, 'feature.txt'), 'dirty\n');
			expectFailure(release('next'), 'working tree is not clean');
		});

		it('when origin is not the upstream repo', () => {
			const fork = join(tmp, 'someone', 'fork.git');
			mkdirSync(fork, { recursive: true });
			sh(fork, 'git', ['init', '--bare', '-b', 'master']);
			git('remote', 'set-url', 'origin', fork);
			expectFailure(
				release('next'),
				'origin must be salesforce/design-system-react'
			);
		});
	});
});
