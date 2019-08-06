"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../icon"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `backIcon`: Used for the back icon.
   * * `helpIcon`: Used for the help icon.
   * * `icon`: Used for the main icon next to the header title.
   * * _Tested with snapshot testing._
   */
  assistiveText: _propTypes.default.shape({
    backIcon: _propTypes.default.string,
    helpIcon: _propTypes.default.string,
    icon: _propTypes.default.string
  }),

  /**
   * Provide children of the types `<BuilderHeaderNav />` or `<BuilderHeaderToolbar />` to define the structure of the header.
   * ```
   * <BuilderHeader>
   *   <BuilderHeaderNav />
   *   <BuilderHeaderToolbar />
   * </BuilderHeader>
   * ```
   */
  children: _propTypes.default.node,

  /**
   * CSS classes to be added to tag with `.slds-builder-header_container`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Event Callbacks
   * * `onClickBack`: Called when the Back link is clicked.
   * * `onClickHelp`: Called when the Help link is clicked.
   * _Tested with Mocha testing._
   */
  events: _propTypes.default.shape({
    onClickBack: _propTypes.default.func,
    onClickHelp: _propTypes.default.func
  }),

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `back`: The label for the Back link.
   * * `help`: The label for the Help link.
   * * `pageType`: The label that describes the page type.
   * * `title`: The label for the page title.
   * _Tested with snapshot testing._
   */
  labels: _propTypes.default.shape({
    back: _propTypes.default.string,
    help: _propTypes.default.string,
    pageType: _propTypes.default.string,
    title: _propTypes.default.string
  }),

  /**
   * Custom styles applied to the `.slds-builder-header_container` element.
   */
  style: _propTypes.default.object
};
var defaultProps = {
  assistiveText: {
    backIcon: 'Back',
    helpIcon: 'Help',
    icon: 'Builder'
  },
  labels: {
    back: 'Back',
    help: 'Help',
    pageType: 'Page Type',
    title: 'App Name'
  }
};
/**
 * Every builder needs a builder header, which contains basic navigation elements. It also shows the builder type and content name.
 */

var BuilderHeader = function BuilderHeader(props) {
  var assistiveText = _objectSpread({}, defaultProps.assistiveText, props.assistiveText);

  var events = _objectSpread({}, {}, props.events);

  var labels = _objectSpread({}, defaultProps.labels, props.labels);

  var nav;
  var toolbar;

  _react.default.Children.forEach(props.children, function (child) {
    if (child) {
      switch (child.type.displayName) {
        case _constants.BUILDER_HEADER_NAV:
          nav = child;
          break;

        case _constants.BUILDER_HEADER_TOOLBAR:
          toolbar = child;
          break;

        default:
      }
    }
  });

  return _react.default.createElement("div", {
    style: {
      position: 'relative',
      height: '100px'
    }
  }, _react.default.createElement("div", {
    className: (0, _classnames.default)('slds-builder-header_container', props.className),
    style: props.style
  }, _react.default.createElement("header", {
    className: "slds-builder-header"
  }, _react.default.createElement("div", {
    className: "slds-builder-header__item"
  }, _react.default.createElement("div", {
    className: "slds-builder-header__item-label slds-media slds-media_center"
  }, _react.default.createElement("div", {
    className: "slds-media__figure"
  }, _react.default.createElement(_icon.default, {
    assistiveText: {
      label: assistiveText.icon
    },
    category: "utility",
    containerClassName: "slds-icon_container slds-icon-utility-builder slds-current-color",
    name: "builder",
    size: "x-small"
  })), _react.default.createElement("div", {
    className: "slds-media__body"
  }, labels.title))), nav, _react.default.createElement("div", {
    className: "slds-builder-header__item slds-has-flexi-truncate"
  }, _react.default.createElement("h1", {
    className: "slds-builder-header__item-label"
  }, _react.default.createElement("span", {
    className: "slds-truncate",
    title: labels.pageType
  }, labels.pageType))), _react.default.createElement("div", {
    className: "slds-builder-header__item slds-builder-header__utilities"
  }, _react.default.createElement("div", {
    className: "slds-builder-header__utilities-item"
  }, _react.default.createElement("a", {
    href: "javascript:void(0);",
    className: "slds-builder-header__item-action slds-media slds-media_center",
    onClick: events.onClickBack
  }, _react.default.createElement("div", {
    className: "slds-media__figure"
  }, _react.default.createElement(_icon.default, {
    assistiveText: {
      label: assistiveText.backIcon
    },
    category: "utility",
    containerClassName: "slds-icon_container slds-icon-utility-settings slds-current-color",
    name: "back",
    size: "x-small"
  })), _react.default.createElement("div", {
    className: "slds-media__body"
  }, labels.back))), _react.default.createElement("div", {
    className: "slds-builder-header__utilities-item"
  }, _react.default.createElement("a", {
    href: "javascript:void(0);",
    className: "slds-builder-header__item-action slds-media slds-media_center",
    onClick: events.onClickHelp
  }, _react.default.createElement("div", {
    className: "slds-media__figure"
  }, _react.default.createElement(_icon.default, {
    assistiveText: {
      label: assistiveText.helpIcon
    },
    category: "utility",
    containerClassName: "slds-icon_container slds-icon-utility-settings slds-current-color",
    name: "help",
    size: "x-small"
  })), _react.default.createElement("div", {
    className: "slds-media__body"
  }, labels.help))))), toolbar));
};

BuilderHeader.displayName = _constants.BUILDER_HEADER;
BuilderHeader.propTypes = propTypes;
BuilderHeader.defaultProps = defaultProps;
var _default = BuilderHeader;
exports.default = _default;