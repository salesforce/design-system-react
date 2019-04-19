"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _docs = _interopRequireDefault(require("./docs.json"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  assistiveText: {
    label: 'Breadcrumbs'
  }
};
/**
 * Use breadcrumbs to note the path of a record and help the user to navigate back to the parent.Breadcrumb based on SLDS 2.1.0-dev
 */

var Breadcrumb = function Breadcrumb(props) {
  (0, _checkProps.default)(_constants.BREADCRUMB, props, _docs.default);
  var trail = props.trail;
  var assistiveText = typeof props.assistiveText === 'string' ? props.assistiveText : _objectSpread({}, defaultProps.assistiveText, props.assistiveText).label;
  return _react.default.createElement("nav", {
    role: "navigation",
    "aria-label": assistiveText
  }, _react.default.createElement("ol", {
    className: "slds-breadcrumb slds-list_horizontal"
  }, trail.map(function (crumb, index) {
    return (
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
Breadcrumb.propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `label`: The assistive text for the breadcrumb trail.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

  /**
   * An array of react elements presumably anchor elements.
   */
  trail: _propTypes.default.array
};
Breadcrumb.defaultProps = defaultProps;
var _default = Breadcrumb;
exports.default = _default;