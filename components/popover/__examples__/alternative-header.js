"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _popover = require("../../../../components/popover");

var _popover2 = _interopRequireDefault(_popover);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var panelContent = _react2.default.createElement("div", null, _react2.default.createElement("dl", {
  className: "slds-popover__body-list"
}, _react2.default.createElement("dt", {
  className: "slds-m-bottom_small"
}, _react2.default.createElement("div", {
  className: "slds-media slds-media_center"
}, _react2.default.createElement("div", {
  className: "slds-media__figure"
}, _react2.default.createElement(_icon2.default, {
  assistiveText: {
    label: 'Opportunity Icon'
  },
  category: "standard",
  name: "opportunity",
  size: "small",
  tabIndex: "0"
})), _react2.default.createElement("div", {
  className: "slds-media__body"
}, _react2.default.createElement("p", {
  id: "ALTERNATIVE-HEADING",
  className: "slds-text-heading_small slds-hyphenate"
}, "Opportunities (1+)")))), _react2.default.createElement("dd", {
  className: "slds-tile"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "Tesla - Mule ESB"
}, _react2.default.createElement("a", {
  href: "javascript:void(0);"
}, "Tesla - Mule ESB")), _react2.default.createElement("div", {
  className: "slds-tile__detail"
}, _react2.default.createElement("dl", {
  className: "slds-dl_horizontal slds-text-body_small"
}, _react2.default.createElement("dt", {
  className: "slds-dl_horizontal__label"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "Value"
}, "Value")), _react2.default.createElement("dd", {
  className: "slds-dl_horizontal__detail slds-tile__meta"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "$500,000"
}, "$500,000")), _react2.default.createElement("dt", {
  className: "slds-dl_horizontal__label"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "Close Date"
}, "Close Date")), _react2.default.createElement("dd", {
  className: "slds-dl_horizontal__detail slds-tile__meta"
}, _react2.default.createElement("p", {
  className: "slds-truncate",
  title: "Dec 15, 2015"
}, "Dec 15, 2015"))))), _react2.default.createElement("dd", {
  className: "slds-m-top_x-small slds-text-align_right"
}, _react2.default.createElement("a", {
  href: "javascript:void(0);",
  title: "View all Opportunities"
}, "View All"))));

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).apply(this, arguments));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement("div", null, _react2.default.createElement(_popover2.default, {
        ariaLabelledby: "ALTERNATIVE-HEADING",
        body: panelContent,
        id: "popover-alternative-header"
      }, _react2.default.createElement(_button2.default, {
        label: "Trigger Popover"
      }))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'PopoverExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime