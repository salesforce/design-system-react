/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Dropdown Component

// Implements the [Dropdown design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown) in React. Child elements that do not have the display name of the value of `MENU_DROPDOWN_TRIGGER` in `components/constants.js` will be considered custom content and rendered in the popover.
// Based on SLDS v2.1.0-rc.2

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import requiredIf from 'react-required-if';

import assign from 'lodash.assign';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### isBoolean
import isBoolean from 'lodash.isboolean';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### Children
import Dialog from '../utilities/dialog';
import List from '../utilities/menu-list';
import ListItem from '../utilities/menu-list/item';
import ListItemLabel from '../utilities/menu-list/item-label';

// This is the the default Dropdown Trigger, which expects one button as a child.
import DefaultTrigger from './button-trigger';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Traits

// #### KeyboardNavigable
import KeyboardNavigable from '../../utilities/keyboard-navigable-menu';

import EventUtil from '../../utilities/event';
import KEYS from '../../utilities/key-code';
import {
	MENU_DROPDOWN,
	MENU_DROPDOWN_TRIGGER,
	LIST,
} from '../../utilities/constants';

const documentDefined = typeof document !== 'undefined';

// The overlay is an optional way to allow the dropdown to close on outside
// clicks even when those clicks are over areas that wouldn't normally fire
// click or touch events (for example, iframes). A single overlay is shared
// between all dropdowns in the app.
const overlay = documentDefined
	? document.createElement('span')
	: { style: {} };
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.position = 'absolute';

let currentOpenDropdown;

const DropdownNubbinPositions = [
	'top left',
	'top',
	'top right',
	'bottom left',
	'bottom',
	'bottom right',
];

/**
 * The MenuDropdown component is a variant of the Lightning Design System Menu component. This component
 * may require a polyfill such as [classList](https://github.com/yola/classlist-polyfill) due to
 * [react-onclickoutside](https://github.com/Pomax/react-onclickoutside) if Internet Explorer 11
 * support is needed.
 *
 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 */
const MenuDropdown = createReactClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: MENU_DROPDOWN,

	// ### Prop Types
	propTypes: {
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
		 */
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * This prop is passed onto the triggering `Button`. Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. You can omit this prop if you are using the `label` prop.
		 */
		assistiveText: PropTypes.object,
		/**
		 * CSS classes to be added to triggering button.
		 */
		buttonClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
		 */
		buttonInverse: PropTypes.bool,
		/**
		 * This prop is passed onto the triggering `Button`. Determines variant of the Button component that triggers dropdown.
		 */
		buttonVariant: PropTypes.oneOf([
			'base',
			'neutral',
			'brand',
			'destructive',
			'icon',
		]),
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
		/**
		 * By default, any children passed into this component will be rendered inside the dropdown menu. If you only need a standard menu, use `options`. If you need custom list items markup, use `listItemRenderer` and `options`. `children` with a `List` should _only_ used if you have a listbox and additional content.
		 *
		 * If you need to modify the trigger button, import the module `design-system-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the trigger button. Any `id` prop or event hanlders (`onBlur`, `onClick`, etc.) set on the button grandchild will be overwritten by `MenuDropdown` to enable functionality and accessibility. A custom trigger child will not be considered content for the dropdown menu.
		 *
		 * **List as a child is an experimental API.** If you need custom content _and_ a list, import 'design-system-react/components/menu-list/list' and pass in `<List>`.
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
		children: PropTypes.node,
		/**
		 * CSS classes to be added to dropdown menu.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * By default, these class names will be added to the absolutely-positioned `Dialog` component.
		 */
		containerClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
		 */
		disabled: PropTypes.bool,
		/**
		 * Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
		 */
		hasStaticAlignment: PropTypes.bool,
		/**
		 * This prop is passed onto the triggering `Button`. Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
		 */
		hint: PropTypes.bool,
		/**
		 * Delay on menu closing in milliseconds.
		 */
		hoverCloseDelay: PropTypes.number,
		/**
		 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
		 */
		iconCategory: requiredIf(
			PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
			(props) => !!props.iconName
		),
		/**
		 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
		 */
		iconName: PropTypes.string,
		/**
		 * If omitted, icon position is centered.
		 */
		iconPosition: PropTypes.oneOf(['left', 'right']),
		/**
		 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
		 */
		iconVariant: PropTypes.oneOf([
			'bare',
			'container',
			'border',
			'border-filled',
			'small',
			'more',
		]),
		/**
		 * Determines the size of the icon.
		 */
		iconSize: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id: PropTypes.string,
		/**
		 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
		 */
		isOpen: PropTypes.bool,
		/**
		 * This prop is passed onto the triggering `Button`. Text within the trigger button.
		 */
		label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
		/**
		 * This prop is passed into the List for the menu. Pass null to make it the size of the content, or a string with an integer from here: https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height
		 */
		length: PropTypes.oneOf([null, '5', '7', '10']),
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		menuPosition: PropTypes.oneOf([
			'absolute',
			'overflowBoundaryElement',
			'relative',
		]),
		/**
		 * Style applied to menu element (that is the `.slds-dropdown` element)
		 */
		menuStyle: PropTypes.object,
		/**
		 * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling (`iconVariant="container"`). Use with `isInline` prop, since positioning is determined by CSS via absolute-relative positioning, and using an absolutely positioned menu will not position the menu correctly without manual offsets.
		 */
		nubbinPosition: PropTypes.oneOf([
			'top left',
			'top',
			'top right',
			'bottom left',
			'bottom',
			'bottom right',
		]),
		/**
		 *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
		 */
		offset: PropTypes.string,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
		 */
		onBlur: PropTypes.func,
		/**
		 * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
		 */
		onFocus: PropTypes.func,
		/**
		 * Determines if mouse hover or click opens or closes the dropdown menu. The default of `click` opens the menu on click, touch, or keyboard navigation and is highly recommended to comply with accessibility standards. The other options are `hover` which opens when the mouse enters the focusable area, and `hybrid` which causes the menu to open on clicking of the trigger, but closes the menu when the mouse leaves the menu and trigger area. If you are planning on using `hover` or `hybrid`, please pause a moment and reconsider.
		 */
		openOn: PropTypes.oneOf(['hover', 'click', 'hybrid']),
		/**
		 * Called when a key pressed.
		 */
		onKeyDown: PropTypes.func,
		/**
		 * Called when mouse clicks down on the trigger button.
		 */
		onMouseDown: PropTypes.func,
		/**
		 * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseEnter: PropTypes.func,
		/**
		 * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseLeave: PropTypes.func,
		/**
		 * Triggered when an item in the menu is clicked.
		 */
		onSelect: PropTypes.func,
		/**
		 * Triggered when the dropdown is opened.
		 */
		onOpen: PropTypes.func,
		/**
		 * Triggered when the dropdown is closed.
		 */
		onClose: PropTypes.func,
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
		options: PropTypes.array,
		/**
		 * An object of CSS styles that are applied to the triggering button.
		 */
		style: PropTypes.object,
		/**
		 * Write <code>"-1"</code> if you don't want the user to tab to the button.
		 */
		tabIndex: PropTypes.string,
		/**
		 * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
		 */
		overlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
		/**
		 * Current selected menu item.
		 */
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.array,
		]),
		/**
		 * This prop is passed onto the triggering `Button`. It creates a tooltip with the content of the `node` provided.
		 */
		tooltip: PropTypes.node,
		/**
		 * CSS classes to be added to wrapping trigger `div` around the button.
		 */
		triggerClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Whether this dropdown supports multi select.
		 */
		multiple: PropTypes.bool,
	},

	mixins: [KeyboardNavigable],

	getDefaultProps () {
		return {
			align: 'left',
			hoverCloseDelay: 300,
			menuPosition: 'absolute',
			openOn: 'click',
		};
	},

	getInitialState () {
		return {
			focusedIndex: -1,
			selectedIndex: -1,
			selectedIndices: [],
		};
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(MENU_DROPDOWN, this.props);

		this.generatedId = shortid.generate();

		this.setCurrentSelectedIndices(this.props);
	},

	componentWillReceiveProps (nextProps, prevProps) {
		if (prevProps.value !== nextProps.value) {
			this.setCurrentSelectedIndices(nextProps);
		}

		if (prevProps.isOpen !== nextProps.isOpen) {
			this.setFocus();
		}
	},

	componentWillUnmount () {
		if (currentOpenDropdown === this) {
			currentOpenDropdown = undefined;
		}
		this.isUnmounting = true;
		this.renderOverlay(false);
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getIsOpen () {
		return !!(isBoolean(this.props.isOpen)
			? this.props.isOpen
			: this.state.isOpen);
	},

	getIndexByValue (value, options) {
		let foundIndex = -1;

		if (options && options.length) {
			options.some((element, index) => {
				if (element && element.value === value) {
					foundIndex = index;
					return true;
				}

				return false;
			});
		}

		return foundIndex;
	},

	getValueByIndex (index) {
		return this.props.options[index];
	},

	getListItemRenderer () {
		return this.props.listItemRenderer
			? this.props.listItemRenderer
			: ListItemLabel;
	},

	setFocus () {
		if (!this.isHover && !this.isUnmounting && this.trigger) {
			ReactDOM.findDOMNode(this.trigger).focus(); // eslint-disable-line react/no-find-dom-node
		}
	},

	getMenu () {
		return ReactDOM.findDOMNode(this.list); // eslint-disable-line react/no-find-dom-node
	},

	getMenuItem (index) {
		if (index !== undefined && this.listItems) {
			return ReactDOM.findDOMNode(this.listItems[index]); // eslint-disable-line react/no-find-dom-node
		}

		return undefined;
	},

	setCurrentSelectedIndices (nextProps) {
		if (this.props.multiple !== true) {
			this.setState({
				selectedIndex: this.getIndexByValue(nextProps.value, nextProps.options),
			});
		} else {
			let values = [];
			let currentIndices = [];
			if (!Array.isArray(nextProps.value)) {
				values.push(nextProps.value);
			} else {
				values = nextProps.value;
			}
			values = values.filter(
				(value) => this.getIndexByValue(value, nextProps.options) !== -1
			);
			currentIndices = values.map((value) =>
				this.getIndexByValue(value, nextProps.options)
			);

			this.setState({
				selectedIndices: currentIndices,
			});
		}
	},

	// Trigger opens, closes, and recieves focus on close
	saveRefToTrigger (trigger) {
		this.trigger = trigger;

		if (!this.state.triggerRendered) {
			this.setState({ triggerRendered: true });
		}
	},

	// TriggerContainer is the wrapping outer DOM element which may differ from the actual trigger which is most likely a `button`.
	saveRefToTriggerContainer (triggerContainer) {
		this.triggerContainer = triggerContainer;
		if (!this.trigger) this.trigger = triggerContainer;
	},

	saveRefToList (list) {
		this.list = list;
	},

	saveRefToListItem (listItem, index) {
		if (!this.listItems) {
			this.listItems = {};
		}

		this.listItems[index] = listItem;

		if (index === this.state.focusedIndex) {
			this.handleKeyboardFocus(this.state.focusedIndex);
		}
	},

	handleClose () {
		const isOpen = this.getIsOpen();

		if (isOpen) {
			if (currentOpenDropdown === this) {
				currentOpenDropdown = undefined;
			}

			this.setState({
				isOpen: false,
			});

			this.isHover = false;

			if (this.props.onClose) {
				this.props.onClose();
			}
		}
	},

	handleOpen () {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			if (currentOpenDropdown && isFunction(currentOpenDropdown.handleClose)) {
				currentOpenDropdown.handleClose();
			}

			currentOpenDropdown = this;

			this.setState({
				isOpen: true,
			});

			if (this.props.onOpen) {
				this.props.onOpen();
			}
		}
	},

	handleMouseEnter (event) {
		const isOpen = this.getIsOpen();

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

	handleMouseLeave (event) {
		const isOpen = this.getIsOpen();

		if (isOpen) {
			this.isClosing = setTimeout(() => {
				this.handleClose();
			}, this.props.hoverCloseDelay);
		}

		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(event);
		}
	},

	handleClick (event) {
		const isOpen = this.getIsOpen();

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

	handleFocus (event) {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			this.handleOpen();
		}

		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	},

	handleClickCustomContent () {
		this.setFocus();
		this.handleClose();

		if (this.props.onSelect) {
			this.props.onSelect();
		}
	},

	handleSelect (index) {
		if (!this.props.multiple) {
			this.setState({ selectedIndex: index });
			this.handleClose();
			this.setFocus();
		} else if (
			this.props.multiple &&
			this.state.selectedIndices.indexOf(index) === -1
		) {
			const currentIndices = this.state.selectedIndices.concat(index);
			this.setState({
				selectedIndices: currentIndices,
			});
		} else if (this.props.multiple) {
			const deselectIndex = this.state.selectedIndices.indexOf(index);
			const currentSelected = this.state.selectedIndices;
			currentSelected.splice(deselectIndex, 1);
			this.setState({
				selectedIndices: currentSelected,
			});
		}

		if (this.props.onSelect) {
			const option = this.getValueByIndex(index);
			this.props.onSelect(option, { option, optionIndex: index });
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (
				event.keyCode === KEYS.ENTER ||
				event.keyCode === KEYS.SPACE ||
				event.keyCode === KEYS.DOWN ||
				event.keyCode === KEYS.UP
			) {
				EventUtil.trap(event);
			}

			if (event.keyCode !== KEYS.TAB) {
				const isOpen = this.getIsOpen();

				this.handleKeyboardNavigate({
					event,
					isOpen,
					key: event.key,
					keyCode: event.keyCode,
					onSelect: this.handleSelect,
					target: event.target,
					toggleOpen: this.toggleOpen,
				});
			} else {
				this.handleCancel();
			}

			if (this.props.onKeyDown) {
				this.props.onKeyDown(event);
			}
		}
	},

	handleCancel () {
		this.setFocus();
		this.handleClose();
	},

	handleClickOutside () {
		this.handleClose();
	},

	toggleOpen () {
		const isOpen = this.getIsOpen();
		this.setFocus();

		if (isOpen) {
			this.handleClose();
		} else {
			this.handleOpen();
		}
	},

	renderDefaultMenuContent (customListProps) {
		return (
			<List
				key={`${this.getId()}-dropdown-list`}
				checkmark={this.props.checkmark}
				getListItemId={this.getListItemId}
				itemRefs={this.saveRefToListItem}
				itemRenderer={this.getListItemRenderer()}
				onCancel={this.handleCancel}
				onSelect={this.handleSelect}
				options={this.props.options}
				ref={this.saveRefToList}
				selectedIndex={
					!this.props.multiple ? this.state.selectedIndex : undefined
				}
				selectedIndices={
					this.props.multiple ? this.state.selectedIndices : undefined
				}
				triggerId={this.getId()}
				length={this.props.length}
				{...customListProps}
			/>
		);
	},

	renderMenuContent (customContent) {
		let customContentWithListPropInjection = [];
		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		React.Children.forEach(customContent, (child) => {
			if (child && child.type.displayName === LIST) {
				customContentWithListPropInjection.push(
					this.renderDefaultMenuContent(child.props)
				);
			} else if (child) {
				const clonedCustomContent = React.cloneElement(child, {
					onClick: this.handleClickCustomContent,
					key: shortid.generate(),
				});
				customContentWithListPropInjection.push(clonedCustomContent);
			}
		});
		if (customContentWithListPropInjection.length === 0) {
			customContentWithListPropInjection = null;
		}

		return (
			customContentWithListPropInjection || this.renderDefaultMenuContent()
		);
	},

	renderInlineMenu (customContent, isOpen) {
		let positionClassName;

		if (this.props.nubbinPosition) {
			const positions = this.props.nubbinPosition.split(' ');
			positionClassName = classNames(
				`slds-nubbin--${positions.join('-')}`,
				positions.map((position) => `slds-dropdown--${position}`)
			);

			// TODO: allow nubbinPosition prop to set the offset automatically
			// if (this.props.nubbinPosition === 'top right') {
			// 	offset = '-12px -24px';
			// }
		} else if (this.props.align) {
			positionClassName = `slds-dropdown--${this.props.align}`;
		}

		return isOpen ? (
			<div
				className={classNames(
					'slds-dropdown',
					positionClassName,
					this.props.className
				)}
				onMouseEnter={
					this.props.openOn === 'hover' ? this.handleMouseEnter : null
				}
				onMouseLeave={
					this.props.openOn === 'hover' ? this.handleMouseLeave : null
				}
				style={this.props.menuStyle}
			>
				{this.renderMenuContent(customContent)}
			</div>
		) : null;
	},

	renderDialog (customContent, isOpen, outsideClickIgnoreClass) {
		let positionClassName;
		let marginTop;
		const offset = this.props.offset;

		if (this.props.nubbinPosition) {
			const positions = this.props.nubbinPosition.split(' ');
			positionClassName = classNames(
				`slds-nubbin--${positions.join('-')}`,
				positions.map((position) => `slds-dropdown--${position}`)
			);
			marginTop = 0;
			// TODO: allow nubbinPosition prop to set the offset automatically
			// if (this.props.nubbinPosition === 'top right') {
			// 	offset = '-12px -24px';
			// }
		} else if (this.props.align) {
			positionClassName = `slds-dropdown--${this.props.align}`;
		}

		// FOR BACKWARDS COMPATIBILITY
		const menuPosition = this.props.isInline
			? 'relative'
			: this.props.menuPosition; // eslint-disable-line react/prop-types

		return isOpen ? (
			<Dialog
				align={`bottom ${this.props.align}`}
				className={classNames(this.props.containerClassName)}
				closeOnTabKey
				contentsClassName={classNames(
					'slds-dropdown',
					'ignore-react-onclickoutside',
					positionClassName,
					this.props.className
				)}
				context={this.context}
				hasStaticAlignment={this.props.hasStaticAlignment}
				inheritWidthOf={this.props.inheritTargetWidth ? 'target' : 'none'}
				offset={offset}
				onClose={this.handleClose}
				onKeyDown={this.handleKeyDown}
				onMouseEnter={
					this.props.openOn === 'hover' ? this.handleMouseEnter : null
				}
				onMouseLeave={
					this.props.openOn === 'hover' ? this.handleMouseLeave : null
				}
				outsideClickIgnoreClass={outsideClickIgnoreClass}
				position={menuPosition}
				style={
					this.props.menuStyle ||
					assign({}, this.props.menuStyle, { marginTop })
				}
				onRequestTargetElement={() => this.trigger}
			>
				{this.renderMenuContent(customContent)}
			</Dialog>
		) : null;
	},

	renderOverlay (isOpen) {
		if (isFunction(overlay) && documentDefined) {
			overlay(isOpen, overlay);
		} else if (
			this.props.overlay &&
			isOpen &&
			!this.overlay &&
			documentDefined
		) {
			this.overlay = overlay;
			document.querySelector('body').appendChild(this.overlay);
		} else if (!isOpen && this.overlay && this.overlay.parentNode) {
			this.overlay.parentNode.removeChild(this.overlay);
			this.overlay = undefined;
		}
	},

	render () {
		// Dropdowns are used by other components. The default trigger is a button, but some other components use `li` elements. The following allows `MenuDropdown` to be extended by providing a child component with the displayName of `DropdownTrigger`.
		let CurrentTrigger = DefaultTrigger;

		let CustomTriggerChildProps = {};

		// Child elements that do not have the display name of the value of `MENU_DROPDOWN_TRIGGER` in `components/constants.js` will be considered custom content and rendered in the popover.
		let customContent = [];

		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		React.Children.forEach(this.props.children, (child) => {
			if (child && child.type.displayName === MENU_DROPDOWN_TRIGGER) {
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

		const outsideClickIgnoreClass = `ignore-click-${this.getId()}`;
		const isOpen = !this.props.disabled && this.getIsOpen() && !!this.trigger;

		this.renderOverlay(isOpen);

		/* Below are three sections of props:
		 - The first are the props that may be given by the dropdown component. These may get deprecated in the future.
		 - The next set of props (`CustomTriggerChildProps`) are props that can be overwritten by the end developer.
		 - The final set are props that should not be overwritten, since they are ones that tie the trigger to the dropdown menu.
		*/

		return (
			<CurrentTrigger
				aria-haspopup
				assistiveText={this.props.assistiveText}
				className={classNames(
					outsideClickIgnoreClass,
					this.props.buttonClassName
				)}
				disabled={this.props.disabled}
				hint={this.props.hint}
				iconCategory={this.props.iconCategory}
				iconName={this.props.iconName}
				iconPosition={this.props.iconPosition}
				iconSize={this.props.iconSize}
				iconVariant={this.props.iconVariant}
				id={this.getId()}
				inverse={this.props.buttonInverse}
				isOpen={isOpen}
				label={this.props.label}
				menu={this.renderDialog(customContent, isOpen, outsideClickIgnoreClass)}
				onBlur={this.props.onBlur}
				onClick={
					this.props.openOn === 'click' || this.props.openOn === 'hybrid'
						? this.handleClick
						: this.props.onClick
				}
				onFocus={this.props.openOn === 'hover' ? this.handleFocus : null}
				onKeyDown={this.handleKeyDown}
				onMouseDown={this.props.onMouseDown}
				onMouseEnter={
					this.props.openOn === 'hover' || this.props.openOn === 'hybrid'
						? this.handleMouseEnter
						: null
				}
				onMouseLeave={
					this.props.openOn === 'hover' || this.props.openOn === 'hybrid'
						? this.handleMouseLeave
						: null
				}
				openOn={this.props.openOn}
				ref={this.saveRefToTriggerContainer}
				style={this.props.style}
				tabIndex={this.props.tabIndex || (isOpen ? '-1' : '0')}
				tooltip={this.props.tooltip}
				triggerClassName={this.props.triggerClassName}
				triggerRef={this.saveRefToTrigger}
				variant={this.props.buttonVariant}
				{...CustomTriggerChildProps}
			/>
		);
	},
});

MenuDropdown.contextTypes = {
	iconPath: PropTypes.string,
};

export default MenuDropdown;
export { ListItem, ListItemLabel, DropdownNubbinPositions };
