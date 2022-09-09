"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SORT_OPTIONS = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _constants = require("../../utilities/constants");

var _icon = _interopRequireDefault(require("../icon"));

var _listItemContent = _interopRequireDefault(require("./private/list-item-content"));

var _listItemWithContent = _interopRequireDefault(require("./private/list-item-with-content"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SORT_OPTIONS = Object.freeze({
  UP: 'up',
  DOWN: 'down'
});
exports.SORT_OPTIONS = SORT_OPTIONS;
var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `list`: aria label for the list
   * * `sort`
   *    * `sortedBy`: Clickable sort header for the list.
   *    * `descending`: Descending sorting.
   *    * `ascending`: Ascending sorting.
   */
  assistiveText: _propTypes.default.shape({
    list: _propTypes.default.string,
    sort: _propTypes.default.shape({
      sortedBy: _propTypes.default.string,
      descending: _propTypes.default.string,
      ascending: _propTypes.default.string
    }),
    unreadItem: _propTypes.default.string
  }),

  /**
   * CSS classes to be added to the parent `div` tag.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Event Callbacks
   * * `onSelect`: Called when a list item is selected. Previously, this event was called when an item was focused. The UX pattern has changed and this event is now called on pressing enter or mouse click.
   *    * event {object} List item click event
   *    * Meta {object}
   *       * selectedItems {array} List of selected items.
   *       * item {object} Last selected item.
   * * `onSort`: Called when the list is sorted.
   *    * event {object} Sort click event
   */
  events: _propTypes.default.shape({
    onSelect: _propTypes.default.func.isRequired,
    onSort: _propTypes.default.func
  }),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * **Text labels for internationalization**
   * * `header`: This is the header of the list.
   */
  labels: _propTypes.default.shape({
    header: _propTypes.default.string
  }),

  /**
   * The direction of the sort arrow. Option are:
   * * SORT_OPTIONS.UP: `up`
   * * SORT_OPTIONS.DOWN: `down`
   */
  sortDirection: _propTypes.default.oneOf([SORT_OPTIONS.UP, SORT_OPTIONS.DOWN]),

  /**
   * Allows multiple item to be selection
   */
  multiple: _propTypes.default.bool,

  /**
   * The list of items.
   * It is recommended that you have a unique `id` for each item.
   */
  options: _propTypes.default.array.isRequired,

  /**
   * Accepts an array of item objects. For single selection, pass in an array of one object.
   */
  selection: _propTypes.default.array,

  /**
   * Accepts an array of item objects. For single unread, pass in an array of one object.
   */
  unread: _propTypes.default.array,

  /**
   * Custom list item template for the list item content. The select and unread functionality wraps the custom list item.
   * This should be a React component that accepts props.
   */
  listItem: _propTypes.default.func
};
var defaultProps = {
  assistiveText: {
    list: 'Select an item to open it in a new workspace tab.',
    sort: {
      sortedBy: 'Sorted by',
      descending: 'Descending',
      ascending: 'Ascending'
    }
  },
  events: {},
  labels: {},
  selection: [],
  unread: []
};
/**
 * The menu with the ARIA role of a listbox.
 */

var SplitViewListbox = /*#__PURE__*/function (_React$Component) {
  _inherits(SplitViewListbox, _React$Component);

  var _super = _createSuper(SplitViewListbox);

  function SplitViewListbox(props) {
    var _this;

    _classCallCheck(this, SplitViewListbox);

    _this = _super.call(this, props);
    _this.listItemComponents = {};
    _this.state = {
      currentSelectedItem: null,
      currentFocusedListItem: {
        index: 0,
        item: null
      }
    }; // Generates the list item template

    _this.ListItemWithContent = (0, _listItemWithContent.default)(props.listItem || _listItemContent.default);
    return _this;
  }

  _createClass(SplitViewListbox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.focusFirstItem();
    }
  }, {
    key: "isListItemFocused",
    value: function isListItemFocused(item) {
      return this.state.currentFocusedListItem.item === item;
    }
  }, {
    key: "isSelected",
    value: function isSelected(item) {
      return this.props.selection.includes(item);
    }
  }, {
    key: "isUnread",
    value: function isUnread(item) {
      return this.props.unread.includes(item);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (this.props.multiple && event.key === 'a' && event.ctrlKey) {
        // select / deselect all
        _event.default.trap(event);

        if (this.props.options === this.props.selection) {
          this.deselectAllListItems(event);
        } else {
          this.selectAllListItems(event);
        }
      } else if (event.key === 'ArrowUp') {
        _event.default.trap(event);

        this.moveToPreviousItem(event);
      } else if (event.key === 'ArrowDown') {
        _event.default.trap(event);

        this.moveToNextItem(event);
      }
    }
  }, {
    key: "moveToNextItem",
    value: function moveToNextItem(event) {
      var nextFocusIndex = this.state.currentFocusedListItem.index === this.props.options.length - 1 ? 0 : this.state.currentFocusedListItem.index + 1;
      this.moveToIndex(event, nextFocusIndex);
    }
  }, {
    key: "moveToPreviousItem",
    value: function moveToPreviousItem(event) {
      var previousFocusIndex = this.state.currentFocusedListItem.index === 0 ? this.props.options.length - 1 : this.state.currentFocusedListItem.index - 1;
      this.moveToIndex(event, previousFocusIndex);
    }
  }, {
    key: "moveToIndex",
    value: function moveToIndex(event, index) {
      var item = this.props.options[index];
      this.focusItem(item);
    }
  }, {
    key: "focusFirstItem",
    value: function focusFirstItem() {
      var _this2 = this;

      var firstSelectedItem = this.props.options.find(function (item) {
        return _this2.props.selection.includes(item);
      }) || this.props.options[0];

      if (firstSelectedItem) {
        this.focusItem(firstSelectedItem, true);
      }
    }
  }, {
    key: "focusItem",
    value: function focusItem(item, setDataOnly) {
      var index = this.props.options.indexOf(item);

      if (!setDataOnly) {
        this.listItemComponents[index].focus();
      }

      this.setState({
        currentFocusedListItem: {
          index: index,
          item: item
        }
      });
    }
  }, {
    key: "deselectAllListItems",
    value: function deselectAllListItems(event) {
      this.setState({
        currentSelectedItem: null
      });
      this.props.events.onSelect(event, {
        selectedItems: [],
        item: null
      });
    }
  }, {
    key: "selectAllListItems",
    value: function selectAllListItems(event) {
      this.props.events.onSelect(event, {
        selectedItems: this.props.options,
        item: this.state.currentSelectedItem
      });
    }
  }, {
    key: "selectListItem",
    value: function selectListItem(item, event) {
      var selectedItems = [item];

      if (this.props.multiple) {
        if (event.metaKey) {
          selectedItems = this.props.selection.includes(item) ? this.props.selection.filter(function (i) {
            return i !== item;
          }) : [item].concat(_toConsumableArray(this.props.selection));
        } else if (event.shiftKey) {
          /* eslint-disable fp/no-mutating-methods */
          var _sort = [this.props.options.indexOf(this.state.currentSelectedItem), this.props.options.indexOf(item)].sort(),
              _sort2 = _slicedToArray(_sort, 2),
              begin = _sort2[0],
              end = _sort2[1];
          /* eslint-enable fp/no-mutating-methods */


          var addToSelection = this.props.options.slice(begin, end + 1);
          selectedItems = [].concat(_toConsumableArray(addToSelection), _toConsumableArray(this.props.selection.filter(function (i) {
            return !addToSelection.includes(i);
          })));
        }
      }

      this.setState({
        currentSelectedItem: item
      });
      this.props.events.onSelect(event, {
        selectedItems: selectedItems,
        item: item
      });
    }
  }, {
    key: "handleOnSelect",
    value: function handleOnSelect(event, _ref) {
      var item = _ref.item;
      this.selectListItem(item, event);
      this.focusItem(item);
    }
  }, {
    key: "sortDirection",
    value: function sortDirection() {
      return this.props.sortDirection ? /*#__PURE__*/_react.default.createElement(_icon.default, {
        category: "utility",
        name: this.props.sortDirection === SORT_OPTIONS.DOWN ? 'arrowdown' : 'arrowup',
        size: "xx-small",
        className: "slds-align-top"
      }) : null;
    }
  }, {
    key: "headerWrapper",
    value: function headerWrapper(children) {
      return this.props.events.onSort ? /*#__PURE__*/_react.default.createElement("a", {
        "aria-live": "polite",
        style: {
          borderTop: '0'
        },
        href: "#",
        role: "button",
        className: "slds-split-view__list-header slds-grid slds-text-link_reset",
        onClick: _event.default.trappedHandler(this.props.events.onSort)
      }, children) : /*#__PURE__*/_react.default.createElement("div", {
        style: {
          borderTop: '0'
        },
        className: "slds-split-view__list-header slds-grid"
      }, children);
    }
  }, {
    key: "header",
    value: function header() {
      return this.props.labels.header ? this.headerWrapper( /*#__PURE__*/_react.default.createElement("span", {
        "aria-sort": this.props.sortDirection === SORT_OPTIONS.DOWN ? this.props.assistiveText.sort.descending : this.props.assistiveText.sort.ascending
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, this.props.assistiveText.sort.sortedBy, ': '), /*#__PURE__*/_react.default.createElement("span", null, this.props.labels.header, this.sortDirection()), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, '- ', this.props.sortDirection === SORT_OPTIONS.DOWN ? this.props.assistiveText.sort.descending : this.props.assistiveText.sort.ascending))) : null;
    }
  }, {
    key: "addListItemComponent",
    value: function addListItemComponent(component, index) {
      this.listItemComponents[index] = component;
    }
  }, {
    key: "listItems",
    value: function listItems() {
      var _this3 = this;

      var ListItemWithContent = this.ListItemWithContent;
      return this.props.options.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(ListItemWithContent, {
          key: item.id || index,
          assistiveText: {
            unreadItem: _this3.props.assistiveText.unreadItem
          },
          listItemRef: function listItemRef(component) {
            _this3.addListItemComponent(component, index);
          },
          item: item,
          isFocused: _this3.isListItemFocused(item),
          isSelected: _this3.isSelected(item),
          isUnread: _this3.isUnread(item),
          events: {
            onClick: function onClick(event, meta) {
              return _this3.handleOnSelect(event, meta);
            }
          },
          multiple: _this3.props.multiple
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: (0, _classnames.default)('slds-grid slds-grid_vertical slds-scrollable_none', this.props.className)
      }, this.header(), /*#__PURE__*/_react.default.createElement("ul", {
        className: "slds-scrollable_y",
        "aria-label": this.props.assistiveText.list,
        "aria-multiselectable": this.props.multiple,
        role: "listbox",
        onKeyDown: function onKeyDown(event) {
          return _this4.handleKeyDown(event);
        }
      }, this.listItems()));
    }
  }]);

  return SplitViewListbox;
}(_react.default.Component);

_defineProperty(SplitViewListbox, "displayName", _constants.SPLIT_VIEW_LISTBOX);

_defineProperty(SplitViewListbox, "propTypes", propTypes);

_defineProperty(SplitViewListbox, "defaultProps", defaultProps);

var _default = SplitViewListbox;
exports.default = _default;