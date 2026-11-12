/*
 * Prepare a release PR: bump the package version on a fresh branch cut from
 * origin/<base> (default master), commit, push, and open the PR.
 *
 * Usage:
 *   tsx scripts/release.ts <version | next> [--base <branch>] [--dry-run]
 *
 *   <version>        Explicit version, e.g. 11.0.0-alpha.4 or 11.0.0
 *   next             Increment the trailing number of the current prerelease
 *                    (11.0.0-alpha.3 -> 11.0.0-alpha.4). On a maintenance
 *                    branch (`--base` other than master), a stable version gets
 *                    a patch bump (0.10.65 -> 0.10.66). Not valid for a stable
 *                    version on master.
 *   --base <branch>  Release from this branch instead of master, e.g. 0.10.x.
 *   --dry-run        Print what would happen; change nothing.
 *
 * This stops at the PR. After it merges, create the GitHub Release
 * (`gh release create v<version> --target <base> [--prerelease]`), which
 * triggers the base branch's .github/workflows/npm-publish.yml.
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

interface PackageJson {
	publishConfig?: Record<string, unknown>;
	[key: string]: unknown;
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const baseIndex = args.indexOf('--base');
const base = baseIndex === -1 ? 'master' : args[baseIndex + 1];
const [input] = args.filter(
	(a, i) => !a.startsWith('--') && (baseIndex === -1 || i !== baseIndex + 1)
);
const USAGE =
	'usage: tsx scripts/release.ts <version | next> [--base <branch>] [--dry-run]';

const run = (
	cmd: string,
	cmdArgs: string[],
	opts: { input?: string } = {}
): string =>
	execFileSync(cmd, cmdArgs, {
		cwd: root,
		encoding: 'utf8',
		stdio: ['pipe', 'pipe', 'inherit'],
		...opts,
	}).trim();
const git = (...a: string[]): string => run('git', a);
const fail = (msg: string): never => {
	console.error(`release: ${msg}`);
	process.exit(1);
};
const step = (msg: string) =>
	console.log(`${dryRun ? '[dry-run] ' : ''}${msg}`);

if (!input) fail(USAGE);
if (!base || base.startsWith('--')) fail(USAGE);

// Preflight
if (git('status', '--porcelain', '--untracked-files=no'))
	fail('working tree is not clean');
if (!git('remote', 'get-url', 'origin').includes(REPO)) {
	fail(`origin must be ${REPO}, not a fork`);
}
run('gh', ['auth', 'status']);
git('fetch', 'origin', base);

// Read the current version from origin/<base>, not the working branch.
const basePkg = JSON.parse(git('show', `origin/${base}:package.json`));
const current = basePkg.version;

let version = input;
if (input === 'next') {
	const prerelease = current.match(/^(.*-[a-z]+\.)(\d+)$/);
	const stable = current.match(/^(\d+\.\d+\.)(\d+)$/);
	if (prerelease) {
		version = `${prerelease[1]}${Number(prerelease[2]) + 1}`;
	} else if (stable && base !== 'master') {
		version = `${stable[1]}${Number(stable[2]) + 1}`;
	} else {
		fail(`"next" needs a prerelease version, but ${base} is at ${current}`);
	}
}
if (!SEMVER.test(version))
	fail(`"${version}" is not a supported version (x.y.z or x.y.z-alpha.N)`);
if (version === current) fail(`${base} is already at ${version}`);
if (git('ls-remote', '--tags', 'origin', `v${version}`))
	fail(`tag v${version} already exists`);

const distTag = version.match(SEMVER)?.[2]; // undefined for stable
const branch = `chore/release-${version}`;
const title = `chore(release): update version to ${version}`;
const originalBranch = git('rev-parse', '--abbrev-ref', 'HEAD');

step(`${current} -> ${version} (dist-tag: ${distTag ?? 'latest'})`);
step(`branch ${branch} from origin/${base}, commit "${title}", push, open PR`);
if (dryRun) process.exit(0);

git('switch', '-c', branch, '--no-track', `origin/${base}`);
try {
	// Rewrite package.json, preserving key order and the branch's indentation
	// (0.10.x uses tabs).
	const raw = readFileSync(pkgPath, 'utf8');
	const indent = raw.match(/^\{\r?\n([ \t]+)"/)?.[1] ?? 2;
	const pkg: PackageJson = JSON.parse(raw);
	const next: Record<string, unknown> = {};
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
	writeFileSync(pkgPath, `${JSON.stringify(next, null, indent)}\n`);

	const changed = git('diff', '--name-only');
	if (changed !== 'package.json')
		throw new Error(`expected only package.json to change, got: ${changed}`);

	const lastTag = `v${current}`;
	const log = git('log', '--oneline', `${lastTag}..origin/${base}`);
	git('commit', '-am', title);
	git('push', '-u', 'origin', branch);

	const body = [
		'Fixes #',
		'',
		'### Additional description',
		'',
		`Bumps the package version from \`${current}\` to \`${version}\` (npm dist-tag: \`${distTag ?? 'latest'}\`).`,
		'After this merges, create the GitHub Release `v' +
			version +
			'` to publish.',
		'',
		`Changes since \`${lastTag}\`:`,
		'',
		'```',
		log || '(none found; check that the previous tag exists)',
		'```',
	].join('\n');
	const url = run(
		'gh',
		[
			'pr',
			'create',
			'--repo',
			REPO,
			'--base',
			base,
			'--head',
			branch,
			'--title',
			title,
			'--body-file',
			'-',
		],
		{ input: body }
	);
	console.log(`\nOpened ${url}`);
	console.log(
		`After it merges: gh release create v${version} --target ${base} --generate-notes${distTag ? ' --prerelease' : ''}`
	);
} finally {
	git('switch', originalBranch);
}
