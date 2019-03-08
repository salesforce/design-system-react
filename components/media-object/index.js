"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssClasses = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
var cssClasses = exports.cssClasses = {
  base: 'slds-media',
  figure: 'slds-media__figure',
  body: 'slds-media__body'
};
/**
 * When you need text and a figure next to each other, use a media object.
 */

var MediaObject =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MediaObject, _React$Component);

  function MediaObject() {
    _classCallCheck(this, MediaObject);

    return _possibleConstructorReturn(this, (MediaObject.__proto__ || Object.getPrototypeOf(MediaObject)).apply(this, arguments));
  }

  _createClass(MediaObject, [{
    key: "render",
    // ### Display Name
    // Always use the canonical component name as the React display name.
    // ### Prop Types
    value: function render() {
      return _react2.default.createElement("div", {
        className: (0, _classnames2.default)(cssClasses.base, {
          'slds-media_center': this.props.verticalCenter,
          'slds-has-flexi-truncate': this.props.canTruncate
        }, this.props.className)
      }, this.props.figure ? _react2.default.createElement("div", {
        className: cssClasses.figure
      }, this.props.figure, " ") : null, _react2.default.createElement("div", {
        className: cssClasses.body
      }, this.props.body));
    }
  }]);

  return MediaObject;
}(_react2.default.Component);

Object.defineProperty(MediaObject, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.MEDIA_OBJECT
});
Object.defineProperty(MediaObject, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * Often the body may need to be truncated for correct layout. This is only applicable if using the component within a flexbox container.
     */
    canTruncate: _propTypes2.default.bool,

    /**
     * Class names to be added to the component's HTML tag with `slds-media` class.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * The body is often text such as a heading or paragraph.
     */
    body: _propTypes2.default.node,

    /**
     * The figure is the optional visualization of the text within the body.
     */
    figure: _propTypes2.default.node,

    /**
     * Vertically centers the body with the middle of the figure.
     */
    verticalCenter: _propTypes2.default.bool
  }
});
exports.default = MediaObject;