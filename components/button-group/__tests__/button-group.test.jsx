import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ButtonGroup from '../';
import Button from '../../button';
import IconSettings from '../../icon-settings';

describe('SLDSButtonGroup', () => {
	describe('component renders', () => {
		it('buttonGroup renders', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonGroup>
						<Button
							label="Chart"
							variant="icon"
							iconCategory="utility"
							iconName="chart"
							iconVariant="border"
						/>
						<Button
							label="Filter"
							variant="icon"
							iconCategory="utility"
							iconName="filter"
							iconVariant="border"
						/>
						<Button
							label="Sort"
							variant="icon"
							iconCategory="utility"
							iconName="sort"
							iconVariant="more"
						/>
					</ButtonGroup>
				</IconSettings>
			);

			const buttonGroup = container.querySelector('.slds-button-group');
			expect(buttonGroup).toBeInTheDocument();
		});

		it('renders proper attributes', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonGroup>
						<Button
							label="Chart"
							variant="icon"
							iconCategory="utility"
							iconName="chart"
							iconVariant="border"
						/>
						<Button
							label="Filter"
							variant="icon"
							iconCategory="utility"
							iconName="filter"
							iconVariant="border"
						/>
						<Button
							label="Sort"
							variant="icon"
							iconCategory="utility"
							iconName="sort"
							iconVariant="more"
						/>
					</ButtonGroup>
				</IconSettings>
			);

			const buttonGroup = container.querySelector('.slds-button-group');
			expect(buttonGroup).toHaveAttribute('role', 'group');
		});

		it('renders children', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonGroup>
						<Button
							label="Chart"
							variant="icon"
							iconCategory="utility"
							iconName="chart"
							iconVariant="border"
						/>
						<Button
							label="Filter"
							variant="icon"
							iconCategory="utility"
							iconName="filter"
							iconVariant="border"
						/>
						<Button
							label="Sort"
							variant="icon"
							iconCategory="utility"
							iconName="sort"
							iconVariant="more"
						/>
					</ButtonGroup>
				</IconSettings>
			);

			const buttons = container.querySelectorAll('button');
			expect(buttons).toHaveLength(3);
		});
	});

	describe('component behavior works', () => {
		it('first button in group invokes method from props', () => {
			const onClick = vi.fn();
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ButtonGroup>
						<Button label="Refresh" variant="neutral" onClick={onClick} />
						<Button label="Edit" variant="neutral" />
						<Button label="Save" variant="neutral" />
						<Button
							label="More Options"
							variant="icon"
							iconCategory="utility"
							iconName="down"
							iconVariant="border-filled"
						/>
					</ButtonGroup>
				</IconSettings>
			);

			const buttons = container.querySelectorAll('button');
			const firstBtn = buttons[0];

			fireEvent.click(firstBtn);
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});
});
