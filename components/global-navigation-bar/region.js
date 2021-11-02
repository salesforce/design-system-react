"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regions = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// List regions for export
var regions = ['primary', 'secondary', 'tertiary'];
/* eslint-disable react/display-name */

exports.regions = regions;

var renderPrimary = function renderPrimary(dividerClass, className, children) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('slds-context-bar__primary', dividerClass, className)
  }, children);
};

var renderSecondary = function renderSecondary(dividerClass, className, children, navigation) {
  var region;

  if (navigation) {
    region = /*#__PURE__*/_react.default.createElement("nav", {
      className: (0, _classnames.default)('slds-context-bar__secondary', dividerClass, className),
      role: "navigation"
    }, /*#__PURE__*/_react.default.createElement("ul", {
      className: "slds-grid"
    }, children));
  } else {
    region = /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)('slds-context-bar__secondary', dividerClass, className)
    }, /*#__PURE__*/_react.default.createElement("ul", {
      className: "slds-grid"
    }, children));
  }

  return region;
};

var renderTertiary = function renderTertiary(dividerClass, className, children) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('slds-context-bar__tertiary', 'slds-col_bump-left', dividerClass, className)
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "slds-grid"
  }, children));
};
/* eslint-enable react/display-name */

/**
 * Regions make up a GlobalNavigation Bar and typically contain links and dropdowns. The Primary region contains the AppSwitcher, Application Name, and Object Switcher. The secondary region typically has navigation betweens sections of the application. The tertiary region is aligned to the right side of the screen and contains shortcuts or actions.
 */


var Region = /*#__PURE__*/function (_React$Component) {
  _inherits(Region, _React$Component);

  var _super = _createSuper(Region);

  function Region() {
    _classCallCheck(this, Region);

    return _super.apply(this, arguments);
  }

  _createClass(Region, [{
    key: "render",
    value: function render() {
      var region;
      var dividerClass = this.props.dividerPosition ? "slds-context-bar__item_divider-".concat(this.props.dividerPosition) : null;

      switch (this.props.region) {
        case 'primary':
          region = renderPrimary(dividerClass, this.props.className, this.props.children);
          break;

        case 'secondary':
          region = renderSecondary(dividerClass, this.props.className, this.props.children, this.props.navigation);
          break;

        case 'tertiary':
          region = renderTertiary(dividerClass, this.props.className, this.props.children);
          break;

        default: // do nothing

      }

      return region;
    }
  }]);

  return Region;
}(_react.default.Component);

_defineProperty(Region, "displayName", _constants.GLOBAL_NAVIGATION_BAR_REGION);

_defineProperty(Region, "propTypes", {
  /**
   * Contents of region. Expects `GlobalNavigationBarLink`, `GlobalNavigationBarDropdown`, `GlobalNavigationBarApplicationName`, `AppSwitcher`, but could be any component. This is the place to pass in an Object Switcher until that is supported.
   */
  children: _propTypes.default.node,

  /**
   * Determines position of separating bar.
   */
  dividerPosition: _propTypes.default.oneOf(['left', 'right']),

  /**
   * CSS classes to be added to the region
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Wraps the `secondary` region in a `nav` and adds a role attribute
   */
  navigation: _propTypes.default.bool,

  /**
   * Region wrap children in styling specific to that region. When `tertiary`
   * region is used, secondary region only supports four list items.
   */
  region: _propTypes.default.oneOf(['primary', 'secondary', 'tertiary']).isRequired
});

var _default = Region;
exports.default = _default;