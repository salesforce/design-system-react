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

var _constants = require("../../../utilities/constants");

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
var GlobalHeaderDropdownTrigger = /*#__PURE__*/function (_React$Component) {
  _inherits(GlobalHeaderDropdownTrigger, _React$Component);

  var _super = _createSuper(GlobalHeaderDropdownTrigger);

  function GlobalHeaderDropdownTrigger() {
    var _this;

    _classCallCheck(this, GlobalHeaderDropdownTrigger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "renderAvatar", function () {
      var avatar = _this.props.avatar;

      if (typeof avatar === 'string') {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-avatar slds-avatar_circle slds-avatar_medium"
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: avatar,
          alt: ""
        }));
      }

      return avatar || null;
    });

    return _this;
  }

  _createClass(GlobalHeaderDropdownTrigger, [{
    key: "render",
    value: // ### Render
    function render() {
      // The following props are provided to the `li`, all others are passed into the `Button`
      var _this$props = this.props,
          className = _this$props.className,
          id = _this$props.id,
          isOpen = _this$props.isOpen,
          globalAction = _this$props.globalAction,
          menu = _this$props.menu,
          onBlur = _this$props.onBlur,
          onClick = _this$props.onClick,
          onFocus = _this$props.onFocus,
          onKeyDown = _this$props.onKeyDown,
          onMouseDown = _this$props.onMouseDown,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseLeave = _this$props.onMouseLeave,
          triggerRef = _this$props.triggerRef,
          rest = _objectWithoutProperties(_this$props, ["className", "id", "isOpen", "globalAction", "menu", "onBlur", "onClick", "onFocus", "onKeyDown", "onMouseDown", "onMouseEnter", "onMouseLeave", "triggerRef"]);

      return (
        /*#__PURE__*/

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        // eslint-disable-next-line jsx-a11y/role-supports-aria-props
        _react.default.createElement("li", {
          "aria-haspopup": "true",
          className: (0, _classnames.default)('slds-dropdown-trigger slds-dropdown-trigger_click', {
            'slds-is-open': isOpen,
            'slds-p-around_xx-small': globalAction
          }, className),
          id: id,
          onBlur: onBlur,
          onClick: onClick,
          onFocus: onFocus,
          onKeyDown: onKeyDown,
          onMouseDown: onMouseDown,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
          ref: triggerRef
        }, /*#__PURE__*/_react.default.createElement(_button.default, _extends({
          className: (0, _classnames.default)({
            'slds-global-header__button_icon-actions': globalAction
          }),
          iconClassName: (0, _classnames.default)({
            'slds-global-header__icon-actions': globalAction
          }),
          "aria-haspopup": "true",
          buttonVariant: "dropdown"
        }, rest), this.renderAvatar()), menu)
      );
    }
  }]);

  return GlobalHeaderDropdownTrigger;
}(_react.default.Component);

_defineProperty(GlobalHeaderDropdownTrigger, "displayName", _constants.MENU_DROPDOWN_TRIGGER);

_defineProperty(GlobalHeaderDropdownTrigger, "propTypes", {
  /**
   * An image URL or avatar node to display for the user profile.
   */
  avatar: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * CSS classes to be added to `li` element.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
   */
  id: _propTypes.default.string,

  /**
   * Informs the trigger on the open/close state of the dropdown menu
   */
  isOpen: _propTypes.default.bool,

  /**
   * Adds custom styling such as inverse fill and special sizing/spacing
   */
  globalAction: _propTypes.default.bool,

  /**
   * The dropdown menu.
   */
  menu: _propTypes.default.node,

  /**
   * Is only called when `openOn` is set to `hover` and when the triggering li loses focus.
   */
  onBlur: _propTypes.default.func,

  /**
   * This prop is passed onto the triggering `li`. Triggered when the trigger li is clicked.
   */
  onClick: _propTypes.default.func,

  /**
   * Is only called when `openOn` is set to `hover` and when the triggering li gains focus.
   */
  onFocus: _propTypes.default.func,

  /**
   * Called when a key pressed.
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Called when mouse clicks down on the trigger li.
   */
  onMouseDown: _propTypes.default.func,

  /**
   * Called when mouse hovers over the trigger `li`.
   */
  onMouseEnter: _propTypes.default.func,

  /**
   * Called when mouse leaves trigger `li` or the menu.
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
   */
  openOn: _propTypes.default.oneOf(['hover', 'click', 'hybrid']),

  /**
   * Set to true if menu is inline and relatively positioned with CSS. This is the typical use case for menus with nubbins.
   */
  positioned: _propTypes.default.bool,

  /**
   * The ref of the actual triggering button.
   */
  triggerRef: _propTypes.default.func
});

var _default = GlobalHeaderDropdownTrigger;
exports.default = _default;