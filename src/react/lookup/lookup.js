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
import LookupItem from './lookup-item';
import Svg from '../svg/svg';

export const LookupObject = Lib.merge(PicklistObject, {
	propTypes: {
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
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
	
	_renderMenuItems () {
		return this._collection.map((item, index) => {
			return (
				<LookupItem key={index} item={item} onSelected={this._handleMenuItemSelected} />
			);
		});
	},

	render () {
		const selection = this._getSelection();
		const text = selection.getText();

		return (
		<div className="slds-lookup" data-select="multi" data-scope="single" data-typeahead="true">
			<div className="slds-form-element">
				<label className="slds-form-element__label" htmlFor={this.state.inputId}>Accounts</label>
				<div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right">
					<Svg icon="utility.search" className="slds-input__icon" />
					<input id={this.state.inputId} className="slds-input" type="text" aria-autocomplete="list" role="combobox" aria-expanded="true" aria-activedescendant="" onChange={this._handleChanged} value={text} />
				</div>
			</div>
			<div className="slds-lookup__menu" role="listbox" onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
				<div className="slds-lookup__item">
					<button className="slds-button">
						<Svg icon="utility.search" className="slds-icon slds-icon-text-default slds-icon--small" />
						&quot;{text}&quot; in Accounts
					</button>
				</div>
				<ul className="slds-lookup__list" role="presentation" ref={this._findElements}>
					{this._renderMenuItems()}
				</ul>
				<div className="slds-lookup__item">
					<button className="slds-button">
						<Svg icon="utility.add" className="slds-icon slds-icon-text-default slds-icon--small" />
						Add Account
					</button>
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
