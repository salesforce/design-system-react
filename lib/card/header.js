'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.idSuffixes = exports.cssClasses = exports.COMPONENT = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mediaObject = require('../media-object');

var _mediaObject2 = _interopRequireDefault(_mediaObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
var PropTypes = _react2.default.PropTypes;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.


// ## Children
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// ### React
// React is an external dependency of the project.

var COMPONENT = exports.COMPONENT = 'CardHeader';

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
var cssClasses = exports.cssClasses = {
	base: 'slds-card__header'
};
var idSuffixes = exports.idSuffixes = {
	headerActions: '__header-actions',
	filter: '__filter-input',
	heading: '__heading'
};

// ## CardHeaderDefinition
var CardHeader = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,
	// ### Prop Types
	propTypes: {
		/**
   * Adds a filter input to the card header
   */
		filter: PropTypes.node,
		/**
   * Actions performed on selected items or that relate to the entire group of items such as "Add Item.""
   */
		headerActions: PropTypes.node,
		/**
   * The heading is the name of the related item group.
   */
		heading: PropTypes.string.isRequired,
		/**
   * Icon associated with grouped items
   */
		icon: PropTypes.node,
		/**
   * Set the HTML `id` of the card filter and header actions.
   */
		id: PropTypes.string.isRequired
	},

	_renderFilter: function _renderFilter() {
		var filter = _react2.default.cloneElement(this.props.filter, {
			id: this.props.id + idSuffixes.filter
		});
		return _react2.default.createElement(
			'div',
			{ className: 'slds-input-has-icon slds-input-has-icon--left slds-size--1-of-3' },
			filter
		);
	},
	_renderMediaObjectBody: function _renderMediaObjectBody() {
		return _react2.default.createElement(
			'h2',
			{ id: this.props.id + idSuffixes.heading, className: 'slds-text-heading--small slds-truncate', title: this.props.heading },
			this.props.heading
		);
	},
	render: function render() {
		var filter = null;
		var hasFilter = this.props.filter ? true : null;

		if (this.props.filter) {
			filter = this._renderFilter();
		}

		return _react2.default.createElement(
			'div',
			{ className: cssClasses.base + " slds-grid" },
			_react2.default.createElement(_mediaObject2.default, {
				figure: this.props.icon,
				body: this._renderMediaObjectBody(),
				verticalCenter: true,
				canTruncate: true
			}),
			filter,
			_react2.default.createElement(
				'div',
				{ id: this.props.id + idSuffixes.headerActions, className: (0, _classnames2.default)('slds-no-flex', { 'slds-size--1-of-3': hasFilter, 'slds-text-align--right': hasFilter }) },
				this.props.headerActions
			)
		);
	}
});

exports.default = CardHeader;