// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';
import { keyObjects } from '../../../utilities/key-code';

import DemoComponent from './demo-component';

const { DOWN, UP, RIGHT, LEFT, TAB, A, SPACE } = keyObjects;

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

describe('SLDSDuelingPicklist', function () {
	describe('Keyboard Interaction', function () {
		describe('standard DemoComponent props', function () {
			beforeEach(mountComponent(<DemoComponent />));
			afterEach(unmountComponent);

			it('changes focus and selection with up and down', function () {
				const group = this.wrapper.find('[role="group"]');
				const firstListbox = this.wrapper.find('[role="listbox"]').at(0);

				const firstOption = firstListbox.find('[role="option"]').at(0);
				const secondOption = firstListbox.find('[role="option"]').at(1);

				firstOption.simulate('focus');
				expect(firstOption).to.have.attr('tabindex', '0');
				expect(secondOption).to.have.attr('tabindex', '-1');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'false');

				group.simulate('keyDown', DOWN);
				expect(firstOption).to.have.attr('tabindex', '-1');
				expect(secondOption).to.have.attr('tabindex', '0');
				expect(firstOption).to.have.attr('aria-selected', 'false');
				expect(secondOption).to.have.attr('aria-selected', 'true');

				group.simulate('keyDown', UP);
				expect(firstOption).to.have.attr('tabindex', '0');
				expect(secondOption).to.have.attr('tabindex', '-1');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'false');
			});

			it('moves focus and creates additional selections with shift + up and shift + down', function () {
				const group = this.wrapper.find('[role="group"]');
				const options = this.wrapper
					.find('[role="listbox"]')
					.at(0)
					.find('[role="option"]');

				const firstOption = options.at(0);
				const secondOption = options.at(1);
				const thirdOption = options.at(2);

				expect(firstOption).to.have.attr('tabindex', '0');
				expect(secondOption).to.have.attr('tabindex', '-1');
				expect(thirdOption).to.have.attr('tabindex', '-1');
				firstOption.simulate('focus');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'false');
				expect(thirdOption).to.have.attr('aria-selected', 'false');

				group.simulate('keyDown', {
					...DOWN,
					shiftKey: true,
				});
				expect(firstOption).to.have.attr('tabindex', '-1');
				expect(secondOption).to.have.attr('tabindex', '0');
				expect(thirdOption).to.have.attr('tabindex', '-1');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'true');
				expect(thirdOption).to.have.attr('aria-selected', 'false');

				group.simulate('keyDown', {
					...DOWN,
					shiftKey: true,
				});
				expect(firstOption).to.have.attr('tabindex', '-1');
				expect(secondOption).to.have.attr('tabindex', '-1');
				expect(thirdOption).to.have.attr('tabindex', '0');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'true');
				expect(thirdOption).to.have.attr('aria-selected', 'true');

				group.simulate('keyDown', {
					...UP,
					shiftKey: true,
				});
				expect(firstOption).to.have.attr('tabindex', '-1');
				expect(secondOption).to.have.attr('tabindex', '0');
				expect(thirdOption).to.have.attr('tabindex', '-1');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'true');
				expect(thirdOption).to.have.attr('aria-selected', 'false');
			});

			it('selects all options with ctrl + a', function () {
				const group = this.wrapper.find('[role="group"]');
				const options = this.wrapper
					.find('[role="listbox"]')
					.at(0)
					.find('[role="option"]');
				const firstOption = options.at(0);
				const secondOption = options.at(1);
				const thirdOption = options.at(2);

				// select an option
				firstOption.simulate('focus');
				expect(firstOption).to.have.attr('tabindex', '0');
				expect(secondOption).to.have.attr('tabindex', '-1');
				expect(thirdOption).to.have.attr('tabindex', '-1');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'false');
				expect(thirdOption).to.have.attr('aria-selected', 'false');

				// command + a
				group.simulate('keyDown', {
					...A,
					ctrlKey: true,
				});

				expect(firstOption).to.have.attr('tabindex', '0');
				expect(secondOption).to.have.attr('tabindex', '-1');
				expect(thirdOption).to.have.attr('tabindex', '-1');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'true');
				expect(thirdOption).to.have.attr('aria-selected', 'true');
			});

			it('moves focus with ctrl + down or ctrl + up, but selection remains where it is', function () {
				const group = this.wrapper.find('[role="group"]');
				const options = this.wrapper
					.find('[role="listbox"]')
					.at(0)
					.find('[role="option"]');
				const firstOption = options.at(0);
				const secondOption = options.at(1);
				const thirdOption = options.at(2);

				firstOption.simulate('focus');

				group.simulate('keyDown', {
					...DOWN,
					ctrlKey: true,
				});
				group.simulate('keyDown', {
					...DOWN,
					ctrlKey: true,
				});

				expect(firstOption).to.have.attr('tabindex', '-1');
				expect(secondOption).to.have.attr('tabindex', '-1');
				expect(thirdOption).to.have.attr('tabindex', '0');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'false');
				expect(thirdOption).to.have.attr('aria-selected', 'false');

				group.simulate('keyDown', {
					...UP,
					ctrlKey: true,
				});

				expect(firstOption).to.have.attr('tabindex', '-1');
				expect(secondOption).to.have.attr('tabindex', '0');
				expect(thirdOption).to.have.attr('tabindex', '-1');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'false');
				expect(thirdOption).to.have.attr('aria-selected', 'false');
			});

			it('toggles selection on the focused option with ctrl + space', function () {
				const group = this.wrapper.find('[role="group"]');
				const options = this.wrapper
					.find('[role="listbox"]')
					.at(0)
					.find('[role="option"]');
				const firstOption = options.at(0);
				const secondOption = options.at(1);

				firstOption.simulate('focus');

				group.simulate('keyDown', {
					...SPACE,
					ctrlKey: true,
				});
				expect(firstOption).to.have.attr('tabindex', '0');
				expect(secondOption).to.have.attr('tabindex', '-1');
				expect(firstOption).to.have.attr('aria-selected', 'false');
				expect(secondOption).to.have.attr('aria-selected', 'false');

				group.simulate('keyDown', {
					...SPACE,
					ctrlKey: true,
				});
				expect(firstOption).to.have.attr('tabindex', '0');
				expect(secondOption).to.have.attr('tabindex', '-1');
				expect(firstOption).to.have.attr('aria-selected', 'true');
				expect(secondOption).to.have.attr('aria-selected', 'false');
			});
		});

		describe('Moving items between lists', function () {
			beforeEach(
				mountComponent(
					<DemoComponent
						options={[
							{ label: 'A', id: 1 },
							{ label: 'B', id: 2 },
							{ label: 'C', id: 3 },
						]}
						selected={[{ label: 'D', id: 4 }, { label: 'E', id: 5 }]}
					/>
				)
			);
			afterEach(unmountComponent);

			it('moves selected items between lists with ctrl + right and ctrl + left', function () {
				const group = this.wrapper.find('[role="group"]');
				let listboxes = this.wrapper.find('[role="listbox"]');

				// select first 3 options
				listboxes
					.at(0)
					.find('[role="option"]')
					.at(0)
					.simulate('focus');
				group.simulate('keyDown', {
					...A,
					ctrlKey: true,
				});

				expect(
					listboxes
						.at(0)
						.find('[role="option"]')
						.at(0)
						.text()
				).to.equal('A');

				// move items to 2nd listbox
				group.simulate('keyDown', {
					...RIGHT,
					ctrlKey: true,
				});

				const secondListboxOptions = this.wrapper
					.find('[role="listbox"]')
					.at(1)
					.find('[role="option"]');
				expect(secondListboxOptions.at(2).text()).to.equal('A');
				expect(secondListboxOptions.at(3).text()).to.equal('B');
				expect(secondListboxOptions.at(4).text()).to.equal('C');
				expect(secondListboxOptions.at(2)).to.have.attr(
					'aria-selected',
					'true'
				);
				expect(secondListboxOptions.at(3)).to.have.attr(
					'aria-selected',
					'true'
				);
				expect(secondListboxOptions.at(4)).to.have.attr(
					'aria-selected',
					'true'
				);

				// select all items in 2nd listbox
				group.simulate('keyDown', {
					...A,
					ctrlKey: true,
				});

				listboxes = this.wrapper.find('[role="listbox"]');
				expect(
					listboxes
						.at(1)
						.find('[role="option"]')
						.at(0)
				).to.have.attr('aria-selected', 'true');
				expect(
					listboxes
						.at(1)
						.find('[role="option"]')
						.at(0)
						.text()
				).to.equal('D');

				// move items to 1st listbox
				group.simulate('keyDown', {
					...LEFT,
					ctrlKey: true,
				});

				const firstListboxOptions = this.wrapper
					.find('[role="listbox"]')
					.at(0)
					.find('[role="option"]');
				expect(firstListboxOptions.at(0).text()).to.equal('A');
				expect(firstListboxOptions.at(1).text()).to.equal('B');
				expect(firstListboxOptions.at(2).text()).to.equal('C');
				expect(firstListboxOptions.at(3).text()).to.equal('D');
				expect(firstListboxOptions.at(4).text()).to.equal('E');
			});
		});

		describe('When space is used to toggle drag and drop mode', function () {
			beforeEach(
				mountComponent(
					<DemoComponent
						options={[{ label: 'C', id: 3 }]}
						selected={[{ label: 'A', id: 999 }, { label: 'B', id: 777 }]}
						isReorderable
					/>
				)
			);
			afterEach(unmountComponent);

			it('moves the selected items within the current list with up and down arrows', function () {
				const findSelectedOptions = () =>
					this.wrapper
						.find('[role="listbox"]')
						.at(1)
						.find('[role="option"]');

				const group = this.wrapper.find('[role="group"]');
				findSelectedOptions()
					.at(0)
					.simulate('focus');

				expect(
					findSelectedOptions()
						.at(0)
						.text()
				).to.equal('A');
				expect(
					findSelectedOptions()
						.at(0)
						.hasClass('slds-is-grabbed')
				).to.equal(false);

				group.simulate('keyDown', SPACE);
				expect(
					findSelectedOptions()
						.at(0)
						.hasClass('slds-is-grabbed')
				).to.equal(true);

				group.simulate('keyDown', DOWN);
				expect(
					findSelectedOptions()
						.at(1)
						.text()
				).to.equal('A');
				expect(
					findSelectedOptions()
						.at(1)
						.hasClass('slds-is-grabbed')
				).to.equal(true);

				group.simulate('keyDown', SPACE);
				expect(
					findSelectedOptions()
						.at(0)
						.text()
				).to.equal('B');
				expect(
					findSelectedOptions()
						.at(1)
						.text()
				).to.equal('A');
				expect(
					findSelectedOptions()
						.at(1)
						.hasClass('slds-is-grabbed')
				).to.equal(false);
			});
		});
	});
});
