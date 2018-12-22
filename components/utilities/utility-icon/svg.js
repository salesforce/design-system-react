"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Svg =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Svg, _React$Component);

  function Svg() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Svg);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Svg.__proto__ || Object.getPrototypeOf(Svg)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "getPaths", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(paths) {
        if (paths instanceof Array) {
          return paths.map(function (item) {
            return _react2.default.createElement("path", item);
          });
        }

        return _react2.default.createElement("path", _extends({
          key: "pathSVG"
        }, paths));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getCircles", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(circles) {
        if (circles instanceof Array) {
          return circles.map(function (item) {
            return _react2.default.createElement("circle", item);
          });
        }

        return _react2.default.createElement("circle", _extends({
          key: "circleSVG"
        }, circles));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getEllipses", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(ellipses) {
        if (ellipses instanceof Array) {
          return ellipses.map(function (item) {
            return _react2.default.createElement("ellipse", item);
          });
        }

        return _react2.default.createElement("ellipse", _extends({
          key: "ellipseSVG"
        }, ellipses));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getGroups", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(groups) {
        if (groups instanceof Array) {
          return groups.map(function (item) {
            return _react2.default.createElement("g", null, _this.getShapes(item));
          });
        }

        return _react2.default.createElement("g", {
          key: "groupsSVG"
        }, _this.getShapes(groups));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getShapes", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(data) {
        var shapes = [];

        if (data) {
          if (data.g) {
            shapes.push(_this.getGroups(data.g));
          }

          if (data.ellipse) {
            shapes.push(_this.getEllipses(data.ellipse));
          }

          if (data.circle) {
            shapes.push(_this.getCircles(data.circle));
          }

          if (data.path) {
            shapes.push(_this.getPaths(data.path));
          }
        }

        return shapes;
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getSVG", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_ref2, props) {
        var viewBox = _ref2.viewBox,
            rest = _objectWithoutProperties(_ref2, ["viewBox"]);

        return _react2.default.createElement("svg", {
          "aria-hidden": props['aria-hidden'],
          className: props.className,
          viewBox: viewBox,
          name: props.name,
          style: props.style
        }, _this.getShapes(rest));
      }
    }), _temp));
  }

  _createClass(Svg, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          data = _props.data,
          props = _objectWithoutProperties(_props, ["data"]);

      return data ? this.getSVG(data, props) : null;
    }
  }]);

  return Svg;
}(_react2.default.Component);

Object.defineProperty(Svg, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'Svg'
});
exports.default = Svg;