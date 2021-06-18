"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRequiredIf = _interopRequireDefault(require("react-required-if"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _buttonIcon = _interopRequireDefault(require("../icon/button-icon"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _getAriaProps = _interopRequireDefault(require("../../utilities/get-aria-props"));

var _getDataProps = _interopRequireDefault(require("../../utilities/get-data-props"));

var _getFormProps = _interopRequireDefault(require("../../utilities/get-form-props"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var defaultProps = {
  assistiveText: {
    icon: ''
  },
  disabled: false,
  hint: false,
  iconSize: 'medium',
  responsive: false,
  type: 'button',
  variant: 'neutral'
};
/**
 * The Button component is the Lightning Design System Button component. The Button should be used for label buttons, icon buttons, or buttons that have both labels and icons.
 * Either a <code>label</code> or <code>assistiveText.icon</code> is required; see the Prop Details table below. For buttons that maintain selected/unselected states, use the <a href="#/button-stateful">ButtonStateful</a> component.
 * Although not listed in the prop table, all `aria-*`, `data-*` and `form*` props will be added to the `button` element if passed in.
 */

var Button = /*#__PURE__*/function (_React$Component) {
  _inherits(Button, _React$Component);

  var _super = _createSuper(Button);

  function Button(props) {
    var _this;

    _classCallCheck(this, Button);

    _this = _super.call(this, props); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    _defineProperty(_assertThisInitialized(_this), "getClassName", function () {
      var _classNames;

      var isIcon = _this.props.variant === 'icon';
      var iconVariant = _this.props.iconVariant;
      var iconMore = iconVariant === 'more';
      var iconBorder = iconVariant === 'border';
      var iconGlobalHeader = iconVariant === 'global-header';
      var showButtonVariant = _this.props.variant !== 'base' && !iconVariant && !_this.props.inverse && _this.props.variant !== 'link' || iconVariant === 'bare';
      var plainInverseBtn = _this.props.inverse && !isIcon;
      var plainInverseIcon = _this.props.inverse && isIcon && !iconMore && !iconBorder;
      var moreInverseIcon = _this.props.inverse && iconMore;
      var borderInverseIcon = _this.props.inverse && iconBorder; // After hijacking `iconVariant` to let `Button` know it's in the header, we reset to container style for the actual button CSS.

      if (iconVariant === 'global-header') {
        iconVariant = 'container';
      }

      return (0, _classnames.default)((_classNames = {
        'slds-button': _this.props.variant !== 'link'
      }, _defineProperty(_classNames, "slds-button_".concat(_this.props.variant), showButtonVariant), _defineProperty(_classNames, 'slds-button_inverse', plainInverseBtn), _defineProperty(_classNames, 'slds-button_icon-inverse', plainInverseIcon || moreInverseIcon), _defineProperty(_classNames, 'slds-button_icon-border-inverse', borderInverseIcon), _defineProperty(_classNames, "slds-button_icon-".concat(iconVariant), iconVariant && !borderInverseIcon), _defineProperty(_classNames, 'slds-global-header__button_icon', iconGlobalHeader), _defineProperty(_classNames, "slds-button_icon-".concat(_this.props.iconSize), iconVariant && _this.props.iconSize !== 'medium'), _defineProperty(_classNames, 'slds-button_reset', _this.props.variant === 'link'), _defineProperty(_classNames, 'slds-text-link', _this.props.variant === 'link'), _classNames), _this.props.className);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event, {});
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderIcon", function (name) {
      var iconSize = !_this.props.iconSize || _this.props.iconVariant ? null : _this.props.iconSize;
      return /*#__PURE__*/_react.default.createElement(_buttonIcon.default, {
        category: _this.props.iconCategory || 'utility' // BREAKING CHANGE we will introduce in 1.0. For the moment, set default prop here if none specified.
        ,
        className: (0, _classnames.default)({
          'slds-global-header__icon': _this.props.iconVariant === 'global-header'
        }, _this.props.iconClassName),
        hint: _this.props.hint,
        inverse: _this.props.inverse,
        name: name,
        path: _this.props.iconPath,
        position: _this.props.iconPosition,
        size: iconSize
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderLabel", function () {
      var iconOnly = _this.props.iconName || _this.props.iconPath;
      var assistiveTextIcon = typeof _this.props.assistiveText === 'string' ? _this.props.assistiveText : _objectSpread(_objectSpread({}, defaultProps.assistiveText), _this.props.assistiveText).icon;
      return iconOnly && assistiveTextIcon ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveTextIcon) : _this.props.label;
    });

    _defineProperty(_assertThisInitialized(_this), "renderButton", function () {
      var ariaProps = (0, _getAriaProps.default)(_this.props);
      var dataProps = (0, _getDataProps.default)(_this.props);
      var formProps = (0, _getFormProps.default)(_this.props);
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/button-has-type
        _react.default.createElement("button", _extends({
          className: _this.getClassName(),
          disabled: _this.props.disabled,
          id: _this.props.id,
          onBlur: _this.props.onBlur,
          onClick: _this.handleClick,
          onFocus: _this.props.onFocus,
          onKeyDown: _this.props.onKeyDown,
          onKeyPress: _this.props.onKeyPress,
          onKeyUp: _this.props.onKeyUp,
          onMouseDown: _this.props.onMouseDown,
          onMouseEnter: _this.props.onMouseEnter,
          onMouseLeave: _this.props.onMouseLeave,
          onMouseUp: _this.props.onMouseUp,
          ref: function ref(component) {
            if (_this.props.buttonRef) {
              _this.props.buttonRef(component);
            }

            if (component && _this.props.requestFocus && _this.props.onRequestFocus) {
              _this.props.onRequestFocus(component);
            }
          },
          tabIndex: _this.props.tabIndex,
          title: _this.props.title // eslint-disable-next-line react/button-has-type
          ,
          type: _this.props.type || 'button',
          style: _this.props.style
        }, ariaProps, dataProps, formProps), _this.props.iconPosition === 'right' ? _this.renderLabel() : null, _this.props.iconName || _this.props.iconPath ? _this.renderIcon(_this.props.iconName) : null, _this.props.iconVariant === 'more' ? /*#__PURE__*/_react.default.createElement(_buttonIcon.default, {
          category: "utility",
          name: "down",
          size: "x-small",
          className: _this.props.iconClassName
        }) : null, _this.props.iconPosition === 'left' || !_this.props.iconPosition ? _this.renderLabel() : null, _this.props.children // eslint-disable-line react/prop-types
        )
      );
    });

    _defineProperty(_assertThisInitialized(_this), "renderTooltip", function () {
      return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        content: _this.props.tooltip
      }, _this.renderButton);
    });

    (0, _checkProps.default)(_constants.BUTTON, props, _component.default);
    return _this;
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      return this.props.tooltip ? this.renderTooltip() : this.renderButton();
    }
  }]);

  return Button;
}(_react.default.Component);

_defineProperty(Button, "displayName", _constants.BUTTON);

_defineProperty(Button, "propTypes", {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
   */
  assistiveText: _propTypes.default.shape({
    icon: _propTypes.default.string
  }),

  /**
   * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
   */
  buttonRef: _propTypes.default.func,

  /**
   * CSS classes to be added to button.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Disables the button and adds disabled styling.
   */
  disabled: _propTypes.default.bool,

  /**
   * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
   */
  hint: _propTypes.default.bool,

  /**
   * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
   */
  iconCategory: (0, _reactRequiredIf.default)(_propTypes.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']), function (props) {
    return !!props.iconName;
  }),

  /**
   * CSS classes to be added to icon.
   */
  iconClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: _propTypes.default.string,

  /**
   * Path to the icon. This will override any global icon settings.
   */
  iconPath: _propTypes.default.string,

  /**
   * If omitted, icon position is centered.
   */
  iconPosition: _propTypes.default.oneOf(['left', 'right']),

  /**
   * Determines the size of the icon.
   */
  iconSize: _propTypes.default.oneOf(['x-small', 'small', 'medium', 'large']),

  /**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
  iconVariant: _propTypes.default.oneOf(['bare', 'container', 'border', 'border-filled', 'brand', 'more', 'global-header']),

  /**
   * Id string applied to button node.
   */
  id: _propTypes.default.string,

  /**
   * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
   */
  inverse: _propTypes.default.bool,

  /**
   * Visible label on the button. If the button is an icon button with no label, you must use the <code>assistiveText.icon</code> prop.
   */
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * Triggered when focus is removed.
   */
  onBlur: _propTypes.default.func,

  /**
   * Triggered when the button is clicked.
   */
  onClick: _propTypes.default.func,

  /**
   * Triggered when component is focused.
   */
  onFocus: _propTypes.default.func,

  /**
   * Triggered when a key is pressed down
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Triggered when a key is pressed and released
   */
  onKeyPress: _propTypes.default.func,

  /**
   * Triggered when a key is released
   */
  onKeyUp: _propTypes.default.func,

  /**
   * Triggered when a mouse button is pressed down
   */
  onMouseDown: _propTypes.default.func,

  /**
   * Triggered when a mouse arrow hovers
   */
  onMouseEnter: _propTypes.default.func,

  /**
   * Triggered when a mouse arrow no longer hovers
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * Triggered when a mouse button is released
   */
  onMouseUp: _propTypes.default.func,

  /**
   * Triggered to indicate that this component should receive focus.
   */
  onRequestFocus: _propTypes.default.func,

  /**
   * If true, will trigger `onRequestFocus`.
   */
  requestFocus: _propTypes.default.bool,

  /**
   * If true, button scales to 100% width on small form factors.
   */
  responsive: _propTypes.default.bool,

  /**
   * Write <code>"-1"</code> if you don't want the user to tab to the button.
   */
  tabIndex: _propTypes.default.string,

  /**
   * Button type
   */
  type: _propTypes.default.oneOf(['reset', 'submit', 'button']),

  /**
   * HTML title attribute
   */
  title: _propTypes.default.string,

  /**
   * [Deprecated] Tooltip on button. Button should be a child of `Tooltip` instead.
   */
  tooltip: _propTypes.default.node,

  /**
   * Different types of buttons
   */
  variant: _propTypes.default.oneOf(['base', 'link', 'neutral', 'brand', 'outline-brand', 'destructive', 'success', 'text-destructive', 'icon']),

  /**
   * Custom styles to be passed to the component
   */
  style: _propTypes.default.object
});

_defineProperty(Button, "defaultProps", defaultProps);

var _default = Button;
exports.default = _default;