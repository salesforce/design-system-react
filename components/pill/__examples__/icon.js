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

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _avatar = require("../../../../components/avatar");

var _avatar2 = _interopRequireDefault(_avatar);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

var Example = (0, _createReactClass2.default)({
  displayName: 'PillWithIconExample',
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
  getInitialState: function getInitialState() {
    return {
      pill1: true,
      pill2: true,
      pill3: true
    };
  },
  onClick: function onClick(event) {
    this.props.action('onClick')(event);
  },
  onRemove: function onRemove(event, pill) {
    this.props.action('onRemove')(event);
    this.setState(_defineProperty({}, pill, false));
  },
  render: function render() {
    var _this = this;

    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      className: "slds-grid slds-grid_pull-padded-medium"
    }, _react2.default.createElement("div", {
      className: "slds-p-horizontal_medium"
    }, this.state.pill1 ? _react2.default.createElement(_pill2.default, {
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
      onClick: this.onClick,
      onRemove: function onRemove(event) {
        return _this.onRemove(event, 'pill1');
      }
    }) : null), _react2.default.createElement("div", {
      className: "slds-p-horizontal_medium"
    }, this.state.pill2 ? _react2.default.createElement(_pill2.default, {
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
      onClick: this.onClick,
      onRemove: function onRemove(event) {
        return _this.onRemove(event, 'pill2');
      }
    }) : null), _react2.default.createElement("div", {
      className: "slds-p-horizontal_medium"
    }, this.state.pill3 ? _react2.default.createElement(_pill2.default, {
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
      onClick: this.onClick,
      onRemove: function onRemove(event) {
        return _this.onRemove(event, 'pill3');
      }
    }) : null)));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime