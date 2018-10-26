"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _symbols = require("@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg");

var _symbols2 = _interopRequireDefault(_symbols);

var _symbols3 = require("@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg");

var _symbols4 = _interopRequireDefault(_symbols3);

var _symbols5 = require("@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg");

var _symbols6 = _interopRequireDefault(_symbols5);

var _symbols7 = require("@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg");

var _symbols8 = _interopRequireDefault(_symbols7);

var _symbols9 = require("@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg");

var _symbols10 = _interopRequireDefault(_symbols9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sprites = {
  action: _symbols2.default,
  custom: _symbols4.default,
  utility: _symbols6.default,
  standard: _symbols8.default,
  doctype: _symbols10.default
};

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    _classCallCheck(this, Example);

    return _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).apply(this, arguments));
  }

  _createClass(Example, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      Promise.all(Object.keys(sprites).map(function (category) {
        return fetch(sprites[category]).then(function (resp) {
          return resp.text();
        });
      })).then(function (texts) {
        _this.spriteInlineContainer.innerHTML = texts.join('');
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_iconSettings2.default, {
        onRequestIconPath: function onRequestIconPath(_ref) {
          var category = _ref.category,
              name = _ref.name;
          return "#".concat(name);
        }
      }, _react2.default.createElement("div", {
        ref: function ref(el) {
          _this2.spriteInlineContainer = el;
        }
      }), _react2.default.createElement("div", {
        className: "slds-grid slds-grid_pull-padded slds-grid_vertical-align-center"
      }, _react2.default.createElement("div", {
        className: "slds-col_padded"
      }, _react2.default.createElement(_icon2.default, {
        assistiveText: {
          label: 'Account'
        },
        category: "standard",
        name: "account",
        size: "small"
      })), _react2.default.createElement("div", {
        className: "slds-col_padded"
      }, _react2.default.createElement(_icon2.default, {
        assistiveText: {
          label: 'Announcement'
        },
        category: "utility",
        name: "announcement",
        size: "small"
      })), _react2.default.createElement("div", {
        className: "slds-col_padded"
      }, _react2.default.createElement(_icon2.default, {
        assistiveText: {
          label: 'Description'
        },
        category: "action",
        name: "description",
        size: "small"
      })), _react2.default.createElement("div", {
        className: "slds-col_padded"
      }, _react2.default.createElement(_icon2.default, {
        assistiveText: {
          label: 'XML'
        },
        category: "doctype",
        name: "xml",
        size: "small"
      })), _react2.default.createElement("div", {
        className: "slds-col_padded"
      }, _react2.default.createElement(_icon2.default, {
        assistiveText: {
          label: 'custom5'
        },
        category: "custom",
        name: "custom5",
        size: "small"
      }))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'IconSettingsExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime