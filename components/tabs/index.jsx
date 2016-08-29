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
} from 'react';

import { findDOMNode } from 'react-dom';

// Child components
// import TabsList from './tabs-list';
import Tab from './tab';
// import TabItem from './tab-item';
import TabPanel from './tab-panel';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Constants
import {
	TABS,
	TABS_LIST,
	TAB,
	TAB_PANEL
} from '../../utilities/constants';


// ### Helpers from Utilities
import {
	EventUtil,
	uuid
} from '../../utilities';


// Determine if a node from event.target is a Tab element
function isTabNode(node) {
	return (node.nodeName === 'A' && node.getAttribute('role') === 'tab' || node.nodeName === 'LI' && node.getAttribute('role') === 'tab');
}


// Determine if a tab node is disabled
function isTabDisabled(node) {
	// console.log("[isTabDisabled] node", node);
	return node.getAttribute('aria-disabled') === 'true';
}


const Tabs = React.createClass({
	displayName: TABS,
	propTypes: {
		selectedIndex: React.PropTypes.number,
		children: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.element
		]).isRequired
	},
	getDefaultProps () {
		return {
			selectedIndex: -1
		};
	},
	getInitialState () {
		return {
			selectedIndex: this.props.selectedIndex
		};
	},


	handleClick(e) {
		let node = e.target;
		do { // eslint-disable-line no-cond-assign
			if (this.isTabFromContainer(node)) {
				if (isTabDisabled(node)) {
					return;
				}

				const index = [].slice.call(node.parentNode.children).indexOf(node);
				this.setSelected(index);
				return;
			}
		} while ((node = node.parentNode) !== null);
	},

	setSelected(index, focus) {
		// console.log("[setSelected] index", index);
		// console.log("[setSelected] focus", focus);
		// Don't do anything if nothing has changed
		// console.log("[setSelected] this.getTabsCount()", this.getTabsCount());
		// console.log("[setSelected] this.state.selectedIndex", this.state.selectedIndex);
		if (index === this.state.selectedIndex) return;
		// Check index boundary
		if (index < 0 || index >= this.getTabsCount()) return;

		// Keep reference to last index for event handler
		const last = this.state.selectedIndex;

		// Check if the change event handler cancels the tab change
		let cancel = false;

		// Call change event handler
		if (typeof this.props.onSelect === 'function') {
			cancel = this.props.onSelect(index, last) === false;
		}

		if (!cancel) {
			// Update selected index
			this.setState({ selectedIndex: index, focus: focus === true });
		}
	},

	getNextTab(index) {
		const count = this.getTabsCount();

		// console.log("[getNextTab] index", index);

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

	getPrevTab(index) {
		let i = index;

		// console.log("[getPrevTab] index", index);

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

	getTabsCount() {
		return this.props.children ?
			React.Children.count(this.props.children) :
			0;
	},

	getPanelsCount() {
		return this.props.children ?
			React.Children.count(this.props.children) :
			0;
	},


	getTab(index) {
		return this.refs[`tabs-${index}`];
	},

	/**
	 * Determine if a node from event.target is a Tab element for the current Tabs container.
	 * If the clicked element is not a Tab, it returns false.
	 * If it finds another Tabs container between the Tab and `this`, it returns false.
	 */
	isTabFromContainer(node) {
		// return immediately if the clicked element is not a Tab.
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

	handleKeyDown(e) {
		if (this.isTabFromContainer(e.target)) {
			let index = this.state.selectedIndex;
			let preventDefault = false;

			// Select next tab to the left
			if (e.keyCode === 37 || e.keyCode === 38) {
				index = this.getPrevTab(index);
				preventDefault = true;
			}
			// Select next tab to the right
			/* eslint brace-style:0 */
			else if (e.keyCode === 39 || e.keyCode === 40) {
				index = this.getNextTab(index);
				preventDefault = true;
			}

			// This prevents scrollbars from moving around
			if (preventDefault) {
				e.preventDefault();
			}

			this.setSelected(index, true);
		}
	},

	_renderTitles () {
		function labels (child, index) {
			const ref = `tabs-${index}`;
			const id = `slds-tabs--tab-${index}`;
			const panelId = `slds-tabs--panel-${index}`;
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
				>
					{child.props.label}
				</Tab>
				);
		}
		return (
			<ul className="slds-tabs--default__nav" role="tablist">
				{this.props.children.map(labels.bind(this))}
			</ul>
		);
	},
	_renderContent () {
		function panels (child, index) {
			const ref = `panels-${index}`;
			const tabId = `slds-tabs--tab-${index}`;
			const id = `slds-tabs--panel-${index}`;
			const selected = this.state.selectedIndex === index;
			return (
				<TabPanel
					key={index}
					ref={ref}
					focus={focus}
					selected={selected}
					id={id}
					tabId={tabId}
				>
					{this.props.children[this.state.selectedIndex]}
				</TabPanel>
			);
		}
		return (
			<span className="slds-tabs--default__content-wrapper">
				{this.props.children.map(panels.bind(this))}
			</span>
		);
	},
	render () {
		if (this.state.focus) {
			setTimeout(() => {
				this.state.focus = false;
			}, 0);
		}

		return (
			<div
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				className="slds-tabs--default"
				data-tabs
			>
				{this._renderTitles()}
				{this._renderContent()}
			</div>
		);
	}
});

module.exports = Tabs;
