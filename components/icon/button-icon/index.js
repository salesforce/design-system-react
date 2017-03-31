'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _utilityIcon = require('../../utilities/utility-icon');

var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                  */

// ### React


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


// ### Children


/**
 * This is a non-interctive wrapper component for `UtilityIcon` that specifies button icon classes for an icon inside a `button` tag. Use of this component by itself is not recommended, but should be used as part of other components to obtain the correct styling for icons within buttons. This component only partially implements [Button Icons](http://www.lightningdesignsystem.com/components/button-icons). It does not return a `button` HTML tag. It only returns an icon for use within a button. Assistive text must also be rendered by the parent.
 */
var ButtonIcon = function ButtonIcon(props) {
	var _classNames;

	(0, _checkProps2.default)(_constants.BUTTON_ICON, props);

	return _react2.default.createElement(_utilityIcon2.default, {
		'aria-hidden': 'true',
		category: props.category,
		className: (0, _classnames2.default)('slds-button__icon', (_classNames = {}, _defineProperty(_classNames, 'slds-button__icon--' + props.size, props.size && props.size !== 'medium'), _defineProperty(_classNames, 'slds-button__icon--inverse-hint', props.inverse && props.hint), _defineProperty(_classNames, 'slds-button__icon--hint', props.hint && !props.inverse), _defineProperty(_classNames, 'slds-button__icon--' + props.position, props.position), _classNames), props.className) // iconClassName has been deprecated
		, icon: props.icon,
		name: props.name
	});
};

var propTypes = {
	/**
  * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
  */
	category: _react.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']).isRequired,
	/**
  * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
  */
	hint: _react.PropTypes.bool,
	/**
   * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
   */
	icon: _react.PropTypes.object,
	/**
  * Class names to be added to the SVG.
  */
	className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
	/**
  * Setting `inverse` to true will switch the color of the icon: light to dark, dark to light.
  */
	inverse: _react.PropTypes.bool,
	/**
  * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
  */
	name: _react.PropTypes.string,
	/**
  * Adds additional spacing on the opposite side specified between button icon and the button label
  */
	position: _react.PropTypes.oneOf(['left', 'right']),
	/**
  * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
  */
	size: _react.PropTypes.oneOf(['x-small', 'small', 'medium', 'large'])
};

var defaultProps = {
	category: 'utility',
	size: 'medium'
};

ButtonIcon.displayName = _constants.BUTTON_ICON;
ButtonIcon.propTypes = propTypes;
ButtonIcon.defaultProps = defaultProps;

module.exports = ButtonIcon;