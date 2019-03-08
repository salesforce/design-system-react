"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _classNames = require("../../utilities/class-names");

var _classNames2 = _interopRequireDefault(_classNames);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      return _react2.default.createElement("style", null, ".slds-brand-band.dsr-brand-band_lightning-blue:before {\n\tbackground-image: url(/assets/images/themes/oneSalesforce/banner-brand-default.png), linear-gradient(to top, rgba(175, 197, 222, 0) 0, #1B5F9E);\n}\n.slds-brand-band.dsr-brand-band_lightning-blue:after {\n\tbackground-image: linear-gradient(to bottom, rgba(175, 197, 222, 0) 60%, #AFC5DE);\n}");
    }
  }]);

  function BrandBand(props) {
    var _this;

    _classCallCheck(this, BrandBand);

    _this = _possibleConstructorReturn(this, (BrandBand.__proto__ || Object.getPrototypeOf(BrandBand)).call(this, props));
    _this.generatedId = _shortid2.default.generate();
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
      return _react2.default.createElement("div", {
        style: _objectSpread({
          background: props.theme === 'lightning-blue' ? 'rgb(176, 196, 223)' : 'rgb(250, 250, 249)',
          height: '100%',
          position: 'relative',
          width: '100%',
          zIndex: 1
        }, props.styleContainer)
      }, props.theme === 'lightning-blue' && BrandBand.injectLightningBlueStyles(), _react2.default.createElement("div", {
        className: (0, _classNames2.default)('slds-brand-band', {
          'slds-brand-band_small': props.size === 'small',
          'slds-brand-band_medium': props.size === 'medium',
          'slds-brand-band_large': props.size === 'large',
          'slds-brand-band_none': props.image === 'none',
          'dsr-brand-band_lightning-blue': props.theme === 'lightning-blue'
        }, props.className),
        id: this.getId(),
        style: props.style
      }, props.children));
    }
  }]);

  return BrandBand;
}(_react2.default.Component);

BrandBand.displayName = _constants.BRAND_BAND;
BrandBand.propTypes = {
  /**
   * Primary application grid layout or a white background component such as a `Card` should be passed into this component.
   */
  children: _propTypes2.default.node,

  /**
   * CSS classes that are applied to the component
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Id of component, if desired. If not provided an id is automatically generated
   */
  id: _propTypes2.default.string,

  /**
   * Image of the brand band
   */
  image: _propTypes2.default.oneOf(['default', 'none']),

  /**
   * Size of the brand band. Default is 'medium'
   */
  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),

  /**
   * Custom styles to be passed to the component
   */
  style: _propTypes2.default.object,

  /**
   * Custom styles to be passed to the component container
   */
  styleContainer: _propTypes2.default.object,

  /**
   * Different brand band styling.
   * NOTE: using 'lightning-blue' may result in incorrect styling depending on server CSP settings. See opening component documentation above for details.
   */
  theme: _propTypes2.default.oneOf(['default', 'lightning-blue'])
};
BrandBand.defaultProps = {
  image: 'default',
  size: 'medium',
  theme: 'default'
};
exports.default = BrandBand;