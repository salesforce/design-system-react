"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _popover = _interopRequireDefault(require("../../../../components/popover"));

var _button = _interopRequireDefault(require("../../../../components/button"));

var _icon = _interopRequireDefault(require("../../../../components/icon"));

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

var panelContent = _react.default.createElement("div", null, _react.default.createElement("dl", {
  className: "slds-popover__body-list"
}, _react.default.createElement("dt", {
  className: "slds-m-bottom_small"
}, _react.default.createElement("div", {
  className: "slds-media slds-media_center"
}, _react.default.createElement("div", {
  className: "slds-media__figure"
}, _react.default.createElement(_icon.default, {
  assistiveText: {
    label: 'Opportunity Icon'
  },
  category: "standard",
  name: "opportunity",
  size: "small",
  tabIndex: "0"
})), _react.default.createElement("div", {
  className: "slds-media__body"
}, _react.default.createElement("p", {
  id: "ALTERNATIVE-HEADING",
  className: "slds-text-heading_small slds-hyphenate"
}, "Opportunities (1+)")))), _react.default.createElement("dd", {
  className: "slds-tile"
}, _react.default.createElement("p", {
  className: "slds-truncate",
  title: "Tesla - Mule ESB"
}, _react.default.createElement("a", {
  href: "javascript:void(0);"
}, "Tesla - Mule ESB")), _react.default.createElement("div", {
  className: "slds-tile__detail"
}, _react.default.createElement("dl", {
  className: "slds-dl_horizontal slds-text-body_small"
}, _react.default.createElement("dt", {
  className: "slds-dl_horizontal__label"
}, _react.default.createElement("p", {
  className: "slds-truncate",
  title: "Value"
}, "Value")), _react.default.createElement("dd", {
  className: "slds-dl_horizontal__detail slds-tile__meta"
}, _react.default.createElement("p", {
  className: "slds-truncate",
  title: "$500,000"
}, "$500,000")), _react.default.createElement("dt", {
  className: "slds-dl_horizontal__label"
}, _react.default.createElement("p", {
  className: "slds-truncate",
  title: "Close Date"
}, "Close Date")), _react.default.createElement("dd", {
  className: "slds-dl_horizontal__detail slds-tile__meta"
}, _react.default.createElement("p", {
  className: "slds-truncate",
  title: "Dec 15, 2015"
}, "Dec 15, 2015"))))), _react.default.createElement("dd", {
  className: "slds-m-top_x-small slds-text-align_right"
}, _react.default.createElement("a", {
  href: "javascript:void(0);",
  title: "View all Opportunities"
}, "View All"))));

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
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", null, _react.default.createElement(_popover.default, {
        ariaLabelledby: "ALTERNATIVE-HEADING",
        body: panelContent,
        id: "popover-alternative-header"
      }, _react.default.createElement(_button.default, {
        label: "Trigger Popover"
      }))));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'PopoverExample');

var _default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime

exports.default = _default;