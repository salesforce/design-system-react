"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GridColumn =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GridColumn, _React$Component);

  function GridColumn() {
    _classCallCheck(this, GridColumn);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridColumn).apply(this, arguments));
  }

  _createClass(GridColumn, [{
    key: "getClassName",
    value: function getClassName() {
      return "".concat(this.props.className, " slds-col");
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: this.getClassName()
      }, this.props.children);
    }
  }]);

  return GridColumn;
}(_react.default.Component);

var Grid =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Grid, _React$Component2);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
  }

  _createClass(Grid, [{
    key: "getClassName",
    value: function getClassName() {
      var flavor = this.props.flavor;
      return (0, _classnames.default)(this.props.className, 'slds-grid', _defineProperty({}, "slds-grid_".concat(flavor), flavor));
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: this.getClassName()
      }, this.props.children);
    }
  }]);

  return Grid;
}(_react.default.Component);

Grid.Column = GridColumn;
var _default = Grid;
exports.default = _default;