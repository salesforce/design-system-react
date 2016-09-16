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

import classNames from 'classnames';


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
	wrapper: 'slds-tabs--default--wrapper',
	base: 'slds-tabs--default',
	nav: 'slds-tabs--default__nav',
	item: 'slds-tabs--default__item',
	link: 'slds-tabs--default__link',
	content: 'slds-tabs--default__content',
	testClass: 'this-is-a-css-class-name'

};


/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
const TabsDemoComponent = React.createClass({
	displayName: 'TabsDemoComponent',
	
	// ### Prop Types
	propTypes: {
		/**
		 * Class names to be added to the container element and is passed along to its children.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		])
	},


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
			<div
				className={classNames(
					'slds-m-top--large',
					`${COMPONENT_CSS_CLASSES.wrapper}`
				)}
			>
				<Tabs
					className={classNames(
						this.props.className
					)}
					onSelect={this.handleSelectNopesOnThree}
				>
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
			</div>
		);
	}
});

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
const TabsDemoComponent2 = React.createClass({
	displayName: 'DemoTabsConditional',

	// ### Prop Types
	propTypes: {
		/**
		 * Class names to be added to the container element and is passed along to its children.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		]),
		/**
		 * This function triggers when a tab is selected
		 */
		onSelect: PropTypes.func
	},

	getInitialState () {
		return {
			showA: true,
			showB: true,
			showC: true
		};
	},

	handleCheckClicked (checked, event) {
		const state = {};
		state[event.target.name] = checked;
		this.setState(state);
	},

	handleSelectNopesOnThree (index, last) {
		return true;
	},

	render () {
		return (
			<div>
				<h2 className="slds-text-heading--large">Conditional Tabs Demo</h2>


				<Tabs
					className={classNames(
						'slds-m-top--large',
						this.props.className
					)}
					onSelect={this.props.onSelect}
					selectedIndex={1}
				>
					<Pane label="Tab A"><p>This is tab A.</p></Pane>
					<Pane label="Tab B"><p>This is tab B.</p><p>It should be selected by default.</p></Pane>
					<Pane label="Tab C"><p>This is tab C.</p></Pane>
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
			</div>
		);
	}
});


describe('Tabs', () => {
	// BASIC STRUCTURE

	describe('Default structure and CSS', () => {
		// Test DOM with minimal props set

		// String provided as first parameter names the `it` section.
		// Use short declarative sentences (sentence with "it").
		// it('is present with expected attributes set', () => {});

		const id = 'this-is-an-id-for-testing';

		before(mountComponent(
			<TabsDemoComponent
				className={`${COMPONENT_CSS_CLASSES.testClass}`}
				id={id}
			/>
		));
		after(unmountComponent);

		// it('has tabs with the proper class name', function () {
		// 	const myTabs = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
		// 	console.log("myTabs", myTabs);
		// 	expect(myTabs.hasClass(COMPONENT_CSS_CLASSES.base)).to.be.true;
		// });

		// it('has a tabs with the proper class name', function () {
		// 	const myTabs = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
		// 	console.log("myTabs", myTabs);
		// 	expect(myTabs.hasClass(COMPONENT_CSS_CLASSES.base)).to.be.true;
		// });

		it('has a main wrapper with the proper class name.', function () {
			const myTabsWrapper = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.wrapper}`);
			expect(myTabsWrapper.hasClass(COMPONENT_CSS_CLASSES.wrapper)).to.be.true;
		});


		it('has exactly one (1) tabs component, and has with the proper class name.', function () {
			const myTabs = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(myTabs.hasClass(COMPONENT_CSS_CLASSES.base)).to.be.true;
			expect(myTabs).to.have.length(1);
		});


		it('has exactly one (1) nav component, and has with the proper class name.', function () {
			const myTabsNav = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.nav}`);
			expect(myTabsNav.hasClass(COMPONENT_CSS_CLASSES.nav)).to.be.true;
			expect(myTabsNav).to.have.length(1);
		});

		it('has exactly four (4) list items, each with the proper class name.', function () {
			const myTabsListItems = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}`);
			this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}`).forEach(function (node) {
				expect(node.hasClass(COMPONENT_CSS_CLASSES.item)).to.equal(true);
			});
			expect(myTabsListItems).to.have.length(4);
		});

		it('has only one (1) disabled tab.', function () {
			const myTabsListItem = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`);
			expect(myTabsListItem).to.have.length(1);
		});

		it('has the proper disabled class on the second tab.', function () {
			const myTabsListItem = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`);
			expect(myTabsListItem.hasClass('slds-disabled')).to.equal(true);
		});


		it('has the same number of tabs as panels.', function () {
			const myTabsListItems = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}`);
			const myTabsPanels = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.content}`);
			expect(myTabsListItems).to.have.length(4);
			expect(myTabsPanels).to.have.length(4);
		});
	});

	describe('Assistive technology', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 * If your component has an ARIA role in application, and
		 * does not use `tab-index`, test that the correct keyboard
		 * navigation is present.
		 */


		const id = 'this-is-an-id-for-testing';

		before(mountComponent(
			<TabsDemoComponent
				className={`${COMPONENT_CSS_CLASSES.testClass}`}
				id={id}
			/>
		));
		after(unmountComponent);

		it('has the aria-disabled attribute on the second tab.', function () {
			const myTabsListItem = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`);
			expect(myTabsListItem).to.have.attr('aria-disabled').equal('true');
		});

		it('has a tabindex of -1 on the second tab.', function () {
			const myTabsListItem = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`);
			expect(myTabsListItem).to.have.attr('tabindex').equal('-1');
		});
	});



	describe('Tabs and panels properly shown on click', () => {
		const onSelect = sinon.spy();

		beforeEach(mountComponent(
			<TabsDemoComponent2
				onSelect={onSelect}
			/>
		));

		afterEach(unmountComponent);

		// it('clicking a tab calls onSelect', function () {
		// 	const myTabsListItem = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}.slds-active`);
		// 	// expect(myTabsListItem).to.have.length(1);

		// 	myTabsListItem.simulate('click');
		// 	expect(onSelect.callCount).to.equal(1);
		// });
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

	// 	describe('onClick', () => {
	// 		const itemClicked = sinon.spy();

	// 		beforeEach(mountComponent(
	// 			<TabsDemoComponent className={`${COMPONENT_CSS_CLASSES.testClass}`} itemClicked={itemClicked} />
	// 		));

	// 		afterEach(unmountComponent);

	// 		// it('calls event handler', function () {
	// 		// 	const item = this.wrapper.find('#example-tree-1').find('.slds-tree__item');
	// 		// 	// If applicable, use second parameter to pass the data object
	// 		// 	item.simulate('click', {});
	// 		// 	expect(itemClicked.callCount).to.equal(1);
	// 		// 	// If applicable, also test data object for correct contents.
	// 		// });
	// 	});
	// });

});