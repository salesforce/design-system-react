// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { keyObjects } from '../../../utilities/key-code';
const { RIGHT, A, UP } = keyObjects;

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

import DemoComponent from './demo-component';

describe('SLDSDuelingPicklist', function() {
	describe('Responsive', function() {
		it('applies the class, "slds-dueling-picklist__column_responsive", to columns when isResponsive is true', function() {
			let wrapper = mount(<DemoComponent isResponsive />);
			expect(
				wrapper
					.find('.slds-dueling-list__column')
					.first()
					.hasClass('slds-dueling-list__column_responsive')
			).to.equal(true);
		});

		it('sets height manually when listboxHeight set', function() {
			let wrapper = mount(<DemoComponent listboxHeight="10rem" />);
			expect(wrapper.find('.slds-dueling-list__options').first()).to.have.attr(
				'style',
				'height: 10rem;'
			);
		});

		it('automatically adjusts listboxes to have minimum height without scrolling when hasAutomaticHeightMinimization is true', function() {
			const options = 'A,B,C,D,E,F,G,H,I'.split(',').map((letter, i) => ({
				id: i + '',
				label: letter,
			}));

			const getExpectedHeight = (numItems) => 2.25 * numItems + 1;
			let wrapper = mount(
				<DemoComponent
					options={options}
					selected={[]}
					hasAutomaticHeightMinimization
				/>
			);
			const group = wrapper.find('[role="group"]');
			expect(wrapper.find('.slds-dueling-list__options').first()).to.have.attr(
				'style',
				`height: ${getExpectedHeight(options.length)}rem;`
			);

			const getOptionNodes = () => wrapper
				.find('[role="listbox"]')
				.at(0)
				.find('[role="option"]');

			let optionNodes = getOptionNodes();

			// select first 3 options
			optionNodes.at(0).simulate('click');
			optionNodes.at(2).simulate('click', {
				shiftKey: true,
			});
			// move options to selected
			group.simulate('keyDown', {
				...RIGHT,
				ctrlKey: true,
			});

			expect(wrapper.find('.slds-dueling-list__options').first()).to.have.attr(
				'style',
				`height: ${getExpectedHeight(options.length - 3)}rem;`
			);

			optionNodes = getOptionNodes();
			// select first option
			optionNodes.at(0).simulate('click');
			// select all options
			group.simulate('keyDown', {
				...A,
				ctrlKey: true,
			});
			// deselect last option. All but the last option should be selected
			group.simulate('keyDown', {
				...UP,
				shiftKey: true,
			});
			// move options to selected. Now all items should be in selected, except 1
			group.simulate('keyDown', {
				...RIGHT,
				ctrlKey: true,
			});

			// 1st listbox should have the height based off of height of 2nd listbox, which has all options, except 1
			expect(wrapper.find('.slds-dueling-list__options').first()).to.have.attr(
				'style',
				`height: ${getExpectedHeight(options.length - 1)}rem;`
			);
		});
	});
});
