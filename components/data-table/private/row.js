'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### React


// ### classNames


// ### find


// ## Children


// ## Constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.find');

var _lodash2 = _interopRequireDefault(_lodash);

var _checkbox = require('../../forms/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Used internally, provides row rendering to the DataTable.
 */
var DataTableRow = (0, _createReactClass2.default)({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.DATA_TABLE_ROW,

	// ### Prop Types
	propTypes: {
		/**
   * Text for select row
   */
		assistiveTextForSelectRow: _propTypes2.default.string,
		canSelectRows: _propTypes2.default.bool,
		columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
			Cell: _propTypes2.default.func,
			props: _propTypes2.default.object
		})),
		/**
   * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
   */
		fixedLayout: _propTypes2.default.bool,
		id: _propTypes2.default.string.isRequired,
		item: _propTypes2.default.object.isRequired,
		onToggle: _propTypes2.default.func,
		rowActions: _propTypes2.default.element,
		selection: _propTypes2.default.array
	},

	isSelected: function isSelected() {
		return !!(0, _lodash2.default)(this.props.selection, this.props.item);
	},
	handleToggle: function handleToggle(selected, e) {
		return this.props.onToggle(this.props.item, selected, e);
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
	}
});

exports.default = DataTableRow;