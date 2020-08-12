import React from 'react';

import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import {
	createMountNode,
	destroyMountNode,
} from '../../../tests/enzyme-helpers';

// Import your internal dependencies (for example):
import Popover from '../../popover';
import Button from '../../button';
import Filter from '../../filter';
import IconSettings from '../../icon-settings';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const defaultProps = {
	id: 'sample-popover',
	body: <span id="sample-body">This is the body</span>,
	heading: <span id="sample-heading">This is the heading</span>,
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
class DemoComponent extends React.Component {
	static displayName = 'PopoverDemoComponent';

	static propTypes = {
		isOpen: PropTypes.bool,
	};

	static defaultProps = defaultProps;

	state = {};

	render() {
		return (
			<Popover {...this.props}>
				<Button label="Trigger Popover" />
			</Popover>
		);
	}
}

/* All tests for component being tested should be wrapped in a root `describe`,
 * which should be named after the component being tested.
 * When read aloud, the cumulative `describe` and `it` names should form a coherent
 * sentence, eg "Date Picker default structure and css is present with expected
 * attributes set". If you are having trouble constructing a cumulative short
 * sentence, this may be an indicator that your test is poorly structured.
 * String provided as first parameter names the `describe` section. Limit to nouns
 * as much as possible/appropriate.`
 */
describe('SLDSFilter', function describeFunction() {
	let mountNode;
	let wrapper;

	// BASIC STRUCTURE

	describe('Add custom props to Filter Popover', function () {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('Filter could take popover as a prop and use the props of popover to render, verifies the custom popover className', () => {
			const demoPopover = (
				<DemoComponent
					className="custom-filter-popover"
					isOpen
					position="absolute"
				/>
			);
			wrapper = mount(
				<IconSettings iconPath="/assets/icons">
					<Filter
						property="Show Me"
						predicate="All Opportunities"
						popover={demoPopover}
					/>
				</IconSettings>,
				{ attachTo: mountNode }
			);

			expect(wrapper.find('.custom-filter-popover')).to.exist;
		});
	});

	describe('On click handler when clicking on filter', function () {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('Filter could take onClick prop and trigger this callback during filter click', (done) => {
			const demoPopover = <DemoComponent className="custom-filter-popover" />;

			let onFilterClicked = false;

			const onClick = () => {
				onFilterClicked = true;
			};

			wrapper = mount(
				<IconSettings iconPath="/assets/icons">
					<Filter
						property="Show Me"
						predicate="All Opportunities"
						popover={demoPopover}
						onClick={onClick}
					/>
				</IconSettings>,
				{ attachTo: mountNode }
			);

			setTimeout(() => {
				const filterButton = wrapper.find(
					'.slds-filters__item .slds-button_reset'
				);
				filterButton.simulate('click', {});
				expect(onFilterClicked).to.be.true;
				done();
			}, 0);
		});
	});
});
