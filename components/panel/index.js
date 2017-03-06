define(['exports', 'react', 'classnames', '../../utilities/constants'], function (exports, _react, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * A panel provides detailed contextual information or contextual filtering options.
  */


	// ### classNames
	var Panel = function Panel(_ref) {
		var children = _ref.children,
		    variant = _ref.variant;
		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-panel', 'slds-grid', 'slds-grid--vertical', 'slds-nowrap', {
					'slds-panel--filters': variant === 'filters'
				})
			},
			_react2.default.createElement(
				'div',
				{ className: 'slds-form--stacked slds-grow slds-scrollable--y slds-grid slds-grid--vertical' },
				children
			)
		);
	};

	// ## Constants
	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	// # Panel - Filter variant

	// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
	// Based on SLDS v2.2.0-rc.1

	// ## Dependencies

	// ### React


	Panel.displayName = _constants.PANEL;

	Panel.propTypes = {
		/**
   * The contents of the panel
   */
		children: _react.PropTypes.node,
		/**
   * The type of panel
   */
		variant: _react.PropTypes.oneOf(['filters'])
	};

	exports.default = Panel;
});