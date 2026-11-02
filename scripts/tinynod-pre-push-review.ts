/*
 * Optional, advisory TinyNod AI review of the pushed commit, run by the husky
 * pre-push hook for authorized Salesforce developers who opt in. See
 * docs/tinynod-local-review.md.
 *
 * Usage (from .husky/pre-push, with git's ref tuples on stdin):
 *   tsx scripts/tinynod-pre-push-review.ts
 *
 * Off by default. It never blocks a push: every path exits 0, and the result is
 * read from TinyNod's JSON output, not its exit code. CI never runs it.
 *
 * Reads git's pre-push ref tuples on stdin:
 *   <local ref> <local oid> <remote ref> <remote oid>
 */
import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const MIN_VERSION = [2, 5, 0];
const REVIEW_TIMEOUT_MS = 300_000;
const FINDINGS_SHOWN = 10;
const ZERO_OID = /^0+$/;
const BASE_BRANCH = 'origin/master';

export interface RefTuple {
	localRef: string;
	localOid: string;
	remoteRef: string;
	remoteOid: string;
}

export interface TargetChecks {
	head: string | null;
	isAncestor: (ancestor: string, descendant: string) => boolean;
	mergeBase: (a: string, b: string) => string | null;
}

export type Target = { oid: string; base: string } | { skip: string };

/** One TinyNod comment; field names vary between TinyNod versions. */
export interface Finding {
	severity?: string;
	filePath?: string;
	file?: string;
	path?: string;
	lineNumber?: number;
	line?: number;
	comment?: string;
	title?: string;
	message?: string;
}

export interface Verdict {
	status: 'clean' | 'findings' | 'partial' | 'no_changes' | 'warning';
	message: string;
	findings?: Finding[];
}

interface ReviewPayload {
	error?: unknown;
	status?: string;
	noChanges?: boolean;
	failed?: unknown;
	partial?: boolean;
	summary?: unknown;
	comments?: unknown;
	findings?: unknown;
}

const log = (message: string) =>
	console.log(`pre-push: tinynod review ${message}`);

const git = (args: string[]): string | null => {
	const r = spawnSync('git', args, { encoding: 'utf8' });
	return r.status === 0 ? r.stdout.trim() : null;
};

const parseFlag = (value: string | null | undefined): boolean | null => {
	const v = String(value ?? '')
		.trim()
		.toLowerCase();
	if (['1', 'true', 'yes', 'on'].includes(v)) return true;
	if (['0', 'false', 'no', 'off', ''].includes(v)) return false;
	return null;
};

// TINYNOD_SKIP_HOOK > DSR_TINYNOD_REVIEW > git config dsr.tinynod.enabled.
export function isEnabled(
	env: NodeJS.ProcessEnv,
	configValue: string | null
): boolean {
	if (parseFlag(env.TINYNOD_SKIP_HOOK)) return false;
	if (env.DSR_TINYNOD_REVIEW !== undefined)
		return parseFlag(env.DSR_TINYNOD_REVIEW) === true;
	return parseFlag(configValue) === true;
}

export function parseTuples(stdin: string): RefTuple[] {
	return stdin
		.split('\n')
		.map((line) => line.trim().split(/\s+/))
		.filter((parts) => parts.length === 4)
		.map(([localRef, localOid, remoteRef, remoteOid]) => ({
			localRef,
			localOid,
			remoteRef,
			remoteOid,
		}));
}

const isProtected = (ref: string) =>
	ref === 'refs/heads/master' || ref.startsWith('refs/tags/');

/*
 * One pushed commit and the base to review it against, or a skip reason.
 * Reviews only the new commits when the remote branch is an ancestor;
 * otherwise (new branch, force-push) everything since the merge-base with
 * origin/master.
 */
export function selectTarget(
	tuples: RefTuple[],
	{ head, isAncestor, mergeBase }: TargetChecks
): Target {
	const pushed = tuples.filter((t) => !ZERO_OID.test(t.localOid));
	if (!pushed.length) return { skip: 'nothing to review' };
	if (pushed.some((t) => isProtected(t.remoteRef)))
		return { skip: 'push to master or a tag' };
	const oids = new Set(pushed.map((t) => t.localOid));
	if (oids.size !== 1) return { skip: 'push updates more than one commit' };
	const [{ localOid, remoteOid }] = pushed;
	if (localOid !== head)
		return { skip: 'pushed commit is not the checked-out HEAD' };
	if (!ZERO_OID.test(remoteOid) && isAncestor(remoteOid, localOid))
		return { oid: localOid, base: remoteOid };
	const base = mergeBase(BASE_BRANCH, localOid);
	return base
		? { oid: localOid, base }
		: { skip: `no merge-base with ${BASE_BRANCH} (run git fetch origin)` };
}

export function versionOk(text: string | null | undefined): boolean {
	const match = String(text ?? '').match(/(\d+)\.(\d+)\.(\d+)/);
	if (!match) return false;
	const version = match.slice(1).map(Number);
	for (let i = 0; i < 3; i += 1) {
		if (version[i] !== MIN_VERSION[i]) return version[i] > MIN_VERSION[i];
	}
	return true;
}

// Whole output first, then from the first line that starts a JSON object, so
// a log line before the result does not hide it.
function parseJson(stdout: string): ReviewPayload | null {
	const attempt = (text: string): ReviewPayload | null => {
		try {
			const parsed: unknown = JSON.parse(text);
			return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
				? (parsed as ReviewPayload)
				: null;
		} catch {
			return null;
		}
	};
	const whole = attempt(stdout);
	if (whole) return whole;
	const start = stdout.search(/^\{/m);
	return start === -1 ? null : attempt(stdout.slice(start));
}

/*
 * Classify a finished review. A skipped, failed or timed-out review is a
 * `warning`, never `clean`.
 */
export function classify({
	stdout = '',
	stderr = '',
	error,
	timedOut,
}: {
	stdout?: string;
	stderr?: string;
	error?: Error;
	timedOut?: boolean;
}): Verdict {
	if (timedOut)
		return {
			status: 'warning',
			message: `timed out after ${REVIEW_TIMEOUT_MS / 1000}s`,
		};
	if (error) return { status: 'warning', message: error.message };
	const payload = parseJson(stdout.trim());
	if (!payload) {
		const last = stderr.trim().split('\n').pop();
		return {
			status: 'warning',
			message: `no JSON result${last ? `: ${last}` : ''}`,
		};
	}
	if (payload.error)
		return {
			status: 'warning',
			message:
				typeof payload.error === 'string'
					? payload.error
					: JSON.stringify(payload.error),
		};
	if (payload.status === 'no_changes' || payload.noChanges === true)
		return { status: 'no_changes', message: 'no changes to review' };
	if (typeof payload.failed !== 'boolean')
		return { status: 'warning', message: 'unrecognized result shape' };
	// TinyNod reports findings as `comments`.
	const findings = ([payload.comments, payload.findings].find(Array.isArray) ??
		[]) as Finding[];
	const count = `${findings.length} finding${findings.length === 1 ? '' : 's'}`;
	if (
		payload.partial === true ||
		payload.status === 'partial' ||
		/^Partial review:/.test(String(payload.summary ?? ''))
	)
		return {
			status: 'partial',
			message: `only part of the diff was reviewed, ${count}`,
			findings,
		};
	if (findings.length) return { status: 'findings', message: count, findings };
	if (payload.failed)
		return {
			status: 'findings',
			message: 'review failed its severity threshold but listed no comments',
		};
	return { status: 'clean', message: 'no findings' };
}

export function describeFinding(finding: Finding): string {
	const place = [
		finding.filePath ?? finding.file ?? finding.path,
		finding.lineNumber ?? finding.line,
	]
		.filter((part) => part !== undefined && part !== null)
		.join(':');
	const text = String(
		finding.comment ?? finding.title ?? finding.message ?? ''
	).split('\n')[0];
	return `  [${finding.severity ?? 'unknown'}] ${place ? `${place} ` : ''}${text}`.trimEnd();
}

function main(): void {
	// Exit early, silently, unless opted in via `git config dsr.tinynod.enabled`
	// (or the env overrides in isEnabled), so contributors who haven't opted in
	// see no output and `tinynod` is never called.
	if (!isEnabled(process.env, git(['config', '--get', 'dsr.tinynod.enabled'])))
		return;

	const version = spawnSync('tinynod', ['--version'], {
		encoding: 'utf8',
		timeout: 10_000,
	});
	if ((version.error as NodeJS.ErrnoException | undefined)?.code === 'ENOENT') {
		log('skipped: tinynod not found on PATH');
		return;
	}
	if (version.status !== 0 || !versionOk(version.stdout)) {
		log(
			`skipped: tinynod ${MIN_VERSION.join('.')}+ required (got ${JSON.stringify(version.stdout?.trim() ?? '')})`
		);
		return;
	}

	const target = selectTarget(parseTuples(readFileSync(0, 'utf8')), {
		head: git(['rev-parse', 'HEAD']),
		isAncestor: (a, b) =>
			spawnSync('git', ['merge-base', '--is-ancestor', a, b]).status === 0,
		mergeBase: (a, b) => git(['merge-base', a, b]),
	});
	if ('skip' in target) {
		log(`skipped: ${target.skip}`);
		return;
	}

	const changed = git(['diff', '--name-only', target.base, target.oid]) ?? '';
	if (changed && changed.split('\n').every((file) => file.endsWith('.md'))) {
		log('skipped: docs-only push');
		return;
	}

	const range = `base ${target.base.slice(0, 12)}, head ${target.oid.slice(0, 12)}`;
	log(`started (${range}, advisory, up to ${REVIEW_TIMEOUT_MS / 1000}s)`);
	const result = spawnSync(
		'tinynod',
		['review', '--base', target.base, '--format', 'json'],
		{
			encoding: 'utf8',
			timeout: REVIEW_TIMEOUT_MS,
			maxBuffer: 16 * 1024 * 1024,
		}
	);
	const verdict = classify({
		stdout: result.stdout ?? '',
		stderr: result.stderr ?? '',
		error: result.error,
		timedOut:
			(result.error as NodeJS.ErrnoException | undefined)?.code === 'ETIMEDOUT',
	});
	log(`(advisory) ${verdict.status}: ${verdict.message}`);
	const findings = verdict.findings ?? [];
	for (const finding of findings.slice(0, FINDINGS_SHOWN))
		console.log(describeFinding(finding));
	if (findings.length > FINDINGS_SHOWN)
		console.log(`  ... ${findings.length - FINDINGS_SHOWN} more`);
	if (verdict.status !== 'clean' && verdict.status !== 'no_changes')
		console.log(`  Re-run: tinynod review --base ${target.base} --format json`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	try {
		main();
	} catch (error) {
		log(`unavailable: ${(error as Error).message}`);
	}
	process.exitCode = 0;
}
