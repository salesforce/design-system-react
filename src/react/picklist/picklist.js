// PICKLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PicklistCore, {CONTROL} from '../../core/picklist';

// Traits
import Openable from '../../traits/openable';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
import Svg from '../svg/svg';
import Button from '../button/button';

// Children
import PicklistItems from './picklist-items';

export const PicklistObject = {
	mixins: [State, Events, genericWillMount],

	displayName: CONTROL,

	propTypes: {
		disabled: React.PropTypes.bool,
		id: React.PropTypes.string,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.object
		]),
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired
	},

	render () {
		const triggerId = this._getTriggerId();
		const item = this._getSelection();
		const selectionName = item.getText() || this.state.strings.NONE_SELECTED;
		const styles = {
			width: this.state.width
		};

		return (
			<div className="slds-picklist" id={this.state.id} aria-expanded={this.state.isOpen} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
				<Button
					id={triggerId}
					className="slds-picklist__label"
					disabled={this.props.disabled}
					onClick={this._handleClicked}
					style={styles}
					theme="neutral"
					aria-haspopup="true">
					<span className="slds-truncate">{selectionName}</span>
					<Svg className="slds-icon" icon="utility.down" />
				</Button>
				<PicklistItems id={this._getMenuId()} labelledBy={triggerId} getMenuItemId={this._getMenuItemId} collection={this._collection} selection={this.getSelection()} show={!!this.state.isOpen} onSelected={this._handleMenuItemSelected} />
			</div>
		);
	},

	_handleMenuItemSelected (selection) {
		this.setSelection(selection);
		Openable.close.call(this);
	},

	_handleClicked (e) {
		Openable.toggle.call(this, e.nativeEvent);
	},

	_handleKeyPressed (e) {
		if (e.key && (/(ArrowUp|ArrowDown|Escape)/.test(e.key) || e.key.length === 1)) {
			e.preventDefault();
			const focusedIndex = this._keyboardNav(e.key, this.setSelection);
			if (focusedIndex !== undefined) {
				document.getElementById(this._getMenuItemId(focusedIndex)).getElementsByTagName('a')[0].focus();
				console.log(document.getElementById(this._getMenuItemId(focusedIndex)));
			}
		}
	}
};

let Picklist = Lib.merge({}, PicklistCore, PicklistObject);

Picklist = Lib.runHelpers('react', CONTROL, Picklist);
Picklist = React.createClass(Picklist);

export default Picklist;
