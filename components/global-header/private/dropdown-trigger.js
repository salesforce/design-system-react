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

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
 */
var GlobalHeaderDropdownTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GlobalHeaderDropdownTrigger, _React$Component);

  function GlobalHeaderDropdownTrigger() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, GlobalHeaderDropdownTrigger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = GlobalHeaderDropdownTrigger.__proto__ || Object.getPrototypeOf(GlobalHeaderDropdownTrigger)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "renderAvatar", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var avatar = _this.props.avatar;

        if (typeof avatar === 'string') {
          return _react2.default.createElement("span", {
            className: "slds-avatar slds-avatar_circle slds-avatar_medium"
          }, _react2.default.createElement("img", {
            src: avatar,
            alt: ""
          }));
        }

        return avatar || null;
      }
    }), _temp));
  }

  _createClass(GlobalHeaderDropdownTrigger, [{
    key: "render",
    // ### Render
    value: function render() {
      // The following props are provided to the `li`, all others are passed into the `Button`
      var _props = this.props,
          className = _props.className,
          id = _props.id,
          isOpen = _props.isOpen,
          globalAction = _props.globalAction,
          menu = _props.menu,
          onBlur = _props.onBlur,
          onClick = _props.onClick,
          onFocus = _props.onFocus,
          onKeyDown = _props.onKeyDown,
          onMouseDown = _props.onMouseDown,
          onMouseEnter = _props.onMouseEnter,
          onMouseLeave = _props.onMouseLeave,
          triggerRef = _props.triggerRef,
          rest = _objectWithoutProperties(_props, ["className", "id", "isOpen", "globalAction", "menu", "onBlur", "onClick", "onFocus", "onKeyDown", "onMouseDown", "onMouseEnter", "onMouseLeave", "triggerRef"]);

      return (
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        _react2.default.createElement("li", {
          "aria-haspopup": "true",
          className: (0, _classnames2.default)('slds-dropdown-trigger slds-dropdown-trigger_click', {
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
        }, _react2.default.createElement(_button2.default, _extends({
          className: (0, _classnames2.default)({
            'slds-global-header__button_icon-actions': globalAction
          }),
          iconClassName: (0, _classnames2.default)({
            'slds-global-header__icon-actions': globalAction
          }),
          "aria-haspopup": "true",
          buttonVariant: "dropdown"
        }, rest), this.renderAvatar()), menu)
      );
    }
  }]);

  return GlobalHeaderDropdownTrigger;
}(_react2.default.Component);

Object.defineProperty(GlobalHeaderDropdownTrigger, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.MENU_DROPDOWN_TRIGGER
});
Object.defineProperty(GlobalHeaderDropdownTrigger, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * An image URL or avatar node to display for the user profile.
     */
    avatar: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),

    /**
     * CSS classes to be added to `li` element.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
     */
    id: _propTypes2.default.string,

    /**
     * Informs the trigger on the open/close state of the dropdown menu
     */
    isOpen: _propTypes2.default.bool,

    /**
     * Adds custom styling such as inverse fill and special sizing/spacing
     */
    globalAction: _propTypes2.default.bool,

    /**
     * The dropdown menu.
     */
    menu: _propTypes2.default.node,

    /**
     * Is only called when `openOn` is set to `hover` and when the triggering li loses focus.
     */
    onBlur: _propTypes2.default.func,

    /**
     * This prop is passed onto the triggering `li`. Triggered when the trigger li is clicked.
     */
    onClick: _propTypes2.default.func,

    /**
     * Is only called when `openOn` is set to `hover` and when the triggering li gains focus.
     */
    onFocus: _propTypes2.default.func,

    /**
     * Called when a key pressed.
     */
    onKeyDown: _propTypes2.default.func,

    /**
     * Called when mouse clicks down on the trigger li.
     */
    onMouseDown: _propTypes2.default.func,

    /**
     * Called when mouse hovers over the trigger `li`.
     */
    onMouseEnter: _propTypes2.default.func,

    /**
     * Called when mouse leaves trigger `li` or the menu.
     */
    onMouseLeave: _propTypes2.default.func,

    /**
     * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
     */
    openOn: _propTypes2.default.oneOf(['hover', 'click', 'hybrid']),

    /**
     * Set to true if menu is inline and relatively positioned with CSS. This is the typical use case for menus with nubbins.
     */
    positioned: _propTypes2.default.bool,

    /**
     * The ref of the actual triggering button.
     */
    triggerRef: _propTypes2.default.func
  }
});
exports.default = GlobalHeaderDropdownTrigger;