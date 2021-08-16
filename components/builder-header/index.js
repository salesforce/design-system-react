"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _utilities = _interopRequireDefault(require("./utilities"));

var _navLink = _interopRequireDefault(require("./nav-link"));

var _icon = _interopRequireDefault(require("../icon"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
   * Provide children of the types `<BuilderHeaderNav />`, `<BuilderHeaderToolbar />`, or `<BuilderHeaderMisc />` to define the structure of the header.
   * ```
   * <BuilderHeader>
   *   <BuilderHeaderNav />
   *   <BuilderHeaderToolbar />
   *   <BuilderHeaderMisc />
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
   * Category of the title icon from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
   */
  iconCategory: _propTypes.default.string,

  /**
   * CSS classes that are applied to the title icon.
   */
  iconClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Name of the title icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
  iconName: _propTypes.default.string,

  /**
   * Path to the title icon. This will override any global icon settings.
   */
  iconPath: _propTypes.default.string,

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
  iconCategory: 'utility',
  iconName: 'builder',
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
  var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), props.assistiveText);

  var events = _objectSpread(_objectSpread({}, {}), props.events);

  var labels = _objectSpread(_objectSpread({}, defaultProps.labels), props.labels);

  var nav;
  var toolbar; // Default utilities includes Back and Help links

  var utilities = /*#__PURE__*/_react.default.createElement(_utilities.default, null, /*#__PURE__*/_react.default.createElement(_navLink.default, {
    assistiveText: {
      icon: assistiveText.backIcon
    },
    iconCategory: "utility",
    iconName: "back",
    label: labels.back,
    onClick: _event.default.trappedHandler(events.onClickBack)
  }), /*#__PURE__*/_react.default.createElement(_navLink.default, {
    assistiveText: {
      icon: assistiveText.helpIcon
    },
    iconCategory: "utility",
    iconName: "help",
    label: labels.help,
    onClick: _event.default.trappedHandler(events.onClickHelp)
  }));

  var misc = [];

  _react.default.Children.forEach(props.children, function (child) {
    if (child) {
      switch (child.type.displayName) {
        case _constants.BUILDER_HEADER_NAV:
          nav = child;
          break;

        case _constants.BUILDER_HEADER_TOOLBAR:
          toolbar = child;
          break;

        case _constants.BUILDER_HEADER_MISC:
          // eslint-disable-next-line fp/no-mutating-methods
          misc.push(child);
          break;

        case _constants.BUILDER_HEADER_UTILITIES:
          utilities = child;
          break;

        default:
      }
    }
  });

  var iconCategory;
  var iconName;
  var iconPath;

  if (props.iconPath) {
    iconPath = props.iconPath;
  } else {
    iconCategory = props.iconCategory;
    iconName = props.iconName;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'relative',
      height: '100px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('slds-builder-header_container', props.className),
    style: props.style
  }, /*#__PURE__*/_react.default.createElement("header", {
    className: "slds-builder-header"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-builder-header__item"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-builder-header__item-label slds-media slds-media_center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-media__figure"
  }, /*#__PURE__*/_react.default.createElement(_icon.default, {
    assistiveText: {
      label: assistiveText.icon
    },
    category: iconCategory,
    containerClassName: (0, _classnames.default)('slds-icon_container', 'slds-icon-utility-builder', 'slds-current-color', props.iconClassName),
    name: iconName,
    path: iconPath,
    size: "x-small"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-media__body"
  }, labels.title))), nav, misc.length > 0 ? misc : /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-builder-header__item slds-has-flexi-truncate"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "slds-builder-header__item-label"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate",
    title: labels.pageType
  }, labels.pageType))), utilities), toolbar));
};

BuilderHeader.displayName = _constants.BUILDER_HEADER;
BuilderHeader.propTypes = propTypes;
BuilderHeader.defaultProps = defaultProps;
var _default = BuilderHeader;
exports.default = _default;