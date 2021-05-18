"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _expandableSection = _interopRequireDefault(require("../expandable-section"));

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

/**
 * App Launcher Sections allow users to categorize App Tiles & Links as well as toggle their display. It is a superset of components/expandable-section with content formatting.
 * All Expandable Section props are compatible with props passed to this component.
 */
var AppLauncherExpandableSection = /*#__PURE__*/function (_React$Component) {
  _inherits(AppLauncherExpandableSection, _React$Component);

  var _super = _createSuper(AppLauncherExpandableSection);

  // ### Display Name
  // Always use the canonical component name as the React display name.
  // ### Prop Types
  function AppLauncherExpandableSection(props) {
    var _this;

    _classCallCheck(this, AppLauncherExpandableSection);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: true
    });

    _defineProperty(_assertThisInitialized(_this), "toggleOpen", function (event, data) {
      if (_this.props.onToggleOpen) {
        _this.props.onToggleOpen(event, data);
      } else {
        _this.setState(function (prevState) {
          return {
            isOpen: !prevState.isOpen
          };
        });
      }
    });

    (0, _checkProps.default)(_constants.APP_LAUNCHER_EXPANDABLE_SECTION, props, _component.default);
    return _this;
  }

  _createClass(AppLauncherExpandableSection, [{
    key: "render",
    value: function render() {
      var expandableSectionProps = _objectSpread(_objectSpread({}, this.props), {
        isOpen: this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen,
        onToggleOpen: this.toggleOpen
      });

      var ulChildrenType = 'tiles';

      var ulContent = _react.default.Children.map(this.props.children, function (child) {
        var liClasses = 'slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-3';

        if (child && child.type && child.type.displayName !== _constants.APP_LAUNCHER_TILE || child && !child.type) {
          ulChildrenType = 'links';
        }

        if (ulChildrenType === 'links') {
          liClasses = 'slds-col_padded slds-p-vertical_xx-small slds-size_1-of-5';
        }

        return /*#__PURE__*/_react.default.createElement("li", {
          className: liClasses
        }, child);
      });

      return /*#__PURE__*/_react.default.createElement(_expandableSection.default, expandableSectionProps, /*#__PURE__*/_react.default.createElement("ul", {
        className: (0, _classnames.default)('slds-grid slds-wrap', {
          'slds-grid_pull-padded': ulChildrenType === 'tiles'
        })
      }, ulContent));
    }
  }]);

  return AppLauncherExpandableSection;
}(_react.default.Component);

_defineProperty(AppLauncherExpandableSection, "displayName", _constants.APP_LAUNCHER_EXPANDABLE_SECTION);

_defineProperty(AppLauncherExpandableSection, "propTypes", {
  /**
   * **Assistive text for accessibility.**
   * * `toggleSection`: Label for the icon that expands / collapses the section
   */
  assistiveText: _propTypes.default.shape({
    toggleSection: _propTypes.default.string
  }),

  /**
   * Contents of the section
   */
  children: _propTypes.default.node,

  /**
   * Class names to be added to the `slds-section` classed node
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Unique identifier for the expandable section. The id is automatically generated if not provided
   */
  id: _propTypes.default.string,

  /**
   * Specifies whether the section is expanded or collapsed. If not provided, component will use its own state to manage this itself
   */
  isOpen: _propTypes.default.bool,

  /**
   * Specifies whether the section can be expanded or collapsed. Defaults to `false`
   */
  nonCollapsible: _propTypes.default.bool,

  /**
   * Callback for when the section is expanded or collapsed. Passes event object and data object with `isOpen` bool.
   */
  onToggleOpen: _propTypes.default.func,

  /**
   * The title for the section
   */
  title: _propTypes.default.string.isRequired
});

var _default = AppLauncherExpandableSection;
exports.default = _default;