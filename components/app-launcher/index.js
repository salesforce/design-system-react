"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _docs = require("./docs.json");

var _docs2 = _interopRequireDefault(_docs);

var _modal = require("../modal");

var _modal2 = _interopRequireDefault(_modal);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
 * 	<AppLauncherSection>
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 	</AppLauncherSection>
 * 	<AppLauncherSection>
 * 		<AppLauncherTile />
 * 		<AppLauncherTile />
 * 	</AppLauncherSection>
 * </AppLauncher>
 * ```
 *
 * By default, `Modal`, a child component of App Launcher, will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies. To prevent this you can add the following to your application with `#mount` being the root node of your application that you would like to hide from assistive technologies when the `Modal` is open.
 * ```
 * import settings from 'design-system-react/components/settings';
 * settings.setAppElement('#mount');
 * ```
 */

var AppLauncher =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppLauncher, _React$Component);

  function AppLauncher() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, AppLauncher);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = AppLauncher.__proto__ || Object.getPrototypeOf(AppLauncher)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        isOpen: false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "openAppLauncher", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          isOpen: true
        });

        if ((0, _lodash2.default)(_this.props.triggerOnClick)) {
          _this.props.triggerOnClick(event, {});
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "closeAppLauncher", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          isOpen: false
        });

        if ((0, _lodash2.default)(_this.props.onClose)) {
          _this.props.onClose(event, {});
        }
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "renderSearch", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var returnVal;

        if (_this.props.search) {
          returnVal = _react2.default.createElement("div", {
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
      }
    }), _temp));
  }

  _createClass(AppLauncher, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
      (0, _checkProps2.default)(_constants.APP_LAUNCHER, this.props, _docs2.default);
    }
  }, {
    key: "render",
    value: function render() {
      var isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen; // Should be removed in the future by adding a reset class of some sort.

      var style = this.props.noTruncate ? {
        maxWidth: 'none'
      } : null;

      var customModalHeader = _react2.default.createElement("div", {
        className: "slds-grid slds-grid_align-spread slds-grid_vertical-align-center"
      }, _react2.default.createElement("h2", {
        className: "slds-text-heading_medium"
      }, this.props.title), this.renderSearch(), this.props.modalHeaderButton ? this.props.modalHeaderButton : _react2.default.createElement("span", {
        className: "slds-size_1-of-7"
      })); // Not present in SLDS, but is consistent with other implementations of App Launcher. This also prevents resizing/jumping around when filtering. It will start clipping the modal close button at 600px viewport height.


      var modalContentStaticHeight = '90%';

      var assistiveText = _objectSpread({}, defaultProps.assistiveText, this.props.assistiveText);

      var triggerAssistiveText = this.props.triggerAssistiveText || assistiveText.trigger;
      return _react2.default.createElement("div", {
        className: "slds-context-bar__item slds-no-hover",
        style: style
      }, _react2.default.createElement("div", {
        className: "slds-context-bar__icon-action"
      }, _react2.default.createElement("button", {
        "aria-haspopup": "true",
        className: "slds-button slds-icon-waffle_container slds-context-bar__button",
        onClick: this.openAppLauncher
      }, _react2.default.createElement("span", {
        className: "slds-icon-waffle"
      }, _react2.default.createElement("span", {
        className: "slds-r1"
      }), _react2.default.createElement("span", {
        className: "slds-r2"
      }), _react2.default.createElement("span", {
        className: "slds-r3"
      }), _react2.default.createElement("span", {
        className: "slds-r4"
      }), _react2.default.createElement("span", {
        className: "slds-r5"
      }), _react2.default.createElement("span", {
        className: "slds-r6"
      }), _react2.default.createElement("span", {
        className: "slds-r7"
      }), _react2.default.createElement("span", {
        className: "slds-r8"
      }), _react2.default.createElement("span", {
        className: "slds-r9"
      })), triggerAssistiveText && _react2.default.createElement("span", {
        className: "slds-assistive-text"
      }, triggerAssistiveText))), _react2.default.createElement(_modal2.default, {
        ariaHideApp: this.props.ariaHideApp,
        contentClassName: "slds-modal__content slds-app-launcher__content slds-p-around_medium",
        contentStyle: {
          minHeight: modalContentStaticHeight
        },
        isOpen: isOpen,
        onRequestClose: this.closeAppLauncher,
        containerClassName: (0, _classnames2.default)('app-launcher', this.props.modalClassName),
        size: "large",
        header: customModalHeader,
        headerClassName: "slds-app-launcher__header"
      }, this.props.children), this.props.triggerName ? _react2.default.createElement("span", {
        className: (0, _classnames2.default)('slds-context-bar__label-action slds-context-bar__app-name', {
          'slds-truncate': !this.props.noTruncate
        })
      }, this.props.triggerName) : null);
    }
  }]);

  return AppLauncher;
}(_react2.default.Component);

Object.defineProperty(AppLauncher, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.APP_LAUNCHER
});
Object.defineProperty(AppLauncher, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * **Assistive text for accessibility.**
     * This object is merged with the default props object on every render.
     * * `trigger`: This is a visually hidden label for the app launcher icon.
     */
    assistiveText: _propTypes2.default.shape({
      trigger: _propTypes2.default.string
    }),

    /**
     * Boolean indicating if the appElement should be hidden.
     */
    ariaHideApp: _propTypes2.default.bool,

    /**
     * One or more `<AppLauncherSection />`s each containing one or more `<AppLauncherTile />`s
     */
    children: _propTypes2.default.node.isRequired,

    /**
     * Control the open/close state of the App Launcher
     */
    isOpen: _propTypes2.default.bool,

    /**
     * CSS classes to be added to App Launcher Modal.
     */
    modalClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * Button that exists in the upper right hand corner of the App Launcher modal
     */
    modalHeaderButton: _propTypes2.default.node,

    /**
     * Allows longer application names without truncating them.
     */
    noTruncate: _propTypes2.default.bool,

    /**
     * Callback when the App Launcher Modal is closed
     */
    onClose: _propTypes2.default.func,

    /**
     * Search bar for the Modal's header. Will typically be an instance of `design-system-react/input/search`
     */
    search: _propTypes2.default.node,

    /**
     * Set the App Launcher's title text (for localization)
     */
    title: _propTypes2.default.string,

    /**
     * This is typically the name of the cloud or application
     */
    triggerName: _propTypes2.default.node,

    /**
     * Callback when the App Launcher icon is clicked
     */
    triggerOnClick: _propTypes2.default.func
  }
});
Object.defineProperty(AppLauncher, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: defaultProps
});
exports.default = AppLauncher;