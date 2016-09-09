/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Dropdown Component

// Implements the [Dropdown design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown) in React. Child elements that do not have the display name of the value of `MENU_DROPDOWN_TRIGGER` in `components/constants.js` will be considered custom content and rendered in the popover.
// Based on SLDS v2.1.0-rc.2

// ### React
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### Children
import Popover from '../popover';
import List from '../menu-list/list';
import ListItem from '../menu-list/list-item';
import ListItemLabel from '../menu-list/list-item-label';

// This is the the default Dropdown Trigger, which expects one button as a child.
import DefaultTrigger from './button-trigger';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Traits

// #### KeyboardNavigable
import KeyboardNavigable from '../../utilities/keyboard-navigable';

import { KEYS, EventUtil } from '../../utilities';
import { MENU_DROPDOWN, MENU_DROPDOWN_TRIGGER, LIST } from '../../utilities/constants';

// The overlay is an optional way to allow the dropdown to close on outside
// clicks even when those clicks are over areas that wouldn't normally fire
// click or touch events (for example, iframes). A single overlay is shared
// between all dropdowns in the app.
const overlay = document.createElement('span');
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.position = 'absolute';

let currentOpenDropdown;

/**
 * The MenuDropdown component is a variant of the Lightning Design System Menu component.
 */
const MenuDropdown = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: MENU_DROPDOWN,

	mixins: [KeyboardNavigable],

	// ### Prop Types
	propTypes: {
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
		 */
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * This prop is passed onto the triggering `Button`. Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. You can omit this prop if you are using the `label` prop.
		 */
		assistiveText: PropTypes.string,
		/**
		 * CSS classes to be added to triggering button.
		 */
		buttonClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
		 */
		buttonInverse: PropTypes.bool,
		/**
		 * This prop is passed onto the triggering `Button`. Determines variant of the Button component that triggers dropdown.
		 */
		buttonVariant: PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon']),
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
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
		children: PropTypes.node,
		/**
		 * CSS classes to be added to dropdown menu container. By default, It will be added to the `Popover` component.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
		 */
		disabled: PropTypes.bool,
		/* Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you may consider making the dropdowns contents scrollable.
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
		iconCategory: PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		/**
		 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
		 */
		iconName: PropTypes.string,
		/**
		 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
		 */
		iconVariant: PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),
		/**
		 * Determines the size of the icon.
		 */
		iconSize: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
		* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		*/
		id: PropTypes.string,
		/**
		* This prop is passed onto the triggering `Button`. Text within the trigger button.
		*/
		label: PropTypes.string,
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
		/**
		 * This prop is passed into the List for the menu. Pass null to make it the size of the content, or a string with an integer from here: https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height
		 */
		length: PropTypes.oneOf([null, '5', '7', '10']),
		/**
		 * Renders menu within an absolutely positioned container at an elevated z-index.
		 */
		modal: PropTypes.bool,
		/**
		 * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling. Dropdown menus will still be contained to the closest scrolling parent.
		 */
		nubbinPosition: PropTypes.oneOf([
			'top left',
			'top',
			'top right',
			'bottom left',
			'bottom',
			'bottom right'
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
		 * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
		 */
		openOn: PropTypes.oneOf(['hover', 'click']),
		/**
		 * Set dropdown to be open. Must be returned to false to become interactive again.
		 */
		forceOpen: PropTypes.bool,
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
		 * An array of menu item.
		 */
		options: PropTypes.array,
		/**
		 * An object of CSS styles that are applied to the triggering button.
		 */
		style: PropTypes.object,
		/**
		 * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
		 */
		overlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
		/**
		 * Current selected menu item.
		 */
		value: PropTypes.string,
		/**
		 * This prop is passed onto the triggering `Button`. It creates a tooltip with the content of the `node` provided.
		 */
		tooltip: PropTypes.node
	},

	getDefaultProps () {
		return {
			align: 'left',
			hoverCloseDelay: 300,
			modal: true,
			openOn: 'click'
		};
	},

	getInitialState () {
		return {
			focusedIndex: -1,
			selectedIndex: -1
		};
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(MENU_DROPDOWN, this.props);

		this.generatedId = shortid.generate();

		this.setState({
			selectedIndex: this.getIndexByValue(this.props.value)
		});
	},

	componentWillReceiveProps (nextProps) {
		if (this.props.value !== nextProps.value) {
			this.setState({
				selectedIndex: this.getIndexByValue(nextProps.value)
			});
		}
	},

	componentWillUnmount () {
		this.isUnmounting = true;
		this.renderOverlay(false);
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getIndexByValue (value) {
		let foundIndex = -1;

		if (this.props.options && this.props.options.length) {
			this.props.options.some((element, index) => {
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
		return this.props.listItemRenderer ? this.props.listItemRenderer : ListItemLabel;
	},

	handleClose () {
		if (this.state.isOpen) {
			this.setState({
				isOpen: false
			});

			this.isHover = false;

			if (currentOpenDropdown === this) {
				currentOpenDropdown = undefined;
			}
		}
	},

	handleOpen () {
		if (currentOpenDropdown && isFunction(currentOpenDropdown.handleClose)) {
			currentOpenDropdown.handleClose();
		}

		currentOpenDropdown = this;

		this.setState({
			isOpen: true
		});
	},

	handleMouseEnter (event) {
		this.isHover = true;

		if (!this.state.isOpen) {
			this.handleOpen();
		} else {
			clearTimeout(this.isClosing);
		}

		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(event);
		}
	},

	handleMouseLeave (event) {
		if (this.state.isOpen) {
			this.isClosing = setTimeout(() => {
				this.handleClose();
			}, this.props.hoverCloseDelay);
		}

		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(event);
		}
	},

	handleClick (event) {
		if (!this.state.isOpen) {
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
		if (!this.state.isOpen) {
			this.handleOpen();
		}

		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	},

	handleSelect (index) {
		this.setState({ selectedIndex: index });

		this.setFocus();
		this.handleClose();

		if (this.props.onSelect) {
			this.props.onSelect(this.getValueByIndex(index));
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ENTER ||
					event.keyCode === KEYS.SPACE ||
					event.keyCode === KEYS.DOWN ||
					event.keyCode === KEYS.UP) {
				EventUtil.trap(event);
			}

			if (event.keyCode !== KEYS.TAB) {
				this.handleKeyboardNavigate({
					isOpen: this.state.isOpen || false,
					key: event.key,
					keyCode: event.keyCode,
					onSelect: this.handleSelect,
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

	handleCancel () {
		this.setFocus();
		this.handleClose();
	},

	handleClickOutside () {
		this.handleClose();
	},

	toggleOpen () {
		this.setFocus();
		if (this.state.isOpen) {
			this.handleClose();
		} else {
			this.handleOpen();
		}
	},

	setFocus () {
		if (!this.isHover && !this.isUnmounting && this.trigger) {
			ReactDOM.findDOMNode(this.trigger).focus();
		}
	},

	saveRefToTrigger (trigger) {
		this.trigger = trigger;
	},

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

		if (index === this.state.focusedIndex) this.handleKeyboardFocus(this.state.focusedIndex);
	},

	getMenu () {
		return ReactDOM.findDOMNode(this.list);
	},

	getMenuItem (index) {
		if (index !== undefined && this.listItems) {
			return ReactDOM.findDOMNode(this.listItems[index]);
		}

		return undefined;
	},

	renderDefaultPopoverContent (customListProps) {
		return (
			<List
				key={`${this.props.id}-dropdown-list`}
				checkmark={this.props.checkmark}
				getListItemId={this.getListItemId}
				itemRefs={this.saveRefToListItem}
				itemRenderer={this.getListItemRenderer()}
				onCancel={this.handleCancel}
				onSelect={this.handleSelect}
				options={this.props.options}
				ref={this.saveRefToList}
				selectedIndex={this.state.selectedIndex}
				triggerId={this.getId()}
				length={this.props.length}
				{...customListProps}
			/>
		);
	},

	renderPopoverContent (customContent) {
		let customContentWithListPropInjection = [];
		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		React.Children.forEach(customContent, (child) => {
			if (child && child.type.displayName === LIST) {
				customContentWithListPropInjection.push(this.renderDefaultPopoverContent(child.props));
			} else {
				customContentWithListPropInjection.push(child);
			}
		});
		if (customContentWithListPropInjection.length === 0) {
			customContentWithListPropInjection = null;
		}

		return customContentWithListPropInjection || this.renderDefaultPopoverContent();
	},

	renderSimplePopover (customContent, isOpen) {
		return (
			isOpen ?
				<div
					className={classNames('slds-dropdown', 'slds-dropdown--left', this.props.className)}
					onMouseEnter={(this.props.openOn === 'hover') ? this.handleMouseEnter : null}
					onMouseLeave={(this.props.openOn === 'hover') ? this.handleMouseLeave : null}
					style={this.props.menuStyle}
				>
					{this.renderPopoverContent(customContent)}
				</div> : null
		);
	},

	renderModalPopover (customContent, isOpen, outsideClickIgnoreClass) {
		let positionClassName;
		let marginTop;
		let offset = this.props.offset;

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

		return (
			isOpen ?
				<Popover
					className={classNames('slds-dropdown',
						'ignore-react-onclickoutside',
						positionClassName,
						this.props.className)}
					closeOnTabKey
					constrainToScrollParent={this.props.constrainToScrollParent}
					flippable={!this.props.hasStaticAlignment}
					horizontalAlign={this.props.align}
					inheritTargetWidth={this.props.inheritTargetWidth}
					marginTop={marginTop}
					offset={offset}
					onClose={this.handleClose}
					onKeyDown={this.handleKeyDown}
					onMouseEnter={(this.props.openOn === 'hover') ? this.handleMouseEnter : null}
					onMouseLeave={(this.props.openOn === 'hover') ? this.handleMouseLeave : null}
					outsideClickIgnoreClass={outsideClickIgnoreClass}
					targetElement={this.triggerContainer}
				>
					{this.renderPopoverContent(customContent)}
				</Popover> : null
		);
	},

	renderOverlay (isOpen) {
		if (isFunction(overlay)) {
			overlay(isOpen, overlay);
		} else if (this.props.overlay && isOpen && !this.overlay) {
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
		const isOpen = this.props.forceOpen || !this.props.disabled && this.state.isOpen && !!this.trigger;

		this.renderOverlay(isOpen);

		/* Below are three sections of props:
		 - The first are the props that may be given by the dropdown component. These may get deprecated in the future.
		 - The next set of props (`CustomTriggerChildProps`) are props that can be overwritten by the end developer.
		 - The final set are props that should not be overwritten, since they are ones that tie the trigger to the dropdown menu.
		*/
		return (
			<CurrentTrigger
				aria-haspopup="true"
				assistiveText={this.props.assistiveText}
				className={classNames(outsideClickIgnoreClass, this.props.buttonClassName)}
				disabled={this.props.disabled}
				hint={this.props.hint}
				iconCategory={this.props.iconCategory}
				iconName={this.props.iconName}
				iconVariant={this.props.iconVariant}
				iconSize={this.props.iconSize}
				inverse={this.props.buttonInverse}
				isOpen={isOpen}
				label={this.props.label}
				style={this.props.style}
				tabIndex={isOpen ? '-1' : '0'}
				variant={this.props.buttonVariant}
				tooltip={this.props.tooltip}

				{...CustomTriggerChildProps}

				id={this.getId()}
				onBlur={this.props.onBlur}
				onClick={this.props.openOn === 'click' ? this.handleClick : this.props.onClick}
				onFocus={this.props.openOn === 'hover' ? this.handleFocus : null}
				onKeyDown={this.handleKeyDown}
				onMouseDown={this.props.onMouseDown}
				onMouseEnter={this.props.openOn === 'hover' ? this.handleMouseEnter : null}
				onMouseLeave={this.props.openOn === 'hover' ? this.handleMouseLeave : null}
				ref={this.saveRefToTriggerContainer}
				triggerRef={this.saveRefToTrigger}
				menu={this.props.modal ?
					this.renderModalPopover(customContent, isOpen, outsideClickIgnoreClass) :
					this.renderSimplePopover(customContent, isOpen)}
			/>
		);
	}
});

module.exports = MenuDropdown;
module.exports.ListItem = ListItem;
module.exports.ListItemLabel = ListItemLabel;
