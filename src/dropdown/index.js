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

// [Trigger](./button-trigger.html)
import ButtonTrigger from './button-trigger';

// [PicklistObject](../picklist.html)
import { PicklistDefinition } from '../picklist';

// ## DropdownObject
export const DropdownDefinition = {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		align: React.PropTypes.oneOf(['left', 'right']),
		/**
		 * If true, renders checkmark icon on the selected Menu Item.
		 */
		checkmark: React.PropTypes.bool,
		// > @todo Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
		/**
		 * Class name assigned to the container element (this element also has `slds-dropdown-trigger slds-dropdown-trigger--click` classes)
		 */
		className: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object, React.PropTypes.string]),
		disabled: React.PropTypes.bool,
		icon: isIcon,
		id: React.PropTypes.string,
		onChange: React.PropTypes.func,
		selection: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])
	},

	_checkDeprecations () {
		deprecatedPropertyWarning(CONTROL, this.props.theme, 'theme', 'variant');
		sunsetPropertyWarning(CONTROL, this.props.swapIcon, 'swapIcon');
		sunsetPropertyWarning(CONTROL, this.props.swapIcon, 'renderArrow');
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

		return (
			<PicklistItems
				ref= {this._onMenuRendered}
				align={this.props.align}
				checkmark={this.props.checkmark}
				id={this._getMenuId()}
				labelledBy={triggerId}
				getMenuItemId={this._getMenuItemId}
				collection={this._collection}
				selection={this._getSelection()._item}
				show={isOpen || false}
				onSelected={this._handleMenuItemSelected}
			/>
		);
	},

	// ### Get Icon
	_getIcon () {
		let icon;

		if (this.props.swapIcon && this.props.selection) {
			icon = this.props.selection.icon;
		}

		return icon || this.props.icon;
	},

	// ### Get Style
	_getStyle () {
		let style = 'icon-border';
		if (this.props.swapIcon && this.props.renderArrow) {
			style = 'icon-more';
		}
		return style;
	},

	// ### Render
	render () {
		// Trigger manipulation
		let Trigger = ButtonTrigger;
		let CustomTriggerChildProps = {};

		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		React.Children.map(this.props.children, (child) => {
			if (child.type.displayName === 'Trigger') {
				const CustomTriggerChild = React.cloneElement(child, {});
				CustomTriggerChildProps = CustomTriggerChild.props;
				Trigger = CustomTriggerChild.type;
			}
		});

		// Property manipulation
		const menu = this._renderMenu();
		const triggerId = this._getTriggerId();
		const isOpen = Openable.isOpen(this);

		return (
			<Trigger
				ariaHaspopup
				ariaExpanded={isOpen}
				className={classNames('slds-dropdown-trigger', 'slds-dropdown-trigger--click', { 'slds-is-open': this.props.isOpen })}
				id={this.props.id}
				menu={menu}
				onKeyDown={this._handleKeyPressed}
				onKeyPress={this._handleKeyPressed}
				onClick={this._handleClicked}
				renderArrow={this.props.renderArrow}
				swapIcon={this.props.swapIcon}
				triggerId={triggerId}
				{...CustomTriggerChildProps}
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
