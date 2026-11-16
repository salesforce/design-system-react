/*
 * The budget rule, shared by `budget.ts` (checking) and
 * `scripts/perf-report.ts` (recording and reporting). No Vitest imports, so
 * the script can load it.
 */

export interface Allowance {
	/** Relative allowance per metric, e.g. `0.1` is +10 %. */
	tolerance: Record<string, number>;
	/** Minimum absolute allowance per metric, so small values can still grow. */
	slack: Record<string, number>;
}

/**
 * The highest value that passes for a budget (or ideal) of `base`: the larger
 * of `base` plus its tolerance and `base` plus its slack. A metric with
 * neither is exact.
 */
export const limit = (
	base: number,
	metric: string,
	{ tolerance, slack }: Allowance
) =>
	Math.max(
		Math.floor(base * (1 + (tolerance[metric] ?? 0))),
		base + (slack[metric] ?? 0)
	);

/**
 * Whether `value` is far enough under its `budget` that the budget should be
 * re-recorded, so the improvement can't quietly come back. The margin is the
 * same as `limit`'s above the budget, so noise stays inside it both ways.
 * Exact counts must match their budget.
 */
export const isStale = (
	value: number,
	budget: number,
	metric: string,
	allowance: Allowance
) => value < budget - (limit(budget, metric, allowance) - budget);
