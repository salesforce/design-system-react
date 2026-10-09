import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Dropdown from '../../menu-dropdown';
import IconSettings from '../../icon-settings';

// Browser-mode counterparts of the menu alignment tests: jsdom has no layout,
// so it can't tell whether a menu actually opens above or below its trigger.
// These run in real Chromium with the SLDS stylesheet loaded.
const options = [
	{ label: 'A Option', value: 'A0' },
	{ label: 'B Option', value: 'B0' },
	{ label: 'C Option', value: 'C0' },
];

// The test viewport is narrow, so place the trigger on the side it aligns to;
// otherwise the menu is shifted to stay in view.
const justifyContent = {
	auto: 'flex-start',
	left: 'flex-start',
	'bottom-left': 'flex-start',
	center: 'center',
	'bottom-center': 'center',
	right: 'flex-end',
	'bottom-right': 'flex-end',
};

const openDropdown = async (props, { nearViewportBottom = false } = {}) => {
	const { container } = render(
		<IconSettings iconPath="/assets/icons">
			{/* Vertical room so the menu doesn't flip, unless testing flipping */}
			<div
				style={{
					display: 'flex',
					justifyContent: justifyContent[props.align],
					padding: nearViewportBottom ? 'calc(100vh - 40px) 0 0' : '300px 0',
				}}
			>
				<Dropdown
					id="align-dropdown"
					label="Menu"
					options={options}
					{...props}
				/>
			</div>
		</IconSettings>
	);
	fireEvent.click(container.querySelector('.slds-dropdown-trigger button'));

	const menu = await waitFor(() => {
		const el = container.querySelector('.slds-dropdown');
		expect(el).toBeInTheDocument();
		return el;
	});
	const trigger = container.querySelector('.slds-dropdown-trigger button');

	// Wait for floating-ui to position the menu
	await waitFor(() => {
		expect(menu.getBoundingClientRect().height).toBeGreaterThan(0);
		expect(menu.style.pointerEvents).not.toBe('none');
	});

	return {
		menuRect: menu.getBoundingClientRect(),
		triggerRect: trigger.getBoundingClientRect(),
	};
};

describe('SLDSMenuDropdown alignment (browser)', () => {
	describe.each(['absolute', 'relative'])(
		'menuPosition="%s"',
		(menuPosition) => {
			it.each(['auto', 'left', 'center', 'right'])(
				'align="%s" opens the menu below the trigger',
				async (align) => {
					const { menuRect, triggerRect } = await openDropdown({
						align,
						menuPosition,
					});
					expect(menuRect.top).toBeGreaterThanOrEqual(triggerRect.bottom - 1);
				}
			);

			it.each(['bottom-left', 'bottom-center', 'bottom-right'])(
				'align="%s" opens the menu above the trigger',
				async (align) => {
					const { menuRect, triggerRect } = await openDropdown({
						align,
						menuPosition,
					});
					expect(menuRect.bottom).toBeLessThanOrEqual(triggerRect.top + 1);
				}
			);

			it.each([
				['auto', 'left'],
				['left', 'left'],
				['bottom-left', 'left'],
				['right', 'right'],
				['bottom-right', 'right'],
			])(
				'align="%s" lines up the menu with the trigger\'s %s edge',
				async (align, edge) => {
					const { menuRect, triggerRect } = await openDropdown({
						align,
						menuPosition,
					});
					expect(
						Math.abs(menuRect[edge] - triggerRect[edge])
					).toBeLessThanOrEqual(1);
				}
			);
		}
	);

	// `relative` menus are positioned by CSS alone and never flip
	describe('menuPosition="absolute" with hasStaticAlignment and no room below', () => {
		it('align="auto" still flips the menu above the trigger', async () => {
			const { menuRect, triggerRect } = await openDropdown(
				{ align: 'auto', hasStaticAlignment: true },
				{ nearViewportBottom: true }
			);
			expect(menuRect.top).toBeLessThan(triggerRect.top);
		});

		it('align="left" keeps the menu below the trigger', async () => {
			const { menuRect, triggerRect } = await openDropdown(
				{ align: 'left', hasStaticAlignment: true },
				{ nearViewportBottom: true }
			);
			expect(menuRect.top).toBeGreaterThanOrEqual(triggerRect.bottom - 1);
		});
	});
});
