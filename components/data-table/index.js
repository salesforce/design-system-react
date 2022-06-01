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

var _lodash2 = _interopRequireDefault(require("lodash.isequal"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _lodash3 = _interopRequireDefault(require("lodash.reject"));

var _columnResizer = _interopRequireDefault(require("column-resizer"));

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

var _tableContext = _interopRequireDefault(require("./private/table-context"));

var _mode = _interopRequireDefault(require("./private/mode"));

var _spinner = _interopRequireDefault(require("../spinner"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _keyCallbacks = _interopRequireDefault(require("../../utilities/key-callbacks"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  loadMoreOffset: 20,
  resizable: false,
  resizableOptions: {
    resizeMode: 'fit',
    draggingClass: 'slds-table-column-resizer'
  }
};
var getAssistiveText = (0, _memoizeOne.default)(function (assistiveText, actionsHeaderText, columnSortText, columnSortedAscendingText, columnSortedDescendingText, selectAllRowsText, selectRowText) {
  var result = _objectSpread(_objectSpread({}, defaultProps.assistiveText), assistiveText);

  if (actionsHeaderText) {
    result.actionsHeader = actionsHeaderText;
  }

  if (selectAllRowsText) {
    result.selectAllRows = selectAllRowsText;
  }

  if (columnSortedAscendingText) {
    result.columnSortedAscending = columnSortedAscendingText;
  }

  if (columnSortedDescendingText) {
    result.columnSortedDescending = columnSortedDescendingText;
  }

  if (columnSortText) {
    result.columnSort = columnSortText;
  }

  if (selectRowText) {
    result.selectRow = selectRowText;
  }

  return result;
}, _lodash2.default);
var getColumnsAndRowActions = (0, _memoizeOne.default)(function (children, id, fixedHeader, fixedLayout, items, search) {
  var columns = [];
  var RowActions = null;

  _react.default.Children.forEach(children, function (child) {
    if (child && child.type.displayName === _column.default.displayName) {
      var _child$props = child.props,
          columnChildren = _child$props.children,
          columnProps = _objectWithoutProperties(_child$props, ["children"]);

      var props = _objectSpread({
        fixedLayout: fixedLayout,
        search: search,
        items: items
      }, columnProps);

      if (id) {
        props.id = id;
      }

      var Cell;

      if (columnChildren && columnChildren.type.displayName === _constants.DATA_TABLE_CELL) {
        Cell = columnChildren.type;
        (0, _lodash.default)(props, columnChildren.props);
      } else {
        Cell = _cell.default;
      } // eslint-disable-next-line fp/no-mutating-methods


      columns.push({
        Cell: Cell,
        props: props
      });
    } else if (child && child.type.displayName === _rowActions.default.displayName) {
      var dropdown = child.props.dropdown;
      var dropdownPropOverrides = {};

      if (fixedHeader) {
        dropdownPropOverrides.menuPosition = 'overflowBoundaryElement';
      }

      RowActions = /*#__PURE__*/_react.default.cloneElement(child, {
        dropdown: dropdown ? /*#__PURE__*/_react.default.cloneElement(dropdown, dropdownPropOverrides) : null
      });
    }
  });

  return {
    columns: columns,
    RowActions: RowActions
  };
}, _lodash2.default);
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

    _defineProperty(_assertThisInitialized(_this), "getTableContext", (0, _memoizeOne.default)(function (state, isKeyboardNavigation) {
      return {
        activeCell: state.activeCell,
        activeElement: state.activeElement,
        mode: state.mode,
        tableHasFocus: state.tableHasFocus,
        changeActiveCell: _this.changeActiveCell,
        changeActiveElement: _this.changeActiveElement,
        handleKeyDown: _this.handleKeyDown,
        registerInteractiveElement: _this.registerInteractiveElement,
        allowKeyboardNavigation: state.allowKeyboardNavigation,
        setAllowKeyboardNavigation: function setAllowKeyboardNavigation(allowKeyboardNavigation) {
          if (isKeyboardNavigation) {
            _this.setState({
              allowKeyboardNavigation: allowKeyboardNavigation
            });
          }
        }
      };
    }));

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
          selection = (0, _lodash3.default)(_this.props.selection, item);
        }

        _this.props.onChange(selection, e);
      } // DEPRECATED CODE ENDS HERE


      if (typeof _this.props.onRowChange === 'function') {
        var _selection2;

        if (selected) {
          _selection2 = _this.props.selectRows === 'radio' ? [item] : [].concat(_toConsumableArray(_this.props.selection), [item]);
        } else {
          _selection2 = (0, _lodash3.default)(_this.props.selection, item);
        }

        _this.props.onRowChange(e, {
          selection: _selection2
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "repositionResizers", function () {
      var headers = [].concat(_this.headerRefs.select, _this.headerRefs.column, _this.headerRefs.action);

      if (_this.gripRefs && _this.tableRef) {
        var tableOffset = _this.tableRef.getBoundingClientRect();

        _this.gripRefs.forEach(function (grip, index) {
          var header = headers[index].getBoundingClientRect();
          var relativeOffset = header.left - tableOffset.left;
          var newPosition = relativeOffset + header.width; // eslint-disable-next-line no-param-reassign

          grip.style.left = "".concat(newPosition, "px");
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

          _this.scrollerRef[action]('scroll', _this.repositionResizers);
        }
      }
    });

    _this.generatedId = _shortid.default.generate();
    _this.headerRefs = {
      action: [],
      column: [],
      select: []
    };
    _this.gripRefs = [];
    _this.scrollerRef = null;
    _this.fixedHeaderContainer = {};
    _this.state = {
      // Currently selected cell
      activeCell: {
        rowIndex: 1,
        columnIndex: _this.props.selectRows ? 1 : 0
      },
      // Interactive element within a cell that receives focus when in actionable mode
      activeElement: null,
      // The table can be in navigation or actionable mode
      mode: _mode.default.NAVIGATION,
      // The table currently has focus
      tableHasFocus: false,
      // Allows for keyboard navigation. This is useful for temporarily disabling keyboard navigation
      // when another component requires its own focus behavior (e.g. menu dropdown).
      allowKeyboardNavigation: props.keyboardNavigation
    }; // Map of cells to interactive elements within that cell

    _this.interactiveElements = {};
    _this.changeActiveCell = _this.changeActiveCell.bind(_assertThisInitialized(_this));
    _this.changeActiveElement = _this.changeActiveElement.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.registerInteractiveElement = _this.registerInteractiveElement.bind(_assertThisInitialized(_this)); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    (0, _checkProps.default)(_constants.DATA_TABLE, props, _component.default);
    return _this;
  }

  _createClass(DataTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.getFixedHeader()) {
        this.toggleFixedHeaderListeners(true);
        this.resizeFixedHeaders();
      }

      if (this.isResizable()) {
        this.enableResize();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.getFixedHeader()) {
        this.resizeFixedHeaders(); // If the first page of results isn't enough to allow the user to scroll it causes
        // the user to get into a state where they cannot load the second page.
        // Simulating a scroll here will ensure that enough rows are loaded to enable scrolling

        this.loadMoreIfNeeded();
      }

      if (this.state.allowKeyboardNavigation && !prevState.allowKeyboardNavigation) {
        // When re-enabling keyboard navigation (e.g. when a dropdown closes), mark that
        // focus has returned to the table. This must wait until after `allowKeyboardNavigation`
        // is set in `onClose` because the callback could focus the incorrect element (e.g. dropdown
        // trigger) when it executes.
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          tableHasFocus: true
        });
      }

      if (this.isResizable()) {
        this.enableResize();
      } else if (this.resizer) {
        this.disableResize();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleFixedHeaderListeners(false);

      if (this.isResizable()) {
        this.disableResize();
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var table = this.tableRef;

      if (table) {
        var columns = this.getFixedHeader() ? table.getElementsByClassName('slds-cell-fixed') : table.getElementsByTagName('th');
        var columnsWidths = Array.from(columns).map(function (_ref2, index) {
          var id = _ref2.id,
              style = _ref2.style;
          return {
            id: id,
            index: index,
            width: parseInt(style.width, 10)
          };
        });
        return columnsWidths;
      }

      return [];
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getFixedHeader",
    value: function getFixedHeader() {
      return this.props.fixedHeader || this.props.resizable;
    }
  }, {
    key: "getKeyboardNavigation",
    value: function getKeyboardNavigation() {
      return this.props.keyboardNavigation || this.props.resizable;
    }
  }, {
    key: "getFixedLayout",
    value: function getFixedLayout() {
      return this.props.fixedLayout || this.props.resizable;
    }
  }, {
    key: "getFirstInteractiveElement",
    value: function getFirstInteractiveElement(rowIndex, columnIndex) {
      if (this.state.mode === _mode.default.ACTIONABLE && this.interactiveElements[rowIndex] && this.interactiveElements[rowIndex][columnIndex]) {
        return this.interactiveElements[rowIndex][columnIndex][0];
      }

      return null;
    }
  }, {
    key: "UNSAFE_componentWillUpdate",
    value: // eslint-disable-next-line camelcase
    function UNSAFE_componentWillUpdate(nextProps) {
      if (this.props.items !== nextProps.items) {
        this.interactiveElements = {};
      }
    }
  }, {
    key: "isResizable",
    value: function isResizable() {
      return this.props.fixedLayout && this.props.resizable;
    }
  }, {
    key: "resizeGrips",
    value: function resizeGrips() {
      var table = this.fixedHeaderContainer;

      if (table) {
        var grips = Array.from(table.getElementsByClassName('grip-handle'));

        if (grips.length) {
          this.gripRefs = grips;
          this.gripRefs.forEach(function (grip) {
            // eslint-disable-next-line no-param-reassign
            grip.style.height = "".concat(parseInt(grip.style.height, 10) + 33, "px");
          });
        }
      }
    }
  }, {
    key: "enableResize",
    value: function enableResize() {
      var _this2 = this;

      if (_executionEnvironment.canUseDOM) {
        var remoteTable = this.tableRef;
        var fixedHeader = this.getFixedHeader();
        var disabledColumns = [];

        if (this.props.selectRows) {
          // eslint-disable-next-line fp/no-mutating-methods
          disabledColumns.push(0);
        }

        if (!this.resizer) {
          var options = _objectSpread(_objectSpread(_objectSpread({}, defaultProps.resizableOptions), {
            disabledColumns: disabledColumns
          }), this.props.resizableOptions);

          var externalFunction = this.props.resizableOptions.onResize;

          options.onResize = function (e) {
            if (fixedHeader) {
              _this2.resizeFixedHeaders(e);

              _this2.repositionResizers();
            }

            var response = _this2.onResize();

            if (externalFunction) externalFunction(response);

            _this2.resizeGrips();
          };

          if (remoteTable) {
            this.resizer = new _columnResizer.default(remoteTable, options);
            remoteTable.classList.remove('grip-padding');
            if (fixedHeader) this.resizeFixedHeaders();
            this.resizeGrips();
            this.repositionResizers();
          }

          this.setState({}, function () {
            return _this2.state;
          });
        }
      }
    }
  }, {
    key: "disableResize",
    value: function disableResize() {
      if (this.resizer) this.resizer.reset({
        disable: true
      });
      this.gripRefs = [];
    }
  }, {
    key: "changeActiveCell",
    value: function changeActiveCell(rowIndex, columnIndex) {
      this.setState({
        tableHasFocus: true,
        activeCell: {
          rowIndex: rowIndex,
          columnIndex: columnIndex
        }
      });
    }
  }, {
    key: "changeActiveElement",
    value: function changeActiveElement(activeElement) {
      this.setState({
        activeElement: activeElement,
        mode: _mode.default.ACTIONABLE
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      var _this3 = this,
          _callbacks;

      (0, _keyCallbacks.default)(event, {
        callbacks: (_callbacks = {}, _defineProperty(_callbacks, _keyCode.default.UP, {
          callback: function callback(evt) {
            return _this3.handleKeyDownUp(evt);
          }
        }), _defineProperty(_callbacks, _keyCode.default.DOWN, {
          callback: function callback(evt) {
            return _this3.handleKeyDownDown(evt);
          }
        }), _defineProperty(_callbacks, _keyCode.default.LEFT, {
          callback: function callback(evt) {
            return _this3.handleKeyDownLeft(evt);
          }
        }), _defineProperty(_callbacks, _keyCode.default.RIGHT, {
          callback: function callback(evt) {
            return _this3.handleKeyDownRight(evt);
          }
        }), _defineProperty(_callbacks, _keyCode.default.ENTER, {
          callback: function callback(evt) {
            return _this3.handleKeyDownEnter(evt);
          }
        }), _defineProperty(_callbacks, _keyCode.default.ESCAPE, {
          callback: function callback(evt) {
            return _this3.handleKeyDownEscape(evt);
          }
        }), _defineProperty(_callbacks, _keyCode.default.TAB, this.state.mode === _mode.default.ACTIONABLE ? {
          callback: function callback(evt) {
            return _this3.handleKeyTabPress(evt);
          }
        } : null), _callbacks)
      });
    }
  }, {
    key: "handleKeyDownUp",
    value: function handleKeyDownUp() {
      if (this.state.mode === _mode.default.NAVIGATION || this.state.activeCell.rowIndex > 0 || !this.isResizable()) {
        var newRowIndex = Math.max(this.state.activeCell.rowIndex - 1, 0);
        var activeElement = this.getFirstInteractiveElement(newRowIndex, this.state.activeCell.columnIndex);

        if (newRowIndex !== this.state.activeCell.rowIndex) {
          this.setState(function (prevState) {
            return {
              activeCell: {
                rowIndex: newRowIndex,
                columnIndex: prevState.activeCell.columnIndex
              },
              activeElement: activeElement
            };
          });

          if (this.state.mode === _mode.default.ACTIONABLE && newRowIndex === 0 && !activeElement) {
            this.makeGripVisible(this.state.activeCell.columnIndex);
          }
        }
      }
    }
  }, {
    key: "handleKeyDownDown",
    value: function handleKeyDownDown() {
      if (this.state.mode === _mode.default.NAVIGATION || this.state.activeCell.rowIndex > 0 || !this.isResizable()) {
        var newRowIndex = Math.min(this.state.activeCell.rowIndex + 1, this.props.items.length);
        var activeElement = this.getFirstInteractiveElement(newRowIndex, this.state.activeCell.columnIndex);

        if (newRowIndex !== this.state.activeCell.rowIndex) {
          this.setState(function (prevState) {
            return {
              activeCell: {
                rowIndex: newRowIndex,
                columnIndex: prevState.activeCell.columnIndex
              },
              activeElement: activeElement
            };
          });
        }
      }
    }
  }, {
    key: "displaceByArrowKey",
    value: function displaceByArrowKey(factor) {
      if (this.state.mode === _mode.default.ACTIONABLE) {
        var _this$state$activeCel = this.state.activeCell,
            rowIndex = _this$state$activeCel.rowIndex,
            columnIndex = _this$state$activeCel.columnIndex;

        if (rowIndex === 0) {
          var table = this.tableRef;
          var headers = table.getElementsByTagName('th');
          headers[columnIndex].style.width = "".concat(parseInt(headers[columnIndex].style.width, 10) + factor, "px");
          this.resizeFixedHeaders();
          this.repositionResizers();
          this.resizeGrips();
        }
      }
    }
  }, {
    key: "makeGripVisible",
    value: function makeGripVisible(newIndex) {
      this.gripRefs.forEach(function (grip, index) {
        if (index === newIndex) grip.classList.add('grip-handle-active');else grip.classList.remove('grip-handle-active');
      });
    }
  }, {
    key: "handleKeyDownLeft",
    value: function handleKeyDownLeft() {
      if (this.state.mode === _mode.default.NAVIGATION || this.state.activeCell.rowIndex > 0 || !this.isResizable()) {
        var newColumnIndex = Math.max(this.state.activeCell.columnIndex - 1, 0);
        var activeElement = this.getFirstInteractiveElement(this.state.activeCell.rowIndex, newColumnIndex);

        if (newColumnIndex !== this.state.activeCell.columnIndex) {
          this.setState(function (prevState) {
            return {
              activeCell: {
                rowIndex: prevState.activeCell.rowIndex,
                columnIndex: newColumnIndex
              },
              activeElement: activeElement
            };
          });
        }
      } else {
        this.displaceByArrowKey(-10);
      }
    }
  }, {
    key: "handleKeyDownRight",
    value: function handleKeyDownRight() {
      if (this.state.mode === _mode.default.NAVIGATION || this.state.activeCell.rowIndex > 0 || !this.isResizable()) {
        var newColumnIndex = Math.min(this.state.activeCell.columnIndex + 1, this.props.children.length - (this.props.selectRows ? 0 : 1));
        var activeElement = this.getFirstInteractiveElement(this.state.activeCell.rowIndex, newColumnIndex);

        if (newColumnIndex !== this.state.activeCell.columnIndex) {
          this.setState(function (prevState) {
            return {
              activeCell: {
                rowIndex: prevState.activeCell.rowIndex,
                columnIndex: newColumnIndex
              },
              activeElement: activeElement
            };
          });
        }
      } else {
        this.displaceByArrowKey(10);
      }
    }
  }, {
    key: "handleKeyDownEnter",
    value: function handleKeyDownEnter() {
      if (this.state.mode === _mode.default.NAVIGATION) {
        var _this$state$activeCel2 = this.state.activeCell,
            rowIndex = _this$state$activeCel2.rowIndex,
            columnIndex = _this$state$activeCel2.columnIndex;
        var activeElement = null;

        if (this.interactiveElements[rowIndex] && this.interactiveElements[rowIndex][columnIndex]) {
          var _this$interactiveElem = _slicedToArray(this.interactiveElements[rowIndex][columnIndex], 1);

          activeElement = _this$interactiveElem[0];
        }

        this.setState({
          mode: _mode.default.ACTIONABLE,
          activeElement: activeElement
        });

        if (rowIndex === 0 && !activeElement) {
          this.makeGripVisible(columnIndex);
        }
      }
    }
  }, {
    key: "handleKeyDownEscape",
    value: function handleKeyDownEscape() {
      if (this.state.mode === _mode.default.ACTIONABLE) {
        this.setState({
          mode: _mode.default.NAVIGATION,
          activeElement: null
        });
        this.makeGripVisible(null);
      }
    }
  }, {
    key: "moveNext",
    value: function moveNext(event, rowIndex, columnIndex) {
      var headers = [].concat(this.headerRefs.select, this.headerRefs.column, this.headerRefs.action);
      var newRowIndex = 0;
      var newColumnIndex = 0;

      if (event.shiftKey) {
        if (columnIndex - 1 >= 0) {
          newColumnIndex = columnIndex - 1;
          newRowIndex = rowIndex;
        } else {
          if (rowIndex > 0) newRowIndex = rowIndex - 1;else newRowIndex = this.props.items.length;
          newColumnIndex = headers.length - 1;
        }
      } else if (columnIndex + 1 < headers.length) {
        newColumnIndex = columnIndex + 1;
        newRowIndex = rowIndex;
      } else {
        if (rowIndex < this.props.items.length) newRowIndex = rowIndex + 1;else newRowIndex = 0;
        newColumnIndex = 0;
      }

      this.changeActiveCell(newRowIndex, newColumnIndex);
    }
  }, {
    key: "handleNextActionable",
    value: function handleNextActionable(event) {
      var _this$state$activeCel3 = this.state.activeCell,
          rowIndex = _this$state$activeCel3.rowIndex,
          columnIndex = _this$state$activeCel3.columnIndex;
      var currentActiveElement = this.state.activeElement;
      var rowActiveElements = this.interactiveElements[rowIndex] && this.interactiveElements[rowIndex][columnIndex] ? this.interactiveElements[rowIndex][columnIndex] : null;

      if (rowActiveElements) {
        if (currentActiveElement) {
          var index = rowActiveElements.indexOf(currentActiveElement);

          if (event.shiftKey) {
            return index > 0 ? rowActiveElements[index - 1] : null;
          }

          return index < rowActiveElements.length - 1 ? rowActiveElements[index + 1] : null;
        }

        return !event.shiftKey ? rowActiveElements[0] : rowActiveElements[rowActiveElements.length - 1];
      }

      return null;
    }
  }, {
    key: "handleKeyTabPress",
    value: function handleKeyTabPress(event) {
      var _this$state$activeCel4 = this.state.activeCell,
          rowIndex = _this$state$activeCel4.rowIndex,
          columnIndex = _this$state$activeCel4.columnIndex;

      if (this.state.mode === _mode.default.ACTIONABLE) {
        var nextActionable = this.handleNextActionable(event);

        if (nextActionable) {
          this.setState({
            activeElement: nextActionable
          });
          if (this.isResizable()) this.makeGripVisible(null);
        } else if (rowIndex === 0) {
          var headers = [].concat(this.headerRefs.select, this.headerRefs.column, this.headerRefs.action);
          var newIndex = 0;
          if (!event.shiftKey) newIndex = columnIndex + 1 < headers.length ? columnIndex + 1 : 0;else newIndex = columnIndex - 1 >= 0 ? columnIndex - 1 : headers.length - 1;
          this.setState({
            mode: _mode.default.ACTIONABLE,
            activeElement: null
          }); // eslint-disable-next-line no-param-reassign

          headers.forEach(function (header, index) {
            if (index === newIndex) {
              // eslint-disable-next-line no-param-reassign
              header.tabIndex = 0; // eslint-disable-next-line no-param-reassign

              header.focus(); // eslint-disable-next-line no-param-reassign
            } else header.tabIndex = -1;
          });
          if (this.isResizable()) this.makeGripVisible(newIndex);
        } else {
          this.moveNext(event, rowIndex, columnIndex);
          this.setState({
            mode: _mode.default.ACTIONABLE,
            activeElement: null
          });
        }
      }
    }
  }, {
    key: "registerInteractiveElement",
    value: function registerInteractiveElement(rowIndex, columnIndex, elementId) {
      if (!this.interactiveElements[rowIndex]) {
        this.interactiveElements[rowIndex] = {};
      }

      var existingElements = this.interactiveElements[rowIndex][columnIndex] || [];

      if (!existingElements.includes(elementId)) {
        this.interactiveElements[rowIndex][columnIndex] = [].concat(_toConsumableArray(existingElements), [elementId]);
      }
    } // ### Render

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var ariaProps = {};
      var numHeaderRows = 1;
      var numRows = count(this.props.items);
      var numSelected = count(this.props.selection);
      var numNonHeaderRows = count(this.props.items.filter(function (item) {
        return item.type !== 'header-row';
      }));
      var canSelectRows = this.props.selectRows && numNonHeaderRows > 0 ? this.props.selectRows : false;
      var allSelected = canSelectRows && numNonHeaderRows === numSelected;
      var indeterminateSelected = canSelectRows && numNonHeaderRows !== numSelected && numSelected !== 0;

      var _getColumnsAndRowActi = getColumnsAndRowActions(this.props.children, this.props.id, this.getFixedHeader(), this.props.fixedLayout, this.props.items, this.props.search),
          columns = _getColumnsAndRowActi.columns,
          RowActions = _getColumnsAndRowActi.RowActions;

      var assistiveText = getAssistiveText(this.props.assistiveText, this.props.assistiveTextForActionsHeader, this.props.assistiveTextForSelectAllRows, this.props.assistiveTextForColumnSortedAscending, this.props.assistiveTextForColumnSortedDescending, this.props.assistiveTextForColumnSort, this.props.assistiveTextForSelectRow);

      if (this.props.selectRows && this.props.selectRows !== 'radio') {
        ariaProps['aria-multiselectable'] = 'true';
      } // This guarantees there are never any old header references if props change


      this.headerRefs = {
        action: RowActions ? this.headerRefs.action : [],
        column: this.headerRefs.column.slice(0, columns.length),
        select: canSelectRows ? this.headerRefs.select : []
      };

      var component = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_tableContext.default.Provider, {
        value: this.getTableContext(this.state, this.getKeyboardNavigation())
      }, /*#__PURE__*/_react.default.createElement("table", _extends({}, ariaProps, {
        className: (0, _classnames.default)('slds-table', {
          'slds-table_fixed-layout': this.getFixedLayout(),
          'slds-table_header-fixed': this.getFixedHeader(),
          'slds-table_resizable-cols': this.getFixedLayout(),
          'slds-table_bordered': !this.props.unborderedRow,
          'slds-table_cell-buffer': !this.getFixedLayout() && !this.props.unbufferedCell,
          'slds-max-medium-table_stacked': this.props.stacked,
          'slds-max-medium-table_stacked-horizontal': this.props.stackedHorizontal,
          'slds-table_striped': this.props.striped,
          'slds-table_col-bordered': this.props.columnBordered,
          'slds-no-row-hover': this.props.noRowHover,
          'slds-table_header-hidden': this.props.isHeadless
        }, this.props.className),
        id: this.getId(),
        ref: function ref(node) {
          if (node) {
            _this4.tableRef = node;
          }
        },
        role: this.getFixedLayout() ? 'grid' : null,
        onBlur: function onBlur(event) {
          if (_this4.tableRef && !_this4.tableRef.contains(event.relatedTarget)) {
            _this4.setState({
              tableHasFocus: false,
              mode: _mode.default.NAVIGATION,
              activeElement: null
            });

            _this4.makeGripVisible(null);
          }
        },
        style: this.props.style
      }), /*#__PURE__*/_react.default.createElement(_head.default, {
        assistiveText: assistiveText,
        allSelected: allSelected,
        fixedHeader: this.getFixedHeader(),
        fixedLayout: this.getFixedLayout(),
        headerRefs: function headerRefs(ref, index) {
          if (index === 'action' || index === 'select') {
            if (ref) {
              _this4.headerRefs[index][0] = ref;
            } else {
              _this4.headerRefs[index] = [];
            }
          } else {
            _this4.headerRefs.column[index] = ref;
          }
        },
        isHidden: this.props.isHeadless,
        indeterminateSelected: indeterminateSelected,
        canSelectRows: canSelectRows,
        columns: columns,
        id: "".concat(this.getId(), "-").concat(_constants.DATA_TABLE_HEAD),
        onToggleAll: this.handleToggleAll,
        onSort: this.props.onSort,
        showRowActions: !!RowActions
      }), /*#__PURE__*/_react.default.createElement("tbody", null, numRows > 0 ? this.props.items.map(function (item, index) {
        var rowId = _this4.getId() && item.id ? "".concat(_this4.getId(), "-").concat(_constants.DATA_TABLE_ROW, "-").concat(item.id) : _shortid.default.generate();
        return _this4.props.onRenderSubHeadingRow && item.type === 'header-row' ? _this4.props.onRenderSubHeadingRow({
          assistiveText: assistiveText,
          classNameRow: item.classNameRow,
          columns: columns,
          key: rowId,
          id: rowId,
          tableId: _this4.getId(),
          item: item
        }) : /*#__PURE__*/_react.default.createElement(_row.default, {
          assistiveText: assistiveText,
          canSelectRows: canSelectRows,
          className: item.classNameRow,
          columns: columns,
          fixedLayout: _this4.getFixedLayout(),
          id: rowId,
          index: index,
          item: item,
          key: rowId,
          onToggle: _this4.handleRowToggle,
          selection: _this4.props.selection,
          rowActions: RowActions,
          tableId: _this4.getId(),
          rowIndex: index + numHeaderRows
        });
      }) : // Someday this should be an element to render when the table is empty
      null))), this.getFixedHeader() && this.props.hasMore && /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-is-relative slds-p-around_large"
      }, /*#__PURE__*/_react.default.createElement(_spinner.default, {
        assistiveText: {
          label: this.props.assistiveText.loadingMore
        },
        hasContainer: false,
        size: "small",
        variant: "brand"
      })));

      if (this.getFixedHeader()) {
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

        var fixedScrollerStyle = {
          height: '100%'
        };

        if (this.props.resizable) {
          fixedScrollerStyle.overflowY = 'auto';
          fixedScrollerStyle.overflowX = 'hidden';
        } else {
          fixedScrollerStyle.overflow = 'auto';
        }

        component = /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-table_header-fixed_container",
          ref: function ref(_ref4) {
            _this4.fixedHeaderContainer = _ref4;
          },
          style: styles,
          onScroll: function onScroll(e) {
            var containerScrollLeft = e.target.scrollLeft;

            if (containerScrollLeft > 0) {
              e.target.scrollLeft = 0;

              if (_this4.scrollerRef) {
                _this4.scrollerRef.scrollLeft = containerScrollLeft;
              }
            }
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-table_header-fixed_scroller",
          ref: function ref(_ref3) {
            _this4.scrollerRef = _ref3;
          },
          style: fixedScrollerStyle
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
   *
   * When `keyboardNavigation` is enabled, the advanced table implements keyboard navigation as described in [Data Tables](https://www.lightningdesignsystem.com/components/data-tables/).
   * Wrap interactive elements in the table with `<DataTableInteractiveElement>` so that it can control the element's focus and `tabIndex` behavior:
   * ```
   * const InteractiveButton = DataTableInteractiveElement(Button);
   * const InteractiveCheckBox = DataTableInteractiveElement(Checkbox);
   * const CustomDataTableCell = () => (
   * 	<DataTableCell>
   * 		<InteractiveCheckBox />
   * 		<InteractiveButton />
   * 	</DataTableCell>
   * );
   * ```
   * The wrapped element must accept the props:
   *  * `onFocus`: Callback for when the element is focused.
   *  * `onRequestFocus`: Trigger to indicate that this element should be focused.
   *  * `requestFocus`: This wrapper overrides the `requestFocus` prop and provides its own value.
   *  * `tabIndex`: This wrapper overrides the `tabIndex` prop and provides its own value.
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
   * Removes the header from the data table. Tested with snapshot testing
   */
  isHeadless: _propTypes.default.bool,

  /**
   * Makes DataTable joinable with PageHeader by adding appropriate classes/styling
   */
  joined: _propTypes.default.bool,

  /**
   * Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table.
   */
  loadMoreOffset: _propTypes.default.number,

  /**
   * Enables keyboard navigation when this is an advanced table.
   */
  keyboardNavigation: _propTypes.default.bool,

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
  unbufferedCell: _propTypes.default.bool,

  /**
   * A variant which allows column dividers to be grabbed with the mouse. This feature needs
   * `@salesforce/design-system-react/assets/styles/table.css` to be loaded. This prop is in prototype` state. a) It may change within a minor release. (b) Web Content Accessibility Guidelines may not be met. (c) CSS imports may be required.
   */
  resizable: _propTypes.default.bool,

  /**
   * Object with properties to be used in case of resizable: true
   *
   * resizeMode: It is used to set how the resize method works. Those are the possible values: 'fit', 'flex' and 'overflow'
   * onResize: Callback function to be fired when the user has ended dragging a column
   * `@salesforce/design-system-react/assets/styles/table.css` to be loaded. This prop is in prototype` state. a) It may change within a minor release. (b) Web Content Accessibility Guidelines may not be met. (c) CSS imports may be required.
   */
  resizableOptions: _propTypes.default.object
});

_defineProperty(DataTable, "defaultProps", defaultProps);

var _default = DataTable;
exports.default = _default;