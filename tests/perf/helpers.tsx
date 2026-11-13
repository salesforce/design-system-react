/// <reference types="vite/client" />
/*
 * Shared helpers for the `perf` Vitest project (see tests/perf/README.md).
 *
 * Every helper measures something countable (commits, renders, live
 * listeners, pending timers, live observers, layout reads), so the checks
 * built on them are deterministic and can gate on `budgets.json`.
 */
import React, { Profiler, type ProfilerOnRenderCallback } from 'react';
import { render, act } from '@testing-library/react';
import { expect } from 'vitest';
import { getCurrentTest } from 'vitest/suite';

import budgetFile from './budgets.json';

// Captured before any tracker patches them, so the helpers' own waits are
// never counted.
const realSetTimeout = window.setTimeout.bind(window);
const realRequestAnimationFrame = window.requestAnimationFrame.bind(window);

/** Let pending effects, timers and two animation frames run. */
export const settle = async (ms = 0) => {
	await act(async () => {
		await new Promise((resolve) => {
			realSetTimeout(resolve, ms);
		});
		await new Promise((resolve) => {
			realRequestAnimationFrame(() => realRequestAnimationFrame(resolve));
		});
	});
};

// --- Commits -------------------------------------------------------------

export interface Commit {
	phase: 'mount' | 'update' | 'nested-update';
	actualDuration: number;
}

/**
 * Render `ui` inside a `<React.Profiler>` and record every commit. StrictMode
 * is off, so the counts are what production sees.
 */
export const renderCounted = (ui: React.ReactElement) => {
	const commits: Commit[] = [];
	const onRender: ProfilerOnRenderCallback = (_id, phase, actualDuration) => {
		commits.push({ phase, actualDuration });
	};
	const wrap = (node: React.ReactElement) => (
		<Profiler id="perf" onRender={onRender}>
			{node}
		</Profiler>
	);
	const result = render(wrap(ui));
	return {
		...result,
		commits,
		get commitCount() {
			return commits.length;
		},
		/** Forget the commits recorded so far. */
		resetCommits() {
			commits.length = 0;
		},
		rerender(node: React.ReactElement) {
			result.rerender(wrap(node));
		},
	};
};

// --- Renders of one component --------------------------------------------

const renderCounts = new Map<string, number>();

export const getRenderCount = (name: string) => renderCounts.get(name) ?? 0;

export const resetRenderCounts = () => renderCounts.clear();

const bump = (name: string) =>
	renderCounts.set(name, (renderCounts.get(name) ?? 0) + 1);

type AnyComponent = React.ComponentType<any> & {
	$$typeof?: symbol;
	render?: (props: unknown, ref: unknown) => React.ReactNode;
	type?: AnyComponent;
	compare?: (a: unknown, b: unknown) => boolean;
};

const FORWARD_REF = Symbol.for('react.forward_ref');
const MEMO = Symbol.for('react.memo');

/**
 * Wrap a component so each of its renders is counted under `name`, keeping
 * its memo/forwardRef/class behavior: a memoized component that bails out is
 * not counted. Use it from a `vi.mock` factory for internal subcomponents
 * (options, rows, tree items), or directly for consumer children.
 */
export function countRenders<T>(Component: T, name: string): T {
	const C = Component as unknown as AnyComponent;
	if (C.$$typeof === MEMO && C.type) {
		return React.memo(countRenders(C.type, name), C.compare) as unknown as T;
	}
	if (C.$$typeof === FORWARD_REF && C.render) {
		const inner = C.render;
		const Counted = React.forwardRef((props, ref) => {
			bump(name);
			return inner(props, ref) as React.ReactElement;
		});
		Counted.displayName = C.displayName;
		return Object.assign(Counted, C) as unknown as T;
	}
	if (C.prototype?.isReactComponent) {
		const Base = C as unknown as React.ComponentClass;
		class Counted extends Base {
			render() {
				bump(name);
				return super.render();
			}
		}
		return Counted as unknown as T;
	}
	const fn = C as unknown as (props: unknown, ref?: unknown) => React.ReactNode;
	const Counted = (props: unknown, ref?: unknown) => {
		bump(name);
		return fn(props, ref);
	};
	return Object.assign(Counted, C) as unknown as T;
}

/**
 * `vi.mock` factory body: wrap a module's default export with `countRenders`.
 *
 *   vi.mock('../private/tab', async (importOriginal) => {
 *     const { countRendersModule } = await import('~/tests/perf/helpers');
 *     return countRendersModule(await importOriginal(), 'Tab');
 *   });
 */
export const countRendersModule = (
	mod: Record<string, unknown>,
	name: string
) => ({ ...mod, default: countRenders(mod.default, name) });

/**
 * Count how many distinct `value` identities a context provider receives.
 * React 19 contexts are their own provider, so `Context.Provider` can be
 * replaced by a recording component without touching `useContext`.
 */
export const trackContextValue = <T,>(Context: React.Context<T>) => {
	const original = Context.Provider;
	const seen: unknown[] = [];
	const Recording = ({
		value,
		children,
	}: {
		value: T;
		children?: React.ReactNode;
	}) => {
		if (seen[seen.length - 1] !== value) seen.push(value);
		return <Context value={value}>{children}</Context>;
	};
	(Context as { Provider: unknown }).Provider = Recording;
	return {
		/** Distinct values since the last reset (renders that kept the value don't count). */
		get changes() {
			return Math.max(seen.length - 1, 0);
		},
		reset() {
			seen.splice(0, seen.length - 1);
		},
		restore() {
			(Context as { Provider: unknown }).Provider = original;
		},
	};
};

// --- Listeners -----------------------------------------------------------

export interface ListenerEntry {
	target: EventTarget;
	type: string;
	listener: unknown;
	capture: boolean;
	passive: boolean | undefined;
}

const targetKind = (target: EventTarget) => {
	if (target === window) return 'window';
	if (target === document) return 'document';
	return 'element';
};

// Listeners that can delay scrolling unless passive. `scroll` isn't one:
// scroll events can't be cancelled, so `passive` has no effect on them.
const SCROLL_BLOCKING = /^(wheel|mousewheel|touchstart|touchmove)$/;

/**
 * Patch `addEventListener`/`removeEventListener` and keep the set of live
 * listeners added since the call. `restore()` puts the originals back.
 */
export const trackListeners = () => {
	const live: ListenerEntry[] = [];
	const nonPassive: ListenerEntry[] = [];
	const isCapture = (options?: boolean | EventListenerOptions) =>
		typeof options === 'boolean' ? options : Boolean(options?.capture);
	const find = (
		target: EventTarget,
		type: string,
		listener: unknown,
		capture: boolean
	) =>
		live.findIndex(
			(e) =>
				e.target === target &&
				e.type === type &&
				e.listener === listener &&
				e.capture === capture
		);

	type Add = EventTarget['addEventListener'];
	type Remove = EventTarget['removeEventListener'];
	const wrapAdd = (add: Add): Add =>
		function patchedAdd(this: EventTarget, type, listener, options) {
			const capture = isCapture(options);
			if (listener && find(this, type, listener, capture) < 0) {
				const passive =
					typeof options === 'object' ? options.passive : undefined;
				const entry = { target: this, type, listener, capture, passive };
				live.push(entry);
				// Chromium defaults window/document/body touch and wheel listeners
				// to passive, but other browsers and other targets don't, so the
				// check asks for an explicit `passive: true`.
				if (SCROLL_BLOCKING.test(type) && passive !== true) {
					nonPassive.push(entry);
				}
			}
			return add.call(this, type, listener, options);
		};
	const wrapRemove = (remove: Remove): Remove =>
		function patchedRemove(this: EventTarget, type, listener, options) {
			const index = find(this, type, listener, isCapture(options));
			if (index >= 0) live.splice(index, 1);
			return remove.call(this, type, listener, options);
		};

	// The prototype covers elements and document. The Vitest browser runner
	// gives `window` its own `addEventListener` (an error-listener counter),
	// which calls the unpatched prototype method, so patch that too.
	const owners: EventTarget[] = [EventTarget.prototype];
	if (Object.hasOwn(window, 'addEventListener')) owners.push(window);
	const originals = owners.map((owner) => {
		const original = {
			add: owner.addEventListener,
			remove: owner.removeEventListener,
		};
		owner.addEventListener = wrapAdd(original.add);
		owner.removeEventListener = wrapRemove(original.remove);
		return original;
	});

	return {
		live,
		nonPassive,
		/** Live listeners on `window` or `document`. */
		global: () => live.filter((e) => targetKind(e.target) !== 'element'),
		/**
		 * Live listeners that outlive an unmount: on `window`/`document`, or on
		 * an element still in the document. Listeners on detached nodes are
		 * collected with them.
		 */
		leaked: () =>
			live.filter(
				(e) =>
					targetKind(e.target) !== 'element' ||
					(e.target instanceof Node && e.target.isConnected)
			),
		restore() {
			owners.forEach((owner, index) => {
				owner.addEventListener = originals[index].add;
				owner.removeEventListener = originals[index].remove;
			});
		},
	};
};

// --- Timers --------------------------------------------------------------

/**
 * Track pending `setTimeout`, `setInterval` and `requestAnimationFrame`
 * callbacks scheduled since the call. Timers still run for real, so
 * components behave as they do in production; a pending timer after unmount
 * is one the component forgot to clear.
 */
export const trackTimers = () => {
	// Typed loosely: the DOM and Node timer overloads don't overlap.
	const w = window as any;
	const original = {
		setTimeout: w.setTimeout,
		clearTimeout: w.clearTimeout,
		setInterval: w.setInterval,
		clearInterval: w.clearInterval,
		requestAnimationFrame: w.requestAnimationFrame,
		cancelAnimationFrame: w.cancelAnimationFrame,
	};
	const timeouts = new Set<number>();
	const intervals = new Set<number>();
	const frames = new Set<number>();

	w.setTimeout = (handler: unknown, ms?: number, ...args: unknown[]) => {
		const id: number = original.setTimeout.call(
			window,
			(...cbArgs: unknown[]) => {
				timeouts.delete(id);
				if (typeof handler === 'function') handler(...cbArgs);
			},
			ms,
			...args
		);
		timeouts.add(id);
		return id;
	};
	w.clearTimeout = (id?: number) => {
		if (id !== undefined) timeouts.delete(id);
		original.clearTimeout.call(window, id);
	};
	w.setInterval = (handler: unknown, ms?: number, ...args: unknown[]) => {
		const id: number = original.setInterval.call(window, handler, ms, ...args);
		intervals.add(id);
		return id;
	};
	w.clearInterval = (id?: number) => {
		if (id !== undefined) intervals.delete(id);
		original.clearInterval.call(window, id);
	};
	w.requestAnimationFrame = (callback: FrameRequestCallback) => {
		const id: number = original.requestAnimationFrame.call(
			window,
			(time: number) => {
				frames.delete(id);
				callback(time);
			}
		);
		frames.add(id);
		return id;
	};
	w.cancelAnimationFrame = (id: number) => {
		frames.delete(id);
		original.cancelAnimationFrame.call(window, id);
	};

	return {
		get pending() {
			return timeouts.size + intervals.size + frames.size;
		},
		get intervals() {
			return intervals.size;
		},
		restore() {
			Object.assign(window, original);
		},
	};
};

// --- Observers -----------------------------------------------------------

const OBSERVERS = [
	'ResizeObserver',
	'MutationObserver',
	'IntersectionObserver',
] as const;

/**
 * Track `ResizeObserver`, `MutationObserver` and `IntersectionObserver`
 * instances created since the call. An observer is live while it observes at
 * least one target and hasn't been disconnected.
 */
export const trackObservers = () => {
	const original = Object.fromEntries(
		OBSERVERS.map((name) => [name, window[name]])
	) as Record<(typeof OBSERVERS)[number], any>;
	const live = new Set<object>();

	for (const name of OBSERVERS) {
		const Base = original[name];
		const Tracked = class extends Base {
			targets = new Set<object>();

			observe(target: Element, options?: unknown) {
				this.targets.add(target);
				live.add(this);
				return super.observe(target, options);
			}

			unobserve(target: Element) {
				this.targets.delete(target);
				if (!this.targets.size) live.delete(this);
				return super.unobserve(target);
			}

			disconnect() {
				this.targets.clear();
				live.delete(this);
				return super.disconnect();
			}
		};
		(window as any)[name] = Tracked;
	}

	return {
		get live() {
			return live.size;
		},
		restore() {
			Object.assign(window, original);
		},
	};
};

// --- Layout reads --------------------------------------------------------

const LAYOUT_GETTERS: [object, string][] = [
	[HTMLElement.prototype, 'offsetWidth'],
	[HTMLElement.prototype, 'offsetHeight'],
	[HTMLElement.prototype, 'offsetTop'],
	[HTMLElement.prototype, 'offsetLeft'],
	[Element.prototype, 'clientWidth'],
	[Element.prototype, 'clientHeight'],
	[Element.prototype, 'scrollWidth'],
	[Element.prototype, 'scrollHeight'],
	[Element.prototype, 'scrollTop'],
];

/**
 * Record layout reads (`getBoundingClientRect`, `getComputedStyle`, offset,
 * client and scroll sizes) and count the ones that force a synchronous
 * reflow: a read while the DOM has changed (style, class or nodes) since the
 * previous read. A read-after-write loop shows up as one forced reflow per
 * iteration. Changes are seen with `MutationObserver.takeRecords()`, which is
 * synchronous, because Chromium's style properties can't be patched.
 */
export const trackLayout = () => {
	let reads = 0;
	let forcedReflows = 0;
	const restores: (() => void)[] = [];
	const mutations = new MutationObserver(() => {});
	mutations.observe(document, {
		subtree: true,
		childList: true,
		attributes: true,
		attributeFilter: ['style', 'class', 'hidden'],
	});

	const read = () => {
		reads += 1;
		if (mutations.takeRecords().length) forcedReflows += 1;
	};

	const patchMethod = (owner: any, key: string) => {
		const fn = owner[key];
		owner[key] = function patched(this: unknown, ...args: unknown[]) {
			read();
			return fn.apply(this, args);
		};
		restores.push(() => {
			owner[key] = fn;
		});
	};
	const patchGetter = (owner: object, key: string) => {
		const descriptor = Object.getOwnPropertyDescriptor(owner, key);
		const get = descriptor?.get;
		if (!descriptor || !get) return;
		Object.defineProperty(owner, key, {
			...descriptor,
			get(this: unknown) {
				read();
				return get.call(this);
			},
		});
		restores.push(() => Object.defineProperty(owner, key, descriptor));
	};

	patchMethod(Element.prototype, 'getBoundingClientRect');
	patchMethod(window, 'getComputedStyle');
	for (const [owner, key] of LAYOUT_GETTERS) patchGetter(owner, key);

	return {
		get reads() {
			return reads;
		},
		get forcedReflows() {
			return forcedReflows;
		},
		reset() {
			reads = 0;
			forcedReflows = 0;
			mutations.takeRecords();
		},
		restore() {
			mutations.disconnect();
			restores.reverse().forEach((fn) => fn());
		},
	};
};

// --- Console errors ------------------------------------------------------

/**
 * Count `console.error` calls, ignoring DSR's own once-per-session prop
 * warnings (`[Design System React]`), which depend on test order rather than
 * on the component under test.
 */
export const trackConsoleErrors = () => {
	const original = console.error;
	const messages: string[] = [];
	console.error = (...args: unknown[]) => {
		const message = args.map(String).join(' ');
		if (!message.includes('[Design System React]')) messages.push(message);
	};
	return {
		messages,
		get count() {
			return messages.length;
		},
		restore() {
			console.error = original;
		},
	};
};

// --- Budgets -------------------------------------------------------------

export type Metrics = Record<string, number>;

interface BudgetFile {
	tolerance: Record<string, number>;
	budgets: Record<string, Metrics>;
}

const { tolerance, budgets } = budgetFile as BudgetFile;

/** `npm run perf:budgets` records values without failing. */
export const isUpdatingBudgets = Boolean(import.meta.env.VITE_PERF_UPDATE);

export interface PerfRecord {
	key: string;
	metrics: Metrics;
	ideal: Metrics;
}

/**
 * Check `metrics` against `budgets.json[key]` and record them on the test
 * (read by `scripts/perf-report.ts`).
 *
 * `ideal` is the value a well-behaved component reaches (e.g. 0 leaked
 * listeners). A metric with no recorded budget falls back to its ideal. Size
 * metrics have no ideal and must have a budget; their tolerance comes from
 * `budgets.json` `tolerance`. Counts have no tolerance.
 */
export const checkBudget = (
	key: string,
	metrics: Metrics,
	ideal: Metrics = {}
) => {
	const test = getCurrentTest();
	if (test) {
		const meta = test.meta as { perf?: PerfRecord[] };
		meta.perf = [...(meta.perf ?? []), { key, metrics, ideal }];
	}
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
		const limit = Math.floor(budget * (1 + (tolerance[metric] ?? 0)));
		expect
			.soft(value, `${key} ${metric} (budget ${budget})`)
			.toBeLessThanOrEqual(limit);
	}
};
