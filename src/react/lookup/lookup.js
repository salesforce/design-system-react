// # Lookup Control
// ### React Facade

// Implements the Lookup [design pattern](https://www.lightningdesignsystem.com/components/lookups) in React, with inherited functionality from Picklist.

// Bring in the [shared library functions](../lib/lib).
import * as Lib from '../../lib/lib';

// Use the [shared core](../../core/combobox), which contains logic that is the same in every facade.
import LookupCore, {CONTROL} from '../../core/lookup';

// Framework specific
import React from 'react';
import { PicklistObject } from '../picklist/picklist';

// Children
import PicklistItems from '../picklist/picklist-items';
import Button from '../button/button';
import Svg from '../svg/svg';

export const LookupObject = Lib.merge(PicklistObject, {
	propTypes: {
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		disabled: React.PropTypes.bool,
		onChanged: React.PropTypes.func,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object
		])
	},
	
	componentWillMount () {
		this.setState({
			inputId: Lib.uniqueId(CONTROL + '-input-')
		});
	},

	render () {
		const item = this._getSelection();
		const selectionName = item.getText();

		return (
		<div class="slds-lookup" data-select="multi" data-scope="single" data-typeahead="true">
			<div class="slds-form-element">
				<label class="slds-form-element__label" for={this.state.inputId}>Accounts</label>
				<div class="slds-form-element__control slds-input-has-icon slds-input-has-icon--right">
					<Svg icon="utility.search" className="slds-icon" />
					<input id={this.state.inputId} class="slds-input" type="text" aria-autocomplete="list" role="combobox" aria-expanded="true" aria-activedescendant="" onChange={this._handleChanged} />
				</div>
			</div>
			<div class="slds-lookup__menu" role="listbox">
				<div class="slds-lookup__item">
					<Button>
						<Svg icon="utility.search" className="slds-icon slds-icon-text-default slds-icon--small" />
						&quot;{selectionName}&quot; in Accounts
					</Button>
				</div>
				<PicklistItems collection={this._collection} selection={item} show={this.state.isOpen} onSelected={this._handleMenuItemSelected} />
				<div class="slds-lookup__item">
					<Button>
						<Svg icon="utility.add" className="slds-icon slds-icon-text-default slds-icon--small" />
						Add Account
					</Button>
				</div>
			</div>
		</div>
		);
	},
	
	_handleChanged (e) {
		const value = {};
		
		value[this.accessors.textProp()] = e.target.value;

		this.setSelection(value);
	}
});

let Lookup = Lib.merge({}, LookupCore, LookupObject);

Lookup = Lib.runHelpers('react', CONTROL, Lookup);
Lookup = React.createClass(Lookup);

export default Lookup;
