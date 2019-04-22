"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _classnames = _interopRequireDefault(require("classnames"));

var _truncate = _interopRequireDefault(require("../utilities/truncate"));

var _highlighter = _interopRequireDefault(require("../utilities/highlighter"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
// ## Children
var handleClick = function handleClick(event, href, onClick) {
  event.preventDefault();
  onClick(event, {
    href: href
  });
};
/**
 * App Launcher Tiles provide information and links to a user's apps
 */


var AppLauncherTile = function AppLauncherTile(props) {
  var smallTile = props.size === 'small' || false;
  return _react.default.createElement("a", {
    href: props.href // eslint-disable-line no-script-url
    ,
    onClick: (0, _lodash.default)(props.onClick) ? function (event) {
      return handleClick(event, props.href, props.onClick);
    } : null,
    className: (0, _classnames.default)('slds-app-launcher__tile slds-text-link_reset', {
      'slds-app-launcher__tile_small': smallTile
    }, props.className)
  }, _react.default.createElement("div", {
    className: (0, _classnames.default)('slds-app-launcher__tile-figure', {
      'slds-app-launcher__tile-figure_small': smallTile
    })
  }, props.iconNode || _react.default.createElement("span", {
    className: "slds-avatar slds-avatar_large slds-align_absolute-center slds-icon-custom-27"
  }, props.iconText)), smallTile ? _react.default.createElement("div", {
    className: "slds-app-launcher__tile-body slds-app-launcher__tile-body_small"
  }, _react.default.createElement("p", {
    className: "slds-truncate"
  }, _react.default.createElement(_highlighter.default, {
    className: "slds-text-link",
    search: props.search
  }, props.title))) : _react.default.createElement("div", {
    className: "slds-app-launcher__tile-body"
  }, _react.default.createElement(_highlighter.default, {
    className: "slds-text-link",
    search: props.search
  }, props.title), _react.default.createElement(_truncate.default, {
    line: 2,
    prefix: props.descriptionHeading && props.descriptionHeading.toUpperCase(),
    suffix: props.moreLabel,
    text: props.description,
    textTruncateChild: _react.default.createElement(_tooltip.default, {
      align: "bottom",
      content: _react.default.createElement(_highlighter.default, {
        search: props.search
      }, props.description),
      isOpen: props.isOpenTooltip
    }, _react.default.createElement("span", {
      className: "slds-app-launcher__tile-more slds-text-link",
      tabIndex: "0"
    }, props.moreLabel)),
    wrapper: function wrapper(text, textTruncateChild) {
      return _react.default.createElement("div", null, props.descriptionHeading && // inline style override
      _react.default.createElement("span", {
        className: "slds-text-heading_label",
        style: {
          letterSpacing: '0.025rem'
        }
      }, props.descriptionHeading, ' '), _react.default.createElement(_highlighter.default, {
        search: props.search
      }, text), textTruncateChild && ' ', textTruncateChild);
    }
  })));
}; // ### Display Name
// Always use the canonical component name as the React display name.


AppLauncherTile.displayName = _constants.APP_LAUNCHER_TILE;
AppLauncherTile.defaultProps = {
  href: 'javascript:void(0);',
  // eslint-disable-line no-script-url
  size: 'default',
  moreLabel: ' More'
}; // ### Prop Types

AppLauncherTile.propTypes = {
  /**
   * App name for the tile's title.
   */
  title: _propTypes.default.string.isRequired,

  /**
   * Size of the rendered tile.
   */
  size: _propTypes.default.oneOf(['default', 'small']),

  /**
   * The description of the app. Not visible on small tiles.
   */
  description: _propTypes.default.string,

  /**
   * Heading for app description
   */
  descriptionHeading: _propTypes.default.string,

  /**
   * The `href` attribute of the tile. Please pass in bookmarkable URLs from your routing library. If the `onClick` callback is specified this URL will be prevented from changing the browser's location.
   */
  href: _propTypes.default.string,

  /**
   * Open the More Tooltip
   */
  isOpenTooltip: _propTypes.default.bool,

  /**
   * The localized text for the "More information" tooltip.
   */
  moreLabel: _propTypes.default.string,

  /**
   * Class names to be added to the tile.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Function that will be executed when clicking on a tile
   */
  onClick: _propTypes.default.func,

  /**
   * Icon node for app tile. Takes priority over `iconText`
   */
  iconNode: _propTypes.default.node,

  /**
   * Text to be used as an icon. Only renders if iconNode is undefined
   */
  iconText: _propTypes.default.string,

  /**
   * Text used to highlight content in app tiles
   */
  search: _propTypes.default.string // TODO: allow for passing iconBackgroundColor
  // TODO: add Highlighter to Truncate text (https://github.com/ShinyChang/React-Text-Truncate/issues/32)

};
var _default = AppLauncherTile;
exports.default = _default;