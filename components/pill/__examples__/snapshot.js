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

var _pill = require("../../../../components/pill");

var _pill2 = _interopRequireDefault(_pill);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _avatar = require("../../../../components/avatar");

var _avatar2 = _interopRequireDefault(_avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `~` is replaced with design-system-react at runtime
function noop() {}

var Example = (0, _createReactClass2.default)({
  displayName: 'PillExample',
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      className: "slds-grid slds-grid--pull-padded slds-grid--vertical-align-center"
    }, _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_pill2.default, {
      labels: {
        label: 'Pill Label',
        title: 'Full pill label verbiage mirrored here',
        removeTitle: 'Remove'
      },
      onClick: noop,
      onRemove: noop
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_pill2.default, {
      labels: {
        label: 'Pill Label',
        title: 'Full pill label verbiage mirrored here',
        removeTitle: 'Remove'
      },
      onRemove: noop
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_pill2.default, {
      labels: {
        label: 'Pill Label',
        title: 'Full pill label verbiage mirrored here',
        removeTitle: 'Remove'
      },
      icon: _react2.default.createElement(_icon2.default, {
        title: "Account",
        category: "standard",
        name: "account"
      }),
      onClick: noop,
      onRemove: noop
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_pill2.default, {
      labels: {
        label: 'Pill Label',
        title: 'Full pill label verbiage mirrored here',
        removeTitle: 'Remove'
      },
      avatar: _react2.default.createElement(_avatar2.default, {
        variant: "user",
        title: "User avatar",
        imgSrc: "https://lightningdesignsystem.com/assets/images/avatar2.jpg"
      }),
      onClick: noop,
      onRemove: noop
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
    }, _react2.default.createElement(_pill2.default, {
      labels: {
        label: 'Pill Label',
        title: 'Full pill label verbiage mirrored here',
        removeTitle: 'Remove'
      },
      hasError: true,
      icon: _react2.default.createElement(_icon2.default, {
        title: "Error",
        category: "utility",
        name: "warning",
        className: "slds-icon-text-error"
      }),
      onClick: noop,
      onRemove: noop
    })), _react2.default.createElement("div", {
      className: "slds-col--padded"
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
      onRemove: noop
    }))));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime