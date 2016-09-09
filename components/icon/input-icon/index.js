define(['module', 'react', '../../utilities/utility-icon', '../../../utilities/constants'], function (module, _react, _utilityIcon, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * A wrapper for icons that will be rendered inside of an Input
  */


	// ## Children
	var InputIcon = function InputIcon(props) {
		return _react2.default.createElement(_utilityIcon2.default, {
			'aria-hidden': true,
			category: props.category,
			className: 'slds-input__icon slds-icon-text-default',
			icon: props.icon,
			name: props.name,
			onClick: props.onClick,
			style: props.style
		});
	};

	// ## Constants
	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	// ### React


	InputIcon.displayName = _constants.ICON_INPUT;

	InputIcon.propTypes = {
		/**
   * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
   */
		category: _react.PropTypes.string,
		/**
   * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
   */
		icon: _react.PropTypes.object,
		/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
		name: _react.PropTypes.string,
		/**
   * This event fires when the icon is clicked.
   */
		onClick: _react.PropTypes.func,
		/**
   * Custom styles to be passed to the SVG. Could be used to change icon or background color.
   */
		style: _react.PropTypes.object
	};

	InputIcon.defaultProps = {
		category: 'utility'
	};

	module.exports = InputIcon;
});