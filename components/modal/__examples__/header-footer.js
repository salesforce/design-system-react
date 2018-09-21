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

var _modal = require("../../../../components/modal");

var _modal2 = _interopRequireDefault(_modal);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
var Example = (0, _createReactClass2.default)({
  displayName: 'ModalExample',
  getInitialState: function getInitialState() {
    return {
      noHeaderIsOpen: false,
      noFooterIsOpen: false
    };
  },
  toggleNoHeaderIsOpen: function toggleNoHeaderIsOpen() {
    this.setState({
      noHeaderIsOpen: !this.state.noHeaderIsOpen
    });
  },
  toggleNofooterIsOpen: function toggleNofooterIsOpen() {
    this.setState({
      noFooterIsOpen: !this.state.noFooterIsOpen
    });
  },
  render: function render() {
    var modal = this.state.noHeaderIsOpen ? _react2.default.createElement(_modal2.default, {
      assistiveText: {
        dialogLabel: 'Modal no header'
      },
      isOpen: this.state.noHeaderIsOpen,
      onRequestClose: this.toggleNoHeaderIsOpen
    }, _react2.default.createElement("section", {
      className: "slds-p-around--medium"
    }, _react2.default.createElement("p", null, "Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis. Cillum sunt ad dolore quis aute consequat ipsum magna exercitation reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing."), _react2.default.createElement("p", null, "Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident. Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim ullamco mollit enim excepteur ea."))) : _react2.default.createElement(_modal2.default, {
      isOpen: this.state.noFooterIsOpen,
      onRequestClose: this.toggleNofooterIsOpen,
      title: "Modal Header"
    }, _react2.default.createElement("section", {
      className: "slds-p-around--medium"
    }, _react2.default.createElement("p", null, "Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis. Cillum sunt ad dolore quis aute consequat ipsum magna exercitation reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing."), _react2.default.createElement("p", null, "Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident. Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim ullamco mollit enim excepteur ea.")));
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", null, _react2.default.createElement(_button2.default, {
      label: "Open no header",
      onClick: this.toggleNoHeaderIsOpen
    }), _react2.default.createElement(_button2.default, {
      label: "Open no footer",
      onClick: this.toggleNofooterIsOpen
    }), modal));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime