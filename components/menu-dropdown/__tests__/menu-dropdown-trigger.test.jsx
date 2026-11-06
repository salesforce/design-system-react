import { useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import Dropdown from '../../menu-dropdown';
import DropdownTrigger from '../button-trigger';
import Button from '../../button';
import IconSettings from '../../icon-settings';

const defaultProps = {
	id: 'trigger-dropdown',
	label: 'Dropdown label',
	menuPosition: 'relative',
	options: [
		{ label: 'A', value: 'A0' },
		{ label: 'B', value: 'B0' },
	],
};

const renderDropdown = (props, children) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<Dropdown {...defaultProps} {...props}>
				{children}
			</Dropdown>
		</IconSettings>
	);

const getMenu = (container) => container.querySelector('.slds-dropdown');

describe('MenuDropdown trigger', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('merges MenuDropdown button props into a Button trigger, the Button props winning', () => {
		const onClick = vi.fn();
		const { container, getByRole } = renderDropdown({
			buttonVariant: 'brand',
			iconCategory: 'utility',
			iconName: 'down',
			trigger: <Button label="Mine" className="mine" onClick={onClick} />,
		});
		const button = getByRole('button', { name: 'Mine' });
		expect(button).toHaveAttribute('aria-haspopup', 'true');
		expect(button).toHaveClass('slds-button_brand', 'mine');
		// MenuDropdown ignores clicks on its trigger when closing on outside clicks
		expect(button.className).toMatch(/ignore-click-/);

		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(getMenu(container)).toBeInTheDocument();
		expect(button).toHaveAttribute('aria-expanded', 'true');
	});

	it('merges trigger props into an element that is not a Button', () => {
		const { container, getByRole } = renderDropdown({
			trigger: (
				<button type="button" className="mine">
					Custom
				</button>
			),
		});
		const button = getByRole('button', { name: 'Custom' });
		expect(button).toHaveAttribute('aria-haspopup', 'true');
		expect(button.className).toMatch(/ignore-click-.* mine/);

		fireEvent.click(button);
		expect(getMenu(container)).toBeInTheDocument();
	});

	it('passes the trigger props, including ref, to a function trigger', () => {
		const trigger = vi.fn((props) => (
			<button type="button" {...props}>
				Function
			</button>
		));
		const { container, getByRole } = renderDropdown({ trigger });
		expect(trigger).toHaveBeenCalledWith(
			expect.objectContaining({
				'aria-haspopup': true,
				ref: expect.any(Function),
			})
		);

		fireEvent.click(getByRole('button', { name: 'Function' }));
		expect(getMenu(container)).toBeInTheDocument();
	});

	it('keeps a DropdownTrigger child as a deprecated trigger, with a warning', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const { container, getByRole } = renderDropdown(
			{},
			<DropdownTrigger>
				<Button label="Legacy" />
			</DropdownTrigger>
		);

		fireEvent.click(getByRole('button', { name: 'Legacy' }));
		expect(getMenu(container)).toBeInTheDocument();
		expect(
			consoleError.mock.calls.some(([message]) =>
				String(message).includes('Passing the trigger of')
			)
		).toBe(true);
	});

	it('does not remount custom content on every render', () => {
		const onMount = vi.fn();
		const CustomContent = () => {
			useEffect(onMount, []);
			return <div id="custom-content">Custom</div>;
		};
		const { container, getByRole, rerender } = renderDropdown(
			{ options: undefined },
			<CustomContent />
		);
		fireEvent.click(getByRole('button', { name: 'Dropdown label' }));
		expect(container.querySelector('#custom-content')).toBeInTheDocument();

		rerender(
			<IconSettings iconPath="/assets/icons">
				<Dropdown {...defaultProps} options={undefined} label="Relabeled">
					<CustomContent />
				</Dropdown>
			</IconSettings>
		);
		expect(container.querySelector('#custom-content')).toBeInTheDocument();
		expect(onMount).toHaveBeenCalledTimes(1);
	});
});
