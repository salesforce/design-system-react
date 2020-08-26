import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';

import IconSettings from '../../../components/icon-settings';
import SplitViewListbox, {
	SORT_OPTIONS,
} from '../../../components/split-view/listbox';

chai.use(chaiEnzyme());

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
	let component;

	const WrappedComponent = (props) => (
		<IconSettings iconPath="/assets/icons">
			<SplitViewListbox {...props} />
		</IconSettings>
	);

	const mountComponent = (props) => mount(<WrappedComponent {...props} />);

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
			onSort: sinon.spy(),
			onSelect: (event, { selectedItems }) => {
				component.setProps({ selection: selectedItems });
			},
		},
	};

	beforeEach(() => {
		component = mountComponent(props);
	});

	it('should have unread', () => {
		expect(component.find('li').at(0).prop('className')).to.not.contain(
			'slds-is-unread'
		);
		expect(component.find('li').at(1).prop('className')).to.contain(
			'slds-is-unread'
		);
		expect(component.find('li').at(2).prop('className')).to.not.contain(
			'slds-is-unread'
		);
		expect(component.find('li').at(3).prop('className')).to.contain(
			'slds-is-unread'
		);

		expect(component.find('.slds-indicator_unread')).to.have.length(2);
	});

	it('should have unread assistive text', () => {
		expect(
			component.find('.slds-indicator_unread').at(0).prop('title')
		).to.equal('test unread');
		expect(
			component.find('.slds-indicator_unread').at(1).prop('title')
		).to.equal('test unread');
		expect(
			component.find('.slds-indicator_unread').at(0).prop('aria-label')
		).to.equal('test unread');
		expect(
			component.find('.slds-indicator_unread').at(1).prop('aria-label')
		).to.equal('test unread');
	});
});
