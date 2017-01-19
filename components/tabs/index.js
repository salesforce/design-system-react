'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isnumber');

var _lodash4 = _interopRequireDefault(_lodash3);

var _tabsList = require('./private/tabs-list');

var _tabsList2 = _interopRequireDefault(_tabsList);

var _tab3 = require('./private/tab');

var _tab4 = _interopRequireDefault(_tab3);

var _tabPanel = require('./private/tab-panel');

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _constants = require('../../utilities/constants');

var _utilities = require('../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
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


// ### findDOMNode


// ### shortid
// `shortid` is a short, non-sequential, url-friendly, unique id generator. It is used here to provide unique strings for the HTML attribute `id` on the Tabs components. It is only used if the `id` prop is not provided on the man <Tabs /> component.


// ### classNames


// ### isFunction


// ### isNumber


// Child components


// ## Constants


// ### Helpers         from Utilities


// Determine if a node from event.target is a Tab element
function isTabNode(node) {
	return node.nodeName === 'A' && node.getAttribute('role') === 'tab' || node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
	return node.getAttribute('aria-disabled') === 'true';
}

/**
 * Tabs keeps related content in a single container that is shown and hidden through navigation.
 */
var Tabs = _react2.default.createClass({
	displayName: _constants.TABS,
	propTypes: {

		/**
   * HTML `id` attribute of primary element that has `.slds-tabs--default` on it. Optional: If one is not supplied, a `shortid` will be created.
   */
		id: _react.PropTypes.string,

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
   * 			<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
   * 			<p>They show when you click the first tab.</p>
   * 		</div>
   * 	</TabsPanel>
   * 	<TabsPanel label="Tab 2">
   * 		<div>
   * 			<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
   * 			<p>They show when you click the second tab.</p>
   * 		</div>
   * 	</TabsPanel>
   * </Tabs>
   * ```
   */
		children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node, _react.PropTypes.element]).isRequired,

		/**
   * Class names to be added to the container element and is passed along to its children.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),

		/**
   * The Tab (and corresponding TabPanel) that is selected when the component first renders. Defaults to `0`.
   */
		defaultSelectedIndex: _react.PropTypes.number,

		/**
   * This function triggers when a tab is selected
   */
		onSelect: _react.PropTypes.func,

		/**
   * If the Tabs should be scopped, defaults to false
   */
		variant: _react2.default.PropTypes.oneOf(['default', 'scoped']),

		/**
   * The Tab (and corresponding TabPanel) that is currently selected.
   */
		selectedIndex: _react.PropTypes.number
	},

	getDefaultProps: function getDefaultProps() {
		return {
			defaultSelectedIndex: 0,
			variant: 'default'
		};
	},
	getInitialState: function getInitialState() {
		return {};
	},
	componentWillMount: function componentWillMount() {
		// If no `id` is supplied in the props we generate one. An HTML ID is _required_ for several elements in a tabs component in order to leverage ARIA attributes for accessibility.
		this.generatedId = _shortid2.default.generate();
		this.flavor = this.getVariant();
		this.setState({
			selectedIndex: this.props.defaultSelectedIndex
		});
	},
	getVariant: function getVariant() {
		return this.props.variant === 'scoped' ? 'scoped' : 'default';
	},
	handleClick: function handleClick(e) {
		var node = e.target;
		/* eslint-disable no-cond-assign */
		do {
			if (this.isTabFromContainer(node)) {
				if (isTabDisabled(node)) {
					return;
				}

				var index = [].slice.call(node.parentNode.children).indexOf(node);
				this.setSelected(index);
				return;
			}
		} while ((node = node.parentNode) !== null);
		/* eslint-enable no-cond-assign */
	},
	setSelected: function setSelected(index, focus) {
		// Check index boundary
		if (index < 0 || index >= this.getTabsCount()) {
			return;
		}

		// Keep reference to last index for event handler
		var last = this.getSelectedIndex();

		// Call change event handler
		if ((0, _lodash2.default)(this.props.onSelect)) {
			this.props.onSelect(index, last);
		}

		// Don't update the state if nothing has changed
		if (index !== this.state.selectedIndex) {
			this.setState({ selectedIndex: index, focus: focus === true });
		}
	},
	getNextTab: function getNextTab(index) {
		var count = this.getTabsCount();

		// Look for non-disabled tab from index to the last tab on the right
		for (var i = index + 1; i < count; i++) {
			var tab = this.getTab(i);
			if (!isTabDisabled((0, _reactDom.findDOMNode)(tab))) {
				return i;
			}
		}

		// If no tab found, continue searching from first on left to index
		for (var _i = 0; _i < index; _i++) {
			var _tab = this.getTab(_i);
			if (!isTabDisabled((0, _reactDom.findDOMNode)(_tab))) {
				return _i;
			}
		}

		// No tabs are disabled, return index
		return index;
	},
	getPrevTab: function getPrevTab(index) {
		var i = index;

		// Look for non-disabled tab from index to first tab on the left
		while (i--) {
			var tab = this.getTab(i);
			if (!isTabDisabled((0, _reactDom.findDOMNode)(tab))) {
				return i;
			}
		}

		// If no tab found, continue searching from last tab on right to index
		i = this.getTabsCount();
		while (i-- > index) {
			var _tab2 = this.getTab(i);
			if (!isTabDisabled((0, _reactDom.findDOMNode)(_tab2))) {
				return i;
			}
		}

		// No tabs are disabled, return index
		return index;
	},
	getTabsCount: function getTabsCount() {
		return this.props.children ? _react2.default.Children.count(this.props.children) : 0;
	},
	getPanelsCount: function getPanelsCount() {
		return this.props.children ? _react2.default.Children.count(this.props.children) : 0;
	},
	getSelectedIndex: function getSelectedIndex() {
		return (0, _lodash4.default)(this.props.selectedIndex) ? this.props.selectedIndex : this.state.selectedIndex;
	},
	getTab: function getTab(index) {
		return this.refs['tabs-' + index];
	},


	/**
  * Determine if a node from event.target is a Tab element for the current Tabs container.
  * If the clicked element is not a Tab, it returns false.
  * If it finds another Tabs container between the Tab and `this`, it returns false.
  */
	isTabFromContainer: function isTabFromContainer(node) {
		// Return immediately if the clicked element is not a Tab. This prevents tab panel content from selecting a tab.
		if (!isTabNode(node)) {
			return false;
		}

		// Check if the first occurrence of a Tabs container is `this` one.
		var nodeAncestor = node.parentElement;
		var tabsNode = (0, _reactDom.findDOMNode)(this);
		do {
			if (nodeAncestor === tabsNode) return true;else if (nodeAncestor.getAttribute('data-tabs')) break;

			nodeAncestor = nodeAncestor.parentElement;
		} while (nodeAncestor);

		return false;
	},
	handleKeyDown: function handleKeyDown(event) {
		if (this.isTabFromContainer(event.target)) {
			var index = this.getSelectedIndex();
			var preventDefault = false;

			if (event.keyCode === _utilities.KEYS.LEFT || event.keyCode === _utilities.KEYS.UP) {
				// Select next tab to the left
				index = this.getPrevTab(index);
				preventDefault = true;
			} else if (event.keyCode === _utilities.KEYS.RIGHT || event.keyCode === _utilities.KEYS.DOWN) {
				// Select next tab to the right
				index = this.getNextTab(index);
				preventDefault = true;
			}

			// Prevent any dumn scrollbars from moving around as we type.
			if (preventDefault) {
				_utilities.EventUtil.trap(event);
			}

			this.setSelected(index, true);
		}
	},
	renderTabsList: function renderTabsList(parentId) {
		var _this = this;

		var children = _react2.default.Children.toArray(this.props.children);

		return (
			// `parentId` gets consumed by TabsList, adding a suffix of `-tabs__nav`
			_react2.default.createElement(
				_tabsList2.default,
				{ id: parentId, variant: this.getVariant() },
				children.map(function (child, index) {
					var ref = 'tabs-' + index;
					var id = parentId + '-slds-tabs--tab-' + index;
					var panelId = parentId + '-slds-tabs--panel-' + index;
					var selected = _this.getSelectedIndex() === index;
					var focus = selected && _this.state.focus;
					var variant = _this.getVariant();
					return _react2.default.createElement(
						_tab4.default,
						{
							key: index,
							ref: ref,
							focus: focus,
							selected: selected,
							id: id,
							panelId: panelId,
							disabled: child.props.disabled,
							variant: variant
						},
						child.props.label
					);
				})
			)
		);
	},
	renderTabPanels: function renderTabPanels(parentId) {
		var _this2 = this;

		var children = _react2.default.Children.toArray(this.props.children);
		var selectedIndex = this.getSelectedIndex();
		var result = null;

		result = children.map(function (child, index) {
			var tabId = parentId + '-slds-tabs--tab-' + index;
			var id = parentId + '-slds-tabs--panel-' + index;
			var selected = selectedIndex === index;
			var variant = _this2.getVariant();

			return _react2.default.createElement(
				_tabPanel2.default,
				{
					key: index,
					focus: focus,
					selected: selected,
					id: id,
					tabId: tabId,
					variant: variant
				},
				children[index]
			);
		});
		return result;
	},
	render: function render() {
		var _this3 = this;

		var _props = this.props;
		var className = _props.className;
		var _props$id = _props.id;
		var id = _props$id === undefined ? this.generatedId : _props$id;
		var _props$variant = _props.variant;
		var variant = _props$variant === undefined ? this.getVariant : _props$variant;

		var attributes = _objectWithoutProperties(_props, ['className', 'id', 'variant']);

		if (this.state.focus) {
			setTimeout(function () {
				_this3.setState({ focus: false });
			}, 0);
		}

		return _react2.default.createElement(
			'div',
			{
				id: id,
				className: (0, _classnames2.default)({
					'slds-tabs--default': variant === 'default',
					'slds-tabs--scoped': variant === 'scoped'
				}, className),
				onClick: this.handleClick,
				onKeyDown: this.handleKeyDown,
				'data-tabs': true
			},
			this.renderTabsList(id),
			this.renderTabPanels(id)
		);
	}
});

module.exports = Tabs;