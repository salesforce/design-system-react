import { afterEach, beforeEach } from 'vitest';

// Fails any test that writes to `console.error` or `console.warn`. A test that
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

afterEach(() => {
	active = false;
	if (unexpected.length > 0) {
		const messages = unexpected;
		unexpected = [];
		throw new Error(
			`Unexpected console output. Fix the cause, or assert it with vi.spyOn(console, '<method>').\n\n${messages.join('\n\n')}`
		);
	}
});
