"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// extends is used below so that react-docgen can detect the component

/**
 * Columns define the structure of the data displayed in the DataTable.
 */
var DataTableColumn = /*#__PURE__*/function (_React$Component) {
  _inherits(DataTableColumn, _React$Component);

  var _super = _createSuper(DataTableColumn);

  function DataTableColumn() {
    _classCallCheck(this, DataTableColumn);

    return _super.apply(this, arguments);
  }

  return DataTableColumn;
}(_react.default.Component); // ### Display Name
// Always use the canonical component name as the React display name.


DataTableColumn.displayName = _constants.DATA_TABLE_COLUMN; // ### Prop Types

DataTableColumn.propTypes = {
  /**
   * Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
   * ```
   * import DataTableCell from 'design-system-react/data-table/cell';
   * const CustomDataTableCell = ({ children, ...props }) => (
   *   <DataTableCell {...props} >
   *     <a href="#">{children}</a>
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
  children: _propTypes.default.element,

  /**
   * Some columns, such as "date last viewed" or "date recently updated," should sort descending first, since that is what the user probably wants. How often does one want to see their oldest files first in a table? If sortable and the `DataTable`'s parent has not defined the sort order, then ascending (A at the top to Z at the bottom) is the default sort order on first click.
   */
  isDefaultSortDescending: _propTypes.default.bool,

  /**
   * Selects this column as the currently sorted column.
   */
  isSorted: _propTypes.default.bool,

  /**
   * The column label. If a `string` is not passed in, no `title` attribute will be rendered.
   */
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * The primary column for a row. This is almost always the first column.
   */
  primaryColumn: _propTypes.default.bool,

  /**
   * The property which corresponds to this column.
   */
  property: _propTypes.default.string,

  /**
   * Whether or not the column is sortable.
   */
  sortable: _propTypes.default.bool,

  /**
   * The current sort direction. If left out the component will track this internally. Required if `isSorted` is true.
   */
  sortDirection: _propTypes.default.oneOf(['desc', 'asc']),

  /**
   * Title used for truncation div within the cell.
   */
  title: _propTypes.default.string,

  /**
   * Adds truncate to cell node.
   */
  truncate: _propTypes.default.bool,

  /**
   * Width of column. This is required for advanced/fixed layout tables. Please provide units. (`rems` are recommended)
   */
  width: _propTypes.default.string
};
var _default = DataTableColumn;
exports.default = _default;