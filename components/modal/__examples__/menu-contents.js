"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _modal = require("../../../../components/modal");

var _modal2 = _interopRequireDefault(_modal);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _lookup = require("../../../../components/lookup");

var _lookup2 = _interopRequireDefault(_lookup);

var _combobox = require("../../../../components/combobox");

var _combobox2 = _interopRequireDefault(_combobox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var leadSourceOptions = [{
  id: 1,
  label: 'Third Party Program',
  value: 'A0'
}, {
  id: 2,
  label: 'Cold Call',
  value: 'B0'
}, {
  id: 3,
  label: 'LinkedIn',
  value: 'C0'
}, {
  id: 4,
  label: 'Direct Mail',
  value: 'D0'
}, {
  id: 5,
  label: 'Other',
  value: 'E0'
}];
var opportunityTypeOptions = [{
  id: 1,
  label: 'Add on Business',
  value: 'A0'
}, {
  id: 2,
  label: 'Courtesy',
  value: 'B0'
}, {
  id: 3,
  label: 'New Business',
  value: 'C0'
}, {
  id: 4,
  label: 'Renewal',
  value: 'D0'
}, {
  id: 5,
  label: 'Upgrade',
  value: 'E0'
}];

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        isOpen: false,
        leadSourceSelection: [leadSourceOptions[0]],
        opportunityTypeSelection: [opportunityTypeOptions[0]]
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "toggleOpen", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          isOpen: !_this.state.isOpen
        });
      }
    }), _temp));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
        label: "Open modal with menu contents",
        onClick: this.toggleOpen
      }), _react2.default.createElement(_modal2.default, {
        isOpen: this.state.isOpen,
        footer: [_react2.default.createElement(_button2.default, {
          label: "Cancel",
          onClick: this.toggleOpen
        }), _react2.default.createElement(_button2.default, {
          label: "Save",
          variant: "brand",
          onClick: this.toggleOpen
        })],
        onRequestClose: this.toggleOpen,
        title: "New Opportunity"
      }, _react2.default.createElement("section", {
        className: "slds-p-around_large"
      }, _react2.default.createElement("div", {
        className: "slds-form-element slds-m-bottom_large"
      }, _react2.default.createElement("label", {
        className: "slds-form-element__label",
        htmlFor: "opptyName"
      }, "Opportunity Name"), _react2.default.createElement("div", {
        className: "slds-form-element__control"
      }, _react2.default.createElement("input", {
        id: "opptyName",
        className: "slds-input",
        type: "text",
        placeholder: "Enter name"
      }))), _react2.default.createElement("div", {
        className: "slds-form-element slds-m-bottom_large"
      }, _react2.default.createElement("label", {
        className: "slds-form-element__label",
        htmlFor: "description"
      }, "Opportunity Description"), _react2.default.createElement("div", {
        className: "slds-form-element__control"
      }, _react2.default.createElement("textarea", {
        id: "description",
        className: "slds-textarea",
        placeholder: "Enter description"
      }))), _react2.default.createElement("div", {
        className: "slds-form-element slds-m-bottom_large"
      }, _react2.default.createElement(_lookup2.default, {
        emptyMessage: "No items found",
        hasError: false,
        label: "Account",
        onChange: function onChange(newValue) {
          console.log('New search term: ', newValue);
        },
        onSelect: function onSelect(item) {
          console.log(item, ' Selected');
        },
        options: [{
          type: 'section',
          label: 'SECTION 1'
        }, {
          label: "Paddy's Pub"
        }, {
          label: 'Tyrell Corp'
        }, {
          type: 'section',
          label: 'SECTION 2'
        }, {
          label: 'Paper St. Soap Company'
        }, {
          label: 'Nakatomi Investments'
        }, {
          label: 'Acme Landscaping'
        }, {
          type: 'section',
          label: 'SECTION 3'
        }, {
          label: 'Acme Construction'
        }],
        sectionDividerRenderer: _lookup2.default.DefaultSectionDivider
      })), _react2.default.createElement("div", {
        className: "slds-m-bottom_large"
      }, _react2.default.createElement(_combobox2.default, {
        events: {
          onSelect: function onSelect(event, data) {
            var selection = data.selection.length === 0 ? _this2.state.leadSourceSelection : data.selection;
            console.log('selected: ', selection[0].label);

            _this2.setState({
              leadSourceSelection: selection
            });
          }
        },
        labels: {
          label: 'Lead Source',
          placeholder: 'Select Lead Source'
        },
        menuPosition: "relative",
        options: leadSourceOptions,
        selection: this.state.leadSourceSelection,
        variant: "readonly"
      })), _react2.default.createElement("div", {
        className: "slds-m-bottom_large"
      }, _react2.default.createElement(_combobox2.default, {
        events: {
          onSelect: function onSelect(event, data) {
            var selection = data.selection.length === 0 ? _this2.state.opportunityTypeSelection : data.selection;
            console.log('selected: ', selection[0].label);

            _this2.setState({
              opportunityTypeSelection: selection
            });
          }
        },
        labels: {
          label: 'Type',
          placeholder: 'Select Opportunity Type'
        },
        menuPosition: "relative",
        options: opportunityTypeOptions,
        selection: this.state.opportunityTypeSelection,
        variant: "readonly"
      })), _react2.default.createElement("div", {
        className: "slds-form-element slds-m-bottom_large"
      }, _react2.default.createElement("label", {
        className: "slds-form-element__label",
        htmlFor: "amount"
      }, "Amount"), _react2.default.createElement("div", {
        className: "slds-form-element__control"
      }, _react2.default.createElement("input", {
        id: "amount",
        className: "slds-input",
        type: "text",
        placeholder: "Enter Amount"
      })))))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'ModalExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime