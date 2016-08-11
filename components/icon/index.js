'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilityIcon = require('../utilities/utility-icon');

var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                  */

// # Icon Component

// Based on SLDS v2.1.0-rc.4

// ## Dependencies

// ### React


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.


// ## Children


// ## Constants


/**
 * The Icon component is the Lightning Design System Icon component and should be used for naked icons. For icons that are buttons, use the <a href='#/button'>SLDSButton component</a> component with <code>variant='icon'</code>.
 */
var Icon = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.ICON,

	// ### Prop Types
	propTypes: {
		/**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   * Naked icons must have assistive text, however, if you also have visible descriptive text with the icon,
   * declare this prop as <code>assistiveText=''</code>.
   */
		assistiveText: _react.PropTypes.string,
		/**
   * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
   */
		category: _react.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']).isRequired,
		/**
   * CSS classes that are applied to the SVG
   */
		className: _react.PropTypes.string,
		/**
   * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
   */
		icon: _react.PropTypes.object,
		/**
   * Setting `inverse` to true will switch the color of the icon: light to dark, dark to light.
   */
		inverse: _react.PropTypes.bool,
		/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
		name: _react.PropTypes.string,
		/**
   * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
   */
		size: _react.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
   * Custom styles to be passed to the SVG. Could be used to change icon or background color.
   */
		style: _react.PropTypes.object,
		/**
   * Title attribute for the icon container
   */
		title: _react.PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			category: 'standard',
			size: 'medium',
			style: {}
		};
	},
	applyTextDefaultClass: function applyTextDefaultClass() {
		// if category is `utility` and `inverse` is false (default), icon will be dark // return true
		// if category is `utility` and `inverse` is true, icon will be light // return false
		// if category is NOT `utility` and `inverse` is false (default), icon will be light // return false
		// if category is NOT `utility` and `inverse` is true, icon will be dark // return true
		return this.props.category === 'utility' ? !this.props.inverse : this.props.inverse;
	},
	getContainerClasses: function getContainerClasses() {
		var category = this.props.category;

		var name = this.props.name ? this.props.name.replace(/_/g, '-') : '';

		return (0, _classnames2.default)(_defineProperty({
			'slds-icon_container': category !== 'utility',
			'slds-icon_container--circle': category === 'action'
		}, 'slds-icon-' + category + '-' + name, category === 'action'));
	},
	getIconClasses: function getIconClasses() {
		var _classNames2;

		var category = this.props.category;

		var name = this.props.name ? this.props.name.replace(/_/g, '-') : '';

		return (0, _classnames2.default)(this.props.className, 'slds-icon', (_classNames2 = {}, _defineProperty(_classNames2, 'slds-icon--' + this.props.size, this.props.size !== 'medium'), _defineProperty(_classNames2, 'slds-icon-text-default', this.applyTextDefaultClass()), _defineProperty(_classNames2, 'slds-icon-' + category + '-' + name, category !== 'utility' && category !== 'doctype' && category !== 'action'), _classNames2));
	},
	render: function render() {
		return _react2.default.createElement(
			'span',
			{
				className: this.getContainerClasses(),
				title: this.props.title
			},
			_react2.default.createElement(_utilityIcon2.default, {
				'aria-hidden': 'true',
				category: this.props.category,
				className: this.getIconClasses(),
				icon: this.props.icon,
				name: this.props.name,
				style: this.props.style
			}),
			this.props.assistiveText ? _react2.default.createElement(
				'span',
				{ className: 'slds-assistive-text' },
				this.props.assistiveText
			) : ''
		);
	}
});

module.exports = Icon;