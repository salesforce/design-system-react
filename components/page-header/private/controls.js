"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var displayName = 'PageHeaderControls';
var propTypes = {
  /**
   * Optional class name
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Type of this controls component ('actions' or 'controls')
   */
  type: _propTypes.default.oneOf(['actions', 'controls'])
};
var defaultProps = {};

var Controls = /*#__PURE__*/function (_Component) {
  _inherits(Controls, _Component);

  var _super = _createSuper(Controls);

  function Controls() {
    _classCallCheck(this, Controls);

    return _super.apply(this, arguments);
  }

  _createClass(Controls, [{
    key: "render",
    value: function render() {
      var controls;
      var isUsingLegacyProp;
      var legacyControls;
      var vettedControls;

      if (this.props.type === 'actions') {
        if (this.props.onRenderActions) {
          controls = this.props.onRenderActions();
        } else if (this.props.contentRight) {
          controls = this.props.contentRight;
          isUsingLegacyProp = true;
        }
      } else if (this.props.onRenderControls) {
        controls = this.props.onRenderControls();
      } else if (this.props.navRight) {
        controls = this.props.navRight;
        isUsingLegacyProp = true;
      }

      if (controls) {
        if (controls.type && controls.type.displayName === _constants.PAGE_HEADER_CONTROL) {
          vettedControls = controls;
        } else if (controls.props && controls.props.children) {
          vettedControls = [];

          _react.default.Children.forEach(controls.props.children, function (child) {
            if (child && child.type && child.type.displayName === _constants.PAGE_HEADER_CONTROL) {
              // eslint-disable-next-line fp/no-mutating-methods
              vettedControls.push(child);
            }
          });
        } // Backward compatibility for older 'contentRight' & 'navRight' structures.


        if (isUsingLegacyProp && (!vettedControls || vettedControls.length < 1)) {
          if (typeof controls !== 'string') {
            legacyControls = /*#__PURE__*/_react.default.createElement("div", _extends({
              className: "slds-page-header__controls"
            }, controls.props));
          } else {
            legacyControls = /*#__PURE__*/_react.default.createElement("div", {
              className: "slds-page-header__controls"
            }, controls);
          }
        }

        return /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)("slds-page-header__col-".concat(this.props.type), this.props.className)
        }, legacyControls || /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-page-header__controls"
        }, vettedControls));
      }

      return null;
    }
  }]);

  return Controls;
}(_react.Component);

Controls.displayName = displayName;
Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;
var _default = Controls;
exports.default = _default;