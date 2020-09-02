"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var auditChildren = function auditChildren(children) {
  var primaryRegion; // there can be multiple secondary navigation regions

  var secondaryRegions = [];
  var tertiaryRegion;

  _react.default.Children.forEach(children, function (child) {
    if (child && child.type.displayName === _constants.GLOBAL_NAVIGATION_BAR_REGION) {
      if (child.props.region === 'primary') {
        primaryRegion = child;
      } else if (child.props.region === 'secondary') {
        // eslint-disable-next-line fp/no-mutating-methods
        secondaryRegions.push(child);
      } else if (child.props.region === 'tertiary') {
        tertiaryRegion = child;
      }
    }
  });

  return [primaryRegion].concat(secondaryRegions, [tertiaryRegion]);
};
/**
 * Global Navigation Bar represents a list of links that either take the user to another page or parts of the page the user is in.
 */


var GlobalNavigationBar = function GlobalNavigationBar(props) {
  var _classNames;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('slds-context-bar', (_classNames = {}, _defineProperty(_classNames, "slds-context-bar_theme-".concat(props.cloud), props.cloud), _defineProperty(_classNames, "slds-context-bar_theme-".concat(props.theme), props.theme), _classNames), props.className)
  }, auditChildren(props.children));
}; // ### Prop Types


GlobalNavigationBar.propTypes = {
  /**
   * The items to be displayed in the Global Navigation Bar.
   */
  children: _propTypes.default.node,

  /**
   * CSS class names to be added to the container element.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Typically the cloud name (e.g.- "sales" or "marketing"). This primarily changes the background color.
   */
  cloud: _propTypes.default.string,

  /**
   * Transforms text and interactions (such as hover) to be more visually accessible.
   */
  theme: _propTypes.default.oneOf(['light', 'dark'])
};
GlobalNavigationBar.defaultProps = {};
GlobalNavigationBar.displayName = _constants.GLOBAL_NAVIGATION_BAR;
var _default = GlobalNavigationBar;
exports.default = _default;