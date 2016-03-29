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
import runHelpers from 'slds-for-js-core/lib/runHelpers';
import deprecatedPropertyWarning from 'slds-for-js-core/lib/deprecatedPropertyWarning';
import sunsetPropertyWarning from 'slds-for-js-core/lib/sunsetPropertyWarning';

// Use the [shared core](../../core/dropdown.html), which contains logic that
// is shared across SLDS for JavaScript.
import DropdownCore, { CONTROL } from 'slds-for-js-core/components/dropdown';

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
import ReactDOM from 'react-dom';

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

// ### Children
// [PicklistItems](../picklist-items.html)
import PicklistItems from '../picklist/picklist-items';

// [DropdownTrigger](./button-trigger.html)
// This is the the default Dropdown Trigger. It expects one button as a child.
import DropdownTrigger from './button-trigger';

// [PicklistObject](../picklist.html)
import { PicklistDefinition } from '../picklist';

// Remove the need for `React.PropTypes`
const { PropTypes } = React;

// ## DropdownObject
export const DropdownDefinition = {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger.
		 */
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * Deprecated. Please set the `assistiveText` with a child of `DropdownTrigger`:
		 * ```
		 * <Dropdown>
		 *   <DropdownTrigger>
		 *     <Button assistiveText="Change settings" />
		 *   </DropdownTrigger>
		 * </Dropdown>
		 * ```
		 */
		assistiveText: React.PropTypes.string,
		/**
		 * Deprecated. Please set the `className` with a child of `DropdownTrigger`:
		 * ```
		 * <Dropdown>
		 *   <DropdownTrigger>
		 *     <Button className="slds-is-cool" />
		 *   </DropdownTrigger>
		 * </Dropdown>
		 * ```
		 */
		buttonClassName: PropTypes.string,
		/**
		 * Deprecated. Please set the `variant` with a child of `DropdownTrigger`:
		 * ```
		 * <Dropdown>
		 *   <DropdownTrigger>
		 *     <Button variant="brand" />
		 *   </DropdownTrigger>
		 * </Dropdown>
		 * ```
		 */
		buttonVariant: PropTypes.string,
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: PropTypes.bool,
		/**
		 * If no `children` are present, a default button will be rendered. Import the module `slds-for-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the trigger button:
		 * ```
		 * <Dropdown>
		 *   <DropdownTrigger>
		 *     <Button icon="utility.settings" />
		 *   </DropdownTrigger>
		 * </Dropdown>
		 * ```
		 */
		children: PropTypes.element,
		// > @todo Type of collection unknown until parsed by Data Adapter
		collection: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
		/**
		 * Class names added to dropdown menu, that is the element with the class `slds-dropdown`. To add additional CSS classes to the trigger wrapping tag or the trigger button, please reference the `children` prop.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Disables the trigger button and prevents the dropdown menu from opening.
		 */
		disabled: PropTypes.bool,
		/**
		 * Deprecated. Please set the `icon` with a child of `DropdownTrigger`:
		 * ```
		 * <Dropdown>
		 *   <DropdownTrigger>
		 *     <Button icon="utility.settings" />
		 *   </DropdownTrigger>
		 * </Dropdown>
		 * ```
		 */
		icon: isIcon,
		/**
		 * Deprecated. Please update your API to use `statefulIcon`.
		 */
		iconSwap: React.PropTypes.bool,
		/**
		 * Every dropdown must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string.isRequired,
		/**
		 * Function to be used to render an item in the menu. This is optional. Most use cases will not need a custom renderer.
		 */
		menuItemRenderer: PropTypes.element,
		/**
		 * Deprecated. Please use `menuItemRenderer` and pass in a function.
		 */
		listItemRenderer: PropTypes.func,
		/**
		 * Deprecated. Please pass in `text` to `<Button>` as a child. See `children` prop.
		 */
		label: React.PropTypes.string,
		/**
		 * This function fires when the selection changes.
		 */
		onChange: PropTypes.func,
		/**
		 * Deprecated. This function fires when the dropdown trigger is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * Deprecated. This function fires when the selection is selected.
		 */
		onSelect: PropTypes.func,
		/**
		 * Deprecated. This is an array of menu items.
		 */
		options: PropTypes.array,
		/**
		 * Deprecated. Determines if dropdown opens on mouse hover or mouse click
		 */
		openOn: React.PropTypes.oneOf(['hover', 'click']),
		/**
		 * Deprecated. Please use Picklist if you need the to update the label of the button.
		 */
		placeholder: PropTypes.string,
		/**
		 * Positions dropdown menu with a nubbin
		 */
		position: React.PropTypes.oneOf([
			'top left',
			'top',
			'top right',
			'bottom left',
			'bottom',
			'bottom right'
		]),
		/**
		 * The selected item from the dropdown menu.
		 */
		selection: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		/**
		 * The Button within DropdownTrigger is updated with the icon of the selected item.
		 */
		statefulIcon: PropTypes.bool
	},

	_checkDeprecations () {
		deprecatedPropertyWarning(CONTROL, this.props.swapIcon, 'swapIcon', 'statefulIcon');
		deprecatedPropertyWarning(CONTROL, this.props.listItemRenderer, 'listItemRenderer', 'menuItemRenderer');
		deprecatedPropertyWarning(CONTROL, this.props.onSelect, 'onSelect', 'onChange');
		deprecatedPropertyWarning(CONTROL, this.props.options, 'options', 'collection');
		deprecatedPropertyWarning(CONTROL, this.props.options, 'value', 'selection');

		sunsetPropertyWarning(CONTROL, this.props.openOn, 'openOn', 'The slds-dropdown-trigger class which allowed showing the dropdown menu on mouse hover was deprecated in SLDS v1.0.');
		sunsetPropertyWarning(CONTROL, this.props.hoverCloseDelay, 'hoverCloseDelay', 'The slds-dropdown-trigger class which allowed showing the dropdown menu on mouse hover was deprecated in SLDS v1.0.');
		sunsetPropertyWarning(CONTROL, this.props.renderArrow, 'renderArrow', 'All Dropdown Triggers should have an indicator of the presence of a dropdown, unless it is an icon-more or icon-bare button style.');

		// API has been moved to DropdownTrigger child
		sunsetPropertyWarning(CONTROL, this.props.onClick, 'onClick', 'Please set onClick with a child of DropdownTrigger: <Dropdown><DropdownTrigger><Button onClick={myCoolCallback} /></DropdownTrigger></Dropdown>');
		sunsetPropertyWarning(CONTROL, this.props.assistiveText, 'assistiveText', 'Please set assistiveText with a child of DropdownTrigger: <Dropdown><DropdownTrigger><Button assistiveText="Change settings" /></DropdownTrigger></Dropdown>');
		sunsetPropertyWarning(CONTROL, this.props.buttonClass, 'buttonClassName', 'Please set the className with a child of DropdownTrigger: <Dropdown><DropdownTrigger><Button className="slds-is-cool" /></DropdownTrigger></Dropdown>');
		sunsetPropertyWarning(CONTROL, this.props.icon, 'icon', 'Please set icon with a child of DropdownTrigger: <Dropdown><DropdownTrigger><Button icon="utility.settings" /></DropdownTrigger></Dropdown>');
		sunsetPropertyWarning(CONTROL, this.props.buttonVariant, 'buttonVariant', 'Please set `variant` with a child of DropdownTrigger: <Dropdown><DropdownTrigger><Button variant="brand" /></DropdownTrigger></Dropdown>');
		sunsetPropertyWarning(CONTROL, this.props.label, 'label', 'Please set the label with a child of DropdownTrigger: <Dropdown><DropdownTrigger><Button label="Noice!" /></DropdownTrigger></Dropdown>');
		sunsetPropertyWarning(CONTROL, this.props.tooltip, 'tooltip', 'Please set the label with a child of DropdownTrigger: <Dropdown><DropdownTrigger><Button label="Noice!" /></DropdownTrigger></Dropdown>');
		sunsetPropertyWarning(CONTROL, this.props.placeholder, 'placeholder', 'If a placeholder is needed and the text of the button will be updated. Please use a picklist.');
	},

	componentWillMount () {
		this._checkDeprecations();
		Positionable.setElement(this, Positionable.attachPositionedElementToBody({ classes: 'slds-dropdown' }));
		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	_onMenuRendered (element) {
		this.elements.menu = ReactDOM.findDOMNode(element);
		Positionable.setElement(this, ReactDOM.findDOMNode(element));
	},

	_renderMenu () {
		const isOpen = Openable.isOpen(this);
		const triggerId = this._getTriggerId();
		const menuItemRenderer = this.props.listItemRenderer || this.props.menuItemRenderer;

		return (
			<PicklistItems
				align={this.props.align}
				checkmark={this.props.checkmark}
				className={this.props.className}
				collection={this._collection}
				id={this._getMenuId()}
				getMenuItemId={this._getMenuItemId}
				labelledBy={triggerId}
				menuItemRenderer={menuItemRenderer}
				onSelected={this._handleMenuItemSelected}
				position={this.props.position}
				ref= {this._onMenuRendered}
				selection={this._getSelection()._item}
				show={isOpen || false}
			/>
		);
	},

	// ### Get Icon
	_getIcon () {
		let icon;

		if ((this.props.swapIcon || this.props.statefulIcon) && this.props.selection && this.props.selection.icon) {
			icon = this.props.selection.icon;
		}

		return icon;
	},

	// ### Render
	render () {
		// Trigger manipulation
		let Trigger = DropdownTrigger;
		let CustomTriggerChildProps = {};

		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		React.Children.map(this.props.children, (child) => {
			if (child.type.displayName === 'Trigger') {
				const CustomTriggerChild = React.cloneElement(child, {});
				// `CustomTriggerChildProps` is not used by the default Button Trigger, but by other triggers
				CustomTriggerChildProps = CustomTriggerChild.props;
				Trigger = CustomTriggerChild.type;
			}
		});

		// Property manipulation
		const menu = this._renderMenu();
		const triggerId = this._getTriggerId();
		const isOpen = Openable.isOpen(this);
		const triggerClassName = classNames('slds-dropdown-trigger', 'slds-dropdown-trigger--click', { 'slds-is-open': this.props.isOpen });

		return (
			<Trigger
				{...CustomTriggerChildProps}
				ariaExpanded      = {isOpen}
				dropdownClassName = {this.props.className}
				id                = {this.props.id}
				menu              = {menu}
				onKeyDown         = {this._handleKeyPressed}
				onKeyPress        = {this._handleKeyPressed}
				onClick           = {this._handleClicked}
				renderArrow       = {this.props.renderArrow}
				triggerClassName  = {triggerClassName}
				triggerIcon       = {this._getIcon()}
				triggerId         = {triggerId}
				/* deprecated */
				label             = {this.props.label}
				buttonClassName   = {this.props.buttonClassName}
				buttonVariant     = {this.props.buttonVariant}
				triggerClicked    = {this.props.onClick}
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
	DropdownCore,
	PicklistDefinition,
	DropdownDefinition
);

// `Helpers` are a feature of SLDS for React that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// Nothing in the component itself should ever depend on the presence
// of helpers, as they are completely optional.
Dropdown = runHelpers('react', CONTROL, Dropdown);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Dropdown = React.createClass(Dropdown);

export default Dropdown;
