"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _shortid = _interopRequireDefault(require("shortid"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _modal = _interopRequireDefault(require("../modal"));

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
    trigger: 'Open App Launcher'
  },
  ariaHideApp: true,
  title: 'App Launcher'
};
/**
 * The App Launcher allows the user to quickly access all the apps and functionality with their organization.
 * The App Launcher should generally only be used as a sub-component of the [Global Navigation Bar](/components/global-navigation-bar)
 *
 * USAGE EXAMPLE:
 * ```
 * <AppLauncher>
 * 	<AppLauncherExpandableSection>
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 	</AppLauncherExpandableSection>
 * 	<AppLauncherExpandableSection>
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 	</AppLauncherExpandableSection>
 * </AppLauncher>
 * ```
 *
 * By default, `Modal`, a child component of App Launcher, will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies. To prevent this you can add the following to your application with `#mount` being the root node of your application that you would like to hide from assistive technologies when the `Modal` is open.
 * ```
 * import settings from 'design-system-react/components/settings';
 * settings.setAppElement('#mount');
 * ```
 */

var AppLauncher = /*#__PURE__*/function (_React$Component) {
  _inherits(AppLauncher, _React$Component);

  var _super = _createSuper(AppLauncher);

  // ### Display Name
  // Always use the canonical component name as the React display name.
  // ### Prop Types
  function AppLauncher(props) {
    var _this;

    _classCallCheck(this, AppLauncher);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "openAppLauncher", function (event) {
      _this.setState({
        isOpen: true
      });

      if ((0, _lodash.default)(_this.props.triggerOnClick)) {
        _this.props.triggerOnClick(event, {});
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closeAppLauncher", function (event) {
      _this.setState({
        isOpen: false
      });

      if ((0, _lodash.default)(_this.props.onClose)) {
        _this.props.onClose(event, {});
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderSearch", function () {
      var returnVal;

      if (_this.props.search) {
        returnVal = /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-app-launcher__header-search",
          ref: function ref(component) {
            if (component) {
              if (!_this.focusedOnSearch) {
                var input = component.querySelector('input');

                if (input) {
                  // push to end of stack so click event doesn't blur the focus
                  setTimeout(function () {
                    input.focus();
                    _this.focusedOnSearch = true;
                  }, 0);
                }
              }
            } else {
              _this.focusedOnSearch = false;
            }
          }
        }, _this.props.search);
      }

      return returnVal;
    });

    _this.generatedId = _shortid.default.generate();
    _this.state = {
      isOpen: false
    }; // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    (0, _checkProps.default)(_constants.APP_LAUNCHER, props, _component.default);
    return _this;
  }

  _createClass(AppLauncher, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen; // Should be removed in the future by adding a reset class of some sort.

      var style = this.props.noTruncate ? {
        maxWidth: 'none'
      } : null;

      var customModalHeader = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h2", {
        className: "slds-text-heading_medium",
        id: "".concat(this.getId(), "-app-launcher-title")
      }, this.props.title), this.renderSearch(), this.props.modalHeaderButton ? this.props.modalHeaderButton : /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-size_1-of-7"
      })); // Not present in SLDS, but is consistent with other implementations of App Launcher. This also prevents resizing/jumping around when filtering. It will start clipping the modal close button at 600px viewport height.


      var modalContentStaticHeight = '90%';

      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      var triggerAssistiveText = this.props.triggerAssistiveText || assistiveText.trigger;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover",
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-context-bar__icon-action"
      }, /*#__PURE__*/_react.default.createElement("button", {
        "aria-haspopup": "true",
        className: "slds-button slds-icon-waffle_container slds-context-bar__button",
        onClick: this.openAppLauncher,
        title: triggerAssistiveText,
        type: "button"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-icon-waffle"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-r1"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-r2"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-r3"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-r4"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-r5"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-r6"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-r7"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-r8"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-r9"
      })), triggerAssistiveText && /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, triggerAssistiveText))), /*#__PURE__*/_react.default.createElement(_modal.default, {
        ariaHideApp: this.props.ariaHideApp,
        assistiveText: {
          dialogLabelledBy: "".concat(this.getId(), "-app-launcher-title")
        },
        className: (0, _classnames.default)('slds-app-launcher', this.props.modalClassName),
        contentClassName: "slds-app-launcher__content slds-p-around_medium",
        contentStyle: {
          minHeight: modalContentStaticHeight
        },
        isOpen: isOpen,
        onRequestClose: this.closeAppLauncher,
        size: "large",
        header: customModalHeader,
        headerClassName: "slds-grid slds-grid_align-spread slds-grid_vertical-align-center"
      }, this.props.children), this.props.triggerName ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-context-bar__label-action slds-context-bar__app-name"
      }, this.props.noTruncate ? this.props.triggerName : /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-truncate",
        title: this.props.triggerName
      }, this.props.triggerName)) : null);
    }
  }]);

  return AppLauncher;
}(_react.default.Component);

_defineProperty(AppLauncher, "displayName", _constants.APP_LAUNCHER);

_defineProperty(AppLauncher, "propTypes", {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `trigger`: This is a visually hidden label for the app launcher icon.
   */
  assistiveText: _propTypes.default.shape({
    trigger: _propTypes.default.string
  }),

  /**
   * Boolean indicating if the appElement should be hidden.
   */
  ariaHideApp: _propTypes.default.bool,

  /**
   * One or more `<AppLauncherExpandableSection />`s, each containing one or more `<AppLauncherTile />`s or `<AppLauncherLink />`s
   */
  children: _propTypes.default.node.isRequired,

  /**
   * The app launcher id. If not provided, one will be generated for accessibility
   */
  id: _propTypes.default.string,

  /**
   * Control the open/close state of the App Launcher
   */
  isOpen: _propTypes.default.bool,

  /**
   * CSS classes to be added to App Launcher Modal.
   */
  modalClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Button that exists in the upper right hand corner of the App Launcher modal
   */
  modalHeaderButton: _propTypes.default.node,

  /**
   * Allows longer application names without truncating them.
   */
  noTruncate: _propTypes.default.bool,

  /**
   * Callback when the App Launcher Modal is closed
   */
  onClose: _propTypes.default.func,

  /**
   * Search bar for the Modal's header. Will typically be an instance of `design-system-react/input/search`
   */
  search: _propTypes.default.node,

  /**
   * Set the App Launcher's title text (for localization)
   */
  title: _propTypes.default.string,

  /**
   * This is typically the name of the cloud or application
   */
  triggerName: _propTypes.default.node,

  /**
   * Callback when the App Launcher icon is clicked
   */
  triggerOnClick: _propTypes.default.func
});

_defineProperty(AppLauncher, "defaultProps", defaultProps);

var _default = AppLauncher;
exports.default = _default;