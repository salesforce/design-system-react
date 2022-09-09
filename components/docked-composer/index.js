"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _button = _interopRequireDefault(require("../button"));

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

var propTypes = {
  /**
   * HTML id for component.
   * _Tested with snapshot testing._
   */
  id: _propTypes.default.string,

  /**
   * Whether the docked composer is open or closed.
   * _Tested with snapshot testing._
   */
  isOpen: _propTypes.default.bool,

  /**
   * Text or node to display in the header.
   * _Tested with snapshot testing._
   */
  header: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * Body of the composer.
   * _Tested with snapshot testing._
   */
  body: _propTypes.default.node,

  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `expandButton`: This is a visually hidden label for expand button shown when the composer is minimized.
   * * `minimizeButton`: This is a visually hidden label for minimize button shown when the composer is expanded.
   * * `closeButton`: This is a visually hidden label for close button.
   * _Tested with snapshot testing._
   */
  assistiveText: _propTypes.default.shape({
    expandButton: _propTypes.default.string,
    minimizeButton: _propTypes.default.string,
    closeButton: _propTypes.default.string
  }),

  /**
   * Additional class name added to the container with slds-docked_container class.
   * _Tested with snapshot testing._
   */
  classNameContainer: _propTypes.default.string,

  /**
   * Event Callbacks
   * * `onRequestMinimize`: Called when minimize button is clicked.
   * * `onRequestExpand`: Called when the expand button is clicked.
   * * `onRequestClose`: Called when the close button is clicked.
   * _Tested with Mocha testing._
   */
  events: _propTypes.default.shape({
    onRequestMinimize: _propTypes.default.func,
    onRequestExpand: _propTypes.default.func,
    onRequestClose: _propTypes.default.func
  })
};
var defaultProps = {
  assistiveText: {
    expandButton: 'Expand',
    minimizeButton: 'Minimize',
    closeButton: 'Close'
  }
};
/**
 * The Docked Composer is a persistent utility bar that allows a user to continually use the app to complete tasks or gather information while expanding/collapsing a composer window. [component blueprint guidelines](https://www.lightningdesignsystem.com/components/docked-composer/).
 */

var DockedComposer = /*#__PURE__*/function (_React$Component) {
  _inherits(DockedComposer, _React$Component);

  var _super = _createSuper(DockedComposer);

  function DockedComposer(props) {
    var _this;

    _classCallCheck(this, DockedComposer);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(DockedComposer, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var sectionClassName = this.props.isOpen ? 'slds-is-open' : 'slds-is-closed';
      return /*#__PURE__*/_react.default.createElement("div", {
        id: "".concat(this.getId(), "-container"),
        className: "slds-docked_container".concat(this.props.classNameContainer ? " ".concat(this.props.classNameContainer) : '')
      }, /*#__PURE__*/_react.default.createElement("section", {
        className: "slds-docked-composer slds-grid slds-grid_vertical ".concat(sectionClassName),
        role: "dialog",
        "aria-labelledby": "".concat(this.getId(), "-dialog-heading"),
        "aria-describedby": "".concat(this.getId(), "-body")
      }, /*#__PURE__*/_react.default.createElement("header", {
        className: "slds-docked-composer__header slds-grid slds-shrink-none",
        "aria-live": "assertive"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media slds-media_center slds-no-space"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-media__body"
      }, /*#__PURE__*/_react.default.createElement("h2", {
        className: "slds-truncate",
        id: "".concat(this.getId(), "-dialog-heading"),
        title: this.props.header
      }, this.props.header))), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-col_bump-left slds-shrink-none"
      }, this.props.isOpen ? /*#__PURE__*/_react.default.createElement(_button.default, {
        id: "".concat(this.getId(), "-minimize-button"),
        title: this.props.assistiveText.minimizeButton,
        assistiveText: {
          icon: this.props.assistiveText.minimizeButton
        },
        onClick: this.props.events.onRequestMinimize,
        iconCategory: "utility",
        iconName: "minimize_window",
        iconVariant: "bare",
        variant: "icon"
      }) : /*#__PURE__*/_react.default.createElement(_button.default, {
        id: "".concat(this.getId(), "-expand-button"),
        title: this.props.assistiveText.expandButton,
        assistiveText: {
          icon: this.props.assistiveText.expandButton
        },
        onClick: this.props.events.onRequestExpand,
        iconCategory: "utility",
        iconName: "expand_alt",
        iconVariant: "bare",
        variant: "icon"
      }), /*#__PURE__*/_react.default.createElement(_button.default, {
        id: "".concat(this.getId(), "-close-button"),
        title: this.props.assistiveText.closeButton,
        assistiveText: {
          icon: this.props.assistiveText.closeButton
        },
        onClick: this.props.events.onRequestClose,
        iconCategory: "utility",
        iconName: "close",
        iconVariant: "bare",
        variant: "icon"
      }))), this.props.isOpen ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-docked-composer__body",
        id: "".concat(this.getId(), "-body")
      }, this.props.body) : undefined));
    }
  }]);

  return DockedComposer;
}(_react.default.Component);

DockedComposer.propTypes = propTypes;
DockedComposer.defaultProps = defaultProps;
var _default = DockedComposer;
exports.default = _default;