"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _docs = require("./docs.json");

var _docs2 = _interopRequireDefault(_docs);

var _event = require("../../utilities/event");

var _event2 = _interopRequireDefault(_event);

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
    var _ref;

    var _temp, _this;

    _classCallCheck(this, GlobalHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = GlobalHeader.__proto__ || Object.getPrototypeOf(GlobalHeader)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "handleSkipToContent", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        _event2.default.trap(e);

        _this.props.onSkipToContent(e);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleSkipToNav", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(e) {
        _event2.default.trap(e);

        _this.props.onSkipToNav(e);
      }
    }), _temp));
  }

  _createClass(GlobalHeader, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _checkProps2.default)(_constants.GLOBAL_HEADER, this.props, _docs2.default);
    }
  }, {
    key: "render",
    value: function render() {
      var tools;
      var search;
      var profile;

      _react2.default.Children.forEach(this.props.children, function (child) {
        if (child && child.type.displayName === _constants.GLOBAL_HEADER_TOOL) {
          if (!tools) tools = [];
          tools.push(child);
        } else if (child && child.type.displayName === _constants.GLOBAL_HEADER_SEARCH) {
          search = child;
        } else if (child && child.type.displayName === _constants.GLOBAL_HEADER_PROFILE) {
          profile = child;
        }
      });

      var assistiveText = _objectSpread({}, defaultProps.assistiveText, this.props.assistiveText);
      /* eslint-disable max-len, no-script-url */


      return _react2.default.createElement("header", {
        className: "slds-global-header_container"
      }, this.props.onSkipToNav ? _react2.default.createElement("a", {
        href: "javascript:void(0);",
        className: "slds-assistive-text slds-assistive-text_focus",
        onClick: this.handleSkipToNav
      }, this.props.skipToNavAssistiveText || assistiveText.skipToNav) : null, this.props.onSkipToContent ? _react2.default.createElement("a", {
        href: "javascript:void(0);",
        className: "slds-assistive-text slds-assistive-text_focus",
        onClick: this.handleSkipToContent
      }, this.props.skipToContentAssistiveText || assistiveText.skipToContent) : null, _react2.default.createElement("div", {
        className: "slds-global-header slds-grid slds-grid_align-spread"
      }, _react2.default.createElement("div", {
        className: "slds-global-header__item"
      }, _react2.default.createElement("div", {
        className: "slds-global-header__logo",
        style: {
          backgroundImage: "url(".concat(this.props.logoSrc, ")")
        }
      })), search, _react2.default.createElement("ul", {
        className: "slds-global-header__item slds-grid slds-grid_vertical-align-center"
      }, tools, profile)), this.props.navigation);
      /* eslint-enable max-len, no-script-url */
    }
  }]);

  return GlobalHeader;
}(_react2.default.Component);

Object.defineProperty(GlobalHeader, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.GLOBAL_HEADER
});
Object.defineProperty(GlobalHeader, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * **Assistive text for accessibility.**
     * This object is merged with the default props object on every render.
     * * `skipToNav`: The localized text that will be read back for the "Skip to Navigation" accessibility link.
     * * `skipToContent`: The localized text that will be read back for the "Skip to Main Content" accessibility link.
     */
    assistiveText: _propTypes2.default.shape({
      skipToNav: _propTypes2.default.string,
      skipToContent: _propTypes2.default.string
    }),

    /**
     * See the component description, this accepts some combination of `SLDSGlobalHeaderSearch`, `SLDSGlobalHeaderButton`, `SLDSGlobalHeaderDropdown`, and `SLDSGlobalHeaderProfile` components.
     */
    children: _propTypes2.default.node,

    /**
     * The Salesforce logo to display in the header.
     */
    logoSrc: _propTypes2.default.string,

    /**
     * Pass in the Global Navigation Bar component
     */
    navigation: _propTypes2.default.node,

    /**
     * Required for accessibility. Should jump the user to the primary content area.
     */
    onSkipToContent: _propTypes2.default.func,

    /**
     * Required for accessibility. Should jump the user to the primary navigation.
     */
    onSkipToNav: _propTypes2.default.func
  }
});
Object.defineProperty(GlobalHeader, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: defaultProps
});
exports.default = GlobalHeader;