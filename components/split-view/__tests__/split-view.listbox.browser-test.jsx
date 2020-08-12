import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';

import IconSettings from '../../../components/icon-settings';
import SplitViewListbox from '../../../components/split-view/listbox';

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

describe('SLDSSplitView - Listbox', () => {
	let component;

	const WrappedComponent = (props) => (
		<IconSettings iconPath="/assets/icons">
			<SplitViewListbox {...props} />
		</IconSettings>
	);

	const mountComponent = (props) => mount(<WrappedComponent {...props} />);

	const expectItemFocused = (value) => {
		const anchors = component.find('li > a');

		listOptions.forEach((item, index) => {
			expect(anchors.get(index).props.tabIndex).to.equal(
				index === value ? 0 : -1
			);
		});
	};

	const expectItemSelected = (value) => {
		const itemIndex = Array.isArray(value) ? value : [value];

		const anchors = component.find('li > a');

		listOptions.forEach((item, index) => {
			itemIndex.includes(index)
				? expect(anchors.at(index).prop('aria-selected')).to.be.true
				: expect(anchors.at(index).prop('aria-selected')).to.be.false;
		});
	};

	describe('When the component is mounted', () => {
		it('should focus the first selected item', () => {
			component = mountComponent({
				options: listOptions,
				selection: [listOptions[1]],
				events: {
					onSelect: sinon.spy(),
				},
			});

			expectItemFocused(1);
		});

		it('should focus the first item when there is no selection', () => {
			component = mountComponent({
				options: listOptions,
				events: {
					onSelect: sinon.spy(),
				},
			});

			expectItemFocused(0);
		});
	});

	describe('When a list item is selected', () => {
		describe('and single select only', () => {
			it('should focus the item that is clicked', () => {
				component = mountComponent({
					options: listOptions,
					events: {
						onSelect: () => {},
					},
				});

				component.find('li > a').at(2).simulate('click');

				expectItemFocused(2);
			});

			it('should select the item that is clicked', () => {
				component = mountComponent({
					options: listOptions,
					events: {
						onSelect: (event, { selectedItems }) => {
							component.setProps({ selection: selectedItems });
						},
					},
				});

				component.find('li > a').at(2).simulate('click');

				expectItemSelected(2);
			});

			describe('and using the keyboard', () => {
				beforeEach(() => {
					component = mountComponent({
						options: listOptions,
						selection: [listOptions[1]],
						events: {
							onSelect: (event, { selectedItems }) => {
								component.setProps({ selection: selectedItems });
							},
						},
					});
				});

				describe('and "ctrl a" keyed', () => {
					it('should not select all list items', () => {
						component
							.find('ul')
							.simulate('keyDown', { key: 'a', ctrlKey: true });

						expectItemSelected([1]);
					});
				});

				it('and arrow key up it should focus the previous item', () => {
					component.find('ul').simulate('keyDown', { key: 'ArrowUp' });
					expectItemFocused(0);
				});

				it('and arrow key down it should focus the next item', () => {
					component.find('ul').simulate('keyDown', { key: 'ArrowDown' });
					expectItemFocused(2);
				});

				it('and arrow key up followed by click/enter should select the previous item', () => {
					component.find('ul').simulate('keyDown', { key: 'ArrowUp' });
					component.find('ul li a').at(0).simulate('click');
					expectItemSelected(0);
				});

				it('and arrow key down followed by click/enter should select the next item', () => {
					component.find('ul').simulate('keyDown', { key: 'ArrowDown' });
					component.find('ul li a').at(2).simulate('click');
					expectItemSelected(2);
				});
			});
		});

		describe('and multiple select enabled', () => {
			beforeEach(() => {
				component = mountComponent({
					multiple: true,
					options: listOptions,
					events: {
						onSelect: (event, { selectedItems }) => {
							component.setProps({ selection: selectedItems });
						},
					},
				});
			});

			it('should select multiple items when clicked and the metaKey is pressed', () => {
				const anchors = component.find('li > a');

				anchors.at(2).simulate('click');
				anchors.at(3).simulate('click', { metaKey: true });

				expectItemSelected([2, 3]);
			});

			it('should select multiple items when clicked and the shiftKey is pressed', () => {
				const anchors = component.find('li > a');

				anchors.at(1).simulate('click');
				anchors.at(3).simulate('click', { shiftKey: true });

				expectItemSelected([1, 2, 3]);
			});

			describe('and "ctrl a" keyed', () => {
				it('should select all list items', () => {
					component.find('ul').simulate('keyDown', { key: 'a', ctrlKey: true });

					expectItemSelected([0, 1, 2, 3]);
				});

				it('should de-select all list items when all the list items are already selected', () => {
					component.setProps({ selection: listOptions });
					component.find('ul').simulate('keyDown', { key: 'a', ctrlKey: true });

					expectItemSelected([]);
				});
			});
		});
	});
});
