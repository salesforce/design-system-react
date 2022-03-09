"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Wraps a link in the proper markup to support use in the GlobalNavigationBar.
 */
var GlobalNavigationBarLink = function GlobalNavigationBarLink(props) {
  // Separate props we care about in order to pass others along passively to the `a` tag
  var active = props.active,
      activeBackgroundColor = props.activeBackgroundColor,
      assistiveText = props.assistiveText,
      className = props.className,
      dividerPosition = props.dividerPosition,
      href = props.href,
      id = props.id,
      label = props.label,
      onBlur = props.onBlur,
      onClick = props.onClick,
      onFocus = props.onFocus,
      onKeyDown = props.onKeyDown,
      onKeyPress = props.onKeyPress,
      onKeyUp = props.onKeyUp,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      tabIndex = props.tabIndex;
  var listItemstyle = active ? {
    backgroundColor: activeBackgroundColor,
    borderBottomColor: activeBackgroundColor
  } : null;

  function handleOnClick(event) {
    if ((0, _lodash.default)(onClick) || href === '#') {
      event.preventDefault();
    }

    if ((0, _lodash.default)(onClick)) {
      onClick(event, {
        href: href
      });
    }
  }

  return /*#__PURE__*/_react.default.createElement("li", {
    className: (0, _classnames.default)('slds-context-bar__item', _defineProperty({
      'slds-is-active': active
    }, "slds-context-bar__item_divider-".concat(dividerPosition), dividerPosition)),
    id: id,
    style: listItemstyle
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: href,
    className: (0, _classnames.default)('slds-context-bar__label-action', className),
    onBlur: onBlur,
    onClick: handleOnClick,
    onFocus: onFocus,
    onKeyDown: onKeyDown,
    onKeyPress: onKeyPress,
    onKeyUp: onKeyUp,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    tabIndex: tabIndex,
    title: label
  }, active ? /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-assistive-text"
  }, assistiveText.activeDescriptor) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate",
    title: label
  }, label)));
};

GlobalNavigationBarLink.displayName = _constants.GLOBAL_NAVIGATION_BAR_LINK; // ### Prop Types

GlobalNavigationBarLink.propTypes = {
  /**
   * Whether the item is active or not.
   */
  active: _propTypes.default.bool,

  /**
   * Allows alignment of active item with active application background color. If application background is dark, text color may need to be `#fff`. This can be done with the style prop.
   */
  activeBackgroundColor: _propTypes.default.string,

  /**
   * **Assistive text for accessibility.**
   * * `activeDescriptor`: The text that appears alongside a link that is currently active.
   */
  assistiveText: _propTypes.default.shape({
    activeDescriptor: _propTypes.default.string
  }),

  /**
   * Class names to be added to the anchor element
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Determines position of separating bar.
   */
  dividerPosition: _propTypes.default.oneOf(['left', 'right']),

  /**
   * The `href` attribute of the link. Please pass in bookmarkable URLs from your routing library. Use `GlobalNavigationBarButton` if a "real URL" is not desired. If the `onClick` callback is specified this URL will still be prevented from changing the browser's location.
   */
  href: _propTypes.default.string,

  /**
   * The `id` attribute is applied to the `li` tag. _This was recently changed from being on the anchor tag._
   */
  id: _propTypes.default.string,

  /**
   * Text to show for link item.
   */
  label: _propTypes.default.string,

  /**
   * Triggered when focus is removed.
   */
  onBlur: _propTypes.default.func,

  /**
   * `function (event, href)` - fires when the link is clicked. If set, the browser location change to the `href` specified will be ignored, but the `href` will be included in an additional parameter passed to the callback.
   */
  onClick: _propTypes.default.func,

  /**
   * Triggered when component is focused.
   */
  onFocus: _propTypes.default.func,

  /**
   * Triggered when a key is pressed down
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Triggered when a key is pressed and released
   */
  onKeyPress: _propTypes.default.func,

  /**
   * Triggered when a key is released
   */
  onKeyUp: _propTypes.default.func,

  /**
   * Triggered when a mouse arrow hovers
   */
  onMouseEnter: _propTypes.default.func,

  /**
   * Triggered when a mouse arrow no longer hovers
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * Write "-1" if you don't want the user to tab to the button.
   */
  tabIndex: _propTypes.default.string
};
GlobalNavigationBarLink.defaultProps = {
  assistiveText: {
    activeDescriptor: 'Current page:'
  },
  href: '#'
};
var _default = GlobalNavigationBarLink;
exports.default = _default;