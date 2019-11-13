"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _classNames = _interopRequireDefault(require("../../utilities/class-names"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * The brand band provides theming capability that adds personality and improves information density and contrast.
 *
 * NOTE: you may find that themes other than 'default' fail to load the appropriate styling in your application.
 * If this occurs the cause is very likely to be CSP settings on the server hosting your application protecting against style injections.
 * Changing these settings is not recommended. Instead, add the following styles to any stylesheet provided by the server itself (such as an external stylesheet):
 *
 * When using 'lightning-theme':
 * .slds-brand-band.dsr-brand-band_lightning-blue:before {
 *     background-image: url(/assets/images/themes/oneSalesforce/banner-brand-default.png), linear-gradient(to top, rgba(175, 197, 222, 0) 0, #1B5F9E);
 * }
 * .slds-brand-band.dsr-brand-band_lightning-blue:after {
 *     background-image: linear-gradient(to bottom, rgba(175, 197, 222, 0) 60%, #AFC5DE);
 * }
 *
 * For more information on the problem, [see this Stack Overflow question](https://stackoverflow.com/questions/17766817/refused-to-apply-inline-style-because-it-violates-the-following-content-security)
 */
var BrandBand =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BrandBand, _React$Component);

  _createClass(BrandBand, null, [{
    key: "injectLightningBlueStyles",
    value: function injectLightningBlueStyles() {
      return _react.default.createElement("style", null, ".slds-brand-band.dsr-brand-band_lightning-blue:before {\n\tbackground-image: url(/assets/images/themes/oneSalesforce/banner-brand-default.png), linear-gradient(to top, rgba(175, 197, 222, 0) 0, #1B5F9E);\n}\n.slds-brand-band.dsr-brand-band_lightning-blue:after {\n\tbackground-image: linear-gradient(to bottom, rgba(175, 197, 222, 0) 60%, #AFC5DE);\n}");
    }
  }]);

  function BrandBand(props) {
    var _this;

    _classCallCheck(this, BrandBand);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BrandBand).call(this, props));
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
      return _react.default.createElement("div", {
        style: _objectSpread({
          background: 'rgb(176, 196, 223)',
          height: '100%',
          position: 'relative',
          width: '100%',
          zIndex: 1
        }, props.styleContainer)
      }, BrandBand.injectLightningBlueStyles(), _react.default.createElement("div", {
        className: (0, _classNames.default)('slds-brand-band', {
          'slds-brand-band_small': props.size === 'small',
          'slds-brand-band_medium': props.size === 'medium',
          'slds-brand-band_large': props.size === 'large',
          'slds-brand-band_cover': props.backgroundSize === 'cover',
          'slds-brand-band_none': props.image === 'none',
          'dsr-brand-band_lightning-blue': true
        }, props.className),
        id: this.getId(),
        style: props.style
      }, props.children));
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
  image: _propTypes.default.oneOf(['default', 'none']),

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
  style: _propTypes.default.object,

  /**
   * Custom styles to be passed to the component container
   */
  styleContainer: _propTypes.default.object,

  /**
   * Different brand band styling.
   * NOTE: using 'lightning-blue' may result in incorrect styling depending on server CSP settings. See opening component documentation above for details.
   */
  theme: _propTypes.default.oneOf(['default', 'lightning-blue'])
};
BrandBand.defaultProps = {
  backgroundSize: 'contain',
  image: 'default',
  size: 'medium',
  theme: 'default'
};
var _default = BrandBand;
exports.default = _default;