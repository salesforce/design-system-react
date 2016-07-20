'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// List regions for export


// ### classNames
var regions = ['primary', 'secondary', 'tertiary'];

/**
 * Regions make up a GlobalNavigation Bar and typically contain links and dropdowns. The Primary region contains the AppSwitcher, Application Name, and Object Switcher. The secondary region typically has navigation betweens sections of the application. The tertiary region is aligned to the right side of the screen and contains shortcuts or actions.
 */


// ## Constants
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Navigation Bar Region Component

// ## Dependencies

// ### React
var Region = _react2.default.createClass({
	displayName: _constants.GLOBAL_NAVIGATION_BAR_REGION,

	// ### Prop Types
	propTypes: {
		/**
   * Contents of region. Expects `GlobalNavigationBarLink`, `GlobalNavigationBarDropdown`, `GlobalNavigationBarApplicationName`, `AppSwitcher`, but could be any component. This is the place to pass in an Object Switcher until that is supported.
   */
		children: _react.PropTypes.node,
		/**
   * Determines position of separating bar. The default is `null` except for the primary region which is set to `right`.
   */
		dividerPosition: _react.PropTypes.oneOf(['none', 'left', 'right']),
		/**
   * CSS classes to be added to the region
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Wraps the `secondary` region in a `nav` and adds a role attribute
   */
		navigation: _react.PropTypes.bool,
		/**
   * Region wrap children in styling specific to that region.
   */
		region: _react.PropTypes.oneOf(regions)
	},

	renderPrimary: function renderPrimary() {
		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('slds-context-bar__primary', this.props.className) },
			this.props.children
		);
	},
	renderSecondary: function renderSecondary(dividerClass) {
		var region = null;

		if (this.props.navigation) {
			region = _react2.default.createElement(
				'nav',
				{ className: (0, _classnames2.default)('slds-context-bar__secondary', dividerClass, this.props.className), role: 'navigation' },
				_react2.default.createElement(
					'ul',
					{ className: 'slds-grid' },
					this.props.children
				)
			);
		} else {
			region = _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('slds-context-bar__secondary', dividerClass, this.props.className) },
				_react2.default.createElement(
					'ul',
					{ className: 'slds-grid' },
					this.props.children
				)
			);
		}
		return region;
	},
	renderTertiary: function renderTertiary(dividerClass) {
		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('slds-context-bar__tertiary', 'slds-col--bump-left', dividerClass, this.props.className) },
			_react2.default.createElement(
				'ul',
				{ className: 'slds-grid' },
				this.props.children
			)
		);
	},


	// ### Render
	render: function render() {
		var dividerClass = this.props.dividerPosition ? 'slds-context-bar__item--divider-' + this.props.dividerPosition : null;

		var region = void 0;

		switch (this.props.region) {
			case 'primary':
				// divider class is always `right` for primary
				region = this.renderPrimary();
				break;
			case 'secondary':
				region = this.renderSecondary(dividerClass);
				break;
			case 'tertiary':
				region = this.renderTertiary(dividerClass);
				break;
			default:
				region = null;
		}

		return region;
	}
});

module.exports = Region;
module.exports.regions = regions;