"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ListItem", {
  enumerable: true,
  get: function get() {
    return _item.default;
  }
});
Object.defineProperty(exports, "ListItemLabel", {
  enumerable: true,
  get: function get() {
    return _itemLabel.default;
  }
});
exports.DropdownNubbinPositions = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRequiredIf = _interopRequireDefault(require("react-required-if"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _lodash2 = _interopRequireDefault(require("lodash.isequal"));

var _shortid = _interopRequireDefault(require("shortid"));

var _dialog = _interopRequireDefault(require("../utilities/dialog"));

var _menuList = _interopRequireDefault(require("../utilities/menu-list"));

var _item = _interopRequireDefault(require("../utilities/menu-list/item"));

var _itemLabel = _interopRequireDefault(require("../utilities/menu-list/item-label"));

var _buttonTrigger = _interopRequireDefault(require("./button-trigger"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _keyBuffer = _interopRequireDefault(require("../../utilities/key-buffer"));

var _keyboardNavigate = _interopRequireDefault(require("../../utilities/keyboard-navigate"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _constants = require("../../utilities/constants");

var _iconSettings = require("../icon-settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var documentDefined = typeof document !== 'undefined'; // The overlay is an optional way to allow the dropdown to close on outside
// clicks even when those clicks are over areas that wouldn't normally fire
// click or touch events (for example, iframes). A single overlay is shared
// between all dropdowns in the app.

var overlay = documentDefined ? document.createElement('span') : {
  style: {}
};
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.position = 'absolute';
var currentOpenDropdown;
var DropdownNubbinPositions = ['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right']; // # Keyboard Navigable mixin

exports.DropdownNubbinPositions = DropdownNubbinPositions;

var noop = function noop() {};

var itemIsSelectable = function itemIsSelectable(item) {
  return item.type !== 'header' && item.type !== 'divider' && !item.disabled;
};

var getNavigableItems = function getNavigableItems(items) {
  var navigableItems = [];
  navigableItems.indexes = [];
  navigableItems.keyBuffer = new _keyBuffer.default();

  if (Array.isArray(items)) {
    items.forEach(function (item, index) {
      if (itemIsSelectable(item)) {
        // eslint-disable-next-line fp/no-mutating-methods
        navigableItems.push({
          index: index,
          text: "".concat(item.label).toLowerCase()
        }); // eslint-disable-next-line fp/no-mutating-methods

        navigableItems.indexes.push(index);
      }
    });
  }

  return navigableItems;
};

function getMenu(componentRef) {
  return _reactDom.default.findDOMNode(componentRef).querySelector('ul.dropdown__list'); // eslint-disable-line react/no-find-dom-node
}

function getMenuItem(menuItemId) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var menuItem;

  if (menuItemId) {
    menuItem = context.getElementById(menuItemId);
  }

  return menuItem;
}
/*
 * Dropdowns with nubbins have a different API from other Dialogs
 *
 * Dialog receives an alignment position and whether it has a nubbin. The nubbin position is inferred from the align.
 * Dropdowns have a nubbinPosition which dictates the align, but in an inverse fashion which then gets inversed back by the Dialog.
 *
 * Since Dialog is the future API and we don't want to break backwards compatability, we currently map to the Dialog api here. Even if Dialog will map it again.
 * TODO - deprecate nubbinPosition in favor for additional `align` values and a flag to show a nubbin.
 */


var DropdownToDialogNubbinMapping = {
  top: 'bottom',
  'top left': 'bottom left',
  'top right': 'bottom right',
  bottom: 'top',
  'bottom left': 'top left',
  'bottom right': 'top right'
};
var propTypes = {
  /**
   * Aligns the menu center, right, or left respective to the trigger. This is not intended for use with `nubbinPosition`.
   */
  align: _propTypes.default.oneOf(['center', 'left', 'right']),

  /**
   * This prop is passed onto the triggering `Button`. Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. You can omit this prop if you are using the `label` prop.
   */
  assistiveText: _propTypes.default.object,

  /**
   * CSS classes to be added to triggering button.
   */
  buttonClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
   */
  buttonInverse: _propTypes.default.bool,

  /**
   * This prop is passed onto the triggering `Button`. Determines variant of the Button component that triggers dropdown.
   */
  buttonVariant: _propTypes.default.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon']),

  /**
   * If true, renders checkmark icon on the selected Menu Item.
   */
  checkmark: _propTypes.default.bool,

  /**
   * If you need custom content _and_ a list, use a `<Popover>` instead.
   */
  children: _propTypes.default.node,

  /**
   * CSS classes to be added to dropdown menu.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * By default, these class names will be added to the absolutely-positioned `Dialog` component.
   */
  containerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
   */
  disabled: _propTypes.default.bool,

  /**
   * Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
   */
  hasStaticAlignment: _propTypes.default.bool,

  /**
   * This prop is passed onto the triggering `Button`. Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
   */
  hint: _propTypes.default.bool,

  /**
   * Delay on menu closing in milliseconds.
   */
  hoverCloseDelay: _propTypes.default.number,

  /**
   * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
   */
  iconCategory: (0, _reactRequiredIf.default)(_propTypes.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']), function (props) {
    return !!props.iconName;
  }),

  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: _propTypes.default.string,

  /**
   * If omitted, icon position is centered.
   */
  iconPosition: _propTypes.default.oneOf(['left', 'right']),

  /**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
  iconVariant: _propTypes.default.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),

  /**
   * Determines the size of the icon.
   */
  iconSize: _propTypes.default.oneOf(['x-small', 'small', 'medium', 'large']),

  /**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
   */
  id: _propTypes.default.string,

  /**
   * Adds inverse class to the dropdown
   */
  inverse: _propTypes.default.bool,

  /**
   * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
   */
  isOpen: _propTypes.default.bool,

  /**
   * This prop is passed onto the triggering `Button`. Text within the trigger button.
   */
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * Custom element that overrides the default Menu Item component.
   */
  listItemRenderer: _propTypes.default.func,

  /**
   * This prop is passed into the List for the menu. Pass null to make it the size of the content, or a string with an integer from here: https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height
   */
  length: _propTypes.default.oneOf([null, '5', '7', '10', 5, 7, 10]),

  /**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
  menuPosition: _propTypes.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),

  /**
   * Style applied to menu element (that is the `.slds-dropdown` element)
   */
  menuStyle: _propTypes.default.object,

  /**
   * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling (`iconVariant="container"`). Use with `isInline` prop, since positioning is determined by CSS via absolute-relative positioning, and using an absolutely positioned menu will not position the menu correctly without manual offsets.
   */
  nubbinPosition: _propTypes.default.oneOf(['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right']),

  /**
   * Called when the triggering button loses focus.
   */
  onBlur: _propTypes.default.func,

  /**
   * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
   */
  onClick: _propTypes.default.func,

  /**
   * Called when the triggering button gains focus.
   */
  onFocus: _propTypes.default.func,

  /**
   * Determines if mouse hover or click opens or closes the dropdown menu. The default of `click` opens the menu on click, touch, or keyboard navigation and is highly recommended to comply with accessibility standards. The other options are `hover` which opens when the mouse enters the focusable area, and `hybrid` which causes the menu to open on clicking of the trigger, but closes the menu when the mouse leaves the menu and trigger area. If you are planning on using `hover` or `hybrid`, please pause a moment and reconsider.
   */
  openOn: _propTypes.default.oneOf(['hover', 'click', 'hybrid']),

  /**
   * Called when a key pressed.
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Called when mouse clicks down on the trigger button.
   */
  onMouseDown: _propTypes.default.func,

  /**
   * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
  onMouseEnter: _propTypes.default.func,

  /**
   * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * Triggered when an item in the menu is clicked.
   */
  onSelect: _propTypes.default.func,

  /**
   * Triggered when the dropdown is opened.
   */
  onOpen: _propTypes.default.func,

  /**
   * Triggered when the dropdown is closed.
   */
  onClose: _propTypes.default.func,

  /**
   * An array of menu item objects. `className` and `id` object keys are applied to the `li` DOM node. `divider` key can have a value of `top` or `bottom`. `rightIcon` and `leftIcon` are not actually `Icon` components, but prop objects that get passed to an `Icon` component. The `href` key will be added to the `a` and its default click event will be prevented. Here is a sample:
   * ```
   * [{
   *   className: 'custom-li-class',
   *     divider: 'bottom',
   *     label: 'A Header',
   *     type: 'header'
   *  }, {
   *     href: 'http://sfdc.co/',
   *     id: 'custom-li-id',
   *     label: 'Has a value',
   *   leftIcon: {
   *    name: 'settings',
   *    category: 'utility'
   *   },
   *   rightIcon: {
   *    name: 'settings',
   *    category: 'utility'
   *   },
   *     type: 'item',
   *     value: 'B0'
   *  }, {
   *   tooltipContent: 'Displays a tooltip when hovered over with this content. The `tooltipMenuItem` prop must be set for this to work.',
   *   type: 'divider'
   * }]
   * ```
   */
  options: _propTypes.default.array,

  /**
   * An object of CSS styles that are applied to the triggering button.
   */
  style: _propTypes.default.object,

  /**
   * Write <code>"-1"</code> if you don't want the user to tab to the button.
   */
  tabIndex: _propTypes.default.string,

  /**
   * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
   */
  overlay: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),

  /**
   * Current selected menu item.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.array]),

  /**
   * This prop is passed onto the triggering `Button`. It creates a tooltip with the content of the `node` provided.
   */
  tooltip: _propTypes.default.node,

  /**
   * Accepts a `Tooltip` component to be used as the template for menu item tooltips that appear via the `tooltipContent` options object attribute. Must be present for `tooltipContent` to work
   */
  tooltipMenuItem: _propTypes.default.node,

  /**
   * CSS classes to be added to wrapping trigger `div` around the button.
   */
  triggerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Whether this dropdown supports multi select.
   */
  multiple: _propTypes.default.bool,

  /**
   *  To adjust the width of the menu dropdown
   */
  width: _propTypes.default.oneOf(['xx-small', 'x-small', 'small', 'medium', 'bottom', 'large'])
};
var defaultProps = {
  align: 'left',
  hoverCloseDelay: 300,
  length: '5',
  menuPosition: 'absolute',
  openOn: 'click',
  width: 'medium',
  inverse: false
};
/**
 * The MenuDropdown component is a variant of the Lightning Design System Menu component. This component
 * may require a polyfill such as [classList](https://github.com/yola/classlist-polyfill) due to
 * [react-onclickoutside](https://github.com/Pomax/react-onclickoutside) if Internet Explorer 11
 * support is needed.
 *
 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 */

var MenuDropdown = /*#__PURE__*/function (_React$Component) {
  _inherits(MenuDropdown, _React$Component);

  var _super = _createSuper(MenuDropdown);

  function MenuDropdown(props) {
    var _this;

    _classCallCheck(this, MenuDropdown);

    _this = _super.call(this, props); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getIsOpen", function () {
      return !!(typeof _this.props.isOpen === 'boolean' ? _this.props.isOpen : _this.state.isOpen);
    });

    _defineProperty(_assertThisInitialized(_this), "getIndexByValue", function (value, options) {
      var foundIndex = -1;

      if (options && options.length) {
        options.some(function (element, index) {
          if (element && element.value === value) {
            foundIndex = index;
            return true;
          }

          return false;
        });
      }

      return foundIndex;
    });

    _defineProperty(_assertThisInitialized(_this), "getValueByIndex", function (index) {
      return _this.props.options[index];
    });

    _defineProperty(_assertThisInitialized(_this), "getListItemRenderer", function () {
      return _this.props.listItemRenderer ? _this.props.listItemRenderer : _itemLabel.default;
    });

    _defineProperty(_assertThisInitialized(_this), "getListItemId", function (index) {
      var menuItemId;

      if (index !== undefined) {
        var menuId = (0, _lodash.default)(_this.getId) ? _this.getId() : _this.props.id;
        menuItemId = "".concat(menuId, "-item-").concat(index);
      }

      return menuItemId;
    });

    _defineProperty(_assertThisInitialized(_this), "setFocus", function () {
      if (!_this.isHover && !_this.isUnmounting && _this.trigger) {
        _reactDom.default.findDOMNode(_this.trigger).focus(); // eslint-disable-line react/no-find-dom-node

      }
    });

    _defineProperty(_assertThisInitialized(_this), "getMenu", function () {
      return _reactDom.default.findDOMNode(_this.list);
    });

    _defineProperty(_assertThisInitialized(_this), "getMenuItem", function (index) {
      if (index !== undefined && _this.listItems) {
        return _reactDom.default.findDOMNode(_this.listItems[index]); // eslint-disable-line react/no-find-dom-node
      }

      return undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "getCurrentSelectedIndices", function (nextProps) {
      if (_this.props.multiple === true) {
        var values = [];
        var currentIndices = [];

        if (!Array.isArray(nextProps.value)) {
          // eslint-disable-next-line fp/no-mutating-methods
          values.push(nextProps.value);
        } else {
          values = nextProps.value;
        }

        values = values.filter(function (value) {
          return _this.getIndexByValue(value, nextProps.options) !== -1;
        });
        currentIndices = values.map(function (value) {
          return _this.getIndexByValue(value, nextProps.options);
        });
        return {
          selectedIndices: currentIndices
        };
      }

      return {
        selectedIndex: _this.getIndexByValue(nextProps.value, nextProps.options)
      };
    });

    _defineProperty(_assertThisInitialized(_this), "saveRefToTrigger", function (trigger) {
      _this.trigger = trigger;

      if (!_this.state.triggerRendered) {
        _this.setState({
          triggerRendered: true
        });
      }

      if (trigger && _this.props.requestFocus && _this.props.onRequestFocus) {
        _this.props.onRequestFocus(trigger);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRefToTriggerContainer", function (triggerContainer) {
      _this.triggerContainer = triggerContainer;
      if (!_this.trigger) _this.trigger = triggerContainer;
    });

    _defineProperty(_assertThisInitialized(_this), "saveRefToList", function (list) {
      _this.list = list;
    });

    _defineProperty(_assertThisInitialized(_this), "saveRefToListItem", function (listItem, index) {
      if (!_this.listItems) {
        _this.listItems = {};
      }

      _this.listItems[index] = listItem;

      if (index === _this.state.focusedIndex) {
        _this.handleKeyboardFocus(_this.state.focusedIndex);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      var isOpen = _this.getIsOpen();

      if (isOpen) {
        if (currentOpenDropdown === _assertThisInitialized(_this)) {
          currentOpenDropdown = undefined;
        }

        _this.setState({
          isOpen: false
        });

        _this.isHover = false;

        if (_this.props.onClose) {
          _this.props.onClose();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpen", function () {
      var isOpen = _this.getIsOpen();

      if (!isOpen) {
        if (currentOpenDropdown && (0, _lodash.default)(currentOpenDropdown.handleClose)) {
          currentOpenDropdown.handleClose();
        }

        currentOpenDropdown = _assertThisInitialized(_this);

        _this.setState({
          isOpen: true
        });

        if (_this.props.onOpen) {
          _this.props.onOpen();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function (event) {
      var isOpen = _this.getIsOpen();

      _this.isHover = true;

      if (!isOpen && _this.props.openOn === 'hover') {
        _this.handleOpenForHover();
      } else {
        // we want this clear when openOn is hover or hybrid
        clearTimeout(_this.isClosing);
      }

      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function (event) {
      var isOpen = _this.getIsOpen();

      if (isOpen) {
        _this.isClosing = setTimeout(function () {
          _this.handleCloseForHover();
        }, _this.props.hoverCloseDelay);
      }

      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCloseForHover", function () {
      var isOpen = _this.getIsOpen();

      if (isOpen) {
        _this.handleClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpenForHover", function () {
      var isOpen = _this.getIsOpen();

      if (!isOpen) {
        _this.handleOpen();

        _this.setFocus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      var isOpen = _this.getIsOpen();

      if (!isOpen) {
        _this.handleOpen();

        _this.setFocus();
      } else {
        _this.handleClose();
      }

      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (event) {
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickCustomContent", function () {
      _this.setFocus();

      _this.handleClose();

      if (_this.props.onSelect) {
        _this.props.onSelect();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (index) {
      if (!_this.props.multiple) {
        _this.setState({
          selectedIndex: index
        });

        _this.handleClose();

        _this.setFocus();
      } else if (_this.props.multiple && _this.state.selectedIndices.indexOf(index) === -1) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        var currentIndices = _this.state.selectedIndices.concat(index);

        _this.setState({
          selectedIndices: currentIndices
        });
      } else if (_this.props.multiple) {
        var deselectIndex = _this.state.selectedIndices.indexOf(index); // eslint-disable-next-line react/no-access-state-in-setstate


        var currentSelected = _this.state.selectedIndices; // eslint-disable-next-line fp/no-mutating-methods

        currentSelected.splice(deselectIndex, 1);

        _this.setState({
          selectedIndices: currentSelected
        });
      }

      if (_this.props.onSelect) {
        var option = _this.getValueByIndex(index);

        _this.props.onSelect(option, {
          option: option,
          optionIndex: index
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      if (event.keyCode) {
        if (event.keyCode === _keyCode.default.TAB) {
          _this.handleCancel();
        } else if (event.keyCode === _keyCode.default.ENTER || event.keyCode === _keyCode.default.SPACE || event.keyCode === _keyCode.default.DOWN || event.keyCode === _keyCode.default.UP || event.keyCode === _keyCode.default.ESCAPE) {
          _event.default.trap(event);

          var isOpen = _this.getIsOpen();

          _this.handleKeyboardNavigate({
            event: event,
            isOpen: isOpen,
            key: event.key,
            keyCode: event.keyCode,
            onSelect: _this.handleSelect,
            target: event.target,
            toggleOpen: _this.toggleOpen
          });
        }

        if (_this.props.onKeyDown) {
          _this.props.onKeyDown(event);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.setFocus();

      _this.handleClose();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function () {
      _this.handleClose();
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardNavigate", function (_ref) {
      var event = _ref.event,
          _ref$isOpen = _ref.isOpen,
          isOpen = _ref$isOpen === void 0 ? true : _ref$isOpen,
          keyCode = _ref.keyCode,
          _ref$onFocus = _ref.onFocus,
          onFocus = _ref$onFocus === void 0 ? _this.handleKeyboardFocus : _ref$onFocus,
          onSelect = _ref.onSelect,
          target = _ref.target,
          _ref$toggleOpen = _ref.toggleOpen,
          toggleOpen = _ref$toggleOpen === void 0 ? noop : _ref$toggleOpen;
      (0, _keyboardNavigate.default)({
        componentContext: _assertThisInitialized(_this),
        currentFocusedIndex: _this.state.focusedIndex,
        event: event,
        isOpen: isOpen,
        keyCode: keyCode,
        navigableItems: _this.navigableItems,
        onFocus: onFocus,
        onSelect: onSelect,
        target: target,
        toggleOpen: toggleOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardFocus", function (focusedIndex) {
      if (_this.state.focusedIndex !== focusedIndex) {
        _this.setState({
          focusedIndex: focusedIndex
        });
      }

      var menu = (0, _lodash.default)(_this.getMenu) ? _this.getMenu() : getMenu(_assertThisInitialized(_this));
      var menuItem = (0, _lodash.default)(_this.getMenuItem) ? _this.getMenuItem(focusedIndex, menu) : getMenuItem(_this.getListItemId(focusedIndex));

      if (menuItem) {
        _this.focusMenuItem(menuItem);

        _this.scrollToMenuItem(menu, menuItem);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "focusMenuItem", function (menuItem) {
      menuItem.getElementsByTagName('a')[0].focus();
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToMenuItem", function (menu, menuItem) {
      if (menu && menuItem) {
        var menuHeight = menu.offsetHeight;
        var menuTop = menu.scrollTop;
        var menuItemTop = menuItem.offsetTop - menu.offsetTop;

        if (menuItemTop < menuTop) {
          // eslint-disable-next-line no-param-reassign
          menu.scrollTop = menuItemTop;
        } else {
          var menuBottom = menuTop + menuHeight + menu.offsetTop;
          var menuItemBottom = menuItemTop + menuItem.offsetHeight + menu.offsetTop;

          if (menuItemBottom > menuBottom) {
            // eslint-disable-next-line no-param-reassign
            menu.scrollTop = menuItemBottom - menuHeight - menu.offsetTop;
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleOpen", function () {
      var isOpen = _this.getIsOpen();

      _this.setFocus();

      if (isOpen) {
        _this.handleClose();
      } else {
        _this.handleOpen();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderDefaultMenuContent", function (customListProps) {
      return /*#__PURE__*/_react.default.createElement(_menuList.default, _extends({
        key: "".concat(_this.getId(), "-dropdown-list"),
        checkmark: _this.props.checkmark,
        getListItemId: _this.getListItemId,
        itemRefs: _this.saveRefToListItem,
        itemRenderer: _this.getListItemRenderer(),
        onCancel: _this.handleCancel,
        onSelect: _this.handleSelect,
        options: _this.props.options,
        ref: _this.saveRefToList,
        selectedIndex: !_this.props.multiple ? _this.state.selectedIndex : undefined,
        selectedIndices: _this.props.multiple ? _this.state.selectedIndices : undefined,
        tooltipMenuItem: _this.props.tooltipMenuItem,
        triggerId: _this.getId(),
        length: _this.props.length
      }, customListProps));
    });

    _defineProperty(_assertThisInitialized(_this), "renderMenuContent", function (customContent) {
      /**
       * Custom content for dropdown was a hack done in the past. If there's more than a listbox within a dropdown, then it should be a popover as explained for the `children` prop.
       *
       * This code block shows how things are done in the past:
       * ```
       * <Dropdown>
       *   <Trigger>
       *   <Button iconCategory="utility" iconName="settings" />
       *   </Trigger>
       *   <div>Look ma! This is Custom Content.</div>
       *   <List options={[myArray]}/>
       * </Dropdown>
       * ```
       */
      var customContentWithListPropInjection = []; // Dropdown can take a Trigger component as a child and then return it as the parent DOM element.

      _react.default.Children.forEach(customContent, function (child) {
        if (child && child.type.displayName === _constants.LIST) {
          // eslint-disable-next-line fp/no-mutating-methods
          customContentWithListPropInjection.push(_this.renderDefaultMenuContent(child.props));
        } else if (child) {
          var clonedCustomContent = /*#__PURE__*/_react.default.cloneElement(child, {
            onClick: _this.handleClickCustomContent,
            key: _shortid.default.generate()
          }); // eslint-disable-next-line fp/no-mutating-methods


          customContentWithListPropInjection.push(clonedCustomContent);
        }
      });

      if (customContentWithListPropInjection.length === 0) {
        customContentWithListPropInjection = null;
      }

      return customContentWithListPropInjection || _this.renderDefaultMenuContent();
    });

    _defineProperty(_assertThisInitialized(_this), "renderDialog", function (customContent, isOpen, outsideClickIgnoreClass) {
      var align = 'bottom';
      var hasNubbin = false;
      var positionClassName = '';

      if (_this.props.nubbinPosition) {
        hasNubbin = true;
        align = DropdownToDialogNubbinMapping[_this.props.nubbinPosition];
      } else if (_this.props.align) {
        align = _this.props.align === 'center' ? 'bottom' : "bottom ".concat(_this.props.align);
      }

      var positions = DropdownToDialogNubbinMapping[align].split(' ');
      positionClassName = (0, _classnames.default)(positions.map(function (position) {
        return "slds-dropdown_".concat(position);
      })); // FOR BACKWARDS COMPATIBILITY

      var menuPosition = _this.props.isInline ? 'relative' : _this.props.menuPosition; // eslint-disable-line react/prop-types

      var menuStylesBase = {};

      if (_this.props.align === 'center' && !hasNubbin) {
        menuStylesBase.transform = 'none';
      }

      return isOpen ? /*#__PURE__*/_react.default.createElement(_dialog.default, {
        align: align,
        className: (0, _classnames.default)(_this.props.containerClassName),
        closeOnTabKey: true,
        contentsClassName: (0, _classnames.default)('slds-dropdown', "slds-dropdown_".concat(_this.props.width), 'slds-text-align_left', 'ignore-react-onclickoutside', _this.props.className, positionClassName, {
          'slds-dropdown_inverse': _this.props.inverse
        }),
        context: _this.context,
        hasNubbin: hasNubbin,
        hasStaticAlignment: _this.props.hasStaticAlignment,
        inheritWidthOf: _this.props.inheritTargetWidth ? 'target' : 'none',
        offset: _this.props.offset,
        onClose: _this.handleClose,
        onKeyDown: _this.handleKeyDown,
        outsideClickIgnoreClass: outsideClickIgnoreClass,
        position: menuPosition,
        style: _objectSpread(_objectSpread({}, menuStylesBase), _this.props.menuStyle),
        onRequestTargetElement: function onRequestTargetElement() {
          return _this.trigger;
        }
      }, _this.renderMenuContent(customContent)) : null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderOverlay", function (isOpen) {
      if ((0, _lodash.default)(overlay) && documentDefined) {
        overlay(isOpen, overlay);
      } else if (_this.props.overlay && isOpen && !_this.overlay && documentDefined) {
        _this.overlay = overlay;
        document.querySelector('body').appendChild(_this.overlay);
      } else if (!isOpen && _this.overlay && _this.overlay.parentNode) {
        _this.overlay.parentNode.removeChild(_this.overlay);

        _this.overlay = undefined;
      }
    });

    (0, _checkProps.default)(_constants.MENU_DROPDOWN, props, _component.default);
    _this.generatedId = _shortid.default.generate();

    var currentSelectedIndices = _this.getCurrentSelectedIndices(props);

    _this.state = _objectSpread({
      focusedIndex: -1,
      selectedIndex: -1,
      selectedIndices: []
    }, currentSelectedIndices);
    _this.navigableItems = getNavigableItems(props.options);
    return _this;
  }

  _createClass(MenuDropdown, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        var nextState = this.getCurrentSelectedIndices(this.props); // eslint-disable-next-line react/no-did-update-set-state

        this.setState(nextState);
      }

      if (prevProps.isOpen !== this.props.isOpen) {
        this.setFocus();
      }

      if (!(0, _lodash2.default)(prevProps.options, this.props.options)) {
        this.navigableItems = getNavigableItems(this.props.options);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (currentOpenDropdown === this) {
        currentOpenDropdown = undefined;
      }

      this.isUnmounting = true;
      this.renderOverlay(false);
    }
  }, {
    key: "render",
    value: function render() {
      // Dropdowns are used by other components. The default trigger is a button, but some other components use `li` elements. The following allows `MenuDropdown` to be extended by providing a child component with the displayName of `DropdownTrigger`.
      var CurrentTrigger = _buttonTrigger.default;
      var CustomTriggerChildProps = {}; // Child elements that do not have the display name of the value of `MENU_DROPDOWN_TRIGGER` in `components/constants.js` will be considered custom content and rendered in the popover.

      var customContent = []; // Dropdown can take a Trigger component as a child and then return it as the parent DOM element.

      _react.default.Children.forEach(this.props.children, function (child) {
        if (child && child.type.displayName === _constants.MENU_DROPDOWN_TRIGGER) {
          // `CustomTriggerChildProps` is not used by the default button Trigger, but by other triggers
          CustomTriggerChildProps = child.props;
          CurrentTrigger = child.type;
        } else if (child) {
          // eslint-disable-next-line fp/no-mutating-methods
          customContent.push(child);
        }
      });

      if (customContent.length === 0) {
        customContent = null;
      }

      var outsideClickIgnoreClass = "ignore-click-".concat(this.getId());
      var isOpen = !this.props.disabled && this.getIsOpen() && !!this.trigger;
      this.renderOverlay(isOpen);
      /* Below are three sections of props:
       - The first are the props that may be given by the dropdown component. These may get deprecated in the future.
       - The next set of props (`CustomTriggerChildProps`) are props that can be overwritten by the end developer.
       - The final set are props that should not be overwritten, since they are ones that tie the trigger to the dropdown menu.
      */

      return /*#__PURE__*/_react.default.createElement(CurrentTrigger, _extends({
        "aria-haspopup": true,
        assistiveText: this.props.assistiveText,
        className: (0, _classnames.default)(outsideClickIgnoreClass, this.props.buttonClassName),
        disabled: this.props.disabled,
        hint: this.props.hint,
        iconCategory: this.props.iconCategory,
        iconName: this.props.iconName,
        iconPosition: this.props.iconPosition,
        iconSize: this.props.iconSize,
        iconVariant: this.props.iconVariant,
        id: this.getId(),
        inverse: this.props.buttonInverse,
        isOpen: isOpen,
        label: this.props.label,
        menu: this.renderDialog(customContent, isOpen, outsideClickIgnoreClass),
        onBlur: this.props.onBlur,
        onClick: this.props.openOn === 'click' || this.props.openOn === 'hybrid' ? this.handleClick : this.props.onClick,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onMouseDown: this.props.onMouseDown,
        onMouseEnter: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseEnter : null,
        onMouseLeave: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseLeave : null,
        openOn: this.props.openOn,
        ref: this.saveRefToTriggerContainer,
        style: this.props.style,
        tabIndex: this.props.tabIndex || (isOpen ? '-1' : '0'),
        tooltip: this.props.tooltip,
        triggerClassName: this.props.triggerClassName,
        triggerRef: this.saveRefToTrigger,
        variant: this.props.buttonVariant
      }, CustomTriggerChildProps));
    }
  }]);

  return MenuDropdown;
}(_react.default.Component);

_defineProperty(MenuDropdown, "displayName", _constants.MENU_DROPDOWN);

MenuDropdown.contextType = _iconSettings.IconSettingsContext;
MenuDropdown.propTypes = propTypes;
MenuDropdown.defaultProps = defaultProps;
var _default = MenuDropdown;
exports.default = _default;