define(['module', 'react', '../../utilities/constants'], function (module, _react, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var

	// Removes the need for `PropTypes`.
	PropTypes = _react2.default.PropTypes;


	/**
  * The default Cell renderer for the DataTable. Pass in any React component with the same `displayName` which takes the same props to provide custom rendering.
  */
	var DataTableCell = function DataTableCell(props) {
		return _react2.default.createElement(
			'td',
			{ className: props.className, 'data-label': props.label },
			props.children
		);
	};

	// ### Display Name
	// Always use the canonical component name as the React display name.
	DataTableCell.displayName = _constants.DATA_TABLE_CELL;

	// ### Prop Types
	DataTableCell.propTypes = {
		/**
   * The contents of the cell. Equivalent to `props.item[props.property]`
   */
		children: PropTypes.node,
		/**
   * Class names to be added to the cell.
   */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
   * The item from the items which represents this row.
   */
		item: PropTypes.object,
		/**
   * The column label.
   */
		label: PropTypes.string,
		/**
   * The property of this item to display.
   */
		property: PropTypes.string
	};

	module.exports = DataTableCell;
});