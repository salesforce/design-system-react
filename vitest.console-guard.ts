import { afterEach, beforeEach } from 'vitest';
import type {} from './scripts/vitest-console-reporter';

// Records any test's writes to `console.error` and `console.warn` in the
// test's meta, where `scripts/vitest-console-reporter.ts` counts them, lists
// them on the pull request and fails the run past the budget. A test that
// expects a warning installs its own `vi.spyOn(console, 'error')`, which sits
// in front of this guard, so mocked calls never reach it. Output after the
// test ends (a late timer, jsdom's virtual console) goes straight through.
// `console.log` is not guarded.
const methods = ['error', 'warn'] as const;
type Method = (typeof methods)[number];

const originals: Record<Method, (...args: unknown[]) => void> = {
	error: console.error,
	warn: console.warn,
};
let active = false;
let unexpected: string[] = [];

methods.forEach((method) => {
	// eslint-disable-next-line no-console -- installs the guard itself
	console[method] = (...args: unknown[]) => {
		if (active) {
			unexpected.push(`console.${method}: ${args.map(String).join(' ')}`);
		}
		originals[method](...args);
	};
});

beforeEach(() => {
	active = true;
	unexpected = [];
});

afterEach(({ task }) => {
	active = false;
	if (unexpected.length > 0) {
		task.meta.unexpectedConsole = unexpected;
		unexpected = [];
	}
});
