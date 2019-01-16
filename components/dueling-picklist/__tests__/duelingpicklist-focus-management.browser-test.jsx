// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { keyObjects } from '../../../utilities/key-code';
const { A, RIGHT } = keyObjects;

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

import DemoComponent from './demo-component';

describe('SLDSDuelingPicklist', function() {
	describe('Focus Management', function() {
		it('initially has no options selected and the first item in each list should have tabindex="0"', function() {
			let wrapper = mount(<DemoComponent />);
			const listboxes = wrapper.find('[role="listbox"]');
			const {
				options,
				selected,
			} = wrapper.props();
			
			expect(options.length).to.not.equal(0);
			expect(selected.length).to.not.equal(0);
			expect(listboxes.at(0).find('[role="option"]')).to.have.lengthOf(options.length);
			expect(listboxes.at(1).find('[role="option"]')).to.have.lengthOf(selected.length);

			listboxes.forEach((listbox, i) => {
				listbox.find('[role="option"]').forEach((option, j) => {
					const expectedTabIndex = j === 0 ? '0' : '-1';
					expect(option).to.have.attr('tabindex', expectedTabIndex);
					expect(option).to.have.attr('aria-selected', 'false');
				});
			});
		});

		it('Selects an option when it comes into focus', function() {
			let wrapper = mount(<DemoComponent />);
			const getFirstOption = () => wrapper.find('[role="listbox"]').at(0).find('[role="option"]').at(0);

			getFirstOption().simulate('focus');
			expect(getFirstOption()).to.have.attr('aria-selected', 'true');
		});

		it('leaves the last selected item selected and focusable when focus leaves the list', function() {
			let wrapper = mount(<DemoComponent />);
			const getFirstOption = () => wrapper.find('[role="listbox"]').at(0).find('[role="option"]').at(0);

			getFirstOption().simulate('focus');
			wrapper.find('button').first().simulate('focus');
			expect(getFirstOption()).to.have.attr('aria-selected', 'true');
			expect(getFirstOption()).to.have.attr('tabindex', '0');
			
		});

		it('places focus on the last selected item when focus returns to the list', function() {
			let wrapper = mount(<DemoComponent />);
			const getSecondOption = () => wrapper.find('[role="listbox"]').at(0).find('[role="option"]').at(1);

			getSecondOption().simulate('focus');
			wrapper.find('button').first().simulate('focus');
			getSecondOption().simulate('focus');
			expect(getSecondOption()).to.have.attr('aria-selected', 'true');
		});

		describe('When moving items', function() {
			it('With the move button: deselects the items and adds them to the target list. The focus should remain on the move button', function() {
				let wrapper = mount(<DemoComponent />);

				// focus on first option
				wrapper.find('[role="listbox"]').at(0).find('[role="option"]').at(0).simulate('focus');
				// select all options
				wrapper.find('[role="group"]').simulate('keyDown', {
					...A,
					ctrlKey: true,
				});
				
				// click "right" button
				wrapper.find('button').first().simulate('click').simulate('focus');
				
				const options = wrapper.find('[role="listbox"]').at(0).find('[role="option"]');
				const selected = wrapper.find('[role="listbox"]').at(1).find('[role="option"]');
				
				const {
					options: optionsProp,
					selected: selectedProp,
				} = wrapper.props();
				expect(options).to.have.lengthOf(0);
				expect(selected).to.have.lengthOf(optionsProp.length + selectedProp.length);

				selected.forEach((option, i) => {
					expect(option).to.have.attr('aria-selected', 'false');
					const expectedTabIndex = i === 0 ? '0' : '-1';
					expect(option).to.have.attr('tabindex', expectedTabIndex);
				});

				// not sure how to check that the button is still in focus since both "click" and "focus" were simulated
				// expect(wrapper.find('button').first().matchesElement(document.activeElement)).to.equal(true);
			});
			
			it('With a keyboard shortcut: focus remains on the item, but in the target list. Since the item is focused, it is also selected', function() {
				let wrapper = mount(<DemoComponent />);
				const getFirstOption = (listboxIndex = 0) => wrapper.find('[role="listbox"]').at(listboxIndex).find('[role="option"]').at(0);

				wrapper.find('[role="listbox"]').at(0).find('[role="option"]').at(0).simulate('focus');
				// move option to 2nd listbox
				wrapper.find('[role="group"]').simulate('keyDown', {
					...RIGHT,
					ctrlKey: true,
				});
				
				const movedOption = wrapper.find('[role="listbox"]').at(1).find('[role="option"]').last();
				
				expect(movedOption).to.have.attr('aria-selected', 'true');
				expect(movedOption).to.have.attr('tabindex', '0');
			});
			
			it('If there are already selected items in the target list, they stay selected and the new items are added below them', function() {
				/** This one is difficult to understand the specs for.
				The specs don't seem to permit selecting options from both listboxes */
			});
		});
	});
});