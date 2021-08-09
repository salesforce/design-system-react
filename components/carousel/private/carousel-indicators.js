"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * CarouselIndicators is used to display the list of indicators associated to the number of panels
 * a carousel has
 */
var CarouselIndicators = /*#__PURE__*/function (_React$Component) {
  _inherits(CarouselIndicators, _React$Component);

  var _super = _createSuper(CarouselIndicators);

  function CarouselIndicators() {
    var _this;

    _classCallCheck(this, CarouselIndicators);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
      _this["indicator".concat(_this.props.currentIndex)].focus();

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    });

    return _this;
  }

  _createClass(CarouselIndicators, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.hasFocus && this["indicator".concat(this.props.currentIndex)]) {
        this["indicator".concat(this.props.currentIndex)].focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      return /*#__PURE__*/_react.default.createElement("ul", {
        className: "slds-carousel__indicators slds-col slds-text-align_center",
        role: "tablist"
      }, _toConsumableArray(Array(props.noOfIndicators).keys()).map(function (index) {
        var isSelectedPanel = index === props.currentIndex;
        var indicatorActionClassName = (0, _classnames.default)('slds-carousel__indicator-action', props.className, {
          'slds-is-active': isSelectedPanel
        });
        var assistiveText = "".concat(index);
        var title = "".concat(index);
        var id = '';

        if (props.items && props.items.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          id = props.items[index].id;
          var startItemIndex = index * props.itemsPerPanel;
          var autoIndicatorText = ''; // eslint-disable-next-line fp/no-loops

          for (var i = startItemIndex; i < startItemIndex + props.itemsPerPanel; i += 1) {
            if (props.items[i] && props.items[i].heading) {
              autoIndicatorText = !autoIndicatorText ? '' : "".concat(autoIndicatorText, ", ");
              autoIndicatorText += props.items[i].heading;
            }
          }

          if (autoIndicatorText) {
            assistiveText = autoIndicatorText;
            title = autoIndicatorText;
          }
        }

        return /*#__PURE__*/_react.default.createElement("li", {
          className: "slds-carousel__indicator slds-m-horizontal_xx-small",
          key: index,
          role: "presentation",
          style: {
            margin: 0,
            padding: '0 5px'
          }
        }, /*#__PURE__*/_react.default.createElement("a", {
          ref: function ref(component) {
            _this2["indicator".concat(index)] = component;
          },
          id: "indicator-id-".concat(props.carouselId, "-").concat(index),
          className: indicatorActionClassName,
          role: "tab",
          tabIndex: isSelectedPanel ? '0' : '-1',
          "aria-selected": isSelectedPanel,
          "aria-controls": props.getPanelId({
            carouselId: props.carouselId,
            itemId: id
          }),
          title: title,
          onBlur: props.onBlur,
          onClick: function onClick(event) {
            return props.onClick(event, index);
          },
          onFocus: _this2.onFocus
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-assistive-text"
        }, assistiveText)));
      }));
    }
  }]);

  return CarouselIndicators;
}(_react.default.Component);

CarouselIndicators.displayName = _constants.CAROUSEL_INDICATORS;
CarouselIndicators.defaultProps = {
  currentIndex: 0
}; // ### Prop Types

CarouselIndicators.propTypes = {
  /**
   * Carousel HTML ID
   */
  carouselId: _propTypes.default.string,

  /**
   * CSS classes that are applied to the component
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Selected indicator
   */
  currentIndex: _propTypes.default.number,

  /**
   * Passed from carousel parent state, dictates if indicator currently has focus
   */
  hasFocus: _propTypes.default.bool,

  /**
   * Array of objects with shape, needed for building a carousel items
   */
  items: _propTypes.default.array,

  /**
   * Number of items to be displayed at a time in the carousel
   */
  itemsPerPanel: _propTypes.default.number,

  /**
   * Number of indicators to be displayed (corresponds to the number of panels in the carousel)
   */
  noOfIndicators: _propTypes.default.number.isRequired,

  /**
   * Fires on indicator blur, allows parent carousel to adjust indicatorsHaveFocus state accordingly
   */
  onBlur: _propTypes.default.func,

  /**
   * Triggered when the indicator is clicked.
   */
  onClick: _propTypes.default.func,

  /**
   * Fires on indicator focus, allows parent carousel to adjust indicatorsHaveFocus state accordingly
   */
  onFocus: _propTypes.default.func
};
var _default = CarouselIndicators;
exports.default = _default;