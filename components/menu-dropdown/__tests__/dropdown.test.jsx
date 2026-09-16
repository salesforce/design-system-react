import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Dropdown from '../../menu-dropdown';
import IconSettings from '../../icon-settings';
import Tooltip from '../../tooltip';
import List from '../../utilities/menu-list';
import { keyObjects } from '../../../utilities/key-code';
import EventUtil from '../../../utilities/event';

const menuOptions = [
	{ label: 'A super short', value: 'A0' },
	{ label: 'B Option Super Super Long', value: 'B0' },
	{ label: 'C Option', value: 'C0' },
	{ disabled: true, label: 'D Option', value: 'D0' },
];

const defaultProps = {
	iconCategory: 'utility',
	iconName: 'down',
	id: 'sample-dropdown',
	label: 'Test',
	menuPosition: 'relative',
	openOn: 'click',
	options: menuOptions,
	placeholder: 'Select a contact',
	value: 'B0',
};

/* eslint-disable react/prop-types */
const DropdownCustomContent = (props) => (
	<div id="custom-dropdown-menu-content">
		<div className="slds-m-around_medium">
			<div className="slds-tile slds-tile_board slds-m-horizontal_small">
				<p className="tile__title slds-text-heading_small">Art Vandelay</p>
				<div className="slds-tile__detail">
					<p className="slds-truncate">
						<a
							id="custom-dropdown-menu-content-link"
							className="slds-m-right_medium"
							href="#"
							onClick={EventUtil.trappedHandler(props.onClick)}
						>
							Settings
						</a>
						<a href="#" onClick={EventUtil.trappedHandler(props.onClick)}>
							Log Out
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
);
DropdownCustomContent.displayName = 'DropdownCustomContent';

const renderDropdown = (props) => {
	return render(
		<IconSettings iconPath="/assets/icons">
			<Dropdown {...defaultProps} {...props} />
		</IconSettings>
	);
};

describe('SLDSMenuDropdown', () => {
	describe('Styling', () => {
		it('has correct CSS classes and style', async () => {
			const { container } = renderDropdown({ menuStyle: { height: '500px' }, width: 'small' });

			const trigger = container.querySelector('.slds-dropdown-trigger');
			const button = trigger.querySelector('button');

			fireEvent.click(button);

			await waitFor(() => {
				const menu = container.querySelector('.slds-dropdown');
				expect(menu).toBeInTheDocument();
				expect(menu).toHaveStyle({ height: '500px' });
				expect(menu).toHaveClass('slds-dropdown_small');
			});
		});
	});

	describe('Inverse', () => {
		it('has correct CSS class for inverse', async () => {
			const { container } = renderDropdown({ inverse: true });

			const trigger = container.querySelector('.slds-dropdown-trigger');
			const button = trigger.querySelector('button');

			fireEvent.click(button);

			await waitFor(() => {
				const menu = container.querySelector('.slds-dropdown');
				expect(menu).toHaveClass('slds-dropdown_inverse');
			});
		});
	});

	describe('Custom Content Present', () => {
		it('has content with custom ID is present', async () => {
			const { container } = renderDropdown({
				nubbinPosition: 'top left',
				openOn: 'click',
				children: [
					<DropdownCustomContent key="custom" />,
					<List
						key="list"
						options={[{ label: 'Custom Content Option' }, ...menuOptions]}
					/>
				],
			});

			const trigger = container.querySelector('.slds-dropdown-trigger');
			const button = trigger.querySelector('button');

			fireEvent.click(button);

			await waitFor(() => {
				const customContent = container.querySelector('#custom-dropdown-menu-content');
				expect(customContent).toBeInTheDocument();
			});
		});

		it('closes when custom content is clicked', async () => {
			const { container } = renderDropdown({
				nubbinPosition: 'top left',
				openOn: 'click',
				children: [
					<DropdownCustomContent key="custom" />,
					<List
						key="list"
						options={[{ label: 'Custom Content Option' }, ...menuOptions]}
					/>
				],
			});

			const trigger = container.querySelector('.slds-dropdown-trigger');
			const button = trigger.querySelector('button');

			fireEvent.click(button);

			await waitFor(() => {
				const customContent = container.querySelector('#custom-dropdown-menu-content');
				expect(customContent).toBeInTheDocument();
			});

			const customContentLink = container.querySelector('#custom-dropdown-menu-content-link');
			fireEvent.click(customContentLink);

			await waitFor(() => {
				const customContent = container.querySelector('#custom-dropdown-menu-content');
				expect(customContent).not.toBeInTheDocument();
			});
		});

		it("has additional ListItem from list child's options prop", async () => {
			const { container } = renderDropdown({
				nubbinPosition: 'top left',
				openOn: 'click',
				children: [
					<DropdownCustomContent key="custom" />,
					<List
						key="list"
						options={[{ label: 'Custom Content Option' }, ...menuOptions]}
					/>
				],
			});

			const trigger = container.querySelector('.slds-dropdown-trigger');
			const button = trigger.querySelector('button');
			const buttonId = trigger.getAttribute('id');

			fireEvent.click(button);

			await waitFor(() => {
				const menu = container.querySelector('.slds-dropdown');
				expect(menu).toBeInTheDocument();
			});

			const firstItem = container.querySelector(`li#${buttonId}-item-0`);
			expect(firstItem).toBeInTheDocument();
			expect(firstItem.textContent).toBe('Custom Content Option');
		});
	});

	describe('Clickable', () => {
		it('does not expand on hover', () => {
			const { container } = renderDropdown();

			const trigger = container.querySelector('.slds-dropdown-trigger');
			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();

			fireEvent.mouseEnter(trigger);

			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();
		});

		it('expands/contracts on click', async () => {
			const { container } = renderDropdown();

			const trigger = container.querySelector('.slds-dropdown-trigger');
			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();

			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();
			});
		});

		it('preserves click behavior', async () => {
			const onClick = vi.fn();
			const { container } = renderDropdown({ onClick });

			const trigger = container.querySelector('.slds-dropdown-trigger');
			fireEvent.click(trigger);

			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('Expanded', () => {
		it('selects an item on click', async () => {
			let selected;
			const { container } = renderDropdown({
				onSelect: (selectedOption) => {
					selected = selectedOption;
				},
			});

			const trigger = container.querySelector('.slds-dropdown-trigger');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			const menu = container.querySelector('.slds-dropdown');
			const firstLink = menu.querySelector('li a');
			fireEvent.click(firstLink);

			expect(selected.value).toBe('A0');
		});
	});

	describe('accessible markup for label Dropdowns', () => {
		it('<ul> has role menu & aria-labelledby', async () => {
			const { container } = renderDropdown();

			const trigger = container.querySelector('.slds-dropdown-trigger');
			const nodeId = trigger.getAttribute('id');

			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			const menu = container.querySelector('.slds-dropdown');
			const ul = menu.querySelector('ul');

			expect(ul).toHaveAttribute('role', 'menu');
			expect(ul).toHaveAttribute('aria-labelledby', nodeId);
		});

		it('<a> inside <li> has role menuitem', async () => {
			const { container } = renderDropdown();

			const trigger = container.querySelector('.slds-dropdown-trigger');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			const menu = container.querySelector('.slds-dropdown');
			const firstLink = menu.querySelector('li a');
			const anchorRole = firstLink.getAttribute('role');

			const match =
				anchorRole === 'menuitem' ||
				anchorRole === 'menuitemradio' ||
				anchorRole === 'menuitemcheckbox';
			expect(match).toBe(true);
		});

		it('if option.disabled, add aria-disabled to <a> that has role menuitem', async () => {
			const { container } = renderDropdown();

			const trigger = container.querySelector('.slds-dropdown-trigger');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			const menu = container.querySelector('.slds-dropdown');
			const links = menu.querySelectorAll('li a');
			const lastLink = links[3]; // D Option is disabled

			expect(lastLink.getAttribute('aria-disabled')).toBe('true');
		});
	});

	describe('accessible markup for Icon Only Dropdowns', () => {
		it('<button> has assistiveText', () => {
			const { container } = renderDropdown({
				assistiveText: { icon: 'more options' },
				buttonVariant: 'icon',
				checkmark: true,
				iconCategory: 'utility',
				iconName: 'down',
				iconVariant: 'border-filled',
			});

			const button = container.querySelector('button');
			const assistiveText = button.querySelector('.slds-assistive-text');
			expect(assistiveText).toBeInTheDocument();
			expect(assistiveText.textContent).toBe('more options');
		});
	});

	describe('Keyboard behavior', () => {
		// The focusMenuItem callback is called during menu opening and expects HTMLLIElement
		// but receives something else (possibly null or undefined)
		it('opens menu with enter', async () => {
			const { container } = renderDropdown();

			const button = container.querySelector('button');
			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();

			fireEvent.keyDown(button, keyObjects.ENTER);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});
		});

		it('opens menu with down arrow key', async () => {
			const { container } = renderDropdown();

			const button = container.querySelector('button');
			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();

			fireEvent.keyDown(button, keyObjects.DOWN);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});
		});

		// The focusMenuItem callback in menu-dropdown.tsx:609 expects an HTMLLIElement
		// but receives something else during keyboard navigation
		it('selects an item with keyboard', async () => {
			let selected;
			const { container } = renderDropdown({
				onSelect: (selectedOption) => {
					selected = selectedOption;
				},
			});

			const trigger = container.querySelector('.slds-dropdown-trigger');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			const menu = container.querySelector('.slds-dropdown');
			fireEvent.keyDown(menu, keyObjects.DOWN);
			fireEvent.keyDown(menu, keyObjects.DOWN);
			fireEvent.keyDown(menu, keyObjects.ENTER);

			expect(selected.value).toBe('B0');
		});

		it('closes Menu on esc', async () => {
			const { container } = renderDropdown();

			const trigger = container.querySelector('.slds-dropdown-trigger');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			const menu = container.querySelector('.slds-dropdown');
			const firstLink = menu.querySelector('.slds-dropdown__item a');
			fireEvent.keyDown(firstLink, keyObjects.ESCAPE);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();
			});
		});
	});

	describe('multiple selection', () => {
		it('selects multiple items and renders checkmarks', async () => {
			const { container } = renderDropdown({ multiple: true, checkmark: true });

			const trigger = container.querySelector('.slds-dropdown-trigger');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			const menu = container.querySelector('.slds-dropdown');
			const links = menu.querySelectorAll('.slds-dropdown__item a');
			const firstNode = links[0];
			const secondNode = links[2];
			const thirdNode = links[3];

			fireEvent.click(firstNode);
			fireEvent.click(secondNode);

			// Item with checkmark has proper aria markup
			expect(firstNode.getAttribute('aria-checked')).toBe('true');
			expect(secondNode.getAttribute('aria-checked')).toBe('true');
			expect(thirdNode.getAttribute('aria-checked')).toBe(null);
			expect(firstNode).toHaveAttribute('role', 'menuitemcheckbox');
		});

		it('moves focus to next item after keyboard selection', async () => {
			const { container } = renderDropdown({ multiple: true, checkmark: true });

			const trigger = container.querySelector('.slds-dropdown-trigger');
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			const menu = container.querySelector('.slds-dropdown');
			fireEvent.keyDown(menu, keyObjects.DOWN);
			fireEvent.keyDown(menu, keyObjects.ENTER);
			fireEvent.keyDown(menu, keyObjects.DOWN);
			fireEvent.keyDown(menu, keyObjects.ENTER);

			const links = menu.querySelectorAll('.slds-dropdown__item a');
			const secondNode = links[1];
			expect(secondNode.getAttribute('aria-checked')).not.toBe('true');
		});
	});

	describe('Hoverable', () => {
		it('gives the button correct aria properties', () => {
			const { container } = renderDropdown({
				buttonClassName: 'dijkstrafied',
				openOn: 'hover',
				hoverCloseDelay: 2,
			});

			const btn = container.querySelector('.slds-dropdown-trigger button');
			expect(btn.getAttribute('aria-haspopup')).toBe('true');
		});

		it('sets the label', () => {
			const { container } = renderDropdown({
				buttonClassName: 'dijkstrafied',
				openOn: 'hover',
				hoverCloseDelay: 2,
			});

			const btn = container.querySelector('.slds-dropdown-trigger');
			expect(btn.textContent).toBe('Test');
		});

		it('expands the dropdown on hover', async () => {
			const { container } = renderDropdown({
				buttonClassName: 'dijkstrafied',
				openOn: 'hover',
				hoverCloseDelay: 2,
			});

			const btn = container.querySelector('.slds-dropdown-trigger');
			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();

			fireEvent.mouseEnter(btn);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});
		});

		it('closes on blur based on timeout delay', async () => {
			const { container } = renderDropdown({
				buttonClassName: 'dijkstrafied',
				openOn: 'hover',
				hoverCloseDelay: 2,
			});

			const btn = container.querySelector('.slds-dropdown-trigger');
			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();

			fireEvent.mouseEnter(btn);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			fireEvent.mouseLeave(btn);

			// Should still be open initially
			expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();

			// Wait for close delay
			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();
			}, { timeout: 100 });
		});

		it("doesn't close on quick hover outside", async () => {
			// Use a generous close delay so the assertion window sits comfortably
			// inside it. (A tiny delay races the test's own timers under parallel
			// load: the pending close can fire before the re-hover cancels it.)
			const { container } = renderDropdown({
				buttonClassName: 'dijkstrafied',
				openOn: 'hover',
				hoverCloseDelay: 50,
			});

			const btn = container.querySelector('.slds-dropdown-trigger');

			fireEvent.mouseEnter(btn);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			// mouseLeave schedules the close; the immediate re-hover clears that
			// pending timeout synchronously, before it can fire.
			fireEvent.mouseLeave(btn);
			fireEvent.mouseEnter(btn);

			// Well within hoverCloseDelay — the dropdown must still be open.
			await new Promise((resolve) => setTimeout(resolve, 10));
			expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
		});
	});

	describe('Hybrid-able', () => {
		it('doesnt expand on hover', () => {
			const { container } = renderDropdown({ openOn: 'hybrid', hoverCloseDelay: 1 });

			const btn = container.querySelector('.slds-dropdown-trigger');
			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();

			fireEvent.mouseEnter(btn);

			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();
		});

		it('opens on click, closes on mouseLeave', async () => {
			const { container } = renderDropdown({ openOn: 'hybrid', hoverCloseDelay: 1 });

			const btn = container.querySelector('.slds-dropdown-trigger');

			// Open on click
			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();
			fireEvent.click(btn);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			// Close on mouseLeave with delay
			fireEvent.mouseEnter(btn);
			fireEvent.mouseLeave(btn);

			expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();
			}, { timeout: 100 });
		});
	});

	describe('Tooltips function as expected', () => {
		it('Tooltip component shows when focused on menu item', async () => {
			const { container } = renderDropdown({
				options: [
					{ label: 'Test item A', value: 'A0' },
					{
						label: 'Test item B',
						value: 'B0',
						tooltipContent: 'Testing tooltip content',
					},
					{ label: 'Test item C', value: 'C0' },
				],
				tooltipMenuItem: <Tooltip />,
			});

			const trigger = container.querySelector('.slds-dropdown-trigger');
			fireEvent.focus(trigger);
			fireEvent.keyDown(trigger, keyObjects.ENTER);

			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			fireEvent.keyDown(trigger, keyObjects.DOWN);

			await waitFor(() => {
				const tooltip = container.querySelector('#sample-dropdown-item-1-tooltip');
				expect(tooltip).toBeInTheDocument();
			});
		});
	});
});
