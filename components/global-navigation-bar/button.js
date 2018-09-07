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

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

/**
 * A helper component that renders a Button as an item in the Global Navigation Bar. All props are passed onto `Button` except `active` and `dividerPosition`.
 */
var GlobalNavigationButton = function GlobalNavigationButton(_ref) {
  var active = _ref.active,
      dividerPosition = _ref.dividerPosition,
      props = _objectWithoutProperties(_ref, ["active", "dividerPosition"]);

  return _react2.default.createElement("li", {
    className: (0, _classnames2.default)('slds-context-bar__item', _defineProperty({
      'slds-is-active': active
    }, "slds-context-bar__item--divider-".concat(dividerPosition), dividerPosition))
  }, _react2.default.createElement(_button2.default, props));
};

GlobalNavigationButton.displayName = _constants.GLOBAL_NAVIGATION_BAR_BUTTON; // ### Prop Types

GlobalNavigationButton.propTypes = {
  /**
   * Whether the item is active or not.
   */
  active: _propTypes2.default.bool,

  /**
   * Determines position of separating bar.
   */
  dividerPosition: _propTypes2.default.oneOf(['left', 'right'])
}; // ### Default Props

GlobalNavigationButton.defaultProps = {
  className: 'slds-context-bar__label-action slds-text-body--regular',
  // This is a hack since buttons are not supported by Global Navigation
  // Bar and have different `font-size` and `line-height` than links or
  // dropdowns.
  style: {
    lineHeight: 'inherit'
  },
  variant: 'base'
};
exports.default = GlobalNavigationButton;