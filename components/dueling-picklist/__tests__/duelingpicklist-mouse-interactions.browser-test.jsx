// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

import DemoComponent from './demo-component';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

describe('SLDSDuelingPicklist', function () {
	describe('Mouse Interaction', function () {
		describe('standard DemoComponent props', function () {
			beforeEach(mountComponent(<DemoComponent />));
			afterEach(unmountComponent);

			it('changes focus and selection when an option is clicked', function () {
				const listboxes = this.wrapper.find('[role="listbox"]');
				const options = listboxes.at(0).find('[role="option"]');
				const selected = listboxes.at(1).find('[role="option"]');

				options.at(0).simulate('click');
				expect(options.at(0)).to.have.attr('tabindex', '0');
				expect(options.at(1)).to.have.attr('tabindex', '-1');
				expect(options.at(0)).to.have.attr('aria-selected', 'true');
				expect(options.at(1)).to.have.attr('aria-selected', 'false');

				options.at(1).simulate('click');
				expect(options.at(0)).to.have.attr('tabindex', '-1');
				expect(options.at(1)).to.have.attr('tabindex', '0');
				expect(options.at(0)).to.have.attr('aria-selected', 'false');
				expect(options.at(1)).to.have.attr('aria-selected', 'true');

				selected.at(1).simulate('click');
				expect(options.at(0)).to.have.attr('tabindex', '0');
				expect(options.at(1)).to.have.attr('tabindex', '-1');
				expect(selected.at(0)).to.have.attr('tabindex', '-1');
				expect(selected.at(1)).to.have.attr('tabindex', '0');
				expect(options.at(0)).to.have.attr('aria-selected', 'false');
				expect(options.at(1)).to.have.attr('aria-selected', 'false');
				expect(selected.at(0)).to.have.attr('aria-selected', 'false');
				expect(selected.at(1)).to.have.attr('aria-selected', 'true');
			});

			it('moves focus and selects a range of options with shift + click', function () {
				const listboxes = this.wrapper.find('[role="listbox"]');
				const options = listboxes.at(0).find('[role="option"]');
				const selected = listboxes.at(1).find('[role="option"]');

				expect(options.at(0)).to.have.attr('tabindex', '0');
				expect(options.at(1)).to.have.attr('tabindex', '-1');
				expect(options.at(2)).to.have.attr('tabindex', '-1');
				options.at(0).simulate('click');
				expect(options.at(0)).to.have.attr('aria-selected', 'true');
				expect(options.at(1)).to.have.attr('aria-selected', 'false');
				expect(options.at(2)).to.have.attr('aria-selected', 'false');

				options.at(2).simulate('click', {
					shiftKey: true,
				});

				expect(options.at(0)).to.have.attr('tabindex', '-1');
				expect(options.at(1)).to.have.attr('tabindex', '-1');
				expect(options.at(2)).to.have.attr('tabindex', '0');
				expect(options.at(0)).to.have.attr('aria-selected', 'true');
				expect(options.at(1)).to.have.attr('aria-selected', 'true');
				expect(options.at(2)).to.have.attr('aria-selected', 'true');

				options.at(1).simulate('click', {
					shiftKey: true,
				});

				expect(options.at(0)).to.have.attr('tabindex', '-1');
				expect(options.at(1)).to.have.attr('tabindex', '0');
				expect(options.at(2)).to.have.attr('tabindex', '-1');
				expect(options.at(0)).to.have.attr('aria-selected', 'true');
				expect(options.at(1)).to.have.attr('aria-selected', 'true');
				expect(options.at(2)).to.have.attr('aria-selected', 'false');
			});

			it('selects additional options with ctrl + click', function () {
				const listboxes = this.wrapper.find('[role="listbox"]');
				const options = listboxes.at(0).find('[role="option"]');
				const selected = listboxes.at(1).find('[role="option"]');

				options.at(0).simulate('click');
				options.at(2).simulate('click', {
					ctrlKey: true,
				});

				expect(options.at(0)).to.have.attr('tabindex', '-1');
				expect(options.at(1)).to.have.attr('tabindex', '-1');
				expect(options.at(2)).to.have.attr('tabindex', '0');
				expect(options.at(0)).to.have.attr('aria-selected', 'true');
				expect(options.at(1)).to.have.attr('aria-selected', 'false');
				expect(options.at(2)).to.have.attr('aria-selected', 'true');
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

			it('moves selected items between lists with left and right buttons', function () {
				const listboxes = this.wrapper.find('[role="listbox"]');
				const getOptions = (listboxIndex) =>
					this.wrapper
						.find('[role="listbox"]')
						.at(listboxIndex)
						.find('[role="option"]');
				let options = getOptions(0);

				// select first and third option
				options.at(0).simulate('click');
				options.at(2).simulate('click', {
					ctrlKey: true,
				});

				const buttons = this.wrapper.find('button');
				const rightButton = buttons.at(0);
				const leftButton = buttons.at(1);

				rightButton.simulate('click');
				options = getOptions(0);
				let selected = getOptions(1);

				expect(selected.at(2).text()).to.equal('A');
				expect(selected.at(3).text()).to.equal('C');

				selected.at(0).simulate('click');
				leftButton.simulate('click');

				options = getOptions(0);
				selected = getOptions(1);

				expect(options.at(0).text()).to.equal('B');
				expect(options.at(1).text()).to.equal('D');
				expect(selected.at(0).text()).to.equal('E');
				expect(selected.at(1).text()).to.equal('A');
				expect(selected.at(2).text()).to.equal('C');
			});
		});

		describe('When isReorderable is true', function () {
			beforeEach(
				mountComponent(
					<DemoComponent
						options={[]}
						selected={'ABCDEF'.split('').map((letter, i) => ({
							label: letter,
							id: i,
						}))}
						isReorderable
					/>
				)
			);
			afterEach(unmountComponent);

			it('moves the selected items within the current list with up and down arrows', function () {
				const group = this.wrapper.find('[role="group"]');
				const selected = this.wrapper
					.find('[role="listbox"]')
					.at(1)
					.find('[role="option"]');

				const buttons = this.wrapper.find('button');
				const upButton = buttons.at(2);
				const downButton = buttons.at(3);

				selected.at(0).simulate('click');
				downButton.simulate('click');
				downButton.simulate('click');

				expect(selected.at(0).text()).to.equal('B');
				expect(selected.at(1).text()).to.equal('C');
				expect(selected.at(2).text()).to.equal('A');

				// select 4th and 6th items ('D' and 'F')
				selected.at(3).simulate('click');
				selected.at(5).simulate('click', {
					ctrlKey: true,
				});

				upButton.simulate('click');
				upButton.simulate('click');
				upButton.simulate('click');
				downButton.simulate('click');

				expect(selected.at(0).text()).to.equal('B');
				expect(selected.at(1).text()).to.equal('D');
				expect(selected.at(2).text()).to.equal('C');
				expect(selected.at(3).text()).to.equal('F');
				expect(selected.at(4).text()).to.equal('A');
				expect(selected.at(5).text()).to.equal('E');
			});
		});
	});
});
