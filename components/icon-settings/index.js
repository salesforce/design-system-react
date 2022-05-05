"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconSettingsContext = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * The Icon Settings component allows for the path to the icons to be specified in all child components and is recommended to be used at the root of the application. It's render function is `return this.props.children`, so it can only have one child node.
 *
 * **Individual sprites**
 * If you are using webpack it is advised to use the sprite properties
 * {actionSprite, standardSprite...} to specify the individual sprite paths so that webpack can
 * easily re-write the paths.
 * ```
 * import actionSprite from '......';
 *
 * <IconSettings actionSprite={actionSprite} ......>
 * ```
 * **Root icon path**
 * Otherwise use the iconPath to specify the root path to where the icon files will be located in you application
 * such as `/assets/icons`.
 */
var IconSettings = function IconSettings(_ref) {
  var iconPath = _ref.iconPath,
      onRequestIconPath = _ref.onRequestIconPath,
      actionSprite = _ref.actionSprite,
      customSprite = _ref.customSprite,
      doctypeSprite = _ref.doctypeSprite,
      standardSprite = _ref.standardSprite,
      utilitySprite = _ref.utilitySprite,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(IconSettingsContext.Provider, {
    value: {
      iconPath: iconPath,
      onRequestIconPath: onRequestIconPath,
      actionSprite: actionSprite,
      customSprite: customSprite,
      doctypeSprite: doctypeSprite,
      standardSprite: standardSprite,
      utilitySprite: utilitySprite
    }
  }, children);
};

IconSettings.displayName = _constants.ICON_SETTINGS;
IconSettings.propTypes = {
  /**
   * Path to the root icon folder
   * example: `/assets/icons`
   */
  iconPath: _propTypes.default.string,

  /**
   * Function to allow developers to return a custom icon path--for instance, on the same page with a local anchor (`#down`). This is helpful for when there are Cross-Origin Resource Sharing (CORS) issues with SVGs that are located on another domain such as a CDN. `({category, name}) => { return \`#${name}\` }`
   */
  onRequestIconPath: _propTypes.default.func,

  /**
   * Path to the action sprite
   * example: '@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg';
   */
  actionSprite: _propTypes.default.string,

  /**
   * Path to the custom sprite
   * example: '@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg';
   */
  customSprite: _propTypes.default.string,

  /**
   * Path to the doctype sprite
   * example: '@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg';
   */
  doctypeSprite: _propTypes.default.string,

  /**
   * Path to the standard sprite
   * example: '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';
   */
  standardSprite: _propTypes.default.string,

  /**
   * Path to the utility sprite
   * example: '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
   */
  utilitySprite: _propTypes.default.string
};

var IconSettingsContext = /*#__PURE__*/_react.default.createContext({});

exports.IconSettingsContext = IconSettingsContext;
var _default = IconSettings;
exports.default = _default;