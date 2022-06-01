"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _modal = _interopRequireDefault(require("../modal"));

var _progressBar = _interopRequireDefault(require("../progress-bar"));

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

var displayName = _constants.WELCOME_MAT;
var propTypes = {
  /**
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * Whether the modal is open
   */
  isOpen: _propTypes.default.bool,

  /**
   * **Weclome Mat labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `title`: Title for the Welcome Mat
   * * `description`: Label for the radio input
   * * `unitsCompletedAfter`: Label for the radio input
   */
  labels: _propTypes.default.shape({
    title: _propTypes.default.string,
    description: _propTypes.default.string,
    unitsCompletedAfter: _propTypes.default.string
  }),

  /**
   *	Variant of the WelcomeMat
   */
  variant: _propTypes.default.oneOf(['steps', 'info-only', 'splash', 'trailhead-connected']),

  /**
   * Link to learn more button
   */
  onRenderInfoActions: _propTypes.default.func,

  /**
   * Callback to fire when modal is dismissed
   */
  onRequestClose: _propTypes.default.func,

  /**
   *  Accepts a single WelcomeMatInfoBadge component, to be used with the trailhead variant
   */
  infoBadge: _propTypes.default.node,

  /**
   *  Do not show again checkbox for info-only variant
   */
  doNotShowAgainCheckbox: _propTypes.default.node
};
var defaultProps = {
  labels: {
    unitsCompletedAfter: 'units completed'
  },
  variant: 'steps',
  isOpen: true
};
/**
 * A Welcome Mat provides a series of unordered items a user can click to learn about a thematic topic.
 */

var WelcomeMat = /*#__PURE__*/function (_React$Component) {
  _inherits(WelcomeMat, _React$Component);

  var _super = _createSuper(WelcomeMat);

  function WelcomeMat(props) {
    var _this;

    _classCallCheck(this, WelcomeMat);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();

    _this.getCount();

    return _this;
  }
  /**
   * Get the WelcomeMat's HTML id. Generate a new one if no ID present.
   */


  _createClass(WelcomeMat, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getCount",
    value: function getCount() {
      var totalSteps = _react.default.Children.count(this.props.children);

      var completedSteps = _react.default.Children.toArray(this.props.children).filter(function (c) {
        return c.props.isComplete;
      }).length;

      var progress = completedSteps / totalSteps * 100;
      this.state = {
        totalSteps: totalSteps,
        completedSteps: completedSteps,
        progress: progress
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);

      var splash = /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-welcome-mat__info-content', this.props.className),
        id: "".concat(this.getId(), "-content")
      }, /*#__PURE__*/_react.default.createElement("h2", {
        className: "slds-welcome-mat__info-title",
        id: "".concat(this.getId(), "-label")
      }, labels.title), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-welcome-mat__info-description slds-text-longform"
      }, /*#__PURE__*/_react.default.createElement("p", null, labels.description)), this.props.variant === 'info-only' || this.props.variant === 'splash' ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-welcome-mat__info-actions"
      }, this.props.onRenderInfoActions() ? this.props.onRenderInfoActions() : null, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-m-top_large"
      }, this.props.doNotShowAgainCheckbox ? this.props.doNotShowAgainCheckbox : null)) : null, (this.props.variant === 'steps' || this.props.variant === 'trailhead-connected') && this.props.children ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-welcome-mat__info-progress', this.state.completedSteps === this.state.totalSteps ? 'slds-welcome-mat__info-progress_complete' : null)
      }, this.props.variant === 'trailhead-connected' ? _react.default.Children.map(this.props.infoBadge, function (child) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          isComplete: _this2.state.completedSteps === _this2.state.totalSteps ? true : null
        });
      }) : null, this.state.completedSteps !== this.state.totalSteps || this.props.variant !== 'trailhead-connected' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.props.variant === 'trailhead-connected' ? /*#__PURE__*/_react.default.createElement("p", null, this.state.completedSteps, "/", this.state.totalSteps, " ".concat(labels.unitsCompletedAfter)) : /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, this.state.completedSteps, "/", this.state.totalSteps, " ".concat(labels.unitsCompletedAfter))), /*#__PURE__*/_react.default.createElement(_progressBar.default, {
        value: this.state.progress,
        radius: "circular"
      })) : null)) : null);

      return /*#__PURE__*/_react.default.createElement(_modal.default, {
        assistiveText: {
          dialogLabelledBy: "".concat(this.getId(), "-label")
        },
        isOpen: this.props.isOpen,
        onRequestClose: this.props.onRequestClose,
        size: "small",
        id: "".concat(this.getId(), "-modal")
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-welcome-mat', {
          'slds-welcome-mat_info-only': this.props.variant === 'info-only'
        }, this.props.children ? null : 'slds-welcome-mat_splash'),
        id: this.getId()
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-welcome-mat__content slds-grid"
      }, this.props.children ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-welcome-mat__info slds-size_1-of-2"
      }, splash), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-welcome-mat__tiles', 'slds-size_1-of-2', this.props.variant === 'info-only' ? 'slds-welcome-mat__tiles_info-only' : null)
      }, _react.default.Children.map(this.props.children, function (child) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          variant: _this2.props.variant
        });
      }))) : /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-welcome-mat__info slds-size_1-of-1"
      }, splash))));
    }
  }]);

  return WelcomeMat;
}(_react.default.Component);

WelcomeMat.displayName = displayName;
WelcomeMat.propTypes = propTypes;
WelcomeMat.defaultProps = defaultProps;
var _default = WelcomeMat;
exports.default = _default;