'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A list of Filters. This is a higher order component for filters that decorates the filter to work within a Filtering Panel. It also adds support for a Filter error label.
 */


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
var PanelFilterList = _react2.default.createClass({
	displayName: _constants.PANEL_FILTER_LIST,

	propTypes: function propTypes() {
		return {
			/**
    * Pass in `Filter` components
    */
			children: _react.PropTypes.node
		};
	},
	componentWillMount: function componentWillMount() {
		this.generatedId = _shortid2.default.generate();
	},
	render: function render() {
		var _this = this;

		var children = _react2.default.Children.map(this.props.children, function (child, index) {
			var id = child && child.props.id ? child.props.id : _this.generatedId + '-' + index;

			var clonedChild = void 0;

			if (child && child.props.errorLabel) {
				clonedChild = _react2.default.cloneElement(child, {
					isError: true
				});
			}

			return child ? _react2.default.createElement(
				'li',
				{ className: 'slds-item slds-hint-parent' },
				clonedChild || child,
				child.props.errorLabel ? _react2.default.createElement(
					'p',
					{ id: id + '-error', className: 'slds-text-color--error slds-m-top--xx-small' },
					child.props.errorLabel
				) : null
			) : null;
		});

		return _react2.default.createElement(
			'ol',
			{ className: 'slds-list--vertical slds-list--vertical-space' },
			children
		);
	}
});

// ## Constants
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Filter List

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
exports.default = PanelFilterList;