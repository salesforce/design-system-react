"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _classnames = _interopRequireDefault(require("classnames"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _button = _interopRequireDefault(require("../button"));

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

var defaultProps = {
  assistiveText: {
    collapseSection: 'Toggle visibility of section'
  }
};
/**
 * App Launcher Sections allow users to categorize App Tiles as well as toggle their display
 */

var AppLauncherSection = /*#__PURE__*/function (_React$Component) {
  _inherits(AppLauncherSection, _React$Component);

  var _super = _createSuper(AppLauncherSection);

  // ### Display Name
  // Always use the canonical component name as the React display name.
  // ### Prop Types
  function AppLauncherSection(props) {
    var _this;

    _classCallCheck(this, AppLauncherSection);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: true
    });

    _defineProperty(_assertThisInitialized(_this), "toggleOpen", function (event) {
      _this.setState({
        isOpen: !_this.state.isOpen
      });

      if ((0, _lodash.default)(_this.props.onToggleClick)) {
        _this.props.onToggleClick(event, {});
      }
    });

    (0, _checkProps.default)(_constants.APP_LAUNCHER_SECTION, props, _component.default);
    return _this;
  }

  _createClass(AppLauncherSection, [{
    key: "render",
    value: function render() {
      var isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;
      var iconIsOpenClass = isOpen ? 'slds-is-open' : 'slds-is-close';
      var sectionIsOpenClass = isOpen ? 'slds-is-expanded' : 'slds-is-collapsed';

      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-section', iconIsOpenClass)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-section__title"
      }, this.props.toggleable || this.props.onToggleClick ? /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: this.props.collapseSectionAssistiveText || assistiveText.collapseSection
        },
        iconCategory: "utility",
        iconName: "switch",
        onClick: this.toggleOpen,
        className: (0, _classnames.default)({
          'slds-button__icon  slds-m-right_medium': true,
          'slds-button__icon_left': isOpen,
          'slds-accordion__summary-action-icon': !isOpen
        }),
        variant: "icon"
      }) : null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.title)), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-section__content"
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: (0, _classnames.default)('slds-grid slds-grid_pull-padded slds-wrap', sectionIsOpenClass)
      }, _react.default.Children.map(this.props.children, function (child) {
        return /*#__PURE__*/_react.default.createElement("li", {
          className: (0, _classnames.default)('slds-col_padded slds-grow-none', child.props.size === 'small' ? 'slds-size_xx-small' : 'slds-size_1-of-1 slds-medium-size_1-of-3')
        }, child);
      }))));
    }
  }]);

  return AppLauncherSection;
}(_react.default.Component);

_defineProperty(AppLauncherSection, "displayName", _constants.APP_LAUNCHER_SECTION);

_defineProperty(AppLauncherSection, "propTypes", {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `collapseSection`: The assistive text for the section collapse icons.
   */
  assistiveText: _propTypes.default.shape({
    collapseSection: _propTypes.default.string
  }),

  /**
   * The title for this section of apps
   */
  title: _propTypes.default.string.isRequired,

  /**
   * Allows the user to show/hide the section
   */
  toggleable: _propTypes.default.bool,

  /**
   * An array of applications to display
   */
  children: _propTypes.default.node.isRequired,

  /**
   * Controls the open/closed state of the section
   */
  isOpen: _propTypes.default.bool,

  /**
   * Callback for when section is toggled. Passes "isOpen" bool. Forces `toggleable` to true
   */
  onToggleClick: _propTypes.default.func
});

_defineProperty(AppLauncherSection, "defaultProps", defaultProps);

var _default = AppLauncherSection;
exports.default = _default;