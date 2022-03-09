"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _progressBar = _interopRequireDefault(require("./progress-bar"));

var _constants = require("../../../utilities/constants");

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

// ### Prop Types
var propTypes = {
  /**
   * Assistive text for percentage
   */
  assistiveText: _propTypes.default.shape({
    percentage: _propTypes.default.string
  }),

  /**
   * Steps in the component
   */
  children: _propTypes.default.node,

  /**
   * CSS class names to be added to the container element.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string.isRequired,

  /**
   * Determines the orientation of the progress indicator
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * Percentage of progress completion, ranging [0, 100]
   */
  value: _propTypes.default.string.isRequired,

  /**
   * Determines component style
   */
  variant: _propTypes.default.oneOf(['base', 'modal', 'setup-assistant'])
};
/**
 * Progress renders all step buttons and a container wrapping these buttongs and a progress bar
 */

var Progress = /*#__PURE__*/function (_React$Component) {
  _inherits(Progress, _React$Component);

  var _super = _createSuper(Progress);

  function Progress() {
    _classCallCheck(this, Progress);

    return _super.apply(this, arguments);
  }

  _createClass(Progress, [{
    key: "getId",
    value:
    /**
     * Get the progress's HTML id. Generate a new one if no ID present.
     */
    function getId() {
      return this.props.id;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.getId(),
        className: (0, _classnames.default)('slds-progress', {
          'slds-progress_shade': this.props.variant === 'modal'
        }, {
          'slds-progress_vertical': this.props.orientation === 'vertical'
        }, {
          'slds-progress_success': this.props.variant === 'setup-assistant'
        }, this.props.className)
      }, /*#__PURE__*/_react.default.createElement("ol", {
        className: (0, _classnames.default)('slds-progress__list', {
          'slds-progress__list-bordered': this.props.variant === 'setup-assistant'
        })
      }, this.props.children), this.props.orientation !== 'vertical' && /*#__PURE__*/_react.default.createElement(_progressBar.default, {
        value: this.props.value,
        orientation: this.props.orientation,
        assistiveText: this.props.assistiveText
      }));
    }
  }]);

  return Progress;
}(_react.default.Component);

Progress.propTypes = propTypes;
Progress.displayName = _constants.PROGRESS_INDICATOR_PROGRESS;
var _default = Progress;
exports.default = _default;