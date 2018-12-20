"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

/**
 * A helper component that renders a Button in the tools area of the Global Header. Currently defaults to a bare icon, but this can be overriden if text-based buttons are required.
 */
var GlobalHeaderButton = function GlobalHeaderButton(props) {
  var buttonVariant = props.buttonVariant,
      rest = _objectWithoutProperties(props, ["buttonVariant"]);

  var btn = _react2.default.createElement(_button2.default, _extends({
    iconVariant: "global-header",
    variant: "icon"
  }, rest));

  return buttonVariant === 'dropdown' ? btn : _react2.default.createElement("li", null, btn);
};

GlobalHeaderButton.displayName = _constants.GLOBAL_HEADER_TOOL;
exports.default = GlobalHeaderButton;