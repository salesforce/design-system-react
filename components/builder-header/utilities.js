"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  /**
   * Provide children of the types `<BuilderHeaderNavLink />` or `<BuilderHeaderNavDropdown />` to define the structure of the utilities section.
   * ```
   * <BuilderHeader>
   *   <BuilderHeaderUtilities>
   *     <BuilderHeaderNavLink />
   *     <BuilderHeaderNavDropdown />
   *   </BuilderHeaderUtilities>
   * </BuilderHeader>
   * ```
   */
  children: _propTypes.default.node
};
/**
 * The navigation section of the header.
 */

var BuilderHeaderUtilities = function BuilderHeaderUtilities(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-builder-header__item slds-builder-header__utilities"
  }, _react.default.Children.map(props.children, function (child) {
    if (child.type.displayName === _constants.BUILDER_HEADER_NAV_LINK || child.type.displayName === _constants.BUILDER_HEADER_NAV_DROPDOWN) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-builder-header__utilities-item"
      }, child);
    }

    return null;
  }));
};

BuilderHeaderUtilities.displayName = _constants.BUILDER_HEADER_UTILITIES;
BuilderHeaderUtilities.propTypes = propTypes;
var _default = BuilderHeaderUtilities;
exports.default = _default;