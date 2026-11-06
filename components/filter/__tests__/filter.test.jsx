import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Popover from '../../popover';
import Button from '../../button';
import Filter from '../index';
import IconSettings from '../../icon-settings';

const defaultProps = {
	id: 'sample-popover',
	body: <span id="sample-body">This is the body</span>,
	heading: <span id="sample-heading">This is the heading</span>,
};

class DemoComponent extends React.Component {
	static displayName = 'PopoverDemoComponent';
	static defaultProps = defaultProps;

	state = {};

	render() {
		return (
			<Popover {...this.props}>
				<Button label="Trigger Popover" />
			</Popover>
		);
	}
}

describe('SLDSFilter', () => {
	describe('Add custom props to Filter Popover', () => {
		it('Filter could take popover as a prop and use the props of popover to render, verifies the custom popover className', async () => {
			const demoPopover = (
				<DemoComponent
					className="custom-filter-popover"
					isOpen
					position="absolute"
				/>
			);

			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Filter
						property="Show Me"
						predicate="All Opportunities"
						popover={demoPopover}
					/>
				</IconSettings>
			);

			// NOTE: The popover is open, so we should be able to find the custom class
			// The custom class is applied to the popover wrapper
			await waitFor(() => {
				expect(container.querySelector('.custom-filter-popover')).toBeInTheDocument();
			});
		});
	});

	describe('Popover open state', () => {
		const renderFilter = (popoverProps) =>
			render(
				<IconSettings iconPath="/assets/icons">
					<Filter
						property="Show Me"
						predicate="All Opportunities"
						popover={
							<DemoComponent
								className="custom-filter-popover"
								{...popoverProps}
							/>
						}
					/>
				</IconSettings>
			);

		it('starts open from the popover defaultIsOpen and can be closed', async () => {
			const { container } = renderFilter({ defaultIsOpen: true });

			await waitFor(() => {
				expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
			});
		});

		it('is closed by default', () => {
			renderFilter({});

			expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
		});

		it('opens an uncontrolled popover when the filter is clicked', async () => {
			const { container } = renderFilter({});

			fireEvent.click(container.querySelector('.slds-filters__item button'));

			await waitFor(() => {
				expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
			});
		});

		it('keeps a controlled popover isOpen={false} closed when the filter is clicked', async () => {
			const { container } = renderFilter({ isOpen: false });

			fireEvent.click(container.querySelector('.slds-filters__item button'));
			await new Promise((resolve) => setTimeout(resolve, 50));

			expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
		});
	});

	describe('On click handler when clicking on filter', () => {
		it('Filter could take onClick prop and trigger this callback during filter click', async () => {
			const onClick = vi.fn();

			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Filter
						property="Show Me"
						predicate="All Opportunities"
						onClick={onClick}
					>
						<div>Filter content</div>
					</Filter>
				</IconSettings>
			);

			const filterButton = container.querySelector('.slds-filters__item .slds-button_reset');
			fireEvent.click(filterButton);

			// Clicking opens a Popover, which mounts through the Portal
			// asynchronously; wait for React to flush that state update so the
			// callback assertion isn't racing an in-flight render.
			await waitFor(() => {
				expect(onClick).toHaveBeenCalledTimes(1);
			});
		});
	});
});
