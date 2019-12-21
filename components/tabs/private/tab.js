"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler.
 */
// import '!style-loader!css-loader!../../../styles/tabs/tab.css'; // eslint-disable-line import/no-unresolved
var Tab =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tab)).call.apply(_getPrototypeOf2, [this].concat(args)));

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
          _this2 = this,
          _classNames2;

      var _this$props = this.props,
          selected = _this$props.selected,
          disabled = _this$props.disabled,
          panelId = _this$props.panelId,
          activeTabClassName = _this$props.activeTabClassName,
          disabledTabClassName = _this$props.disabledTabClassName,
          className = _this$props.className,
          children = _this$props.children,
          id = _this$props.id,
          variant = _this$props.variant;
      var tabIndex;

      if (selected) {
        tabIndex = '0';
      } else if (disabled) {
        tabIndex = '-1';
      } else {
        tabIndex = null;
      }

      return _react.default.createElement("li", {
        className: (0, _classnames.default)(className, (_classNames = {}, _defineProperty(_classNames, activeTabClassName, selected), _defineProperty(_classNames, disabledTabClassName, disabled), _defineProperty(_classNames, 'slds-tabs_default__item', variant === 'default'), _defineProperty(_classNames, 'slds-tabs_scoped__item', variant === 'scoped'), _classNames)),
        role: "presentation",
        ref: function ref(node) {
          _this2.node = node;
        },
        tabIndex: tabIndex,
        id: id,
        title: typeof children === 'string' ? children : null
      }, _react.default.createElement("a", {
        className: (0, _classnames.default)((_classNames2 = {}, _defineProperty(_classNames2, activeTabClassName, selected), _defineProperty(_classNames2, disabledTabClassName, disabled), _defineProperty(_classNames2, 'slds-tabs_default__link', variant === 'default'), _defineProperty(_classNames2, 'slds-tabs_scoped__link', variant === 'scoped'), _classNames2)),
        href: "javascript:void(0);" // eslint-disable-line no-script-url
        ,
        role: "tab",
        tabIndex: "-1",
        "aria-controls": panelId,
        "aria-disabled": disabled,
        "aria-selected": selected ? 'true' : 'false'
      }, children));
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
   * When `true`, the class `.slds-active` is applied.
   */
  selected: _propTypes.default.bool,

  /**
   * When `true`, the HTML attribute `aria-disabled` will be applied. Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler. `import 'css-loader!/node_modules/design-system-react/styles/tabs/tab.css';` This feature may be removed in the future due to disabled tabs being inaccessible.
   */
  disabled: _propTypes.default.bool,

  /**
   * The CSS class to be applied when this tab is selected. Defaults to `.slds-active`. If another class is desired, it should be passed in _along with_ `.slds-active`, not _instead_ of it.
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
   * If the Tabs should be scopped, defaults to false
   */
  variant: _propTypes.default.oneOf(['default', 'scoped'])
});

_defineProperty(Tab, "defaultProps", {
  focus: false,
  selected: false,
  activeTabClassName: 'slds-active',
  disabledTabClassName: 'slds-disabled',
  variant: 'default'
});

var _default = Tab;
exports.default = _default;