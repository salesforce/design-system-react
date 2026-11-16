import { render, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Tooltip from '../';
import IconSettings from '../../icon-settings';

// Browser-mode tests for `hasAnchoredNubbin`: they check positioning and
// pseudo-elements against the real SLDS 2 stylesheet
// (vitest.setup.browser.ts), which jsdom doesn't lay out or apply.
const openTooltip = async (props) => {
	const { unmount } = render(
		<IconSettings iconPath="/assets/icons">
			<div style={{ padding: '120px' }}>
				<Tooltip
					id="anchored-tooltip"
					align="top"
					content="Tooltip text"
					isOpen
					{...props}
				>
					<button type="button">Trigger</button>
				</Tooltip>
			</div>
		</IconSettings>
	);
	const tooltip = await waitFor(() => {
		const el = document.querySelector('.slds-popover_tooltip');
		expect(el).not.toBeNull();
		expect(el.style.top).not.toBe('');
		return el;
	});
	const rect = tooltip.getBoundingClientRect();
	const before = getComputedStyle(tooltip, '::before');
	const result = {
		rect,
		beforeContent: before.content,
		className: tooltip.className,
	};
	unmount();
	return result;
};

describe('Tooltip hasAnchoredNubbin (browser)', () => {
	it("doesn't draw the dialog's own nubbin", async () => {
		const plain = await openTooltip({});
		expect(plain.className).toMatch(/slds-nubbin_bottom/);
		expect(plain.beforeContent).not.toBe('none');

		const anchored = await openTooltip({ hasAnchoredNubbin: true });
		expect(anchored.className).not.toMatch(/slds-nubbin/);
		expect(anchored.beforeContent).toBe('none');
	});

	it('keeps the tooltip where it sits with the dialog nubbin', async () => {
		const plain = await openTooltip({});
		const anchored = await openTooltip({ hasAnchoredNubbin: true });
		expect(anchored.rect.top).toBeCloseTo(plain.rect.top, 0);
		expect(anchored.rect.left).toBeCloseTo(plain.rect.left, 0);
	});
});

describe('Tooltip positioning (browser)', () => {
	it('re-positions when the tooltip resizes', async () => {
		const { unmount } = render(
			<IconSettings iconPath="/assets/icons">
				<div style={{ padding: '240px' }}>
					<Tooltip
						id="resizing-tooltip"
						align="top"
						content={<div data-testid="tooltip-body">Tooltip text</div>}
						isOpen
					>
						<button type="button">Trigger</button>
					</Tooltip>
				</div>
			</IconSettings>
		);
		const trigger = document.querySelector('button');
		const tooltip = await waitFor(() => {
			const el = document.querySelector('.slds-popover_tooltip');
			expect(el).not.toBeNull();
			expect(el.style.top).not.toBe('');
			return el;
		});
		const gapAbove = () =>
			trigger.getBoundingClientRect().top -
			tooltip.getBoundingClientRect().bottom;
		const gap = gapAbove();

		document.querySelector('[data-testid="tooltip-body"]').style.height =
			'120px';

		// Bottom-aligned above the trigger again, so it moved up as it grew.
		await waitFor(() => expect(gapAbove()).toBeCloseTo(gap, 0));
		unmount();
	});
});
