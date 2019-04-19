"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

var _executionEnvironment = require("../../utilities/execution-environment");

var _carouselIndicators = _interopRequireDefault(require("./private/carousel-indicators"));

var _previousNextCarouselNavigator = _interopRequireDefault(require("./private/previous-next-carousel-navigator"));

var _carouselItem = _interopRequireDefault(require("./private/carousel-item"));

var _autoPlayButton = _interopRequireDefault(require("./private/auto-play-button"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _event = _interopRequireDefault(require("../../utilities/event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
// ### Default Props
var defaultProps = {
  assistiveText: {
    autoPlayButton: 'Start / Stop auto-play',
    nextPanel: 'Next Panel',
    previousPanel: 'Previous Panel'
  },
  autoplayInterval: 4000,
  hasAutoplay: false,
  hasPreviousNextPanelNavigation: false,
  isInfinite: false,
  itemsPerPanel: 1
};
/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 * Currently panel index and auto play cannot be controlled by the app.
 */

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Carousel, _React$Component);

  // ### Display Name
  // Always use the canonical component name as the React display name.
  // ### Prop Types
  // ### Default Props
  function Carousel(props) {
    var _this;

    _classCallCheck(this, Carousel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Carousel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onNextPanelHandler", function () {
      var next = _this.state.currentPanel % _this.nrOfPanels + 1;

      _this.setCurrentPanel(next, _this.changeTranslationAutomatically);
    });

    _defineProperty(_assertThisInitialized(_this), "onPreviousPanelHandler", function () {
      var prev = (_this.state.currentPanel + _this.nrOfPanels - 1) % _this.nrOfPanels;

      _this.setCurrentPanel(prev, _this.changeTranslationAutomatically);
    });

    _defineProperty(_assertThisInitialized(_this), "onIndicatorClickHandler", function (panel) {
      _this.setCurrentPanel(panel, _this.changeTranslationAutomatically);
    });

    _defineProperty(_assertThisInitialized(_this), "onAutoPlayBtnClick", function () {
      var isAutoPlayOn = _this.state.isAutoPlayOn;
      var actionToTake = isAutoPlayOn ? _this.stopAutoplay : _this.startAutoplay;

      _this.setState({
        isAutoPlayOn: !isAutoPlayOn
      });

      actionToTake();
    });

    _defineProperty(_assertThisInitialized(_this), "setDimensions", function () {
      if (_executionEnvironment.canUseDOM && _this.stageItem !== undefined && _this.stageItem.current !== undefined && _this.stageItem.current.offsetWidth !== undefined) {
        _this.setState({
          stageWidth: _this.stageItem.current.offsetWidth
        }, _this.changeTranslationAutomatically);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setTranslationAmount", function (amount, cb) {
      _this.setState({
        translateX: amount
      }, cb);
    });

    _defineProperty(_assertThisInitialized(_this), "setCurrentPanel", function (amount, cb) {
      _this.setState({
        currentPanel: amount
      }, cb);
    });

    _defineProperty(_assertThisInitialized(_this), "startAutoplay", function () {
      _this.autoplayId = setInterval(function () {
        if (_this.canGoToNext()) {
          _this.onNextPanelHandler();
        } else {
          _this.stopAutoplay();
        }
      }, _this.props.autoplayInterval);
    });

    _defineProperty(_assertThisInitialized(_this), "stopAutoplay", function () {
      if (_this.autoplayId) {
        clearInterval(_this.autoplayId);
      }

      _this.setState({
        isAutoPlayOn: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeTranslationAutomatically", function () {
      _this.setTranslationAmount(-((_this.state.stageWidth || _this.stageWidth) * (_this.state.currentPanel - 1)));
    });

    _defineProperty(_assertThisInitialized(_this), "canGoToNext", function () {
      return _this.state.currentPanel < _this.nrOfPanels;
    });

    _defineProperty(_assertThisInitialized(_this), "canGoToPrevious", function () {
      return _this.state.currentPanel > 1;
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var _keyDownCallbacks;

      var keyDownCallbacks = (_keyDownCallbacks = {}, _defineProperty(_keyDownCallbacks, _keyCode.default.LEFT, function () {
        if (_this.canGoToPrevious()) {
          _this.onPreviousPanelHandler();
        }
      }), _defineProperty(_keyDownCallbacks, _keyCode.default.RIGHT, function () {
        if (_this.canGoToNext()) {
          _this.onNextPanelHandler();
        }
      }), _keyDownCallbacks);

      if (keyDownCallbacks[event.keyCode]) {
        _event.default.trapImmediate(event);

        keyDownCallbacks[event.keyCode]();
      }
    });

    var _this$props = _this.props,
        items = _this$props.items,
        itemsPerPanel = _this$props.itemsPerPanel;
    _this.nrOfPanels = Math.ceil(items.length / itemsPerPanel);
    _this.stageItem = _react.default.createRef();
    _this.state = {
      translateX: -1000000,
      currentPanel: 1,
      isAutoPlayOn: _this.props.hasAutoplay,
      stageWidth: 0
    };
    return _this;
  }

  _createClass(Carousel, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.generatedId = _shortid.default.generate();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setTranslationAmount(0);

      if (this.props.hasAutoplay) {
        this.startAutoplay();
      }

      if (_executionEnvironment.canUseDOM && this.stageItem !== undefined && this.stageItem.current !== undefined && this.stageItem.current.offsetWidth !== undefined) {
        this.stageWidth = this.stageItem.current.offsetWidth;
      }

      if (_executionEnvironment.canUseEventListeners) {
        window.addEventListener('resize', this.setDimensions, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (_executionEnvironment.canUseEventListeners) {
        window.removeEventListener('resize', this.setDimensions, false);
      }

      this.stopAutoplay();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          hasAutoplay = _this$props2.hasAutoplay,
          hasPreviousNextPanelNavigation = _this$props2.hasPreviousNextPanelNavigation,
          isInfinite = _this$props2.isInfinite;
      var id = this.props.id || this.generatedId;
      var isPreviousBtnDisabled = !(isInfinite || this.canGoToPrevious());
      var isNextBtnDisabled = !(isInfinite || this.canGoToNext());
      var itemWidth = (this.state.stageWidth || this.stageWidth) / this.props.itemsPerPanel;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('slds-carousel', this.props.className),
        id: id,
        onKeyDown: this.handleKeyDown
      }, _react.default.createElement("div", {
        className: "slds-grid_vertical slds-col slds-path__scroller"
      }, hasAutoplay && _react.default.createElement(_autoPlayButton.default, {
        assistiveText: this.props.assistiveText.autoPlayButton,
        isAutoPlayOn: this.state.isAutoPlayOn,
        onClick: this.onAutoPlayBtnClick
      }), _react.default.createElement("div", {
        className: "slds-is-relative",
        style: {
          marginLeft: '60px',
          marginRight: '60px'
        }
      }, hasPreviousNextPanelNavigation && _react.default.createElement(_previousNextCarouselNavigator.default, {
        assistiveText: this.props.assistiveText.previousPanel,
        iconName: "left",
        isDisabled: isPreviousBtnDisabled,
        onClick: this.onPreviousPanelHandler,
        inlineStyle: {
          left: '-60px'
        }
      }), _react.default.createElement("div", {
        ref: this.stageItem,
        className: "slds-carousel__stage slds-show"
      }, _react.default.createElement("div", {
        className: "slds-carousel__panels slds-is-relative",
        style: {
          transform: "translateX(".concat(this.state.translateX, "px)")
        }
      }, this.props.items.map(function (item, index) {
        return _react.default.createElement(_carouselItem.default, _extends({
          onClick: function onClick(event) {
            _this2.props.onItemClick(event, {
              item: item
            });
          },
          onRenderItem: _this2.props.onRenderItem
        }, item, {
          isInCurrentPanel: index >= (_this2.state.currentPanel - 1) * _this2.props.itemsPerPanel && index < (_this2.state.currentPanel - 1) * _this2.props.itemsPerPanel + _this2.props.itemsPerPanel,
          itemWidth: itemWidth,
          key: item.id
        }));
      }))), hasPreviousNextPanelNavigation && _react.default.createElement(_previousNextCarouselNavigator.default, {
        assistiveText: this.props.assistiveText.nextPanel,
        iconName: "right",
        isDisabled: isNextBtnDisabled,
        onClick: this.onNextPanelHandler,
        inlineStyle: {
          right: '-60px'
        }
      })), _react.default.createElement(_carouselIndicators.default, {
        style: this.props.indicatorStyles,
        noOfIndicators: this.nrOfPanels,
        currentIndex: this.state.currentPanel,
        onClick: this.onIndicatorClickHandler,
        items: this.props.items,
        itemsPerPanel: this.props.itemsPerPanel
      })));
    }
  }]);

  return Carousel;
}(_react.default.Component);

_defineProperty(Carousel, "displayName", _constants.CAROUSEL);

_defineProperty(Carousel, "propTypes", {
  /**
   * Description of the carousel items for screen-readers.
   */
  assistiveText: _propTypes.default.object,

  /**
   * Interval for the autoplay iteration
   */
  autoplayInterval: _propTypes.default.number,

  /**
   * CSS classes that are applied to the main 'slds-carousel' classed component container
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Boolean showing whether the autoplay feature is available or not
   */
  hasAutoplay: _propTypes.default.bool,

  /**
   * Boolean for displaying the navigation indicators (left/right arrows) of the carousel
   */
  hasPreviousNextPanelNavigation: _propTypes.default.bool,

  /**
   * Id of component, if desired. If not provided an id is automatically generated
   */
  id: _propTypes.default.string,

  /**
   * CSS that is applied to carousel indicators
   */
  indicatorStyles: _propTypes.default.object,

  /**
   * Boolean for infinite loop navigation
   */
  isInfinite: _propTypes.default.bool,

  /**
   * * **Array of item objects used by the default carousel item renderer.**
   * Each object can contain:
   * * `id`: The id of the carousel item. [REQUIRED]
   * * `heading`: Primary string that will be used as the heading
   * * `description`: Secondary string that is used to describe the item
   * * `buttonLabel`: If assigned a call to button action will be rendered with this text, if unassigned no button is rendered
   * * `imageAssistiveText`: Image alt text, if not present heading will be used instead
   * * `href`: Used for item link, if not provided 'javascript:void(0);' is used instead
   * * `src`: Item image src value
   */
  items: _propTypes.default.array.isRequired,

  /**
   * Number of items to be displayed at a time in the carousel
   */
  itemsPerPanel: _propTypes.default.number,

  /**
   * Accepts a custom carousel item rendering function
   */
  onRenderItem: _propTypes.default.func,

  /**
   * Handler for clicking on a carousel item
   */
  onItemClick: _propTypes.default.func
});

_defineProperty(Carousel, "defaultProps", defaultProps);

var _default = Carousel;
exports.default = _default;