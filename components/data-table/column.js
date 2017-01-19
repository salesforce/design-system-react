define(['module', 'react', '../../utilities/constants'], function (module, _react, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var PropTypes = _react2.default.PropTypes;


	/**
  * Columns define the structure of the data displayed in the DataTable.
  */
	var DataTableColumn = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.DATA_TABLE_COLUMN,

		// ### Prop Types
		propTypes: {
			/**
    * Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
      * ```
      * import DataTableCell from 'design-system-react/data-table/cell';
      * const CustomDataTableCell = ({ children, ...props }) => (
      *   <DataTableCell {...props} >
      *     <a href="javascript:void(0);">{children}</a>
      *   </DataTableCell>
      * );
      * CustomDataTableCell.displayName = DataTableCell.displayName;
      *
      * <DataTable>
      *   <DataTableColumn />
      *   <DataTableColumn>
      *     <DataTableCustomCell />
      *   </DataTableColumn>
      *   <DataTableRowActions />
      * </DataTable>
      * ```
      */
			children: _react2.default.PropTypes.element,
			/**
    * The column label.
    */
			label: PropTypes.string,
			/**
    * The property which corresponds to this column.
    */
			property: PropTypes.string,
			/**
    * Whether or not the column is sortable.
    */
			sortable: PropTypes.bool,
			/**
    * The current sort direction. If left out the component will track this internally.
    */
			sortDirection: PropTypes.oneOf(['desc', 'asc']),
			truncate: PropTypes.bool
		},

		render: function render() {
			return null;
		}
	});

	module.exports = DataTableColumn;
});