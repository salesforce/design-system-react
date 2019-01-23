// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';
import { keyObjects } from '../../../utilities/key-code';
import { keyObjects as letterKeyObjects } from '../../../utilities/letter-key-code';

import DemoComponent from './demo-component';

const { DOWN, UP, RIGHT, LEFT, SPACE } = keyObjects;
const { A } = letterKeyObjects;

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

describe('SLDSDuelingPicklist', function() {
	describe('Edit Mode', function() {
		describe('assistiveText', function() {
			const assistiveText = {
				optionDragLabel: 'example optionDragLabel',
				itemLocked: 'example itemLocked',
				itemsSelected: 'example itemsSelected',
				itemsDeselected: 'example itemsDeselected',
				lockedItemCannotBeMoved: 'example lockedItemCannotBeMoved',
				selectedItemsReordered: 'example selectedItemsReordered',
				moveSelectionDown: 'example moveSelectionDown',
				moveSelectionUp: 'example moveSelectionUp',
				moveSelectionToOptions: 'example moveSelectionToOptions',
				moveSelectionToSelected: 'example moveSelectionToSelected',
			};
			const ids = {
				optionDragLabel: 'optionDragLabelExample',
			};

			beforeEach(
				mountComponent(
					<DemoComponent
						assistiveText={assistiveText}
						ids={ids}
						options={[{ label: 'Apple', id: '1' }]}
						selected={[
							{ label: 'Locked option', isLocked: true, id: '0' },
							{ label: 'Banana', id: '2' },
							{ label: 'Orange', id: '3' },
						]}
						isReorderable
					/>
				)
			);
			afterEach(unmountComponent);

			it('sets optionDragLabel', function() {
				expect(
					this.wrapper.find(`[id^="${ids.optionDragLabel}"]`).text()
				).to.equal(assistiveText.optionDragLabel);
			});

			it('sets itemLocked to title, and lockedItemCannotBeMoved to assistive text of locked options', function() {
				const iconContainer = this.wrapper
					.find('[role="listbox"]')
					.at(1)
					.find('[role="option"]')
					.at(0)
					.find('.slds-icon_container');
				expect(iconContainer).to.have.attr('title', assistiveText.itemLocked);
				expect(iconContainer.find('.slds-assistive-text').text()).to.equal(
					`: ${assistiveText.lockedItemCannotBeMoved}`
				);
			});

			it('sets itemsSelected to aria live-area when items are moved to selected', function() {
				const option = this.wrapper
					.find('[role="listbox"]')
					.at(0)
					.find('[role="option"]')
					.at(0);
				option.simulate('click');
				this.wrapper
					.find('button')
					.at(0)
					.simulate('click');

				expect(this.wrapper.find('[aria-live="assertive"]').text()).to.equal(
					assistiveText.itemsSelected
				);
			});

			it('sets itemsDeselected to aria live-area when items are removed to selected', function() {
				const option = this.wrapper
					.find('[role="listbox"]')
					.at(1)
					.find('[role="option"]')
					.at(1);
				option.simulate('click');
				this.wrapper
					.find('button')
					.at(1)
					.simulate('click');

				expect(this.wrapper.find('[aria-live="assertive"]').text()).to.equal(
					assistiveText.itemsDeselected
				);
			});

			it('sets selectedItemsReordered to aria live-area when selected items are reordered', function() {
				const option = this.wrapper
					.find('[role="listbox"]')
					.at(1)
					.find('[role="option"]')
					.at(1);
				option.simulate('click');
				this.wrapper
					.find('button')
					.at(3)
					.simulate('click');

				expect(this.wrapper.find('[aria-live="assertive"]').text()).to.equal(
					assistiveText.selectedItemsReordered
				);
			});

			it('sets moveSelectionDown to down button', function() {
				expect(
					this.wrapper
						.find('button')
						.at(3)
						.find('.slds-assistive-text')
						.text()
				).to.equal(assistiveText.moveSelectionDown);
			});

			it('sets moveSelectionUp to up button', function() {
				expect(
					this.wrapper
						.find('button')
						.at(2)
						.find('.slds-assistive-text')
						.text()
				).to.equal(assistiveText.moveSelectionUp);
			});

			it('sets moveSelectionToSelected to right button', function() {
				expect(
					this.wrapper
						.find('button')
						.at(0)
						.find('.slds-assistive-text')
						.text()
				).to.equal(assistiveText.moveSelectionToSelected);
			});

			it('sets moveSelectionToOptions to left button', function() {
				expect(
					this.wrapper
						.find('button')
						.at(1)
						.find('.slds-assistive-text')
						.text()
				).to.equal(assistiveText.moveSelectionToOptions);
			});
		});

		describe('labels', function() {
			const labels = {
				group: 'example group',
				options: 'example options',
				selected: 'example selected',
				viewModeSelectedItems: 'example viewModeSelectedItems',
			};
			const ids = {
				picklistGroupLabel: 'picklistGroupLabelExample',
				optionDragLabel: 'optionDragLabelExample',
				optionsLabel: 'optionsLabelExample',
				selectedLabel: 'selectedLabelExample',
			};

			describe('When in Edit Mode', function() {
				beforeEach(mountComponent(<DemoComponent labels={labels} ids={ids} />));
				afterEach(unmountComponent);

				it('sets options label', function() {
					expect(
						this.wrapper.find(`[id^="${ids.optionsLabel}"]`).text()
					).to.equal(labels.options);
				});

				it('sets group label', function() {
					expect(
						this.wrapper.find(`[id^="${ids.picklistGroupLabel}"]`).text()
					).to.equal(labels.group);
				});

				it('sets selected label', function() {
					expect(
						this.wrapper.find(`[id^="${ids.selectedLabel}"]`).text()
					).to.equal(labels.selected);
				});
			});

			describe('When in View Mode', function() {
				beforeEach(
					mountComponent(<DemoComponent labels={labels} ids={ids} isViewOnly />)
				);
				afterEach(unmountComponent);

				it('sets viewModeSelectedItems label', function() {
					expect(
						this.wrapper.find('.slds-form-element__label').text()
					).to.equal(labels.viewModeSelectedItems);
				});
			});
		});

		describe('Moved items', function() {
			beforeEach(mountComponent(<DemoComponent />));
			afterEach(unmountComponent);

			it('updates the aria-live="assertive" div as items are moved', function() {
				const findLiveRegion = () =>
					this.wrapper.find('[aria-live="assertive"]');
				expect(findLiveRegion().text()).to.equal('');

				const group = this.wrapper.find('[role="group"]');
				const getOptionNodes = (listboxIndex = 0) =>
					this.wrapper
						.find('[role="listbox"]')
						.at(listboxIndex)
						.find('[role="option"]');

				const optionNodes = getOptionNodes();
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

				const { options } = this.wrapper.props();

				expect(findLiveRegion().text()).to.equal(
					`${options[0].label}, ${options[1].label}, and ${
						options[2].label
					} moved to Second Category`
				);

				getOptionNodes(1)
					.at(0)
					.simulate('click');
				group.simulate('keyDown', {
					...LEFT,
					ctrlKey: true,
				});

				const { selected } = this.wrapper.props();
				expect(findLiveRegion().text()).to.equal(
					`${selected[0].label} removed from Second Category`
				);
			});
		});

		describe('When items are locked', function() {
			const itemLockedText = 'item is locked and cannot be moved';

			beforeEach(
				mountComponent(
					<DemoComponent
						options={[]}
						selected={[
							{ id: '0', label: 'Mango', isLocked: true },
							{ id: '1', label: 'Banana', isLocked: false },
						]}
						assistiveText={{
							lockedItemCannotBeMoved: itemLockedText,
						}}
					/>
				)
			);
			afterEach(unmountComponent);

			it('does not allow locked options to be moved to the other listbox', function() {
				const group = this.wrapper.find('[role="group"]');
				const getListboxNodes = (index) =>
					this.wrapper
						.find('[role="listbox"]')
						.at(index)
						.find('[role="option"]');

				getListboxNodes(1)
					.at(1)
					.simulate('click');
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
				expect(
					getListboxNodes(0)
						.at(0)
						.text()
				).to.equal('Banana');
				expect(getListboxNodes(1)).to.have.lengthOf(1);
				expect(
					getListboxNodes(1)
						.at(0)
						.text()
				).to.equal(`Mango: ${itemLockedText}`);
			});
		});

		describe('When isDisabled is true', function() {
			beforeEach(mountComponent(<DemoComponent isDisabled isReorderable />));
			afterEach(unmountComponent);

			it('can be disabled', function() {
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
