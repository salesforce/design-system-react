'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('../../utilities');

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

// # ContextBar Link Component

// ## Dependencies

// ### React


// ### classNames


// ### isFunction


// ### Event Helpers


// ## Constants


/**
 * Wraps a link in the proper markup to support use in the ContextBar.
 */
var ContextBarLink = function ContextBarLink(props) {
	/* eslint-disable react/prop-types */
	var className = props.className;
	var label = props.label;
	var onClick = props.onClick;

	var other = _objectWithoutProperties(props, ['className', 'label', 'onClick']);

	function handleClick(event) {
		if ((0, _lodash2.default)(onClick)) {
			_utilities.EventUtil.trap(event);

			event.href = this.props.href;
			onClick(event);
		}
	}

	return _react2.default.createElement(
		'li',
		{ className: 'slds-context-bar__item' },
		_react2.default.createElement(
			'a',
			_extends({
				className: (0, _classnames2.default)('slds-context-bar__label-action', className),
				onClick: handleClick
			}, other),
			_react2.default.createElement(
				'span',
				{ className: 'slds-truncate' },
				label
			)
		)
	);
};

ContextBarLink.displayName = _constants.CONTEXT_BAR_LINK;

// ### Prop Types
ContextBarLink.propTypes = {
	/**
  * Class names to be added to the anchor element
  */
	className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
	/**
  * The href of the link.
  */
	href: _react.PropTypes.string,
	/**
  * Text to show for link item.
  */
	label: _react.PropTypes.string,
	/**
  * `function (event)` - fires when the link is clicked. If set, `href` will be ignored, but includes the `href` of the link in the event object.
  */
	onClick: _react.PropTypes.func
};

module.exports = ContextBarLink;