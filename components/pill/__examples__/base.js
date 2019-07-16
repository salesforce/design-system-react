"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _pill = _interopRequireDefault(require("../../../../components/pill"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {
  return undefined;
};

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Example)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      linked: true,
      unlinked: true,
      truncated: true
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (event) {
      _this.props.action('onClick')(event);
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveLinked", function (event) {
      _this.props.action('onRemove')(event);

      _this.setState({
        linked: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveUnlinked", function (event) {
      _this.props.action('onRemove')(event);

      _this.setState({
        unlinked: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveTruncated", function (event) {
      _this.props.action('onRemove')(event);

      _this.setState({
        truncated: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderLinked", function () {
      if (_this.state.linked) {
        return _react.default.createElement(_pill.default, {
          labels: {
            label: 'Pill Label',
            title: 'Full pill label verbiage mirrored here',
            removeTitle: 'Remove'
          },
          onClick: _this.onClick,
          onRemove: _this.onRemoveLinked
        });
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderUnlinked", function () {
      if (_this.state.unlinked) {
        return _react.default.createElement(_pill.default, {
          labels: {
            label: 'Pill Label',
            title: 'Full pill label verbiage mirrored here',
            removeTitle: 'Remove'
          },
          onRemove: _this.onRemoveUnlinked
        });
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderTruncated", function () {
      if (_this.state.truncated) {
        return _react.default.createElement("div", {
          style: {
            width: '220px',
            position: 'relative'
          }
        }, _react.default.createElement("div", {
          className: "slds-pill_container"
        }, _react.default.createElement(_pill.default, {
          labels: {
            label: 'Pill label that is longer than the area that contains it',
            removeTitle: 'Remove'
          },
          onClick: _this.onClick,
          onRemove: _this.onRemoveTruncated
        })));
      }

      return null;
    });

    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", {
        className: "slds-grid slds-grid_pull-padded-medium"
      }, _react.default.createElement("div", {
        className: "slds-p-horizontal_medium"
      }, this.renderLinked()), _react.default.createElement("div", {
        className: "slds-p-horizontal_medium"
      }, this.renderUnlinked()), _react.default.createElement("div", {
        className: "slds-p-horizontal_medium"
      }, this.renderTruncated())));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'BasePillExample');

_defineProperty(Example, "propTypes", {
  action: _propTypes.default.func
});

_defineProperty(Example, "defaultProps", {
  action: function action() {
    return noop;
  }
});

var _default = Example;
exports.default = _default;