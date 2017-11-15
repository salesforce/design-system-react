define(['exports', 'react', 'prop-types', 'classnames', '../../utilities/constants'], function (exports, _react, _propTypes, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The default Cell renderer for the DataTable. Pass in any React component with the same `displayName` which takes the same props to provide custom rendering.
  */


	// ### classNames
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// ### React
	var DataTableCell = function DataTableCell(props) {
		var childText = _react2.default.isValidElement(props.children) ? props.children.props.children : props.children;
		var contents = _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)({
					'slds-truncate': props.fixedLayout
				}),
				title: props.title || childText
			},
			props.children
		);

		var cell = _react2.default.createElement(
			'td',
			{
				className: props.className,
				role: props.fixedLayout ? 'gridcell' : null,
				style: props.width ? { width: props.width } : null
			},
			contents
		);

		if (props.primaryColumn) {
			cell = _react2.default.createElement(
				'th',
				{
					className: props.className,
					role: props.fixedLayout ? 'gridcell' : null,
					style: props.width ? { width: props.width } : null
				},
				contents
			);
		}

		return cell;
	};

	// ### Display Name
	// Always use the canonical component name as the React display name.


	// ## Constants
	DataTableCell.displayName = _constants.DATA_TABLE_CELL;

	// ### Prop Types
	DataTableCell.propTypes = {
		/**
   * The contents of the cell. This can be simple text or DOM nodes. Equivalent to `props.item[props.property]`
   */
		children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
		/**
   * Class names to be added to the cell.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
   */
		fixedLayout: _propTypes2.default.bool,
		/**
   * The item from the items which represents this row.
   */
		item: _propTypes2.default.object,
		/**
   * The primary column for a row. This is almost always the first column.
   */
		primaryColumn: _propTypes2.default.bool,
		/**
   * The property of this item to display.
   */
		property: _propTypes2.default.string,
		/**
   * Shows on hover. Useful for truncated cells.
   */
		title: _propTypes2.default.string,
		/**
   * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
   */
		width: _propTypes2.default.string
	};

	exports.default = DataTableCell;
});