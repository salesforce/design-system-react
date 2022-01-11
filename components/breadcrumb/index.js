"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _constants = require("../../utilities/constants");

var _menuDropdown = _interopRequireDefault(require("./../menu-dropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `label`: The assistive text for the breadcrumb trail.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

  /**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
   */
  id: _propTypes.default.string,

  /**
   * Overflow menu of the type [Dropdown](/components/menu-dropdowns)
   */
  overflowDropdownMenu: _propTypes.default.node,

  /**
   * Custom styles to be passed to the containing `nav` tag
   */
  styleContainer: _propTypes.default.object,

  /**
   * An array of anchor elements that define the path to the current record.
   */
  trail: _propTypes.default.array.isRequired
};
var defaultProps = {
  assistiveText: {
    label: 'Breadcrumbs'
  }
};

var getBreadcrumbDropdown = function getBreadcrumbDropdown(overflowDropdownMenu, props) {
  var overflowDropdownMenuProps = _objectSpread(_objectSpread({}, overflowDropdownMenu.props), {}, {
    id: "".concat(props.id, "-dropdown"),
    iconCategory: 'utility',
    iconName: 'threedots',
    iconVariant: 'bare',
    threedots: true
  });

  return /*#__PURE__*/_react.default.createElement("li", {
    className: "slds-breadcrumb__item"
  }, /*#__PURE__*/_react.default.createElement(_menuDropdown.default, overflowDropdownMenuProps));
};
/**
 * Use breadcrumbs to note the path of a record and help the user to navigate back to the parent.Breadcrumb based on SLDS 2.1.0-dev
 */


var Breadcrumb = function Breadcrumb(props) {
  (0, _checkProps.default)(_constants.BREADCRUMB, props, _component.default);
  var overflowDropdownMenu = props.overflowDropdownMenu,
      trail = props.trail;
  var assistiveText = typeof props.assistiveText === 'string' ? props.assistiveText : _objectSpread(_objectSpread({}, defaultProps.assistiveText), props.assistiveText).label;
  return /*#__PURE__*/_react.default.createElement("nav", {
    role: "navigation",
    "aria-label": assistiveText,
    style: props.styleContainer
  }, /*#__PURE__*/_react.default.createElement("ol", {
    className: "slds-breadcrumb slds-list_horizontal"
  }, overflowDropdownMenu && getBreadcrumbDropdown(overflowDropdownMenu, props), trail.map(function (crumb, index) {
    return (
      /*#__PURE__*/

      /* eslint-disable react/no-array-index-key */
      _react.default.createElement("li", {
        key: index // There isn't any better reasonable way to identity these
        ,
        className: "slds-breadcrumb__item"
      }, crumb)
    );
  })));
};

Breadcrumb.displayName = _constants.BREADCRUMB;
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;
var _default = Breadcrumb;
exports.default = _default;