/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React
import React, {
	PropTypes
}                      from 'react';

// ### findDOMNode
import { findDOMNode } from 'react-dom';


// ### shortid
// `shortid` is a short, non-sequential, url-friendly, unique id generator. It is used here to provide unique strings for the HTML attribute `id` on the Tabs components. It is only used if the `id` prop is not provided on the man <Tabs /> component.
import shortid         from 'shortid';

// ### classNames
import classNames      from 'classnames';

// ### isFunction
import isFunction      from 'lodash.isfunction';


// Child components
import TabsList        from './tabs-list';
import Tab             from './tab';
import TabPanel        from './tab-panel';

// ## Constants
import { TABS }        from '../../utilities/constants';


// ### Helpers         from Utilities
import { EventUtil }   from '../../utilities';


// Determine if a node from event.target is a Tab element
function isTabNode (node) {
	return (node.nodeName === 'A' && node.getAttribute('role') === 'tab' || node.nodeName === 'LI' && node.getAttribute('role') === 'tab');
}


// Determine if a tab node is disabled
function isTabDisabled (node) {
	return node.getAttribute('aria-disabled') === 'true';
}


const Tabs = React.createClass({
	displayName: TABS,
	propTypes: {

		/**
		 * HTML `id` attribute of primary element that has `.slds-tabs--default` on it. Optional: If one is not supplied, a `shortid` will be created.
		 */
		id: React.PropTypes.string,

		/**
		 * The `children` are the actual tabs and panels to be displayed.
		 *
		 * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<Pane />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
		 *
		 * The component iterates through each `<Pane />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
		 *
		 * ```
		 * <Tabs>
		 * 	<Pane label="Tab 1">
		 * 		<div>
		 * 			<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
		 * 			<p>They show when you click the first tab.</p>
		 * 		</div>
		 * 	</Pane>
		 * 	<Pane label="Tab 2">
		 * 		<div>
		 * 			<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
		 * 			<p>They show when you click the second tab.</p>
		 * 		</div>
		 * 	</Pane>
		 * </Tabs>
		 * ```
		 */
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node,
			React.PropTypes.element
		]).isRequired,

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
		onSelect: PropTypes.func,

		/**
		 * The Tab (and corresponding TabPanel) that is selected when the component renders. Defaults to `0`.
		 */
		selectedIndex: React.PropTypes.number
	},

	getDefaultProps () {
		// If no `id` is supplied in the props we generate one. An HTML ID is _required_ for several elements in a tabs component in order to leverage ARIA attributes for accessibility.
		return {
			id: shortid.generate(),
			selectedIndex: 0
		};
	},

	getInitialState () {
		return {
			selectedIndex: this.props.selectedIndex
		};
	},

	handleClick (e) {
		let node = e.target;
		/* eslint-disable no-cond-assign */
		do {
			if (this.isTabFromContainer(node)) {
				if (isTabDisabled(node)) {
					return;
				}

				const index = [].slice.call(node.parentNode.children).indexOf(node);
				this.setSelected(index);
				return;
			}
		} while ((node = node.parentNode) !== null);
		/* eslint-enable no-cond-assign */
	},

	setSelected (index, focus) {
		// Don't do anything if nothing has changed
		if (index === this.state.selectedIndex) {
			return;
		}

		// Check index boundary
		if (index < 0 || index >= this.getTabsCount()) {
			return;
		}

		// Keep reference to last index for event handler
		const last = this.state.selectedIndex;

		// Check if the change event handler cancels the tab change
		let cancel = false;

		// Call change event handler
		if (isFunction(this.props.onSelect)) {
			cancel = this.props.onSelect(index, last) === false;
		}

		if (!cancel) {
			// Update selected index
			this.setState({ selectedIndex: index, focus: focus === true });
		}
	},

	getNextTab (index) {
		const count = this.getTabsCount();


		// Look for non-disabled tab from index to the last tab on the right
		for (let i = index + 1; i < count; i++) {
			const tab = this.getTab(i);
			if (!isTabDisabled(findDOMNode(tab))) {
				return i;
			}
		}

		// If no tab found, continue searching from first on left to index
		for (let i = 0; i < index; i++) {
			const tab = this.getTab(i);
			if (!isTabDisabled(findDOMNode(tab))) {
				return i;
			}
		}

		// No tabs are disabled, return index
		return index;
	},

	getPrevTab (index) {
		let i = index;


		// Look for non-disabled tab from index to first tab on the left
		while (i--) {
			const tab = this.getTab(i);
			if (!isTabDisabled(findDOMNode(tab))) {
				return i;
			}
		}

		// If no tab found, continue searching from last tab on right to index
		i = this.getTabsCount();
		while (i-- > index) {
			const tab = this.getTab(i);
			if (!isTabDisabled(findDOMNode(tab))) {
				return i;
			}
		}

		// No tabs are disabled, return index
		return index;
	},

	getTabsCount () {
		return this.props.children ?
			React.Children.count(this.props.children) :
			0;
	},

	getPanelsCount () {
		return this.props.children ?
			React.Children.count(this.props.children) :
			0;
	},


	getTab (index) {
		return this.refs[`tabs-${index}`];
	},

	/**
	 * Determine if a node from event.target is a Tab element for the current Tabs container.
	 * If the clicked element is not a Tab, it returns false.
	 * If it finds another Tabs container between the Tab and `this`, it returns false.
	 */
	isTabFromContainer (node) {
		// Return immediately if the clicked element is not a Tab. This prevents tab panel content from selecting a tab.
		if (!isTabNode(node)) {
			return false;
		}

		// Check if the first occurrence of a Tabs container is `this` one.
		let nodeAncestor = node.parentElement;
		const tabsNode = findDOMNode(this);
		do {
			if (nodeAncestor === tabsNode) return true;
			else if (nodeAncestor.getAttribute('data-tabs')) break;

			nodeAncestor = nodeAncestor.parentElement;
		} while (nodeAncestor);

		return false;
	},

	handleKeyDown (e) {
		if (this.isTabFromContainer(e.target)) {
			let index = this.state.selectedIndex;
			let preventDefault = false;

			if (e.keyCode === 37 || e.keyCode === 38) {
				// Select next tab to the left
				index = this.getPrevTab(index);
				preventDefault = true;
			} else if (e.keyCode === 39 || e.keyCode === 40) {
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
	},

	renderTabsList (parentId) {
		const children = React.Children.toArray(this.props.children);

		return (
			// `parentId` gets consumed by TabsList, adding a suffix of `-tabs__nav`
			<TabsList id={parentId}>
				{children.map((child, index) => {
					const ref = `tabs-${index}`;
					const id = `${parentId}-slds-tabs--tab-${index}`;
					const panelId = `${parentId}-slds-tabs--panel-${index}`;
					const selected = this.state.selectedIndex === index;
					const focus = selected && this.state.focus;
					return (
						<Tab
							key={index}
							ref={ref}
							focus={focus}
							selected={selected}
							id={id}
							panelId={panelId}
							disabled={child.props.disabled}
						>
							{child.props.label}
						</Tab>
						);
				})}
			</TabsList>
		);
	},
	
	renderTabPanels (parentId) {
		const children = React.Children.toArray(this.props.children);
		let result = null;

		result = children.map((child, index) => {
			const tabId = `${parentId}-slds-tabs--tab-${index}`;
			const id = `${parentId}-slds-tabs--panel-${index}`;
			const selected = this.state.selectedIndex === index;

			return (
				<TabPanel
					key={index}
					focus={focus}
					selected={selected}
					id={id}
					tabId={tabId}
				>
					{children[this.state.selectedIndex]}
				</TabPanel>
			);
		});
		return result;
	},
	

	render () {
		const {
			className,
			id,
			...attributes
			} = this.props;

		if (this.state.focus) {
			setTimeout(() => {
				this.setState({ focus: false });
			}, 0);
		}

		// const { className, ...attributes } = this.props;

		// Delete all known props, so they don't get added to DOM
		console.log("attributes", attributes);
		delete attributes.selectedIndex;
		delete attributes.onSelect;
		// delete attributes.focus;
		delete attributes.children;
		// delete attributes.forceRenderTabPanel;
		// delete attributes.onClick;
		// delete attributes.onKeyDown;

		return (
			<div
				id={id}
				className={classNames(
					'slds-tabs--default',
					className
				)}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				data-tabs
				{...attributes}
			>
				{this.renderTabsList(id)}
				{this.renderTabPanels(id)}
			</div>
		);
	}
});

module.exports = Tabs;
