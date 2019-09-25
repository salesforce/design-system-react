"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DISPLAY_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DISPLAY_NAME = 'SLDSSplitViewListItemWithContent';
exports.DISPLAY_NAME = DISPLAY_NAME;
var propsTypes = {
  /**
   * **Assistive text for accessibility**
   * * `unreadItem`: The unread indicator.
   */
  assistiveText: _propTypes.default.shape({
    unreadItem: _propTypes.default.string
  }),

  /**
   * Item to be displayed
   */
  item: _propTypes.default.object.isRequired,

  /**
   * Allows multiple item to be selection
   */
  multiple: _propTypes.default.bool,

  /**
   * Shows the item as `focused`.
   */
  isFocused: _propTypes.default.bool.isRequired,

  /**
   * Shows the item as `selected`.
   */
  isSelected: _propTypes.default.bool.isRequired,

  /**
   * Shows the item as `unread`.
   */
  isUnread: _propTypes.default.bool,

  /**
   * **Event Callbacks**
   * * `onClick`: Called when the item is clicked.
   * * * Event
   * * * Meta data
   * * * * `item`: The original item.
   * * * * `isSelected`: Is the item selected.
   * * * * `isUnread`: Is the item unread.
   */
  events: _propTypes.default.shape({
    onClick: _propTypes.default.func.isRequired
  }),

  /**
   * Reference to the list item component
   */
  listItemRef: _propTypes.default.func
};
var defaultProps = {
  assistiveText: {
    unreadItem: 'Unread Item'
  },
  events: {}
};
/**
 * HOC that wraps the list item content with selection and unread functionality.
 * @param ListItemContent {node} A React component
 * @returns {ListItemWithContent} A React component
 */

var listItemWithContent = function listItemWithContent(ListItemContent) {
  var ListItemWithContent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ListItemWithContent, _React$Component);

    function ListItemWithContent() {
      _classCallCheck(this, ListItemWithContent);

      return _possibleConstructorReturn(this, _getPrototypeOf(ListItemWithContent).apply(this, arguments));
    }

    _createClass(ListItemWithContent, [{
      key: "onClick",
      value: function onClick(event) {
        this.props.events.onClick(event, {
          item: this.props.item,
          isSelected: this.props.isSelected,
          isUnread: this.props.isUnread
        });
      }
    }, {
      key: "unread",
      value: function unread() {
        return this.props.isUnread ? _react.default.createElement("abbr", {
          className: "slds-indicator_unread",
          title: this.props.assistiveText.unreadItem,
          "aria-label": this.props.assistiveText.unreadItem
        }, _react.default.createElement("span", {
          className: "slds-assistive-text"
        }, '●')) : null;
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        return _react.default.createElement("li", {
          className: (0, _classnames.default)('slds-split-view__list-item', {
            'slds-is-unread': this.props.isUnread
          }),
          role: "presentation"
        }, _react.default.createElement("a", {
          className: "slds-split-view__list-item-action slds-grow slds-has-flexi-truncate",
          role: "option",
          ref: this.props.listItemRef,
          "aria-selected": this.props.multiple ? !!this.props.isSelected : this.props.isSelected,
          tabIndex: this.props.isFocused ? 0 : -1,
          href: "javascript:void(0);" // eslint-disable-line no-script-url
          ,
          onClick: function onClick(e) {
            return _this.onClick(e);
          }
        }, this.unread(), _react.default.createElement(ListItemContent, this.props)));
      }
    }]);

    return ListItemWithContent;
  }(_react.default.Component);

  _defineProperty(ListItemWithContent, "displayName", "".concat(DISPLAY_NAME, "(").concat(ListItemContent.displayName || ListItemContent.name || 'Component', ")"));

  _defineProperty(ListItemWithContent, "propTypes", propsTypes);

  _defineProperty(ListItemWithContent, "defaultProps", defaultProps);

  return ListItemWithContent;
};

var _default = listItemWithContent;
exports.default = _default;