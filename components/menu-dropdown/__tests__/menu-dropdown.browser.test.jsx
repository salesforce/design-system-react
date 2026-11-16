import { render, waitFor, within, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import MenuDropdown from '../../menu-dropdown';
import IconSettings from '../../icon-settings';
import Tooltip from '../../tooltip';

// Browser-mode tests for `tooltipMenuItem`: they check the item's styles and
// the tooltip's position against the real SLDS 2 stylesheet
// (vitest.setup.browser.ts), which jsdom doesn't apply or lay out.
const renderMenu = () =>
	render(
		<IconSettings iconPath="/assets/icons">
			<div style={{ padding: '120px' }}>
				<MenuDropdown
					id="tooltip-menu"
					isOpen
					label="Menu"
					menuPosition="relative"
					options={[
						{ label: 'Menu Item One', value: 'A0' },
						{
							label: 'Menu Item Two',
							value: 'B0',
							tooltipContent: 'Just a friendly tooltip',
						},
					]}
					tooltipMenuItem={<Tooltip align="top" />}
				/>
			</div>
		</IconSettings>
	);

const getLink = (container, index) =>
	within(container.querySelector(`#tooltip-menu-item-${index}`)).getByRole(
		'menuitem'
	);

describe('MenuDropdown tooltipMenuItem (browser)', () => {
	it('styles a tooltip item like the items next to it', () => {
		const { container } = renderMenu();
		const plain = getComputedStyle(getLink(container, 0));
		const withTooltip = getComputedStyle(getLink(container, 1));
		[
			'display',
			'paddingTop',
			'paddingLeft',
			'color',
			'whiteSpace',
			'cursor',
		].forEach((property) => {
			expect(withTooltip[property]).toBe(plain[property]);
		});
		expect(withTooltip.display).toBe('flex');
	});

	it('puts the tooltip next to the link it describes', async () => {
		const { container } = renderMenu();
		const link = getLink(container, 1);
		fireEvent.mouseEnter(link);
		const tooltip = await waitFor(() => {
			const el = document.querySelector('#tooltip-menu-item-1-tooltip');
			expect(el).not.toBeNull();
			expect(el.style.left).not.toBe('');
			return el;
		});
		const linkRect = link.getBoundingClientRect();
		const tooltipRect = tooltip.getBoundingClientRect();
		// `align="top"`: just above the link, overlapping it horizontally
		expect(tooltipRect.bottom).toBeLessThanOrEqual(linkRect.top);
		expect(linkRect.top - tooltipRect.bottom).toBeLessThan(24);
		expect(tooltipRect.right).toBeGreaterThan(linkRect.left);
		expect(tooltipRect.left).toBeLessThan(linkRect.right);
	});

	// The tooltip sizes against its trigger wrapper; a 0-width wrapper wrapped
	// "Just a friendly tooltip" onto three lines.
	it('fits short tooltip content on one line', async () => {
		const { container } = renderMenu();
		fireEvent.mouseEnter(getLink(container, 1));
		const body = await waitFor(() => {
			const el = document.querySelector(
				'#tooltip-menu-item-1-tooltip .slds-popover__body'
			);
			expect(el).not.toBeNull();
			return el;
		});
		const style = getComputedStyle(body);
		const contentHeight =
			body.getBoundingClientRect().height -
			parseFloat(style.paddingTop) -
			parseFloat(style.paddingBottom);
		expect(contentHeight).toBeLessThan(parseFloat(style.lineHeight) * 1.5);
	});
});
