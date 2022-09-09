"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _shortid = _interopRequireDefault(require("shortid"));

var _mode = _interopRequireDefault(require("./private/mode"));

var _cellContext = _interopRequireDefault(require("./private/cell-context"));

var _tableContext = _interopRequireDefault(require("./private/table-context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

/**
 * Wrapper for interactive elements in the table.
 *
 * The Advanced Data Table implements keyboard navigation as described in [Data Tables](https://www.lightningdesignsystem.com/components/data-tables/).
 * This wrapper controls an element's focus and `tabIndex` behavior so that it is consistent with the spec.
 *
 * The wrapped element must accept the props:
 *  `onFocus`: Callback for when the element is focused.
 *  `onRequestFocus`: Trigger to indicate that this element should be focused.
 *  `requestFocus`: This wrapper overrides the `requestFocus` prop and provides its own value.
 *  `tabIndex`: This wrapper overrides the `tabIndex` prop and provides its own value.
 */
var _default = function _default(WrappedElement) {
  var InteractiveElement = /*#__PURE__*/function (_React$Component) {
    _inherits(InteractiveElement, _React$Component);

    var _super = _createSuper(InteractiveElement);

    function InteractiveElement(props) {
      var _this;

      _classCallCheck(this, InteractiveElement);

      _this = _super.call(this, props);
      _this.elementId = _shortid.default.generate();
      return _this;
    }

    _createClass(InteractiveElement, [{
      key: "onFocus",
      value: function onFocus(tableContext) {
        if (tableContext.activeElement !== this.elementId) {
          tableContext.changeActiveElement(this.elementId);
        }

        if (this.props.onFocus) {
          var _this$props;

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          (_this$props = this.props).onFocus.apply(_this$props, args);
        }
      }
    }, {
      key: "onRequestFocus",
      value: function onRequestFocus(tableContext, node) {
        if (tableContext.tableHasFocus) {
          node.focus();

          if (this.props.onRequestFocus) {
            var _this$props2;

            for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            (_this$props2 = this.props).onRequestFocus.apply(_this$props2, args);
          }
        }
      }
    }, {
      key: "onOpen",
      value: function onOpen(tableContext) {
        tableContext.setAllowKeyboardNavigation(false);

        if (this.props.onOpen) {
          var _this$props3;

          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }

          (_this$props3 = this.props).onOpen.apply(_this$props3, args);
        }
      }
    }, {
      key: "onClose",
      value: function onClose(tableContext) {
        tableContext.setAllowKeyboardNavigation(true);

        if (this.props.onClose) {
          var _this$props4;

          for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }

          (_this$props4 = this.props).onClose.apply(_this$props4, args);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var onFocus = this.onFocus,
            onRequestFocus = this.onRequestFocus,
            onOpen = this.onOpen,
            onClose = this.onClose;
        return /*#__PURE__*/_react.default.createElement(_tableContext.default.Consumer, null, function (tableContext) {
          return /*#__PURE__*/_react.default.createElement(_cellContext.default.Consumer, null, function (cellContext) {
            tableContext.registerInteractiveElement(cellContext.rowIndex, cellContext.columnIndex, _this2.elementId);
            var requestFocus = tableContext.mode === _mode.default.ACTIONABLE && tableContext.activeElement === _this2.elementId;
            var tabIndex = tableContext.mode === _mode.default.ACTIONABLE ? '0' : '-1';
            var keyboardNavProps = tableContext.allowKeyboardNavigation ? {
              onFocus: onFocus.bind(_this2, tableContext),
              onRequestFocus: onRequestFocus.bind(_this2, tableContext),
              requestFocus: requestFocus,
              tabIndex: tabIndex
            } : {};
            return /*#__PURE__*/_react.default.createElement(WrappedElement, _objectSpread(_objectSpread(_objectSpread({}, _this2.props), {
              onOpen: onOpen.bind(_this2, tableContext),
              onClose: onClose.bind(_this2, tableContext)
            }), keyboardNavProps));
          });
        });
      }
    }]);

    return InteractiveElement;
  }(_react.default.Component);

  InteractiveElement.displayName = "InteractiveElement".concat(WrappedElement.displayName);
  return InteractiveElement;
};

exports.default = _default;