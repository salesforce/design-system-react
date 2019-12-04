"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _buttonIcon = _interopRequireDefault(require("../icon/button-icon"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   * Specifies the current state of the button. If set, the button will act as a ['controlled' component](https://facebook.github.io/react/docs/forms.html#controlled-components).
   */
  active: _propTypes.default.bool,

  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. This should also include the state of the button. If the button has an icon and a visible label, you can omit the <code>icon</code> prop and use the <code>label</code> prop.
   */
  assistiveText: _propTypes.default.shape({
    icon: _propTypes.default.string
  }),

  /**
   * Disables the button and adds disabled styling.
   */
  disabled: _propTypes.default.bool,

  /**
   * Icon associated with the stateful button. Accepts an `Icon` component
   */
  icon: _propTypes.default.node,

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
   * If true, button scales to 100% width on small form factors.
   */
  responsive: _propTypes.default.bool,

  /**
   * Initial label and icon (optional) of button.
   */
  stateOne: _propTypes.default.object,

  /**
   * Selected label and icon (optional) of button.
   */
  stateTwo: _propTypes.default.object,

  /**
   * Deselect label and icon (optional) of button.
   */
  stateThree: _propTypes.default.object,

  /**
   * Write "-1" if you don't want the user to tab to the button.
   */
  tabIndex: _propTypes.default.string,

  /**
   * Different types of buttons
   */
  variant: _propTypes.default.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon', 'icon-filled'])
}; // i18n

var defaultProps = {
  assistiveText: {
    icon: ''
  },
  disabled: false,
  iconSize: 'medium',
  responsive: false,
  stateOne: {
    iconName: 'add',
    label: 'Follow'
  },
  stateTwo: {
    iconName: 'check',
    label: 'Following'
  },
  stateThree: {
    iconName: 'close',
    label: 'Unfollow'
  }
};
/**
 * The ButtonStateful component is a variant of the Lightning Design System Button component. It is used for buttons that have a state of unselected or selected.
 * For icon buttons, use <code>variant='icon'</code>. For buttons with labels or buttons with labels and icons, pass data to the state props (ie. <code>stateOne={{iconName: 'add', label: 'Join'}}</code>).
 */

var ButtonStateful =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ButtonStateful, _React$Component);

  function ButtonStateful(props) {
    var _this;

    _classCallCheck(this, ButtonStateful);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ButtonStateful).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (e) {
      if (_this.props.onBlur) _this.props.onBlur(e);
      e.currentTarget.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      if ((0, _lodash.default)(_this.props.onClick)) _this.props.onClick(e);

      if (typeof _this.props.active !== 'boolean') {
        _this.setState(function (prevState) {
          return {
            active: !prevState.active
          };
        });
      }
    });

    _this.state = {
      active: false
    };
    (0, _checkProps.default)(_constants.BUTTON_STATEFUL, props, _component.default);
    return _this;
  }

  _createClass(ButtonStateful, [{
    key: "getClassName",
    value: function getClassName(active) {
      return (0, _classnames.default)(this.props.className, 'slds-button', {
        'slds-button_neutral': this.props.variant !== 'icon' && this.props.variant !== 'icon-filled',
        'slds-button_inverse': this.props.variant === 'inverse',
        'slds-not-selected': !active,
        'slds-is-selected': active,
        'slds-max-small-button_stretch': this.props.responsive,
        'slds-button_icon-border': this.props.variant === 'icon',
        'slds-button_icon-border-filled': this.props.variant === 'icon-filled'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          disabled = _this$props.disabled,
          icon = _this$props.icon,
          iconName = _this$props.iconName,
          iconSize = _this$props.iconSize,
          id = _this$props.id,
          onFocus = _this$props.onFocus,
          onKeyDown = _this$props.onKeyDown,
          onKeyPress = _this$props.onKeyPress,
          onKeyUp = _this$props.onKeyUp,
          onMouseDown = _this$props.onMouseDown,
          onMouseEnter = _this$props.onMouseEnter,
          stateOne = _this$props.stateOne,
          stateTwo = _this$props.stateTwo,
          stateThree = _this$props.stateThree,
          tabIndex = _this$props.tabIndex,
          variant = _this$props.variant;
      var defaultIconProps = {
        disabled: disabled,
        size: 'small',
        className: 'slds-button__icon_stateful'
      };
      var iconAssistiveText = typeof this.props.assistiveText === 'string' ? this.props.assistiveText : _objectSpread({}, defaultProps.assistiveText, this.props.assistiveText).icon;
      var isActive = typeof active === 'boolean' ? active : this.state.active;

      if (variant === 'icon' || variant === 'icon-filled') {
        return _react.default.createElement("button", {
          "aria-live": "polite",
          className: this.getClassName(isActive),
          disabled: disabled,
          id: id,
          onBlur: this.handleBlur,
          onClick: this.handleClick,
          onFocus: onFocus,
          onKeyDown: onKeyDown,
          onKeyPress: onKeyPress,
          onKeyUp: onKeyUp,
          onMouseDown: onMouseDown,
          onMouseEnter: onMouseEnter,
          onMouseLeave: this.handleBlur,
          tabIndex: tabIndex,
          type: "button"
        }, icon ? _react.default.cloneElement(icon, _objectSpread({}, defaultIconProps, icon.props)) : _react.default.createElement(_buttonIcon.default, {
          disabled: disabled,
          name: iconName,
          size: iconSize,
          className: "slds-button__icon_stateful"
        }), iconAssistiveText ? _react.default.createElement("span", {
          className: "slds-assistive-text"
        }, iconAssistiveText) : null);
      }

      defaultIconProps.position = 'left';
      return _react.default.createElement("button", {
        "aria-live": "assertive",
        className: this.getClassName(isActive),
        disabled: disabled,
        id: id,
        onBlur: this.handleBlur,
        onClick: this.handleClick,
        onFocus: onFocus,
        onKeyDown: onKeyDown,
        onKeyPress: onKeyPress,
        onKeyUp: onKeyUp,
        onMouseEnter: onMouseEnter,
        onMouseLeave: this.handleBlur,
        tabIndex: tabIndex,
        type: "button"
      }, _react.default.createElement("span", {
        className: "slds-text-not-selected"
      }, stateOne.icon ? _react.default.cloneElement(stateOne.icon, _objectSpread({}, defaultIconProps, stateOne.icon.props, {
        size: 'small'
      })) : _react.default.createElement(_buttonIcon.default, {
        disabled: disabled,
        name: stateOne.iconName,
        size: "small",
        position: "left",
        className: "slds-button__icon_stateful"
      }), stateOne.label), _react.default.createElement("span", {
        className: "slds-text-selected"
      }, stateTwo.icon ? _react.default.cloneElement(stateTwo.icon, _objectSpread({}, defaultIconProps, stateTwo.icon.props, {
        size: 'small'
      })) : _react.default.createElement(_buttonIcon.default, {
        disabled: disabled,
        name: stateTwo.iconName,
        size: "small",
        position: "left",
        className: "slds-button__icon_stateful"
      }), stateTwo.label), _react.default.createElement("span", {
        className: "slds-text-selected-focus"
      }, stateThree.icon ? _react.default.cloneElement(stateThree.icon, _objectSpread({}, defaultIconProps, stateThree.icon.props, {
        size: 'small'
      })) : _react.default.createElement(_buttonIcon.default, {
        disabled: disabled,
        name: stateThree.iconName,
        size: "small",
        position: "left",
        className: "slds-button__icon_stateful"
      }), stateThree.label));
    }
  }]);

  return ButtonStateful;
}(_react.default.Component);

ButtonStateful.displayName = _constants.BUTTON_STATEFUL;
ButtonStateful.propTypes = propTypes;
ButtonStateful.defaultProps = defaultProps;
var _default = ButtonStateful;
exports.default = _default;