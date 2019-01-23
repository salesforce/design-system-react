// Import your external dependencies
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

import DuelingPicklist from '../';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

describe('SLDSDuelingPicklist', function() {
	describe('Event callbacks', function() {
		describe('onChange', function() {
			const findOptions = (wrapper, listboxIndex) =>
				wrapper
					.find('[role="listbox"]')
					.at(listboxIndex)
					.find('[role="option"]');

			const allOptions = 'ABCDEF'.split('').map((label, id) => ({ label, id }));
			const allOptionsKeyedByLabel = allOptions.reduce(
				(acc, curr) => ({
					...acc,
					[curr.label]: curr,
				}),
				{}
			);
			let mostRecentlySelected = [];
			const handleChange = (selected) => {
				mostRecentlySelected = selected;
			};

			beforeEach(
				mountComponent(
					<DuelingPicklist
						options={allOptions.slice(0, 3)}
						selected={allOptions.slice(3)}
						events={{
							onChange: handleChange,
						}}
					/>
				)
			);
			afterEach(unmountComponent);

			it('calls onChange with items that are in the second listbox when an item is added to it', function() {
				const options = findOptions(this.wrapper, 0);
				const rightButton = this.wrapper.find('button').at(0);

				options.at(0).simulate('click');
				rightButton.simulate('click');

				expect(mostRecentlySelected).to.eql([
					allOptionsKeyedByLabel.D,
					allOptionsKeyedByLabel.E,
					allOptionsKeyedByLabel.F,
					allOptionsKeyedByLabel.A,
				]);
			});

			it('calls onChange with selected when items are removed from second listbox', function() {
				const leftButton = this.wrapper.find('button').at(1);
				const selected = findOptions(this.wrapper, 1);
				selected.at(0).simulate('click');
				selected.at(1).simulate('click', {
					shiftKey: true,
				});
				leftButton.simulate('click');

				expect(mostRecentlySelected).to.eql([allOptionsKeyedByLabel.F]);
			});
		});
	});
});
