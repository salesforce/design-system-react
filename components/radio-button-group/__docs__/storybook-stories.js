"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react3 = require("@storybook/react");

var _radioButtonGroup = require("../../radio-button-group");

var _radioButtonGroup2 = _interopRequireDefault(_radioButtonGroup);

var _radio = require("../../radio-button-group/radio");

var _radio2 = _interopRequireDefault(_radio);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var RadioButtonGroupExample =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RadioButtonGroupExample, _React$Component);

  function RadioButtonGroupExample(props) {
    var _this;

    _classCallCheck(this, RadioButtonGroupExample);

    _this = _possibleConstructorReturn(this, (RadioButtonGroupExample.__proto__ || Object.getPrototypeOf(RadioButtonGroupExample)).call(this, props));
    _this.state = {
      checked: 'Tue'
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RadioButtonGroupExample, [{
    key: "onChange",
    value: function onChange(event) {
      this.setState({
        checked: event.target.value
      });
      (0, _react3.action)('onChange')(event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      return _react2.default.createElement("div", null, _react2.default.createElement("h1", {
        className: "slds-text-title_caps slds-p-vertical--medium"
      }, this.props.heading), _react2.default.createElement(_radioButtonGroup2.default, {
        labels: this.props.labels,
        onChange: this.onChange,
        disabled: this.props.disabled,
        required: this.props.required
      }, days.map(function (day) {
        return _react2.default.createElement(_radio2.default, {
          key: day,
          label: day,
          value: day,
          checked: _this2.state.checked === day,
          variant: "button-group"
        });
      })));
    }
  }]);

  return RadioButtonGroupExample;
}(_react2.default.Component);

RadioButtonGroupExample.propTypes = {
  labels: _propTypes2.default.shape({
    error: _propTypes2.default.string,
    label: _propTypes2.default.string
  }),
  disabled: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  heading: _propTypes2.default.string
};
RadioButtonGroupExample.defaultProps = {
  labels: {
    label: 'Day of week'
  }
};
(0, _react3.storiesOf)(_constants.RADIO_BUTTON_GROUP, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, getStory());
}).add('Base', function () {
  return _react2.default.createElement(RadioButtonGroupExample, {
    heading: "Base"
  });
}).add('Disabled', function () {
  return _react2.default.createElement(RadioButtonGroupExample, {
    heading: "Disabled",
    disabled: true
  });
}).add('Required', function () {
  return _react2.default.createElement(RadioButtonGroupExample, {
    heading: "Required",
    required: true
  });
}).add('Error', function () {
  return _react2.default.createElement(RadioButtonGroupExample, {
    heading: "Error",
    labels: {
      label: 'Day of week',
      error: 'There is an error'
    }
  });
});