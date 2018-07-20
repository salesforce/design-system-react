"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _constants = require("../../../../../utilities/constants");

var _inline = require("../../inline");

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DemoInlineEdit = (0, _createReactClass2.default)({
  displayName: 'DemoInlineEdit',
  getInitialState: function getInitialState() {
    return {
      value: 'Edit me inline'
    };
  },
  handleChange: function handleChange(eventProps) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    (0, _react3.action)('change')(rest);

    if (eventProps.value === '') {
      this.setState({
        value: 'Edit me inline'
      });
    } else {
      this.setState({
        value: eventProps.value
      });
    }
  },
  render: function render() {
    return _react2.default.createElement(_inline2.default, _extends({}, this.props, {
      value: this.state.value,
      onChange: this.handleChange
    }));
  }
});
(0, _react3.storiesOf)(_constants.FORMS_INLINE_EDIT, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Base', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "Base Inline Edit Input"), _react2.default.createElement(DemoInlineEdit, {
    name: "inline-edit-standard",
    id: "inline-edit-standard"
  }));
}).add('Disabled', function () {
  return _react2.default.createElement("section", null, _react2.default.createElement("h1", {
    className: "slds-text-title_caps slds-p-vertical--medium"
  }, "Disabled Inline Edit Input"), _react2.default.createElement(DemoInlineEdit, {
    name: "inline-edit-disabled",
    id: "inline-edit-disabled",
    disabled: true
  }));
});