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
	describe('Notable Attributes', function() {
		it('sets aria-multiselectable="true" on each listbox', function(){
			let wrapper = mount(<DemoComponent />);
			wrapper.find('[role="listbox"]').forEach((node) => {
				expect(node).to.have.attr('aria-multiselectable', 'true');
			});
		});

		it('sets aria-selected="false" on each role="option"', function(){
			let wrapper = mount(<DemoComponent />);
			wrapper.find('[role="option"]').forEach((node) => {
				expect(node).to.have.attr('aria-selected', 'false');
			});
		});

		it('identifies the list with aria-labelledby', function(){
			let wrapper = mount(<DemoComponent
				labels={{
					group: 'Select the things'
				}}
				ids={{
					picklistGroupLabel: 'groupExample'
				}}
			/>);
			expect(wrapper.find('[role="group"]')).to.have.attr('aria-labelledby', 'groupExample-picklist-group-label');
			expect(wrapper.find('#groupExample-picklist-group-label').text()).to.equal('Select the things');
			
		});

		it('provides operation instructions for the Drag and Drop interaction with aria-describedby', function() {
			const instructions = 'Instructions for using D&D';
			let wrapper = mount(<DemoComponent
				assistiveText={{
					optionDragLabel: instructions
				}}
				ids={{
					optionDragLabel: 'optionDragExample'
				}}
			/>);

			expect(wrapper.find('[role="listbox"]').at(1).find('ul')).to.have.attr('aria-describedby', 'optionDragExample-option-drag-label');
			expect(wrapper.find('#optionDragExample-option-drag-label').text()).to.equal(instructions);
		});

		it('sets tabindex to "0" when an item is selected, and "-1" otherwise', function() {
			let wrapper = mount(<DemoComponent />);
			
			const getLastOption = () => wrapper.find('[role="listbox"] [role="option"]').last();

			expect(getLastOption()).to.have.attr('tabindex', '-1');
			getLastOption().simulate('focus');
			expect(getLastOption()).to.have.attr('tabindex', '0');
		});
	});
});