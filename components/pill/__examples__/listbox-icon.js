"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pill = require("../../../../components/pill");

var _pill2 = _interopRequireDefault(_pill);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var PILLS = [{
  category: 'standard',
  name: 'account'
}, {
  category: 'standard',
  name: 'case'
}, {
  category: 'utility',
  name: 'retweet'
}, {
  category: 'standard',
  name: 'solution'
}, {
  category: 'standard',
  name: 'custom_notification'
}, {
  category: 'standard',
  name: 'email'
}, {
  category: 'standard',
  name: 'endorsement'
}, {
  category: 'standard',
  name: 'recent'
}, {
  category: 'custom',
  name: 'custom31'
}];

var noop = function noop() {
  return undefined;
};

var getAllOn = function getAllOn() {
  return PILLS.reduce(function (result, item, index) {
    result['pill' + index] = true;
    return result;
  }, {});
};

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: getAllOn()
    }), Object.defineProperty(_assertThisInitialized(_this), "onClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.props.action('onClick')(event);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "onRemove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, pill) {
        _this.props.action('onRemove')(event);

        _this.setState(_defineProperty({}, pill, false));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderListItem", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(icon, index) {
        if (_this.state['pill' + index]) {
          return _react2.default.createElement("li", {
            className: "slds-listbox-item",
            role: "presentation",
            key: index
          }, _react2.default.createElement(_pill2.default, {
            labels: {
              label: 'Pill Label',
              title: 'Full pill label verbiage mirrored here',
              removeTitle: 'Remove'
            },
            assistiveText: {
              remove: 'Press delete or backspace to remove'
            },
            variant: "option",
            icon: _react2.default.createElement(_icon2.default, {
              title: "Title",
              category: icon.category,
              name: icon.name
            }),
            onClick: _this.onClick,
            onRemove: function onRemove() {
              return _this.onRemove(event, 'pill' + index);
            }
          }));
        }

        return null;
      }
    }), _temp));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement("div", null, _react2.default.createElement("div", {
        className: "slds-grid slds-grid_vertical-align-start"
      }, _react2.default.createElement("div", {
        className: "slds-pill_container"
      }, _react2.default.createElement("ul", {
        className: "slds-listbox slds-listbox_horizontal slds-listbox_inline",
        role: "listbox",
        "aria-label": "Selected Options:",
        "aria-orientation": "horizontal"
      }, PILLS.map(this.renderListItem))))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'PillWithIconListboxExample'
});
Object.defineProperty(Example, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    action: _propTypes2.default.func
  }
});
Object.defineProperty(Example, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    action: function action() {
      return noop;
    }
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime