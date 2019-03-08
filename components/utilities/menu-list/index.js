"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _item = require("./item");

var _item2 = _interopRequireDefault(_item);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component description.
 */
var List =
/*#__PURE__*/
function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
  }

  _createClass(List, [{
    key: "render",
    value: function render() {
      var _this = this;

      var lengthClassName;

      if (this.props.length) {
        lengthClassName = "slds-dropdown_length-".concat(this.props.length);
      }

      return _react2.default.createElement("ul", {
        "aria-labelledby": this.props.triggerId,
        className: (0, _classnames2.default)('dropdown__list', lengthClassName, this.props.className),
        role: "menu"
      }, this.props.options.map(function (option, index) {
        var id = _this.props.getListItemId(index);

        var isSingleSelected = index === _this.props.selectedIndex;
        var isMultipleSelected = !!_this.props.selectedIndices && _this.props.selectedIndices.indexOf(index) !== -1;
        return _react2.default.createElement(_item2.default, _extends({}, option, {
          "aria-disabled": option.disabled,
          checkmark: _this.props.checkmark && (isSingleSelected || isMultipleSelected),
          data: option,
          id: id,
          index: index,
          isSelected: isSingleSelected || isMultipleSelected,
          key: "".concat(id, "-").concat(option.value),
          labelRenderer: _this.props.itemRenderer,
          onSelect: _this.props.onSelect,
          ref: function ref(listItem) {
            return _this.props.itemRefs(listItem, index);
          }
        }));
      }));
    }
  }]);

  return List;
}(_react2.default.Component);

Object.defineProperty(List, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.LIST
});
Object.defineProperty(List, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * Determines whether or not to show a checkmark for selected items.
     */
    checkmark: _propTypes2.default.bool,

    /**
     * CSS classes to be added to `<ul />`.
     */
    className: _propTypes2.default.string,

    /**
     * Used internally to determine the id that will be used for list items.
     */
    getListItemId: _propTypes2.default.func,

    /**
     * Used internally to pass references to the individual menu items back up for focusing / scrolling.
     */
    itemRefs: _propTypes2.default.func,

    /**
     * If provided, this function will be used to render the contents of each menu item.
     */
    itemRenderer: _propTypes2.default.func,

    /**
     * Sets the height of the list based on the numeber of items.
     */
    length: _propTypes2.default.oneOf([null, '5', '7', '10', 5, 7, 10]),

    /**
     * Triggered when a list item is selected (via mouse or keyboard).
     */
    onSelect: _propTypes2.default.func,

    /**
     * An array of items to render in the list.
     */
    options: _propTypes2.default.array,

    /**
     * The index of the currently selected item in the list.
     */
    selectedIndex: _propTypes2.default.number,

    /**
     * The id of the element which triggered this list (in a menu context).
     */
    triggerId: _propTypes2.default.string
  }
});
Object.defineProperty(List, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    length: '5',
    options: [],
    selectedIndex: -1
  }
});
exports.default = List;