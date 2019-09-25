"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var propTypes = {
  /**
   * Children are expected to be components. If last button triggers a dropdown menu, use Dropdown instead of Button. _Tested with snapshot testing._
   */
  children: _propTypes.default.node.isRequired,

  /**
   * CSS classes added to `slds-button-group` or `slds-checkbox_button-group` tag
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * If the `labels.label` prop is set, a `.slds-form-element` classed fieldset element is added as a container. This prop applies classes to that element
   */
  classNameContainer: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `error`: Message to display when any of Checkboxes are in an error state. _Tested with snapshot testing._
   * * `label`: This label appears above the button group. _Tested with snapshot testing._
   */
  labels: _propTypes.default.shape({
    error: _propTypes.default.string,
    label: _propTypes.default.string
  }),

  /**
   * Use checkbox variant for "Checkbox Button Group" styling and add Checkbox components as children _Tested with snapshot testing._
   */
  variant: _propTypes.default.oneOf(['checkbox', 'list'])
};
var defaultProps = {
  labels: {}
};
/**
 * The ButtonGroup component wraps other components (ie. Button, MenuDropdown, PopoverTooltip, Checkboxes, etc).
 */

var ButtonGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ButtonGroup, _React$Component);

  function ButtonGroup() {
    _classCallCheck(this, ButtonGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(ButtonGroup).apply(this, arguments));
  }

  _createClass(ButtonGroup, [{
    key: "render",
    value: function render() {
      // Merge objects of strings with their default object
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      var zeroIndexLength = _react.default.Children.count(this.props.children) - 1;
      var children = this.props.children;

      if (zeroIndexLength > 0) {
        children = _react.default.Children.map(this.props.children, function (child, index) {
          var newChild;

          if (index === zeroIndexLength) {
            newChild = _react.default.cloneElement(child, {
              triggerClassName: 'slds-button_last'
            });
          }

          return newChild || child;
        });
      }

      var component;

      if (this.props.variant === 'checkbox') {
        children = _react.default.Children.map(this.props.children, function (child) {
          return _react.default.cloneElement(child, {
            variant: 'button-group'
          });
        });
        component = _react.default.createElement("div", {
          className: (0, _classnames.default)('slds-checkbox_button-group', this.props.className)
        }, children);
      } else if (this.props.variant === 'list') {
        component = _react.default.createElement("ul", {
          className: (0, _classnames.default)('slds-button-group-list', this.props.className)
        }, _react.default.Children.map(this.props.children, function (child) {
          return _react.default.createElement("li", null, child);
        }));
      } else {
        component = _react.default.createElement("div", {
          className: (0, _classnames.default)('slds-button-group', this.props.className),
          role: "group"
        }, children);
      }

      if (this.props.variant === 'checkbox' || this.props.labels.label) {
        component = _react.default.createElement("fieldset", {
          className: (0, _classnames.default)('slds-form-element', {
            'slds-has-error': labels.error
          }, this.props.classNameContainer)
        }, _react.default.createElement("legend", {
          className: "slds-form-element__legend slds-form-element__label"
        }, this.props.labels.label), _react.default.createElement("div", {
          className: "slds-form-element__control"
        }, component, labels.error ? _react.default.createElement("div", {
          className: "slds-form-element__help"
        }, labels.error) : null));
      }

      return component;
    }
  }]);

  return ButtonGroup;
}(_react.default.Component);

ButtonGroup.displayName = _constants.BUTTON_GROUP;
ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;
var _default = ButtonGroup;
exports.default = _default;