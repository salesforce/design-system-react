'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.COMPONENT = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SLDSButton = require('../SLDSButton');

var _SLDSButton2 = _interopRequireDefault(_SLDSButton);

var _checkbox = require('../forms/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.


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
var PropTypes = _react2.default.PropTypes;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.


// ### classNames

var COMPONENT = exports.COMPONENT = 'DataTableHead';

/**
 * Used internally, provides header row rendering to the DataTable.
 */
var DataTableHead = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		allSelected: PropTypes.bool.isRequired,
		canSelectRows: PropTypes.bool.isRequired,
		columns: PropTypes.arrayOf(PropTypes.shape({
			Cell: PropTypes.func,
			props: PropTypes.object
		})),
		onToggleAll: PropTypes.func.isRequired,
		onSort: PropTypes.func.isRequired,
		showRowActions: PropTypes.bool.isRequired
	},

	// ### Render
	render: function render() {
		var _this = this;

		return _react2.default.createElement(
			'thead',
			null,
			_react2.default.createElement(
				'tr',
				{ className: 'slds-text-heading--label' },
				this.props.canSelectRows && _react2.default.createElement(
					'th',
					{ className: 'slds-cell-shrink', scope: 'col' },
					_react2.default.createElement(_checkbox2.default, {
						assistiveText: 'Select All',
						checked: this.props.allSelected,
						name: 'SelectAll',
						onChange: this.handleChange
					})
				),
				this.props.columns.map(function (column, index) {
					var _column$props = column.props;
					var label = _column$props.label;
					var property = _column$props.property;
					var sortable = _column$props.sortable;
					var sortDirection = _column$props.sortDirection;


					return _react2.default.createElement(
						'th',
						{
							scope: 'col',
							key: property,
							className: (0, _classnames2.default)({
								'slds-is-sortable': sortable
							}),
							onClick: _this.getSortHandler(sortable, column.props, index)
						},
						_react2.default.createElement(
							'div',
							{ className: 'slds-truncate' },
							label,
							sortable && _react2.default.createElement(_SLDSButton2.default, {
								assistiveText: 'Sort',
								iconCategory: 'utility',
								iconName: sortDirection === 'desc' ? 'arrowdown' : 'arrowup',
								iconSize: 'small',
								iconVariant: 'bare',
								variant: 'base'
							})
						)
					);
				}),
				this.props.showRowActions && _react2.default.createElement('th', { className: 'slds-cell-shrink' })
			)
		);
	},
	handleChange: function handleChange() {
		this.props.onToggleAll(!this.props.allSelected);
	},
	getSortHandler: function getSortHandler(sortable, props, index) {
		var _this2 = this;

		if (sortable) {
			return function () {
				return _this2.props.onSort(props, index);
			};
		}

		return null;
	}
});

exports.default = DataTableHead;