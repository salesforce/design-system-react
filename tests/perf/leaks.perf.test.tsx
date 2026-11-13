/*
 * Leak check (plan D2, check 10): mount and unmount a story 200 times, force
 * a GC (the perf project runs Chromium with `--expose-gc`), and count the
 * mounts still alive through a `WeakRef` each. One may be held for a while by
 * a pending timer or the browser, so the gate is "mounts are retained" (more
 * than a handful), which a real per-mount leak always trips. The heap growth
 * is recorded for the report, with only a coarse ceiling because heap size
 * is noisy (see Decisions in the track brief).
 */
import { createRoot } from 'react-dom/client';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { stories } from './stories';
import { checkBudget, recordPerf, settle } from './helpers';

vi.mock(
	'../../utilities/generate-id',
	async () => (await import('./generate-id-mock')).default
);

const CYCLES = 200;
// More retained mounts than this is a leak, not a straggler.
const RETAINED_TOLERANCE = 10;
const HEAP_CEILING = 16 * 1024 * 1024;

const TRIGGER =
	'[aria-haspopup]:not([aria-haspopup="false"]):not([disabled]), [aria-expanded="false"]:not([disabled])';

const gc = () => (globalThis as { gc?: () => void }).gc?.();
const heap = () =>
	(performance as { memory?: { usedJSHeapSize: number } }).memory
		?.usedJSHeapSize ?? 0;

const collect = async () => {
	// Let React release the fibers, then collect twice (finalization).
	await settle();
	gc();
	await settle();
	gc();
};

describe.each([
	'Combobox/Base',
	'MenuDropdown/Base',
	'DatePicker/Default',
	'Popover/Default',
	'Modal/Default',
	'Tooltip/Default',
	'SimpleDataTable/AdvancedFixedLayout',
	'Tree/Base',
	'Tabs/Default',
])('%s (check 10)', (key) => {
	it(`releases every mount after ${CYCLES} open/unmount cycles`, async () => {
		expect(gc, 'run with --js-flags=--expose-gc').toBeTypeOf('function');
		const { Story } = stories.find((s) => s.key === key)!;
		const cycle = async () => {
			const host = document.createElement('div');
			document.body.appendChild(host);
			const root = createRoot(host);
			await act(async () => root.render(<Story />));
			const trigger = host.querySelector<HTMLElement>(TRIGGER);
			if (trigger) {
				// user-event remembers the last pointer target; point it at
				// <body> so the test itself doesn't retain the mount.
				const user = userEvent.setup({ delay: null });
				await user.click(trigger);
				await user.pointer({ target: document.body });
			}
			(document.activeElement as HTMLElement | null)?.blur();
			const first = host.firstElementChild;
			act(() => root.unmount());
			host.remove();
			document.body.innerHTML = '';
			return new WeakRef(first ?? host);
		};

		// Warm up so module-level caches and lazy chunks don't count.
		await cycle();
		await collect();
		const before = heap();
		const refs: WeakRef<Element>[] = [];
		for (let i = 0; i < CYCLES; i += 1) refs.push(await cycle());
		await collect();
		const growth = Math.max(heap() - before, 0);
		const retained = refs.filter((ref) => ref.deref()).length;

		recordPerf(`${key}/leak`, {
			heapGrowthBytes: growth,
			retainedMounts: retained,
		});
		checkBudget(
			`${key}/leak`,
			{ leaksMounts: retained > RETAINED_TOLERANCE ? 1 : 0 },
			{ leaksMounts: 0 }
		);
		expect(growth, `heap grew by ${growth} bytes`).toBeLessThan(HEAP_CEILING);
	});
});
