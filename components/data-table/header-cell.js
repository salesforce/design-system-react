'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.COMPONENT = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.


// ### isFunction
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
var PropTypes = _react2.default.PropTypes;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.


// ## Children

// ### Button


// ### classNames

var COMPONENT = exports.COMPONENT = 'DataTableHeaderCell';

/**
 * Used internally, renders each individual column heading.
 */
var DataTableHeaderCell = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		/**
   * The column label.
   */
		label: PropTypes.string,
		/**
   * The function to execute on sort.
   */
		onSort: PropTypes.func,
		/**
   * The property which corresponds to this column.
   */
		property: PropTypes.string,
		/**
   * Whether or not the column is sortable.
   */
		sortable: PropTypes.bool,
		/**
   * The current sort direction.
   */
		sortDirection: PropTypes.oneOf(['desc', 'asc'])
	},

	getInitialState: function getInitialState() {
		return {
			sortDirection: 'asc'
		};
	},


	// ### Render
	// Should return a `<th></th>`.
	render: function render() {
		var _props = this.props;
		var label = _props.label;
		var property = _props.property;
		var sortable = _props.sortable;


		var sortDirection = this.props.sortDirection || this.state.sortDirection;

		// i18n
		return _react2.default.createElement(
			'th',
			{
				scope: 'col',
				key: property,
				className: (0, _classnames2.default)({
					'slds-is-sortable': sortable
				}),
				onClick: sortable && this.handleSort
			},
			_react2.default.createElement(
				'div',
				{ className: 'slds-truncate' },
				label,
				sortable ? _react2.default.createElement(_button2.default, {
					assistiveText: sortDirection === 'desc' ? 'Sort Ascending' : 'Sort Descending',
					iconCategory: 'utility',
					iconName: sortDirection === 'desc' ? 'arrowdown' : 'arrowup',
					iconSize: 'small',
					iconVariant: 'bare',
					variant: 'icon'
				}) : null
			)
		);
	},
	handleSort: function handleSort(e) {
		var oldSortDirection = this.props.sortDirection || this.state.sortDirection;
		var sortDirection = oldSortDirection === 'asc' ? 'desc' : 'asc';
		var data = {
			property: this.props.property,
			sortDirection: sortDirection
		};

		this.setState({
			sortDirection: sortDirection
		});

		if ((0, _lodash2.default)(this.props.onSort)) {
			this.props.onSort(data, e);
		}
	}
});

exports.default = DataTableHeaderCell;