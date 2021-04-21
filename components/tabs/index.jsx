/* eslint-disable no-else-return */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### shortid
// `shortid` is a short, non-sequential, url-friendly, unique id generator. It is used here to provide unique strings for the HTML attribute `id` on the Tabs components. It is only used if the `id` prop is not provided on the man <Tabs /> component.
import shortid from 'shortid';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// Child components
import TabsList from './private/tabs-list';
import Tab from './private/tab';
import TabPanel from './private/tab-panel';

// ## Constants
import { TABS } from '../../utilities/constants';

// ### Event Helpers
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
	return (
		(node.nodeName === 'A' && node.getAttribute('role') === 'tab') ||
		(node.nodeName === 'LI' &&
			(node.classList.contains('slds-tabs_default__item') ||
				node.classList.contains('slds-tabs_scoped__item') ||
				node.classList.contains('slds-vertical-tabs__nav-item')))
	);
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
	if (node.classList && node.classList.contains('slds-disabled')) {
		return true;
	} else if (node.getAttribute) {
		return node.getAttribute('aria-disabled') === 'true';
	}

	return !!node.props.disabled;
}

/**
 * Tabs keeps related content in a single container that is shown and hidden through navigation.
 */
const displayName = TABS;
const propTypes = {
	/**
	 * HTML `id` attribute of primary element that has `.slds-tabs_default` on it. Optional: If one is not supplied, a `shortid` will be created.
	 */
	id: PropTypes.string,

	/**
	 * The `children` are the actual tabs and panels to be displayed.
	 *
	 * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<TabsPanel />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
	 *
	 * The component iterates through each `<TabsPanel />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
	 *
	 * ```
	 * <Tabs>
	 * 	<TabsPanel label="Tab 1">
	 * 		<div>
	 * 			<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
	 * 			<p>They show when you click the first tab.</p>
	 * 		</div>
	 * 	</TabsPanel>
	 * 	<TabsPanel label="Tab 2">
	 * 		<div>
	 * 			<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
	 * 			<p>They show when you click the second tab.</p>
	 * 		</div>
	 * 	</TabsPanel>
	 * </Tabs>
	 * ```
	 */
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.element,
	]).isRequired,

	/**
	 * Class names to be added to the container element and is passed along to its children.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	/**
	 * The Tab (and corresponding TabPanel) that is selected when the component first renders. Defaults to `0`.
	 */
	defaultSelectedIndex: PropTypes.number,

	/**
	 * This function triggers when a tab is selected.
	 */
	onSelect: PropTypes.func,

	/**
	 * If the Tabs should be scoped, vertical, or default (default value)
	 */
	variant: PropTypes.oneOf(['default', 'scoped', 'vertical']),

	/**
	 * The Tab (and corresponding TabPanel) that is currently selected.
	 */
	selectedIndex: PropTypes.number,
};
const defaultProps = {
	defaultSelectedIndex: 0,
	variant: 'default',
};

/**
 * A tab keeps related content in a single container that is shown and hidden through navigation.
 */
class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.tabs = [];

		// If no `id` is supplied in the props we generate one. An HTML ID is _required_ for several elements in a tabs component in order to leverage ARIA attributes for accessibility.
		this.generatedId = shortid.generate();
		this.flavor = this.getVariant();
		this.state = {
			selectedIndex: props.defaultSelectedIndex,
		};
	}

	getNextTab(index) {
		const count = this.getTabsCount();

		// Look for non-disabled tab from index to the last tab on the right
		// eslint-disable-next-line no-plusplus
		// eslint-disable-next-line no-plusplus, fp/no-loops
		for (let i = index + 1; i < count; i++) {
			const tab = this.getTab(i);
			if (!isTabDisabled(tab)) {
				return i;
			}
		}

		// If no tab found, continue searching from first on left to index
		// eslint-disable-next-line no-plusplus, fp/no-loops
		for (let i = 0; i < index; i++) {
			const tab = this.getTab(i);
			if (!isTabDisabled(tab)) {
				return i;
			}
		}

		// No tabs are disabled, return index
		return index;
	}

	getPanelsCount() {
		return this.props.children ? React.Children.count(this.props.children) : 0;
	}

	getPrevTab(index) {
		let i = index;

		// Look for non-disabled tab from index to first tab on the left
		// eslint-disable-next-line fp/no-loops, no-plusplus
		while (i--) {
			const tab = this.getTab(i);
			if (!isTabDisabled(tab)) {
				return i;
			}
		}

		// If no tab found, continue searching from last tab on right to index
		i = this.getTabsCount();
		// eslint-disable-next-line fp/no-loops, no-plusplus
		while (i-- > index) {
			const tab = this.getTab(i);
			if (!isTabDisabled(tab)) {
				return i;
			}
		}

		// No tabs are disabled, return index
		return index;
	}

	getSelectedIndex() {
		return Number.isInteger(this.props.selectedIndex)
			? this.props.selectedIndex
			: this.state.selectedIndex;
	}

	getTab(index) {
		return this.tabs[index].tab;
	}

	getTabNode(index) {
		return this.tabs[index].node;
	}

	getTabsCount() {
		return this.props.children ? React.Children.count(this.props.children) : 0;
	}

	getVariant() {
		return this.props.variant || 'default';
	}

	setSelected(index, focus) {
		// Check index boundary
		if (index < 0 || index >= this.getTabsCount()) {
			return;
		}

		// Keep reference to last index for event handler
		const last = this.getSelectedIndex();

		/**
		 * This is a temporary solution that could be broken in the future without notification,
		 * since this component is not a controlled component and only relies on internal state.
		 * If this breaks in the future an alternative way to control the state from outside the
		 * component should be present.
		 * */
		let shouldContinue;
		// Call change event handler
		if (isFunction(this.props.onSelect)) {
			shouldContinue = this.props.onSelect(index, last);
		}

		// Don't update the state if nothing has changed
		if (shouldContinue !== false && index !== this.state.selectedIndex) {
			this.setState({ selectedIndex: index, focus: focus === true });
		}
	}

	handleClick = (e) => {
		let node = e.target;
		/* eslint-disable no-cond-assign, fp/no-loops */
		do {
			if (this.isTabFromContainer(node)) {
				if (isTabDisabled(node)) {
					return;
				}

				let parentNode = node.parentNode; // eslint-disable-line prefer-destructuring

				if (parentNode.nodeName === 'LI') {
					node = node.parentNode;
					parentNode = node.parentNode; // eslint-disable-line prefer-destructuring
				}

				const index = [].slice.call(parentNode.children).indexOf(node);
				this.setSelected(index);
				return;
			}
		} while ((node = node.parentNode) !== null);
		/* eslint-enable no-cond-assign */
	};

	handleKeyDown = (event) => {
		if (this.isTabFromContainer(event.target)) {
			let index = this.getSelectedIndex();
			let preventDefault = false;

			if (event.keyCode === KEYS.LEFT || event.keyCode === KEYS.UP) {
				// Select next tab to the left
				index = this.getPrevTab(index);
				preventDefault = true;
			} else if (event.keyCode === KEYS.RIGHT || event.keyCode === KEYS.DOWN) {
				// Select next tab to the right
				index = this.getNextTab(index);
				preventDefault = true;
			}

			// Prevent any dumn scrollbars from moving around as we type.
			if (preventDefault) {
				EventUtil.trap(event);
			}

			this.setSelected(index, true);
		}
	};

	/**
	 * Determine if a node from event.target is a Tab element for the current Tabs container.
	 * If the clicked element is not a Tab, it returns false.
	 * If it finds another Tabs container between the Tab and `this`, it returns false.
	 */
	isTabFromContainer(node) {
		// Return immediately if the clicked element is not a Tab. This prevents tab panel content from selecting a tab.
		if (!isTabNode(node)) {
			return false;
		}

		// Check if the first occurrence of a Tabs container is `this` one.
		let nodeAncestor = node.parentElement;
		do {
			if (nodeAncestor === this.tabsNode) return true;
			else if (nodeAncestor.getAttribute('data-tabs')) break;
			nodeAncestor = nodeAncestor.parentElement;
		} while (nodeAncestor);

		return false;
	}

	renderTabPanels(parentId) {
		const children = React.Children.toArray(this.props.children);
		const selectedIndex = this.getSelectedIndex();
		let result = null;

		result = children.map((child, index) => {
			const tabId = `${parentId}-slds-tabs_tab-${index}`;
			const id = `${parentId}-slds-tabs_panel-${index}`;
			const selected = selectedIndex === index;
			const variant = this.getVariant();

			return (
				<TabPanel
					key={child.key}
					selected={selected}
					id={id}
					tabId={tabId}
					variant={variant}
				>
					{children[index]}
				</TabPanel>
			);
		});
		return result;
	}

	renderTabsList(parentId) {
		const children = React.Children.toArray(this.props.children);

		return (
			// `parentId` gets consumed by TabsList, adding a suffix of `-tabs__nav`
			<TabsList id={parentId} variant={this.getVariant()}>
				{children.map((child, index) => {
					const id = `${parentId}-slds-tabs_tab-${index}`;
					const panelId = `${parentId}-slds-tabs_panel-${index}`;
					const selected = this.getSelectedIndex() === index;
					const focus = selected && this.state.focus;
					const variant = this.getVariant();
					return (
						<Tab
							key={child.key}
							ref={(node) => {
								this.tabs[index] = { tab: child, node };
								if (this.state.focus) {
									this.setState({ focus: false });
								}
							}}
							focus={focus}
							selected={selected}
							id={id}
							panelId={panelId}
							disabled={child.props.disabled}
							variant={variant}
							hasError={child.props.hasError}
							assistiveText={child.props.assistiveText}
						>
							{child.props.label}
						</Tab>
					);
				})}
			</TabsList>
		);
	}

	render() {
		const {
			className,
			id = this.generatedId,
			variant = this.getVariant,
		} = this.props;

		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<div
				id={id}
				className={classNames(
					{
						'slds-tabs_default': variant === 'default',
						'slds-tabs_scoped': variant === 'scoped',
						'slds-vertical-tabs': variant === 'vertical',
					},
					className
				)}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				data-tabs
				ref={(node) => {
					this.tabsNode = node;
				}}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				{this.renderTabsList(id)}
				{this.renderTabPanels(id)}
			</div>
		);
	}
}
Tabs.displayName = displayName;
Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
