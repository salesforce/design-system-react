"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _constants = require("../../utilities/constants");

var _button = _interopRequireDefault(require("../button"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  labels: {
    cancel: 'Cancel',
    save: 'Save'
  }
};

var EditDialog = /*#__PURE__*/function (_React$Component) {
  _inherits(EditDialog, _React$Component);

  var _super = _createSuper(EditDialog);

  function EditDialog() {
    var _this;

    _classCallCheck(this, EditDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleOpen", function () {
      _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        isOpen: false
      });
    });

    return _this;
  }

  _createClass(EditDialog, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onCancel = _this$props.onCancel,
          onSave = _this$props.onSave,
          restProps = _objectWithoutProperties(_this$props, ["onCancel", "onSave"]); // trigger button will either be passed in children or defaults to an edit button.


      var children = this.props.children ? this.props.children : /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: 'Edit: Status'
        },
        className: "slds-button_reset",
        disabled: this.props.disabled,
        iconCategory: "utility",
        iconClassName: "slds-button__icon slds-button__icon_hint",
        iconName: "edit",
        onClick: this.props.handleOpen,
        variant: "icon",
        style: {
          verticalAlign: 'middle'
        }
      });
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      return /*#__PURE__*/_react.default.createElement(_index.default, _extends({
        classNameFooter: ['slds-p-top_xxx-small', 'slds-p-bottom_xx-small', 'slds-p-right_large'],
        classNameBody: ['slds-p-bottom_xx-small'],
        footer: /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-text-align_right slds-text-align_right slds-p-bottom_x-small slds-p-right_xx-small"
        }, /*#__PURE__*/_react.default.createElement(_button.default, {
          label: labels.cancel,
          onClick: onCancel
        }), /*#__PURE__*/_react.default.createElement(_button.default, {
          disabled: !this.props.isModified,
          variant: "brand",
          label: labels.save,
          onClick: onSave
        })),
        footerStyle: {
          borderTop: '0px'
        },
        onClose: this.handleClose,
        onRequestClose: this.handleClose,
        onOpen: this.handleOpen
      }, restProps), children);
    }
  }]);

  return EditDialog;
}(_react.default.Component);

_defineProperty(EditDialog, "displayName", _constants.POPOVER_EDIT_DIALOG);

_defineProperty(EditDialog, "propTypes", {
  /**
   * Disables the edit dialog and prevents clicking it.
   */
  disabled: _propTypes.default.bool,

  /**
   * By default, a unique ID will be created at render to support keyboard navigation, ARIA roles, and connect the popover to the triggering button. This ID will be applied to the triggering element. `${id}-popover`, `${id}-dialog-heading`, `${id}-dialog-body` are also created.
   */
  id: _propTypes.default.string,

  /**
   * Set to true when inputs within the popover are modified.
   */
  isModified: _propTypes.default.bool,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `cancel`: text for Cancel button
   * * `save`: text for Save button
   *
   * _Tested with snapshot testing._
   */
  labels: _propTypes.default.shape({
    cancel: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
    save: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
  }),

  /**
   * This function is passed onto the cancel `Button`. Triggered when the trigger button is clicked.
   */
  onCancel: _propTypes.default.func,

  /**
   * This function is passed onto the save `Button`. Triggered when the trigger button is clicked.
   */
  onSave: _propTypes.default.func,

  /**
   * Popover of type `~/components/popover`. This popover will be cloned and additional props appended, if passed in.
   */
  popover: _propTypes.default.node
});

EditDialog.defaultProps = defaultProps;
var _default = EditDialog;
exports.default = _default;