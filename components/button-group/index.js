define(['module', 'react', 'classnames', '../../utilities/constants'], function (module, _react, _classnames, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var propTypes = {
		/**
   * Children are expected to be components. If last button triggers a dropdown menu, use Dropdown instead of Button.
   */
		children: _react2.default.PropTypes.node.isRequired,
		/**
   * CSS classes added to `slds-button-group` tag
   */
		className: _react2.default.PropTypes.string
	};

	/**
  * The ButtonGroup component wraps other components (ie. Button, MenuDropdown, PopoverTooltip, etc).
  */
	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	// Implements the [Button Group design pattern](https://core-204.lightningdesignsystem.com/components/button-groups) in React.
	// Based on SLDS v2.1.0-rc.3

	var ButtonGroup = function ButtonGroup(props) {
		var children = props.children;
		var zeroIndexLength = _react2.default.Children.count(props.children) - 1;

		if (zeroIndexLength > 0) {
			children = _react2.default.Children.map(props.children, function (child, index) {
				var newChild = void 0;
				if (index === zeroIndexLength) {
					newChild = _react2.default.cloneElement(child, {
						triggerClassName: 'slds-button--last'
					});
				}

				return newChild || child;
			});
		}

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('slds-button-group', props.className), role: 'group' },
			children
		);
	};

	ButtonGroup.displayName = _constants.BUTTON_GROUP;
	ButtonGroup.propTypes = propTypes;

	module.exports = ButtonGroup;
});