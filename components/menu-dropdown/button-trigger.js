"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _button = _interopRequireDefault(require("../button"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
 */
var Trigger = /*#__PURE__*/function (_React$Component) {
  _inherits(Trigger, _React$Component);

  var _super = _createSuper(Trigger);

  function Trigger() {
    _classCallCheck(this, Trigger);

    return _super.apply(this, arguments);
  }

  _createClass(Trigger, [{
    key: "render",
    value: // ### Display Name
    // Always use the canonical component name (set in the core) as the React
    // display name.
    // ### Prop Types
    // ### Render
    function render() {
      // The following are required for use with dropdown. Any other custom props for `Button` should be set with a `Button` child of this component, and are technically just here for backwards compatibility. See `children` prop description for more information.
      var _this$props = this.props,
          assistiveText = _this$props.assistiveText,
          children = _this$props.children,
          className = _this$props.className,
          id = _this$props.id,
          isInline = _this$props.isInline,
          isOpen = _this$props.isOpen,
          onBlur = _this$props.onBlur,
          menu = _this$props.menu,
          onClick = _this$props.onClick,
          onFocus = _this$props.onFocus,
          onKeyDown = _this$props.onKeyDown,
          onMouseDown = _this$props.onMouseDown,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseLeave = _this$props.onMouseLeave,
          triggerRef = _this$props.triggerRef,
          triggerClassName = _this$props.triggerClassName,
          deprecatedPropsFromMenuDropdown = _objectWithoutProperties(_this$props, ["assistiveText", "children", "className", "id", "isInline", "isOpen", "onBlur", "menu", "onClick", "onFocus", "onKeyDown", "onMouseDown", "onMouseEnter", "onMouseLeave", "triggerRef", "triggerClassName"]);

      var openOn = this.props.openOn === 'hover' ? 'click' : this.props.openOn; // Trigger manipulation

      var propsFromGrandchildButton = {}; // if there are no children, render the default button

      if (_react.default.Children.count(this.props.children) !== 0) {
        _react.default.Children.forEach(this.props.children, function (child) {
          if (child && child.type.displayName === _button.default.displayName) {
            propsFromGrandchildButton = child.props;
          }
        });
      } // If Trigger has a Button child, then use the explicitly declared child's props layered on top of those passed down by dropdown's props to allow manual override


      return (
        /*#__PURE__*/

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        _react.default.createElement("div", {
          className: (0, _classnames.default)("slds-dropdown-trigger slds-dropdown-trigger_".concat(openOn), {
            'slds-is-open': isOpen
          }, triggerClassName),
          id: id,
          onBlur: onBlur,
          onClick: onClick,
          onKeyDown: onKeyDown,
          onFocus: onFocus,
          onMouseDown: onMouseDown,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        }, /*#__PURE__*/_react.default.createElement(_button.default, _extends({
          assistiveText: assistiveText,
          className: className,
          "aria-expanded": isOpen,
          "aria-haspopup": true
        }, deprecatedPropsFromMenuDropdown, propsFromGrandchildButton, {
          buttonRef: triggerRef
        })), menu)
      );
    }
  }]);

  return Trigger;
}(_react.default.Component);

_defineProperty(Trigger, "displayName", _constants.MENU_DROPDOWN_TRIGGER);

_defineProperty(Trigger, "propTypes", {
  /**
   * Import the module `design-system-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the triggering button. Any `id` prop or event hanlders (`onBlur`, `onClick`, etc.) set on the button grandchild will be overwritten by `MenuDropdown` to allow functionality and accessibility.
   * ```
   * <Dropdown>
   *   <Trigger>
   *   <Button iconCategory="utility" iconName="settings" />
   *   </Trigger>
   * </Dropdown>
   * ```
   */
  children: _propTypes.default.element,

  /**
   * CSS classes to be added to triggering button.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. This is provided by the `MenuDropdown`. Please use `MenuDropdown` to set.
   */
  id: _propTypes.default.string,

  /**
   * Informs the trigger on the open/close state of the dropdown menu
   */
  isOpen: _propTypes.default.bool,

  /**
   * By Default the dropdown menu is inside a `Dialog` component.
   */
  menu: _propTypes.default.node,

  /**
   * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
   */
  onBlur: _propTypes.default.func,

  /**
   * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
   */
  onClick: _propTypes.default.func,

  /**
   * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
   */
  onFocus: _propTypes.default.func,

  /**
   * Called when a key pressed.
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Called when mouse clicks down on the trigger button.
   */
  onMouseDown: _propTypes.default.func,

  /**
   * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
  onMouseEnter: _propTypes.default.func,

  /**
   * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
   */
  openOn: _propTypes.default.oneOf(['hover', 'click', 'hybrid']),

  /**
   * The ref of the actual triggering button.
   */
  triggerRef: _propTypes.default.func,

  /**
   * CSS classes to be added to wrapping trigger `div` around the button.
   */
  triggerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string])
});

var _default = Trigger;
exports.default = _default;