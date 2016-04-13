/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Dropdown Component --- SLDS for React

// Implements the [Dropdown design pattern](https://www.lightningdesignsystem.com/components/menus#dropdown) in React.

// [![Dropdown component example screenshot](/assets/demo-site/images/component-examples/dropdown.png "Dropdown component example screenshot")](/react/dropdown)

// > See a [live example](/react/dropdown) of the Dropdown component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import merge from 'slds-for-js-core/lib/merge';

// Use the [shared core](../../core/picklist.html), which contains logic that
// is shared across SLDS for JavaScript.
import PicklistCore from 'slds-for-js-core/components/picklist';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Traits

// #### Eventable
// [../../traits/eventable](../../traits/eventable.html)
import Eventable from 'slds-for-js-core/traits/eventable';

// #### Openable
// * [../../traits/openable](../../traits/openable.html)
import Openable from 'slds-for-js-core/traits/openable';

// #### Positionable
// [../../traits/positionable](../../traits/positionable.html)
import Positionable from 'slds-for-js-core/traits/positionable';

// ### React
// React is an external dependency of the project.
import React from 'react';

// #### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// Façades uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Is Icon
// The [isIcon mixin](../mixins/custom-prop-types/icon.html) for React to
// checks whether a prop provides an icon format
import isIcon from '../mixins/custom-prop-types/icon.js';

// [Trigger](./button-trigger.html)
// This is the the default Dropdown Trigger. It expects one button as a child.
import DefaultTrigger from './button-trigger';

// [PicklistObject](../picklist.html)
import { PicklistDefinition } from '../picklist';

// Remove the need for `React.PropTypes`
const { PropTypes } = React;

export const CONTROL = 'Dropdown';

// ## DropdownObject
export const DropdownDefinition = {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
		 */
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * Deprecated. Please set the `Button` property, `assistiveText`, as a child of `Trigger`:
		 * ```
		 * <Dropdown>
		 * <Trigger>
		 * <Button assistiveText="Change settings" />
		 * </Trigger>
		 * </Dropdown>
		 * ```
		 */
		assistiveText: PropTypes.string,
		/**
		 * End of Life. Please set the `Button` property, `className`, as a child of `Trigger`:
		 * ```
		 * <Dropdown>
		 * <Trigger>
		 * <Button className="slds-is-cool" />
		 * </Trigger>
		 * </Dropdown>
		 * ```
		 */
		buttonClassName: PropTypes.string,
		/**
		 * End of Life. Please set the `Button` property, `variant`, as a child of `Trigger`:
		 * ```
		 * <Dropdown>
		 * <Trigger>
		 * <Button variant="brand" />
		 * </Trigger>
		 * </Dropdown>
		 * ```
		 */
		buttonVariant: PropTypes.string,
		/**
		 * If true, renders checkmark icon on the selected menu item.
		 */
		checkmark: PropTypes.bool,
		/**
		 * If no `children` are present, a default button will be rendered with an arrow. Import the module `slds-for-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the trigger button:
		 * ```
		 * <Dropdown>
		 * <Trigger>
		 * <Button iconCategory="utility" iconName="settings" />
		 * </Trigger>
		 * </Dropdown>
		 * ```
		 */
		children: PropTypes.node,
		collection: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
		/**
		 * Class names to be added to the dropdown menu, that is the element with the class `slds-dropdown`. To add additional CSS classes to the trigger wrapping tag or the trigger button, please reference the `children` prop, and pass use the `className` of respective React element.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Disables the trigger button and prevents the dropdown menu from opening.
		 */
		disabled: PropTypes.bool,
		/**
		 * End Of Life. Delay on menu closing. See `openOn`.
		 */
		hoverCloseDelay: PropTypes.number,
		/**
		 * End of Life. Please set the `icon` with a child of `Trigger`:
		 * ```
		 * <Dropdown>
		 * <Trigger>
		 * <Button iconCategory="utility" iconName="settings" />
		 * </Trigger>
		 * </Dropdown>
		 * ```
		 */
		icon: isIcon,
		/**
		 * Determines whether a menu item with an icon will display that icon on the left or the right.
		 */
		iconPosition: React.PropTypes.oneOf([
			'left',
			'right'
		]),
		/**
		 * Deprecated. Swapping icons feature of dropdown will be removed soon. Please use a `Picklist` instead.
		 */
		iconSwap: PropTypes.bool,
		/**
		 * Every dropdown must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string.isRequired,
		/**
		 * Deprecated. Please use a `MenuItem` child.
		 * ```
		 * <Dropdown>
		 * <Menu>
		 * <MenuItems>
		 * <MenuItem />
		 * </MenuItems>
		 * </Menu>
		 * </Dropdown>
		 * ```
		 */
		menuItemRenderer: PropTypes.func,
		/**
		 * Deprecated. Please use a `MenuItem` child.
		 * ```
		 * <Dropdown>
		 * <Menu>
		 * <MenuItems>
		 * <MenuItem />
		 * </MenuItems>
		 * </Menu>
		 * </Dropdown>
		 * ```
		 */
		listItemRenderer: PropTypes.func,
		/**
		 * Passed on to the default trigger, if using a custom trigger it's likely better to set there:
		 * ```
		 * <Dropdown>
		 * <Trigger>
		 * <Button text="Noice!" />
		 * </Trigger>
		 * </Dropdown>
		 * ```
		 */
		label: React.PropTypes.string,
		/**
		 * This function fires when the selection changes.
		 */
		onChange: PropTypes.func,
		/**
		 * End of Life. This function fires when the dropdown trigger is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * End of Life. This function fires when the selection is selected.
		 */
		onSelect: PropTypes.func,
		/**
		 * End of Life. This is an array of menu items. Please use `collection` instead.
		 */
		options: PropTypes.array,
		/**
		 * End of Life. Determines if dropdown opens on mouse hover or mouse click. All Dropdowns trigger on click.
		 */
		openOn: React.PropTypes.oneOf(['hover', 'click']),
		/**
		 * End of Life. Please use Picklist if you need the to update the label of the button.
		 */
		placeholder: PropTypes.string,
		/**
		 * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling.
		 */
		nubbinPosition: React.PropTypes.oneOf([
			'top left',
			'top',
			'top right',
			'bottom left',
			'bottom',
			'bottom right'
		]),
		/**
		 * End of Life. All Dropdown Triggers should have an indicator of the presence of a dropdown, unless it is an icon-more or icon-bare button style.
		 */
		renderArrow: PropTypes.bool,
		/**
		 * The selected item from the dropdown menu.
		 */
		selection: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		/**
		 * End of Life. Please set the tooltip with a child of Trigger:
		 * ```
		 * <Dropdown>
		 * <Trigger>
		 * <Button tooltip=NoiceElement />
		 * </Trigger>
		 * </Dropdown>
		 * ```
		 */
		tooltip: React.element
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(CONTROL, this.props);
		Positionable.setElement(this, Positionable.attachPositionedElementToBody({ classes: 'slds-dropdown' }));
		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	// ### Get Icon
	_getIcon () {
		const icons = {
			triggerIconCategory: 'utility',
			triggerIconName: 'down'
		};

		let icon;
		if (this.props.icon) {
			icon = this.props.icon;
		}

		if (this.props.swapIcon) {
			if (this.props.selection && this.props.selection.icon) {
				icon = this.props.selection.icon;
			} else if (this.props.selection && this.props.selection.iconCategory && this.props.selection.iconName) {
				icons.triggerIconCategory = this.props.selection.iconCategory;
				icons.triggerIconName = this.props.selection.iconName;
			}
		}

		if (icon) {
			const [
				category,
				name
			] = icon.split('.');

			icons.triggerIconCategory = category;
			icons.triggerIconName = name;
		}

		return icons;
	},

	// ### Render
	render () {
		// Trigger manipulation
		let CurrentTrigger = DefaultTrigger;
		let CustomTriggerChildProps = {};

		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		React.Children.forEach(this.props.children, (child) => {
			if (child && child.type.displayName === 'Trigger') {
				// `CustomTriggerChildProps` is not used by the default button Trigger, but by other triggers
				CustomTriggerChildProps = child.props;
				CurrentTrigger = child.type;
			}
		});

		// Property manipulation
		const menu = this._renderMenu();
		const triggerId = this._getTriggerId();
		const isOpen = Openable.isOpen(this);
		const triggerClassName = classNames('slds-dropdown-trigger', 'slds-dropdown-trigger--click', { 'slds-is-open': this.props.isOpen });
		const {
			triggerIconCategory,
			triggerIconName
		} = this._getIcon();

		return (
			<CurrentTrigger
				{...CustomTriggerChildProps}
				ariaExpanded = {isOpen}
				dropdownClassName = {this.props.className}
				id = {this.props.id}
				menu = {menu}
				onKeyDown = {this._handleKeyPressed}
				onKeyPress = {this._handleKeyPressed}
				onClick = {this._handleClicked}
				renderArrow = {this.props.renderArrow}
				triggerClassName = {triggerClassName}
				triggerIconCategory = {triggerIconCategory}
				triggerIconName = {triggerIconName}
				triggerId = {triggerId}
				/* Deprecated */
				assistiveText = {this.props.assistiveText}
				buttonClassName = {this.props.buttonClassName}
				buttonVariant = {this.props.buttonVariant}
				icon = {this.props.icon}
				iconSwap = {this.props.iconSwap}
				label = {this.props.label}
				triggerClicked = {this.props.onClick}
			/>
		);
	}
};

// ## Dropdown

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Dropdown extends its [core](../../core/dropdown.html),
// which in turn extends the base component.

let Dropdown = merge(
	{},
	PicklistCore,
	PicklistDefinition,
	DropdownDefinition
);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Dropdown = React.createClass(Dropdown);

export { DefaultTrigger as Trigger };

export default Dropdown;
