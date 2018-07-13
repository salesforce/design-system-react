"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _pill = require("../../../../components/pill");

var _pill2 = _interopRequireDefault(_pill);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

var Example = (0, _createReactClass2.default)({
  displayName: 'BarePillListboxExample',
  propTypes: {
    action: _react.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      action: function action() {
        return noop;
      }
    };
  },
  onRemove: function onRemove(event) {
    this.props.action('onRemove')(event);
  },
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", null, _react2.default.createElement("div", {
      className: "slds-p-vertical_medium"
    }, _react2.default.createElement("h3", {
      className: "slds-text-heading_small"
    }, "Static Examples")), _react2.default.createElement("div", {
      className: "slds-grid slds-grid_vertical-align-start"
    }, _react2.default.createElement("div", {
      className: "slds-pill_container"
    }, _react2.default.createElement("ul", {
      className: "slds-listbox slds-listbox_horizontal slds-listbox_inline",
      role: "listbox",
      "aria-label": "Selected Options:",
      "aria-orientation": "horizontal"
    }, _react2.default.createElement("li", {
      className: "slds-listbox-item",
      role: "presentation"
    }, _react2.default.createElement(_pill2.default, {
      labels: {
        label: 'Pill Label',
        title: 'Full pill label verbiage mirrored here',
        removeTitle: 'Remove'
      },
      assistiveText: {
        remove: 'Press delete or backspace to remove'
      },
      bare: true,
      variant: "option",
      tabIndex: "0",
      "aria-selected": "true",
      onRemove: this.onRemove
    })), _react2.default.createElement("li", {
      className: "slds-listbox-item",
      role: "presentation"
    }, _react2.default.createElement(_pill2.default, {
      labels: {
        label: 'Pill Label',
        title: 'Full pill label verbiage mirrored here',
        removeTitle: 'Remove'
      },
      assistiveText: {
        remove: 'Press delete or backspace to remove'
      },
      bare: true,
      variant: "option",
      tabIndex: "0",
      "aria-selected": "true",
      onRemove: this.onRemove
    })))))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime