/*
 * Fail when a tracked doc, script, hook or workflow tells people to install or
 * run a package we haven't reviewed, or to pipe `curl` into a shell.
 *
 * Usage: tsx scripts/check-install-refs.ts   (also runs in `npm run test:ci`)
 *
 * Why: an install instruction naming a package we don't control (an unclaimed
 * npm scope, a typo, a squatted name) hands code execution to whoever owns it.
 * Dependabot only sees `package.json`, so prose and scripts need their own check.
 *
 * A package passes if it is a dependency in `package.json`, is under a scope we
 * own, or is in EXTRA_ALLOWED. To allow a reviewed one-off, add the package to
 * EXTRA_ALLOWED or put `install-refs: allow` on the same line.
 */
import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('..', import.meta.url));

const OWNED_SCOPES = ['@salesforce/', '@salesforce-ux/'];
// Run via `npx` but not listed as a dependency under that name.
const EXTRA_ALLOWED = ['commitlint'];

const SCANNED = /(\.md|\.sh|\.ya?ml|\.m?[jt]s)$|^\.husky\//;
const SKIPPED = /(^|\/)(CHANGELOG\.md|check-install-refs[^/]*)$/;

const INSTALL =
	/\b(npm\s+(?:i|install|add)|npx|pnpm\s+(?:add|dlx)|yarn\s+(?:add|dlx))\s+([^`|&;#)\n]*)/g;
const CURL_TO_SHELL =
	/\bcurl\b[^|\n]*\|\s*(?:sudo\s+)?(?:ba|z)?sh\b|\b(?:ba|z)?sh\s+<\(\s*curl\b/;
const PACKAGE_NAME = /^(@[a-z0-9~-][a-z0-9._~-]*\/)?[a-z0-9~-][a-z0-9._~-]*$/;

export interface Ref {
	line: number;
	target: string;
	reason:
		'unreviewed package' | 'not a registry package' | 'curl piped to shell';
}

/** Strip a trailing `@version` or `@tag`, keeping a leading scope `@`. */
function packageName(token: string): string {
	const at = token.indexOf('@', 1);
	return at === -1 ? token : token.slice(0, at);
}

export function findRefs(text: string, allowed: Set<string>): Ref[] {
	const refs: Ref[] = [];
	text.split('\n').forEach((lineText, i) => {
		const line = i + 1;
		if (lineText.includes('install-refs: allow')) return;

		if (CURL_TO_SHELL.test(lineText)) {
			refs.push({
				line,
				target: lineText.trim(),
				reason: 'curl piped to shell',
			});
		}

		for (const [, command, rest] of lineText.matchAll(INSTALL)) {
			let targets = rest
				.trim()
				.split(/\s+/)
				.filter((t) => t && !t.startsWith('-'));
			// `npx <pkg> <args...>`: only the first argument is a package.
			if (/^(npx|pnpm\s+dlx|yarn\s+dlx)$/.test(command)) {
				targets = targets.slice(0, 1);
			}
			for (const target of targets) {
				const name = packageName(target.replace(/^['"]|['"]$/g, ''));
				if (!PACKAGE_NAME.test(name)) {
					refs.push({ line, target, reason: 'not a registry package' });
				} else if (
					!allowed.has(name) &&
					!OWNED_SCOPES.some((scope) => name.startsWith(scope))
				) {
					refs.push({ line, target: name, reason: 'unreviewed package' });
				}
			}
		}
	});
	return refs;
}

function allowedPackages(): Set<string> {
	const pkg = JSON.parse(readFileSync(`${root}package.json`, 'utf8'));
	const names = [
		...Object.keys(pkg.dependencies ?? {}),
		...Object.keys(pkg.devDependencies ?? {}),
		...Object.keys(pkg.peerDependencies ?? {}),
		...EXTRA_ALLOWED,
	];
	return new Set(names);
}

function main(): number {
	const files = execFileSync('git', ['ls-files'], {
		cwd: root,
		encoding: 'utf8',
	})
		.split('\n')
		.filter((f) => SCANNED.test(f) && !SKIPPED.test(f));
	const allowed = allowedPackages();

	let failures = 0;
	for (const file of files) {
		for (const ref of findRefs(
			readFileSync(`${root}${file}`, 'utf8'),
			allowed
		)) {
			failures++;
			console.error(`${file}:${ref.line}: ${ref.reason}: ${ref.target}`);
		}
	}
	if (failures) {
		console.error(
			`\n${failures} install reference(s) need review. Anyone following these runs code we may not control.\n` +
				'If a reference is intended, add the package to EXTRA_ALLOWED in scripts/check-install-refs.ts\n' +
				'or put `install-refs: allow` on the line.'
		);
		return 1;
	}
	console.log(`check-install-refs: ${files.length} files OK`);
	return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	process.exit(main());
}
