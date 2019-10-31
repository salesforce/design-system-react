"use strict";

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

var InfoBadge =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InfoBadge, _React$Component);

  function InfoBadge() {
    _classCallCheck(this, InfoBadge);

    return _possibleConstructorReturn(this, _getPrototypeOf(InfoBadge).apply(this, arguments));
  }

  _createClass(InfoBadge, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid.default.generate();
    }
    /**
     * Get the Welcome Mat Info Badge's HTML id. Generate a new one if no ID present.
     */

  }, {
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
      return _react.default.createElement("div", {
        id: this.getId(),
        className: this.props.className
      }, _react.default.createElement("div", {
        className: "slds-welcome-mat__info-badge-container"
      }, _react.default.createElement("img", {
        className: "slds-welcome-mat__info-badge",
        src: this.props.image,
        width: "50",
        height: "50",
        alt: ""
      }), _react.default.createElement(_icon.default, {
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