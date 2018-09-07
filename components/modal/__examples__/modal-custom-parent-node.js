"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

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
      isOpen: false
    };
  },
  getParent: function getParent() {
    return document.querySelector('#myModalContainer');
  },
  toggleOpen: function toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  },
  render: function render() {
    return _react2.default.createElement("div", {
      id: "myModalContainer"
    }, _react2.default.createElement(_button2.default, {
      label: "Open large modal",
      onClick: this.toggleOpen
    }), _react2.default.createElement(_modal2.default, {
      isOpen: this.state.isOpen,
      onRequestClose: this.toggleOpen,
      parentSelector: this.getParent,
      title: "Modal header"
    }, _react2.default.createElement("section", {
      className: "slds-p-around--medium"
    }, _react2.default.createElement("p", null, "Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis. Cillum sunt ad dolore quis aute consequat ipsum magna exercitation reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing."), _react2.default.createElement("p", null, "Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident. Eiusmod et adipisicing culpa deserunt nostrud ad veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim ullamco mollit enim excepteur ea."))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime