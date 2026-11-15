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
 * re-recorded, so the improvement can't quietly come back. Counts with no
 * slack must match their budget exactly.
 */
export const isStale = (
	value: number,
	budget: number,
	metric: string,
	{ slack }: Allowance
) => value < budget - (slack[metric] ?? 0);
