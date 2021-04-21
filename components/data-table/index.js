"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _lodash2 = _interopRequireDefault(require("lodash.reject"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _executionEnvironment = require("../../utilities/execution-environment");

var _paletteColors = require("../../utilities/design-tokens/dist/palette-colors.common");

var _salesforceSkin = require("../../utilities/design-tokens/dist/salesforce-skin.common");

var _cell = _interopRequireDefault(require("./cell"));

var _column = _interopRequireDefault(require("./column"));

var _head = _interopRequireDefault(require("./private/head"));

var _row = _interopRequireDefault(require("./private/row"));

var _rowActions = _interopRequireDefault(require("./row-actions"));

var _spinner = _interopRequireDefault(require("../spinner"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Safely get the length of an array, returning 0 for invalid input.
var count = function count(array) {
  return Array.isArray(array) ? array.length : 0;
};

var defaultProps = {
  assistiveText: {
    actionsHeader: 'Actions',
    columnSort: 'Sort by: ',
    columnSortedAscending: 'Sorted Ascending',
    columnSortedDescending: 'Sorted Descending',
    selectAllRows: 'Select all rows',
    selectRow: 'Select row',
    selectRowGroup: 'Choose a row to select',
    loadingMore: 'Loading more'
  },
  selection: [],
  hasMore: false,
  loadMoreOffset: 20
};
/**
 * DataTables support the display of structured data in rows and columns with an HTML table. To sort, filter or paginate the table, simply update the data passed in the items to the table and it will re-render itself appropriately. The table will throw a sort event as needed, and helper components for paging and filtering are coming soon.
 *
 * NOTE: for horizontal scrolling with `fixedHeader`-enabled DataTables, see the `style` property description
 */

var DataTable = /*#__PURE__*/function (_React$Component) {
  _inherits(DataTable, _React$Component);

  var _super = _createSuper(DataTable);

  // ### Display Name
  // Always use the canonical component name as the React display name.
  // ### Prop Types
  function DataTable(props) {
    var _this;

    _classCallCheck(this, DataTable);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleToggleAll", function (e, _ref) {
      var checked = _ref.checked;

      // REMOVE AT NEXT BREAKING CHANGE
      // `onChange` is deprecated and replaced with `onRowChange`
      if (typeof _this.props.onChange === 'function') {
        var selection = (checked ? _toConsumableArray(_this.props.items) : []).filter(function (item) {
          return item.type !== 'header-row';
        });

        _this.props.onChange(selection, e);
      }

      if (typeof _this.props.onRowChange === 'function') {
        var _selection = (checked ? _toConsumableArray(_this.props.items) : []).filter(function (item) {
          return item.type !== 'header-row';
        });

        _this.props.onRowChange(e, {
          selection: _selection
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRowToggle", function (item, selected, e) {
      // REMOVE AT NEXT BREAKING CHANGE
      // `onChange` is deprecated and replaced with `onRowChange`
      if (typeof _this.props.onChange === 'function') {
        var selection;

        if (selected) {
          selection = _this.props.selectRows === 'radio' ? [item] : [].concat(_toConsumableArray(_this.props.selection), [item]);
        } else {
          selection = (0, _lodash2.default)(_this.props.selection, item);
        }

        _this.props.onChange(selection, e);
      } // DEPRECATED CODE ENDS HERE


      if (typeof _this.props.onRowChange === 'function') {
        var _selection2;

        if (selected) {
          _selection2 = _this.props.selectRows === 'radio' ? [item] : [].concat(_toConsumableArray(_this.props.selection), [item]);
        } else {
          _selection2 = (0, _lodash2.default)(_this.props.selection, item);
        }

        _this.props.onRowChange(e, {
          selection: _selection2
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "resizeFixedHeaders", function (event) {
      var headerRefs = [].concat(_this.headerRefs.select, _this.headerRefs.column, _this.headerRefs.action);

      if (_this.props.onFixedHeaderResize) {
        _this.props.onFixedHeaderResize(event, {
          headerRefs: headerRefs,
          scrollerRef: _this.scrollerRef
        });
      } else if (headerRefs.length > 0) {
        var documentScrollLeft = 0;

        if (_executionEnvironment.canUseDOM) {
          documentScrollLeft = document.documentElement.scrollLeft;
        }

        headerRefs.forEach(function (column) {
          if (column && _executionEnvironment.canUseDOM) {
            var columnLeft = column.getBoundingClientRect().left + documentScrollLeft;
            var wrapperLeft = 0;

            if (_this.scrollerRef) {
              wrapperLeft = _this.scrollerRef.getBoundingClientRect().left + documentScrollLeft;
            }

            var cellFixed = column.querySelector('.slds-cell-fixed');

            if (cellFixed) {
              cellFixed.style.left = "".concat(columnLeft - wrapperLeft, "px");
              cellFixed.style.width = "".concat(column.offsetWidth, "px");
            }
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "loadMoreIfNeeded", function () {
      if (_this.props.hasMore && _this.props.onLoadMore) {
        var _this$scrollerRef = _this.scrollerRef,
            scrollTop = _this$scrollerRef.scrollTop,
            offsetHeight = _this$scrollerRef.offsetHeight,
            scrollHeight = _this$scrollerRef.scrollHeight;

        if (scrollTop + offsetHeight > scrollHeight - _this.props.loadMoreOffset) {
          _this.props.onLoadMore();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleFixedHeaderListeners", function (attach) {
      if (_this.props.onToggleFixedHeaderListeners) {
        _this.props.onToggleFixedHeaderListeners({}, {
          attach: attach,
          resizeHandler: _this.resizeFixedHeaders,
          scrollerRef: _this.scrollerRef
        });
      } else {
        var action = ["".concat(attach ? 'add' : 'remove', "EventListener")];

        if (_executionEnvironment.canUseEventListeners) {
          window[action]('resize', _this.resizeFixedHeaders);
          window[action]('resize', _this.loadMoreIfNeeded);
        }

        if (_executionEnvironment.canUseEventListeners && _this.scrollerRef) {
          _this.scrollerRef[action]('scroll', _this.resizeFixedHeaders);

          _this.scrollerRef[action]('scroll', _this.loadMoreIfNeeded);
        }
      }
    });

    _this.generatedId = _shortid.default.generate();
    _this.headerRefs = {
      action: [],
      column: [],
      select: []
    };
    _this.scrollerRef = null; // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    (0, _checkProps.default)(_constants.DATA_TABLE, props, _component.default);
    return _this;
  }

  _createClass(DataTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.fixedHeader) {
        this.toggleFixedHeaderListeners(true);
        this.resizeFixedHeaders();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.fixedHeader) {
        this.resizeFixedHeaders(); // If the first page of results isn't enough to allow the user to scroll it causes
        // the user to get into a state where they cannot load the second page.
        // Simulating a scroll here will ensure that enough rows are loaded to enable scrolling

        this.loadMoreIfNeeded();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleFixedHeaderListeners(false);
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    // ### Render
    value: function render() {
      var _this2 = this;

      var ariaProps = {};
      var numRows = count(this.props.items);
      var numSelected = count(this.props.selection);
      var numNonHeaderRows = count(this.props.items.filter(function (item) {
        return item.type !== 'header-row';
      }));
      var canSelectRows = this.props.selectRows && numNonHeaderRows > 0 ? this.props.selectRows : false;
      var allSelected = canSelectRows && numNonHeaderRows === numSelected;
      var indeterminateSelected = canSelectRows && numNonHeaderRows !== numSelected && numSelected !== 0;
      var columns = [];
      var RowActions = null;

      _react.default.Children.forEach(this.props.children, function (child) {
        if (child && child.type.displayName === _column.default.displayName) {
          var _child$props = child.props,
              children = _child$props.children,
              columnProps = _objectWithoutProperties(_child$props, ["children"]);

          var props = (0, _lodash.default)({}, _this2.props); // eslint-disable-next-line fp/no-delete

          delete props.children;
          (0, _lodash.default)(props, columnProps);
          var Cell;

          if (children && children.type.displayName === _constants.DATA_TABLE_CELL) {
            Cell = children.type;
            (0, _lodash.default)(props, children.props);
          } else {
            Cell = _cell.default;
          } // eslint-disable-next-line fp/no-mutating-methods


          columns.push({
            Cell: Cell,
            props: props,
            dataTableProps: _this2.props
          });
        } else if (child && child.type.displayName === _rowActions.default.displayName) {
          var dropdown = child.props.dropdown;
          var dropdownPropOverrides = {};

          if (_this2.props.fixedHeader) {
            dropdownPropOverrides.menuPosition = 'overflowBoundaryElement';
          }

          RowActions = /*#__PURE__*/_react.default.cloneElement(child, {
            dropdown: dropdown ? /*#__PURE__*/_react.default.cloneElement(dropdown, dropdownPropOverrides) : null
          });
        }
      });

      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      if (this.props.assistiveTextForActionsHeader) {
        assistiveText.actionsHeader = this.props.assistiveTextForActionsHeader;
      }

      if (this.props.assistiveTextForSelectAllRows) {
        assistiveText.selectAllRows = this.props.assistiveTextForSelectAllRows;
      }

      if (this.props.assistiveTextForColumnSortedAscending) {
        assistiveText.columnSortedAscending = this.props.assistiveTextForColumnSortedAscending;
      }

      if (this.props.assistiveTextForColumnSortedDescending) {
        assistiveText.columnSortedDescending = this.props.assistiveTextForColumnSortedDescending;
      }

      if (this.props.assistiveTextForColumnSort) {
        assistiveText.columnSort = this.props.assistiveTextForColumnSort;
      }

      if (this.props.assistiveTextForSelectRow) {
        assistiveText.selectRow = this.props.assistiveTextForSelectRow;
      }

      if (this.props.selectRows && this.props.selectRows !== 'radio') {
        ariaProps['aria-multiselectable'] = 'true';
      } // This guarantees there are never any old header references if props change


      this.headerRefs = {
        action: RowActions ? this.headerRefs.action : [],
        column: this.headerRefs.column.slice(0, columns.length),
        select: canSelectRows ? this.headerRefs.select : []
      };

      var component = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("table", _extends({}, ariaProps, {
        className: (0, _classnames.default)('slds-table', {
          'slds-table_fixed-layout': this.props.fixedLayout,
          'slds-table_header-fixed': this.props.fixedHeader,
          'slds-table_resizable-cols': this.props.fixedLayout,
          'slds-table_bordered': !this.props.unborderedRow,
          'slds-table_cell-buffer': !this.props.fixedLayout && !this.props.unbufferedCell,
          'slds-max-medium-table_stacked': this.props.stacked,
          'slds-max-medium-table_stacked-horizontal': this.props.stackedHorizontal,
          'slds-table_striped': this.props.striped,
          'slds-table_col-bordered': this.props.columnBordered,
          'slds-no-row-hover': this.props.noRowHover
        }, this.props.className),
        id: this.getId(),
        role: this.props.fixedLayout ? 'grid' : null,
        style: this.props.style
      }), /*#__PURE__*/_react.default.createElement(_head.default, {
        assistiveText: assistiveText,
        allSelected: allSelected,
        fixedHeader: this.props.fixedHeader,
        headerRefs: function headerRefs(ref, index) {
          if (index === 'action' || index === 'select') {
            if (ref) {
              _this2.headerRefs[index][0] = ref;
            } else {
              _this2.headerRefs[index] = [];
            }
          } else {
            _this2.headerRefs.column[index] = ref;
          }
        },
        indeterminateSelected: indeterminateSelected,
        canSelectRows: canSelectRows,
        columns: columns,
        id: "".concat(this.getId(), "-").concat(_constants.DATA_TABLE_HEAD),
        onToggleAll: this.handleToggleAll,
        onSort: this.props.onSort,
        showRowActions: !!RowActions
      }), /*#__PURE__*/_react.default.createElement("tbody", null, numRows > 0 ? this.props.items.map(function (item, index) {
        var rowId = _this2.getId() && item.id ? "".concat(_this2.getId(), "-").concat(_constants.DATA_TABLE_ROW, "-").concat(item.id) : _shortid.default.generate();
        return _this2.props.onRenderSubHeadingRow && item.type === 'header-row' ? _this2.props.onRenderSubHeadingRow({
          assistiveText: assistiveText,
          classNameRow: item.classNameRow,
          columns: columns,
          key: rowId,
          id: rowId,
          tableId: _this2.getId(),
          item: item
        }) : /*#__PURE__*/_react.default.createElement(_row.default, {
          assistiveText: assistiveText,
          canSelectRows: canSelectRows,
          className: item.classNameRow,
          columns: columns,
          fixedLayout: _this2.props.fixedLayout,
          id: rowId,
          index: index,
          item: item,
          key: rowId,
          onToggle: _this2.handleRowToggle,
          selection: _this2.props.selection,
          rowActions: RowActions,
          tableId: _this2.getId()
        });
      }) : // Someday this should be an element to render when the table is empty
      null)), this.props.fixedHeader && this.props.hasMore && /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-is-relative slds-p-around_large"
      }, /*#__PURE__*/_react.default.createElement(_spinner.default, {
        assistiveText: {
          label: this.props.assistiveText.loadingMore
        },
        hasContainer: false,
        size: "small",
        variant: "brand"
      })));

      if (this.props.fixedHeader) {
        var border = "1px solid ".concat(_paletteColors.colorGray5);
        var styles = {
          borderTop: border,
          height: '100%'
        };

        if (this.props.joined) {
          styles.borderBottom = border;
          styles.borderLeft = border;
          styles.borderRight = border;
          styles.borderTop = 'none';
          styles.borderRadius = _salesforceSkin.tableBorderRadius;
        }

        component = /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-table_header-fixed_container",
          style: styles,
          onScroll: function onScroll(e) {
            var containerScrollLeft = e.target.scrollLeft;

            if (containerScrollLeft > 0) {
              e.target.scrollLeft = 0;

              if (_this2.scrollerRef) {
                _this2.scrollerRef.scrollLeft = containerScrollLeft;
              }
            }
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-table_header-fixed_scroller",
          ref: function ref(_ref2) {
            _this2.scrollerRef = _ref2;
          },
          style: {
            height: '100%',
            overflow: 'auto'
          }
        }, component));
      }

      return component;
    }
  }]);

  return DataTable;
}(_react.default.Component);

_defineProperty(DataTable, "displayName", _constants.DATA_TABLE);

_defineProperty(DataTable, "propTypes", {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `actionsHeader`: Text for heading of actions column
   * * `columnSort`: Text for sort action on table column header
   * * `columnSortedAscending`: Text announced once a column is sorted in ascending order
   * * `columnSortedDescending`: Text announced once a column is sorted in descending order
   * * `selectAllRows`: Text for select all checkbox within the table header
   * * `selectRow`: Text for select row. Default: "Select row 1"
   * * `selectRowGroup`: This is an input group label and is attached to each checkbox or radio. Default is "Choose a row to select"
   */
  assistiveText: _propTypes.default.shape({
    actionsHeader: _propTypes.default.string,
    columnSort: _propTypes.default.string,
    columnSortedAscending: _propTypes.default.string,
    columnSortedDescending: _propTypes.default.string,
    selectAllRows: _propTypes.default.string,
    selectRow: _propTypes.default.string,
    selectRowGroup: _propTypes.default.string,
    loadingMore: _propTypes.default.string
  }),

  /**
   * Provide children of the type `<DataTableColumn />` to define the structure of the data being represented and children of the type `<DataTableRowActions />` to define a menu which will be rendered for each item in the grid. Use a _higher-order component_ to customize a data table cell that will override the default cell rendering. `CustomDataTableCell` must have the same `displayName` as `DataTableCell` or it will be ignored. If you want complete control of the HTML, including the wrapping `td`, you don't have to use `DataTableCell`.
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
   *   <DataTableCustomCell />
   *   </DataTableColumn>
   *   <DataTableRowActions />
   * </DataTable>
   * ```
   */
  children: _propTypes.default.node,

  /**
   * Class names to be added to the table.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * A variant which adds border to the vertical columns.
   */
  columnBordered: _propTypes.default.bool,

  /**
   * Use this to enable fixed headers and scrolling columns / rows. Appearance / behavior is consistent only if used in combination with `fixedLayout`. Since scrolling is enabled, columns are not truncated unless a width is set. Due to `overflow:hidden` elements, any dialog components will need a separate render tree (portal) such as with `menuPosition: overflowBoundaryElement` in order to break out of the container.
   */
  fixedHeader: _propTypes.default.bool,

  /**
   * Use this if you are creating an advanced table (selectable, sortable, or resizable rows). Columns widths will be truncate based on width and DOM ancestors. See `fixedHeader` to enable horizontal and vertical scrolling.
   */
  fixedLayout: _propTypes.default.bool,

  /**
   * When fixedHeader is true, specifies whether there's more data to be loaded and displays a spinner at the bottom of the table if so.
   */
  hasMore: _propTypes.default.bool,

  /**
   * A render prop for subheadings to describe what the next section of the table is about. This is often a heirarchical data structure and semantic heading levels should be used, but not visually differ. This is not a `role=rowheader` which provides a heading for a row. Basic sorting of columns is not recommended, since this pattern assumes top level groupings. Headings should be visually aligned with selection column when selection pattern is present, so not to be grouped with the previous row.
     * ```
     * const CustomHeaderRow = ({ columns, item } ) => (
     *	<tr>
     *    <th id={item.id} colSpan={columns.length+1} scope="colgroup">
     *      <p role="heading" aria-level={item.ariaLevel}>
     *        {item.heading}
     *      </p>
     *    </th>
     *  </tr>);
     *CustomHeaderRow.displayName = DataTableCell.displayName;
     *
     * <DataTable items=[{
        type: 'header-row',
        id: 'header-row-example-id-3',
        heading: 'Argentina > Autonomous City of Buenos Aires > Belgrano',
        ariaLevel: 3,
     * }],
     * />
     * ```
   */
  onRenderSubHeadingRow: _propTypes.default.func,

  /**
   * A unique ID is needed in order to support keyboard navigation and ARIA support.
   */
  id: _propTypes.default.string,

  /**
   * The collection of items to render in the table. This is an array of objects with each object having keys that correspond with the  `property` prop of each `DataTableColumn`.
   *
   * Use the key `classNameRow` to add a custom class to the item's `<tr>` element.
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    classNameRow: _propTypes.default.string
  })).isRequired,

  /**
   * Makes DataTable joinable with PageHeader by adding appropriate classes/styling
   */
  joined: _propTypes.default.bool,

  /**
   * Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table.
   */
  loadMoreOffset: _propTypes.default.number,

  /**
   * A variant which removes hover style on rows
   */
  noRowHover: _propTypes.default.bool,

  /**
   * By default this function resizes the display headers when fixedHeader is `true`, but this behavior can be overridden. Passes an event and a data object with properties `headerRefs`, an array of DOM nodes referencing the `thead th` elements and `scrollerRef`, a DOM node referencing `.slds-table_header-fixed_scroller`
   */
  onFixedHeaderResize: _propTypes.default.func,

  /**
   * This function fires when infinite loading loads more data.
   *
   * This will be called multiple times while the table is being scrolled within the `loadMoreOffset`. It'll also continue to be called while `hasMore` is `true` and the table has not yet loaded enough rows to allow a user to scroll.  Please track whether or not loading is in progress and check it at the start of this function to avoid executing your callback too many times.
   */
  onLoadMore: _propTypes.default.func,

  /**
   * This function fires when the selection of rows changes. This component passes in `event, { selection }` to the function. `selection` is an array of objects from the `items` prop.
   *
   * This used to be `onChange` which is deprecated now, so that the parameters can be consistent with other components. `onChange` passed in the selection first and the event wtihout a data object.
   */
  onRowChange: _propTypes.default.func,

  /**
   * This function fires when the table should be sorted.
   */
  onSort: _propTypes.default.func,

  /**
   * By default this function attaches/detaches listeners for window resize and tbody scrolling when fixedHeader is `true`, but this behavior can be overridden. Passes an event and a data object with an `attach` boolean property to determine whether listeners should be attached, a `resizeHandler` function property that can be called as-needed, and a `scrollerRef` DOM node property that serves as a reference to `.slds-table_header-fixed_scroller`
   */
  onToggleFixedHeaderListeners: _propTypes.default.func,

  /**
   * An array of objects of selected rows. See `items` prop for shape of objects.
   */
  selection: _propTypes.default.array,

  /**
   * Specifies a row selection UX pattern.
   * * `checkbox`: Multiple row selection.
   * * `radio`: _Required_ single row selection.
   * _This prop used to be a `boolean`, a `true` value will be considered `checkbox` for backwards compatibility._
   */
  selectRows: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['checkbox', 'radio'])]),

  /**
   * A variant which modifies table layout by stacking cells to accommodate smaller viewports. Should not be used at the same time as `stackedHorizontal`.
   */
  stacked: _propTypes.default.bool,

  /**
   * A variant which modifies table layout by displaying the header and row data side by side for smaller viewports. Should not be used at the same time as `stacked`.
   */
  stackedHorizontal: _propTypes.default.bool,

  /**
   * A variant which adds stripes to alternating rows.
   */
  striped: _propTypes.default.bool,

  /**
   * Custom styles to be passed to the table.
   * NOTE: for horizontal scrolling in `fixedHeader`-enabled DataTables, apply a `minWidth` style here. If the containing element width is less than the `minWidth` value, horizontal scrolling will occur
   */
  style: _propTypes.default.object,

  /**
   * Tables have horizontal borders by default. This removes them.
   */
  unborderedRow: _propTypes.default.bool,

  /**
   * A variant which removes horizontal padding. CSS class will be removed if `fixedLayout==true`.
   */
  unbufferedCell: _propTypes.default.bool
});

_defineProperty(DataTable, "defaultProps", defaultProps);

var _default = DataTable;
exports.default = _default;