// # Lookup Control
// ### React Facade

// Implements the Lookup [design pattern](https://www.lightningdesignsystem.com/components/lookups) in React, with inherited functionality from Picklist.

// Bring in the [shared library functions](../lib/lib).
import * as Lib from '../../lib/lib';

// Use the [shared core](../../core/combobox), which contains logic that is the same in every facade.
import LookupCore, {CONTROL} from '../../core/lookup';

// Third party
import classNames from 'classnames';

// Framework specific
import React from 'react';
import ReactDOM from 'react-dom';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Children
import LookupItem from './lookup-item';
import Svg from '../svg/svg';

let Lookup = Lib.merge({}, LookupCore, {
	mixins: [State, Events, genericWillMount],
	
	propTypes: {
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]),
		onChanged: React.PropTypes.func
	},
	
	getMenuItemId (index) {
		if (index >= 0) {
			return this.state.inputId + '-item-' + index;
		}
	},
	
	componentWillMount () {
		this.elements.menuItems = [];
		
		this.setState({
			inputId: Lib.uniqueId(CONTROL + '-input-')
		});
	},
	
	_renderInput (hasSelection, selectedItems) {
		const activeDescendantId = this.getMenuItemId(this.state.focusedIndex);
		
		return (
		<div className="slds-form-element">
			<label className="slds-form-element__label" htmlFor={this.state.inputId}>Accounts</label>
			<div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right" onClick={!hasSelection && this._handleClicked}>
				<Svg icon="utility.search" className="slds-input__icon" />
				{hasSelection && this._renderPills(selectedItems)}
				<input id={this.state.inputId} className={classNames('slds-input', { 'slds-hide': hasSelection })} type="text" aria-autocomplete="list" role="combobox" aria-expanded={this.state.isOpen} aria-activedescendant={activeDescendantId} onChange={this._handleChanged} value={this.state.searchString} ref={this._setInputRef} />
			</div>
		</div>
		);
	},
	
	_renderPills (selectedItems) {
		return (
		<div className="slds-pill-container slds-show">
			<span className="slds-pill slds-pill--bare">
				{selectedItems.map((item, index) => {
					return (
					<a key={index} href="#" className="slds-pill__label">
						<Svg icon="standard.account" className="slds-icon slds-icon-standard-account slds-icon--small" />
						{item.getText()}
					</a>
					);
				})}
				<button className="slds-button slds-button--icon-bare" onClick={this._handleDeselect}>
					<Svg icon="utility.close" className="slds-button__icon" />
					<span className="slds-assistive-text">Remove</span>
				</button>
			</span>
		</div>
		);
	},
	
	_renderMenuItems () {
		return this._collection.map((item, index) => {
			const id = this.getMenuItemId(index);
			
			return (
				<LookupItem id={id} key={id} item={item} onSelected={this._handleMenuItemSelected} />
			);
		});
	},

	render () {
		const selectedItems = this._getSelectedItems();
		const hasSelection = selectedItems.length() > 0;
		
		return (
		<div className={classNames('slds-lookup', { 'slds-has-selection': hasSelection })} data-select="single" data-scope="single" data-typeahead="true" onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
			{this._renderInput(hasSelection, selectedItems)}
			<div className={classNames('slds-lookup__menu', { 'slds-hide': !this.state.isOpen })} role="listbox">
				<div className="slds-lookup__item">
					<button className="slds-button">
						<Svg icon="utility.search" className="slds-icon slds-icon-text-default slds-icon--small" />
						&quot;{this.state.searchString}&quot; in Accounts
					</button>
				</div>
				<ul className="slds-lookup__list" role="presentation" ref={this._setMenuRef}>
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
	
	componentDidUpdate () {
		this._setMenuItemsRef();
	},
	
	_setMenuRef (menu) {
		this.elements.dropdownMenu = Lib.wrapElement(ReactDOM.findDOMNode(menu));
	},
	
	_setMenuItemsRef () {
		const menuItems = this.elements.dropdownMenu[0].getElementsByTagName('li');
		this.elements.menuItems = Array.prototype.map.call(menuItems, menuItem => {
			const anchor = menuItem.getElementsByTagName('a');
			if (anchor.length === 1) {
				return anchor[0];
			}
		});
	},
	
	_setInputRef (input) {
		this.elements.input = Lib.wrapElement(ReactDOM.findDOMNode(input));
	},
	
	_onSelected () {
		this.search('');
		this.close();
	},
	
	_onExpandOrCollapse () {
		this.setState({
			focusedIndex: this._defaultState.focusedIndex
		});
	},
	
	_handleMenuItemSelected (selection) {
		this._selectItem(selection);
	},
	
	_handleDeselect () {
		this.deselectAll();
	},
	
	_handleChanged (e) {
		this.search(e.target.value);
	},
	
	_handleClicked (e) {
		if (e) {
			e.nativeEvent.originator = this;
		}
		
		this.open();
	},

	_handleKeyPressed (e) {
		if (e.key && /(ArrowUp|ArrowDown|Escape)/.test(e.key)) {
			e.preventDefault();
			if (!this._keyboardNav(e.key, this.elements.menuItems)) {
				this.elements.input[0].focus();
			}
		} else if (e.key.length === 1) {
			if (!this.state.isOpen) this.open();
			this.elements.input[0].focus();
		}
	}
});

Lookup = Lib.runHelpers('react', CONTROL, Lookup);
Lookup = React.createClass(Lookup);

export default Lookup;
