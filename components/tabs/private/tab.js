"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../../utilities/constants");

var _icon = _interopRequireDefault(require("../../icon"));

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

/*
 * Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler.
 */
// import '!style-loader!css-loader!../../../styles/tabs/tab.css'; // eslint-disable-line import/no-unresolved
var Tab = /*#__PURE__*/function (_React$Component) {
  _inherits(Tab, _React$Component);

  var _super = _createSuper(Tab);

  function Tab() {
    var _this;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "checkFocus", function () {
      if (_this.props.selected && _this.props.focus && _this.node) {
        _this.node.focus();
      }
    });

    return _this;
  }

  _createClass(Tab, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkFocus();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.checkFocus();
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames,
          _classNames2,
          _this2 = this;

      var _this$props = this.props,
          selected = _this$props.selected,
          disabled = _this$props.disabled,
          panelId = _this$props.panelId,
          activeTabClassName = _this$props.activeTabClassName,
          disabledTabClassName = _this$props.disabledTabClassName,
          className = _this$props.className,
          children = _this$props.children,
          id = _this$props.id,
          variant = _this$props.variant,
          hasError = _this$props.hasError;
      var tabIndex;
      /**
       * Desired a11y behaviour: The active Tab should get focus when the user presses the
       * Tab key. After that, Arrow keys should be used to change the focus from one tab
       * to another. Pressing the Tab key one more time should move the focus away from the
       * Tab group.
       *
       * Here, we put the selected Tab in the navigation path (tabIndex = 0) and remove other
       * tabs from navigation path (tabIndex = -1).
       */

      if (selected) {
        tabIndex = '0';
      } else {
        tabIndex = '-1';
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        className: (0, _classnames.default)(className, (_classNames = {}, _defineProperty(_classNames, activeTabClassName, selected), _defineProperty(_classNames, disabledTabClassName, disabled), _defineProperty(_classNames, 'slds-tabs_default__item', variant === 'default'), _defineProperty(_classNames, 'slds-tabs_scoped__item', variant === 'scoped'), _defineProperty(_classNames, 'slds-vertical-tabs__nav-item', variant === 'vertical'), _classNames)),
        role: "presentation",
        id: id,
        title: typeof children === 'string' ? children : null
      }, /*#__PURE__*/_react.default.createElement("a", {
        className: (0, _classnames.default)((_classNames2 = {}, _defineProperty(_classNames2, activeTabClassName, selected), _defineProperty(_classNames2, disabledTabClassName, disabled), _defineProperty(_classNames2, 'slds-tabs_default__link', variant === 'default'), _defineProperty(_classNames2, 'slds-tabs_scoped__link', variant === 'scoped'), _defineProperty(_classNames2, 'slds-vertical-tabs__link', variant === 'vertical'), _classNames2)),
        href: "#",
        role: "tab",
        ref: function ref(node) {
          _this2.node = node;
        },
        tabIndex: tabIndex,
        "aria-controls": panelId,
        "aria-disabled": disabled,
        "aria-selected": selected ? 'true' : 'false',
        onClick: function onClick(event) {
          return event.preventDefault();
        }
      }, children, hasError && /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames.default)({
          'slds-tabs__right-icon': variant !== 'vertical',
          'slds-vertical-tabs__right-icon': variant === 'vertical'
        })
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        assistiveText: {
          label: this.props.assistiveText.withErrorIcon
        },
        category: "utility",
        containerClassName: "slds-icon_container slds-icon-utility-error",
        size: "x-small",
        name: "error",
        colorVariant: "error",
        title: this.props.assistiveText.withErrorIcon
      }))));
    }
  }]);

  return Tab;
}(_react.default.Component);

_defineProperty(Tab, "displayName", _constants.TAB);

_defineProperty(Tab, "propTypes", {
  /**
   * CSS classes to be added to the tab.
   */
  className: _propTypes.default.string,

  /**
   * The HTML ID of this tab. Also used by the `<TabPanel />` it controls as `tabId`.
   */
  id: _propTypes.default.string,

  /**
   * Whether to apply focus to this tab.
   */
  focus: _propTypes.default.bool,

  /**
   * When `true`, the class `.slds-is-active` is applied.
   */
  selected: _propTypes.default.bool,

  /**
   * When `true`, the HTML attribute `aria-disabled` will be applied. Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler. `import 'css-loader!/node_modules/design-system-react/styles/tabs/tab.css';` This feature may be removed in the future due to disabled tabs being inaccessible.
   */
  disabled: _propTypes.default.bool,

  /**
   * The CSS class to be applied when this tab is selected. Defaults to `.slds-is-active`. If another class is desired, it should be passed in _along with_ `.slds-is-active`, not _instead_ of it.
   */
  activeTabClassName: _propTypes.default.string,

  /**
   * The CSS class to be applied when this tab is disabled. Defaults to `.slds-disabled`. If another class is desired, it should be passed in _along with_ `.slds-disabled`, not _instead_ of it.
   */
  disabledTabClassName: _propTypes.default.string,

  /**
   * The HTML ID of `<TabPanel />` this tab controls.
   */
  panelId: _propTypes.default.string,

  /**
   * The string or element that is shown as both the title and the label for this tab.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * If the Tabs should be scoped, vertical, or default (default value)
   */
  variant: _propTypes.default.oneOf(['default', 'scoped', 'vertical']),

  /**
   * Show an icon that can be used to communicate when a tab contains a validation error that needs attention
   */
  hasError: _propTypes.default.bool,

  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `withErrorIcon`: This text is for the error icon that will be placed next to the `<Tab />` title
   */
  assistiveText: _propTypes.default.shape({
    withErrorIcon: _propTypes.default.string
  })
});

_defineProperty(Tab, "defaultProps", {
  focus: false,
  selected: false,
  activeTabClassName: 'slds-is-active',
  disabledTabClassName: 'slds-disabled',
  variant: 'default',
  hasError: false,
  assistiveText: {
    withErrorIcon: 'This item has an error'
  }
});

var _default = Tab;
exports.default = _default;