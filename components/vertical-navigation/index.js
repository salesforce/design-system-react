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

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require("../../utilities/constants");

var _item = require("./private/item");

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * Vertical Navigation represents a list of links that either take the user to another page or parts of the page the user is in.
 */
var VerticalNavigation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VerticalNavigation, _React$Component);

  function VerticalNavigation() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, VerticalNavigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = VerticalNavigation.__proto__ || Object.getPrototypeOf(VerticalNavigation)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "getId", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.props.id || _this.generatedId;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getVariant", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.props.variant === 'shade' ? 'shade' : 'default';
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getSelectedId", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var categories = _this.props.categories;
        var selectedId;

        if (_this.props.selectedId) {
          selectedId = _this.props.selectedId;
        } else if (categories.length > 0 && categories[0].items && categories[0].items.length > 0) {
          selectedId = categories[0].items[0].id;
        }

        return selectedId;
      }
    }), _temp));
  }

  _createClass(VerticalNavigation, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid2.default.generate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var rootId = this.getId();
      var variant = this.getVariant();
      return _react2.default.createElement("nav", {
        id: rootId,
        className: (0, _classnames2.default)('slds-nav-vertical', {
          'slds-nav-vertical_shade': variant === 'shade'
        }, this.props.className)
      }, this.props.categories.map(function (category) {
        var categoryId = "".concat(rootId, "-").concat(category.id);

        var selectedId = _this2.getSelectedId();

        return _react2.default.createElement("div", {
          key: "".concat(categoryId, "-header"),
          className: "slds-nav-vertical__section"
        }, _react2.default.createElement("h2", {
          id: categoryId,
          className: "slds-nav-vertical__title slds-text-title_caps"
        }, category.label), _react2.default.createElement("ul", {
          key: categoryId
        }, category.items.map(function (item) {
          return _react2.default.createElement(_item2.default, {
            key: item.id,
            item: item,
            isSelected: item.id === selectedId,
            categoryId: categoryId,
            onSelect: _this2.props.onSelect
          });
        })));
      }));
    }
  }]);

  return VerticalNavigation;
}(_react2.default.Component);

Object.defineProperty(VerticalNavigation, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.VERTICAL_NAVIGATION
});
Object.defineProperty(VerticalNavigation, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * HTML id for component. _Tested with snapshot testing._
     */
    id: _propTypes2.default.string,

    /**
     * CSS class names to be added to the container element. _Tested with snapshot testing._
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * Array of categories. The required shape is: `{id: string, label: string, items: array}`. The required shape of an item is `{id: string, label: string, url: string}`. All item ids are expected to be unique. _Tested with snapshot testing._
     */
    categories: _propTypes2.default.array,

    /**
     * The ID of the item that is currently selected. Defaults to the ID of the first item. _Tested with Mocha framework._
     */
    selectedId: _propTypes2.default.string,

    /**
     * Triggered when the selection changes. It receives an event and an item object in the shape: `event, {item: [object] }`. _Tested with Mocha framework._
     */
    onSelect: _propTypes2.default.func,

    /**
     * Determines component style:
     *     * Use `shade` when the component is placed on an existing background that is not lightly colored.
     * _Tested with snapshot testing._
     */
    variant: _propTypes2.default.oneOf(['default', 'shade'])
  }
});
Object.defineProperty(VerticalNavigation, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    variant: 'default'
  }
});
exports.default = VerticalNavigation;