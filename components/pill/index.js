"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../utilities/constants");

var _utilityIcon = _interopRequireDefault(require("../utilities/utility-icon"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _event = _interopRequireDefault(require("../../utilities/event"));

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

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `remove`: This is a visually hidden label for the close button.
   * _Tested with snapshot testing._
   */
  assistiveText: _propTypes.default.shape({
    remove: _propTypes.default.string
  }),

  /**
   * SLDSAvatar component to show on the left of the pill.
   * _Tested with Mocha framework._
   */
  avatar: _propTypes.default.element,

  /**
   * Applies the bare style to the component.
   * _Tested with Mocha framework._
   */
  bare: _propTypes.default.bool,

  /**
   * This is a way to specify custom contents for the pill in the case a simple text label is not enough.
   * _Tested with Mocha framework._
   */
  children: _propTypes.default.node,

  /**
   * CSS classes to be added to tag with `.slds-pill`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   * _Tested with Mocha framework._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Applies the error style to the component.
   * _Tested with Mocha framework._
   */
  hasError: _propTypes.default.bool,

  /**
   * An href to use if the pill is shown as a link.
   * _Tested with Mocha framework._
   */
  href: _propTypes.default.string,

  /**
   * SLDSIcon component to show on the left of the pill.
   * _Tested with Mocha framework._
   */
  icon: _propTypes.default.element,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `label`: Pill's label.
   * * `title`: Pill's title.
   * * `removeTitle`: A title to use for the remove icon.
   *
   * _Tested with snapshot testing._
   */
  labels: _propTypes.default.shape({
    label: _propTypes.default.string,
    title: _propTypes.default.string,
    removeTitle: _propTypes.default.string
  }),

  /**
   * `onBlur` callback executes when the component loses focus.
   * _Tested with Mocha framework._
   */
  onBlur: _propTypes.default.func,

  /**
   * `onClick` callback executes when a user clicks on the pill or presses the Enter key.
   * _Tested with Mocha framework._
   */
  onClick: _propTypes.default.func,

  /**
   * `onFocus` callback executes when the component receives focus.
   * _Tested with Mocha framework._
   */
  onFocus: _propTypes.default.func,

  /**
   * `onKeyDown` callback executes when a user presses a key.
   * _Tested with Mocha framework._
   */
  onKeyDown: _propTypes.default.func,

  /**
   * `onRemove` callback executes when a user clicks on the pill's remove icon or presses the delete or the backspace keys.
   * _Tested with Mocha framework._
   */
  onRemove: _propTypes.default.func,

  /**
   * A variant of a pill
   * _Tested with Mocha framework._
   */
  variant: _propTypes.default.oneOf(['link', 'option'])
};
/**
 * A pill displays a label that can contain links and can be removed from view. Use `PillContainer` for a list of pills in a container that resembles an `input` form field. A pill is useful for displaying read-only text that can be added and removed on demand.
 */

var Pill = /*#__PURE__*/function (_React$Component) {
  _inherits(Pill, _React$Component);

  var _super = _createSuper(Pill);

  function Pill() {
    var _this;

    _classCallCheck(this, Pill);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "getHref", function () {
      return typeof _this.props.href === 'string' ? _this.props.href : '#';
    });

    _defineProperty(_assertThisInitialized(_this), "blur", function () {
      _this.root.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      _this.root.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      if (typeof _this.props.onKeyDown === 'function') {
        var _this$props$onKeyDown;

        for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }

        // Make a callback to onKeyDown.
        (_this$props$onKeyDown = _this.props.onKeyDown).call.apply(_this$props$onKeyDown, [null, event].concat(rest)); // Cancel further handling if the default handling for the event was prevented.


        if (event.defaultPrevented) {
          return;
        }
      }

      switch (event.keyCode) {
        case _keyCode.default.ENTER:
          if (typeof _this.props.onClick === 'function') {
            _event.default.trap(event);

            _this.props.onClick();
          }

          break;

        case _keyCode.default.BACKSPACE:
        case _keyCode.default.DELETE:
          if (typeof _this.props.onRemove === 'function') {
            _event.default.trap(event);

            _this.props.onRemove();
          }

          break;

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRef", function (root) {
      // Keeping the top-most element to support focus() and blur()
      _this.root = root;
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnClick", function (event) {
      if (_this.getHref() === '#') {
        event.preventDefault();
      }

      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "restProps", function () {
      var _this$props = _this.props,
          bare = _this$props.bare,
          hasError = _this$props.hasError,
          variant = _this$props.variant,
          className = _this$props.className,
          onClick = _this$props.onClick,
          onRemove = _this$props.onRemove,
          labels = _this$props.labels,
          assistiveText = _this$props.assistiveText,
          children = _this$props.children,
          href = _this$props.href,
          icon = _this$props.icon,
          avatar = _this$props.avatar,
          onKeyDown = _this$props.onKeyDown,
          other = _objectWithoutProperties(_this$props, ["bare", "hasError", "variant", "className", "onClick", "onRemove", "labels", "assistiveText", "children", "href", "icon", "avatar", "onKeyDown"]);

      return other;
    });

    _defineProperty(_assertThisInitialized(_this), "renderIcon", function () {
      var icon = _this.props.icon || _this.props.avatar;

      if (icon) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-pill__icon_container"
        }, icon);
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderLabel", function () {
      if (_this.props.labels.label) {
        if (_this.props.variant === 'link') {
          return /*#__PURE__*/_react.default.createElement("a", {
            href: _this.getHref(),
            className: "slds-pill__action",
            title: _this.props.labels.title || _this.props.labels.label,
            onClick: _this.handleOnClick
          }, /*#__PURE__*/_react.default.createElement("span", {
            className: "slds-pill__label"
          }, _this.props.labels.label));
        }

        return /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-pill__label",
          title: _this.props.labels.title || _this.props.labels.label
        }, _this.props.labels.label);
      }

      return _this.props.children;
    });

    _defineProperty(_assertThisInitialized(_this), "renderRemoveIcon", function () {
      if (typeof _this.props.onRemove === 'function') {
        return /*#__PURE__*/_react.default.createElement("span", {
          // eslint-disable-line jsx-a11y/interactive-supports-focus
          className: "slds-icon_container slds-pill__remove",
          title: _this.props.labels.removeTitle,
          role: "button",
          onClick: _this.props.onRemove
        }, /*#__PURE__*/_react.default.createElement(_utilityIcon.default, {
          style: {
            cursor: 'pointer'
          } // remove when fixed by SLDS CSS
          ,
          category: "utility",
          className: "slds-icon slds-icon_x-small slds-icon-text-default",
          name: "close"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-assistive-text"
        }, _this.props.assistiveText.remove || _this.props.labels.removeTitle));
      }

      return null;
    });

    return _this;
  }

  _createClass(Pill, [{
    key: "render",
    value: function render() {
      var role;

      switch (this.props.variant) {
        case 'link':
          role = 'button';
          break;

        case 'option':
          role = 'option';
          break;

        default:
      }

      return (
        /*#__PURE__*/

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        _react.default.createElement("span", _extends({}, this.restProps(), {
          role: role,
          className: (0, _classnames.default)('slds-pill', {
            'slds-pill_link': this.props.variant === 'link',
            'slds-has-error': this.props.hasError,
            'slds-pill_bare': this.props.bare
          }, this.props.className),
          onClick: !this.props.labels.label || this.props.variant !== 'link' ? this.props.onClick : null,
          onKeyDown: typeof this.props.onRemove === 'function' ? this.handleKeyDown : null,
          ref: this.handleRef
        }), this.renderIcon(), this.renderLabel(), this.renderRemoveIcon())
      );
    }
  }]);

  return Pill;
}(_react.default.Component);

Pill.displayName = _constants.PILL;
Pill.defaultProps = {
  variant: 'link',
  labels: {},
  assistiveText: {}
};
Pill.propTypes = propTypes;
var _default = Pill;
exports.default = _default;