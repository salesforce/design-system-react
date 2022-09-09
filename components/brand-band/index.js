"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _classNames = _interopRequireDefault(require("../../utilities/class-names"));

var _checkProps = _interopRequireDefault(require("./check-props"));

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

/**
 * The brand band provides theming capability that adds personality and improves information density and contrast.
 */
var BrandBand = /*#__PURE__*/function (_React$Component) {
  _inherits(BrandBand, _React$Component);

  var _super = _createSuper(BrandBand);

  function BrandBand(props) {
    var _this;

    _classCallCheck(this, BrandBand);

    _this = _super.call(this, props);
    (0, _checkProps.default)(_constants.BRAND_BAND, _this.props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(BrandBand, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classNames.default)('slds-brand-band', {
          'slds-brand-band_small': props.size === 'small',
          'slds-brand-band_medium': props.size === 'medium',
          'slds-brand-band_large': props.size === 'large',
          'slds-brand-band_cover': props.backgroundSize === 'cover',
          'slds-brand-band_none': props.image === 'none',
          'slds-brand-band_group': props.image === 'group',
          'slds-brand-band_user': props.image === 'user'
        }, props.className),
        id: this.getId(),
        style: props.style
      }, props.children);
    }
  }]);

  return BrandBand;
}(_react.default.Component);

BrandBand.displayName = _constants.BRAND_BAND;
BrandBand.propTypes = {
  /**
   * Primary application grid layout or a white background component such as a `Card` should be passed into this component.
   */
  children: _propTypes.default.node,

  /**
   * CSS classes that are applied to the component
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Id of component, if desired. If not provided an id is automatically generated
   */
  id: _propTypes.default.string,

  /**
   * Image of the brand band
   */
  image: _propTypes.default.oneOf(['default', 'none', 'group', 'user']),

  /**
   * Background size of the brand band. Default is 'contain'
   */
  backgroundSize: _propTypes.default.oneOf(['contain', 'cover']),

  /**
   * Size of the brand band. Default is 'medium'
   */
  size: _propTypes.default.oneOf(['small', 'medium', 'large']),

  /**
   * Custom styles to be passed to the component
   */
  style: _propTypes.default.object
};
BrandBand.defaultProps = {
  backgroundSize: 'contain',
  image: 'default',
  size: 'medium'
};
var _default = BrandBand;
exports.default = _default;