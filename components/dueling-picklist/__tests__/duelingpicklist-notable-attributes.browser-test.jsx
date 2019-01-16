// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';
import { keyObjects } from '../../../utilities/key-code';
const { A, RIGHT } = keyObjects;

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

import DemoComponent from './demo-component';

describe('SLDSDuelingPicklist', function() {
	describe('Notable Attributes', function() {
		const dragAndDropInstructions = 'Instructions for using D&D';
		const groupLabel = 'Select the things';
		const picklistGroupLabelIdPrefix = 'groupExample';
		const optionDragLabelIdPrefix = 'optionDragExample';

		beforeEach(mountComponent(<DemoComponent
			labels={{
				group: groupLabel
			}}
			ids={{
				picklistGroupLabel: picklistGroupLabelIdPrefix,
				optionDragLabel: optionDragLabelIdPrefix,
			}}
			assistiveText={{
				optionDragLabel: dragAndDropInstructions
			}}
		/>));
		afterEach(unmountComponent);

		it('sets aria-multiselectable="true" on each listbox', function(){
			this.wrapper.find('[role="listbox"]').forEach((node) => {
				expect(node).to.have.attr('aria-multiselectable', 'true');
			});
		});

		it('sets aria-selected="false" on each role="option"', function(){
			this.wrapper.find('[role="option"]').forEach((node) => {
				expect(node).to.have.attr('aria-selected', 'false');
			});
		});

		it('identifies the list with aria-labelledby', function(){
			expect(this.wrapper.find('[role="group"]')).to.have.attr('aria-labelledby', `${picklistGroupLabelIdPrefix}-picklist-group-label`);
			expect(this.wrapper.find(`#${picklistGroupLabelIdPrefix}-picklist-group-label`).text()).to.equal(groupLabel);
		});

		it('provides operation instructions for the Drag and Drop interaction with aria-describedby', function() {
			expect(this.wrapper.find('[role="listbox"]').at(1).find('ul')).to.have.attr('aria-describedby', `${optionDragLabelIdPrefix}-option-drag-label`);
			expect(this.wrapper.find(`#${optionDragLabelIdPrefix}-option-drag-label`).text()).to.equal(dragAndDropInstructions);
		});

		it('sets tabindex to "0" when an item is selected, and "-1" otherwise', function() {
			const getLastOption = () => this.wrapper.find('[role="listbox"] [role="option"]').last();

			expect(getLastOption()).to.have.attr('tabindex', '-1');
			getLastOption().simulate('focus');
			expect(getLastOption()).to.have.attr('tabindex', '0');
		});
	});
});