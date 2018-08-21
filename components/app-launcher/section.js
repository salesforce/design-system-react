"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  assistiveText: {
    collapseSection: 'Toggle visibility of section'
  }
};
/**
 * App Launcher Sections allow users to categorize App Tiles as well as toggle their display
 */

var AppLauncherSection = (0, _createReactClass2.default)({
  // ### Display Name
  // Always use the canonical component name as the React display name.
  displayName: _constants.APP_LAUNCHER_SECTION,
  // ### Prop Types
  propTypes: {
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
  },
  getDefaultProps: function getDefaultProps() {
    return defaultProps;
  },
  getInitialState: function getInitialState() {
    return {
      isOpen: true
    };
  },
  componentWillMount: function componentWillMount() {
    (0, _checkProps2.default)(_constants.APP_LAUNCHER_SECTION, this.props);
  },
  toggleOpen: function toggleOpen(event) {
    this.setState({
      isOpen: !this.state.isOpen
    });

    if ((0, _lodash2.default)(this.props.onToggleClick)) {
      this.props.onToggleClick(event, {});
    }
  },
  render: function render() {
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
      className: "slds-m-right--small",
      variant: "icon"
    }) : null, _react2.default.createElement("h3", null, this.props.title)), _react2.default.createElement("div", {
      className: "slds-section__content"
    }, _react2.default.createElement("ul", {
      className: (0, _classnames2.default)('slds-grid slds-grid--pull-padded slds-wrap', sectionIsOpenClass)
    }, _react2.default.Children.map(this.props.children, function (child) {
      return _react2.default.createElement("li", {
        className: (0, _classnames2.default)('slds-col--padded slds-grow-none', child.props.size === 'small' ? 'slds-size--xx-small' : 'slds-size--1-of-1 slds-medium-size--1-of-3')
      }, child);
    }))));
  }
});
exports.default = AppLauncherSection;