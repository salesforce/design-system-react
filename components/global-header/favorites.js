"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _classnames = _interopRequireDefault(require("classnames"));

var _button = _interopRequireDefault(require("../button"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _popover = _interopRequireDefault(require("../popover"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `action`: Description of star button. Default is "Toggle Favorite."
   * * `more`: Description of dropdown menu. Default is "View Favorites."
   */
  assistiveText: _propTypes.default.shape({
    action: _propTypes.default.string,
    more: _propTypes.default.string
  }),

  /**
   * Disables the favorites action (star) button and not the related Popover."
   */
  actionDisabled: _propTypes.default.bool,

  /**
   * Controls whether the favorites action (star) button is selected or not
   */
  actionSelected: _propTypes.default.bool,

  /**
   * This event fires when the favorites action (star) button is toggled. Passes in `event, { actionSelected }`.
   */
  onToggleActionSelected: _propTypes.default.func,

  /**
   * A `Popover` component applied to the favorites more button. The props from this popover will be merged and override any default props. The `children` prop will be ignored.
   */
  popover: _propTypes.default.node
};
/**
 * A GlobalHeaderFavorites component. The favorites action is used to "favorite" a commonly used page within a user's experience. When a user "favorites" a page by pressing the favorites action, the button icon changes color with a small animation to confirm your selection.
 */

var GlobalHeaderFavorites = /*#__PURE__*/function (_React$Component) {
  _inherits(GlobalHeaderFavorites, _React$Component);

  var _super = _createSuper(GlobalHeaderFavorites);

  function GlobalHeaderFavorites() {
    var _this;

    _classCallCheck(this, GlobalHeaderFavorites);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "toggleActionSelected", function (event) {
      if (_this.props.onToggleActionSelected) {
        _this.props.onToggleActionSelected(event, {
          actionSelected: _this.props.actionSelected || false
        });
      }
    });

    return _this;
  }

  _createClass(GlobalHeaderFavorites, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var actionAriaProps = {};
      var popoverProps = (0, _lodash.default)({
        align: 'bottom',
        body: /*#__PURE__*/_react.default.createElement("span", null),
        triggerClassName: 'slds-dropdown-trigger slds-dropdown-trigger_click'
      }, this.props.popover ? this.props.popover.props : {}); // eslint-disable-next-line fp/no-delete

      delete popoverProps.children;

      if (this.props.actionSelected) {
        actionAriaProps['aria-pressed'] = true;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-global-actions__favorites slds-dropdown-trigger slds-dropdown-trigger_click"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-button-group"
      }, /*#__PURE__*/_react.default.createElement(_button.default, _extends({
        assistiveText: {
          icon: this.props.assistiveText.action
        },
        className: (0, _classnames.default)('slds-button_icon slds-global-actions__favorites-action', {
          'slds-is-disabled': this.props.actionDisabled,
          'slds-is-selected': this.props.actionSelected
        }),
        disabled: this.props.actionDisabled,
        iconCategory: "utility",
        iconName: "favorite",
        iconSize: "small",
        iconVariant: "border",
        onClick: this.toggleActionSelected,
        onKeyDown: function onKeyDown(event) {
          if (event.keyCode === _keyCode.default.ENTER) {
            _event.default.trapImmediate(event);

            _this2.toggleActionSelected(event);
          }
        },
        title: this.props.assistiveText.action,
        variant: "icon"
      }, actionAriaProps)), /*#__PURE__*/_react.default.createElement(_popover.default, popoverProps, /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: this.props.assistiveText.more
        },
        className: "slds-button_icon slds-global-actions__favorites-more",
        iconCategory: "utility",
        iconName: "down",
        iconSize: "small",
        iconVariant: "border",
        style: {
          // this is needed because the popover trigger wrapper janks up the default styles
          borderLeft: '0',
          borderRadius: '0 .25rem .25rem 0'
        },
        title: this.props.assistiveText.more,
        variant: "icon"
      }))));
    }
  }]);

  return GlobalHeaderFavorites;
}(_react.default.Component);

GlobalHeaderFavorites.displayName = _constants.GLOBAL_HEADER_FAVORITES;
GlobalHeaderFavorites.defaultProps = {
  assistiveText: {
    action: 'Toggle Favorite',
    more: 'View Favorites'
  }
};
GlobalHeaderFavorites.propTypes = propTypes;
var _default = GlobalHeaderFavorites;
exports.default = _default;