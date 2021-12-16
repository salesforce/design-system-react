"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classNames = _interopRequireDefault(require("../../utilities/class-names"));

var _constants = require("../../utilities/constants");

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

// PropTypes for the component
var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `label`: Used as a visually hidden label to describe the dynamic icon.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

  /**
   * CSS class names to be added to the icon.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Pauses the icon animation if the value is true.
   */
  isPaused: _propTypes.default.bool,

  /**
   * Disables icon animation if set to true
   */
  isStatic: _propTypes.default.bool,

  /**
   * Polarity values for the 'score' variant. Defaults to 'positive'
   */
  scorePolarity: _propTypes.default.oneOf(['positive', 'negative']),

  /**
   * Range of strength values for the 'strength' variant. Defaults to '0'.
   */
  strengthLevel: _propTypes.default.oneOf(['-3', '-2', '-1', '0', '1', '2', '3', -3, -2, -1, 0, 1, 2, 3]),

  /**
   * HTML title attribute.
   */
  title: _propTypes.default.string.isRequired,

  /**
   * Signals direction for the 'trend' variant. The default value 'neutral' points to the east.
   */
  trendDirection: _propTypes.default.oneOf(['down', 'up', 'neutral']),

  /**
   * Different types of dynamic icons. Possible variants:
   *
   * `ellie` - Displays a pulsing blue circle, which pulses and stops after one animation cycle.
   * `eq` - Displays an animated graph with three bars that rise and fall randomly.
   * `score` - Displays a green filled circle or a red unfilled circle.
   * `strength` - Displays three animated horizontal circles that are colored green or red.
   * `trend` - Displays animated arrows that point up, down, or straight.
   * `waffle` - Displays a 3x3 grid of dots that animates on hover.
   */
  variant: _propTypes.default.oneOf(['ellie', 'eq', 'score', 'strength', 'trend', 'typing', 'waffle']).isRequired
};
/**
 * A set of delightful animated icons.
 */

var DynamicIcon = /*#__PURE__*/function (_React$Component) {
  _inherits(DynamicIcon, _React$Component);

  var _super = _createSuper(DynamicIcon);

  function DynamicIcon() {
    _classCallCheck(this, DynamicIcon);

    return _super.apply(this, arguments);
  }

  _createClass(DynamicIcon, [{
    key: "getIconChildren",
    value: function getIconChildren() {
      var children = [];
      var defaultAssistiveText = this.props.title ? this.props.title : "".concat(this.props.variant.charAt(0).toUpperCase()).concat(this.props.variant.slice(1));

      if (this.props.variant === 'ellie') {
        children = [/*#__PURE__*/_react.default.createElement("svg", {
          viewBox: "0 0 280 14",
          "aria-hidden": "true"
        }, /*#__PURE__*/_react.default.createElement("circle", {
          cx: "7",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "7",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "21",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "21",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "35",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "35",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "49",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "49",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "63",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "63",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "77",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "77",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "91",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "91",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "105",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "105",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "119",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "119",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "133",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "133",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "147",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "147",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "161",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "161",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "175",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "175",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "189",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "189",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "203",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "203",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "217",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "217",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "231",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "231",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "245",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "245",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "259",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "259",
          cy: "7",
          r: "3"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "273",
          cy: "7",
          r: "4"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          cx: "273",
          cy: "7",
          r: "3"
        }))];
      } else if (this.props.variant === 'eq') {
        children = [/*#__PURE__*/_react.default.createElement("div", {
          className: "slds-icon-eq__bar"
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-icon-eq__bar"
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-icon-eq__bar"
        })];
      } else if (this.props.variant === 'score') {
        children = [/*#__PURE__*/_react.default.createElement("svg", {
          viewBox: "0 0 5 5",
          className: "slds-icon-score__positive",
          "aria-hidden": "true"
        }, /*#__PURE__*/_react.default.createElement("circle", {
          cx: "50%",
          cy: "50%",
          r: "1.875"
        })), /*#__PURE__*/_react.default.createElement("svg", {
          viewBox: "0 0 5 5",
          className: "slds-icon-score__negative",
          "aria-hidden": "true"
        }, /*#__PURE__*/_react.default.createElement("circle", {
          cx: "50%",
          cy: "50%",
          r: "1.875"
        }))];
      } else if (this.props.variant === 'strength') {
        children = [/*#__PURE__*/_react.default.createElement("svg", {
          viewBox: "0 0 27 7",
          "aria-hidden": "true"
        }, /*#__PURE__*/_react.default.createElement("circle", {
          r: "3.025",
          cx: "3.5",
          cy: "3.5"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          r: "3.025",
          cx: "13.5",
          cy: "3.5"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          r: "3.025",
          cx: "23.5",
          cy: "3.5"
        }))];
      } else if (this.props.variant === 'trend') {
        children = [/*#__PURE__*/_react.default.createElement("svg", {
          viewBox: "0 0 16 16",
          "aria-hidden": "true"
        }, /*#__PURE__*/_react.default.createElement("path", {
          className: "slds-icon-trend__arrow",
          d: "M.75 8H11M8 4.5L11.5 8 8 11.5"
        }), /*#__PURE__*/_react.default.createElement("circle", {
          className: "slds-icon-trend__circle",
          cy: "8",
          cx: "8",
          r: "7.375",
          transform: "rotate(-28 8 8) scale(-1 1) translate(-16 0)"
        }))];
      } else if (this.props.variant === 'typing') {
        children = [/*#__PURE__*/_react.default.createElement("span", {
          className: "slds-icon-typing__dot"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-icon-typing__dot"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-icon-typing__dot"
        })];

        if (!this.props.title) {
          defaultAssistiveText = 'User is typing';
        }
      } else if (this.props.variant === 'waffle') {
        children = [/*#__PURE__*/_react.default.createElement("span", {
          className: "slds-icon-waffle"
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-r1"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-r2"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-r3"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-r4"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-r5"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-r6"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-r7"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-r8"
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-r9"
        }))];

        if (!this.props.title) {
          defaultAssistiveText = 'Open App Launcher';
        }
      } // eslint-disable-next-line fp/no-mutating-methods


      children.push( /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, this.props.assistiveText && this.props.assistiveText.label ? this.props.assistiveText.label : defaultAssistiveText));
      return children;
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.getIconChildren();
      var classes = [{
        'slds-is-animated': !this.props.isStatic,
        'slds-is-paused': this.props.isPaused
      }];
      var iconProps = {
        title: this.props.title
      };
      var element = 'span';

      if (this.props.variant === 'waffle') {
        // eslint-disable-next-line fp/no-mutating-methods
        classes.unshift('slds-button', 'slds-icon-waffle_container');
        element = 'button';
      } else {
        // eslint-disable-next-line fp/no-mutating-methods
        classes.unshift("slds-icon-".concat(this.props.variant));

        if (this.props.variant === 'eq') {
          element = 'div';
        } else if (this.props.variant === 'score') {
          iconProps['data-slds-state'] = this.props.scorePolarity ? this.props.scorePolarity : 'positive';
        } else if (this.props.variant === 'strength') {
          iconProps['data-slds-strength'] = this.props.strengthLevel !== undefined ? "".concat(this.props.strengthLevel) : '0';
        } else if (this.props.variant === 'trend') {
          iconProps['data-slds-trend'] = this.props.trendDirection ? this.props.trendDirection : 'neutral';
        }
      }

      iconProps.className = (0, _classNames.default)(classes, this.props.className);
      return /*#__PURE__*/_react.default.createElement.apply(_react.default, [element, iconProps].concat(_toConsumableArray(children)));
    }
  }]);

  return DynamicIcon;
}(_react.default.Component);

DynamicIcon.displayName = _constants.DYNAMIC_ICON;
DynamicIcon.propTypes = propTypes;
var _default = DynamicIcon;
exports.default = _default;