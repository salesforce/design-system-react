import { render } from '@testing-library/react';
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

describe('SLDSSplitView - Listbox unread', () => {
	let container;

	const renderListbox = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<SplitViewListbox {...props} />
			</IconSettings>
		);
	};

	const props = {
		options: listOptions,
		unread: [listOptions[1], listOptions[3]],
		labels: {
			header: 'test header',
		},
		assistiveText: {
			sort: {
				sortedBy: 'test sort by',
				descending: 'test descending',
				ascending: 'test ascending',
			},
			unreadItem: 'test unread',
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
	});

	it('should have unread', () => {
		const listItems = container.querySelectorAll('li');

		expect(listItems[0].className).not.toContain('slds-is-unread');
		expect(listItems[1].className).toContain('slds-is-unread');
		expect(listItems[2].className).not.toContain('slds-is-unread');
		expect(listItems[3].className).toContain('slds-is-unread');

		expect(
			container.querySelectorAll('.slds-indicator_unread')
		).toHaveLength(2);
	});

	it('should have unread assistive text', () => {
		const unreadIndicators = container.querySelectorAll('.slds-indicator_unread');

		expect(unreadIndicators[0].getAttribute('title')).toBe('test unread');
		expect(unreadIndicators[1].getAttribute('title')).toBe('test unread');
		expect(unreadIndicators[0].getAttribute('aria-label')).toBe('test unread');
		expect(unreadIndicators[1].getAttribute('aria-label')).toBe('test unread');
	});
});
