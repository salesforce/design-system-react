'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../../../button');

var _button2 = _interopRequireDefault(_button);

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

// # Panel Filter Group Footer

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
var PanelFilterFooter = function PanelFilterFooter(_ref) {
	var addFilterLabel = _ref.addFilterLabel,
	    onClickAdd = _ref.onClickAdd,
	    onClickRemoveAll = _ref.onClickRemoveAll,
	    removeAllLabel = _ref.removeAllLabel;
	return _react2.default.createElement(
		'div',
		{ className: 'slds-filters__footer slds-grid slds-shrink-none' },
		_react2.default.createElement(_button2.default, {
			label: addFilterLabel,
			onClick: onClickAdd,
			variant: 'link'
		}),
		_react2.default.createElement(_button2.default, {
			className: 'slds-col--bump-left',
			label: removeAllLabel,
			onClick: onClickRemoveAll,
			variant: 'link'
		})
	);
};

PanelFilterFooter.displayName = 'SLDSPanelFilterFooter';

PanelFilterFooter.propTypes = {
	/**
  * Localized description of the "Add Filter" button in the footer
  */
	addFilterLabel: _react.PropTypes.node.isRequired,
	/**
  * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
  */
	onClickAdd: _react.PropTypes.func.isRequired,
	/**
  * Callback triggered when "Remove All" is clicked. Recieves an `event`.
  */
	onClickRemoveAll: _react.PropTypes.func.isRequired,
	/**
  * Localized description of the "Remove All" button in the footer
  */
	removeAllLabel: _react.PropTypes.node.isRequired

};

exports.default = PanelFilterFooter;