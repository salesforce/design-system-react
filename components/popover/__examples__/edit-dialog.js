"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _editDialog = _interopRequireDefault(require("../../../../components/popover/edit-dialog"));

var _input = _interopRequireDefault(require("../../../../components/input"));

var _button = _interopRequireDefault(require("../../../../components/button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_FIRST_NAME = 'John';
var DEFAULT_LAST_NAME = 'Smith';

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example(props) {
    var _this;

    _classCallCheck(this, Example);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Example).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (inputName) {
      return function (event, _ref) {
        var value = _ref.value;

        if (inputName === 'first-name') {
          _this.setState({
            firstName: value
          });
        } else {
          _this.setState({
            lastName: value
          });
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function (event, data) {
      if (_this.props.log) {
        _this.props.log('onClose')(event, data);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRequestClose", function (event, data) {
      if (_this.props.log) {
        _this.props.log('handleRequestClose');
      }

      _this.setState({
        isOpen: false,
        firstName: _this.state.prevFirstName,
        lastName: _this.state.prevLastName
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSave", function (event, data) {
      _this.setState({
        prevFirstName: _this.state.firstName,
        prevLastName: _this.state.lastName,
        isOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpen", function () {
      _this.setState({
        isOpen: true
      });
    });

    var defaultFirstName = 'John';
    var defaultLastName = 'Smith';
    _this.state = {
      isOpen: _this.props.isOpen,
      firstName: DEFAULT_FIRST_NAME,
      // stores firstName in edit input field
      lastName: DEFAULT_LAST_NAME,
      // stores lastName in edit input field
      prevFirstName: DEFAULT_FIRST_NAME,
      prevLastName: DEFAULT_LAST_NAME
    };
    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      // Body of Edit Dialog that is shown when clicking on edit button (pencil icon)
      var editDialogPopoverBody = _react.default.createElement("div", {
        className: "slds-form slds-form_stacked slds-p-top_medium slds-p-right_small slds-p-left_small"
      }, _react.default.createElement(_input.default, {
        id: "first-name",
        label: "First Name",
        value: this.state.firstName,
        onChange: this.onChange('first-name')
      }), _react.default.createElement(_input.default, {
        id: "last-name",
        label: "Last Name",
        value: this.state.lastName,
        onChange: this.onChange('last-name')
      }));

      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", null, _react.default.createElement("span", {
        className: "slds-p-right_x-small"
      }, this.state.prevFirstName, " ", this.state.prevLastName), _react.default.createElement(_editDialog.default, {
        ariaLabelledby: "Edit Name",
        body: editDialogPopoverBody,
        isModified: this.state.firstName !== this.state.prevFirstName || this.state.lastName !== this.state.prevLastName,
        onCancel: this.handleRequestClose,
        onClose: this.handleClose,
        onRequestClose: this.handleRequestClose,
        onSave: this.handleSave,
        handleOpen: this.handleOpen,
        position: "absolute",
        align: "top left",
        id: "edit-dialog-popover",
        isOpen: this.state.isOpen
      })));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'PopoverExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;