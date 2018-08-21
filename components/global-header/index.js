"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _event = require("../../utilities/event");

var _event2 = _interopRequireDefault(_event);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var GlobalHeader = (0, _createReactClass2.default)({
  displayName: _constants.GLOBAL_HEADER,
  propTypes: {
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
  },
  getDefaultProps: function getDefaultProps() {
    return defaultProps;
  },
  componentWillMount: function componentWillMount() {
    (0, _checkProps2.default)(_constants.GLOBAL_HEADER, this.props);
  },
  handleSkipToContent: function handleSkipToContent(e) {
    _event2.default.trap(e);

    this.props.onSkipToContent(e);
  },
  handleSkipToNav: function handleSkipToNav(e) {
    _event2.default.trap(e);

    this.props.onSkipToNav(e);
  },
  render: function render() {
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
      className: "slds-assistive-text slds-assistive-text--focus",
      onClick: this.handleSkipToNav
    }, this.props.skipToNavAssistiveText || assistiveText.skipToNav) : null, this.props.onSkipToContent ? _react2.default.createElement("a", {
      href: "javascript:void(0);",
      className: "slds-assistive-text slds-assistive-text--focus",
      onClick: this.handleSkipToContent
    }, this.props.skipToContentAssistiveText || assistiveText.skipToContent) : null, _react2.default.createElement("div", {
      className: "slds-global-header slds-grid slds-grid--align-spread"
    }, _react2.default.createElement("div", {
      className: "slds-global-header__item"
    }, _react2.default.createElement("div", {
      className: "slds-global-header__logo",
      style: {
        backgroundImage: "url(".concat(this.props.logoSrc, ")")
      }
    })), search, _react2.default.createElement("ul", {
      className: "slds-global-header__item slds-grid slds-grid--vertical-align-center"
    }, tools, profile)), this.props.navigation);
    /* eslint-enable max-len, no-script-url */
  }
});
exports.default = GlobalHeader;