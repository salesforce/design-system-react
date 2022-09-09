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

var _button = _interopRequireDefault(require("../button"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
};
var defaultProps = {
  assistiveText: {
    toggleSection: 'Toggle visibility of section'
  },
  nonCollapsible: false
};
/**
 * Toggle visibility of section content with the Expandable Section
 */

var ExpandableSection = /*#__PURE__*/function (_React$Component) {
  _inherits(ExpandableSection, _React$Component);

  var _super = _createSuper(ExpandableSection);

  function ExpandableSection(props) {
    var _this;

    _classCallCheck(this, ExpandableSection);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "toggleOpen", function (event) {
      if (_this.props.onToggleOpen) {
        _this.props.onToggleOpen(event, {
          isOpen: _this.props.isOpen
        });
      } else {
        _this.setState(function (prevState) {
          return {
            isOpen: !prevState.isOpen
          };
        });
      }
    });

    _this.generatedId = _shortid.default.generate();
    _this.state = {
      isOpen: true
    };
    return _this;
  }

  _createClass(ExpandableSection, [{
    key: "render",
    value: function render() {
      var contentId = "".concat(this.getId(), "-expanded-section-content");
      var isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;
      var buttonAriaProps = {
        'aria-controls': contentId,
        'aria-expanded': !!isOpen
      };

      var titleNode = /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames.default)('slds-truncate', {
          'slds-p-horizontal_small': !!this.props.nonCollapsible
        }),
        title: this.props.title
      }, this.props.title);

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-section', {
          'slds-is-open': isOpen
        }, this.props.className)
      }, /*#__PURE__*/_react.default.createElement("h3", {
        className: (0, _classnames.default)('slds-section__title', {
          'slds-theme_shade': !!this.props.nonCollapsible
        })
      }, !this.props.nonCollapsible ? /*#__PURE__*/_react.default.createElement(_button.default, _extends({
        assistiveText: {
          icon: this.props.assistiveText.toggleSection
        },
        iconCategory: "utility",
        iconClassName: "slds-section__title-action-icon slds-button__icon_left",
        iconName: "switch",
        onClick: this.toggleOpen,
        className: "slds-section__title-action",
        variant: "base"
      }, buttonAriaProps), titleNode) : titleNode), /*#__PURE__*/_react.default.createElement("div", {
        "aria-hidden": !isOpen,
        className: "slds-section__content",
        id: contentId
      }, this.props.children));
    }
  }]);

  return ExpandableSection;
}(_react.default.Component);

ExpandableSection.displayName = _constants.EXPANDABLE_SECTION;
ExpandableSection.propTypes = propTypes;
ExpandableSection.defaultProps = defaultProps;
var _default = ExpandableSection;
exports.default = _default;