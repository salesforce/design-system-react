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

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _button = _interopRequireDefault(require("../button"));

var _progressRing = _interopRequireDefault(require("../progress-ring"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `expandStep`: Button that examples a step
   * _Tested with snapshot testing._
   */
  assistiveText: _propTypes.default.shape({
    expandStep: _propTypes.default.string
  }),

  /**
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Detailed description of the step
   */
  description: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * Estimated time for completing the step
   */
  estimatedTime: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * Heading for the step
   */
  heading: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * Index of the step within the step array
   */
  index: _propTypes.default.number,

  /**
   * Dictates whether the step can be expanded / collapsed
   */
  isExpandable: _propTypes.default.bool,

  /**
   * If `isExpandable` is true, this prop can be used to control the expanded state. If not provided state will be used instead
   */
  isOpen: _propTypes.default.bool,

  /**
   * Function that is called to render a step's available action(s). Typically returns a Button, Button of variant "link," or Checkbox of variant "toggle"
   */
  onRenderAction: _propTypes.default.func,

  /**
   * Function that is called to render step content. Typically returns a ProgressIndicator and/or ScopedNotification component
   */
  onRenderContent: _propTypes.default.func,

  /**
   * Function that is called to render content within the media figure. Expects to be returned an Icon or ProgressRing component
   */
  onRenderFigure: _propTypes.default.func,

  /**
   * Function to handle requests to expand / collapse the step
   */
  onToggleIsOpen: _propTypes.default.func,

  /**
   * Percentage of step completed. No progress indicator will be shown for the step unless this is provided
   */
  progress: _propTypes.default.number,

  /**
   * Display number for the step. Only appears if progress indicator is enabled. Determined automatically by parent if not provided.
   */
  stepNumber: _propTypes.default.number
};
var defaultProps = {
  assistiveText: {
    expandStep: 'Expand Step'
  }
};
/**
 * Setup Assistant Step component is used to specify individual items within the Setup Assistant
 * filled with learning and task links along with a recommended sequence that may have progress tracking
 */

var Step = /*#__PURE__*/function (_React$Component) {
  _inherits(Step, _React$Component);

  var _super = _createSuper(Step);

  function Step(props) {
    var _this;

    _classCallCheck(this, Step);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "toggleIsOpen", function (event) {
      if (_this.props.onToggleIsOpen) {
        _this.props.onToggleIsOpen(event, {
          index: _this.props.index,
          isOpen: _this.getIsOpen(),
          step: _this.props
        });
      } else {
        _this.setState({
          isOpen: !_this.getIsOpen()
        });
      }
    });

    _this.generatedId = _shortid.default.generate();
    _this.state = {
      isOpen: props.isOpen || false
    };
    (0, _checkProps.default)(_constants.SETUP_ASSISTANT_STEP, _this.props, _component.default);
    return _this;
  }

  _createClass(Step, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getIsOpen",
    value: function getIsOpen() {
      return this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;
    }
  }, {
    key: "renderMediaContent",
    value: function renderMediaContent() {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-setup-assistant__step-summary-content slds-media__body"
      }, /*#__PURE__*/_react.default.createElement("h3", {
        className: "slds-setup-assistant__step-summary-title slds-text-heading_small"
      }, this.props.isExpandable ? /*#__PURE__*/_react.default.createElement(_button.default, {
        "aria-controls": "".concat(this.getId(), "-detail-content"),
        className: "slds-button_reset",
        label: this.props.heading,
        onClick: this.toggleIsOpen,
        variant: "base"
      }) : this.props.heading), /*#__PURE__*/_react.default.createElement("p", null, this.props.description)), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__figure slds-media__figure_reverse"
      }, this.props.onRenderAction ? this.props.onRenderAction() : null, this.props.estimatedTime ? /*#__PURE__*/_react.default.createElement("p", {
        className: (0, _classnames.default)('slds-text-align_right', 'slds-text-color_weak', {
          'slds-p-top_medium': this.props.onRenderAction !== undefined
        })
      }, this.props.estimatedTime) : null));
    }
  }, {
    key: "renderSummary",
    value: function renderSummary() {
      var figure;
      var progressRingTheme;

      if (this.props.progress > 0 && this.props.progress < 100) {
        progressRingTheme = 'active';
      } else if (this.props.progress === 100) {
        progressRingTheme = 'complete';
      }

      if (this.props.onRenderFigure) {
        figure = this.props.onRenderFigure();

        if (figure && figure.type && figure.type.displayName === _constants.ICON) {
          var containerStyle = {
            position: 'relative',
            top: this.props.isExpandable ? '5px' : '-3px'
          };

          if (figure.props.containerStyle) {
            containerStyle = _objectSpread(_objectSpread({}, containerStyle), figure.props.containerStyle);
          }

          figure = /*#__PURE__*/_react.default.cloneElement(figure, _objectSpread(_objectSpread({}, figure.props), {}, {
            containerStyle: containerStyle,
            size: 'small'
          }));
          figure = /*#__PURE__*/_react.default.createElement("div", {
            className: "slds-media__figure"
          }, figure);
        }
      } else if (this.props.progress !== undefined) {
        figure = /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-media__figure"
        }, /*#__PURE__*/_react.default.createElement(_progressRing.default, {
          hasIcon: true,
          icon: this.props.progress === 100 ? null : this.props.stepNumber,
          flowDirection: "fill",
          size: "large",
          theme: progressRingTheme,
          value: this.props.progress
        }));
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-setup-assistant__step-summary"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media"
      }, figure, this.props.isExpandable || this.props.progress !== undefined ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__body slds-m-top_x-small"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media"
      }, this.renderMediaContent())) : this.renderMediaContent()));
    }
  }, {
    key: "render",
    value: function render() {
      var assistiveText = (0, _lodash.default)({}, defaultProps.assistiveText, this.props.assistiveText);
      return /*#__PURE__*/_react.default.createElement("li", {
        className: (0, _classnames.default)('slds-setup-assistant__item', this.props.className),
        id: this.getId()
      }, /*#__PURE__*/_react.default.createElement("article", {
        className: "slds-setup-assistant__step"
      }, this.props.isExpandable ? /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-summary-detail', {
          'slds-is-open': this.getIsOpen()
        })
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: assistiveText.expandStep
        },
        "aria-controls": "".concat(this.getId(), "-detail-content"),
        className: "slds-m-right_x-small slds-m-top_x-small",
        iconCategory: "utility",
        iconClassName: "slds-summary-detail__action-icon",
        iconName: "switch",
        onClick: this.toggleIsOpen,
        variant: "icon"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-container_fluid"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-summary-detail__title"
      }, this.renderSummary()), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-summary-detail__content",
        id: "".concat(this.getId(), "-detail-content")
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-setup-assistant__step-detail"
      }, this.props.onRenderContent ? this.props.onRenderContent() : null)))) : this.renderSummary()));
    }
  }]);

  return Step;
}(_react.default.Component);

Step.displayName = _constants.SETUP_ASSISTANT_STEP;
Step.propTypes = propTypes;
Step.defaultProps = defaultProps;
var _default = Step;
exports.default = _default;