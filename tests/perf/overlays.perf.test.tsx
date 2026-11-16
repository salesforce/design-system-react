/*
 * Overlay checks (plan D2, checks 8 and 12) on the overlay stories:
 * - closed, they render no list or dialog DOM and run no positioning
 *   (no scroll/resize listeners);
 * - opening them reads layout a bounded number of times, without forcing a
 *   reflow after each DOM write.
 */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach } from 'vitest';

import { stories } from './stories';
import { resetIds } from './generate-id-mock';
import { checkBudget, settle, trackLayout, trackListeners } from './helpers';

vi.mock(
	'../../utilities/generate-id',
	async () => (await import('./generate-id-mock')).default
);

const story = (key: string) => {
	const found = stories.find((s) => s.key === key);
	if (!found) throw new Error(`No story ${key}`);
	return found.Story;
};

const OVERLAY =
	'[role="listbox"], [role="menu"], [role="dialog"], [role="grid"], [role="tooltip"]';
const POSITIONING = /^(scroll|resize)$/;
// React listens for every event on each root container; those aren't the
// component's.
const isReactRoot = (target: EventTarget) =>
	Object.keys(target).some((k) => k.startsWith('_reactListening'));
const TRIGGER =
	'[aria-haspopup]:not([aria-haspopup="false"]):not([disabled]), [aria-expanded="false"]:not([disabled])';

beforeEach(() => {
	resetIds();
	document.body.innerHTML = '';
});

describe.each([
	'MenuDropdown/Base',
	'Combobox/Base',
	'DatePicker/Default',
	'Popover/Default',
	'Modal/Default',
])('%s closed (check 8)', (key) => {
	it('renders no overlay DOM and runs no positioning', async () => {
		const Story = story(key);
		const listeners = trackListeners();
		let result: ReturnType<typeof render>;
		try {
			result = render(<Story />);
			await settle();
		} finally {
			listeners.restore();
		}
		checkBudget(
			`${key}/closed`,
			{
				closedOverlayNodes: document.body.querySelectorAll(OVERLAY).length,
				closedPositioningListeners: listeners.live.filter(
					(entry) => POSITIONING.test(entry.type) && !isReactRoot(entry.target)
				).length,
			},
			{ closedOverlayNodes: 0, closedPositioningListeners: 0 }
		);
		result.unmount();
	});
});

// Popover, combobox and menu open on click; tooltip on hover (focus).
describe.each([
	['Popover/Default', 'click'],
	['Combobox/Base', 'click'],
	['MenuDropdown/Base', 'click'],
	['Tooltip/Default', 'hover'],
] as const)('%s opening (check 12)', (key, how) => {
	it('reads layout a bounded number of times, without thrashing', async () => {
		const Story = story(key);
		const user = userEvent.setup({ delay: null });
		const result = render(<Story />);
		await settle();
		const trigger =
			how === 'hover'
				? result.container.querySelector<HTMLElement>(
						'[aria-describedby], button, a'
					)
				: result.container.querySelector<HTMLElement>(TRIGGER);
		if (!trigger) throw new Error(`${key}: no trigger`);
		const layout = trackLayout();
		try {
			if (how === 'hover') await user.hover(trigger);
			else await user.click(trigger);
			await settle(100);
		} finally {
			layout.restore();
		}
		checkBudget(
			`${key}/open`,
			{
				openLayoutReads: layout.reads,
				openForcedReflows: layout.forcedReflows,
			},
			// Positioning measures once after inserting the overlay.
			{ openForcedReflows: 1 }
		);
		result.unmount();
	});
});
