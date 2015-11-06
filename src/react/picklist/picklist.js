// PICKLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PicklistCore, {CONTROL} from '../../core/picklist';

// Framework specific
import React from 'react';
import ReactDOM from 'react-dom';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
import Svg from '../svg/svg';
import Button from '../button/button';

// Children
import PicklistItems from './picklist-items';

export const PicklistObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		disabled: React.PropTypes.bool,
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
		const item = this._getSelection();
		const selectionName = item.getText() || this.state.strings.NONE_SELECTED;
		const styles = {
			width: this.state.width
		};

		return (
			<div aria-haspopup="true" aria-expanded={this.state.isOpen} className="slds-picklist" onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
				<Button
					className="slds-picklist__label"
					disabled={this.props.disabled}
					onClick={this._handleClicked}
					style={styles}
					theme="neutral">
					<span className="slds-truncate">{selectionName}</span>
					<Svg className="slds-icon" icon="utility.down" />
				</Button>
				<PicklistItems collection={this._collection} selection={this.getSelection()} show={this.state.isOpen} onSelected={this._handleMenuItemSelected} ref={this._setMenuRef} />
				<input className="slds-hide" readOnly aria-hidden="true" type="text"></input>
			</div>
		);
	},

	componentDidUpdate () {
		this._setMenuItemsRef();
	},
	
	_setMenuRef (menu) {
		this.elements.dropdownMenu = Lib.wrapElement(ReactDOM.findDOMNode(menu));
	},
	
	_setMenuItemsRef () {
		const menuItems = this.elements.dropdownMenu[0].getElementsByTagName('li');
		this.elements.menuItems = [];
		
		for (let i = 0; i < menuItems.length; i++) {
			const menuItem = menuItems[i].getElementsByTagName('a');

			if (!menuItems[i].disabled && menuItem.length === 1) {
				this.elements.menuItems.push(menuItem[0]);
			}
		}
	},

	_handleMenuItemSelected (selection) {
		this.setSelection(selection);
		this.close();
	},

	_handleClicked (e) {
		this._openToggleEvent(e.nativeEvent);
	},

	_handleKeyPressed (e) {
		if (e.key && (/(ArrowUp|ArrowDown|Escape)/.test(e.key) || e.key.length === 1)) {
			e.preventDefault();
			this._keyboardNav(e.key, this.elements.menuItems);
		}
	}
};

let Picklist = Lib.merge({}, PicklistCore, PicklistObject);

Picklist = Lib.runHelpers('react', CONTROL, Picklist);
Picklist = React.createClass(Picklist);

export default Picklist;
