"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
var IconSettings =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IconSettings, _React$Component);

  function IconSettings() {
    _classCallCheck(this, IconSettings);

    return _possibleConstructorReturn(this, _getPrototypeOf(IconSettings).apply(this, arguments));
  }

  _createClass(IconSettings, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        iconPath: this.props.iconPath,
        onRequestIconPath: this.props.onRequestIconPath,
        actionSprite: this.props.actionSprite,
        customSprite: this.props.customSprite,
        doctypeSprite: this.props.doctypeSprite,
        standardSprite: this.props.standardSprite,
        utilitySprite: this.props.utilitySprite
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return IconSettings;
}(_react.default.Component);

IconSettings.displayName = _constants.ICON_SETTINGS;
IconSettings.childContextTypes = {
  iconPath: _propTypes.default.string,
  onRequestIconPath: _propTypes.default.func,
  actionSprite: _propTypes.default.string,
  customSprite: _propTypes.default.string,
  doctypeSprite: _propTypes.default.string,
  standardSprite: _propTypes.default.string,
  utilitySprite: _propTypes.default.string
};
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
var _default = IconSettings;
exports.default = _default;