"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _docs = require("./docs.json");

var _docs2 = _interopRequireDefault(_docs);

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

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
    collapseSection: 'Toggle visibility of section'
  }
};
/**
 * App Launcher Sections allow users to categorize App Tiles as well as toggle their display
 */

var AppLauncherSection =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppLauncherSection, _React$Component);

  function AppLauncherSection() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, AppLauncherSection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = AppLauncherSection.__proto__ || Object.getPrototypeOf(AppLauncherSection)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        isOpen: true
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "toggleOpen", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          isOpen: !_this.state.isOpen
        });

        if ((0, _lodash2.default)(_this.props.onToggleClick)) {
          _this.props.onToggleClick(event, {});
        }
      }
    }), _temp));
  }

  _createClass(AppLauncherSection, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _checkProps2.default)(_constants.APP_LAUNCHER_SECTION, this.props, _docs2.default);
    }
  }, {
    key: "render",
    value: function render() {
      var isOpen = this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;
      var iconIsOpenClass = isOpen ? 'slds-is-open' : 'slds-is-close';
      var sectionIsOpenClass = isOpen ? 'slds-is-expanded' : 'slds-is-collapsed';

      var assistiveText = _objectSpread({}, defaultProps.assistiveText, this.props.assistiveText);

      return _react2.default.createElement("div", {
        className: (0, _classnames2.default)('slds-section', iconIsOpenClass)
      }, _react2.default.createElement("div", {
        className: "slds-section__title"
      }, this.props.toggleable || this.props.onToggleClick ? _react2.default.createElement(_button2.default, {
        assistiveText: {
          icon: this.props.collapseSectionAssistiveText || assistiveText.collapseSection
        },
        iconCategory: "utility",
        iconName: "switch",
        onClick: this.toggleOpen,
        className: "slds-m-right_small",
        variant: "icon"
      }) : null, _react2.default.createElement("h3", null, this.props.title)), _react2.default.createElement("div", {
        className: "slds-section__content"
      }, _react2.default.createElement("ul", {
        className: (0, _classnames2.default)('slds-grid slds-grid_pull-padded slds-wrap', sectionIsOpenClass)
      }, _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.createElement("li", {
          className: (0, _classnames2.default)('slds-col_padded slds-grow-none', child.props.size === 'small' ? 'slds-size_xx-small' : 'slds-size_1-of-1 slds-medium-size_1-of-3')
        }, child);
      }))));
    }
  }]);

  return AppLauncherSection;
}(_react2.default.Component);

Object.defineProperty(AppLauncherSection, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: _constants.APP_LAUNCHER_SECTION
});
Object.defineProperty(AppLauncherSection, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * **Assistive text for accessibility.**
     * This object is merged with the default props object on every render.
     * * `collapseSection`: The assistive text for the section collapse icons.
     */
    assistiveText: _propTypes2.default.shape({
      collapseSection: _propTypes2.default.string
    }),

    /**
     * The title for this section of apps
     */
    title: _propTypes2.default.string.isRequired,

    /**
     * Allows the user to show/hide the section
     */
    toggleable: _propTypes2.default.bool,

    /**
     * An array of applications to display
     */
    children: _propTypes2.default.node.isRequired,

    /**
     * Controls the open/closed state of the section
     */
    isOpen: _propTypes2.default.bool,

    /**
     * Callback for when section is toggled. Passes "isOpen" bool. Forces `toggleable` to true
     */
    onToggleClick: _propTypes2.default.func
  }
});
Object.defineProperty(AppLauncherSection, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: defaultProps
});
exports.default = AppLauncherSection;