// COMBOBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Framework specific
import React from 'react';
import { PicklistObject } from '../picklist/picklist';

// Children
import PicklistItems from '../picklist/picklist-items';
import Button from '../button/button';
import Svg from '../svg/svg';

export const ComboboxObject = Lib.merge(PicklistObject, {
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

	render () {
		const item = this._getSelection();
		const selectionName = item.getText();

		return (
		<div className="slds-combobox slds-form-element">
			<div aria-expanded="true" className="slds-picklist">
				<Button size="small" iconStyle="icon-more picklist-label" theme="neutral" disabled={this.props.disabled} onClick={this._handleClicked}>
					<div className="slds-form-element__control">
						<input name={this.props.name} type="text" value={selectionName} disabled={this.props.disabled} onChange={this._handleChanged} className="slds-input" />
					</div>
					<Svg icon="utility.down" className="slds-icon" />
				</Button>
				<PicklistItems collection={this._collection} selection={this.getSelection()} show={this.state.isOpen} onSelected={this._handleMenuItemSelected} />
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

let Combobox = Lib.merge({}, ComboboxCore, ComboboxObject);

Combobox = Lib.runHelpers('react', CONTROL, Combobox);
Combobox = React.createClass(Combobox);

export default Combobox;
