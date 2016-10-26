define(['module', 'react', 'react-dom', 'classnames', 'lodash.isboolean', 'lodash.isfunction', 'shortid', '../popover', '../menu-list/list', '../menu-list/list-item', '../menu-list/list-item-label', './button-trigger', './check-props', '../../utilities/keyboard-navigable', '../../utilities', '../../utilities/constants'], function (module, _react, _reactDom, _classnames, _lodash, _lodash3, _shortid, _popover, _list, _listItem, _listItemLabel, _buttonTrigger, _checkProps, _keyboardNavigable, _utilities, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash4 = _interopRequireDefault(_lodash3);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _popover2 = _interopRequireDefault(_popover);

	var _list2 = _interopRequireDefault(_list);

	var _listItem2 = _interopRequireDefault(_listItem);

	var _listItemLabel2 = _interopRequireDefault(_listItemLabel);

	var _buttonTrigger2 = _interopRequireDefault(_buttonTrigger);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _keyboardNavigable2 = _interopRequireDefault(_keyboardNavigable);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	// The overlay is an optional way to allow the dropdown to close on outside
	// clicks even when those clicks are over areas that wouldn't normally fire
	// click or touch events (for example, iframes). A single overlay is shared
	// between all dropdowns in the app.
	var overlay = document.createElement('span');
	overlay.style.top = 0;
	overlay.style.left = 0;
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.position = 'absolute';

	var currentOpenDropdown = void 0;

	var DropdownNubbinPositions = ['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right'];

	/**
  * The MenuDropdown component is a variant of the Lightning Design System Menu component.
  */
	var MenuDropdown = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.MENU_DROPDOWN,

		mixins: [_keyboardNavigable2.default],

		// ### Prop Types
		propTypes: {
			/**
    * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
    */
			align: _react.PropTypes.oneOf(['left', 'right']),
			/**
    * This prop is passed onto the triggering `Button`. Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. You can omit this prop if you are using the `label` prop.
    */
			assistiveText: _react.PropTypes.string,
			/**
    * CSS classes to be added to triggering button.
    */
			buttonClassName: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
			/**
    * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
    */
			buttonInverse: _react.PropTypes.bool,
			/**
    * This prop is passed onto the triggering `Button`. Determines variant of the Button component that triggers dropdown.
    */
			buttonVariant: _react.PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon']),
			/**
    * If true, renders checkmark icon on the selected Menu Item.
    */
			checkmark: _react.PropTypes.bool,
			/**
    * By default, any children passed into this component will be rendered inside the dropdown menu. If you need custom content and a list, import 'design-system-react/components/menu-list/list' and pass in `<List>`.
    *
    * If you need to modify the trigger button, import the module `design-system-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the trigger button. Any `id` prop or event hanlders (`onBlur`, `onClick`, etc.) set on the button grandchild will be overwritten by `MenuDropdown` to enable functionality and accessibility. A custom trigger child will not be considered content for the dropdown menu.
    * ```
    * <Dropdown>
    *   <Trigger>
    *     <Button iconCategory="utility" iconName="settings" />
    *   </Trigger>
    *   <div>Look ma! This is Custom Content.</div>
    *   <List options={[myArray]}/>
    * </Dropdown>
    * ```
    */
			children: _react.PropTypes.node,
			/**
    * CSS classes to be added to dropdown menu container. By default, It will be added to the `Popover` component.
    */
			className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
			/**
    * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
    */
			disabled: _react.PropTypes.bool,
			/* Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen.
   */
			hasStaticAlignment: _react.PropTypes.bool,
			/**
    * This prop is passed onto the triggering `Button`. Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
    */
			hint: _react.PropTypes.bool,
			/**
    * Delay on menu closing in milliseconds.
    */
			hoverCloseDelay: _react.PropTypes.number,
			/**
    * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
    */
			iconCategory: _react.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
			/**
    * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
    */
			iconName: _react.PropTypes.string,
			/**
    * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
    */
			iconVariant: _react.PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),
			/**
    * Determines the size of the icon.
    */
			iconSize: _react.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
			/**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
   */
			id: _react.PropTypes.string,
			/**
    * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
    */
			isInline: _react.PropTypes.bool,
			/**
    * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
    */
			isOpen: _react.PropTypes.bool,
			/**
   * This prop is passed onto the triggering `Button`. Text within the trigger button.
   */
			label: _react.PropTypes.string,
			/**
    * Custom element that overrides the default Menu Item component.
    */
			listItemRenderer: _react.PropTypes.func,
			/**
    * This prop is passed into the List for the menu. Pass null to make it the size of the content, or a string with an integer from here: https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height
    */
			length: _react.PropTypes.oneOf([null, '5', '7', '10']),
			/**
    * Style applied to menu element (that is the `.slds-dropdown` element)
    */
			menuStyle: _react.PropTypes.object,
			/**
    * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling (`iconVariant="container"`). Use with `isInline` prop, since positioning is determined by CSS via absolute-relative positioning, and using an absolutely positioned menu will not position the menu correctly without manual offsets.
    */
			nubbinPosition: _react.PropTypes.oneOf(['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right']),
			/**
    *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
    */
			offset: _react.PropTypes.string,
			/**
    * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
    */
			onBlur: _react.PropTypes.func,
			/**
    * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
    */
			onClick: _react.PropTypes.func,
			/**
    * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
    */
			onFocus: _react.PropTypes.func,
			/**
    * Determines if mouse hover or click opens or closes the dropdown menu. The default of `click` opens the menu on click, touch, or keyboard navigation and is highly recommended to comply with accessibility standards. The other options are `hover` which opens when the mouse enters the focusable area, and `hybrid` which causes the menu to open on clicking of the trigger, but closes the menu when the mouse leaves the menu and trigger area. If you are planning on using `hover` or `hybrid`, please pause a moment and reconsider.
    */
			openOn: _react.PropTypes.oneOf(['hover', 'click', 'hybrid']),
			/**
    * Called when a key pressed.
    */
			onKeyDown: _react.PropTypes.func,
			/**
    * Called when mouse clicks down on the trigger button.
    */
			onMouseDown: _react.PropTypes.func,
			/**
    * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
    */
			onMouseEnter: _react.PropTypes.func,
			/**
    * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
    */
			onMouseLeave: _react.PropTypes.func,
			/**
    * Triggered when an item in the menu is clicked.
    */
			onSelect: _react.PropTypes.func,
			/**
    * Triggered when the dropdown is opened.
    */
			onOpen: _react.PropTypes.func,
			/**
    * Triggered when the dropdown is closed.
    */
			onClose: _react.PropTypes.func,
			/**
    * An array of menu item.
    */
			options: _react.PropTypes.array,
			/**
    * An object of CSS styles that are applied to the triggering button.
    */
			style: _react.PropTypes.object,
			/**
    * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
    */
			overlay: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
			/**
    * Current selected menu item.
    */
			value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
			/**
    * This prop is passed onto the triggering `Button`. It creates a tooltip with the content of the `node` provided.
    */
			tooltip: _react.PropTypes.node
		},

		getDefaultProps: function getDefaultProps() {
			return {
				align: 'left',
				hoverCloseDelay: 300,
				openOn: 'click'
			};
		},
		getInitialState: function getInitialState() {
			return {
				focusedIndex: -1,
				selectedIndex: -1
			};
		},
		componentWillMount: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.MENU_DROPDOWN, this.props);

			this.generatedId = _shortid2.default.generate();

			this.setState({
				selectedIndex: this.getIndexByValue(this.props.value)
			});
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps, prevProps) {
			if (prevProps.value !== nextProps.value) {
				this.setState({
					selectedIndex: this.getIndexByValue(nextProps.value)
				});
			}

			if (prevProps.isOpen !== nextProps.isOpen) {
				this.setFocus();
			}
		},
		componentWillUnmount: function componentWillUnmount() {
			this.isUnmounting = true;
			this.renderOverlay(false);
		},
		getId: function getId() {
			return this.props.id || this.generatedId;
		},
		getIsOpen: function getIsOpen() {
			return !!((0, _lodash2.default)(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);
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
			return this.props.listItemRenderer ? this.props.listItemRenderer : _listItemLabel2.default;
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
				if (currentOpenDropdown && (0, _lodash4.default)(currentOpenDropdown.handleClose)) {
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
			var _this = this;

			var isOpen = this.getIsOpen();

			if (isOpen) {
				this.isClosing = setTimeout(function () {
					_this.handleClose();
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
			this.setState({ selectedIndex: index });

			this.setFocus();
			this.handleClose();

			if (this.props.onSelect) {
				this.props.onSelect(this.getValueByIndex(index));
			}
		},
		handleKeyDown: function handleKeyDown(event) {
			if (event.keyCode) {
				if (event.keyCode === _utilities.KEYS.ENTER || event.keyCode === _utilities.KEYS.SPACE || event.keyCode === _utilities.KEYS.DOWN || event.keyCode === _utilities.KEYS.UP) {
					_utilities.EventUtil.trap(event);
				}

				if (event.keyCode !== _utilities.KEYS.TAB) {
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
		setFocus: function setFocus() {
			if (!this.isHover && !this.isUnmounting && this.trigger) {
				_reactDom2.default.findDOMNode(this.trigger).focus();
			}
		},
		saveRefToTrigger: function saveRefToTrigger(trigger) {
			this.trigger = trigger;
		},
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

			if (index === this.state.focusedIndex) this.handleKeyboardFocus(this.state.focusedIndex);
		},
		getMenu: function getMenu() {
			return _reactDom2.default.findDOMNode(this.list);
		},
		getMenuItem: function getMenuItem(index) {
			if (index !== undefined && this.listItems) {
				return _reactDom2.default.findDOMNode(this.listItems[index]);
			}

			return undefined;
		},
		renderDefaultMenuContent: function renderDefaultMenuContent(customListProps) {
			return _react2.default.createElement(_list2.default, _extends({
				key: this.props.id + '-dropdown-list',
				checkmark: this.props.checkmark,
				getListItemId: this.getListItemId,
				itemRefs: this.saveRefToListItem,
				itemRenderer: this.getListItemRenderer(),
				onCancel: this.handleCancel,
				onSelect: this.handleSelect,
				options: this.props.options,
				ref: this.saveRefToList,
				selectedIndex: this.state.selectedIndex,
				triggerId: this.getId(),
				length: this.props.length
			}, customListProps));
		},
		renderMenuContent: function renderMenuContent(customContent) {
			var _this2 = this;

			var customContentWithListPropInjection = [];
			// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
			_react2.default.Children.forEach(customContent, function (child) {
				if (child && child.type.displayName === _constants.LIST) {
					customContentWithListPropInjection.push(_this2.renderDefaultMenuContent(child.props));
				} else {
					var clonedCustomContent = _react2.default.cloneElement(child, {
						onClick: _this2.handleClickCustomContent,
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
		renderSeparatedMenu: function renderSeparatedMenu(customContent, isOpen, outsideClickIgnoreClass) {
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

			return isOpen ? _react2.default.createElement(
				_popover2.default,
				{
					className: (0, _classnames2.default)('slds-dropdown', 'ignore-react-onclickoutside', positionClassName, this.props.className),
					closeOnTabKey: true,
					constrainToScrollParent: this.props.constrainToScrollParent,
					flippable: !this.props.hasStaticAlignment,
					horizontalAlign: this.props.align,
					inheritTargetWidth: this.props.inheritTargetWidth,
					marginTop: marginTop,
					offset: offset,
					onClose: this.handleClose,
					onKeyDown: this.handleKeyDown,
					onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter : null,
					onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave : null,
					outsideClickIgnoreClass: outsideClickIgnoreClass,
					style: this.props.menuStyle,
					targetElement: this.triggerContainer
				},
				this.renderMenuContent(customContent)
			) : null;
		},
		renderOverlay: function renderOverlay(isOpen) {
			if ((0, _lodash4.default)(overlay)) {
				overlay(isOpen, overlay);
			} else if (this.props.overlay && isOpen && !this.overlay) {
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

			var isInline = void 0;
			/* eslint-disable react/prop-types */
			if (this.props.isInline) {
				isInline = true;
			} else if (this.props.modal !== undefined) {
				isInline = !this.props.modal;
			}
			/* eslint-enable react/prop-types */

			/* Below are three sections of props:
    - The first are the props that may be given by the dropdown component. These may get deprecated in the future.
    - The next set of props (`CustomTriggerChildProps`) are props that can be overwritten by the end developer.
    - The final set are props that should not be overwritten, since they are ones that tie the trigger to the dropdown menu.
   */
			return _react2.default.createElement(CurrentTrigger, _extends({
				'aria-haspopup': 'true',
				assistiveText: this.props.assistiveText,
				className: (0, _classnames2.default)(outsideClickIgnoreClass, this.props.buttonClassName),
				disabled: this.props.disabled,
				hint: this.props.hint,
				iconCategory: this.props.iconCategory,
				iconName: this.props.iconName,
				iconVariant: this.props.iconVariant,
				iconSize: this.props.iconSize,
				inverse: this.props.buttonInverse,
				isOpen: isOpen,
				label: this.props.label,
				openOn: this.props.openOn,
				isInline: isInline,
				style: this.props.style,
				tabIndex: isOpen ? '-1' : '0',
				variant: this.props.buttonVariant,
				tooltip: this.props.tooltip

			}, CustomTriggerChildProps, {

				id: this.getId(),
				onBlur: this.props.onBlur,
				onClick: this.props.openOn === 'click' || this.props.openOn === 'hybrid' ? this.handleClick : this.props.onClick,
				onFocus: this.props.openOn === 'hover' ? this.handleFocus : null,
				onKeyDown: this.handleKeyDown,
				onMouseDown: this.props.onMouseDown,
				onMouseEnter: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseEnter : null,
				onMouseLeave: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseLeave : null,
				ref: this.saveRefToTriggerContainer,
				triggerRef: this.saveRefToTrigger,
				menu: isInline ? this.renderInlineMenu(customContent, isOpen) : this.renderSeparatedMenu(customContent, isOpen, outsideClickIgnoreClass)
			}));
		}
	});

	module.exports = MenuDropdown;
	module.exports.ListItem = _listItem2.default;
	module.exports.ListItemLabel = _listItemLabel2.default;
	module.exports.DropdownNubbinPositions = DropdownNubbinPositions;
});