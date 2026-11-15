/// <reference types="vite/client" />
/*
 * Budget checks shared by the `perf` (browser) and `perf-bundle` (Node)
 * projects. No DOM access, so both can import it.
 */
import { expect } from 'vitest';
import { getCurrentTest } from 'vitest/suite';

import budgetFile from './budgets.json';
import { isStale, limit, type Allowance } from './limits';

export type Metrics = Record<string, number>;

interface BudgetFile extends Allowance {
	budgets: Record<string, Metrics>;
}

const { budgets, ...allowance } = budgetFile as BudgetFile;

/** `npm run perf:budgets` records values without failing. */
// Vitest exposes env vars on `import.meta.env` in both browser and Node.
export const isUpdatingBudgets = Boolean(import.meta.env.VITE_PERF_UPDATE);

export interface PerfRecord {
	key: string;
	metrics: Metrics;
	ideal: Metrics;
	/** Checked against the budget (else report-only, not written to it). */
	checked: boolean;
	/** Lists written to `budgets.json` `<name>[key]`, e.g. a bundle's components. */
	lists?: Record<string, string[]>;
}

const record = (entry: PerfRecord) => {
	const test = getCurrentTest();
	if (!test) return;
	const meta = test.meta as { perf?: PerfRecord[] };
	meta.perf = [...(meta.perf ?? []), entry];
};

/**
 * Record report-only metrics on the current test for `scripts/perf-report.ts`.
 * They aren't checked or written to `budgets.json`; `lists` are, under
 * `budgets.json` `<list name>[key]`.
 */
export const recordPerf = (
	key: string,
	metrics: Metrics,
	lists?: Record<string, string[]>
) => record({ key, metrics, ideal: {}, checked: false, lists });

/**
 * Check `metrics` against `budgets.json[key]` and record them.
 *
 * `ideal` is the value a well-behaved component reaches (e.g. 0 leaked
 * listeners). A metric with no recorded budget falls back to its ideal. Size
 * metrics have no ideal and must have a budget; their allowance comes from
 * `budgets.json` `tolerance` and `slack` (see `limit` in `limits.ts`). Counts
 * have neither, so they're exact.
 *
 * A metric with an ideal also fails when it's under its recorded budget by
 * more than its allowance: the improvement has to be recorded, so it can't
 * quietly come back. Sizes have no ideal, so they can shrink freely.
 */
export const checkBudget = (
	key: string,
	metrics: Metrics,
	ideal: Metrics = {}
) => {
	record({ key, metrics, ideal, checked: true });
	if (isUpdatingBudgets) return;

	for (const [metric, value] of Object.entries(metrics)) {
		const budget = budgets[key]?.[metric] ?? ideal[metric];
		if (budget === undefined) {
			expect
				.soft(
					budget,
					`${key} ${metric}: no budget, run \`npm run perf:budgets\``
				)
				.toBeDefined();
			continue;
		}
		expect
			.soft(value, `${key} ${metric} (budget ${budget})`)
			.toBeLessThanOrEqual(limit(budget, metric, allowance));
		const recorded = budgets[key]?.[metric];
		if (
			ideal[metric] !== undefined &&
			recorded !== undefined &&
			isStale(value, recorded, metric, allowance)
		) {
			expect
				.soft(
					value,
					`${key} ${metric} improved to ${value} (budget ${recorded}); run \`npm run perf:budgets\` to lock it in`
				)
				.toBeGreaterThanOrEqual(
					2 * recorded - limit(recorded, metric, allowance)
				);
		}
	}
};
