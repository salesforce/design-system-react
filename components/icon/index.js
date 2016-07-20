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
   * An SVG object to use instead of name / category
   */
		icon: _react.PropTypes.object,
		/**
   * If true, icon color is white. If false, icon color is the default text color.
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
   * Title attribute for the icon container
   */
		title: _react.PropTypes.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			category: 'standard',
			inverse: true,
			size: 'medium'
		};
	},
	getContainerClassName: function getContainerClassName() {
		var name = this.props.name ? this.props.name.replace(/_/g, '-') : '';
		var renderName = this.props.category === 'action';

		return (0, _classnames2.default)(_defineProperty({
			'slds-icon__container': this.props.category !== 'utility'
		}, 'slds-icon-' + this.props.category + '-' + name, renderName));
	},
	getClassName: function getClassName() {
		var _classNames2;

		var name = this.props.name ? this.props.name.replace(/_/g, '-') : '';
		var customName = this.props.name ? this.props.name.replace('custom', 'custom-') : null;

		return (0, _classnames2.default)(this.props.className, 'slds-icon', (_classNames2 = {}, _defineProperty(_classNames2, 'slds-icon--' + this.props.size, this.props.size !== 'medium'), _defineProperty(_classNames2, 'slds-icon-' + customName, this.props.category === 'custom'), _defineProperty(_classNames2, 'slds-icon-' + this.props.category + '-' + name, this.props.category === 'standard'), _defineProperty(_classNames2, 'slds-icon-text-default', !this.props.inverse), _classNames2));
	},
	render: function render() {
		var label = null;

		if (this.props.assistiveText) {
			label = _react2.default.createElement(
				'span',
				{ className: 'slds-assistive-text' },
				this.props.assistiveText
			);
		}
		return _react2.default.createElement(
			'span',
			{
				className: this.getContainerClassName(),
				title: this.props.title
			},
			label,
			_react2.default.createElement(_utilityIcon2.default, {
				'aria-hidden': 'true',
				category: this.props.category,
				className: this.getClassName(),
				icon: this.props.icon,
				name: this.props.name
			})
		);
	}
});

module.exports = Icon;