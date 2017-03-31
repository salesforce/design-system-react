define(['module', 'react', '../../utilities/constants'], function (module, _react, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var DataTableColumn = function (_React$Component) {
		_inherits(DataTableColumn, _React$Component);

		function DataTableColumn() {
			_classCallCheck(this, DataTableColumn);

			return _possibleConstructorReturn(this, (DataTableColumn.__proto__ || Object.getPrototypeOf(DataTableColumn)).apply(this, arguments));
		}

		return DataTableColumn;
	}(_react2.default.Component);

	// ### Display Name
	// Always use the canonical component name as the React display name.
	DataTableColumn.displayName = _constants.DATA_TABLE_COLUMN;

	// ### Prop Types
	DataTableColumn.propTypes = {
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
   * The column label. If a `string` is not passed in, no `title` attribute will be rendered.
   */
		label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
		/**
   * The primary column for a row. This is almost always the first column.
   */
		primaryColumn: _react.PropTypes.bool,
		/**
   * The property which corresponds to this column.
   */
		property: _react.PropTypes.string,
		/**
   * Whether or not the column is sortable.
   */
		sortable: _react.PropTypes.bool,
		/**
   * The current sort direction. If left out the component will track this internally.
   */
		sortDirection: _react.PropTypes.oneOf(['desc', 'asc']),
		/**
   * Title used for truncation div within the cell.
   */
		title: _react.PropTypes.string,
		/**
   * Adds truncate to cell node.
   */
		truncate: _react.PropTypes.bool,
		/**
   * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
   */
		width: _react.PropTypes.string
	};

	module.exports = DataTableColumn;
});