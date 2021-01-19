"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _salesforceSkinCommon = _interopRequireDefault(require("../../utilities/design-tokens/dist/salesforce-skin.common.js"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Wraps text in the proper markup and removes link styling to support use in the GlobalNavigationBar.
 */
var GlobalNavigationBarLabel = function GlobalNavigationBarLabel(props) {
  // Separate props we care about in order to pass others along passively to the `span` tag
  var className = props.className,
      dividerPosition = props.dividerPosition,
      id = props.id,
      label = props.label;
  return /*#__PURE__*/_react.default.createElement("li", {
    className: "slds-context-bar__item slds-no-hover"
  }, /*#__PURE__*/_react.default.createElement("span", {
    id: id // inline style override
    ,
    style: {
      color: _salesforceSkinCommon.default.colorTextLinkDisabled
    },
    className: (0, _classnames.default)('slds-context-bar__label-action', _defineProperty({}, "slds-context-bar__item_divider-".concat(dividerPosition), dividerPosition), className)
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate"
  }, label)));
};

GlobalNavigationBarLabel.displayName = _constants.GLOBAL_NAVIGATION_BAR_LABEL; // ### Prop Types

GlobalNavigationBarLabel.propTypes = {
  /**
   * Class names to be added to the `span` element
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Determines position of separating bar.
   */
  dividerPosition: _propTypes.default.oneOf(['left', 'right']),

  /**
   * Id string applied to first <span> inside of <li>
   */
  id: _propTypes.default.string,

  /**
   * Text to show
   */
  label: _propTypes.default.string
};
var _default = GlobalNavigationBarLabel;
exports.default = _default;