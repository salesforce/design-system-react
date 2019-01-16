// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mountComponent, unmountComponent } from '../../../tests/enzyme-helpers';
import { keyObjects } from '../../../utilities/key-code';
const { DOWN, UP, RIGHT, LEFT, TAB, A, SPACE } = keyObjects;

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

import DemoComponent from './demo-component';

describe('SLDSDuelingPicklist', function() {
	describe('Edit Mode', function() {
		
		describe('Moved items', function() {
			beforeEach(mountComponent(
				<DemoComponent />
			));
			afterEach(unmountComponent);

			it('updates the aria-live="assertive" div as items are moved', function() {
				const findLiveRegion = () => this.wrapper.find('[aria-live="assertive"]');
				expect(findLiveRegion().text()).to.equal('');

				const group = this.wrapper.find('[role="group"]');
				const getOptionNodes = (listboxIndex = 0) =>
					this.wrapper
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

				let { options } = this.wrapper.props();

				expect(findLiveRegion().text()).to.equal(`${options[0].label}, ${options[1].label}, and ${
					options[2].label
				} moved to Second Category`);
				
				
				getOptionNodes(1).at(0).simulate('click');
				group.simulate('keyDown', {
					...LEFT,
					ctrlKey: true,
				});

				let { selected } = this.wrapper.props();
				expect(findLiveRegion().text()).to.equal(`${selected[0].label} removed from Second Category`);
			});
		});
		
		describe('When items are locked', function() {
			const itemLockedText = 'item is locked and cannot be moved';

			beforeEach(mountComponent(
				<DemoComponent
					options={[]}
					selected={[
						{ id: '0', label: 'Mango', isLocked: true },
						{ id: '1', label: 'Banana', isLocked: false },
					]}
					assistiveText={{
						lockedItemCannotBeMoved: itemLockedText
					}}
				/>
			));
			afterEach(unmountComponent);

			it('does not allow locked options to be moved to the other listbox', function() {
				const group = this.wrapper.find('[role="group"]');
				const getListboxNodes = (index) =>
					this.wrapper
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
		});

		describe('When isDisabled is true', function() {
			beforeEach(mountComponent(
				<DemoComponent isDisabled isReorderable />
			));
			afterEach(unmountComponent);
			
			it('can be disabled', function(){
				this.wrapper.find('button').forEach((node) => {
					expect(node).to.have.attr('disabled');
				});
				
				this.wrapper.find('[role="listbox"]').forEach((node) => {
					expect(node).to.have.attr('aria-disabled', 'true');
				});
			});
		});
	});
});
