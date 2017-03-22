'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A filtering panel contextual filtering options.
 */
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # FIlter List Heading

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
var PanelFilterListHeading = function PanelFilterListHeading(_ref) {
	var heading = _ref.heading,
	    isLocked = _ref.isLocked,
	    lockedHeading = _ref.lockedHeading;
	return _react2.default.createElement(
		'h3',
		{
			className: (0, _classnames2.default)('slds-text-body--small', 'slds-m-vertical--x-small', { 'slds-grid': isLocked })
		},
		isLocked ? lockedHeading : heading,
		isLocked ? _react2.default.createElement(_icon2.default, {
			className: 'slds-m-left--x-small',
			assistiveText: 'locked',
			category: 'utility',
			name: 'lock',
			size: 'x-small'
		}) : null
	);
};

// ## Constants


// ### classNames


PanelFilterListHeading.displayName = _constants.PANEL_FILTER_LIST_HEADING;

PanelFilterListHeading.propTypes = {
	/**
  * Heading for following PanelFilterList
  */
	heading: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
	/**
  * Displayed a heading for a locked list of filters
  */
	isLocked: _react.PropTypes.bool,
	/**
  * Heading for a group of filters that are locked
  */
	lockedHeading: _react.PropTypes.string
};

PanelFilterListHeading.defaultProps = {
	heading: 'Matching all these filters',
	lockedLabel: 'Locked filters'

};

exports.default = PanelFilterListHeading;