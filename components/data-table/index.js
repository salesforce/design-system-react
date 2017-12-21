define(['exports', 'react', 'create-react-class', 'prop-types', 'shortid', 'classnames', 'lodash.assign', 'lodash.isfunction', 'lodash.reject', './check-props', './cell', './column', './private/head', './private/row', './row-actions', '../../utilities/constants'], function (exports, _react, _createReactClass, _propTypes, _shortid, _classnames, _lodash, _lodash3, _lodash5, _checkProps, _cell, _column, _head, _row, _rowActions, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash4 = _interopRequireDefault(_lodash3);

	var _lodash6 = _interopRequireDefault(_lodash5);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _cell2 = _interopRequireDefault(_cell);

	var _column2 = _interopRequireDefault(_column);

	var _head2 = _interopRequireDefault(_head);

	var _row2 = _interopRequireDefault(_row);

	var _rowActions2 = _interopRequireDefault(_rowActions);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
	}

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	// Safely get the length of an array, returning 0 for invalid input.
	var count = function count(array) {
		return Array.isArray(array) ? array.length : 0;
	};

	/**
  * DataTables support the display of structured data in rows and columns with an HTML table. To sort, filter or paginate the table, simply update the data passed in the items to the table and it will re-render itself appropriately. The table will throw a sort event as needed, and helper components for paging and filtering are coming soon.
  *
  */
	var DataTable = (0, _createReactClass2.default)({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.DATA_TABLE,

		// ### Prop Types
		propTypes: {
			/**
    * Text for heading of actions column
    */
			assistiveTextForActionsHeader: _propTypes2.default.string,
			/**
    * Text for sort action on table column header
    */
			assistiveTextForColumnSort: _propTypes2.default.string,
			/**
    * Text announced once a column is sorted in ascending order
    */
			assistiveTextForColumnSortedAscending: _propTypes2.default.string,
			/**
    * Text announced once a column is sorted in descending order
    */
			assistiveTextForColumnSortedDescending: _propTypes2.default.string,
			/**
    * Text for select all checkbox within the table header
    */
			assistiveTextForSelectAllRows: _propTypes2.default.string,
			/**
    * Text for select row
    */
			assistiveTextForSelectRow: _propTypes2.default.string,
			/**
    * Provide children of the type `<DataTableColumn />` to define the structure of the data being represented and children of the type `<DataTableRowActions />` to define a menu which will be rendered for each item in the grid. Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
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
			children: _propTypes2.default.node,
			/**
    * Class names to be added to the table.
    */
			className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
			/**
    * A variant which adds border to the vertical columns.
    */
			columnBordered: _propTypes2.default.bool,
			/**
    * A variant which decreases padding and allows more items and columns to be viewed.
    */
			compact: _propTypes2.default.bool,
			/**
    * A unique ID is needed in order to support keyboard navigation and ARIA support.
    */
			id: _propTypes2.default.string,
			/**
    * Use this if you are creating an advanced table (selectable, sortable, or resizable rows)
    */
			fixedLayout: _propTypes2.default.bool,
			/**
    * The collection of items to render in the table.
    */
			items: _propTypes2.default.array.isRequired,
			/**
    * A variant which removes hover style on rows
    */
			noRowHover: _propTypes2.default.bool,
			/**
    * This function fires when the selection of rows changes.
    */
			onChange: _propTypes2.default.func,
			/**
    * This function fires when the table should be sorted.
    */
			onSort: _propTypes2.default.func,
			/**
    * The selected rows.
    */
			selection: _propTypes2.default.array,
			/**
    * True if rows should be selectable.
    */
			selectRows: _propTypes2.default.bool,
			/**
    * A variant which modifies table layout by stacking cells to accommodate smaller viewports. Should not be used at the same time as `stackedHorizontal`.
    */
			stacked: _propTypes2.default.bool,
			/**
    * A variant which modifies table layout by displaying the header and row data side by side for smaller viewports. Should not be used at the same time as `stacked`.
    */
			stackedHorizontal: _propTypes2.default.bool,
			/**
    * A variant which adds stripes to alternating rows.
    */
			striped: _propTypes2.default.bool,
			/**
    * Tables have horizontal borders by default. This removes them.
    */
			unborderedRow: _propTypes2.default.bool,
			/**
    * A variant which removes horizontal padding. CSS class will be removed if `fixedLayout==true`.
    */
			unbufferedCell: _propTypes2.default.bool
		},

		getDefaultProps: function getDefaultProps() {
			return {
				assistiveTextForActionsHeader: 'Actions',
				assistiveTextForColumnSort: 'Sort',
				assistiveTextForColumnSortedAscending: 'Sorted Ascending',
				assistiveTextForColumnSortedDescending: 'Sorted Descending',
				assistiveTextForSelectAllRows: 'Select all rows',
				assistiveTextForSelectRow: 'Select row',
				id: _shortid2.default.generate(),
				selection: []
			};
		},
		componentWillMount: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.DATA_TABLE, this.props);
		},
		render: function render() {
			var _this = this;

			var numRows = count(this.props.items);
			var numSelected = count(this.props.selection);
			var canSelectRows = this.props.selectRows && numRows > 0;
			var allSelected = canSelectRows && numRows === numSelected;
			var indeterminateSelected = canSelectRows && numRows !== numSelected && numSelected !== 0;
			var columns = [];
			var RowActions = null;

			_react2.default.Children.forEach(this.props.children, function (child) {
				if (child && child.type.displayName === _column2.default.displayName) {
					var _child$props = child.props,
					    children = _child$props.children,
					    columnProps = _objectWithoutProperties(_child$props, ['children']);

					var props = (0, _lodash2.default)({}, _this.props);
					delete props.children;
					(0, _lodash2.default)(props, columnProps);

					var Cell = void 0;
					if (children && children.type.displayName === _constants.DATA_TABLE_CELL) {
						Cell = children.type;
						(0, _lodash2.default)(props, children.props);
					} else {
						Cell = _cell2.default;
					}

					columns.push({
						Cell: Cell,
						props: props,
						dataTableProps: _this.props
					});
				} else if (child && child.type.displayName === _rowActions2.default.displayName) {
					RowActions = child;
				}
			});

			return _react2.default.createElement(
				'table',
				{
					className: (0, _classnames2.default)('slds-table', {
						'slds-table--compact': this.props.compact,
						'slds-table--fixed-layout': this.props.fixedLayout,
						'slds-table--bordered': !this.props.unborderedRow,
						'slds-table--cell-buffer': !this.props.fixedLayout && !this.props.unbufferedCell,
						'slds-max-medium-table--stacked': this.props.stacked,
						'slds-max-medium-table--stacked-horizontalviewports': this.props.stackedHorizontal,
						'slds-table--striped': this.props.striped,
						'slds-table--col-bordered': this.props.columnBordered,
						'slds-no-row-hover': this.props.noRowHover
					}, this.props.className),
					id: this.props.id,
					role: this.props.fixedLayout ? 'grid' : null
				},
				_react2.default.createElement(_head2.default, {
					assistiveTextForActionsHeader: this.props.assistiveTextForActionsHeader,
					assistiveTextForSelectAllRows: this.props.assistiveTextForSelectAllRows,
					assistiveTextForColumnSortedAscending: this.props.assistiveTextForColumnSortedAscending,
					assistiveTextForColumnSortedDescending: this.props.assistiveTextForColumnSortedDescending,
					assistiveTextForColumnSort: this.props.assistiveTextForColumnSort,
					allSelected: allSelected,
					indeterminateSelected: indeterminateSelected,
					canSelectRows: canSelectRows,
					columns: columns,
					id: this.props.id + '-' + _constants.DATA_TABLE_HEAD,
					onToggleAll: this.handleToggleAll,
					onSort: this.props.onSort,
					showRowActions: !!RowActions
				}),
				_react2.default.createElement(
					'tbody',
					null,
					numRows > 0 ? this.props.items.map(function (item) {
						var rowId = _this.props.id + '-' + _constants.DATA_TABLE_ROW + '-' + item.id || _shortid2.default.generate();
						return _react2.default.createElement(_row2.default, {
							assistiveTextForSelectRow: _this.props.assistiveTextForSelectRow,
							canSelectRows: canSelectRows,
							columns: columns,
							fixedLayout: _this.props.fixedLayout,
							id: rowId,
							item: item,
							key: rowId,
							onToggle: _this.handleRowToggle,
							selection: _this.props.selection,
							rowActions: RowActions
						});
					}) : // Someday this should be an element to render when the table is empty
					null
				)
			);
		},
		handleToggleAll: function handleToggleAll(selected, e) {
			if ((0, _lodash4.default)(this.props.onChange)) {
				var selection = selected ? [].concat(_toConsumableArray(this.props.items)) : [];

				this.props.onChange(selection, e);
			}
		},
		handleRowToggle: function handleRowToggle(item, selected, e) {
			if ((0, _lodash4.default)(this.props.onChange)) {
				var selection = void 0;

				if (selected) {
					selection = [].concat(_toConsumableArray(this.props.selection), [item]);
				} else {
					selection = (0, _lodash6.default)(this.props.selection, item);
				}

				this.props.onChange(selection, e);
			}
		}
	});

	exports.default = DataTable;
});