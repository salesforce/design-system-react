"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _input = require("../../../../components/input");

var _input2 = _interopRequireDefault(_input);

var _inputIcon = require("../../../../components/icon/input-icon");

var _inputIcon2 = _interopRequireDefault(_inputIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'InputExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      className: "slds-grid slds-grid--pull-padded slds-grid--vertical-align-center"
    }, _react2.default.createElement("h1", {
      className: "slds-text-title_caps slds-p-vertical--medium"
    }, "Input with Icons"), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_input2.default, {
      iconLeft: _react2.default.createElement(_inputIcon2.default, {
        assistiveText: "Search",
        name: "search",
        category: "utility"
      }),
      id: "unique-id-1",
      label: "Input Label",
      placeholder: "Static Icon on the left"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_input2.default, {
      iconLeft: _react2.default.createElement(_inputIcon2.default, {
        assistiveText: "Search",
        name: "search",
        category: "utility",
        onClick: function onClick() {
          console.log('Icon Clicked');
        }
      }),
      iconRight: _react2.default.createElement(_inputIcon2.default, {
        assistiveText: "Clear",
        name: "clear",
        category: "utility",
        onClick: function onClick() {
          console.log('Icon Clicked');
        }
      }),
      id: "unique-id-2",
      label: "Input Label",
      placeholder: "Clickable Icons (Left and Right)"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_input2.default, {
      iconRight: _react2.default.createElement(_inputIcon2.default, {
        assistiveText: "Clear",
        name: "clear",
        category: "utility",
        onClick: function onClick() {
          console.log('Icon Clicked');
        }
      }),
      id: "unique-id-3",
      label: "Input Label",
      placeholder: "Clickable Icon on the right"
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_input2.default, {
      assistiveText: {
        spinner: 'Field data is loading'
      },
      iconRight: _react2.default.createElement(_inputIcon2.default, {
        assistiveText: "Clear",
        name: "clear",
        category: "utility",
        onClick: function onClick() {
          console.log('Icon Clicked');
        }
      }),
      hasSpinner: true,
      id: "unique-id-4",
      label: "Input Label",
      placeholder: "Loading Spinner Icon on the right"
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime