'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use breadcrumbs to note the path of a record and help the user to navigate back to the parent.Breadcrumb based on SLDS 2.1.0-dev
 */
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Breadcrumbs

// Implements the [Breadcrumbs design pattern](https://www.lightningdesignsystem.com/components/breadcrumbs) in React.
// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
var BreadCrumb = function BreadCrumb(props) {
	var assistiveText = props.assistiveText;
	var trail = props.trail;


	return _react2.default.createElement(
		'nav',
		{ role: 'navigation', 'aria-label': assistiveText },
		_react2.default.createElement(
			'ol',
			{ className: 'slds-breadcrumb slds-list--horizontal' },
			trail.map(function (crumb, index) {
				return _react2.default.createElement(
					'li',
					{
						key: 'BreadCrumb.' + index,
						className: 'slds-breadcrumb__item slds-text-title--caps'
					},
					crumb
				);
			})
		)
	);
};

// ## Constants


BreadCrumb.displayName = _constants.BREAD_CRUMB;

BreadCrumb.propTypes = {
	/**
  * The assistive text for the breadcrumb trail
  */
	assistiveText: _react2.default.PropTypes.string,
	/**
  * An array of react elements presumably anchor elements.
  */
	trail: _react2.default.PropTypes.array
};

BreadCrumb.defaultProps = {
	assistiveText: 'Breadcrumbs'
};

module.exports = BreadCrumb;