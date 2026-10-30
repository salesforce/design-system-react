import { useState } from 'react';
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

// A parent that owns `value` and applies the value requested by `onSelect`
const StatefulDropdown = ({ initialValue, onSelect, ...props }) => {
	const [value, setValue] = useState(initialValue);
	return (
		<IconSettings iconPath="/assets/icons">
			<Dropdown
				{...defaultProps}
				{...props}
				onSelect={(event, data) => {
					setValue(data.value);
					onSelect?.(event, data);
				}}
				value={value}
			/>
		</IconSettings>
	);
};

// A parent that owns `isOpen` and applies onRequestOpen/onRequestClose
const ControlledOpenDropdown = ({
	initialIsOpen = false,
	onRequestOpen,
	onRequestClose,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(initialIsOpen);
	return (
		<IconSettings iconPath="/assets/icons">
			<Dropdown
				{...defaultProps}
				{...props}
				isOpen={isOpen}
				onRequestClose={(event, data) => {
					setIsOpen(false);
					onRequestClose?.(event, data);
				}}
				onRequestOpen={(event, data) => {
					setIsOpen(true);
					onRequestOpen?.(event, data);
				}}
			/>
		</IconSettings>
	);
};

describe('SLDSMenuDropdown', () => {
	describe('Styling', () => {
		it('has correct CSS classes and style', async () => {
			const { container } = renderDropdown({
				menuStyle: { height: '500px' },
				width: 'small',
			});

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

	describe('Trigger variants and sizes', () => {
		const iconProps = {
			assistiveText: { icon: 'More Options' },
			buttonVariant: 'icon',
			iconCategory: 'utility',
			iconName: 'down',
			label: undefined,
		};

		it.each([
			[
				'bare-inverse',
				[
					'slds-button_icon',
					'slds-button_icon-bare',
					'slds-button_icon-inverse',
				],
				'slds-button_icon-bare-inverse',
			],
			[
				'border-inverse',
				['slds-button_icon-border-inverse'],
				'slds-button_icon-border',
			],
		])(
			'iconVariant="%s" renders inverse icon button classes',
			(iconVariant, classes, absentClass) => {
				const { container } = renderDropdown({ ...iconProps, iconVariant });
				const button = container.querySelector('.slds-dropdown-trigger button');
				expect(button).toHaveClass(...classes);
				expect(button).not.toHaveClass(absentClass);
			}
		);

		it('iconVariant="border-inverse" matches iconVariant="border" with buttonInverse', () => {
			const { container: lwcStyle } = renderDropdown({
				...iconProps,
				iconVariant: 'border-inverse',
			});
			const { container: dsrStyle } = renderDropdown({
				...iconProps,
				iconVariant: 'border',
				buttonInverse: true,
			});
			expect(lwcStyle.querySelector('button').className).toBe(
				dsrStyle.querySelector('button').className
			);
		});

		it('iconSize="xx-small" renders the xx-small icon button class', () => {
			const { container } = renderDropdown({
				...iconProps,
				iconSize: 'xx-small',
				iconVariant: 'border-filled',
			});
			const button = container.querySelector('.slds-dropdown-trigger button');
			expect(button).toHaveClass('slds-button_icon-xx-small');
			expect(button.querySelector('svg')).not.toHaveClass(
				'slds-button__icon_xx-small'
			);
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
					/>,
				],
			});

			const trigger = container.querySelector('.slds-dropdown-trigger');
			const button = trigger.querySelector('button');

			fireEvent.click(button);

			await waitFor(() => {
				const customContent = container.querySelector(
					'#custom-dropdown-menu-content'
				);
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
					/>,
				],
			});

			const trigger = container.querySelector('.slds-dropdown-trigger');
			const button = trigger.querySelector('button');

			fireEvent.click(button);

			await waitFor(() => {
				const customContent = container.querySelector(
					'#custom-dropdown-menu-content'
				);
				expect(customContent).toBeInTheDocument();
			});

			const customContentLink = container.querySelector(
				'#custom-dropdown-menu-content-link'
			);
			fireEvent.click(customContentLink);

			await waitFor(() => {
				const customContent = container.querySelector(
					'#custom-dropdown-menu-content'
				);
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
					/>,
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
				expect(
					container.querySelector('.slds-dropdown')
				).not.toBeInTheDocument();
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
				onSelect: (event, { option }) => {
					selected = option;
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
				onSelect: (event, { option }) => {
					selected = option;
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
				expect(
					container.querySelector('.slds-dropdown')
				).not.toBeInTheDocument();
			});
		});
	});

	describe('multiple selection', () => {
		it('selects multiple items and renders checkmarks', async () => {
			const { container } = render(
				<StatefulDropdown checkmark initialValue={[]} multiple />
			);

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
			const { container } = render(
				<StatefulDropdown checkmark initialValue={['B0']} multiple />
			);

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
			await waitFor(
				() => {
					expect(
						container.querySelector('.slds-dropdown')
					).not.toBeInTheDocument();
				},
				{ timeout: 100 }
			);
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
			const { container } = renderDropdown({
				openOn: 'hybrid',
				hoverCloseDelay: 1,
			});

			const btn = container.querySelector('.slds-dropdown-trigger');
			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();

			fireEvent.mouseEnter(btn);

			expect(container.querySelector('.slds-dropdown')).not.toBeInTheDocument();
		});

		it('opens on click, closes on mouseLeave', async () => {
			const { container } = renderDropdown({
				openOn: 'hybrid',
				hoverCloseDelay: 1,
			});

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

			await waitFor(
				() => {
					expect(
						container.querySelector('.slds-dropdown')
					).not.toBeInTheDocument();
				},
				{ timeout: 100 }
			);
		});
	});

	describe('Callback payloads', () => {
		const openMenu = async (container) => {
			fireEvent.click(container.querySelector('.slds-dropdown-trigger'));
			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});
			return container.querySelector('.slds-dropdown');
		};

		it('calls onSelect with (event, { option, optionIndex, value }) on click', async () => {
			const onSelect = vi.fn();
			const { container } = renderDropdown({ onSelect });

			const menu = await openMenu(container);
			fireEvent.click(menu.querySelectorAll('li a')[2]);

			expect(onSelect).toHaveBeenCalledTimes(1);
			const [event, data] = onSelect.mock.calls[0];
			expect(data).toEqual({
				option: menuOptions[2],
				optionIndex: 2,
				value: 'C0',
			});
			expect(event.type).toBe('click');
		});

		it('calls onSelect with the keydown event and { option, optionIndex, value } on keyboard selection', async () => {
			const onSelect = vi.fn();
			const { container } = renderDropdown({ onSelect });

			const menu = await openMenu(container);
			fireEvent.keyDown(menu, keyObjects.DOWN);
			fireEvent.keyDown(menu, keyObjects.DOWN);
			fireEvent.keyDown(menu, keyObjects.ENTER);

			expect(onSelect).toHaveBeenCalledTimes(1);
			const [event, data] = onSelect.mock.calls[0];
			expect(event.type).toBe('keydown');
			expect(event.key).toBe('Enter');
			expect(data).toEqual({
				option: menuOptions[1],
				optionIndex: 1,
				value: 'B0',
			});
		});

		it('calls onSelect for each toggle in multiple mode with the next value', async () => {
			const onSelect = vi.fn();
			const { container } = render(
				<StatefulDropdown initialValue={['B0']} multiple onSelect={onSelect} />
			);

			const menu = await openMenu(container);
			const links = menu.querySelectorAll('li a');
			fireEvent.click(links[0]);
			fireEvent.click(links[0]);

			expect(onSelect).toHaveBeenCalledTimes(2);
			expect(onSelect.mock.calls[0][1]).toEqual({
				option: menuOptions[0],
				optionIndex: 0,
				value: ['B0', 'A0'],
			});
			expect(onSelect.mock.calls[1][1]).toEqual({
				option: menuOptions[0],
				optionIndex: 0,
				value: ['B0'],
			});
		});

		it('does not call onSelect when custom content is clicked, but calls onClose with the click event', async () => {
			const onSelect = vi.fn();
			const onClose = vi.fn();
			const { container } = renderDropdown({
				onSelect,
				onClose,
				children: <DropdownCustomContent />,
			});

			await openMenu(container);
			fireEvent.click(
				container.querySelector('#custom-dropdown-menu-content-link')
			);

			await waitFor(() => {
				expect(
					container.querySelector('#custom-dropdown-menu-content')
				).not.toBeInTheDocument();
			});
			expect(onSelect).not.toHaveBeenCalled();
			expect(onClose).toHaveBeenCalledTimes(1);
			const [event, data] = onClose.mock.calls[0];
			expect(event.type).toBe('click');
			expect(data).toEqual({});
		});

		it('calls onOpen and onClose with the trigger click event and a data object', async () => {
			const onOpen = vi.fn();
			const onClose = vi.fn();
			const { container } = renderDropdown({ onOpen, onClose });
			const trigger = container.querySelector('.slds-dropdown-trigger');

			await openMenu(container);
			expect(onOpen).toHaveBeenCalledTimes(1);
			expect(onOpen.mock.calls[0][0].type).toBe('click');
			expect(onOpen.mock.calls[0][1]).toEqual({});

			fireEvent.click(trigger);
			await waitFor(() => {
				expect(
					container.querySelector('.slds-dropdown')
				).not.toBeInTheDocument();
			});
			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose.mock.calls[0][0].type).toBe('click');
			expect(onClose.mock.calls[0][1]).toEqual({});
		});

		it('calls onClose with the selecting event when an option is chosen by keyboard', async () => {
			const onClose = vi.fn();
			const { container } = renderDropdown({ onClose });

			const menu = await openMenu(container);
			fireEvent.keyDown(menu, keyObjects.DOWN);
			fireEvent.keyDown(menu, keyObjects.ENTER);

			expect(onClose).toHaveBeenCalledTimes(1);
			const [event, data] = onClose.mock.calls[0];
			expect(event.type).toBe('keydown');
			expect(event.key).toBe('Enter');
			expect(data).toEqual({});
		});

		it('calls onClose with the keydown event on Escape', async () => {
			const onClose = vi.fn();
			const { container } = renderDropdown({ onClose });

			const menu = await openMenu(container);
			fireEvent.keyDown(
				menu.querySelector('.slds-dropdown__item a'),
				keyObjects.ESCAPE
			);

			expect(onClose).toHaveBeenCalledTimes(1);
			const [event, data] = onClose.mock.calls[0];
			expect(event.type).toBe('keydown');
			expect(event.key).toBe('Escape');
			expect(data).toEqual({});
		});

		it('calls onOpen once with the keydown event when opened with Enter', async () => {
			const onOpen = vi.fn();
			const { container } = renderDropdown({ onOpen });

			fireEvent.keyDown(container.querySelector('button'), keyObjects.ENTER);
			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});

			expect(onOpen).toHaveBeenCalledTimes(1);
			const [event, data] = onOpen.mock.calls[0];
			expect(event.type).toBe('keydown');
			expect(event.key).toBe('Enter');
			expect(data).toEqual({});
		});

		it('calls onClose once with the keydown event on Tab', async () => {
			const onClose = vi.fn();
			const { container } = renderDropdown({ onClose });

			const menu = await openMenu(container);
			fireEvent.keyDown(
				menu.querySelector('.slds-dropdown__item a'),
				keyObjects.TAB
			);
			await waitFor(() => {
				expect(
					container.querySelector('.slds-dropdown')
				).not.toBeInTheDocument();
			});

			expect(onClose).toHaveBeenCalledTimes(1);
			const [event, data] = onClose.mock.calls[0];
			expect(event.type).toBe('keydown');
			expect(event.key).toBe('Tab');
			expect(data).toEqual({});
		});

		it('calls onClose with undefined when unmounted while open', async () => {
			const onClose = vi.fn();
			const { container, unmount } = renderDropdown({ onClose });

			await openMenu(container);
			unmount();

			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose).toHaveBeenCalledWith(undefined, {});
		});

		it('calls onClose with the native mousedown event on outside click', async () => {
			const onClose = vi.fn();
			const { container } = renderDropdown({ onClose });

			await openMenu(container);
			fireEvent.mouseDown(document.body);

			expect(onClose).toHaveBeenCalledTimes(1);
			const [event, data] = onClose.mock.calls[0];
			expect(event).toBeInstanceOf(Event);
			expect(event.type).toBe('mousedown');
			expect(data).toEqual({});
		});

		it('calls onOpen with the mouseenter event and onClose with undefined after the hover-close timeout', async () => {
			const onOpen = vi.fn();
			const onClose = vi.fn();
			const { container } = renderDropdown({
				openOn: 'hover',
				hoverCloseDelay: 2,
				onOpen,
				onClose,
			});
			const btn = container.querySelector('.slds-dropdown-trigger');

			fireEvent.mouseEnter(btn);
			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});
			expect(onOpen).toHaveBeenCalledTimes(1);
			expect(onOpen.mock.calls[0][0].type).toBe('mouseenter');
			expect(onOpen.mock.calls[0][1]).toEqual({});

			fireEvent.mouseLeave(btn);
			await waitFor(
				() => {
					expect(onClose).toHaveBeenCalledTimes(1);
				},
				{ timeout: 100 }
			);
			expect(onClose).toHaveBeenCalledWith(undefined, {});
		});
	});

	describe('Controlled selection (`value`)', () => {
		const openMenu = async (container) => {
			fireEvent.click(container.querySelector('.slds-dropdown-trigger'));
			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});
			return container.querySelector('.slds-dropdown');
		};
		const checkedLabels = (container) =>
			[
				...container.querySelectorAll('.slds-dropdown a[aria-checked="true"]'),
			].map((link) => link.textContent);

		it('renders the selection from `value` on the first render', () => {
			const { container } = renderDropdown({ checkmark: true, isOpen: true });
			expect(checkedLabels(container)).toEqual(['B Option Super Super Long']);
		});

		it('does not change the selection on click unless the parent updates `value`', async () => {
			const onSelect = vi.fn();
			const { container } = renderDropdown({ checkmark: true, onSelect });

			let menu = await openMenu(container);
			fireEvent.click(menu.querySelectorAll('li a')[2]);
			expect(onSelect.mock.calls[0][1].value).toBe('C0');

			menu = await openMenu(container);
			expect(checkedLabels(container)).toEqual(['B Option Super Super Long']);
		});

		it('does not toggle a multiple selection unless the parent updates `value`', async () => {
			const onSelect = vi.fn();
			const { container } = renderDropdown({
				checkmark: true,
				multiple: true,
				onSelect,
				value: ['B0'],
			});

			const menu = await openMenu(container);
			fireEvent.click(menu.querySelectorAll('li a')[0]);
			fireEvent.click(menu.querySelectorAll('li a')[1]);

			expect(onSelect.mock.calls[0][1].value).toEqual(['B0', 'A0']);
			expect(onSelect.mock.calls[1][1].value).toEqual([]);
			expect(checkedLabels(container)).toEqual(['B Option Super Super Long']);
		});

		it('shows the value the parent passes back', async () => {
			const { container } = render(
				<StatefulDropdown checkmark initialValue="B0" />
			);

			let menu = await openMenu(container);
			fireEvent.click(menu.querySelectorAll('li a')[2]);

			menu = await openMenu(container);
			expect(checkedLabels(container)).toEqual(['C Option']);
		});

		it('has no selection state without `value`', async () => {
			const onSelect = vi.fn();
			const { container } = renderDropdown({
				checkmark: true,
				onSelect,
				value: undefined,
			});

			let menu = await openMenu(container);
			expect(checkedLabels(container)).toEqual([]);
			fireEvent.click(menu.querySelectorAll('li a')[0]);
			expect(onSelect.mock.calls[0][1].value).toBe('A0');

			menu = await openMenu(container);
			expect(checkedLabels(container)).toEqual([]);
		});

		it('keeps values that are not in `options` in the multiple value it reports', async () => {
			const onSelect = vi.fn();
			const { container } = renderDropdown({
				multiple: true,
				onSelect,
				value: ['B0', 'not-an-option'],
			});

			const menu = await openMenu(container);
			fireEvent.click(menu.querySelectorAll('li a')[1]);
			expect(onSelect.mock.calls[0][1].value).toEqual(['not-an-option']);
		});
	});

	describe('Open state (`isOpen`, `defaultIsOpen`)', () => {
		const trigger = (container) => container.querySelector('button');
		const menuOf = (container) => container.querySelector('.slds-dropdown');

		it('stays open when controlled `isOpen` is true and only requests a close', async () => {
			const onClose = vi.fn();
			const onRequestClose = vi.fn();
			const { container } = renderDropdown({
				isOpen: true,
				onClose,
				onRequestClose,
			});
			expect(menuOf(container)).toBeInTheDocument();

			fireEvent.click(trigger(container));
			fireEvent.keyDown(
				menuOf(container).querySelector('.slds-dropdown__item a'),
				keyObjects.ESCAPE
			);
			fireEvent.mouseDown(document.body);
			fireEvent.click(menuOf(container).querySelectorAll('li a')[0]);

			expect(onRequestClose).toHaveBeenCalledTimes(4);
			expect(onRequestClose.mock.calls[0][0].type).toBe('click');
			expect(onRequestClose.mock.calls[0][1]).toEqual({});
			expect(onRequestClose.mock.calls[1][0].key).toBe('Escape');
			expect(onRequestClose.mock.calls[2][0]).toBeInstanceOf(Event);
			expect(onRequestClose.mock.calls[3][0].type).toBe('click');
			expect(onClose).not.toHaveBeenCalled();
			expect(menuOf(container)).toBeInTheDocument();
			expect(trigger(container)).toHaveAttribute('aria-expanded', 'true');
		});

		it('stays closed when controlled `isOpen` is false and only requests an open', async () => {
			const onOpen = vi.fn();
			const onRequestOpen = vi.fn();
			const { container } = renderDropdown({
				isOpen: false,
				onOpen,
				onRequestOpen,
			});

			fireEvent.click(trigger(container));
			fireEvent.keyDown(trigger(container), keyObjects.ENTER);

			expect(onRequestOpen).toHaveBeenCalledTimes(2);
			expect(onRequestOpen.mock.calls[0][0].type).toBe('click');
			expect(onRequestOpen.mock.calls[0][1]).toEqual({});
			expect(onRequestOpen.mock.calls[1][0].key).toBe('Enter');
			expect(onOpen).not.toHaveBeenCalled();
			expect(menuOf(container)).not.toBeInTheDocument();
			expect(trigger(container)).toHaveAttribute('aria-expanded', 'false');
		});

		it('opens and closes when the parent applies the requests, reporting the request events to onOpen/onClose', async () => {
			const onOpen = vi.fn();
			const onClose = vi.fn();
			const { container } = render(
				<ControlledOpenDropdown onClose={onClose} onOpen={onOpen} />
			);

			fireEvent.click(trigger(container));
			await waitFor(() => {
				expect(menuOf(container)).toBeInTheDocument();
			});
			expect(onOpen).toHaveBeenCalledTimes(1);
			expect(onOpen.mock.calls[0][0].type).toBe('click');

			fireEvent.keyDown(
				menuOf(container).querySelector('.slds-dropdown__item a'),
				keyObjects.ESCAPE
			);
			await waitFor(() => {
				expect(menuOf(container)).not.toBeInTheDocument();
			});
			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose.mock.calls[0][0].key).toBe('Escape');
			expect(onClose.mock.calls[0][1]).toEqual({});
		});

		it('calls onOpen/onClose with undefined when the parent changes `isOpen` on its own', async () => {
			const onOpen = vi.fn();
			const onClose = vi.fn();
			const { container, rerender } = renderDropdown({
				isOpen: false,
				onClose,
				onOpen,
			});
			const renderWith = (isOpen) =>
				rerender(
					<IconSettings iconPath="/assets/icons">
						<Dropdown
							{...defaultProps}
							isOpen={isOpen}
							onClose={onClose}
							onOpen={onOpen}
						/>
					</IconSettings>
				);

			renderWith(true);
			await waitFor(() => {
				expect(menuOf(container)).toBeInTheDocument();
			});
			expect(onOpen).toHaveBeenCalledTimes(1);
			expect(onOpen).toHaveBeenCalledWith(undefined, {});

			renderWith(false);
			expect(menuOf(container)).not.toBeInTheDocument();
			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose).toHaveBeenCalledWith(undefined, {});
		});

		it('does not call onOpen when rendered open', async () => {
			const onOpen = vi.fn();
			const { container } = renderDropdown({ isOpen: true, onOpen });
			await waitFor(() => {
				expect(menuOf(container)).toBeInTheDocument();
			});
			expect(onOpen).not.toHaveBeenCalled();
		});

		it('`defaultIsOpen` seeds the uncontrolled open state', async () => {
			const onClose = vi.fn();
			const onRequestClose = vi.fn();
			const { container } = renderDropdown({
				defaultIsOpen: true,
				onClose,
				onRequestClose,
			});
			expect(menuOf(container)).toBeInTheDocument();

			fireEvent.click(trigger(container));
			await waitFor(() => {
				expect(menuOf(container)).not.toBeInTheDocument();
			});
			expect(onRequestClose).toHaveBeenCalledTimes(1);
			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose.mock.calls[0][0].type).toBe('click');
		});

		it('calls onRequestOpen/onRequestClose and onOpen/onClose when uncontrolled', async () => {
			const calls = [];
			const { container } = renderDropdown({
				onClose: () => calls.push('close'),
				onOpen: () => calls.push('open'),
				onRequestClose: () => calls.push('requestClose'),
				onRequestOpen: () => calls.push('requestOpen'),
			});

			fireEvent.click(trigger(container));
			await waitFor(() => {
				expect(menuOf(container)).toBeInTheDocument();
			});
			fireEvent.click(trigger(container));
			await waitFor(() => {
				expect(menuOf(container)).not.toBeInTheDocument();
			});

			expect(calls).toEqual(['requestOpen', 'open', 'requestClose', 'close']);
		});

		it('`defaultIsOpen` is ignored when `isOpen` is set', () => {
			const { container } = renderDropdown({
				defaultIsOpen: true,
				isOpen: false,
			});
			expect(menuOf(container)).not.toBeInTheDocument();
		});

		it('asks the previously open menu to close when another opens', async () => {
			const onRequestCloseFirst = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Dropdown
						{...defaultProps}
						id="first"
						isOpen
						onRequestClose={onRequestCloseFirst}
					/>
					<Dropdown {...defaultProps} id="second" />
				</IconSettings>
			);

			fireEvent.click(container.querySelector('#second'));
			await waitFor(() => {
				expect(container.querySelectorAll('.slds-dropdown')).toHaveLength(2);
			});
			expect(onRequestCloseFirst).toHaveBeenCalledTimes(1);
			expect(onRequestCloseFirst.mock.calls[0][0].type).toBe('click');
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
				const tooltip = container.querySelector(
					'#sample-dropdown-item-1-tooltip'
				);
				expect(tooltip).toBeInTheDocument();
			});
		});
	});

	describe('renderMenuItem', () => {
		const openMenu = async (container) => {
			fireEvent.click(container.querySelector('.slds-dropdown-trigger'));
			await waitFor(() => {
				expect(container.querySelector('.slds-dropdown')).toBeInTheDocument();
			});
			return container.querySelector('.slds-dropdown');
		};

		it('is called with { icon, isSelected, option, optionIndex } for each item', async () => {
			const renderMenuItem = vi.fn(({ icon, option }) => (
				<span className="custom-item">
					{icon}
					{option.label}
				</span>
			));
			const { container } = renderDropdown({ checkmark: true, renderMenuItem });

			const menu = await openMenu(container);
			const items = menu.querySelectorAll('.custom-item');
			expect(items).toHaveLength(menuOptions.length);
			expect(items[1]).toHaveTextContent(menuOptions[1].label);
			// The checkmark icon is passed through as `icon`
			expect(items[1].querySelector('svg')).toBeInTheDocument();
			expect(renderMenuItem).toHaveBeenCalledWith({
				icon: expect.anything(),
				isSelected: true,
				option: menuOptions[1],
				optionIndex: 1,
			});
			expect(renderMenuItem).toHaveBeenCalledWith(
				expect.objectContaining({
					isSelected: false,
					option: menuOptions[2],
					optionIndex: 2,
				})
			);
		});

		it('still renders the deprecated listItemRenderer component and warns', async () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const LegacyItem = ({ label }) => (
				<span className="legacy-item">{label}</span>
			);
			const { container } = renderDropdown({ listItemRenderer: LegacyItem });

			const menu = await openMenu(container);
			expect(menu.querySelectorAll('.legacy-item')).toHaveLength(
				menuOptions.length
			);
			expect(
				consoleError.mock.calls.some((args) => {
					const message = args.join(' ');
					return (
						message.includes('`listItemRenderer`') &&
						message.includes('`renderMenuItem`')
					);
				})
			).toBe(true);
			consoleError.mockRestore();
		});

		it('prefers renderMenuItem over listItemRenderer', async () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const { container } = renderDropdown({
				listItemRenderer: () => <span className="legacy-item" />,
				renderMenuItem: () => <span className="custom-item" />,
			});

			const menu = await openMenu(container);
			expect(menu.querySelectorAll('.custom-item')).toHaveLength(
				menuOptions.length
			);
			expect(menu.querySelectorAll('.legacy-item')).toHaveLength(0);
			consoleError.mockRestore();
		});
	});
});
