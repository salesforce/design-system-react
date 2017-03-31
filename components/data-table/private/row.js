'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                  */

// ### React


// ### classNames


// ### find


// ## Children


// ## Constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.find');

var _lodash2 = _interopRequireDefault(_lodash);

var _checkbox = require('../../forms/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.
var PropTypes = _react2.default.PropTypes;

/**
 * Used internally, provides row rendering to the DataTable.
 */

var DataTableRow = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.DATA_TABLE_ROW,

	// ### Prop Types
	propTypes: {
		/**
   * Text for select row
   */
		assistiveTextForSelectRow: PropTypes.string,
		canSelectRows: PropTypes.bool,
		columns: PropTypes.arrayOf(PropTypes.shape({
			Cell: PropTypes.func,
			props: PropTypes.object
		})),
		/**
   * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
   */
		fixedLayout: PropTypes.bool,
		id: PropTypes.string.isRequired,
		item: _react2.default.PropTypes.object.isRequired,
		onToggle: PropTypes.func,
		rowActions: PropTypes.element,
		selection: PropTypes.array
	},

	// ### Render
	render: function render() {
		var _this = this;

		var isSelected = this.isSelected();

		// i18n
		return _react2.default.createElement(
			'tr',
			{
				className: (0, _classnames2.default)({
					'slds-hint-parent': this.props.rowActions,
					'slds-is-selected': this.props.canSelectRows && isSelected
				})
			},
			this.props.canSelectRows ? _react2.default.createElement(
				'td',
				{
					role: this.props.fixedLayout ? 'gridcell' : null,
					className: 'slds-text-align--right',
					'data-label': 'Select Row',
					style: { width: '3.25rem' }
				},
				_react2.default.createElement(_checkbox2.default, {
					assistiveText: this.props.assistiveTextForSelectRow,
					checked: isSelected,
					id: this.props.id + '-SelectRow',
					name: 'SelectRow',
					onChange: this.handleToggle
				})
			) : null,
			this.props.columns.map(function (column) {
				var Cell = column.Cell;
				var cellId = _this.props.id + '-' + _constants.DATA_TABLE_CELL + '-' + column.props.property;

				return _react2.default.createElement(
					Cell,
					_extends({}, column.props, {
						className: column.props.truncate ? 'slds-truncate' : null,
						fixedLayout: _this.props.fixedLayout,
						rowHeader: column.props.primaryColumn,
						id: cellId,
						item: _this.props.item,
						key: cellId,
						width: column.props.width
					}),
					_this.props.item[column.props.property]
				);
			}),
			this.props.rowActions ? _react2.default.cloneElement(this.props.rowActions, {
				id: this.props.id + '-' + _constants.DATA_TABLE_ROW_ACTIONS,
				item: this.props.item
			}) : null
		);
	},
	isSelected: function isSelected() {
		return !!(0, _lodash2.default)(this.props.selection, this.props.item);
	},
	handleToggle: function handleToggle(selected, e) {
		return this.props.onToggle(this.props.item, selected, e);
	}
});

exports.default = DataTableRow;