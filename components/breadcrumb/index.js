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
  (0, _checkProps2.default)(_constants.BREADCRUMB, props);
  var trail = props.trail;
  var assistiveText = typeof props.assistiveText === 'string' ? props.assistiveText : _objectSpread({}, defaultProps.assistiveText, props.assistiveText).label;
  return _react2.default.createElement("nav", {
    role: "navigation",
    "aria-label": assistiveText
  }, _react2.default.createElement("ol", {
    className: "slds-breadcrumb slds-list--horizontal"
  }, trail.map(function (crumb, index) {
    return (
      /* eslint-disable react/no-array-index-key */
      _react2.default.createElement("li", {
        key: index // There isn't any better reasonable way to identity these
        ,
        className: "slds-breadcrumb__item slds-text-title--caps"
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
  assistiveText: _propTypes2.default.shape({
    label: _propTypes2.default.string
  }),

  /**
   * An array of react elements presumably anchor elements.
   */
  trail: _propTypes2.default.array
};
Breadcrumb.defaultProps = defaultProps;
exports.default = Breadcrumb;