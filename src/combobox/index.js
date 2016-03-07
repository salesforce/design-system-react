/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Combobox Component --- SLDS for React

// A Combobox is similiar to the [Lookup component](/react/lookup). It is a dropdown menu paired with a text input form element, but allows any input.

// [![Combobox component example screenshot](/assets/demo-site/images/component-examples/combobox.png "See a live example of the Combobox component in action")](/react/combobox)

// > See a [live example](/react/combobox) of the Combobox component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from 'slds-for-js-core/lib';

// Use the [shared core](../../core/combobox.html), which contains logic that
// is shared across SLDS for JavaScript.
import ComboboxCore, { CONTROL } from 'slds-for-js-core-components/combobox';

// ### Traits

// #### KeyboardNavigable
// * [../../traits/keyboard-navigable.html](../../traits/keyboard-navigable.html)
import KeyboardNavigable from 'slds-for-js-core/traits/keyboard-navigable';

// #### Multiselectable
// * [../../traits/multiselectable](../../traits/multiselectable.html)
import Multiselectable from 'slds-for-js-core/traits/multiselectable';

// #### Openable
// * [../../traits/openable](../../traits/openable.html)
import Openable from 'slds-for-js-core/traits/openable';

// ### React and ReactDOM
// React and ReactDOM are external dependencies of the project.
import React from 'react';
import ReactDOM from 'react-dom';

// ### Children
// Split out some rendering logic, just to make things easier to read.
import { PicklistDefinition } from '../picklist';
import PicklistItems from '../picklist/picklist-items';

// The [Svg helper](../svg.html) for React provides a simple wrapper
// around the markup required for SVGs, and uses `Lib.getSVGPath` to convert
// strings in the format `sprite file`.`icon name` into full paths.
import Svg from '../svg';

// ## Combobox Object

export const ComboboxDefinition = {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName : CONTROL,

	// ### Prop Types
	propTypes   : {
		collection  : React.PropTypes.oneOfType([
				React.PropTypes.array,
				React.PropTypes.object
			]).isRequired,
		disabled    : React.PropTypes.bool,
		id          : React.PropTypes.string,
		onChanged   : React.PropTypes.func,
		selection   : React.PropTypes.oneOfType([
				React.PropTypes.string,
				React.PropTypes.object
			])
	},

	// ### Render
	render () {
		const item          = this._getSelection();
		const selectionName = item.getText();
		const isOpen        = Openable.isOpen(this);

		/* TODO: Icon is currently absolute positioned due to picklist wrapper picklist, but needs centering.
					Also, does not use Button component, because Button only supports ButtonViews as children right now. */
		return (
			<div aria-haspopup="true" aria-expanded={isOpen} className="slds-combobox slds-picklist" id={this.state.id} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
				<button className="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true" style={{paddingLeft: 0}} disabled={this.props.disabled} aria-expanded={isOpen} onClick={this._handleClicked}>
					<div className="slds-form-element__control">
						<input name={this.props.name} type="text" value={selectionName} disabled={this.props.disabled} onChange={this._handleChanged} className="slds-input" ref={this._setInputRef} />
					</div>
					<Svg className="slds-icon" style={{right: '.6rem'}} icon="utility.down" />
				</button>
				<PicklistItems id={this._getMenuId()} getMenuItemId={this._getMenuItemId} collection={this._collection} selection={item._item} show={isOpen} onSelected={this._handleMenuItemSelected} />
			</div>
		);
	},

	// ### Set Input Ref
	_setInputRef (input) {
		this.elements.input = Lib.wrapElement(ReactDOM.findDOMNode(input));
	},

	// ### Handle Changed
	_handleChanged (e) {
		const value = {};

		value[this.accessors.textProp()] = e.target.value;

		Multiselectable.selectItem(this, value);
	},

	// ### Handle Key Pressed
	_handleKeyPressed (e) {
		if (e.key && /(ArrowUp|ArrowDown|Escape|Enter)/.test(e.key)) {
			e.preventDefault();
			KeyboardNavigable.keyboardNav(this, e.key, this._keyboardSelect, this._collection);
		} else if (e.key.length === 1) {
			Openable.open(this);
			this.elements.input[0].focus();
		}
	}
};

// ## Combobox

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Combobox extends its [core](../../core/combobox.html),
// along with the ComboboxObject which itself merges the PicklistObject.

let Combobox = Lib.merge(
	{},
	ComboboxCore,
	PicklistDefinition,
	ComboboxDefinition
);

// ### Run the helpers

// `Helpers` are a feature of SLDS for React that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// Nothing in the component itself should ever depend on the presence
// of helpers, as they are completely optional.
Combobox = Lib.runHelpers('react', CONTROL, Combobox);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Combobox = React.createClass(Combobox);

export default Combobox;
