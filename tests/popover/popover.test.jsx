/* Adds all of the Mocha (eg `it` and `should`) and sinon testing global
 * variables to the global namespace for eslint purposes.
 */
/* eslint-env mocha */
/* global sinon */

// Additional modifiers to [eslint-config-slds](https://github.com/salesforce-ux/eslint-config-slds) for convenience
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */

// Import your external dependencies
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import { mountComponent, unmountComponent } from '../enzyme-helpers';

// Import your internal dependencies (for example):
import Popover from '../../components/popover';
import Button from '../../components/button';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const dialogOpen = new CustomEvent('dialogOpen', { bubbles: true });

const defaultProps = {
	id: 'sample-popover',
	body: 'This is the body.',
	heading: 'This is the heading',
	onOpen: (dialogContents) => { ReactDOM.findDOMNode(dialogContents).dispatchEvent(dialogOpen); }
};

const defaultIds = {
	popover: `${defaultProps.id}-popover`,
	body: `${defaultProps.id}-dialog-body`,
	heading: `${defaultProps.id}-dialog-heading`
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
const DemoComponent = React.createClass({
	displayName: 'PopoverDemoComponent',
	propTypes: {
		isOpen: PropTypes.bool
	},

	getDefaultProps () {
		return defaultProps;
	},

	getInitialState () {
		return {};
	},

	// event handlers

	render () {
		console.log(this.props);
		return (
			<div>
				<Popover {...this.props}>
					<Button label="Trigger Popover" />
				</Popover>
				<Button label="Not Trigger Popover" />
			</div>
		);
	}
});

const getPopover = (dialogContents) => dialogContents.querySelector(`#${defaultIds.popover}`);

/* All tests for component being tested should be wrapped in a root `describe`,
 * which should be named after the component being tested.
 * When read aloud, the cumulative `describe` and `it` names should form a coherent
 * sentence, eg "Date Picker default structure and css is present with expected
 * attributes set". If you are having trouble constructing a cumulative short
 * sentence, this may be an indicator that your test is poorly structured.
 * String provided as first parameter names the `describe` section. Limit to nouns
 * as much as possible/appropriate.`
 */
describe('SLDSPopover', () => {
	/* Below you will find some examples of minimum areas to be tested.
	 * This should not be considered an exhaustive list. Please ensure
	 * thorough testing of your code.
	 */

	// BASIC STRUCTURE

	describe('default structure and css', () => {
		// Test DOM with minimal props set
		beforeEach(mountComponent(
			<DemoComponent
				isOpen
			/>
		));

		// afterEach(unmountComponent);

		/* Please notice the of `function () {}` and not () => {}.
		 * It allows access to the Mocha test context via `this`.
		 */
		it('is Open, has heading, body', function (done) {
			document.addEventListener('dialogOpen', function (e) {
				const popover = getPopover(e.target);
				expect(popover).to.exist;
				document.removeEventListener('dialogOpen', this);
				done();
			});

				// If applicable, also test data object for correct contents.
		});
	});

	describe('assistive technology', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 * If your component has an ARIA role in application, and
		 * does not use `tab-index`, test that the correct keyboard
		 * navigation is present.
		 */
	});
	// PROPS AND CHILDREN

	describe('Optional Props', () => {
		// What should be present in the DOM when style and className are applied?
	});

	describe('Optional Children', () => {
		// What should be present when children are added?
	});

	// DATA PROPS

	describe('Data', () => {
		/* Use exports from a corresponding `utilities/sample-data/[COMPONENT-NAME]`
		 * file to provide data to your Storybook Stories and tests in JSON format.
		 */
	});


	// EVENTS

	// describe('Mouse and keyboard interactions', () => {
	// 	/* Test event callback functions using Simulate. For more information, view
	// 	 * https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/simulate.md
	// 	 */
// 
	// 	describe('onClick', () => {
	// 		const itemClicked = sinon.spy();
// 
	// 		beforeEach(mountComponent(
	// 			<DemoComponent itemClicked={itemClicked} />
	// 		));
// 
	// 		afterEach(unmountComponent);
// 
	// 		/* Please notice the of `function () {}` and not () => {}.
	// 		 * It allows access to the Mocha test context via `this`.
	// 		 */
	// 		it('calls event handler', function () {
	// 			const item = this.wrapper.find('#example-tree-1').find('.slds-tree__item');
	// 			// If applicable, use second parameter to pass the data object
	// 			item.simulate('click', {});
	// 			expect(itemClicked.callCount).to.equal(1);
	// 				// If applicable, also test data object for correct contents.
	// 				// 
	// 		debugger;
	// 		});
	// 	});
	// });
});
