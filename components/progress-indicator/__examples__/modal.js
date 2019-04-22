"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _progressIndicator = _interopRequireDefault(require("../../../../components/progress-indicator"));

var _modal = _interopRequireDefault(require("../../../../components/modal"));

var _button = _interopRequireDefault(require("../../../../components/button"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var steps = [{
  id: 0,
  label: _react.default.createElement("i", null, "tooltip label #1"),
  assistiveText: 'This is custom text in the assistive text key'
}, {
  id: 1,
  label: 'tooltip label #2'
}, {
  id: 2,
  label: _react.default.createElement("strong", null, "tooltip label #3")
}, {
  id: 3,
  label: 'tooltip label #4'
}, {
  id: 4,
  label: 'tooltip label #5'
}];

var handleStepEvent = function handleStepEvent(event, data) {
  console.log(data);
};

var getModal = function getModal(props) {
  return _react.default.createElement(_modal.default, props);
};

var modalFooter = function modalFooter(props) {
  return [_react.default.createElement(_button.default, {
    key: "modalBCancel",
    label: "Cancel"
  }), _react.default.createElement(_progressIndicator.default, {
    key: "modal-progress-indicator",
    variant: "modal",
    steps: steps,
    selectedStep: steps[2],
    completedSteps: steps.slice(0, 2),
    errorSteps: steps.slice(2, 3),
    onStepClick: handleStepEvent
  }), _react.default.createElement(_button.default, {
    key: "modalBSave",
    label: "Save",
    variant: "brand"
  })];
};

var modalContent = _react.default.createElement("div", {
  className: "slds-modal__content slds-grow slds-p-around_medium",
  id: "modal-content-id-1",
  style: {
    height: '640px'
  }
});

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, _getPrototypeOf(Example).apply(this, arguments));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        style: {
          height: '640px'
        }
      }, getModal({
        isOpen: true,
        title: 'Modal Header',
        children: modalContent,
        onRequestClose: (0, _addonActions.action)('modal closed'),
        footer: modalFooter(this.props),
        size: 'large',
        footerClassNames: 'slds-grid slds-grid_align-spread'
      }));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'ProgressIndicatorModal');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;