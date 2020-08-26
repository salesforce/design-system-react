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
			onSort: sinon.spy(),
			onSelect: (event, { selectedItems }) => {
				component.setProps({ selection: selectedItems });
			},
		},
	};

	beforeEach(() => {
		component = mountComponent(props);
	});

	it('should have a header', () => {
		expect(component.find('.slds-split-view__list-header')).to.have.length(1);
	});

	it('should not have a header when no label specified', () => {
		component.setProps({ labels: {} });
		expect(component.find('.slds-split-view__list-header')).to.have.length(0);
	});

	it('should have test label', () => {
		expect(
			component.find('.slds-split-view__list-header > span > span').at(1).text()
		).to.equal('test header');
	});

	it('should have sort by assistive text', () => {
		expect(
			component.find('.slds-split-view__list-header > span > span').at(0).text()
		).to.equal('test sort by: ');
	});

	describe('sort', () => {
		describe('direction', () => {
			it('should have a sort direction down icon', () => {
				expect(
					component.find('.slds-split-view__list-header svg > use').prop('href')
				).to.have.string('arrowdown');
			});

			it('should have sort descending assistive text', () => {
				expect(
					component
						.find('.slds-split-view__list-header > span > span')
						.at(2)
						.text()
				).to.equal('- test descending');
			});

			it('should have a sort direction up icon', () => {
				component.setProps({ sortDirection: SORT_OPTIONS.UP });

				expect(
					component.find('.slds-split-view__list-header svg > use').prop('href')
				).to.have.string('arrowup');
			});

			it('should have sort ascending assistive text', () => {
				component.setProps({ sortDirection: SORT_OPTIONS.UP });

				expect(
					component
						.find('.slds-split-view__list-header > span > span')
						.at(2)
						.text()
				).to.equal('- test ascending');
			});

			it('should not have a sort direction when no direction specified', () => {
				component.setProps({ sortDirection: undefined });
				expect(
					component.find('.slds-split-view__list-header svg')
				).to.have.length(0);
			});

			it('should call onSort when the header is clicked', () => {
				component.find('a.slds-split-view__list-header').simulate('click');
				expect(props.events.onSort.called).to.be.true;
			});

			it('should not be clickable when onSort not specified', () => {
				component.setProps({ events: { onSelect: sinon.spy() } });
				expect(component.find('.slds-split-view__list-header a')).to.be.length(
					0
				);
			});
		});
	});
});
