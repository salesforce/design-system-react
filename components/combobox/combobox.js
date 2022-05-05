"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _lodash2 = _interopRequireDefault(require("lodash.find"));

var _lodash3 = _interopRequireDefault(require("lodash.reject"));

var _lodash4 = _interopRequireDefault(require("lodash.isequal"));

var _lodash5 = _interopRequireDefault(require("lodash.findindex"));

var _lodash6 = _interopRequireDefault(require("lodash.isfunction"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _button = _interopRequireDefault(require("../button"));

var _dialog = _interopRequireDefault(require("../utilities/dialog"));

var _innerInput = _interopRequireDefault(require("../../components/input/private/inner-input"));

var _inputIcon = _interopRequireDefault(require("../icon/input-icon"));

var _menu = _interopRequireDefault(require("./private/menu"));

var _label = _interopRequireDefault(require("../forms/private/label"));

var _popover = _interopRequireDefault(require("../popover"));

var _selectedListbox = _interopRequireDefault(require("../pill-container/private/selected-listbox"));

var _fieldLevelHelpTooltip = _interopRequireDefault(require("../tooltip/private/field-level-help-tooltip"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _keyBuffer = _interopRequireDefault(require("../../utilities/key-buffer"));

var _keyLetterMenuItemSelect = _interopRequireDefault(require("../../utilities/key-letter-menu-item-select"));

var _keyCallbacks = _interopRequireDefault(require("../../utilities/key-callbacks"));

var _menuItemSelectScroll = _interopRequireDefault(require("../../utilities/menu-item-select-scroll"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _constants = require("../../utilities/constants");

var _component = _interopRequireDefault(require("./component.json"));

var _iconSettings = require("../icon-settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var currentOpenDropdown;
var documentDefined = typeof document !== 'undefined';
var propTypes = {
  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
   * * `loading`: Text added to loading spinner.
   * * `optionSelectedInMenu`: Added before selected menu items in Read-only variants (Picklists). The default is `Current Selection:`.
   * * `popoverLabel`: Used by popover variant, assistive text for the Popover aria-label.
   * * `removeSingleSelectedOption`: Used by inline-listbox, single-select variant to remove the selected item (pill). This is a button with focus. The default is `Remove selected option`.
   * * `removePill`: Used by multiple selection Comboboxes to remove a selected item (pill). Focus is on the pill. This is not a button. The default  is `, Press delete or backspace to remove`.
   * * `selectedListboxLabel`: This is a label for the selected listbox. The grouping of pills for multiple selection Comboboxes. The default is `Selected Options:`.
   * _Tested with snapshot testing._
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string,
    loadingMenuItems: _propTypes.default.string,
    optionSelectedInMenu: _propTypes.default.string,
    popoverLabel: _propTypes.default.string,
    removeSingleSelectedOption: _propTypes.default.string,
    removePill: _propTypes.default.string,
    selectedListboxLabel: _propTypes.default.string
  }),

  /**
   * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them.
   * This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need. _Tested with snapshot testing._
   */
  'aria-describedby': _propTypes.default.string,

  /**
   * CSS classes to be added to tag with `.slds-combobox`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS classes to be added to top level tag with `.slds-form-element` and not on `.slds-combobox_container`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
   */
  classNameContainer: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames). Autocomplete/bass variant menu height should not scroll and should be determined by number items which should be no more than 10. _Tested with snapshot testing._
   */
  classNameMenu: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * CSS classes to be added to tag with `.slds-dropdown__header`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  classNameMenuSubHeader: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Event Callbacks
   * * `onBlur`: Called when `input` removes focus.
   * * `onChange`: Called when keyboard events occur within `input`
   * * `onClose`: Triggered when the menu has closed.
   * * `onFocus`: Called when `input` receives focus.
   * * `onOpen`: Triggered when the menu has opened.
   * * `onRequestClose`: Function called when the menu would like to hide. Please use with `isOpen`.
   * * `onRequestOpen`:  Function called when the menu would like to show. Please use with `isOpen`.
   * * `onRequestRemoveSelectedOption`: Function called when a single selection option is to be removed.
   * * `onSelect`: Function called when a menu item is selected. This includes header and footer items.
   * * `onSubmit`: Function called when user presses enter or submits the `input`
   * _Tested with Mocha testing._
   */
  events: _propTypes.default.shape({
    onBlur: _propTypes.default.func,
    onChange: _propTypes.default.func,
    onClose: _propTypes.default.func,
    onFocus: _propTypes.default.func,
    onOpen: _propTypes.default.func,
    onRequestClose: _propTypes.default.func,
    onRequestOpen: _propTypes.default.func,
    onRequestRemoveSelectedOption: _propTypes.default.func,
    onSelect: _propTypes.default.func,
    onSubmit: _propTypes.default.func
  }),

  /**
   * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error. _Tested with snapshot testing._
   */
  errorText: _propTypes.default.string,

  /**
   * A [Tooltip](https://react.lightningdesignsystem.com/components/tooltips/) component that is displayed next to the `labels.label`. The props from the component will be merged and override any default props.
   */
  fieldLevelHelpTooltip: _propTypes.default.node,

  /**
   * If true, `{ label: 'None': value: '' }` will be selected.
   */
  hasDeselect: _propTypes.default.bool,

  /**
   * If true, loading spinner appears inside input on right hand side.
   */
  hasInputSpinner: _propTypes.default.bool,

  /**
   * Add loading spinner below the options
   */
  hasMenuSpinner: _propTypes.default.bool,

  /**
   * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
   */
  hasStaticAlignment: _propTypes.default.bool,

  /**
   * HTML id for component. _Tested with snapshot testing._
   */
  id: _propTypes.default.string,

  /**
   * An [Input](https://react.lightningdesignsystem.com/components/inputs) component.
   * The props from this component will override any default props.
   */
  input: _propTypes.default.node,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `deselectOption`: This label appears first in the menu items of a read-only, Picklist-like Combobox. Selecting it, deselects any currently selected value.
   * * `label`: This label appears above the input.
   * * `cancelButton`: This label is only used by the dialog variant for the cancel button in the footer of the dialog. The default is `Cancel`
   * * `doneButton`: This label is only used by the dialog variant for the done button in the footer of the dialog. The default is `Done`
   * * `multipleOptionsSelected`: This label is used by the readonly variant when multiple options are selected. The default is `${props.selection.length} options selected`. This will override the entire string.
   * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
   * * `placeholder`: Input placeholder
   * * `placeholderReadOnly`: Placeholder for Picklist-like Combobox
   * * `removePillTitle`: Title on `X` icon
   * _Tested with snapshot testing._
   */
  labels: _propTypes.default.shape({
    deselectOption: _propTypes.default.string,
    label: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
    multipleOptionsSelected: _propTypes.default.string,
    noOptionsFound: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
    placeholder: _propTypes.default.string,
    placeholderReadOnly: _propTypes.default.string,
    removePillTitle: _propTypes.default.string
  }),

  /**
   * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) _Tested with snapshot testing._
   */
  isOpen: _propTypes.default.bool,

  /**
   * Sets the dialog width to the width of one of the following:
   * * `target`: Sets the dialog width to the width of the target. (Menus attached to `input` typically follow this UX pattern),
   * * `menu`: Consider setting a `menuMaxWidth` if using this value. If not, width will be set to width of largest menu item.
   * * `none`: Does not set a width on the dialog. _Tested with snapshot testing._
   */
  inheritWidthOf: _propTypes.default.oneOf(['target', 'menu', 'none']),

  /**
   * Accepts a custom menu item rendering function that becomes a custom component. It should return a React node. The checkmark is still rendered in readonly variants. This function is passed the following props:
   * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
   * * `option`: Object, option data for item being rendered that is passed into Combobox
   * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
   *
   * _Tested with snapshot testing._
   */
  onRenderMenuItem: _propTypes.default.func,

  /**
   * This callback exposes the input reference / DOM node to parent components.
   */
  inputRef: _propTypes.default.func,

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  menuPosition: _propTypes.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * Sets a maximum width that the menu will be used if `inheritWidthOf` is set to `menu`. (Example: 500px) _Tested with snapshot testing._
   *
   */
  menuMaxWidth: _propTypes.default.string,

  /**
   * Allows multiple selections _Tested with mocha testing._
   */
  multiple: _propTypes.default.bool,

  /**
   * **Array of item objects in the dropdown menu.**
   * Each object can contain:
   * * `icon`: An `Icon` component. (not used in read-only variant)
   * * `id`: A unique identifier string.
   * * `label`: A primary string of text for a menu item or group separator.
   * * `subTitle`: A secondary string of text added for clarity. (optional)
   * * `title`: A string of text shown as the title of the selected item (optional)
   * * `type`: 'separator' is the only type currently used
   * * `disabled`: Set to true to disable this menu item.
   * * `tooltipContent`: Content that is displayed in tooltip when item is disabled
   * ```
   * {
   * 	id: '2',
   * 	label: 'Salesforce.com, Inc.',
   * 	subTitle: 'Account • San Francisco',
   * 	title: 'Salesforce',
   * 	type: 'account',
   *  disabled: true,
   *  tooltipContent: "You don't have permission to select this item."
   * },
   * ```
   * Note: At the moment, Combobox does not support two consecutive separators. _Tested with snapshot testing._
   */
  options: _propTypes.default.arrayOf(_propTypes.default.PropTypes.shape({
    id: _propTypes.default.string.isRequired,
    icon: _propTypes.default.node,
    label: _propTypes.default.string,
    subTitle: _propTypes.default.string,
    title: _propTypes.default.string,
    type: _propTypes.default.string,
    disabled: _propTypes.default.bool,
    tooltipContent: _propTypes.default.node
  })),

  /**
   * Determines the height of the menu based on SLDS CSS classes. This is a `number`. The default for a `readonly` variant is `5`.
   */
  menuItemVisibleLength: _propTypes.default.oneOf([5, 7, 10]),

  /**
   * Limits auto-complete input submission to one of the provided options. _Tested with mocha testing._
   */
  predefinedOptionsOnly: _propTypes.default.bool,

  /**
   * A `Popover` component. The props from this popover will be merged and override any default props. This also allows a Combobox's Popover dialog to be a controlled component. _Tested with snapshot testing._
   */
  popover: _propTypes.default.node,

  /**
   * Applies label styling for a required form element. _Tested with snapshot testing._
   */
  required: _propTypes.default.bool,

  /**
   * Accepts an array of item objects. For single selection, pass in an array of one object. For item object keys, see `options` prop. _Tested with snapshot testing._
   */
  selection: _propTypes.default.arrayOf(_propTypes.default.PropTypes.shape({
    id: _propTypes.default.string.isRequired,
    icon: _propTypes.default.node,
    label: _propTypes.default.string,
    subTitle: _propTypes.default.string,
    type: _propTypes.default.string
  })).isRequired,

  /**
   * This callback exposes the selected listbox reference / DOM node to parent components.
   */
  selectedListboxRef: _propTypes.default.func,

  /**
   * Disables the input and prevents editing the contents. This only applies for single readonly and inline-listbox variants.
   */
  singleInputDisabled: _propTypes.default.bool,

  /**
   * Accepts a tooltip that is displayed when hovering on disabled menu items.
   */
  tooltipMenuItemDisabled: _propTypes.default.element,

  /**
   * Value of input. _This is a controlled component,_ so you will need to control the input value by passing the `value` from `onChange` to a parent component or state manager, and then pass it back into the componet with this prop. Please see examples for more clarification. _Tested with snapshot testing._
   */
  value: _propTypes.default.string,

  /**
   * Changes styles of the input and menu. Currently `entity` is not supported.
   * The options are:
   * * `base`: An autocomplete Combobox also allows a user to select an option from a list, but that list can be affected by what the user types into the input of the Combobox. The SLDS website used to call the autocomplete Combobox its `base` variant.
   * * `inline-listbox`: An Entity Autocomplete Combobox or Lookup, is used to search for and select Salesforce Entities.
   * * `popover`: A dialog Combobox is best used when a listbox, tree, grid, or tree-grid is not the best solution. This variant allows custom content.
   * * `readonly`: A readonly text input that allows a user to select an option from a pre-defined list of options. It does not allow free form user input, nor does it allow the user to modify the selected value.
   *
   *  _Tested with snapshot testing._
   */

  /**
   * Default value of input. Provide uncontroled behaviour
   */
  defaultValue: _propTypes.default.string,

  /**
   * **Array of item objects in the dropdown menu that is displayed below the list of `options`. `onSelect` fires when selected.**
   * Each object can contain:
   * * `id`: A unique identifier string.
   * * `icon`: An [Icon](/components/icons/) component to be displayed to the left of the menu item `label`.
   * * `label`: A primary string of text for a menu item or a function that receives `inputValue` as function parameter and returns text to be displayed in for a menu item.
   * ```
   * {
   * 	id: '1',
   * 	icon: (
   *  	<Icon
   * 			assistiveText={{ label: 'add' }}
   * 			category="utility"
   * 			size="x-small"
   * 			name="add"
   * 		/>
   * 	),
   * 	label: 'New Entity'
   * }
   * ```
   * _Tested with snapshot testing._
   */
  optionsAddItem: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string,
    icon: _propTypes.default.node,
    label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
  })),

  /**
   * **Array of item objects in the dropdown menu that is displayed above the list of `options`. `onSelect` fires when selected. **
   * Each object can contain:
   * * `id`: A unique identifier string.
   * * `icon`: An [Icon](/components/icons/) component to be displayed to the left of the menu item `label`.
   * * `label`: A primary string of text for a menu item or a function that receives `inputValue` as function parameter and returns text to be displayed in for a menu item.
   * ```
   * {
   *	id: '1',
   *	icon: (
   *		<Icon
   *			assistiveText={{ label: 'Add in Accounts' }}
   *			size="x-small"
   *			category="utility"
   *			name="search"
   *		/>
   *	),
   *	label: (searchTerm) => {
   *		return `${searchTerm} in Accounts`;
   *	},
   * }
   * ```
   * _Tested with snapshot testing._
   */
  optionsSearchEntity: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string,
    icon: _propTypes.default.node,
    label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
  })),

  /**
   * Node of type [Combobox](/components/comboboxes/) for creating grouped comboboxes.
   */
  entityCombobox: _propTypes.default.node,

  /**
   * Defines Combobox variant styling and functionality
   */
  variant: _propTypes.default.oneOf(['base', 'inline-listbox', 'popover', 'readonly'])
};
var defaultProps = {
  assistiveText: {
    loadingMenuItems: 'Loading',
    optionSelectedInMenu: 'Current Selection:',
    removeSingleSelectedOption: 'Remove selected option',
    removePill: ', Press delete or backspace to remove',
    selectedListboxLabel: 'Selected Options:'
  },
  deselectOption: false,
  events: {},
  labels: {
    deselectOption: 'None',
    cancelButton: 'Cancel',
    doneButton: "Done",
    noOptionsFound: 'No matches found.',
    optionDisabledTooltipLabel: 'This option is disabled.',
    placeholderReadOnly: 'Select an Option',
    removePillTitle: 'Remove'
  },
  inheritWidthOf: 'target',
  menuPosition: 'absolute',
  optionsSearchEntity: [],
  optionsAddItem: [],
  required: false,
  selection: [],
  singleInputDisabled: false,
  variant: 'base'
};
/**
 * A widget that provides a user with an input field that is either an autocomplete or readonly, accompanied with a listbox of pre-definfined options.
 */

var Combobox = /*#__PURE__*/function (_React$Component) {
  _inherits(Combobox, _React$Component);

  var _super = _createSuper(Combobox);

  function Combobox(_props) {
    var _this;

    _classCallCheck(this, Combobox);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "getCustomPopoverProps", function (body, _ref) {
      var assistiveText = _ref.assistiveText,
          labels = _ref.labels;

      /*
       * Generate the popover props based on passed in popover props. Using the default behavior if not provided by passed in popover
       */
      var popoverBody = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-assistive-text",
        id: "".concat(_this.getId(), "-label")
      }, assistiveText.popoverLabel), body);

      var popoverFooter = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_button.default, {
        label: labels.cancelButton,
        onClick: function onClick(e) {
          _this.handleClose(e, {
            trigger: 'cancel'
          });
        }
      }), /*#__PURE__*/_react.default.createElement(_button.default, {
        label: labels.doneButton,
        variant: "brand",
        onClick: _this.handleClose
      }));

      var defaultPopoverProps = {
        ariaLabelledby: "".concat(_this.getId(), "-label"),
        align: 'bottom',
        body: popoverBody,
        className: 'slds-popover_full-width',
        footer: popoverFooter,
        footerClassName: 'slds-popover__footer_form',
        hasNoNubbin: true,
        id: _this.getId(),
        isOpen: _this.state.isOpen,
        hasNoTriggerStyles: true,
        onOpen: _this.handleOpen,
        onClose: _this.handleClose,
        onRequestClose: _this.handleClose
      };
      /* Merge in passed popover's props if there is any to override the default popover props */

      var popoverProps = (0, _lodash.default)(defaultPopoverProps, _this.props.popover ? _this.props.popover.props : {});
      popoverProps.body = popoverBody; // eslint-disable-next-line fp/no-delete

      delete popoverProps.children;
      return popoverProps;
    });

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getIsActiveOption", function () {
      return _this.state.activeOption && _this.state.activeOptionIndex !== -1;
    });

    _defineProperty(_assertThisInitialized(_this), "getIsOpen", function () {
      return !!(typeof _this.props.isOpen === 'boolean' ? _this.props.isOpen : _this.state.isOpen);
    });

    _defineProperty(_assertThisInitialized(_this), "getNewActiveOptionIndex", function (_ref2) {
      var activeOptionIndex = _ref2.activeOptionIndex,
          offset = _ref2.offset,
          options = _ref2.options;
      // used by menu listbox and selected options listbox
      var nextIndex = activeOptionIndex + offset;
      var skipIndex = options.length > nextIndex && nextIndex >= 0 && options[nextIndex].type === 'separator';
      var newIndex = skipIndex ? nextIndex + offset : nextIndex;
      var hasNewIndex = options.length > nextIndex && nextIndex >= 0;
      return hasNewIndex ? newIndex : activeOptionIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "getOptions", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      var localProps = props;
      var labels = (0, _lodash.default)({}, defaultProps.labels, _this.props.labels);
      var deselectOption = {
        id: _this.deselectId,
        label: labels.deselectOption,
        value: '',
        type: 'deselect'
      };
      var localOptionsSearchEntity = localProps.optionsSearchEntity.map(function (entity) {
        return _objectSpread(_objectSpread({}, entity), {}, {
          type: 'header'
        });
      });
      var localOptionsAddItem = props.optionsAddItem.map(function (entity) {
        return _objectSpread(_objectSpread({}, entity), {}, {
          type: 'footer'
        });
      });
      var options = [].concat(_toConsumableArray(localOptionsSearchEntity.length > 0 ? localOptionsSearchEntity : []), _toConsumableArray(props.hasDeselect ? [deselectOption] : []), _toConsumableArray(localProps.options && localProps.options.length > 0 ? localProps.options : []), _toConsumableArray(localOptionsAddItem.length > 0 ? localOptionsAddItem : []));
      return options;
    });

    _defineProperty(_assertThisInitialized(_this), "getTargetElement", function () {
      return _this.inputRef;
    });

    _defineProperty(_assertThisInitialized(_this), "setInputRef", function (component) {
      _this.inputRef = component; // yes, this is a render triggered by a render.
      // Dialog/Popper.js cannot place the menu until
      // the trigger/target DOM node is mounted. This
      // way `findDOMNode` is not called and parent
      // DOM nodes are not queried.

      if (!_this.state.inputRendered) {
        _this.setState({
          inputRendered: true
        });
      }

      if (_this.props.inputRef) {
        _this.props.inputRef(component);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setSelectedListboxRef", function (ref) {
      _this.selectedListboxRef = ref;

      if (_this.props.selectedListboxRef) {
        _this.props.selectedListboxRef(ref);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlurPill", function () {
      _this.setState({
        listboxHasFocus: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      _this.handleRequestClose(event, {});
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function (event) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          trigger = _ref3.trigger;

      var isOpen = _this.getIsOpen();

      if (isOpen) {
        if (currentOpenDropdown === _assertThisInitialized(_this)) {
          currentOpenDropdown = undefined;
        }

        _this.setState({
          activeOption: undefined,
          activeOptionIndex: -1,
          isOpen: false
        });

        if (_this.props.variant === 'popover' && trigger === 'cancel') {
          if (_this.props.popover.props.onClose) {
            _this.props.popover.props.onClose(event, {
              trigger: trigger
            });
          }
        }

        if (_this.props.events.onClose) {
          _this.props.events.onClose(event, {});
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputBlur", function (event) {
      // If menu is open when the input's onBlur event fires, it will close before the onClick of the menu item can fire.
      setTimeout(function () {
        var activeElement = documentDefined ? document.activeElement : false; // detect if the scrollbar of the combobox-autocomplete/lookup menu is clicked in IE11. If it is, return focus to input, and do not close menu.

        if (activeElement && activeElement.tagName === 'DIV' && activeElement.id === "".concat(_this.getId(), "-listbox")) {
          if (_this.inputRef) {
            _this.inputRef.focus();
          }
        } else if (!_this.props.popover) {
          _this.handleClose(event);
        }
      }, 200);

      if (_this.props.events.onBlur) {
        _this.props.events.onBlur(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (event) {
      _this.requestOpenMenu();

      if (_this.props.events && _this.props.events.onChange) {
        _this.props.events.onChange(event, {
          value: event.target.value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputFocus", function (event) {
      if (_this.props.events.onFocus) {
        _this.props.events.onFocus(event, {});
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputSubmit", function (event) {
      if (_this.state.activeOption && _this.state.activeOption.disabled) {
        return;
      }

      if (_this.state.activeOption && (_this.state.activeOption.type === 'header' || _this.state.activeOption.type === 'footer')) {
        _this.state.activeOption.onClick(event);

        return;
      } // use menu options


      if (_this.getIsActiveOption()) {
        _this.handleSelect(event, {
          option: _this.state.activeOption,
          selection: _this.props.selection
        }); // use input value, if not limited to predefined options (in the menu)

      } else if (!_this.props.predefinedOptionsOnly && event.target.value !== '' && _this.props.events.onSubmit) {
        _this.props.events.onSubmit(event, {
          value: event.target.value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var _callbacks;

      var callbacks = (_callbacks = {}, _defineProperty(_callbacks, _keyCode.default.DOWN, {
        callback: _this.handleKeyDownDown
      }), _defineProperty(_callbacks, _keyCode.default.ENTER, {
        callback: _this.handleInputSubmit
      }), _defineProperty(_callbacks, _keyCode.default.ESCAPE, {
        callback: _this.handleClose
      }), _defineProperty(_callbacks, _keyCode.default.UP, {
        callback: _this.handleKeyDownUp
      }), _callbacks);

      if (_this.props.variant === 'readonly') {
        if (_this.props.selection.length > 2) {
          callbacks[_keyCode.default.TAB] = {
            callback: _this.handleKeyDownTab
          };
        } else {
          callbacks[_keyCode.default.TAB] = undefined;
        }

        callbacks.other = {
          callback: _this.handleKeyDownOther,
          stopPropagation: false
        };
      } // Propagate events when menu is closed


      var stopPropagation = _this.getIsOpen(); // Helper function that takes an object literal of callbacks that are triggered with a key event


      (0, _keyCallbacks.default)(event, {
        callbacks: callbacks,
        stopPropagation: stopPropagation
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDownDown", function (event) {
      // Don't open if user is selecting text
      if (!event.shiftKey) {
        _this.openDialog();
      }

      if (_this.props.variant !== 'popover') {
        _this.handleNavigateListboxMenu(event, {
          direction: 'next'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDownTab", function () {
      if (_this.selectedListboxRef) {
        _this.setState({
          listboxHasFocus: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDownUp", function (event) {
      // Don't open if user is selecting text
      if (!event.shiftKey && _this.getIsOpen()) {
        _this.handleNavigateListboxMenu(event, {
          direction: 'previous'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDownOther", function (event) {
      var activeOptionIndex = (0, _keyLetterMenuItemSelect.default)({
        key: event.key,
        keyBuffer: _this.menuKeyBuffer,
        keyCode: event.keyCode,
        options: _this.getOptions()
      });

      if (activeOptionIndex !== undefined) {
        if (_this.getIsOpen()) {
          (0, _menuItemSelectScroll.default)({
            container: _this.menuRef,
            focusedIndex: activeOptionIndex
          });
        }

        _this.setState({
          activeOption: _this.getOptions()[activeOptionIndex],
          activeOptionIndex: activeOptionIndex
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleNavigateListboxMenu", function (event, _ref4) {
      var direction = _ref4.direction;
      var offsets = {
        next: 1,
        previous: -1
      }; // takes current/previous state and returns an object with the new state

      _this.setState(function (prevState) {
        var newIndex = _this.getNewActiveOptionIndex({
          activeOptionIndex: prevState.activeOptionIndex,
          offset: offsets[direction],
          options: _this.getOptions()
        }); // eslint-disable-next-line react/no-access-state-in-setstate


        if (_this.getIsOpen()) {
          (0, _menuItemSelectScroll.default)({
            container: _this.menuRef,
            focusedIndex: newIndex
          });
        }

        return {
          activeOption: _this.getOptions()[newIndex],
          activeOptionIndex: newIndex
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleNavigateSelectedListbox", function (event, _ref5) {
      var direction = _ref5.direction;
      var offsets = {
        next: 1,
        previous: -1
      };

      _this.setState(function (prevState) {
        var isLastOptionAndRightIsPressed = prevState.activeSelectedOptionIndex + 1 === _this.props.selection.length && direction === 'next';
        var isFirstOptionAndLeftIsPressed = prevState.activeSelectedOptionIndex === 0 && direction === 'previous';
        var newState;

        if (isLastOptionAndRightIsPressed) {
          newState = {
            activeSelectedOption: _this.props.selection[0],
            activeSelectedOptionIndex: 0,
            listboxHasFocus: true
          };
        } else if (isFirstOptionAndLeftIsPressed) {
          newState = {
            activeSelectedOption: _this.props.selection[_this.props.selection.length - 1],
            activeSelectedOptionIndex: _this.props.selection.length - 1,
            listboxHasFocus: true
          };
        } else {
          var newIndex = _this.getNewActiveOptionIndex({
            activeOptionIndex: prevState.activeSelectedOptionIndex,
            offset: offsets[direction],
            options: _this.props.selection
          });

          newState = {
            activeSelectedOption: _this.props.selection[newIndex],
            activeSelectedOptionIndex: newIndex,
            listboxHasFocus: true
          };
        }

        return newState;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpen", function (event, data) {
      var isOpen = _this.getIsOpen();

      if (!isOpen) {
        if (currentOpenDropdown && (0, _lodash6.default)(currentOpenDropdown.handleClose)) {
          currentOpenDropdown.handleClose();
        }
      } else {
        currentOpenDropdown = _assertThisInitialized(_this);

        _this.setState({
          isOpen: true
        });

        if (_this.props.events.onOpen) {
          _this.props.events.onOpen(event, data);
        }

        if (_this.props.variant === 'readonly') {
          var activeOptionIndex = (0, _lodash5.default)(_this.getOptions(), function (item) {
            return (0, _lodash4.default)(item, _this.props.selection[0]);
          });

          _this.setState({
            activeOptionIndex: activeOptionIndex,
            activeOption: _this.props.selection[0]
          });

          if (_this.menuRef !== null) {
            (0, _menuItemSelectScroll.default)({
              container: _this.menuRef,
              focusedIndex: activeOptionIndex
            });
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePillFocus", function (event, _ref6) {
      var option = _ref6.option,
          index = _ref6.index;

      if (!_this.state.listboxHasFocus) {
        _this.setState({
          activeSelectedOption: option,
          activeSelectedOptionIndex: index,
          listboxHasFocus: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemoveSelectedOption", function (event, _ref7) {
      var option = _ref7.option,
          index = _ref7.index;
      event.preventDefault();
      var onlyOnePillAndInputExists = _this.props.selection.length === 1;
      var isReadOnlyAndTwoPillsExists = _this.props.selection.length === 2 && _this.props.variant === 'readonly' && _this.props.multiple;
      var lastPillWasRemoved = index + 1 === _this.props.selection.length;

      if ((onlyOnePillAndInputExists || isReadOnlyAndTwoPillsExists) && _this.inputRef) {
        _this.inputRef.focus();
      } else if (lastPillWasRemoved) {
        // set focus to previous option and index
        _this.setState({
          activeSelectedOption: _this.props.selection[index - 1],
          activeSelectedOptionIndex: index - 1,
          listboxHasFocus: true
        });
      } else {
        // set focus to next option, but same index
        _this.setState({
          activeSelectedOption: _this.props.selection[index + 1],
          activeSelectedOptionIndex: index,
          listboxHasFocus: true
        });
      }

      if (_this.props.events.onRequestRemoveSelectedOption) {
        _this.props.events.onRequestRemoveSelectedOption(event, {
          selection: (0, _lodash3.default)(_this.props.selection, option)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRequestClose", function (event, data) {
      if (_this.props.events.onRequestClose) {
        _this.props.events.onRequestClose(event, data);
      }

      if (_this.getIsOpen()) {
        _this.handleClose(event, {
          trigger: 'cancel'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRequestFocusSelectedListbox", function (event, _ref8) {
      var ref = _ref8.ref;

      if (ref) {
        _this.activeSelectedOptionRef = ref;

        _this.activeSelectedOptionRef.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (event, _ref9) {
      var selection = _ref9.selection,
          option = _ref9.option;
      var newSelection;

      var isSelected = _this.isSelected({
        selection: selection,
        option: option
      });

      var singleSelectAndSelectedWasNotClicked = !_this.props.multiple && !isSelected;
      var multiSelectAndSelectedWasNotClicked = _this.props.multiple && !isSelected;
      var deselectWasClicked = option.id === _this.deselectId;

      if (deselectWasClicked) {
        newSelection = [];
      } else if (singleSelectAndSelectedWasNotClicked) {
        newSelection = [option];
      } else if (multiSelectAndSelectedWasNotClicked) {
        newSelection = [].concat(_toConsumableArray(_this.props.selection), [option]);
      } else {
        newSelection = (0, _lodash3.default)(_this.props.selection, option);
      }

      if (_this.props.events.onSelect) {
        _this.props.events.onSelect(event, {
          selection: newSelection
        });
      }

      _this.handleClose(); // if (this.inputRef) {
      // 	this.inputRef.focus();
      // }

    });

    _defineProperty(_assertThisInitialized(_this), "isSelected", function (_ref10) {
      var selection = _ref10.selection,
          option = _ref10.option;
      return !!(0, _lodash2.default)(selection, option);
    });

    _defineProperty(_assertThisInitialized(_this), "openDialog", function () {
      if (_this.props.events.onRequestOpen) {
        _this.props.events.onRequestOpen();
      } else {
        _this.setState({
          isOpen: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "requestOpenMenu", function () {
      var isInlineSingleSelectionAndIsNotSelected = !_this.props.multiple && _this.props.selection.length === 0 && _this.props.variant === 'inline-listbox';

      if (isInlineSingleSelectionAndIsNotSelected || _this.props.multiple || _this.props.variant === 'readonly') {
        _this.openDialog();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderBase", function (_ref11) {
      var assistiveText = _ref11.assistiveText,
          labels = _ref11.labels,
          props = _ref11.props,
          userDefinedProps = _ref11.userDefinedProps;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-combobox_container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
          'slds-is-open': _this.getIsOpen()
        }, {
          'slds-has-error': props.errorText
        }, props.className) // Not in ARIA 1.2 spec, temporary for SLDS styles
        ,
        role: "combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
        ,
        "aria-expanded": _this.getIsOpen(),
        "aria-haspopup": "listbox" // eslint-disable-line jsx-a11y/aria-proptypes
        // used on menu's listbox
        ,
        "aria-owns": _this.getIsOpen() ? "".concat(_this.getId(), "-listbox") : undefined // eslint-disable-line jsx-a11y/aria-proptypes

      }, /*#__PURE__*/_react.default.createElement(_innerInput.default, _extends({
        "aria-autocomplete": "list",
        "aria-controls": _this.getIsOpen() ? "".concat(_this.getId(), "-listbox") : undefined,
        "aria-activedescendant": _this.state.activeOption ? "".concat(_this.getId(), "-listbox-option-").concat(_this.state.activeOption.id) : null,
        "aria-describedby": _this.getErrorId(),
        autoComplete: "off",
        className: "slds-combobox__input",
        containerProps: {
          className: 'slds-combobox__form-element',
          role: 'none'
        },
        hasSpinner: _this.props.hasInputSpinner,
        iconRight: /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
          category: "utility",
          name: "search",
          title: labels.inputIconTitle
        }),
        id: _this.getId(),
        onFocus: _this.handleInputFocus,
        onBlur: _this.handleInputBlur,
        onKeyDown: _this.handleKeyDown,
        inputRef: _this.setInputRef,
        onClick: function onClick() {
          _this.openDialog();
        },
        onChange: _this.handleInputChange,
        placeholder: labels.placeholder,
        defaultValue: props.defaultValue,
        readOnly: !!(props.predefinedOptionsOnly && _this.state.activeOption),
        required: props.required,
        role: "textbox",
        value: props.predefinedOptionsOnly ? _this.state.activeOption && _this.state.activeOption.label || props.value : props.value
      }, userDefinedProps.input)), _this.getDialog({
        menuRenderer: _this.renderMenu({
          assistiveText: assistiveText,
          labels: labels
        })
      }))), /*#__PURE__*/_react.default.createElement(_selectedListbox.default, {
        activeOption: _this.state.activeSelectedOption,
        activeOptionIndex: _this.state.activeSelectedOptionIndex,
        assistiveText: assistiveText,
        events: {
          onBlurPill: _this.handleBlurPill,
          onPillFocus: _this.handlePillFocus,
          onRequestFocus: _this.handleRequestFocusSelectedListbox,
          onRequestFocusOnNextPill: _this.handleNavigateSelectedListbox,
          onRequestFocusOnPreviousPill: _this.handleNavigateSelectedListbox,
          onRequestRemove: _this.handleRemoveSelectedOption
        },
        id: "".concat(_this.getId(), "-selected-listbox"),
        labels: labels,
        selectedListboxRef: _this.setSelectedListboxRef,
        selection: props.selection,
        listboxHasFocus: _this.state.listboxHasFocus
      }), props.errorText && /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-has-error"
      }, /*#__PURE__*/_react.default.createElement("div", {
        id: _this.getErrorId(),
        className: "slds-form-element__help slds-has-error"
      }, props.errorText)));
    });

    _defineProperty(_assertThisInitialized(_this), "renderInlineMultiple", function (_ref12) {
      var assistiveText = _ref12.assistiveText,
          labels = _ref12.labels,
          props = _ref12.props,
          userDefinedProps = _ref12.userDefinedProps;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-combobox_container', {
          'slds-has-inline-listbox': props.selection.length
        })
      }, props.selection.length ? /*#__PURE__*/_react.default.createElement(_selectedListbox.default, {
        activeOption: _this.state.activeSelectedOption,
        activeOptionIndex: _this.state.activeSelectedOptionIndex,
        assistiveText: assistiveText,
        containerRole: "listbox",
        containerAriaOrientation: "horizontal",
        listboxRole: "group",
        listboxAriaOrientation: null,
        events: {
          onBlurPill: _this.handleBlurPill,
          onPillFocus: _this.handlePillFocus,
          onRequestFocus: _this.handleRequestFocusSelectedListbox,
          onRequestFocusOnNextPill: _this.handleNavigateSelectedListbox,
          onRequestFocusOnPreviousPill: _this.handleNavigateSelectedListbox,
          onRequestRemove: _this.handleRemoveSelectedOption
        },
        id: "".concat(_this.getId(), "-selected-listbox"),
        labels: labels,
        selectedListboxRef: _this.setSelectedListboxRef,
        selection: props.selection,
        listboxHasFocus: _this.state.listboxHasFocus
      }) : null, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
          'slds-is-open': _this.getIsOpen()
        }, {
          'slds-has-error': props.errorText
        }, props.className) // Not in ARIA 1.2 spec, temporary for SLDS styles
        ,
        role: "combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
        ,
        "aria-expanded": _this.getIsOpen(),
        "aria-haspopup": "listbox" // eslint-disable-line jsx-a11y/aria-proptypes

      }, /*#__PURE__*/_react.default.createElement(_innerInput.default, _extends({
        "aria-autocomplete": "list",
        "aria-controls": _this.getIsOpen() ? "".concat(_this.getId(), "-listbox") : undefined,
        "aria-activedescendant": _this.state.activeOption ? "".concat(_this.getId(), "-listbox-option-").concat(_this.state.activeOption.id) : null,
        "aria-describedby": _this.getErrorId(),
        defaultValue: props.defaultValue,
        autoComplete: "off",
        className: "slds-combobox__input",
        containerProps: {
          className: 'slds-combobox__form-element',
          role: 'none'
        },
        hasSpinner: _this.props.hasInputSpinner,
        iconRight: /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
          category: "utility",
          name: "search",
          title: labels.inputIconTitle
        }),
        id: _this.getId(),
        onFocus: _this.handleInputFocus,
        onBlur: _this.handleInputBlur,
        onKeyDown: _this.handleKeyDown,
        inputRef: _this.setInputRef,
        onClick: function onClick() {
          _this.openDialog();
        },
        onChange: _this.handleInputChange,
        placeholder: labels.placeholder,
        readOnly: !!(props.predefinedOptionsOnly && _this.state.activeOption),
        required: props.required,
        role: "textbox",
        value: props.predefinedOptionsOnly ? _this.state.activeOption && _this.state.activeOption.label || props.value : props.value
      }, userDefinedProps.input)), _this.getDialog({
        menuRenderer: _this.renderMenu({
          assistiveText: assistiveText,
          labels: labels
        })
      }), props.errorText && /*#__PURE__*/_react.default.createElement("div", {
        id: _this.getErrorId(),
        className: "slds-form-element__help"
      }, props.errorText))));
    });

    _defineProperty(_assertThisInitialized(_this), "renderInlineSingle", function (_ref13) {
      var assistiveText = _ref13.assistiveText,
          labels = _ref13.labels,
          props = _ref13.props,
          userDefinedProps = _ref13.userDefinedProps;
      var iconLeft = props.selection[0] && props.selection[0].icon ? /*#__PURE__*/_react.default.cloneElement(props.selection[0].icon, {
        containerClassName: 'slds-combobox__input-entity-icon'
      }) : null;
      var value = props.selection[0] && props.selection[0].label ? props.selection[0].label : props.value;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-combobox_container', {
          'slds-has-inline-listbox': props.selection.length
        })
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
          'slds-is-open': _this.getIsOpen()
        }, {
          'slds-has-error': props.errorText
        }, props.className) // Not in ARIA 1.2 spec, temporary for SLDS styles
        ,
        role: "combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
        ,
        "aria-expanded": _this.getIsOpen(),
        "aria-haspopup": "listbox" // eslint-disable-line jsx-a11y/aria-proptypes

      }, /*#__PURE__*/_react.default.createElement(_innerInput.default, _extends({
        defaultValue: props.defaultValue,
        "aria-autocomplete": "list",
        "aria-controls": _this.getIsOpen() ? "".concat(_this.getId(), "-listbox") : undefined,
        "aria-activedescendant": _this.state.activeOption ? "".concat(_this.getId(), "-listbox-option-").concat(_this.state.activeOption.id) : null,
        "aria-describedby": _this.getErrorId(),
        autoComplete: "off",
        className: "slds-combobox__input",
        containerProps: {
          className: 'slds-combobox__form-element',
          role: 'none'
        },
        disabled: _this.props.singleInputDisabled,
        hasSpinner: _this.props.hasInputSpinner,
        iconRight: props.selection.length ? /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
          assistiveText: {
            icon: assistiveText.removeSingleSelectedOption
          },
          buttonRef: function buttonRef(component) {
            _this.buttonRef = component;
          },
          category: "utility",
          iconPosition: "right",
          name: "close",
          onClick: function onClick(event) {
            _this.handleRemoveSelectedOption(event, {
              option: props.selection[0]
            });
          }
        }) : /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
          category: "utility",
          name: "search"
        }),
        iconLeft: iconLeft,
        id: _this.getId(),
        onFocus: _this.handleInputFocus,
        onBlur: _this.handleInputBlur,
        onKeyDown: _this.handleKeyDown,
        inputRef: _this.setInputRef,
        onClick: function onClick() {
          _this.requestOpenMenu();
        },
        onChange: function onChange(event) {
          if (!props.selection.length) {
            _this.handleInputChange(event);
          }
        },
        placeholder: labels.placeholder,
        readOnly: !!(props.predefinedOptionsOnly && _this.state.activeOption) || !!props.selection.length,
        required: props.required,
        role: "textbox",
        value: props.predefinedOptionsOnly ? _this.state.activeOption && _this.state.activeOption.label || props.value : value
      }, userDefinedProps.input)), _this.getDialog({
        menuRenderer: _this.renderMenu({
          assistiveText: assistiveText,
          labels: labels
        })
      }), props.errorText && /*#__PURE__*/_react.default.createElement("div", {
        id: _this.getErrorId(),
        className: "slds-form-element__help"
      }, props.errorText))));
    });

    _defineProperty(_assertThisInitialized(_this), "renderMenu", function (_ref14) {
      var assistiveText = _ref14.assistiveText,
          labels = _ref14.labels;
      var menuVariant = {
        base: 'icon-title-subtitle',
        'inline-listbox': 'icon-title-subtitle',
        readonly: 'checkbox'
      };
      var readonlyItemVisibleLength = _this.props.variant === 'readonly' ? 5 : null;
      return /*#__PURE__*/_react.default.createElement(_menu.default, {
        assistiveText: assistiveText,
        activeOption: _this.state.activeOption,
        activeOptionIndex: _this.state.activeOptionIndex,
        classNameMenu: _this.props.classNameMenu,
        classNameMenuSubHeader: _this.props.classNameMenuSubHeader,
        clearActiveOption: _this.clearActiveOption,
        deselectId: _this.deselectId,
        inheritWidthOf: _this.props.inheritWidthOf,
        inputId: _this.getId(),
        inputValue: _this.props.value,
        isSelected: _this.isSelected,
        itemVisibleLength: _this.props.menuItemVisibleLength || readonlyItemVisibleLength,
        labels: labels,
        hasMenuSpinner: _this.props.hasMenuSpinner,
        hasDeselect: _this.props.hasDeselect,
        menuItem: _this.props.menuItem,
        menuPosition: _this.props.menuPosition,
        menuRef: function menuRef(ref) {
          _this.menuRef = ref;
        },
        maxWidth: _this.props.menuMaxWidth,
        options: _this.getOptions(),
        optionsAddItem: _this.props.optionsAddItem,
        optionsSearchEntity: _this.props.optionsSearchEntity,
        onSelect: _this.handleSelect // For backward compatibility, 'menuItem' prop will be deprecated soon
        ,
        onRenderMenuItem: _this.props.onRenderMenuItem ? _this.props.onRenderMenuItem : _this.props.menuItem,
        selection: _this.props.selection,
        tooltipMenuItemDisabled: _this.props.tooltipMenuItemDisabled,
        variant: menuVariant[_this.props.variant]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderPopover", function (_ref15) {
      var assistiveText = _ref15.assistiveText,
          labels = _ref15.labels,
          props = _ref15.props;

      var popoverProps = _this.getCustomPopoverProps(_this.props.popover.props.body, {
        assistiveText: assistiveText,
        labels: labels
      });

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-combobox_container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
          'slds-is-open': _this.getIsOpen()
        }, {
          'slds-has-error': props.errorText
        }, props.className) // Not in ARIA 1.2 spec, temporary for SLDS styles
        ,
        role: "combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
        ,
        "aria-expanded": _this.getIsOpen(),
        "aria-haspopup": "dialog" // eslint-disable-line jsx-a11y/aria-proptypes

      }, /*#__PURE__*/_react.default.createElement(_popover.default, popoverProps, /*#__PURE__*/_react.default.createElement(_innerInput.default, {
        "aria-autocomplete": "none",
        "aria-controls": _this.getIsOpen() ? "".concat(_this.getId(), "-popover") : undefined,
        "aria-describedby": _this.getErrorId(),
        autoComplete: "off",
        className: "slds-combobox__input",
        containerProps: {
          className: 'slds-combobox__form-element',
          role: 'none'
        },
        iconRight: /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
          category: "utility",
          name: "down",
          variant: "combobox"
        }),
        id: _this.getId(),
        onFocus: _this.handleInputFocus,
        onBlur: _this.handleInputBlur,
        onKeyDown: _this.handleKeyDown,
        inputRef: _this.setInputRef,
        onClick: function onClick() {
          _this.openDialog();
        },
        onChange: _this.handleInputChange,
        placeholder: labels.placeholder,
        readOnly: true,
        required: props.required,
        role: "textbox",
        value: props.value
      })))), props.errorText && /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-has-error"
      }, /*#__PURE__*/_react.default.createElement("div", {
        id: _this.getErrorId(),
        className: "slds-form-element__help slds-has-error"
      }, props.errorText)));
    });

    _defineProperty(_assertThisInitialized(_this), "renderReadOnlyMultiple", function (_ref16) {
      var assistiveText = _ref16.assistiveText,
          labels = _ref16.labels,
          props = _ref16.props,
          userDefinedProps = _ref16.userDefinedProps;
      var value = props.selection.length > 1 ? labels.multipleOptionsSelected || "".concat(props.selection.length, " options selected") : props.selection[0] && props.selection[0].label || '';
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-combobox_container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
          'slds-is-open': _this.getIsOpen()
        }, {
          'slds-has-error': props.errorText
        }, props.className) // Not in ARIA 1.2 spec, temporary for SLDS styles
        ,
        role: "combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
        ,
        "aria-expanded": _this.getIsOpen(),
        "aria-haspopup": "listbox" // eslint-disable-line jsx-a11y/aria-proptypes

      }, /*#__PURE__*/_react.default.createElement(_innerInput.default, _extends({
        defaultValue: props.defaultValue,
        "aria-autocomplete": "list",
        "aria-controls": _this.getIsOpen() ? "".concat(_this.getId(), "-listbox") : undefined,
        "aria-activedescendant": _this.state.activeOption ? "".concat(_this.getId(), "-listbox-option-").concat(_this.state.activeOption.id) : null,
        "aria-describedby": _this.getErrorId(),
        autoComplete: "off",
        className: "slds-combobox__input",
        containerProps: {
          className: 'slds-combobox__form-element',
          role: 'none'
        },
        iconRight: /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
          category: "utility",
          name: "down",
          variant: "combobox"
        }),
        id: _this.getId(),
        onFocus: _this.handleInputFocus,
        onBlur: _this.handleInputBlur,
        onKeyDown: _this.handleKeyDown,
        inputRef: _this.setInputRef,
        onClick: function onClick() {
          _this.requestOpenMenu();
        },
        onChange: function onChange(event) {
          if (!props.selection.length) {
            _this.handleInputChange(event);
          }
        },
        placeholder: labels.placeholderReadOnly,
        readOnly: true,
        required: props.required,
        role: "textbox",
        value: value
      }, userDefinedProps.input)), _this.getDialog({
        menuRenderer: _this.renderMenu({
          assistiveText: assistiveText,
          labels: labels
        })
      }))), /*#__PURE__*/_react.default.createElement(_selectedListbox.default, {
        activeOption: _this.state.activeSelectedOption,
        activeOptionIndex: _this.state.activeSelectedOptionIndex,
        assistiveText: assistiveText,
        events: {
          onBlurPill: _this.handleBlurPill,
          onPillFocus: _this.handlePillFocus,
          onRequestFocus: _this.handleRequestFocusSelectedListbox,
          onRequestFocusOnNextPill: _this.handleNavigateSelectedListbox,
          onRequestFocusOnPreviousPill: _this.handleNavigateSelectedListbox,
          onRequestRemove: _this.handleRemoveSelectedOption
        },
        id: "".concat(_this.getId(), "-selected-listbox"),
        labels: labels,
        selectedListboxRef: _this.setSelectedListboxRef,
        selection: props.selection,
        listboxHasFocus: _this.state.listboxHasFocus,
        variant: _this.props.variant,
        renderAtSelectionLength: 2
      }), props.errorText && /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-has-error"
      }, /*#__PURE__*/_react.default.createElement("div", {
        id: _this.getErrorId(),
        className: "slds-form-element__help slds-has-error"
      }, props.errorText)));
    });

    _defineProperty(_assertThisInitialized(_this), "renderReadOnlySingle", function (_ref17) {
      var assistiveText = _ref17.assistiveText,
          labels = _ref17.labels,
          props = _ref17.props,
          userDefinedProps = _ref17.userDefinedProps;
      var activeOptionLabel = _this.state.activeOption && _this.state.activeOption.label;
      var selectedOptionLabel = props.selection[0] && props.selection[0].label;
      var inputValue = activeOptionLabel || selectedOptionLabel || '';

      if (props.selection[0] && props.selection[0].value === '') {
        inputValue = '';
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-combobox_container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        // aria attributes have been moved to the `div` wrapping `input` to comply with ARIA 1.1.
        className: (0, _classnames.default)('slds-combobox', 'slds-dropdown-trigger', 'slds-dropdown-trigger_click', 'ignore-react-onclickoutside', {
          'slds-is-open': _this.getIsOpen()
        }, {
          'slds-has-error': props.errorText
        }, props.className) // Not in ARIA 1.2 spec, temporary for SLDS styles
        ,
        role: "combobox" // eslint-disable-line jsx-a11y/role-supports-aria-props, jsx-a11y/role-has-required-aria-props
        ,
        "aria-expanded": _this.getIsOpen(),
        "aria-haspopup": "listbox" // eslint-disable-line jsx-a11y/aria-proptypes

      }, /*#__PURE__*/_react.default.createElement(_innerInput.default, _extends({
        defaultValue: props.defaultValue,
        "aria-autocomplete": "list",
        "aria-controls": _this.getIsOpen() ? "".concat(_this.getId(), "-listbox") : undefined,
        "aria-activedescendant": _this.state.activeOption ? "".concat(_this.getId(), "-listbox-option-").concat(_this.state.activeOption.id) : null,
        "aria-describedby": _this.getErrorId(),
        autoComplete: "off",
        className: "slds-combobox__input",
        containerProps: {
          className: 'slds-combobox__form-element',
          role: 'none'
        },
        disabled: _this.props.singleInputDisabled,
        iconRight: /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
          category: "utility",
          name: "down",
          variant: "combobox"
        }),
        id: _this.getId(),
        onFocus: _this.handleInputFocus,
        onBlur: _this.handleInputBlur,
        onKeyDown: _this.handleKeyDown,
        inputRef: _this.setInputRef,
        onClick: function onClick() {
          _this.requestOpenMenu();
        },
        onChange: function onChange(event) {
          if (!props.selection.length) {
            _this.handleInputChange(event);
          }
        },
        placeholder: labels.placeholderReadOnly,
        readOnly: true,
        required: props.required,
        role: "textbox",
        value: inputValue
      }, userDefinedProps.input)), _this.getDialog({
        menuRenderer: _this.renderMenu({
          assistiveText: assistiveText,
          labels: labels
        })
      }), props.errorText && /*#__PURE__*/_react.default.createElement("div", {
        id: _this.getErrorId(),
        className: "slds-form-element__help"
      }, props.errorText))));
    });

    _this.state = {
      activeOption: undefined,
      activeOptionIndex: -1,
      // seeding initial state with this.props.selection[0]
      activeSelectedOption: _this.props.selection && _this.props.selection[0] || undefined,
      activeSelectedOptionIndex: 0,
      listboxHasFocus: false,
      isOpen: typeof _props.isOpen === 'boolean' ? _props.isOpen : false
    };
    _this.menuKeyBuffer = new _keyBuffer.default();
    _this.menuRef = undefined;
    _this.selectedListboxRef = null; // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    (0, _checkProps.default)(_constants.COMBOBOX, _props, _component.default);
    _this.generatedId = _shortid.default.generate();
    _this.generatedErrorId = _shortid.default.generate();
    _this.deselectId = "".concat(_this.getId(), "-deselect");
    return _this;
  }
  /**
   * Lifecycle methods
   */


  _createClass(Combobox, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(nextProps) {
      var _this2 = this;

      // This logic will maintain the active highlight even when the
      // option order changes. One example would be the server pushes
      // data out as the user has the menu open. This logic clears
      // `activeOption` if the active option is no longer in the options
      // list. If it's in the options list, then find the new index and
      // set `activeOptionIndex`
      if (!(0, _lodash4.default)(this.getOptions(), this.getOptions(nextProps))) {
        var index = (0, _lodash5.default)(this.getOptions(nextProps), function (item) {
          return (0, _lodash4.default)(item, _this2.state.activeOption);
        });

        if (index !== -1) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            activeOptionIndex: index
          });
        } else {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            activeOption: undefined,
            activeOptionIndex: -1
          });
        }
      } else if (this.props.isOpen !== nextProps.isOpen) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          activeOption: undefined,
          activeOptionIndex: -1,
          isOpen: nextProps.isOpen
        });
      } // there may be issues with tabindex/focus if the app removes an item
      // from selection while the user is using the listbox


      var selectedOptionsRenderIsInitialRender = this.props.selection && this.props.selection.length === 0 && nextProps.selection.length > 0;

      if (selectedOptionsRenderIsInitialRender) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          activeSelectedOption: nextProps.selection[0],
          activeSelectedOptionIndex: 0
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (currentOpenDropdown === this) {
        currentOpenDropdown = undefined;
      }
    }
  }, {
    key: "getDialog",
    value: function getDialog(_ref18) {
      var menuRenderer = _ref18.menuRenderer;
      // FOR BACKWARDS COMPATIBILITY
      var menuPosition = this.props.isInline ? 'relative' : this.props.menuPosition; // eslint-disable-line react/prop-types

      return !this.props.disabled && this.getIsOpen() ? /*#__PURE__*/_react.default.createElement(_dialog.default, {
        align: "bottom left",
        context: this.context,
        hasStaticAlignment: this.props.hasStaticAlignment,
        inheritWidthOf: this.props.inheritWidthOf,
        onClose: this.handleClose,
        onMouseDown: function onMouseDown(event) {
          // prevent onBlur
          event.preventDefault();
        },
        onOpen: this.handleOpen,
        onRequestTargetElement: this.getTargetElement,
        position: menuPosition,
        containerProps: {
          id: "".concat(this.getId(), "-listbox"),
          role: 'listbox'
        }
      }, menuRenderer) : null;
    }
  }, {
    key: "getErrorId",
    value: function getErrorId() {
      return this.props['aria-describedby'] || this.props.errorText && this.generatedErrorId;
    }
    /**
     * Shared class property getter methods
     */

  }, {
    key: "render",
    value: function render() {
      var props = this.props; // Merge objects of strings with their default object

      var assistiveText = (0, _lodash.default)({}, defaultProps.assistiveText, props.assistiveText);
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      var hasRenderedLabel = labels.label || assistiveText && assistiveText.label; // declare user defined props

      var userDefinedProps = {};

      if (props.input) {
        // at the moment we only support overriding the input props
        userDefinedProps.input = props.input.props;
      }

      var subRenderParameters = {
        assistiveText: assistiveText,
        labels: labels,
        props: this.props,
        userDefinedProps: userDefinedProps
      };
      var multipleOrSingle = this.props.multiple ? 'multiple' : 'single';
      var subRenders = {
        base: {
          multiple: this.renderBase,
          // same
          single: this.renderBase
        },
        'inline-listbox': {
          multiple: this.renderInlineMultiple,
          single: this.renderInlineSingle
        },
        popover: {
          multiple: this.renderPopover,
          // same
          single: this.renderPopover
        },
        readonly: {
          multiple: this.renderReadOnlyMultiple,
          single: this.renderReadOnlySingle
        }
      };
      var variantExists = subRenders[this.props.variant][multipleOrSingle];

      var mainCombobox = /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element', props.classNameContainer)
      }, props.entityCombobox ? null : /*#__PURE__*/_react.default.createElement(_label.default, {
        assistiveText: this.props.assistiveText,
        htmlFor: this.getId(),
        label: labels.label,
        required: props.required
      }), this.props.fieldLevelHelpTooltip && hasRenderedLabel ? /*#__PURE__*/_react.default.createElement(_fieldLevelHelpTooltip.default, {
        fieldLevelHelpTooltip: this.props.fieldLevelHelpTooltip
      }) : null, variantExists ? subRenders[this.props.variant][multipleOrSingle](subRenderParameters) : subRenders.base.multiple(subRenderParameters));

      return props.entityCombobox ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element"
      }, /*#__PURE__*/_react.default.createElement(_label.default, {
        assistiveText: props.assistiveText,
        htmlFor: this.getId(),
        label: labels.label,
        required: props.required
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-combobox-group"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-combobox_object-switcher slds-combobox-addon_start"
      }, props.entityCombobox), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-combobox_container slds-combobox-addon_end"
      }, mainCombobox)))) : mainCombobox;
    }
  }]);

  return Combobox;
}(_react.default.Component);

Combobox.contextType = _iconSettings.IconSettingsContext;
Combobox.displayName = _constants.COMBOBOX;
Combobox.propTypes = propTypes;
Combobox.defaultProps = defaultProps;
var _default = Combobox;
exports.default = _default;