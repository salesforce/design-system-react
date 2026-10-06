/*
 * Prepare a release PR: bump the package version on a fresh branch cut from
 * origin/master, commit, push, and open the PR.
 *
 * Usage:
 *   node scripts/release.mjs <version | next> [--dry-run]
 *
 *   <version>  Explicit version, e.g. 11.0.0-alpha.4 or 11.0.0
 *   next       Increment the trailing number of the current prerelease
 *              (11.0.0-alpha.3 -> 11.0.0-alpha.4). Not valid for stable versions.
 *   --dry-run  Print what would happen; change nothing.
 *
 * This stops at the PR. After it merges, create the GitHub Release
 * (`gh release create v<version> --target master [--prerelease]`), which
 * triggers .github/workflows/npm-publish.yml.
 *
 * `publishConfig.tag` is kept in step with the version: `alpha` / `beta` / `rc`
 * for prereleases, removed for stable releases (so they publish as `latest`).
 */
import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('..', import.meta.url));
const pkgPath = `${root}package.json`;
const REPO = 'salesforce/design-system-react';
const SEMVER = /^\d+\.\d+\.\d+(-([a-z]+)\.\d+)?$/;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const [input] = args.filter((a) => !a.startsWith('--'));

const run = (cmd, cmdArgs, opts = {}) =>
	execFileSync(cmd, cmdArgs, {
		cwd: root,
		encoding: 'utf8',
		stdio: ['pipe', 'pipe', 'inherit'],
		...opts,
	}).trim();
const git = (...a) => run('git', a);
const fail = (msg) => {
	console.error(`release: ${msg}`);
	process.exit(1);
};
const step = (msg) => console.log(`${dryRun ? '[dry-run] ' : ''}${msg}`);

if (!input) fail('usage: node scripts/release.mjs <version | next> [--dry-run]');

// Preflight
if (git('status', '--porcelain', '--untracked-files=no')) fail('working tree is not clean');
if (!git('remote', 'get-url', 'origin').includes(REPO)) {
	fail(`origin must be ${REPO}, not a fork`);
}
run('gh', ['auth', 'status']);
git('fetch', 'origin', 'master');

// Read the current version from origin/master, not the working branch.
const masterPkg = JSON.parse(git('show', 'origin/master:package.json'));
const current = masterPkg.version;

let version = input;
if (input === 'next') {
	const m = current.match(/^(.*-[a-z]+\.)(\d+)$/);
	if (!m) fail(`"next" needs a prerelease version, but master is at ${current}`);
	version = `${m[1]}${Number(m[2]) + 1}`;
}
if (!SEMVER.test(version)) fail(`"${version}" is not a supported version (x.y.z or x.y.z-alpha.N)`);
if (version === current) fail(`master is already at ${version}`);
if (git('ls-remote', '--tags', 'origin', `v${version}`)) fail(`tag v${version} already exists`);

const distTag = version.match(SEMVER)[2]; // undefined for stable
const branch = `chore/release-${version}`;
const title = `chore(release): update version to ${version}`;
const originalBranch = git('rev-parse', '--abbrev-ref', 'HEAD');

step(`${current} -> ${version} (dist-tag: ${distTag ?? 'latest'})`);
step(`branch ${branch} from origin/master, commit "${title}", push, open PR`);
if (dryRun) process.exit(0);

git('switch', '-c', branch, '--no-track', 'origin/master');
try {
	// Rewrite package.json, preserving key order.
	const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
	const next = {};
	for (const [key, value] of Object.entries(pkg)) {
		if (key === 'publishConfig') continue;
		next[key] = key === 'version' ? version : value;
		if (key === 'version' && distTag) {
			next.publishConfig = { ...pkg.publishConfig, tag: distTag };
		}
	}
	if (!distTag && pkg.publishConfig) {
		const { tag: _tag, ...rest } = pkg.publishConfig;
		if (Object.keys(rest).length) next.publishConfig = rest;
	}
	writeFileSync(pkgPath, `${JSON.stringify(next, null, 2)}\n`);

	const changed = git('diff', '--name-only');
	if (changed !== 'package.json') throw new Error(`expected only package.json to change, got: ${changed}`);

	const lastTag = `v${current}`;
	const log = git('log', '--oneline', `${lastTag}..origin/master`);
	git('commit', '-am', title);
	git('push', '-u', 'origin', branch);

	const body = [
		'Fixes #',
		'',
		'### Additional description',
		'',
		`Bumps the package version from \`${current}\` to \`${version}\` (npm dist-tag: \`${distTag ?? 'latest'}\`).`,
		'After this merges, create the GitHub Release `v' + version + '` to publish.',
		'',
		`Changes since \`${lastTag}\`:`,
		'',
		'```',
		log || '(none found; check that the previous tag exists)',
		'```',
	].join('\n');
	const url = run(
		'gh',
		['pr', 'create', '--repo', REPO, '--base', 'master', '--head', branch, '--title', title, '--body-file', '-'],
		{ input: body },
	);
	console.log(`\nOpened ${url}`);
	console.log(`After it merges: gh release create v${version} --target master --generate-notes${distTag ? ' --prerelease' : ''}`);
} finally {
	git('switch', originalBranch);
}
