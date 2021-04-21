// Import your external dependencies
import React from 'react';

import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import classNames from 'classnames';

// Import your internal dependencies (for example):
import Tabs from '../../tabs';
import Panel from '../../tabs/panel';

/* Enzyme Helpers can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js).
 */
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const COMPONENT_CSS_CLASSES = {
	wrapper: 'slds-tabs_default_wrapper',
	base: 'slds-tabs_default',
	nav: 'slds-tabs_default__nav',
	item: 'slds-tabs_default__item',
	link: 'slds-tabs_default__link',
	content: 'slds-tabs_default__content',
	testClass: 'this-is-a-css-class-name',
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
class TabsDemoComponent extends React.Component {
	static displayName = 'TabsDemoComponent';

	// ### Prop Types
	static propTypes = {
		/**
		 * Class names to be added to the container element and is passed along to its children.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * HTML `id` attribute of primary element that has `.slds-tabs_default` on it. Optional: If one is not supplied, a `shortid` will be created.
		 */
		id: PropTypes.string,
		/**
		 * Function that triggers when a tab is selected.
		 */
		onSelect: PropTypes.func,
	};

	render() {
		const { className, id, ...attributes } = this.props;

		// Delete all known props, so they don't get added to DOM
		delete attributes.selectedIndex;
		delete attributes.onSelect;
		delete attributes.children;
		delete attributes.id;

		return (
			<div
				className={classNames(
					'slds-m-top_large',
					`${COMPONENT_CSS_CLASSES.wrapper}`
				)}
			>
				<Tabs className={classNames(className)} id={id} {...attributes}>
					<Panel label="Tab A">
						<p>This is tab A</p>
					</Panel>
					<Panel label="Tab B" disabled>
						<p>This is tab B.</p>
						<p>It is disabled.</p>
					</Panel>
					<Panel label="Tab C" hasError>
						<p>This is tab C</p>
						<p>It has an error icon next to the tab label.</p>
					</Panel>
					<Panel label="Always No">
						<p>
							This one can not be selected from the tabs list because this
							example provides a custom <code>onSelct</code> function that
							retuns false when it is run, preventing the component&rsquo;s
							built-in handler from running, and thus the tab is never selected.
						</p>
						<p>
							Note that you <em>can</em> still see the panel if you hide the
							other tabs, because the tab/panel are not <em>disabled</em>.
						</p>
						<p>
							In other words, this should not be taken as an example of how to
							be sneaky about disabling tab selection, but rather that you can{' '}
							<strong>do stuff</strong> when a tab is selected by sending it a
							custom <code>onSelect</code> function.
						</p>
					</Panel>
				</Tabs>
			</div>
		);
	}
}

describe('Tabs', () => {
	// BASIC STRUCTURE

	describe('Default structure and CSS', () => {
		const id = 'this-is-an-id-for-testing';

		before(
			mountComponent(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			)
		);
		after(unmountComponent);

		it('Has a main wrapper with the proper class name.', function () {
			const myTabsWrapper = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.wrapper}`
			);
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
			const myTabsListItems = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			this.wrapper
				.find(`.${COMPONENT_CSS_CLASSES.item}`)
				.forEach(function (node) {
					expect(node.hasClass(COMPONENT_CSS_CLASSES.item)).to.equal(true);
				});
			expect(myTabsListItems).to.have.length(4);
		});

		it('Has only one (1) tab with ".slds-disabled" class on it.', function () {
			const myTabsListItem = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`
			);
			expect(myTabsListItem).to.have.length(1);
		});

		it('Tab components have proper ID attributes because they inherit the Tabs "id" property and append "-slds-tabs_tab-<index>" to it.', function () {
			this.wrapper
				.find(`.${COMPONENT_CSS_CLASSES.item}`)
				.forEach(function (node, index) {
					expect(node).to.have.attr('id', `${id}-slds-tabs_tab-${index}`);
				});
		});

		it('TabPanel components have proper ID attributes because they inherit the Tabs "id" property and append "-slds-tabs_panel-<index>" to it.', function () {
			this.wrapper
				.find(`.${COMPONENT_CSS_CLASSES.panel}`)
				.forEach(function (node, index) {
					expect(node).to.have.attr('id', `${id}-slds-tabs_panel-${index}`);
				});
		});

		it('Has the proper disabled class on the second tab.', function () {
			const myTabsListItem = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`
			);
			expect(myTabsListItem.hasClass('slds-disabled')).to.equal(true);
		});

		it('Has the same number of tabs as panels.', function () {
			const myTabsListItems = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			const myTabsPanels = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.content}`
			);
			expect(myTabsListItems).to.have.length(4);
			expect(myTabsPanels).to.have.length(4);
		});

		it('Tab 2 should have an error icon', function () {
			this.wrapper
				.find(`.${COMPONENT_CSS_CLASSES.link}`)
				.forEach(function (node, index) {
					if (index === 2) {
						expect(node).to.have.descendants('.slds-icon-utility-error');
					} else {
						expect(node).to.not.have.descendants('.slds-icon-utility-error');
					}
				});
		});
	});

	describe('Assistive technology', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 */
		const id = 'this-is-an-id-for-testing';

		before(
			mountComponent(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
				/>
			)
		);
		after(unmountComponent);

		it('Tab components have proper "aria-controls" attribute because they inherit Tabs ID property and append "-slds-tabs_panel-<index>" to it.', function () {
			this.wrapper
				.find(`.${COMPONENT_CSS_CLASSES.link}`)
				.forEach(function (node, index) {
					expect(node).to.have.attr(
						'aria-controls',
						`${id}-slds-tabs_panel-${index}`
					);
				});
		});

		it('TabPanel components have proper "aria-labelledby" attribute because they inherit Tabs ID property and append "-slds-tabs_tab-<index>" to it.', function () {
			this.wrapper
				.find(`.${COMPONENT_CSS_CLASSES.panel}`)
				.forEach(function (node, index) {
					expect(node).to.have.attr(
						'aria-labelledby',
						`${id}-slds-tabs_tab-${index}`
					);
				});
		});

		it('Has the aria-disabled attribute on the second tab.', function () {
			const myTabsListItem = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.link}.slds-disabled`
			);
			expect(myTabsListItem).to.have.attr('aria-disabled').equal('true');
		});

		it('Has a tabindex of -1 on the second tab.', function () {
			const myTabsListItem = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}.slds-disabled a`
			);
			expect(myTabsListItem).to.have.attr('tabindex').equal('-1');
		});
	});

	describe('Interactions click', () => {
		const id = 'this-is-an-id-for-testing--click';

		before(mountComponent(<TabsDemoComponent id={id} />));
		after(unmountComponent);

		it('New panel renders when a tab is clicked ', function () {
			const myTabsListItems = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			let myFirstPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-0`);
			let myThirdPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-2`);

			expect(myFirstPanel.hasClass('slds-show')).to.equal(true);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(false);

			expect(myThirdPanel.hasClass('slds-show')).to.equal(false);
			expect(myThirdPanel.hasClass('slds-hide')).to.equal(true);

			myTabsListItems.at(2).simulate('click');
			myFirstPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-0`);
			myThirdPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-2`);

			expect(myFirstPanel.hasClass('slds-show')).to.equal(false);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(true);

			expect(myThirdPanel.hasClass('slds-show')).to.equal(true);
			expect(myThirdPanel.hasClass('slds-hide')).to.equal(false);
		});
	});

	describe('Interactions disabled', () => {
		const id = 'this-is-an-id-for-testing--disabled';

		before(mountComponent(<TabsDemoComponent id={id} />));
		after(unmountComponent);

		it('Disabled tab does not reveal new content ', function () {
			const myTabsListItems = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			const myFirstPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-0`);
			const mySecondPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-1`);

			expect(myFirstPanel.hasClass('slds-show')).to.equal(true);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(false);

			expect(mySecondPanel.hasClass('slds-show')).to.equal(false);
			expect(mySecondPanel.hasClass('slds-hide')).to.equal(true);

			myTabsListItems.at(1).simulate('click');

			expect(myFirstPanel.hasClass('slds-show')).to.equal(true);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(false);

			expect(mySecondPanel.hasClass('slds-show')).to.equal(false);
			expect(mySecondPanel.hasClass('slds-hide')).to.equal(true);
		});
	});

	describe('Interactions tabby', () => {
		const id = 'this-is-an-id-for-testing--tabby';

		before(mountComponent(<TabsDemoComponent id={id} />));
		after(unmountComponent);

		it('Can be tabbed into', function () {
			const myTabsListItems = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			let myFirstPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-0`);
			let myThirdPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-2`);

			expect(myFirstPanel.hasClass('slds-show')).to.equal(true);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(false);

			expect(myThirdPanel.hasClass('slds-show')).to.equal(false);
			expect(myThirdPanel.hasClass('slds-hide')).to.equal(true);

			myTabsListItems.at(0).simulate('keyDown', {
				key: 'Tab',
				keyCode: 9,
				which: 9,
			});
			myTabsListItems.at(0).simulate('keyDown', {
				key: 'Right',
				keyCode: 39,
				which: 39,
			});
			myFirstPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-0`);
			myThirdPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-2`);

			expect(myFirstPanel.hasClass('slds-show')).to.equal(false);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(true);

			expect(myThirdPanel.hasClass('slds-show')).to.equal(true);
			expect(myThirdPanel.hasClass('slds-hide')).to.equal(false);
		});
	});

	describe('Interactions tabby disabled', () => {
		const id = 'this-is-an-id-for-testing--tabby-disabled';

		before(mountComponent(<TabsDemoComponent id={id} />));
		after(unmountComponent);

		it('Disabled tab can NOT be tabbed into', function () {
			const myTabsListItems = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			let myFirstPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-0`);
			let mySecondPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-1`);

			expect(myFirstPanel.hasClass('slds-show')).to.equal(true);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(false);

			expect(mySecondPanel.hasClass('slds-show')).to.equal(false);
			expect(mySecondPanel.hasClass('slds-hide')).to.equal(true);

			myTabsListItems.at(0).simulate('keyDown', {
				key: 'Tab',
				keyCode: 9,
				which: 9,
			});
			myTabsListItems.at(0).simulate('keyDown', {
				key: 'Right',
				keyCode: 39,
				which: 39,
			});
			myFirstPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-0`);
			mySecondPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-1`);

			expect(myFirstPanel.hasClass('slds-show')).to.equal(false);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(true);

			expect(mySecondPanel.hasClass('slds-show')).to.equal(false);
			expect(mySecondPanel.hasClass('slds-hide')).to.equal(true);
		});
	});

	describe('Interactions intercept tab selection', () => {
		const id = 'this-is-an-id-for-testing--tab-intercept';

		function interceptTabSelect() {
			return false;
		}

		before(
			mountComponent(
				<TabsDemoComponent id={id} onSelect={interceptTabSelect} />
			)
		);
		after(unmountComponent);

		it('Maintains the same tab selection when onSelect function returns false', function () {
			const myTabsListItems = this.wrapper.find(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			const myFirstPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-0`);
			const mySecondPanel = this.wrapper.find(`div#${id}-slds-tabs_panel-1`);

			expect(myFirstPanel.hasClass('slds-show')).to.equal(true);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(false);

			expect(mySecondPanel.hasClass('slds-show')).to.equal(false);
			expect(mySecondPanel.hasClass('slds-hide')).to.equal(true);

			myTabsListItems.at(1).simulate('click');

			expect(myFirstPanel.hasClass('slds-show')).to.equal(true);
			expect(myFirstPanel.hasClass('slds-hide')).to.equal(false);

			expect(mySecondPanel.hasClass('slds-show')).to.equal(false);
			expect(mySecondPanel.hasClass('slds-hide')).to.equal(true);
		});
	});
});
