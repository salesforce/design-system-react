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
   * Provide custom content in place of Page Type label
   * ```
   * <BuilderHeader>
   *   <BuilderHeaderMisc>
   *     Custom content
   *   </BuilderHeaderMisc>
   * </BuilderHeader>
   * ```
   */
  children: _propTypes.default.node
};
/**
 * The miscellaneous section of the header.
 */

var BuilderHeaderMisc = function BuilderHeaderMisc(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-builder-header__item",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-builder-header__item-label"
  }, props.children));
};

BuilderHeaderMisc.displayName = _constants.BUILDER_HEADER_MISC;
BuilderHeaderMisc.propTypes = propTypes;
var _default = BuilderHeaderMisc;
exports.default = _default;