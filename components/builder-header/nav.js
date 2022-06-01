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
   * Provide children of the types `<BuilderHeaderNavLink />` or `<BuilderHeaderNavDropdown />` to define the structure of the navigation section.
   * ```
   * <BuilderHeader>
   *   <BuilderHeaderNav>
   *     <BuilderHeaderNavLink />
   *     <BuilderHeaderNavDropdown />
   *   </BuilderHeaderNav>
   * </BuilderHeader>
   * ```
   */
  children: _propTypes.default.node
};
/**
 * The navigation section of the header.
 */

var BuilderHeaderNav = function BuilderHeaderNav(props) {
  return /*#__PURE__*/_react.default.createElement("nav", {
    className: "slds-builder-header__item slds-builder-header__nav"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "slds-builder-header__nav-list"
  }, _react.default.Children.map(props.children, function (child) {
    if (child.type.displayName === _constants.BUILDER_HEADER_NAV_LINK || child.type.displayName === _constants.BUILDER_HEADER_NAV_DROPDOWN) {
      return /*#__PURE__*/_react.default.createElement("li", {
        className: "slds-builder-header__nav-item"
      }, child);
    }

    return null;
  })));
};

BuilderHeaderNav.displayName = _constants.BUILDER_HEADER_NAV;
BuilderHeaderNav.propTypes = propTypes;
var _default = BuilderHeaderNav;
exports.default = _default;