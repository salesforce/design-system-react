import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import IconSettings from '../../icon-settings';
import SplitViewListbox, {
	SORT_OPTIONS,
} from '../listbox';

const listOptions = [
	{
		id: 'option1',
		label: 'Riley Shultz',
		topRightText: '99',
		bottomLeftText: 'Biotech, Inc.',
		bottomRightText: 'Nurturing',
	},
	{
		id: 'option2',
		label: 'Jason A. - VP of Sales',
		topRightText: '92',
		bottomLeftText: 'Case Management Solutions',
		bottomRightText: 'Contacted',
	},
	{
		id: 'option3',
		label: 'Josh Smith',
		topRightText: '90',
		bottomLeftText: 'Acme, Inc.',
		bottomRightText: 'Contacted',
	},
	{
		id: 'option4',
		label: 'Bobby Tree',
		topRightText: '89',
		bottomLeftText: 'Salesforce, Inc.',
		bottomRightText: 'Closing',
	},
];

describe('SLDSSplitView - Listbox header', () => {
	let container;
	let rerender;

	const renderListbox = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<SplitViewListbox {...props} />
			</IconSettings>
		);
	};

	const props = {
		options: listOptions,
		labels: {
			header: 'test header',
		},
		assistiveText: {
			sort: {
				sortedBy: 'test sort by',
				descending: 'test descending',
				ascending: 'test ascending',
			},
		},
		sortDirection: SORT_OPTIONS.DOWN,
		events: {
			onSort: vi.fn(),
			onSelect: (event, { selectedItems }) => {
				// State update callback
			},
		},
	};

	beforeEach(() => {
		const rendered = renderListbox(props);
		container = rendered.container;
		rerender = rendered.rerender;
	});

	it('should have a header', () => {
		expect(
			container.querySelector('.slds-split-view__list-header')
		).toBeInTheDocument();
	});

	it('should not have a header when no label specified', () => {
		rerender(
			<IconSettings iconPath="/assets/icons">
				<SplitViewListbox {...props} labels={{}} />
			</IconSettings>
		);
		expect(
			container.querySelectorAll('.slds-split-view__list-header')
		).toHaveLength(0);
	});

	it('should have test label', () => {
		const headerSpans = container.querySelectorAll(
			'.slds-split-view__list-header > span > span'
		);
		expect(headerSpans[1].textContent).toBe('test header');
	});

	it('should have sort by assistive text', () => {
		const headerSpans = container.querySelectorAll(
			'.slds-split-view__list-header > span > span'
		);
		expect(headerSpans[0].textContent).toBe('test sort by: ');
	});

	describe('sort', () => {
		describe('direction', () => {
			it('should have a sort direction down icon', () => {
				const use = container.querySelector(
					'.slds-split-view__list-header svg > use'
				);
				expect(use.getAttribute('href')).toContain('arrowdown');
			});

			it('should have sort descending assistive text', () => {
				const headerSpans = container.querySelectorAll(
					'.slds-split-view__list-header > span > span'
				);
				expect(headerSpans[2].textContent).toBe('- test descending');
			});

			it('should have a sort direction up icon', () => {
				rerender(
					<IconSettings iconPath="/assets/icons">
						<SplitViewListbox {...props} sortDirection={SORT_OPTIONS.UP} />
					</IconSettings>
				);

				const use = container.querySelector(
					'.slds-split-view__list-header svg > use'
				);
				expect(use.getAttribute('href')).toContain('arrowup');
			});

			it('should have sort ascending assistive text', () => {
				rerender(
					<IconSettings iconPath="/assets/icons">
						<SplitViewListbox {...props} sortDirection={SORT_OPTIONS.UP} />
					</IconSettings>
				);

				const headerSpans = container.querySelectorAll(
					'.slds-split-view__list-header > span > span'
				);
				expect(headerSpans[2].textContent).toBe('- test ascending');
			});

			it('should not have a sort direction when no direction specified', () => {
				rerender(
					<IconSettings iconPath="/assets/icons">
						<SplitViewListbox {...props} sortDirection={undefined} />
					</IconSettings>
				);
				expect(
					container.querySelectorAll('.slds-split-view__list-header svg')
				).toHaveLength(0);
			});

			it('should call onSort when the header is clicked', () => {
				const header = container.querySelector('a.slds-split-view__list-header');
				fireEvent.click(header);
				expect(props.events.onSort).toHaveBeenCalled();
			});

			it('should not be clickable when onSort not specified', () => {
				rerender(
					<IconSettings iconPath="/assets/icons">
						<SplitViewListbox
							{...props}
							events={{ onSelect: vi.fn() }}
						/>
					</IconSettings>
				);
				expect(
					container.querySelectorAll('.slds-split-view__list-header a')
				).toHaveLength(0);
			});
		});
	});
});
