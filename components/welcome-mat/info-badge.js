"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _icon = _interopRequireDefault(require("../icon"));

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

var displayName = _constants.WELCOME_MAT_BADGE;
var propTypes = {
  /**
   *  **Assistive text for accessibility.**
   * * `completed` : For users of assistive technology, assistive text for completed icon.
   */
  assistiveText: _propTypes.default.shape({
    completed: _propTypes.default.string
  }),

  /**
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * Icon for the tile
   */
  image: _propTypes.default.string,

  /**
   * Whether the trail is completed
   */
  isComplete: _propTypes.default.bool,

  /**
   * Actions to be rendered on completion of the trail
   */
  onCompleteRenderActions: _propTypes.default.func
};
var defaultProps = {
  isComplete: false,
  variant: 'steps'
};
/**
 * InfoBadge component item represents a tile in a Welcome Mat
 */

var InfoBadge = /*#__PURE__*/function (_React$Component) {
  _inherits(InfoBadge, _React$Component);

  var _super = _createSuper(InfoBadge);

  function InfoBadge(props) {
    var _this;

    _classCallCheck(this, InfoBadge);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }
  /**
   * Get the Welcome Mat Info Badge's HTML id. Generate a new one if no ID present.
   */


  _createClass(InfoBadge, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getCompletedText",
    value: function getCompletedText() {
      return this.props.assistiveText && this.props.assistiveText.completed ? this.props.assistiveText.completed : 'Completed';
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.getId(),
        className: this.props.className
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-welcome-mat__info-badge-container"
      }, /*#__PURE__*/_react.default.createElement("img", {
        className: "slds-welcome-mat__info-badge",
        src: this.props.image,
        width: "50",
        height: "50",
        alt: ""
      }), /*#__PURE__*/_react.default.createElement(_icon.default, {
        category: "action",
        name: "check",
        assistiveText: {
          label: this.getCompletedText()
        }
      })), this.props.children, this.props.isComplete ? this.props.onCompleteRenderActions() : null);
    }
  }]);

  return InfoBadge;
}(_react.default.Component);

InfoBadge.displayName = displayName;
InfoBadge.propTypes = propTypes;
InfoBadge.defaultProps = defaultProps;
var _default = InfoBadge;
exports.default = _default;