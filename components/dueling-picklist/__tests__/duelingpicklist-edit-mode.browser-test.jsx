// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { keyObjects } from '../../../utilities/key-code';
const { DOWN, UP, RIGHT, LEFT, TAB, A, SPACE } = keyObjects;

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

import DemoComponent from './demo-component';

describe('SLDSDuelingPicklist', function() {
	describe('Edit Mode', function() {
		it('updates the aria-live="assertive" div as items are moved', function() {
			let wrapper = mount(<DemoComponent />);
			const findLiveRegion = () => wrapper.find('[aria-live="assertive"]');
			expect(findLiveRegion().text()).to.equal('');

			const group = wrapper.find('[role="group"]');
			const getOptionNodes = (listboxIndex = 0) =>
				wrapper
					.find('[role="listbox"]')
					.at(listboxIndex)
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

			let { options } = wrapper.props();

			expect(findLiveRegion().text()).to.equal(`${options[0].label}, ${options[1].label}, and ${
				options[2].label
			} moved to Second Category`);
			
			
			getOptionNodes(1).at(0).simulate('click');
			group.simulate('keyDown', {
				...LEFT,
				ctrlKey: true,
			});

			let { selected } = wrapper.props();
			expect(findLiveRegion().text()).to.equal(`${selected[0].label} removed from Second Category`);
		});
		
		it('does not allow locked options to be moved to the other listbox', function() {
			const itemLockedText = 'item is locked and cannot be moved';
			let wrapper = mount(<DemoComponent
				options={[]}
				selected={[
					{ id: '0', label: 'Mango', isLocked: true },
					{ id: '1', label: 'Banana', isLocked: false },
				]}
				assistiveText={{
					lockedItemCannotBeMoved: itemLockedText
				}}
				
			/>);
			const group = wrapper.find('[role="group"]');
			const getListboxNodes = (index) =>
				wrapper
					.find('[role="listbox"]')
					.at(index)
					.find('[role="option"]');
			
			getListboxNodes(1).at(1).simulate('click');
			// select all
			group.simulate('keyDown', {
				...A,
				ctrlKey: true,
			});
			// move to left listbox
			group.simulate('keyDown', {
				...LEFT,
				ctrlKey: true,
			});
			
			expect(getListboxNodes(0)).to.have.lengthOf(1);
			expect(getListboxNodes(0).at(0).text()).to.equal('Banana');
			expect(getListboxNodes(1)).to.have.lengthOf(1);
			expect(getListboxNodes(1).at(0).text()).to.equal('Mango: ' + itemLockedText);
		});
		
		it('can be disabled', function(){
			let wrapper = mount(<DemoComponent
				isDisabled
				isReorderable
			/>);
			wrapper.find('button').forEach((node) => {
				expect(node).to.have.attr('disabled');
			});
			
			wrapper.find('[role="listbox"]').forEach((node) => {
				expect(node).to.have.attr('aria-disabled', 'true');
			});
		});
	});
});
