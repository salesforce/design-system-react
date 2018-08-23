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

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

/**
 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
 */
var GlobalNavigationDropdownTrigger = (0, _createReactClass2.default)({
  // ### Display Name
  // Always use the canonical component name (set in the core) as the React
  // display name.
  displayName: _constants.MENU_DROPDOWN_TRIGGER,
  // ### Prop Types
  propTypes: {
    /**
     * Whether the item is active or not.
     */
    active: _propTypes2.default.bool,

    /**
     * Allows alignment of active item with active application background color.
     */
    activeBackgroundColor: _propTypes2.default.string,

    /**
     * **Assistive text for accessibility.**
     * This object is merged with the default props object on every render.
     * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
     */
    assistiveText: _propTypes2.default.shape({
      icon: _propTypes2.default.string
    }),

    /**
     * CSS classes to be added to the 'li'.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * Determines position of separating bar.
     */
    dividerPosition: _propTypes2.default.oneOf(['left', 'right']),

    /**
     * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
     */
    id: _propTypes2.default.string,

    /**
     * Allows the dropdown menu to style itself accordingly when open since CSS hover rules cannot take effect if the menu is not inline.
     */
    isOpen: _propTypes2.default.bool,

    /**
     * Visible label on the dropdown menu trigger button.
     */
    label: _propTypes2.default.string,

    /**
     * The dropdown menu.
     */
    menu: _propTypes2.default.node,

    /**
     * Is only called when `openOn` is set to `hover` and when the triggering li loses focus.
     */
    onBlur: _propTypes2.default.func,

    /**
     * This prop is passed onto the triggering `li`. Triggered when the trigger li is clicked.
     */
    onClick: _propTypes2.default.func,

    /**
     * Is only called when `openOn` is set to `hover` and when the triggering li gains focus.
     */
    onFocus: _propTypes2.default.func,

    /**
     * Called when a key pressed.
     */
    onKeyDown: _propTypes2.default.func,

    /**
     * Called when mouse clicks down on the trigger `li`.
     */
    onMouseDown: _propTypes2.default.func,

    /**
     * Called when mouse hovers over the trigger `li`.
     */
    onMouseEnter: _propTypes2.default.func,

    /**
     * Called when mouse leaves trigger `li` or the menu.
     */
    onMouseLeave: _propTypes2.default.func,

    /**
     * The ref of the actual triggering button.
     */
    triggerRef: _propTypes2.default.func
  },
  componentWillMount: function componentWillMount() {
    (0, _checkProps2.default)(_constants.MENU_DROPDOWN_TRIGGER, this.props);
  },
  // ### Render
  render: function render() {
    var _props = this.props,
        active = _props.active,
        activeBackgroundColor = _props.activeBackgroundColor,
        className = _props.className,
        dividerPosition = _props.dividerPosition,
        id = _props.id,
        isOpen = _props.isOpen,
        label = _props.label,
        menu = _props.menu,
        onBlur = _props.onBlur,
        onClick = _props.onClick,
        onFocus = _props.onFocus,
        onKeyDown = _props.onKeyDown,
        onMouseDown = _props.onMouseDown,
        onMouseEnter = _props.onMouseEnter,
        onMouseLeave = _props.onMouseLeave,
        triggerRef = _props.triggerRef,
        rest = _objectWithoutProperties(_props, ["active", "activeBackgroundColor", "className", "dividerPosition", "id", "isOpen", "label", "menu", "onBlur", "onClick", "onFocus", "onKeyDown", "onMouseDown", "onMouseEnter", "onMouseLeave", "triggerRef"]);

    var listItemstyle = {}; // TODO: This should eventually exist in a CSS class. Feature has been filed.

    var hoverBackgroundColor = '#f7f9fb';

    if (active) {
      listItemstyle.backgroundColor = activeBackgroundColor;
      listItemstyle.borderBottomColor = activeBackgroundColor;
    } // Per SLDS pattern, set trigger style like hover style, so that hover visuals and menu being open and closed are in same state


    if (isOpen) {
      listItemstyle.backgroundColor = hoverBackgroundColor;
    }

    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      _react2.default.createElement("li", {
        "aria-haspopup": "true",
        className: (0, _classnames2.default)('slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger--click', _defineProperty({
          'slds-is-open': isOpen,
          'slds-is-active': active
        }, "slds-context-bar__item--divider-".concat(dividerPosition), dividerPosition), className),
        id: id,
        onBlur: onBlur,
        onClick: onClick,
        onFocus: onFocus,
        onKeyDown: onKeyDown,
        onMouseDown: onMouseDown,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        ref: triggerRef,
        style: listItemstyle
      }, _react2.default.createElement("a", {
        className: "slds-context-bar__label-action"
      }, label), _react2.default.createElement("div", {
        className: "slds-context-bar__icon-action slds-p-left--none"
      }, _react2.default.createElement(_button2.default, _extends({
        assistiveText: this.props.assistiveText
      }, rest, {
        className: "slds-context-bar__button slds-context-bar-action__trigger",
        "aria-haspopup": "true",
        iconCategory: "utility",
        iconName: "chevrondown",
        iconVariant: "bare",
        iconSize: "x-small",
        variant: "icon"
      }))), menu)
    );
  }
});
exports.default = GlobalNavigationDropdownTrigger;