"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _iconSettings = _interopRequireDefault(require("../../icon-settings"));

var _constants = require("../../../utilities/constants");

var _ = _interopRequireDefault(require("../"));

var _default = _interopRequireDefault(require("../__examples__/default"));

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

/* eslint-disable max-len */
var ipsum = 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit ametrisus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo.';
/* eslint-enable max-len */

var DemoExpandableSectionControlled =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DemoExpandableSectionControlled, _React$Component);

  function DemoExpandableSectionControlled(props) {
    var _this;

    _classCallCheck(this, DemoExpandableSectionControlled);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DemoExpandableSectionControlled).call(this, props));
    _this.state = {
      isOpen: true
    };
    return _this;
  }

  _createClass(DemoExpandableSectionControlled, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_.default, {
        id: "controlled-expandable-section",
        isOpen: this.state.isOpen,
        onToggleOpen: function onToggleOpen(event, data) {
          console.log('got here! ', event, data);
          (0, _addonActions.action)('Toggle expandable section!');

          _this2.setState({
            isOpen: !_this2.state.isOpen
          });
        },
        title: "Section Title"
      }, _react.default.createElement("p", null, ipsum));
    }
  }]);

  return DemoExpandableSectionControlled;
}(_react.default.Component);

_defineProperty(DemoExpandableSectionControlled, "displayName", 'DemoExpandableSectionControlled');

(0, _react2.storiesOf)(_constants.EXPANDABLE_SECTION, module).addDecorator(function (getStory) {
  return _react.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react.default.createElement(_iconSettings.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Default', function () {
  return _react.default.createElement(_default.default, null);
}).add('Controlled', function () {
  return _react.default.createElement(DemoExpandableSectionControlled, null);
}).add('Non-collapsible', function () {
  return _react.default.createElement(_.default, {
    id: "non-collapsible-expandable-section",
    nonCollapsible: true,
    title: "Section Title"
  }, _react.default.createElement("p", null, ipsum));
});