/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// COMBOBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Traits
import Openable from '../../traits/openable';
import KeyboardNavigable from '../../traits/keyboard-navigable';
import Multiselectable from '../../traits/multiselectable';

// Framework specific
import React from 'react';
import ReactDOM from 'react-dom';
import { PicklistObject } from '../picklist/picklist';

// Children
import PicklistItems from '../picklist/picklist-items';
import Svg from '../svg/svg';

export const ComboboxObject = Lib.merge(PicklistObject, {
	displayName: CONTROL,
	
	propTypes: {
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		disabled: React.PropTypes.bool,
		id: React.PropTypes.string,
		onChanged: React.PropTypes.func,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object
		])
	},

	render () {
		const item = this._getSelection();
		const selectionName = item.getText();
		const isOpen = Openable.isOpen(this);

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
	
	_setInputRef (input) {
		this.elements.input = Lib.wrapElement(ReactDOM.findDOMNode(input));
	},
	
	_handleChanged (e) {
		const value = {};
		
		value[this.accessors.textProp()] = e.target.value;

		Multiselectable.selectItem(this, value);
	},
	
	_handleKeyPressed (e) {
		if (e.key && /(ArrowUp|ArrowDown|Escape|Enter)/.test(e.key)) {
			e.preventDefault();
			KeyboardNavigable.keyboardNav(this, e.key, this._keyboardSelect, this._collection);
		} else if (e.key.length === 1) {
			Openable.open(this);
			this.elements.input[0].focus();
		}
	}
});

let Combobox = Lib.merge({}, ComboboxCore, ComboboxObject);

Combobox = Lib.runHelpers('react', CONTROL, Combobox);
Combobox = React.createClass(Combobox);

export default Combobox;
