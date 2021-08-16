"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _component = _interopRequireDefault(require("./component.json"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _constants = require("../../utilities/constants");

var _item = _interopRequireDefault(require("./private/item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * Vertical Navigation represents a list of links that either take the user to another page or parts of the page the user is in.
 */
var VerticalNavigation = /*#__PURE__*/function (_React$Component) {
  _inherits(VerticalNavigation, _React$Component);

  var _super = _createSuper(VerticalNavigation);

  function VerticalNavigation(props) {
    var _this;

    _classCallCheck(this, VerticalNavigation);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedId", function () {
      var categories = _this.props.categories;
      var selectedId;

      if (_this.props.selectedId) {
        // eslint-disable-next-line prefer-destructuring
        selectedId = _this.props.selectedId;
      } else if (categories.length > 0 && categories[0].items && categories[0].items.length > 0) {
        selectedId = categories[0].items[0].id;
      }

      return selectedId;
    });

    _this.generatedId = _shortid.default.generate();
    (0, _checkProps.default)(_constants.VERTICAL_NAVIGATION, props, _component.default);
    return _this;
  }

  _createClass(VerticalNavigation, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var rootId = this.getId();
      return /*#__PURE__*/_react.default.createElement("nav", {
        id: rootId,
        className: (0, _classnames.default)('slds-nav-vertical', this.props.className)
      }, this.props.categories.map(function (category) {
        var categoryId = "".concat(rootId, "-").concat(category.id);

        var selectedId = _this2.getSelectedId();

        return /*#__PURE__*/_react.default.createElement("div", {
          key: "".concat(categoryId, "-header"),
          className: "slds-nav-vertical__section"
        }, /*#__PURE__*/_react.default.createElement("h2", {
          id: categoryId,
          className: "slds-nav-vertical__title"
        }, category.label), /*#__PURE__*/_react.default.createElement("ul", {
          key: categoryId
        }, category.items.map(function (item) {
          return /*#__PURE__*/_react.default.createElement(_item.default, {
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
}(_react.default.Component);

_defineProperty(VerticalNavigation, "displayName", _constants.VERTICAL_NAVIGATION);

_defineProperty(VerticalNavigation, "propTypes", {
  /**
   * HTML id for component. _Tested with snapshot testing._
   */
  id: _propTypes.default.string,

  /**
   * CSS class names to be added to the container element. _Tested with snapshot testing._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Array of categories. The required shape is: `{id: string, label: string, items: array}`. The required shape of an item is `{id: string, label: string, url: string}`. All item ids are expected to be unique. _Tested with snapshot testing._
   */
  categories: _propTypes.default.array,

  /**
   * The ID of the item that is currently selected. Defaults to the ID of the first item. _Tested with Mocha framework._
   */
  selectedId: _propTypes.default.string,

  /**
   * Triggered when the selection changes. It receives an event and an item object in the shape: `event, {item: [object] }`. _Tested with Mocha framework._
   */
  onSelect: _propTypes.default.func
});

_defineProperty(VerticalNavigation, "defaultProps", {});

var _default = VerticalNavigation;
exports.default = _default;