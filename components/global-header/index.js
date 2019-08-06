"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _docs = _interopRequireDefault(require("./docs.json"));

var _event = _interopRequireDefault(require("../../utilities/event"));

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

var defaultProps = {
  assistiveText: {
    skipToNav: 'Skip to Navigation',
    skipToContent: 'Skip to Main Content'
  },
  logoSrc: '/assets/images/logo-noname.svg'
};
/**
 * The global header is the anchor for the Salesforce platform and spans all other parts of the UI. It accepts children to define the items displayed within.
 *
 * Example:
 * ```
 * <SLDSGlobalHeader>
 *   <SLDSGlobalHeaderSearch />
 *   <SLDSGlobalHeaderButton />
 *   <SLDSGlobalHeaderDropdown />
 *   <SLDSGlobalHeaderDropdown />
 *   <SLDSGlobalHeaderProfile />
 * </SLDSGlobalHeader>
 * ```
 */

var GlobalHeader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GlobalHeader, _React$Component);

  function GlobalHeader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GlobalHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GlobalHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleSkipToContent", function (e) {
      _event.default.trap(e);

      _this.props.onSkipToContent(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSkipToNav", function (e) {
      _event.default.trap(e);

      _this.props.onSkipToNav(e);
    });

    return _this;
  }

  _createClass(GlobalHeader, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _checkProps.default)(_constants.GLOBAL_HEADER, this.props, _docs.default);
    }
  }, {
    key: "render",
    value: function render() {
      var _actions;

      var assistiveText = _objectSpread({}, defaultProps.assistiveText, this.props.assistiveText);

      var actions = (_actions = {}, _defineProperty(_actions, _constants.GLOBAL_HEADER_FAVORITES, []), _defineProperty(_actions, _constants.GLOBAL_HEADER_HELP, []), _defineProperty(_actions, _constants.GLOBAL_HEADER_NOTIFICATIONS, []), _defineProperty(_actions, _constants.GLOBAL_HEADER_PROFILE, []), _defineProperty(_actions, _constants.GLOBAL_HEADER_SETUP, []), _defineProperty(_actions, _constants.GLOBAL_HEADER_TASK, []), _defineProperty(_actions, _constants.GLOBAL_HEADER_TOOL, []), _actions);
      var search;

      _react.default.Children.forEach(this.props.children, function (child) {
        if (child) {
          if (child.type.displayName === _constants.GLOBAL_HEADER_SEARCH) {
            search = child;
          } else if (actions[child.type.displayName]) {
            actions[child.type.displayName].push(child);
          }
        }
      });

      actions = [].concat(actions[_constants.GLOBAL_HEADER_FAVORITES], actions[_constants.GLOBAL_HEADER_TASK], actions[_constants.GLOBAL_HEADER_HELP], actions[_constants.GLOBAL_HEADER_SETUP], actions[_constants.GLOBAL_HEADER_NOTIFICATIONS], actions[_constants.GLOBAL_HEADER_TOOL], // support for deprecated GlobalHeaderButton and GlobalHeaderDropdown
      actions[_constants.GLOBAL_HEADER_PROFILE]);
      /* eslint-disable max-len, no-script-url */

      return _react.default.createElement("header", {
        className: "slds-global-header_container"
      }, this.props.onSkipToNav ? _react.default.createElement("a", {
        href: "javascript:void(0);",
        className: "slds-assistive-text slds-assistive-text_focus",
        onClick: this.handleSkipToNav
      }, this.props.skipToNavAssistiveText || assistiveText.skipToNav) : null, this.props.onSkipToContent ? _react.default.createElement("a", {
        href: "javascript:void(0);",
        className: "slds-assistive-text slds-assistive-text_focus",
        onClick: this.handleSkipToContent
      }, this.props.skipToContentAssistiveText || assistiveText.skipToContent) : null, _react.default.createElement("div", {
        className: "slds-global-header slds-grid slds-grid_align-spread"
      }, _react.default.createElement("div", {
        className: "slds-global-header__item"
      }, _react.default.createElement("div", {
        className: "slds-global-header__logo",
        style: {
          backgroundImage: "url(".concat(this.props.logoSrc, ")")
        }
      })), search, _react.default.createElement("div", {
        className: "slds-global-header__item"
      }, _react.default.createElement("ul", {
        className: "slds-global-actions"
      }, actions.map(function (actionItem, index) {
        return _react.default.createElement("li", {
          className: "slds-global-actions__item",
          key: "actions-item-".concat(index)
          /* eslint-disable-line react/no-array-index-key */

        }, actionItem);
      })))), this.props.navigation);
      /* eslint-enable max-len, no-script-url */
    }
  }]);

  return GlobalHeader;
}(_react.default.Component);

_defineProperty(GlobalHeader, "displayName", _constants.GLOBAL_HEADER);

_defineProperty(GlobalHeader, "propTypes", {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `skipToNav`: The localized text that will be read back for the "Skip to Navigation" accessibility link.
   * * `skipToContent`: The localized text that will be read back for the "Skip to Main Content" accessibility link.
   */
  assistiveText: _propTypes.default.shape({
    skipToNav: _propTypes.default.string,
    skipToContent: _propTypes.default.string
  }),

  /**
   * See the component description, this accepts some combination of `SLDSGlobalHeaderSearch`, `SLDSGlobalHeaderButton`, `SLDSGlobalHeaderDropdown`, and `SLDSGlobalHeaderProfile` components.
   */
  children: _propTypes.default.node,

  /**
   * The Salesforce logo to display in the header.
   */
  logoSrc: _propTypes.default.string,

  /**
   * Pass in the Global Navigation Bar component
   */
  navigation: _propTypes.default.node,

  /**
   * Required for accessibility. Should jump the user to the primary content area.
   */
  onSkipToContent: _propTypes.default.func,

  /**
   * Required for accessibility. Should jump the user to the primary navigation.
   */
  onSkipToNav: _propTypes.default.func
});

_defineProperty(GlobalHeader, "defaultProps", defaultProps);

var _default = GlobalHeader;
exports.default = _default;