"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var propTypes = {
  /**
   * CSS class names to be added to the accordion component. _Tested with snapshot testing._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * HTML id for accordion component. _Tested with snapshot testing._
   */
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The panel content for the Accordion component. Accordion panels should be added as <AccordionPanel />. Event handler for the accordion panels should be added to `<AccordionPanel />`. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework and snapshot testing._
   *
   * Example:
   * ```
   * <SLDSAccordion>
   *   <SLDSAccordionpanel />
   *   <SLDSAccordionpanel />
   *   <SLDSAccordionpanel />
   * </SLDSAccordion>
   * ```
   */
  children: _propTypes.default.node.isRequired
};
/**
 * An accordion allows a user to toggle the display of sections of content.
 * The accordion component wraps accordion panels that can be selected and expanded. It accepts children to define the content displayed within.
 */

var Accordion = /*#__PURE__*/function (_Component) {
  _inherits(Accordion, _Component);

  var _super = _createSuper(Accordion);

  function Accordion(props) {
    var _this;

    _classCallCheck(this, Accordion);

    _this = _super.call(this, props);
    _this.state = {
      currButtonIndex: 0
    };
    _this.summaryButtons = [];
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(Accordion, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.currButtonIndex !== null && this.state.currButtonIndex !== prevState.currButtonIndex) {
        this.summaryButtons[this.state.currButtonIndex].focus();
      }
    }
  }, {
    key: "onClickSummary",
    value: function onClickSummary() {
      this.setState({
        currButtonIndex: null
      });
    }
  }, {
    key: "onKeyDownSummary",
    value: function onKeyDownSummary(e) {
      var buttonIndex = this.state.currButtonIndex;

      if (buttonIndex === null) {
        buttonIndex = this.summaryButtons.findIndex(function (el) {
          return el.id === e.target.id;
        });
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();

        if (buttonIndex < this.props.children.length - 1) {
          this.setState({
            currButtonIndex: buttonIndex + 1
          });
        } else {
          this.setState({
            currButtonIndex: 0
          });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();

        if (buttonIndex > 0) {
          this.setState({
            currButtonIndex: buttonIndex - 1
          });
        } else {
          this.setState({
            currButtonIndex: this.props.children.length - 1
          });
        }
      }
    }
  }, {
    key: "addSummaryButton",
    value: function addSummaryButton(button) {
      var btnInArr = this.summaryButtons.find(function (el) {
        return button === el;
      });

      if (button !== null && btnInArr === undefined) {
        // eslint-disable-next-line fp/no-mutating-methods
        this.summaryButtons.push(button);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react.default.createElement("ul", {
        name: this.props.id || this.generatedId,
        className: (0, _classnames.default)('slds-accordion', this.props.className)
      }, _react.default.Children.map(this.props.children, function (child) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          refs: {
            summaryButton: _this2.addSummaryButton.bind(_this2)
          },
          onClickSummary: _this2.onClickSummary.bind(_this2),
          onKeyDownSummary: _this2.onKeyDownSummary.bind(_this2)
        });
      }));
    }
  }]);

  return Accordion;
}(_react.Component);

Accordion.displayName = _constants.ACCORDION;
Accordion.propTypes = propTypes;
var _default = Accordion;
exports.default = _default;