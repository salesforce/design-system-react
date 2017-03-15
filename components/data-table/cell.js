define(['module', 'react', 'classnames', '../../utilities/constants'], function (module, _react, _classnames, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	/**
  * The default Cell renderer for the DataTable. Pass in any React component with the same `displayName` which takes the same props to provide custom rendering.
  */
	var DataTableCell = function DataTableCell(props) {
		var childText = _typeof(props.children) === 'object' ? props.children.props.children : props.children;
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
	DataTableCell.displayName = _constants.DATA_TABLE_CELL;

	// ### Prop Types
	DataTableCell.propTypes = {
		/**
   * The contents of the cell. This can be simple text or DOM nodes. Equivalent to `props.item[props.property]`
   */
		children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
		/**
   * Class names to be added to the cell.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
   */
		fixedLayout: _react.PropTypes.bool,
		/**
   * The item from the items which represents this row.
   */
		item: _react.PropTypes.object,
		/**
   * The primary column for a row. This is almost always the first column.
   */
		primaryColumn: _react.PropTypes.bool,
		/**
   * The property of this item to display.
   */
		property: _react.PropTypes.string,
		/**
   * Shows on hover. Useful for truncated cells.
   */
		title: _react.PropTypes.string,
		/**
   * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
   */
		width: _react.PropTypes.string
	};

	module.exports = DataTableCell;
});