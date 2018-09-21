"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function handleClick(event, href, onClick) {
  event.preventDefault();
  onClick(event, {
    href: href
  });
}
/**
 * Wraps a link in the proper markup to support use in the GlobalNavigationBar.
 */


var GlobalNavigationBarLink = function GlobalNavigationBarLink(props) {
  // Separate props we care about in order to pass others along passively to the `a` tag
  var active = props.active,
      activeBackgroundColor = props.activeBackgroundColor,
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
      tabIndex = props.tabIndex;
  var listItemstyle = active ? {
    backgroundColor: activeBackgroundColor,
    borderBottomColor: activeBackgroundColor
  } : null;
  return _react2.default.createElement("li", {
    className: (0, _classnames2.default)('slds-context-bar__item', _defineProperty({
      'slds-is-active': active
    }, "slds-context-bar__item--divider-".concat(dividerPosition), dividerPosition)),
    id: id,
    style: listItemstyle
  }, _react2.default.createElement("a", {
    href: href,
    className: (0, _classnames2.default)('slds-context-bar__label-action', className),
    onBlur: onBlur,
    onClick: (0, _lodash2.default)(onClick) ? function (event) {
      return handleClick(event, href, onClick);
    } : null,
    onFocus: onFocus,
    onKeyDown: onKeyDown,
    onKeyPress: onKeyPress,
    tabIndex: tabIndex
  }, _react2.default.createElement("span", {
    className: "slds-truncate"
  }, label)));
};

GlobalNavigationBarLink.displayName = _constants.GLOBAL_NAVIGATION_BAR_LINK; // ### Prop Types

GlobalNavigationBarLink.propTypes = {
  /**
   * Whether the item is active or not.
   */
  active: _propTypes2.default.bool,

  /**
   * Allows alignment of active item with active application background color. If application background is dark, text color may need to be `#fff`. This can be done with the style prop.
   */
  activeBackgroundColor: _propTypes2.default.string,

  /**
   * Class names to be added to the anchor element
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Determines position of separating bar.
   */
  dividerPosition: _propTypes2.default.oneOf(['left', 'right']),

  /**
   * The `href` attribute of the link. Please pass in bookmarkable URLs from your routing library. Use `GlobalNavigationBarButton` if a "real URL" is not desired. If the `onClick` callback is specified this URL will still be prevented from changing the browser's location.
   */
  href: _propTypes2.default.string,

  /**
   * The `id` attribute is applied to the `li` tag. _This was recently changed from being on the anchor tag._
   */
  id: _propTypes2.default.string,

  /**
   * Text to show for link item.
   */
  label: _propTypes2.default.string,

  /**
   * Triggered when focus is removed.
   */
  onBlur: _propTypes2.default.func,

  /**
   * `function (event, href)` - fires when the link is clicked. If set, the browser location change to the `href` specified will be ignored, but the `href` will be included in an additional parameter passed to the callback.
   */
  onClick: _propTypes2.default.func,

  /**
   * Triggered when component is focused.
   */
  onFocus: _propTypes2.default.func,

  /**
   * Triggered when a key is pressed down
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * Triggered when a key is pressed and released
   */
  onKeyPress: _propTypes2.default.func,

  /**
   * Triggered when a key is released
   */
  onKeyUp: _propTypes2.default.func,

  /**
   * Triggered when a mouse arrow hovers
   */
  onMouseEnter: _propTypes2.default.func,

  /**
   * Triggered when a mouse arrow no longer hovers
   */
  onMouseLeave: _propTypes2.default.func,

  /**
   * Write "-1" if you don't want the user to tab to the button.
   */
  tabIndex: _propTypes2.default.string
};
GlobalNavigationBarLink.defaultProps = {
  href: 'javascript:void(0);' // eslint-disable-line no-script-url

};
exports.default = GlobalNavigationBarLink;