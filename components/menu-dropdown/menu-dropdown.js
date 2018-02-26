'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DropdownNubbinPositions = exports.ListItemLabel = exports.ListItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Dropdown Component

// Implements the [Dropdown design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown) in React. Child elements that do not have the display name of the value of `MENU_DROPDOWN_TRIGGER` in `components/constants.js` will be considered custom content and rendered in the popover.
// Based on SLDS v2.1.0-rc.2

// ### React


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


// ### isBoolean


// ### isFunction


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// ### Children


// This is the the default Dropdown Trigger, which expects one button as a child.


// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)


// ### Traits

// #### KeyboardNavigable


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash3 = require('lodash.isboolean');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.isfunction');

var _lodash6 = _interopRequireDefault(_lodash5);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _dialog = require('../utilities/dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _menuList = require('../utilities/menu-list');

var _menuList2 = _interopRequireDefault(_menuList);

var _item = require('../utilities/menu-list/item');

var _item2 = _interopRequireDefault(_item);

var _itemLabel = require('../utilities/menu-list/item-label');

var _itemLabel2 = _interopRequireDefault(_itemLabel);

var _buttonTrigger = require('./button-trigger');

var _buttonTrigger2 = _interopRequireDefault(_buttonTrigger);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _keyboardNavigableMenu = require('../../utilities/keyboard-navigable-menu');

var _keyboardNavigableMenu2 = _interopRequireDefault(_keyboardNavigableMenu);

var _event = require('../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _keyCode = require('../../utilities/key-code');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documentDefined = typeof document !== 'undefined';

// The overlay is an optional way to allow the dropdown to close on outside
// clicks even when those clicks are over areas that wouldn't normally fire
// click or touch events (for example, iframes). A single overlay is shared
// between all dropdowns in the app.
var overlay = documentDefined ? document.createElement('span') : { style: {} };
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.position = 'absolute';

var currentOpenDropdown = void 0;

var DropdownNubbinPositions = ['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right'];

/**
 * The MenuDropdown component is a variant of the Lightning Design System Menu component. This component
 * may require a polyfill such as [classList](https://github.com/yola/classlist-polyfill) due to
 * [react-onclickoutside](https://github.com/Pomax/react-onclickoutside) if Internet Explorer 11
 * support is needed.
 *
 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 */
var MenuDropdown = (0, _createReactClass2.default)({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.MENU_DROPDOWN,

	// ### Prop Types
	propTypes: {
		/**
   * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
   */
		align: _propTypes2.default.oneOf(['left', 'right']),
		/**
   * This prop is passed onto the triggering `Button`. Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. You can omit this prop if you are using the `label` prop.
   */
		assistiveText: _propTypes2.default.string,
		/**
   * CSS classes to be added to triggering button.
   */
		buttonClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
   */
		buttonInverse: _propTypes2.default.bool,
		/**
   * This prop is passed onto the triggering `Button`. Determines variant of the Button component that triggers dropdown.
   */
		buttonVariant: _propTypes2.default.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon']),
		/**
   * If true, renders checkmark icon on the selected Menu Item.
   */
		checkmark: _propTypes2.default.bool,
		/**
   * By default, any children passed into this component will be rendered inside the dropdown menu. If you need custom content and a list, import 'design-system-react/components/menu-list/list' and pass in `<List>`.
   *
   * If you need to modify the trigger button, import the module `design-system-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the trigger button. Any `id` prop or event hanlders (`onBlur`, `onClick`, etc.) set on the button grandchild will be overwritten by `MenuDropdown` to enable functionality and accessibility. A custom trigger child will not be considered content for the dropdown menu.
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
		children: _propTypes2.default.node,
		/**
   * CSS classes to be added to dropdown menu.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * By default, these class names will be added to the absolutely-positioned `Dialog` component.
   */
		containerClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
   */
		disabled: _propTypes2.default.bool,
		/**
   * Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen.
   */
		hasStaticAlignment: _propTypes2.default.bool,
		/**
   * This prop is passed onto the triggering `Button`. Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
   */
		hint: _propTypes2.default.bool,
		/**
   * Delay on menu closing in milliseconds.
   */
		hoverCloseDelay: _propTypes2.default.number,
		/**
   * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
   */
		iconCategory: _propTypes2.default.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		/**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
		iconName: _propTypes2.default.string,
		/**
   * If omitted, icon position is centered.
   */
		iconPosition: _propTypes2.default.oneOf(['left', 'right']),
		/**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
		iconVariant: _propTypes2.default.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),
		/**
   * Determines the size of the icon.
   */
		iconSize: _propTypes2.default.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
   */
		id: _propTypes2.default.string,
		/**
   * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
   */
		isOpen: _propTypes2.default.bool,
		/**
   * This prop is passed onto the triggering `Button`. Text within the trigger button.
   */
		label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
		/**
   * Custom element that overrides the default Menu Item component.
   */
		listItemRenderer: _propTypes2.default.func,
		/**
   * This prop is passed into the List for the menu. Pass null to make it the size of the content, or a string with an integer from here: https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height
   */
		length: _propTypes2.default.oneOf([null, '5', '7', '10']),
		/**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
		menuPosition: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),
		/**
   * Style applied to menu element (that is the `.slds-dropdown` element)
   */
		menuStyle: _propTypes2.default.object,
		/**
   * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling (`iconVariant="container"`). Use with `isInline` prop, since positioning is determined by CSS via absolute-relative positioning, and using an absolutely positioned menu will not position the menu correctly without manual offsets.
   */
		nubbinPosition: _propTypes2.default.oneOf(['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right']),
		/**
   *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
   */
		offset: _propTypes2.default.string,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
   */
		onBlur: _propTypes2.default.func,
		/**
   * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
   */
		onClick: _propTypes2.default.func,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
   */
		onFocus: _propTypes2.default.func,
		/**
   * Determines if mouse hover or click opens or closes the dropdown menu. The default of `click` opens the menu on click, touch, or keyboard navigation and is highly recommended to comply with accessibility standards. The other options are `hover` which opens when the mouse enters the focusable area, and `hybrid` which causes the menu to open on clicking of the trigger, but closes the menu when the mouse leaves the menu and trigger area. If you are planning on using `hover` or `hybrid`, please pause a moment and reconsider.
   */
		openOn: _propTypes2.default.oneOf(['hover', 'click', 'hybrid']),
		/**
   * Called when a key pressed.
   */
		onKeyDown: _propTypes2.default.func,
		/**
   * Called when mouse clicks down on the trigger button.
   */
		onMouseDown: _propTypes2.default.func,
		/**
   * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseEnter: _propTypes2.default.func,
		/**
   * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseLeave: _propTypes2.default.func,
		/**
   * Triggered when an item in the menu is clicked.
   */
		onSelect: _propTypes2.default.func,
		/**
   * Triggered when the dropdown is opened.
   */
		onOpen: _propTypes2.default.func,
		/**
   * Triggered when the dropdown is closed.
   */
		onClose: _propTypes2.default.func,
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
   *   type: 'divider'
   * }]
   * ```
   */
		options: _propTypes2.default.array,
		/**
   * An object of CSS styles that are applied to the triggering button.
   */
		style: _propTypes2.default.object,
		/**
   * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
   */
		overlay: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
		/**
   * Current selected menu item.
   */
		value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.array]),
		/**
   * This prop is passed onto the triggering `Button`. It creates a tooltip with the content of the `node` provided.
   */
		tooltip: _propTypes2.default.node,
		/**
   * CSS classes to be added to wrapping trigger `div` around the button.
   */
		triggerClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Whether this dropdown supports multi select.
   */
		multiple: _propTypes2.default.bool
	},

	mixins: [_keyboardNavigableMenu2.default],

	getDefaultProps: function getDefaultProps() {
		return {
			align: 'left',
			hoverCloseDelay: 300,
			menuPosition: 'absolute',
			openOn: 'click'
		};
	},
	getInitialState: function getInitialState() {
		return {
			focusedIndex: -1,
			selectedIndex: -1,
			selectedIndices: []
		};
	},
	componentWillMount: function componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		(0, _checkProps2.default)(_constants.MENU_DROPDOWN, this.props);

		this.generatedId = _shortid2.default.generate();

		this.setCurrentSelectedIndices(this.props);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps, prevProps) {
		if (prevProps.value !== nextProps.value) {
			this.setCurrentSelectedIndices(nextProps);
		}

		if (prevProps.isOpen !== nextProps.isOpen) {
			this.setFocus();
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		if (currentOpenDropdown === this) {
			currentOpenDropdown = undefined;
		}
		this.isUnmounting = true;
		this.renderOverlay(false);
	},
	getId: function getId() {
		return this.props.id || this.generatedId;
	},
	getIsOpen: function getIsOpen() {
		return !!((0, _lodash4.default)(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);
	},
	getIndexByValue: function getIndexByValue(value) {
		var foundIndex = -1;

		if (this.props.options && this.props.options.length) {
			this.props.options.some(function (element, index) {
				if (element && element.value === value) {
					foundIndex = index;
					return true;
				}

				return false;
			});
		}

		return foundIndex;
	},
	getValueByIndex: function getValueByIndex(index) {
		return this.props.options[index];
	},
	getListItemRenderer: function getListItemRenderer() {
		return this.props.listItemRenderer ? this.props.listItemRenderer : _itemLabel2.default;
	},
	setFocus: function setFocus() {
		if (!this.isHover && !this.isUnmounting && this.trigger) {
			_reactDom2.default.findDOMNode(this.trigger).focus(); // eslint-disable-line react/no-find-dom-node
		}
	},
	getMenu: function getMenu() {
		return _reactDom2.default.findDOMNode(this.list); // eslint-disable-line react/no-find-dom-node
	},
	getMenuItem: function getMenuItem(index) {
		if (index !== undefined && this.listItems) {
			return _reactDom2.default.findDOMNode(this.listItems[index]); // eslint-disable-line react/no-find-dom-node
		}

		return undefined;
	},
	setCurrentSelectedIndices: function setCurrentSelectedIndices(nextProps) {
		var _this = this;

		if (this.props.multiple !== true) {
			this.setState({
				selectedIndex: this.getIndexByValue(nextProps.value)
			});
		} else {
			var values = [];
			var currentIndices = [];
			if (!Array.isArray(nextProps.value)) {
				values.push(nextProps.value);
			} else {
				values = nextProps.value;
			}
			values = values.filter(function (value) {
				return _this.getIndexByValue(value) !== -1;
			});
			currentIndices = values.map(function (value) {
				return _this.getIndexByValue(value);
			});

			this.setState({
				selectedIndices: currentIndices
			});
		}
	},


	// Trigger opens, closes, and recieves focus on close
	saveRefToTrigger: function saveRefToTrigger(trigger) {
		this.trigger = trigger;

		if (!this.state.triggerRendered) {
			this.setState({ triggerRendered: true });
		}
	},


	// TriggerContainer is the wrapping outer DOM element which may differ from the actual trigger which is most likely a `button`.
	saveRefToTriggerContainer: function saveRefToTriggerContainer(triggerContainer) {
		this.triggerContainer = triggerContainer;
		if (!this.trigger) this.trigger = triggerContainer;
	},
	saveRefToList: function saveRefToList(list) {
		this.list = list;
	},
	saveRefToListItem: function saveRefToListItem(listItem, index) {
		if (!this.listItems) {
			this.listItems = {};
		}

		this.listItems[index] = listItem;

		if (index === this.state.focusedIndex) {
			this.handleKeyboardFocus(this.state.focusedIndex);
		}
	},
	handleClose: function handleClose() {
		var isOpen = this.getIsOpen();

		if (isOpen) {
			if (currentOpenDropdown === this) {
				currentOpenDropdown = undefined;
			}

			this.setState({
				isOpen: false
			});

			this.isHover = false;

			if (this.props.onClose) {
				this.props.onClose();
			}
		}
	},
	handleOpen: function handleOpen() {
		var isOpen = this.getIsOpen();

		if (!isOpen) {
			if (currentOpenDropdown && (0, _lodash6.default)(currentOpenDropdown.handleClose)) {
				currentOpenDropdown.handleClose();
			}

			currentOpenDropdown = this;

			this.setState({
				isOpen: true
			});

			if (this.props.onOpen) {
				this.props.onOpen();
			}
		}
	},
	handleMouseEnter: function handleMouseEnter(event) {
		var isOpen = this.getIsOpen();

		this.isHover = true;

		if (!isOpen && this.props.openOn === 'hover') {
			this.handleOpen();
		} else {
			// we want this clear when openOn is hover or hybrid
			clearTimeout(this.isClosing);
		}

		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(event);
		}
	},
	handleMouseLeave: function handleMouseLeave(event) {
		var _this2 = this;

		var isOpen = this.getIsOpen();

		if (isOpen) {
			this.isClosing = setTimeout(function () {
				_this2.handleClose();
			}, this.props.hoverCloseDelay);
		}

		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(event);
		}
	},
	handleClick: function handleClick(event) {
		var isOpen = this.getIsOpen();

		if (!isOpen) {
			this.handleOpen();
			this.setFocus();
		} else {
			this.handleClose();
		}

		if (this.props.onClick) {
			this.props.onClick(event);
		}
	},
	handleFocus: function handleFocus(event) {
		var isOpen = this.getIsOpen();

		if (!isOpen) {
			this.handleOpen();
		}

		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	},
	handleClickCustomContent: function handleClickCustomContent() {
		this.setFocus();
		this.handleClose();

		if (this.props.onSelect) {
			this.props.onSelect();
		}
	},
	handleSelect: function handleSelect(index) {
		if (!this.props.multiple) {
			this.setState({ selectedIndex: index });
			this.handleClose();
			this.setFocus();
		} else if (this.props.multiple && this.state.selectedIndices.indexOf(index) === -1) {
			var currentIndices = this.state.selectedIndices.concat(index);
			this.setState({
				selectedIndices: currentIndices
			});
		} else if (this.props.multiple) {
			var deselectIndex = this.state.selectedIndices.indexOf(index);
			var currentSelected = this.state.selectedIndices;
			currentSelected.splice(deselectIndex, 1);
			this.setState({
				selectedIndices: currentSelected
			});
		}

		if (this.props.onSelect) {
			var option = this.getValueByIndex(index);
			this.props.onSelect(option, { option: option, optionIndex: index });
		}
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode) {
			if (event.keyCode === _keyCode2.default.ENTER || event.keyCode === _keyCode2.default.SPACE || event.keyCode === _keyCode2.default.DOWN || event.keyCode === _keyCode2.default.UP) {
				_event2.default.trap(event);
			}

			if (event.keyCode !== _keyCode2.default.TAB) {
				var isOpen = this.getIsOpen();

				this.handleKeyboardNavigate({
					event: event,
					isOpen: isOpen,
					key: event.key,
					keyCode: event.keyCode,
					onSelect: this.handleSelect,
					target: event.target,
					toggleOpen: this.toggleOpen
				});
			} else {
				this.handleCancel();
			}

			if (this.props.onKeyDown) {
				this.props.onKeyDown(event);
			}
		}
	},
	handleCancel: function handleCancel() {
		this.setFocus();
		this.handleClose();
	},
	handleClickOutside: function handleClickOutside() {
		this.handleClose();
	},
	toggleOpen: function toggleOpen() {
		var isOpen = this.getIsOpen();
		this.setFocus();

		if (isOpen) {
			this.handleClose();
		} else {
			this.handleOpen();
		}
	},
	renderDefaultMenuContent: function renderDefaultMenuContent(customListProps) {
		return _react2.default.createElement(_menuList2.default, _extends({
			key: this.getId() + '-dropdown-list',
			checkmark: this.props.checkmark,
			getListItemId: this.getListItemId,
			itemRefs: this.saveRefToListItem,
			itemRenderer: this.getListItemRenderer(),
			onCancel: this.handleCancel,
			onSelect: this.handleSelect,
			options: this.props.options,
			ref: this.saveRefToList,
			selectedIndex: !this.props.multiple ? this.state.selectedIndex : undefined,
			selectedIndices: this.props.multiple ? this.state.selectedIndices : undefined,
			triggerId: this.getId(),
			length: this.props.length
		}, customListProps));
	},
	renderMenuContent: function renderMenuContent(customContent) {
		var _this3 = this;

		var customContentWithListPropInjection = [];
		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		_react2.default.Children.forEach(customContent, function (child) {
			if (child && child.type.displayName === _constants.LIST) {
				customContentWithListPropInjection.push(_this3.renderDefaultMenuContent(child.props));
			} else if (child) {
				var clonedCustomContent = _react2.default.cloneElement(child, {
					onClick: _this3.handleClickCustomContent,
					key: _shortid2.default.generate()
				});
				customContentWithListPropInjection.push(clonedCustomContent);
			}
		});
		if (customContentWithListPropInjection.length === 0) {
			customContentWithListPropInjection = null;
		}

		return customContentWithListPropInjection || this.renderDefaultMenuContent();
	},
	renderInlineMenu: function renderInlineMenu(customContent, isOpen) {
		var positionClassName = void 0;

		if (this.props.nubbinPosition) {
			var positions = this.props.nubbinPosition.split(' ');
			positionClassName = (0, _classnames2.default)('slds-nubbin--' + positions.join('-'), positions.map(function (position) {
				return 'slds-dropdown--' + position;
			}));

			// TODO: allow nubbinPosition prop to set the offset automatically
			// if (this.props.nubbinPosition === 'top right') {
			// 	offset = '-12px -24px';
			// }
		} else if (this.props.align) {
			positionClassName = 'slds-dropdown--' + this.props.align;
		}

		return isOpen ? _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-dropdown', positionClassName, this.props.className),
				onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter : null,
				onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave : null,
				style: this.props.menuStyle
			},
			this.renderMenuContent(customContent)
		) : null;
	},
	renderDialog: function renderDialog(customContent, isOpen, outsideClickIgnoreClass) {
		var _this4 = this;

		var positionClassName = void 0;
		var marginTop = void 0;
		var offset = this.props.offset;

		if (this.props.nubbinPosition) {
			var positions = this.props.nubbinPosition.split(' ');
			positionClassName = (0, _classnames2.default)('slds-nubbin--' + positions.join('-'), positions.map(function (position) {
				return 'slds-dropdown--' + position;
			}));
			marginTop = 0;
			// TODO: allow nubbinPosition prop to set the offset automatically
			// if (this.props.nubbinPosition === 'top right') {
			// 	offset = '-12px -24px';
			// }
		} else if (this.props.align) {
			positionClassName = 'slds-dropdown--' + this.props.align;
		}

		// FOR BACKWARDS COMPATIBILITY
		var menuPosition = this.props.isInline ? 'relative' : this.props.menuPosition; // eslint-disable-line react/prop-types

		return isOpen ? _react2.default.createElement(
			_dialog2.default,
			{
				align: 'bottom ' + this.props.align,
				className: (0, _classnames2.default)(this.props.containerClassName),
				closeOnTabKey: true,
				contentsClassName: (0, _classnames2.default)('slds-dropdown', 'ignore-react-onclickoutside', positionClassName, this.props.className),
				context: this.context,
				hasStaticAlignment: this.props.hasStaticAlignment,
				inheritWidthOf: this.props.inheritTargetWidth ? 'target' : 'none',
				offset: offset,
				onClose: this.handleClose,
				onKeyDown: this.handleKeyDown,
				onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter : null,
				onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave : null,
				outsideClickIgnoreClass: outsideClickIgnoreClass,
				position: menuPosition,
				style: this.props.menuStyle || (0, _lodash2.default)({}, this.props.menuStyle, { marginTop: marginTop }),
				onRequestTargetElement: function onRequestTargetElement() {
					return _this4.trigger;
				}
			},
			this.renderMenuContent(customContent)
		) : null;
	},
	renderOverlay: function renderOverlay(isOpen) {
		if ((0, _lodash6.default)(overlay) && documentDefined) {
			overlay(isOpen, overlay);
		} else if (this.props.overlay && isOpen && !this.overlay && documentDefined) {
			this.overlay = overlay;
			document.querySelector('body').appendChild(this.overlay);
		} else if (!isOpen && this.overlay && this.overlay.parentNode) {
			this.overlay.parentNode.removeChild(this.overlay);
			this.overlay = undefined;
		}
	},
	render: function render() {
		// Dropdowns are used by other components. The default trigger is a button, but some other components use `li` elements. The following allows `MenuDropdown` to be extended by providing a child component with the displayName of `DropdownTrigger`.
		var CurrentTrigger = _buttonTrigger2.default;

		var CustomTriggerChildProps = {};

		// Child elements that do not have the display name of the value of `MENU_DROPDOWN_TRIGGER` in `components/constants.js` will be considered custom content and rendered in the popover.
		var customContent = [];

		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		_react2.default.Children.forEach(this.props.children, function (child) {
			if (child && child.type.displayName === _constants.MENU_DROPDOWN_TRIGGER) {
				// `CustomTriggerChildProps` is not used by the default button Trigger, but by other triggers
				CustomTriggerChildProps = child.props;
				CurrentTrigger = child.type;
			} else {
				customContent.push(child);
			}
		});

		if (customContent.length === 0) {
			customContent = null;
		}

		var outsideClickIgnoreClass = 'ignore-click-' + this.getId();
		var isOpen = !this.props.disabled && this.getIsOpen() && !!this.trigger;

		this.renderOverlay(isOpen);

		/* Below are three sections of props:
   - The first are the props that may be given by the dropdown component. These may get deprecated in the future.
   - The next set of props (`CustomTriggerChildProps`) are props that can be overwritten by the end developer.
   - The final set are props that should not be overwritten, since they are ones that tie the trigger to the dropdown menu.
  */

		return _react2.default.createElement(CurrentTrigger, _extends({
			'aria-haspopup': true,
			assistiveText: this.props.assistiveText,
			className: (0, _classnames2.default)(outsideClickIgnoreClass, this.props.buttonClassName),
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
			onFocus: this.props.openOn === 'hover' ? this.handleFocus : null,
			onKeyDown: this.handleKeyDown,
			onMouseDown: this.props.onMouseDown,
			onMouseEnter: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseEnter : null,
			onMouseLeave: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseLeave : null,
			openOn: this.props.openOn,
			ref: this.saveRefToTriggerContainer,
			style: this.props.style,
			tabIndex: isOpen ? '-1' : '0',
			tooltip: this.props.tooltip,
			triggerClassName: this.props.triggerClassName,
			triggerRef: this.saveRefToTrigger,
			variant: this.props.buttonVariant
		}, CustomTriggerChildProps));
	}
});

MenuDropdown.contextTypes = {
	iconPath: _propTypes2.default.string
};

exports.default = MenuDropdown;
exports.ListItem = _item2.default;
exports.ListItemLabel = _itemLabel2.default;
exports.DropdownNubbinPositions = DropdownNubbinPositions;