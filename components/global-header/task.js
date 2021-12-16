"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _button = _interopRequireDefault(require("../button"));

var _menuDropdown = _interopRequireDefault(require("../menu-dropdown"));

var _buttonTrigger = _interopRequireDefault(require("../menu-dropdown/button-trigger"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `triggerButton`: Assistive text for the GlobalHeaderTask trigger button. The default is `Global Actions`.
   */
  assistiveText: _propTypes.default.shape({
    triggerButton: _propTypes.default.string
  }),

  /**
   * A `Dropdown` component. The props from this dropdown will be merged and override any default props. This also allows custom content to be passed as children and rendered in the dropdown.
   */
  dropdown: _propTypes.default.node
};
/**
 * A GlobalHeaderTask component.
 */

var GlobalHeaderTask = /*#__PURE__*/function (_React$Component) {
  _inherits(GlobalHeaderTask, _React$Component);

  var _super = _createSuper(GlobalHeaderTask);

  function GlobalHeaderTask() {
    _classCallCheck(this, GlobalHeaderTask);

    return _super.apply(this, arguments);
  }

  _createClass(GlobalHeaderTask, [{
    key: "render",
    value: function render() {
      var buttonAriaProps = {
        'aria-haspopup': true
      };
      var dropdownProps = (0, _lodash.default)({
        align: 'right',
        nubbinPosition: 'top right'
      }, this.props.dropdown ? this.props.dropdown.props : {});
      var dropdownChildren = dropdownProps.children || null; // eslint-disable-next-line fp/no-delete

      delete dropdownProps.children;
      return /*#__PURE__*/_react.default.createElement(_menuDropdown.default, dropdownProps, /*#__PURE__*/_react.default.createElement(_buttonTrigger.default, null, /*#__PURE__*/_react.default.createElement(_button.default, _extends({
        assistiveText: {
          icon: this.props.assistiveText.triggerButton
        },
        className: "slds-button_icon slds-global-actions__task slds-global-actions__item-action",
        iconCategory: "utility",
        iconName: "add",
        iconSize: "small",
        iconVariant: "container",
        title: this.props.assistiveText.triggerButton,
        variant: "icon"
      }, buttonAriaProps))), dropdownChildren);
    }
  }]);

  return GlobalHeaderTask;
}(_react.default.Component);

GlobalHeaderTask.displayName = _constants.GLOBAL_HEADER_TASK;
GlobalHeaderTask.defaultProps = {
  assistiveText: {
    triggerButton: 'Global Actions'
  }
};
GlobalHeaderTask.propTypes = propTypes;
var _default = GlobalHeaderTask;
exports.default = _default;