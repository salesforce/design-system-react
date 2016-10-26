'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../utilities/constants');

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


// ### classNames


var TabPanel = function TabPanel(_ref) {
	var className = _ref.className;
	var children = _ref.children;
	var selected = _ref.selected;
	var id = _ref.id;
	var tabId = _ref.tabId;

	var attributes = _objectWithoutProperties(_ref, ['className', 'children', 'selected', 'id', 'tabId']);

	return _react2.default.createElement(
		'div',
		_extends({}, attributes, {
			className: (0, _classnames2.default)('slds-tabs--default__content', className, {
				'slds-show': selected,
				'slds-hide': !selected
			}),
			role: 'tabpanel',
			id: id,
			'aria-selected': selected ? 'true' : 'false',
			'aria-labelledby': tabId
		}),
		children.props.children
	);
};

TabPanel.displayName = _constants.TAB_PANEL;

TabPanel.propTypes = {
	/**
  * The `children` are the contents of the tab panel.
  *
  * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<Panel />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
  *
  * The component iterates through each `<Panel />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
  *
  * The tab panel component actually returns the _children_ of the _children_ which were provided by the `<Panel />` component.
  *
  * Due to React's nature, the `<Panel />` component wraps its children in a `div` element which we don't need nor want in our rendered DOM structure, so we just bypass it and get its kids via `{children.props.children}` in the render method below.
  * ```
  * <Tabs>
  * 	<Panel label="Tab 1">
  * 		<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
  * 		<p>They show when you click the first tab.</p>
  * 	</Pane>
  * 	<Panel label="Tab 2">
  * 		<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
  * 		<p>They show when you click the second tab.</p>
  * 	</Pane>
  * </Tabs>
  * ```
  */
	children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),

	/**
  * CSS classes to be added to the tab panel.
  */
	className: _react.PropTypes.string,

	/**
  * The HTML ID of this tab panel. Also used by the `<Tab />`that controls it as `panelId`.
  */
	id: _react.PropTypes.string,

	/**
  * Whether this panel is hidden or shown. Uses the `.slds-show` and `.slds-hide` classes.
  */
	selected: _react.PropTypes.bool,

	/**
  * The HTML ID of the `<Tab />` that controls this panel.
  */
	tabId: _react.PropTypes.string
};

TabPanel.defaultProps = {
	selected: false
};

module.exports = TabPanel;