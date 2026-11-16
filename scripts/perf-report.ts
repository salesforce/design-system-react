/*
 * Turn perf results into budgets and a Markdown report.
 *
 *   tsx scripts/perf-report.ts --results <vitest-json> [--update-budgets [--prune]]
 *       [--bench <bench-json>] [--baseline-bench <bench-json>] [--out <md>]
 *
 * `--results` is a `vitest run --reporter=json` file from the `perf` and
 * `perf-bundle` projects. Each test records `{ key, metrics, ideal }` entries
 * in `meta.perf` (see `checkBudget` and `recordPerf` in tests/perf/budget.ts).
 *
 * `--update-budgets` writes the measured values into `budgets` in
 * tests/perf/budgets.json. A metric within its ideal's allowance is left out,
 * since the ideal is the default, so the file lists only size metrics and the
 * values over the ideal (the known violations). A count still within its
 * recorded budget's slack keeps the recorded value. Report-only metrics
 * (`recordPerf`) aren't written; their `lists` go to `<list name>[key]`, e.g.
 * `components` for the bundle checks. Add `--prune` after a
 * full run to drop fixtures that no longer exist.
 *
 * `--bench`/`--baseline-bench` are `vitest bench --outputJson` files. With a
 * baseline, a benchmark whose mean is more than 20 % slower prints a GitHub
 * `::warning::` annotation. Timings never fail the run.
 *
 * Without `--out`, the report goes to stdout.
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'util';
import { format, resolveConfig } from 'prettier';

import { isStale, limit, type Allowance } from '../tests/perf/limits';

const root = fileURLToPath(new URL('..', import.meta.url));
const budgetPath = join(root, 'tests/perf/budgets.json');

type Metrics = Record<string, number>;

interface PerfRecord {
	key: string;
	metrics: Metrics;
	ideal: Metrics;
	checked: boolean;
	lists?: Record<string, string[]>;
}

interface BudgetFile extends Allowance {
	budgets: Record<string, Metrics>;
	[list: string]: unknown;
}

interface JsonResults {
	testResults: {
		assertionResults: {
			fullName: string;
			status: string;
			meta?: { perf?: PerfRecord[] };
		}[];
	}[];
}

interface BenchResult {
	name: string;
	mean: number;
	p75: number;
	median?: number;
	hz: number;
	sampleCount: number;
}

interface BenchJson {
	files: {
		filepath: string;
		groups: { fullName: string; benchmarks: BenchResult[] }[];
	}[];
}

const REGRESSION = 0.2;
// Browser timers have ~0.1 ms resolution; faster benchmarks are mostly noise,
// so they're reported but never flagged.
const MIN_FLAGGED_MS = 0.5;

const { values } = parseArgs({
	options: {
		results: { type: 'string' },
		bench: { type: 'string' },
		'baseline-bench': { type: 'string' },
		out: { type: 'string' },
		'update-budgets': { type: 'boolean', default: false },
		prune: { type: 'boolean', default: false },
	},
});

const readJson = <T>(path: string): T =>
	JSON.parse(readFileSync(path, 'utf8')) as T;

const budgetFile = readJson<BudgetFile>(budgetPath);

// --- Collect ---------------------------------------------------------------

interface Collected {
	/** Every metric, for the report. */
	metrics: Metrics;
	/** Checked metrics only, for the budgets. */
	checked: Metrics;
	ideal: Metrics;
}
const records = new Map<string, Collected>();
const lists = new Map<string, Map<string, string[]>>();
let failed = 0;
if (values.results && existsSync(values.results)) {
	const results = readJson<JsonResults>(values.results);
	for (const file of results.testResults) {
		for (const test of file.assertionResults) {
			if (test.status === 'failed') failed += 1;
			for (const record of test.meta?.perf ?? []) {
				const entry = records.get(record.key) ?? {
					metrics: {},
					checked: {},
					ideal: {},
				};
				Object.assign(entry.metrics, record.metrics);
				if (record.checked) Object.assign(entry.checked, record.metrics);
				Object.assign(entry.ideal, record.ideal);
				records.set(record.key, entry);
				for (const [name, list] of Object.entries(record.lists ?? {})) {
					const byKey = lists.get(name) ?? new Map<string, string[]>();
					byKey.set(record.key, list);
					lists.set(name, byKey);
				}
			}
		}
	}
}

// --- Update budgets --------------------------------------------------------

if (values['update-budgets']) {
	if (!records.size) {
		console.error('perf-report: no perf results to record (pass --results).');
		process.exit(1);
	}
	// Merge, so a filtered run (`-t`, one file) only updates what it measured.
	// `--prune` drops fixtures the run didn't measure (removed stories).
	const budgets: Record<string, Metrics> = values.prune
		? {}
		: structuredClone(budgetFile.budgets);
	for (const [key, { checked, ideal }] of records) {
		const kept: Metrics = { ...budgets[key] };
		for (const [metric, value] of Object.entries(checked)) {
			const base = ideal[metric];
			const recorded = budgetFile.budgets[key]?.[metric];
			if (base !== undefined && value <= limit(base, metric, budgetFile)) {
				delete kept[metric];
			} else if (
				base !== undefined &&
				recorded !== undefined &&
				value <= limit(recorded, metric, budgetFile) &&
				!isStale(value, recorded, metric, budgetFile)
			) {
				// Within the recorded budget's slack (run-to-run noise): keep it, so
				// re-recording doesn't churn budgets.json.
				kept[metric] = recorded;
			} else kept[metric] = value;
		}
		if (Object.keys(kept).length) budgets[key] = kept;
		else delete budgets[key];
	}
	const sortKeys = <T>(object: Record<string, T>) =>
		Object.fromEntries(
			Object.keys(object)
				.sort()
				.map((key) => [key, object[key]])
		);
	const listFields: Record<string, Record<string, string[]>> = {};
	for (const [name, byKey] of lists) {
		const existing = values.prune
			? {}
			: ((budgetFile[name] as Record<string, string[]>) ?? {});
		listFields[name] = sortKeys({ ...existing, ...Object.fromEntries(byKey) });
	}
	const sorted = Object.fromEntries(
		Object.entries(sortKeys(budgets)).map(([key, metrics]) => [
			key,
			sortKeys(metrics),
		])
	);
	// Format as lint-staged would, so a recording commits without churn.
	writeFileSync(
		budgetPath,
		await format(
			JSON.stringify({ ...budgetFile, budgets: sorted, ...listFields }),
			{ ...(await resolveConfig(budgetPath)), filepath: budgetPath }
		)
	);
	console.log(
		`perf-report: wrote ${Object.keys(sorted).length} budget entries to tests/perf/budgets.json.`
	);
	if (!values.out && !values.bench) process.exit(0);
}

// --- Report ----------------------------------------------------------------

const lines: string[] = [];
const out = (line = '') => lines.push(line);
const table = (head: string[], rows: (string | number)[][]) => {
	out(`| ${head.join(' | ')} |`);
	out(`|${head.map(() => '---').join('|')}|`);
	for (const row of rows) out(`| ${row.join(' | ')} |`);
	out();
};
const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} kB`;

const pkg = readJson<{ version: string }>(join(root, 'package.json'));
out(`# Design System React ${pkg.version}: performance report`);
out();
out(
	'Generated by `scripts/perf-report.ts`. Budgets are checked by `npm run test:perf`; ' +
		'timings come from `npm run perf:bench` and are report-only.'
);
out();

if (records.size) {
	out(`Checked ${records.size} fixtures; ${failed} failing tests.`);
	out();

	// Violations: measured above the ideal's allowance.
	const violations: (string | number)[][] = [];
	for (const [key, { metrics, ideal }] of [...records].sort(([a], [b]) =>
		a.localeCompare(b)
	)) {
		for (const [metric, value] of Object.entries(metrics)) {
			const base = ideal[metric];
			if (base !== undefined && value > limit(base, metric, budgetFile)) {
				violations.push([key, metric, value, ideal[metric]]);
			}
		}
	}
	out('## Best-practice violations');
	out();
	out(
		'Measured above the ideal. These are the current baseline in `budgets.json`, ' +
			'so they pass, but each one is a follow-up fix.'
	);
	out();
	const byMetric = new Map<string, number>();
	for (const [, metric] of violations) {
		byMetric.set(metric as string, (byMetric.get(metric as string) ?? 0) + 1);
	}
	table(
		['Metric', 'Fixtures over ideal'],
		[...byMetric].sort(([a], [b]) => a.localeCompare(b))
	);
	if (violations.length) {
		out('<details><summary>All violations</summary>');
		out();
		table(['Fixture', 'Metric', 'Measured', 'Ideal'], violations);
		out('</details>');
		out();
	}

	const bundles = [...records].filter(([key]) => key.startsWith('bundle:'));
	if (bundles.length) {
		out('## Bundle size per entry');
		out();
		out(
			'A one-line consumer of each entry, bundled and minified with dependencies ' +
				'(React external), then gzipped.'
		);
		out();
		table(
			['Entry', 'gzip', 'Components', 'Dependencies'],
			bundles.map(([key, { metrics }]) => [
				key.replace('bundle:', ''),
				kb(metrics.gzipBytes),
				metrics.components,
				metrics.dependencies,
			])
		);
	}

	const css = [...records].filter(([key]) => key.startsWith('css:'));
	if (css.length) {
		out('## CSS size per component');
		out();
		table(
			['Module', 'Bytes'],
			css.map(([key, { metrics }]) => [
				key.replace('css:', ''),
				kb(metrics.cssBytes),
			])
		);
	}

	const sizes = [...records]
		.filter(
			([key]) =>
				!key.includes(':') && records.get(key)!.metrics.domNodes !== undefined
		)
		.sort(([, a], [, b]) => b.metrics.domNodes - a.metrics.domNodes)
		.slice(0, 15);
	if (sizes.length) {
		out('## Largest stories (DOM nodes)');
		out();
		table(
			['Story', 'DOM nodes', 'Mount commits', 'SSR'],
			sizes.map(([key, { metrics }]) => [
				key,
				metrics.domNodes,
				metrics.commits ?? '',
				metrics.ssrBytes !== undefined ? kb(metrics.ssrBytes) : '',
			])
		);
	}
}

// --- Benchmarks ------------------------------------------------------------

const flattenBench = (bench: BenchJson) => {
	const map = new Map<string, BenchResult>();
	for (const file of bench.files) {
		for (const group of file.groups) {
			for (const result of group.benchmarks) {
				map.set(`${group.fullName} > ${result.name}`, result);
			}
		}
	}
	return map;
};

if (values.bench && existsSync(values.bench)) {
	const current = flattenBench(readJson<BenchJson>(values.bench));
	const baselinePath = values['baseline-bench'];
	const baseline =
		baselinePath && existsSync(baselinePath)
			? flattenBench(readJson<BenchJson>(baselinePath))
			: undefined;
	out('## Timings (report-only)');
	out();
	out(
		baseline
			? `Compared with the baseline; over ${REGRESSION * 100} % slower is flagged (benchmarks under ${MIN_FLAGGED_MS} ms aren't).`
			: 'No baseline given, so no comparison.'
	);
	out();
	const ms = (n: number) => `${n.toPrecision(3)} ms`;
	const rows: (string | number)[][] = [];
	for (const [name, result] of current) {
		const before = baseline?.get(name);
		let diff = '';
		if (before) {
			const change = result.mean / before.mean - 1;
			diff = `${change >= 0 ? '+' : ''}${(change * 100).toFixed(1)} %`;
			if (change > REGRESSION && before.mean >= MIN_FLAGGED_MS) {
				diff += ' ⚠️';
				// GitHub annotation; never fails the job.
				console.log(
					`::warning title=Benchmark regression::${name} is ${diff} slower than the baseline`
				);
			}
		}
		rows.push([
			name,
			ms(result.median ?? result.mean),
			ms(result.p75),
			result.sampleCount,
			diff,
		]);
	}
	table(['Benchmark', 'Median', 'p75', 'Samples', 'vs. baseline'], rows);
}

const report = lines.join('\n');
if (values.out) {
	writeFileSync(values.out, report);
	console.log(`perf-report: wrote ${values.out}`);
} else if (!values['update-budgets']) {
	console.log(report);
}
