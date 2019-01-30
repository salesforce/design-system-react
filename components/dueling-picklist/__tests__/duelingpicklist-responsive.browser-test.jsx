// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';
import { keyObjects } from '../../../utilities/key-code';
import { keyObjects as letterKeyObjects } from '../../../utilities/letter-key-code';

import DemoComponent from './demo-component';
import { getHeightForListboxBasedOnNumberOfOptions } from '../private/utility';

const { DOWN, UP, RIGHT, LEFT, SPACE } = keyObjects;
const { A } = letterKeyObjects;

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

describe('SLDSDuelingPicklist', function() {
	describe('Responsive', function() {
		describe('When isResponsive is true', function() {
			beforeEach(mountComponent(<DemoComponent isResponsive />));
			afterEach(unmountComponent);

			it('applies the class, "slds-dueling-picklist__column_responsive", to columns when isResponsive is true', function() {
				expect(
					this.wrapper
						.find('.slds-dueling-list__column')
						.first()
						.hasClass('slds-dueling-list__column_responsive')
				).to.equal(true);
			});
		});

		describe('When listboxHeight set', function() {
			beforeEach(mountComponent(<DemoComponent listboxHeight="10rem" />));
			afterEach(unmountComponent);

			it('sets height manually when listboxHeight set', function() {
				expect(
					this.wrapper.find('.slds-dueling-list__options').first()
				).to.have.attr('style', 'height: 10rem;');
			});
		});

		describe('When hasAutomaticHeightMinimization is true', function() {
			const options = 'A,B,C,D,E,F,G,H,I'.split(',').map((letter, i) => ({
				id: `${i}`,
				label: letter,
			}));

			beforeEach(
				mountComponent(
					<DemoComponent
						options={options}
						selected={[]}
						hasAutomaticHeightMinimization
					/>
				)
			);

			afterEach(unmountComponent);

			it('automatically adjusts listboxes to have minimum height without scrolling when hasAutomaticHeightMinimization is true', function() {
				const group = this.wrapper.find('[role="group"]');
				expect(
					this.wrapper.find('.slds-dueling-list__options').first()
				).to.have.attr(
					'style',
					`height: ${getHeightForListboxBasedOnNumberOfOptions(
						options.length
					)};`
				);

				const getOptionNodes = () =>
					this.wrapper
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

				expect(
					this.wrapper.find('.slds-dueling-list__options').first()
				).to.have.attr(
					'style',
					`height: ${getHeightForListboxBasedOnNumberOfOptions(
						options.length - 3
					)};`
				);

				optionNodes = getOptionNodes();
				// select first option
				optionNodes.at(0).simulate('focus');
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
				expect(
					this.wrapper.find('.slds-dueling-list__options').first()
				).to.have.attr(
					'style',
					`height: ${getHeightForListboxBasedOnNumberOfOptions(
						options.length - 1
					)};`
				);
			});
		});
	});
});
