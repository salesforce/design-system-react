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
		]),
		/**
		 * HTML `id` attribute of primary element that has `.slds-tabs--default` on it. Optional: If one is not supplied, a `shortid` will be created.
		 */
		id: React.PropTypes.string
	},


	getInitialState () {
		return {
		};
	},

	render () {
		const {
			className,
			id,
			...attributes
		} = this.props;


		// Delete all known props, so they don't get added to DOM
		delete attributes.selectedIndex;
		delete attributes.onSelect;
		delete attributes.children;
		delete attributes.id;


		return (
			<div
				className={classNames(
					'slds-m-top--large',
					`${COMPONENT_CSS_CLASSES.wrapper}`
				)}
			>
				<Tabs
					className={classNames(
						className
					)}
					onSelect={this.handleSelectNopesOnThree}
					id={id}
					{...attributes}
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


describe('Tabs', () => {
	// BASIC STRUCTURE

	describe('Default structure and CSS', () => {
		const id = 'this-is-an-id-for-testing';

		before(mountComponent(
			<TabsDemoComponent
				className={`${COMPONENT_CSS_CLASSES.testClass}`}
				id={id}
				bar="baz"
			/>
		));
		after(unmountComponent);

		it('Has a main wrapper with the proper class name.', function () {
			const myTabsWrapper = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.wrapper}`);
			expect(myTabsWrapper.hasClass(COMPONENT_CSS_CLASSES.wrapper)).to.be.true;
		});

		it('Has exactly one (1) tabs component, and has with the proper class name.', function () {
			const myTabs = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(myTabs.hasClass(COMPONENT_CSS_CLASSES.base)).to.be.true;
			expect(myTabs).to.have.length(1);
		});

		it('Has the custom id (this-is-an-id-for-testing) we supplied.', function () {
			const myTabs = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(myTabs).attr('id').to.equal(id);
		});


		it('Has exactly one (1) nav component, and has with the proper class name.', function () {
			const myTabsNav = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.nav}`);
			expect(myTabsNav.hasClass(COMPONENT_CSS_CLASSES.nav)).to.be.true;
			expect(myTabsNav).to.have.length(1);
		});

		it(`Nav component builds proper ID (${id}-tabs__nav) because it inherits Tabs id property and appends "-slds-tabs__nav" to it.`, function () {
			const myTabsNav = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.nav}`);
			expect(myTabsNav).attr('id').to.equal(`${id}-slds-tabs__nav`);
		});

		it(`Has exactly four (4) <Tab /> components, each with the proper class name (${COMPONENT_CSS_CLASSES.item}).`, function () {
			const myTabsListItems = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}`);
			this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}`).forEach(function (node) {
				expect(node.hasClass(COMPONENT_CSS_CLASSES.item)).to.equal(true);
			});
			expect(myTabsListItems).to.have.length(4);
		});

		it('Has only one (1) tab with ".slds-disabled" class on it.', function () {
			const myTabsListItem = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`);
			expect(myTabsListItem).to.have.length(1);
		});

		it('Tab components have proper ID attributes because they inherit the Tabs "id" property and append "-slds-tabs--tab-<index>" to it.', function () {
			this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}`).forEach(function (node, index) {
				expect(node).to.have.attr('id', `${id}-slds-tabs--tab-${index}`);
			});
		});

		it('Has the proper disabled class on the second tab.', function () {
			const myTabsListItem = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`);
			expect(myTabsListItem.hasClass('slds-disabled')).to.equal(true);
		});

		it('Has the same number of tabs as panels.', function () {
			const myTabsListItems = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}`);
			const myTabsPanels = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.content}`);
			expect(myTabsListItems).to.have.length(4);
			expect(myTabsPanels).to.have.length(4);
		});
	});

	describe('Assistive technology', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 */
		const id = 'this-is-an-id-for-testing';

		before(mountComponent(
			<TabsDemoComponent
				className={`${COMPONENT_CSS_CLASSES.testClass}`}
				id={id}
			/>
		));
		after(unmountComponent);


		it('Tab components have proper "aria-controls" attribute because they inherit Tabs ID property and append "-slds-tabs--panel-<index>" to it.', function () {
			this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}`).forEach(function (node, index) {
				expect(node).to.have.attr('aria-controls', `${id}-slds-tabs--panel-${index}`);
			});
		});

		it('Tab components have proper "aria-labelledby" attribute because they inherit Tabs ID property and append "-slds-tabs--tab-<index>" to it.', function () {
			this.wrapper.find(`.${COMPONENT_CSS_CLASSES.panel}`).forEach(function (node, index) {
				expect(node).to.have.attr('aria-labelledby', `${id}-slds-tabs--tab-${index}`);
			});
		});


		it('Has the aria-disabled attribute on the second tab.', function () {
			const myTabsListItem = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`);
			expect(myTabsListItem).to.have.attr('aria-disabled').equal('true');
		});

		it('Has a tabindex of -1 on the second tab.', function () {
			const myTabsListItem = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`);
			expect(myTabsListItem).to.have.attr('tabindex').equal('-1');
		});
	});
});
