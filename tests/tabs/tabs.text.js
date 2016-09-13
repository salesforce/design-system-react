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
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

// Import your internal dependencies (for example):
import Tabs from '../../components/tabs';
import Pane from '../../components/tabs/pane';

/* Enzyme Helpers can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js).
 */
import { mountComponent, unmountComponent } from '../enzyme-helpers';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const COMPONENT_CSS_CLASSES = {
	base: 'slds-tabs--default',
	nav: 'slds-tabs--default__nav'
};


/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
const DemoTabs = React.createClass({
	displayName: 'DemoTabs',

	getInitialState () {
		return {
		};
	},

	handleSelectNopesOnThree (index, last) {
		if (index === 3) {
			return false;
		}
		return true;
	},

	render () {
		return (
			<Tabs className="slds-m-top--large" onSelect={this.handleSelectNopesOnThree}>
				<Pane label="Tab A"><p>This is tab A</p></Pane>
				<Pane label="Tab B" disabled><p>This is tab B.</p><p>It is disabled.</p></Pane>
				<Pane label="Tab C"><p>This is tab C</p></Pane>
				<Pane label="Always No">
					<p>
						This one can not be selected from the tabs list because this example provides a custom <code>onSelct</code> function that retuns false when it is run, preventing the component&rsquo;s built-in handler from running, and thus the tab is never selected.
					</p>
					<p>
						Note that you <em>can</em> still see the panel if you hide the other tabs, because the tab/panel are not <em>disabled</em>.
					</p>
					<p>
						In other words, this should not be taken as an example of how to be sneaky about disabling tab selection, but rather that you can <strong>do stuff</strong> when a tab is selected by sending it a custom <code>onSelect</code> function.
					</p>
				</Pane>
			</Tabs>
		);
	}
});


describe('Tabs', () => {
	// BASIC STRUCTURE

	describe('default structure and css', () => {
		// Test DOM with minimal props set

		// String provided as first parameter names the `it` section.
		// Use short declarative sentences (sentence with "it").
		it('is present with expected attributes set', () => {});

		const id = 'this-is-a-container-test';
		beforeEach(mountComponent(
			<DemoTabs
				className="this-is-a-css-class-name"
				id="this-is-an-id"
			/>
		));

		afterEach(unmountComponent);

		it('has tree container class, list class, and heading', function () {
			const container = this.wrapper.find('.slds-tree_container');
			expect(container.hasClass('this-is-a-container-test')).to.be.true;

			const list = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(list).to.have.length(1);
			expect(list.hasClass('this-is-an-unordered-list-test')).to.be.true;
			expect(list.node.offsetHeight).to.equal(500);

			const heading = this.wrapper.find(`#${id}__heading`);
			expect(heading).to.have.length(1);
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

	describe('Mouse and keyboard interactions', () => {
		/* Test event callback functions using Simulate. For more information, view
		 * https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/simulate.md
		 */

		describe('onClick', () => {
			const itemClicked = sinon.spy();

			beforeEach(mountComponent(
				<DemoComponent itemClicked={itemClicked} />
			));

			afterEach(unmountComponent);

			it('calls event handler', function () {
				const item = this.wrapper.find('#example-tree-1').find('.slds-tree__item');
				// If applicable, use second parameter to pass the data object
				item.simulate('click', {});
				expect(itemClicked.callCount).to.equal(1);
				// If applicable, also test data object for correct contents.
			});
		});

	});
});