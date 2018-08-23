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

var _lodash = require("lodash.isboolean");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.isfunction");

var _lodash4 = _interopRequireDefault(_lodash3);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _buttonIcon = require("../icon/button-icon");

var _buttonIcon2 = _interopRequireDefault(_buttonIcon);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var propTypes = {
  /**
   * Specifies the current state of the button. If set, the button will act as a ['controlled' component](https://facebook.github.io/react/docs/forms.html#controlled-components).
   */
  active: _propTypes2.default.bool,

  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. This should also include the state of the button. If the button has an icon and a visible label, you can omit the <code>icon</code> prop and use the <code>label</code> prop.
   */
  assistiveText: _propTypes2.default.shape({
    icon: _propTypes2.default.string
  }),

  /**
   * Disables the button and adds disabled styling.
   */
  disabled: _propTypes2.default.bool,

  /**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
  iconName: _propTypes2.default.string,

  /**
   * Determines the size of the icon.
   */
  iconSize: _propTypes2.default.oneOf(['x-small', 'small', 'medium', 'large']),

  /**
   * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
   */
  inverse: _propTypes2.default.bool,

  /**
   * Triggered when focus is removed.
   */
  onBlur: _propTypes2.default.func,

  /**
   * Triggered when the button is clicked.
   */
  onClick: _propTypes2.default.func,

  /**
   * Triggered when component is focused.
   */
  onFocus: _propTypes2.default.func,

  /**
   * Triggered when a key is pressed down
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * Triggered when a key is pressed and released
   */
  onKeyPress: _propTypes2.default.func,

  /**
   * Triggered when a key is released
   */
  onKeyUp: _propTypes2.default.func,

  /**
   * Triggered when a mouse button is pressed down
   */
  onMouseDown: _propTypes2.default.func,

  /**
   * Triggered when a mouse arrow hovers
   */
  onMouseEnter: _propTypes2.default.func,

  /**
   * Triggered when a mouse arrow no longer hovers
   */
  onMouseLeave: _propTypes2.default.func,

  /**
   * If true, button scales to 100% width on small form factors.
   */
  responsive: _propTypes2.default.bool,

  /**
   * Initial label and icon (optional) of button.
   */
  stateOne: _propTypes2.default.object,

  /**
   * Selected label and icon (optional) of button.
   */
  stateTwo: _propTypes2.default.object,

  /**
   * Deselect label and icon (optional) of button.
   */
  stateThree: _propTypes2.default.object,

  /**
   * Write "-1" if you don't want the user to tab to the button.
   */
  tabIndex: _propTypes2.default.string,

  /**
   * [Deprecated] Tooltip on button. Button should be a child of `Tooltip` instead.
   */
  tooltip: _propTypes2.default.node,

  /**
   * Different types of buttons
   */
  variant: _propTypes2.default.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon'])
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

    _this = _possibleConstructorReturn(this, (ButtonStateful.__proto__ || Object.getPrototypeOf(ButtonStateful)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "handleBlur", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        if (_this.props.onBlur) _this.props.onBlur(e);
        e.currentTarget.blur();
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        if ((0, _lodash4.default)(_this.props.onClick)) _this.props.onClick(e);

        if (!(0, _lodash2.default)(_this.props.active)) {
          _this.setState({
            active: !_this.state.active
          });
        }
      }
    });
    _this.state = {
      active: false
    };
    return _this;
  }

  _createClass(ButtonStateful, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _checkProps2.default)(_constants.BUTTON_STATEFUL, this.props);
    }
  }, {
    key: "getClassName",
    value: function getClassName(active) {
      return (0, _classnames2.default)(this.props.className, 'slds-button', {
        'slds-button--neutral': this.props.variant !== 'icon',
        'slds-button--inverse': this.props.variant === 'inverse',
        'slds-not-selected': !active,
        'slds-is-selected': active,
        'slds-max-small-button--stretch': this.props.responsive,
        'slds-button--icon-border': this.props.variant === 'icon'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          active = _props.active,
          disabled = _props.disabled,
          iconName = _props.iconName,
          iconSize = _props.iconSize,
          id = _props.id,
          onFocus = _props.onFocus,
          onKeyDown = _props.onKeyDown,
          onKeyPress = _props.onKeyPress,
          onKeyUp = _props.onKeyUp,
          onMouseDown = _props.onMouseDown,
          onMouseEnter = _props.onMouseEnter,
          stateOne = _props.stateOne,
          stateTwo = _props.stateTwo,
          stateThree = _props.stateThree,
          tabIndex = _props.tabIndex,
          variant = _props.variant;
      var iconAssistiveText = typeof this.props.assistiveText === 'string' ? this.props.assistiveText : _objectSpread({}, defaultProps.assistiveText, this.props.assistiveText).icon;
      var isActive = (0, _lodash2.default)(active) ? active : this.state.active;

      if (variant === 'icon') {
        return _react2.default.createElement("button", {
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
          tabIndex: tabIndex
        }, _react2.default.createElement(_buttonIcon2.default, {
          disabled: disabled,
          name: iconName,
          size: iconSize,
          className: "slds-button__icon--stateful"
        }), iconAssistiveText ? _react2.default.createElement("span", {
          className: "slds-assistive-text"
        }, iconAssistiveText) : null);
      }

      return _react2.default.createElement("button", {
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
        tabIndex: tabIndex
      }, _react2.default.createElement("span", {
        className: "slds-text-not-selected"
      }, _react2.default.createElement(_buttonIcon2.default, {
        disabled: disabled,
        name: stateOne.iconName,
        size: "small",
        position: "left",
        className: "slds-button__icon--stateful"
      }), stateOne.label), _react2.default.createElement("span", {
        className: "slds-text-selected"
      }, _react2.default.createElement(_buttonIcon2.default, {
        disabled: disabled,
        name: stateTwo.iconName,
        size: "small",
        position: "left",
        className: "slds-button__icon--stateful"
      }), stateTwo.label), _react2.default.createElement("span", {
        className: "slds-text-selected-focus"
      }, _react2.default.createElement(_buttonIcon2.default, {
        disabled: disabled,
        name: stateThree.iconName,
        size: "small",
        position: "left",
        className: "slds-button__icon--stateful"
      }), stateThree.label));
    }
  }]);

  return ButtonStateful;
}(_react2.default.Component);

ButtonStateful.displayName = _constants.BUTTON_STATEFUL;
ButtonStateful.propTypes = propTypes;
ButtonStateful.defaultProps = defaultProps;
exports.default = ButtonStateful;