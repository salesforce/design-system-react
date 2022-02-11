"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var displayName = _constants.FILES;
var propTypes = {
  /**
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * Crop ratio for the file preview image
   */
  crop: _propTypes.default.oneOf(['16-by-9', '4-by-3', '1-by-1']),

  /**
   * Column class names to be added each file in the grid
   */
  columnClassName: _propTypes.default.string
};
var defaultProps = {
  crop: '4-by-3'
};
/**
 * Files is a component that wraps multiple file components that represent an attachment
 */

var Files = /*#__PURE__*/function (_React$Component) {
  _inherits(Files, _React$Component);

  var _super = _createSuper(Files);

  function Files(props) {
    var _this;

    _classCallCheck(this, Files);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }
  /**
   * Get the File's HTML id. Generate a new one if no ID present.
   */


  _createClass(Files, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var files = _react.default.Children.map(this.props.children, function (option) {
        return /*#__PURE__*/_react.default.createElement("li", {
          className: (0, _classnames.default)("slds-p-horizontal_xx-small slds-size_1-of-3 slds-medium-size_1-of-4", _this2.props.columnClassName)
        }, /*#__PURE__*/_react.default.cloneElement(option, {
          crop: option.props.crop ? option.props.crop : _this2.props.crop
        }));
      });

      return /*#__PURE__*/_react.default.createElement("ul", {
        className: (0, _classnames.default)('slds-grid slds-grid_pull-padded', this.props.className),
        id: this.getId()
      }, files);
    }
  }]);

  return Files;
}(_react.default.Component);

Files.displayName = displayName;
Files.propTypes = propTypes;
Files.defaultProps = defaultProps;
var _default = Files;
exports.default = _default;