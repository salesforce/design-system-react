// Import your external dependencies
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import IconSettings from '../../icon-settings';
import { keyObjects } from '../../../utilities/key-code';
const { DOWN, UP, TAB, A, SPACE } = keyObjects;
// Import your internal dependencies (for example):
import DuelingPicklist from '../';
import duelingPicklistFilter from '../filter';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const options = 'Car,Truck,Van,Minivan,Race car,Tank,Scooter'
	.split(',')
	.map((label, i) => ({ label, id: i + '' }));

const defaultSelected = options.slice(-2);
const defaultProps = {
	options: duelingPicklistFilter({ options, selected: defaultSelected }),
	selected: defaultSelected,
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
const DemoComponent = createReactClass({
	displayName: 'DuelingPicklistDemoComponent',

	getDefaultProps() {
		return defaultProps;
	},

	getInitialState() {
		return { selected: this.props.selected };
	},

	handleChange(selected) {
		this.setState({ selected });
	},

	render() {
		const options = duelingPicklistFilter({
			options: this.props.options,
			selected: this.state.selected,
		});
		return (
			<IconSettings iconPath="/assets/icons">
				<DuelingPicklist
					{...this.props}
					{...this.state}
					onChange={this.handleChange}
				/>
			</IconSettings>
		);
	},
});

describe('SLDSDuelingPicklist', function() {
	describe('Keyboard Interaction', function(done) {
		it('changes focus and selection with up and down', function() {
			let wrapper = mount(<DemoComponent />);
			const group = wrapper.find('[role="group"]');
			const firstListbox = wrapper.find('[role="listbox"]').at(0);

			const firstOption = firstListbox.find('[role="option"]').at(0);
			const secondOption = firstListbox.find('[role="option"]').at(1);

			firstOption.simulate('click');
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

		it('moves focus and creates additional selections with shift + up and shift + down', function() {
			let wrapper = mount(<DemoComponent />);
			const group = wrapper.find('[role="group"]');
			const options = wrapper
				.find('[role="listbox"]')
				.at(0)
				.find('[role="option"]');

			const firstOption = options.at(0);
			const secondOption = options.at(1);
			const thirdOption = options.at(2);

			expect(firstOption).to.have.attr('tabindex', '0');
			expect(secondOption).to.have.attr('tabindex', '-1');
			expect(thirdOption).to.have.attr('tabindex', '-1');
			firstOption.simulate('click');
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

		it('selects all options with ctrl + a', function() {
			let wrapper = mount(<DemoComponent />);
			const group = wrapper.find('[role="group"]');
			const options = wrapper
				.find('[role="listbox"]')
				.at(0)
				.find('[role="option"]');
			const firstOption = options.at(0);
			const secondOption = options.at(1);
			const thirdOption = options.at(2);

			// select an option
			firstOption.simulate('click');
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

		it('moves focus with ctrl + down or ctrl + up, but selection remains where it is', function() {
			let wrapper = mount(<DemoComponent />);
			const group = wrapper.find('[role="group"]');
			const options = wrapper
				.find('[role="listbox"]')
				.at(0)
				.find('[role="option"]');
			const firstOption = options.at(0);
			const secondOption = options.at(1);
			const thirdOption = options.at(2);

			firstOption.simulate('click');

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

		it('toggles selection on the focused option with ctrl + space', function() {
			let wrapper = mount(<DemoComponent />);
			const group = wrapper.find('[role="group"]');
			const options = wrapper
				.find('[role="listbox"]')
				.at(0)
				.find('[role="option"]');
			const firstOption = options.at(0);
			const secondOption = options.at(1);
			const thirdOption = options.at(2);

			firstOption.simulate('click');

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
});
