'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../utilities/constants');

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// # TabItem Component

// ## Dependencies

// ### React


// ### classNames


// ## Constants


// eslint-disable-line import/no-unresolved

// Temporary hack until included in SLDS
var Tab = _react2.default.createClass({
	displayName: _constants.TAB,

	propTypes: {
		/**
   * CSS classes to be added to the tab.
   */
		className: _react.PropTypes.string,

		/**
   * The HTML ID of this tab. Also used by the `<TabPanel />` it controls as `tabId`.
   */
		id: _react.PropTypes.string,

		/**
   * Whether to apply focus to this tab.
   */
		focus: _react.PropTypes.bool,

		/**
   * When `true`, the class `.slds-active` is applied.
   */
		selected: _react.PropTypes.bool,

		/**
   * When `true`, the HTML attribute `aria-disabled` will be applied.
   */
		disabled: _react.PropTypes.bool,

		/**
   * The CSS class to be applied when this tab is selected. Defaults to `.slds-active`. If another class is desired, it should be passed in _along with_ `.slds-active`, not _instead_ of it.
   */
		activeTabClassName: _react.PropTypes.string,

		/**
   * The CSS class to be applied when this tab is disabled. Defaults to `.slds-disabled`. If another class is desired, it should be passed in _along with_ `.slds-disabled`, not _instead_ of it.
   */
		disabledTabClassName: _react.PropTypes.string,

		/**
   * The HTML ID of `<TabPanel />` this tab controls.
   */
		panelId: _react.PropTypes.string,

		/**
   * The string that is shown as both the title and the label for this tab.
   */
		children: _react.PropTypes.string,

		/**
   * If the Tabs should be scopped, defaults to false
   */
		variant: _react2.default.PropTypes.oneOf(['default', 'scoped'])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			focus: false,
			selected: false,
			activeTabClassName: 'slds-active',
			disabledTabClassName: 'slds-disabled',
			variant: 'default'
		};
	},
	componentDidMount: function componentDidMount() {
		this.checkFocus();
	},
	componentDidUpdate: function componentDidUpdate() {
		this.checkFocus();
	},
	checkFocus: function checkFocus() {
		if (this.props.selected && this.props.focus) {
			(0, _reactDom.findDOMNode)(this).focus();
		}
	},
	render: function render() {
		var _classNames, _classNames2;

		var _props = this.props;
		var selected = _props.selected;
		var disabled = _props.disabled;
		var panelId = _props.panelId;
		var activeTabClassName = _props.activeTabClassName;
		var disabledTabClassName = _props.disabledTabClassName;
		var className = _props.className;
		var children = _props.children;
		var id = _props.id;
		var variant = _props.variant;

		var attributes = _objectWithoutProperties(_props, ['selected', 'disabled', 'panelId', 'activeTabClassName', 'disabledTabClassName', 'className', 'children', 'id', 'variant']);

		return _react2.default.createElement(
			'li',
			{
				className: (0, _classnames2.default)('slds-text-title--caps', className, (_classNames = {}, _defineProperty(_classNames, activeTabClassName, selected), _defineProperty(_classNames, disabledTabClassName, disabled), _defineProperty(_classNames, 'slds-tabs--default__item', variant === 'default'), _defineProperty(_classNames, 'slds-tabs--scoped__item', variant === 'scoped'), _classNames)),
				role: 'tab',
				'aria-selected': selected ? 'true' : 'false',
				'aria-disabled': disabled,
				'aria-controls': panelId,
				tabIndex: selected ? '0' : disabled ? '-1' : null,
				id: id,
				title: children
			},
			_react2.default.createElement(
				'a',
				{
					className: (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, activeTabClassName, selected), _defineProperty(_classNames2, disabledTabClassName, disabled), _defineProperty(_classNames2, 'slds-tabs--default__link', variant === 'default'), _defineProperty(_classNames2, 'slds-tabs--scoped__link', variant === 'scoped'), _classNames2)),
					href: 'javascript:void(0);' // eslint-disable-line no-script-url
					, role: 'presentation',
					tabIndex: '-1',
					'aria-disabled': disabled
				},
				children
			)
		);
	}
});

module.exports = Tab;