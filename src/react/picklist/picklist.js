// PICKLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PicklistCore, {CONTROL} from '../../core/picklist';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
import Svg from '../svg/svg';

// Children
import PicklistItems from './picklist-items';
import PicklistItem from './picklist-item';

export const PicklistObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		disabled: React.PropTypes.bool,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.object
		]),
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired
	},

	_menuItems () {
		const selected = this.getSelection();

		return this._collection.map((item, index) => {
			return (
				<PicklistItem key={index} selected={item._item === selected} item={item} onSelected={this._handleMenuItemSelected} />
			);
		});
	},

	render () {
		const item = this._getSelection();
		const selectionName = item.getText() || this.state.strings.NONE_SELECTED;
		const styles = {
			width: this.state.width
		};

		return (
		<div className="slds-form-element">
			<div aria-expanded="true" className="slds-picklist" onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
			<button className="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true" style={styles} disabled={this.props.disabled} aria-expanded={this.state.isOpen} onClick={this._handleClicked}>
				<span className="slds-truncate">{selectionName}</span>
				<Svg className="slds-icon" icon="utility.down" />
			</button>
			<PicklistItems collection={this._collection} selection={this.getSelection()} show={this.state.isOpen} onSelected={this._handleMenuItemSelected} />
			<input className="slds-hide" readOnly aria-hidden="true" type="text"></input>
			</div>
		</div>
		);
	},

	componentDidMount () {
		document.addEventListener('click', this._closeOnClick, false);
	},

	componentWillUnmount () {
		document.removeEventListener('click', this._closeOnClick, false);
	},

	_onSelected () {
		this.close();
	},

	_handleMenuItemSelected (selection) {
		this.setSelection(selection);
	},

	_handleClicked (e) {
		this._openToggleEvent(e.nativeEvent);
	},

	_handleKeyPressed (e) {
		if (e.key && (/(ArrowUp|ArrowDown)/.test(e.key) || e.key.length === 1)) {
			e.preventDefault();
			this._keyboardNav(e.key, this.elements.menuItems);
		}
	}
};

let Picklist = Lib.merge({}, PicklistCore, PicklistObject);

Picklist = Lib.runHelpers('react', CONTROL, Picklist);
Picklist = React.createClass(Picklist);

export default Picklist;
