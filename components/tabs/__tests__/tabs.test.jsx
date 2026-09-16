import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import classNames from 'classnames';

import Tabs from '../';
import Panel from '../panel';

const COMPONENT_CSS_CLASSES = {
	wrapper: 'slds-tabs_default_wrapper',
	base: 'slds-tabs_default',
	nav: 'slds-tabs_default__nav',
	item: 'slds-tabs_default__item',
	link: 'slds-tabs_default__link',
	content: 'slds-tabs_default__content',
	testClass: 'this-is-a-css-class-name',
};

class TabsDemoComponent extends React.Component {
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

TabsDemoComponent.displayName = 'TabsDemoComponent';

describe('Tabs', () => {
	// BASIC STRUCTURE

	describe('Default structure and CSS', () => {
		const id = 'this-is-an-id-for-testing';

		it('Has a main wrapper with the proper class name.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const myTabsWrapper = container.querySelector(
				`.${COMPONENT_CSS_CLASSES.wrapper}`
			);
			expect(myTabsWrapper).toHaveClass(COMPONENT_CSS_CLASSES.wrapper);
		});

		it('Has exactly one (1) tabs component, and has with the proper class name.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const myTabs = container.querySelector(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(myTabs).toHaveClass(COMPONENT_CSS_CLASSES.base);
			expect(container.querySelectorAll(`.${COMPONENT_CSS_CLASSES.base}`)).toHaveLength(1);
		});

		it('Has the custom id (this-is-an-id-for-testing) we supplied.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const myTabs = container.querySelector(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(myTabs).toHaveAttribute('id', id);
		});

		it('Has exactly one (1) nav component, and has with the proper class name.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const myTabsNav = container.querySelector(`.${COMPONENT_CSS_CLASSES.nav}`);
			expect(myTabsNav).toHaveClass(COMPONENT_CSS_CLASSES.nav);
			expect(container.querySelectorAll(`.${COMPONENT_CSS_CLASSES.nav}`)).toHaveLength(1);
		});

		it(`Nav component builds proper ID (${id}-tabs__nav) because it inherits Tabs id property and appends "-slds-tabs__nav" to it.`, () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const myTabsNav = container.querySelector(`.${COMPONENT_CSS_CLASSES.nav}`);
			expect(myTabsNav).toHaveAttribute('id', `${id}-slds-tabs__nav`);
		});

		it(`Has exactly four (4) <Tab /> components, each with the proper class name (${COMPONENT_CSS_CLASSES.item}).`, () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const myTabsListItems = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			myTabsListItems.forEach((node) => {
				expect(node).toHaveClass(COMPONENT_CSS_CLASSES.item);
			});
			expect(myTabsListItems).toHaveLength(4);
		});

		it('Has only one (1) tab with ".slds-disabled" class on it.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const myTabsListItem = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`
			);
			expect(myTabsListItem).toHaveLength(1);
		});

		it('Tab components have proper ID attributes because they inherit the Tabs "id" property and append "-slds-tabs_tab-<index>" to it.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const tabs = container.querySelectorAll(`.${COMPONENT_CSS_CLASSES.item}`);
			tabs.forEach((node, index) => {
				expect(node).toHaveAttribute('id', `${id}-slds-tabs_tab-${index}`);
			});
		});

		it('TabPanel components have proper ID attributes because they inherit the Tabs "id" property and append "-slds-tabs_panel-<index>" to it.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const panels = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.content}`
			);
			panels.forEach((node, index) => {
				expect(node).toHaveAttribute('id', `${id}-slds-tabs_panel-${index}`);
			});
		});

		it('Has the proper disabled class on the second tab.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const myTabsListItem = container.querySelector(
				`.${COMPONENT_CSS_CLASSES.item}.slds-disabled`
			);
			expect(myTabsListItem).toHaveClass('slds-disabled');
		});

		it('Has the same number of tabs as panels.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const myTabsListItems = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			const myTabsPanels = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.content}`
			);
			expect(myTabsListItems).toHaveLength(4);
			expect(myTabsPanels).toHaveLength(4);
		});

		it('Tab 2 should have an error icon', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
					bar="baz"
				/>
			);

			const links = container.querySelectorAll(`.${COMPONENT_CSS_CLASSES.link}`);
			links.forEach((node, index) => {
				const errorIcon = node.querySelector('.slds-icon-utility-error');
				if (index === 2) {
					expect(errorIcon).toBeInTheDocument();
				} else {
					expect(errorIcon).not.toBeInTheDocument();
				}
			});
		});
	});

	describe('Assistive technology', () => {
		const id = 'this-is-an-id-for-testing';

		it('Tab components have proper "aria-controls" attribute because they inherit Tabs ID property and append "-slds-tabs_panel-<index>" to it.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
				/>
			);

			const links = container.querySelectorAll(`.${COMPONENT_CSS_CLASSES.link}`);
			links.forEach((node, index) => {
				expect(node).toHaveAttribute(
					'aria-controls',
					`${id}-slds-tabs_panel-${index}`
				);
			});
		});

		it('TabPanel components have proper "aria-labelledby" attribute because they inherit Tabs ID property and append "-slds-tabs_tab-<index>" to it.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
				/>
			);

			const panels = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.content}`
			);
			panels.forEach((node, index) => {
				expect(node).toHaveAttribute(
					'aria-labelledby',
					`${id}-slds-tabs_tab-${index}`
				);
			});
		});

		it('Has the aria-disabled attribute on the second tab.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
				/>
			);

			const myTabsListItem = container.querySelector(
				`.${COMPONENT_CSS_CLASSES.link}.slds-disabled`
			);
			expect(myTabsListItem).toHaveAttribute('aria-disabled', 'true');
		});

		it('Has a tabindex of -1 on the second tab.', () => {
			const { container } = render(
				<TabsDemoComponent
					className={`${COMPONENT_CSS_CLASSES.testClass}`}
					id={id}
				/>
			);

			const myTabsListItem = container.querySelector(
				`.${COMPONENT_CSS_CLASSES.item}.slds-disabled a`
			);
			expect(myTabsListItem).toHaveAttribute('tabindex', '-1');
		});
	});

	describe('Interactions click', () => {
		const id = 'this-is-an-id-for-testing--click';

		it('New panel renders when a tab is clicked', () => {
			const { container } = render(<TabsDemoComponent id={id} />);

			const myTabsListItems = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			let myFirstPanel = container.querySelector(`div#${id}-slds-tabs_panel-0`);
			let myThirdPanel = container.querySelector(`div#${id}-slds-tabs_panel-2`);

			expect(myFirstPanel).toHaveClass('slds-show');
			expect(myFirstPanel).not.toHaveClass('slds-hide');

			expect(myThirdPanel).not.toHaveClass('slds-show');
			expect(myThirdPanel).toHaveClass('slds-hide');

			fireEvent.click(myTabsListItems[2]);

			myFirstPanel = container.querySelector(`div#${id}-slds-tabs_panel-0`);
			myThirdPanel = container.querySelector(`div#${id}-slds-tabs_panel-2`);

			expect(myFirstPanel).not.toHaveClass('slds-show');
			expect(myFirstPanel).toHaveClass('slds-hide');

			expect(myThirdPanel).toHaveClass('slds-show');
			expect(myThirdPanel).not.toHaveClass('slds-hide');
		});
	});

	describe('Interactions disabled', () => {
		const id = 'this-is-an-id-for-testing--disabled';

		it('Disabled tab does not reveal new content', () => {
			const { container } = render(<TabsDemoComponent id={id} />);

			const myTabsListItems = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			const myFirstPanel = container.querySelector(`div#${id}-slds-tabs_panel-0`);
			const mySecondPanel = container.querySelector(`div#${id}-slds-tabs_panel-1`);

			expect(myFirstPanel).toHaveClass('slds-show');
			expect(myFirstPanel).not.toHaveClass('slds-hide');

			expect(mySecondPanel).not.toHaveClass('slds-show');
			expect(mySecondPanel).toHaveClass('slds-hide');

			fireEvent.click(myTabsListItems[1]);

			expect(myFirstPanel).toHaveClass('slds-show');
			expect(myFirstPanel).not.toHaveClass('slds-hide');

			expect(mySecondPanel).not.toHaveClass('slds-show');
			expect(mySecondPanel).toHaveClass('slds-hide');
		});
	});

	describe('Interactions tabby', () => {
		const id = 'this-is-an-id-for-testing--tabby';

		it('Can be tabbed into', () => {
			const { container } = render(<TabsDemoComponent id={id} />);

			const myTabsListItems = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			let myFirstPanel = container.querySelector(`div#${id}-slds-tabs_panel-0`);
			let myThirdPanel = container.querySelector(`div#${id}-slds-tabs_panel-2`);

			expect(myFirstPanel).toHaveClass('slds-show');
			expect(myFirstPanel).not.toHaveClass('slds-hide');

			expect(myThirdPanel).not.toHaveClass('slds-show');
			expect(myThirdPanel).toHaveClass('slds-hide');

			fireEvent.keyDown(myTabsListItems[0], {
				key: 'Tab',
				keyCode: 9,
				which: 9,
			});
			fireEvent.keyDown(myTabsListItems[0], {
				key: 'Right',
				keyCode: 39,
				which: 39,
			});

			myFirstPanel = container.querySelector(`div#${id}-slds-tabs_panel-0`);
			myThirdPanel = container.querySelector(`div#${id}-slds-tabs_panel-2`);

			expect(myFirstPanel).not.toHaveClass('slds-show');
			expect(myFirstPanel).toHaveClass('slds-hide');

			expect(myThirdPanel).toHaveClass('slds-show');
			expect(myThirdPanel).not.toHaveClass('slds-hide');
		});
	});

	describe('Interactions tabby disabled', () => {
		const id = 'this-is-an-id-for-testing--tabby-disabled';

		it('Disabled tab can NOT be tabbed into', () => {
			const { container } = render(<TabsDemoComponent id={id} />);

			const myTabsListItems = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			let myFirstPanel = container.querySelector(`div#${id}-slds-tabs_panel-0`);
			let mySecondPanel = container.querySelector(`div#${id}-slds-tabs_panel-1`);

			expect(myFirstPanel).toHaveClass('slds-show');
			expect(myFirstPanel).not.toHaveClass('slds-hide');

			expect(mySecondPanel).not.toHaveClass('slds-show');
			expect(mySecondPanel).toHaveClass('slds-hide');

			fireEvent.keyDown(myTabsListItems[0], {
				key: 'Tab',
				keyCode: 9,
				which: 9,
			});
			fireEvent.keyDown(myTabsListItems[0], {
				key: 'Right',
				keyCode: 39,
				which: 39,
			});

			myFirstPanel = container.querySelector(`div#${id}-slds-tabs_panel-0`);
			mySecondPanel = container.querySelector(`div#${id}-slds-tabs_panel-1`);

			expect(myFirstPanel).not.toHaveClass('slds-show');
			expect(myFirstPanel).toHaveClass('slds-hide');

			expect(mySecondPanel).not.toHaveClass('slds-show');
			expect(mySecondPanel).toHaveClass('slds-hide');
		});
	});

	describe('Interactions intercept tab selection', () => {
		const id = 'this-is-an-id-for-testing--tab-intercept';

		function interceptTabSelect() {
			return false;
		}

		it('Maintains the same tab selection when onSelect function returns false', () => {
			const { container } = render(
				<TabsDemoComponent id={id} onSelect={interceptTabSelect} />
			);

			const myTabsListItems = container.querySelectorAll(
				`.${COMPONENT_CSS_CLASSES.item}`
			);
			const myFirstPanel = container.querySelector(`div#${id}-slds-tabs_panel-0`);
			const mySecondPanel = container.querySelector(`div#${id}-slds-tabs_panel-1`);

			expect(myFirstPanel).toHaveClass('slds-show');
			expect(myFirstPanel).not.toHaveClass('slds-hide');

			expect(mySecondPanel).not.toHaveClass('slds-show');
			expect(mySecondPanel).toHaveClass('slds-hide');

			fireEvent.click(myTabsListItems[1]);

			expect(myFirstPanel).toHaveClass('slds-show');
			expect(myFirstPanel).not.toHaveClass('slds-hide');

			expect(mySecondPanel).not.toHaveClass('slds-show');
			expect(mySecondPanel).toHaveClass('slds-hide');
		});
	});
});
