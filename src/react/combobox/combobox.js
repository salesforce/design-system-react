// COMBOBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Traits
import Eventable from '../../traits/eventable';
import Openable from '../../traits/openable';
import KeyboardNavigable from '../../traits/keyboard-navigable';

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

	componentWillMount () {
		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
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
				<PicklistItems id={this._getMenuId()} getMenuItemId={this._getMenuItemId} collection={this._collection} selection={this.getSelection()} show={isOpen} onSelected={this._handleMenuItemSelected} />
			</div>
		);
	},
	
	_setInputRef (input) {
		this.elements.input = Lib.wrapElement(ReactDOM.findDOMNode(input));
	},
	
	_handleChanged (e) {
		const value = {};
		
		value[this.accessors.textProp()] = e.target.value;

		this.setSelection(value);
	},
	
	_handleKeyPressed (e) {
		if (e.key && /(ArrowUp|ArrowDown|Escape|Enter)/.test(e.key)) {
			e.preventDefault();
			KeyboardNavigable.keyboardNav(this, e.key, this.setSelection, this._collection);
		} else if (e.key.length === 1) {
			Openable.open(this);
			this.elements.input[0].focus();
		}
	},

	_onSelect (itemsToSelect, selection) {
		if (Lib.isFunction(this.props.onSelect)) {
			this.props.onSelect(itemsToSelect, selection._data);
		}
		
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	},

	_onDeselect (itemsToDeselect, selection) {
		if (Lib.isFunction(this.props.onDeselect)) {
			this.props.onDeselect(itemsToDeselect, selection._data);
		}
		
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	}
});

let Combobox = Lib.merge({}, ComboboxCore, ComboboxObject);

Combobox = Lib.runHelpers('react', CONTROL, Combobox);
Combobox = React.createClass(Combobox);

export default Combobox;
