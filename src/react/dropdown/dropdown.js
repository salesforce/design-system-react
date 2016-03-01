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
import * as Lib                from '../../lib/lib';

// Use the [shared core](../../core/dropdown.html), which contains logic that
// is the same in every facade.
import DropdownCore, {CONTROL} from '../../core/dropdown';

// ### Traits

// #### Openable
// * [../../traits/openable](../../traits/openable.html)
import Openable                from '../../traits/openable';

// ### React
// React is an external dependency of the project.
import React                   from 'react';

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

// #### Is Icon
// The [isIcon mixin](../mixins/custom-prop-types/icon.html) for React to
// checks whether a prop provides an icon format
import isIcon                  from '../mixins/custom-prop-types/icon.js';

// ### Children
// [PicklistItems](../picklist/picklist-items.html)
import PicklistItems           from '../picklist/picklist-items';

// [Button](../button/button.html)
import Button                  from '../button/button';

// [PicklistObject](../picklist/picklist.html)
import { PicklistObject }      from '../picklist/picklist';

// ## DropdownObject
export const DropdownObject = Lib.merge(PicklistObject, {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		align: React.PropTypes.oneOf(['left', 'right']),
		// > @todo Type of collection unknown until parsed by Data Adapter
		collection  : React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		disabled    : React.PropTypes.bool,
		icon        : isIcon,
		id          : React.PropTypes.string,
		renderArrow : React.PropTypes.bool,
		selection   : React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object
		]),
		swapIcon    : React.PropTypes.bool
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
		return this.props.renderArrow ? 'icon-more' : 'icon-container';
	},

	// ### Render
	render () {
		const isOpen = Openable.isOpen(this);
		const triggerId = this._getTriggerId();

		return (
			<div className={"slds-dropdown-trigger slds-dropdown-trigger--click"}
					id={this.state.id}
					aria-expanded={isOpen}
					onKeyDown={this._handleKeyPressed}
					onKeyPress={this._handleKeyPressed}>
				<Button
					className=""
					id={triggerId}
					icon={this._getIcon()}
					iconStyle={this._getStyle()}
					disabled={this.props.disabled}
					onClick={this._handleClicked}
					aria-haspopup="true" />
				<PicklistItems
					align={this.props.align}
					id={this._getMenuId()}
					labelledBy={triggerId}
					getMenuItemId={this._getMenuItemId}
					collection={this._collection}
					selection={this._getSelection()._item}
					show={ isOpen && !this.props.disabled}
					onSelected={this._handleMenuItemSelected}/>
			</div>
		);
	}
});

// ## Dropdown

// Façades **extends objects** by merging them together, rather than via the
// prototype chain or imitation of object-oriented inheritance. The important
// thing to remember is that _some methods will be available to the component
// which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Dropdown extends its [core](../../core/dropdown.html),
// which in turn extends the base component.

let Dropdown = Lib.merge(
	{},
	DropdownCore,
	DropdownObject
);

// `Helpers` are a feature of Façades that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// For example, the jQuery facade uses this mechanism to optionally create
// jQuery plug-in versions of each component. Nothing in the component itself
// should ever depend on the presence of helpers, as they are completely
// optional.
Dropdown = Lib.runHelpers('react', CONTROL, Dropdown);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Dropdown = React.createClass(Dropdown);

export default Dropdown;
