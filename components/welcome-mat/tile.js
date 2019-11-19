"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _icon = _interopRequireDefault(require("../icon"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var displayName = _constants.WELCOME_MAT_TILE;
var propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `completeIcon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the complete icon means.
   */
  assistiveText: _propTypes.default.shape({
    completedIcon: _propTypes.default.string
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
   * Title for the tile component.
   */
  title: _propTypes.default.string,

  /**
   * Description for the tile component.
   */
  description: _propTypes.default.string,

  /**
   * Href for the tile link
   */
  href: _propTypes.default.string,

  /**
   * Icon for the tile
   */
  icon: _propTypes.default.node,

  /**
   * Whether the tile is completed
   */
  isComplete: _propTypes.default.bool,

  /**
   * Variant of the Welcome Mat Tile
   */
  variant: _propTypes.default.oneOf(['steps', 'info-only', 'splash', 'trailhead-connected'])
};
var defaultProps = {
  assistiveText: {
    completedIcon: 'Completed'
  },
  isComplete: false,
  variant: 'steps'
};
/**
 * Tile component item represents a tile in a Welcome Mat
 */

var Tile =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tile, _React$Component);

  function Tile() {
    _classCallCheck(this, Tile);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tile).apply(this, arguments));
  }

  _createClass(Tile, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid.default.generate();
    }
    /**
     * Get the Welcome Mat Tile's HTML id. Generate a new one if no ID present.
     */

  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var assistiveText = _objectSpread({}, defaultProps.assistiveText, this.props.assistiveText);

      var body = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: (0, _classnames.default)('slds-media__figure', 'slds-media__figure_fixed-width', 'slds-align_absolute-center')
      }, _react.default.createElement("div", {
        className: "slds-welcome-mat__tile-figure"
      }, _react.default.createElement("div", {
        className: "slds-welcome-mat__tile-icon-container"
      }, this.props.icon, this.props.isComplete && this.props.variant !== 'info-only' ? _react.default.createElement(_icon.default, {
        assistiveText: {
          label: assistiveText.completedIcon
        },
        category: "action",
        name: "check",
        title: assistiveText.completedIcon
      }) : null))), _react.default.createElement("div", {
        className: "slds-media__body"
      }, _react.default.createElement("div", {
        className: "slds-welcome-mat__tile-body"
      }, _react.default.createElement("h3", {
        className: "slds-welcome-mat__tile-title"
      }, this.props.title), _react.default.createElement("p", {
        className: "slds-welcome-mat__tile-description"
      }, this.props.description))));

      return _react.default.createElement("div", {
        id: this.getId(),
        className: (0, _classnames.default)('slds-welcome-mat__tile', this.props.variant === 'info-only' ? 'slds-welcome-mat__tile_info-only' : null, this.props.isComplete && this.props.variant !== 'info-only' ? 'slds-welcome-mat__tile_complete' : null, this.props.className)
      }, this.props.variant === 'info-only' ? _react.default.createElement("div", {
        className: "slds-media"
      }, body) : _react.default.createElement("a", {
        href: this.props.href,
        className: "slds-box slds-box_link slds-media"
      }, body));
    }
  }]);

  return Tile;
}(_react.default.Component);

Tile.displayName = displayName;
Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;
var _default = Tile;
exports.default = _default;