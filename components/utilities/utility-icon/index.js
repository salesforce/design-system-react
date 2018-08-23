"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _svg = require("./svg");

var _svg2 = _interopRequireDefault(_svg);

var _utility = require("../../../icons/utility");

var _utility2 = _interopRequireDefault(_utility);

var _action = require("../../../icons/action");

var _action2 = _interopRequireDefault(_action);

var _custom = require("../../../icons/custom");

var _custom2 = _interopRequireDefault(_custom);

var _doctype = require("../../../icons/doctype");

var _doctype2 = _interopRequireDefault(_doctype);

var _standard = require("../../../icons/standard");

var _standard2 = _interopRequireDefault(_standard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

/*
 * If inline icons are present and icon bundle imports are not just an empty object, then inline icons will be used instead of external icons that require HTTP access.
 */
var UtilityIcon = function UtilityIcon(_ref, context) {
  var _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      assistiveText = _ref.assistiveText,
      category = _ref.category,
      icon = _ref.icon,
      path = _ref.path,
      rest = _objectWithoutProperties(_ref, ["name", "assistiveText", "category", "icon", "path"]);

  (0, _checkProps2.default)('UtilityIcon', {
    name: name,
    category: category,
    path: path,
    context: context
  });
  var inlineIcons = {
    action: _action2.default,
    custom: _custom2.default,
    doctype: _doctype2.default,
    standard: _standard2.default,
    utility: _utility2.default
  };
  var inlineData;

  if (icon) {
    // Use SVG data passed in with `icon` prop
    inlineData = icon;
  } else if (Object.keys(inlineIcons[category]).length) {
    // Use inline icon data if it exists. ENV variables will have to set to allow this.
    inlineData = inlineIcons[category][name.toLowerCase()];
    inlineData.viewBox = inlineIcons[category].viewBox;
  }

  var modifiedPath;

  if (path) {
    // Use `path` prop of Icon if present
    modifiedPath = path;
  } else if (context["".concat(category, "Sprite")]) {
    // Use category sprite file from IconSettings if present
    modifiedPath = "".concat(context["".concat(category, "Sprite")], "#").concat(name);
  } else {
    // Otherwise, use external URLs for icons
    modifiedPath = context.iconPath && "".concat(context.iconPath, "/").concat(category, "-sprite/svg/symbols.svg#").concat(name);
  }

  return inlineData ? _react2.default.createElement(_svg2.default, _extends({
    data: inlineData,
    name: name
  }, rest)) : _react2.default.createElement("svg", _extends({
    key: "".concat(name, "_").concat(category)
  }, rest), _react2.default.createElement("use", {
    xlinkHref: modifiedPath
  }));
};

UtilityIcon.displayName = 'UtilityIcon';
UtilityIcon.propTypes = {
  assistiveText: _propTypes2.default.object,
  category: _propTypes2.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),

  /**
   * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
   */
  icon: _propTypes2.default.object,

  /**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
  name: _propTypes2.default.string,

  /**
   * Path to the icon. This will override any global icon settings.
   */
  path: _propTypes2.default.string
};
UtilityIcon.defaultProps = {
  category: 'utility'
};
UtilityIcon.contextTypes = {
  iconPath: _propTypes2.default.string,
  actionSprite: _propTypes2.default.string,
  customSprite: _propTypes2.default.string,
  doctypeSprite: _propTypes2.default.string,
  standardSprite: _propTypes2.default.string,
  utilitySprite: _propTypes2.default.string
};
exports.default = UtilityIcon;