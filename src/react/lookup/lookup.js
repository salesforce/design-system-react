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
import LookupButton from './lookup-button';
import LookupMenuItem from './lookup-menu-item';
import LookupPill from './lookup-pill';
import Svg from '../svg/svg';

let Lookup = Lib.merge({}, LookupCore, {
	mixins: [State, Events, genericWillMount],
	
	propTypes: {
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		label: React.PropTypes.string.isRequired,
		menuFooterElement: React.PropTypes.element,
		menuHeaderElement: React.PropTypes.element,
		menuItemElement: React.PropTypes.element,
		onAddClick: React.PropTypes.func,
		onChanged: React.PropTypes.func,
		onFilter: React.PropTypes.func,
		pillElement: React.PropTypes.element,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		])
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
			<label className="slds-form-element__label" htmlFor={this.state.inputId}>{this.props.label}</label>
			<div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right" onClick={!hasSelection && this._handleClicked}>
				<Svg icon="utility.search" className="slds-input__icon" />
				{hasSelection && this._renderPillContainer(selectedItems)}
				<input id={this.state.inputId} className={classNames('slds-input', { 'slds-hide': hasSelection })} type="text" aria-autocomplete="list" role="combobox" aria-expanded={this.state.isOpen} aria-activedescendant={activeDescendantId} onChange={this._handleChanged} value={this.state.searchString} ref={this._setInputRef} />
			</div>
		</div>
		);
	},
	
	_renderPillContainer (selectedItems) {
		return (
		<div className="slds-pill-container slds-show">
			<span className="slds-pill slds-pill--bare">
				{this._renderPills(selectedItems)}
				<button className="slds-button slds-button--icon-bare" onClick={this._handleDeselect}>
					<Svg icon="utility.close" className="slds-button__icon" />
					<span className="slds-assistive-text">Remove</span>
				</button>
			</span>
		</div>
		);
	},
	
	_renderPills (selectedItems) {
		return selectedItems.map((item, index) => {
			const props = { item, key: index };
			let element;
			
			if (this.props.pillElement) {
				element = React.cloneElement(this.props.pillElement, props);
			} else {
				element = <LookupPill {...props} />;
			}
			
			return element;
		});
	},
	
	_renderMenu () {
		return (
		<div className={classNames('slds-lookup__menu', { 'slds-hide': !this.state.isOpen })} role="listbox">
			{this._renderMenuHeader()}
			<ul className="slds-lookup__list" role="presentation" ref={this._setMenuRef}>
				{this._renderMenuItems()}
			</ul>
			{this._renderMenuFooter()}
		</div>
		);
	},
	
	_renderMenuButton (props, menuButtonElement) {
		let element;
		
		if (menuButtonElement) {
			element = React.cloneElement(menuButtonElement, props);
		} else {
			element = <LookupButton {...props} />;
		}
		
		return element;
	},
	
	_renderMenuHeader () {
		const props = {
			icon: 'utility.search',
			label: '"' + this.state.searchString + '" in ' + this.props.label
		};
		
		return this._renderMenuButton(props, this.props.menuHeaderElement);
	},
	
	_renderMenuFooter () {
		const props = {
			icon: 'utility.add',
			label: 'Add',
			onClick: this.props.onAddClick
		};
		
		return this._renderMenuButton(props, this.props.menuFooterElement);
	},
	
	_renderMenuItems () {
		return this._collection.map((item, index) => {
			const id = this.getMenuItemId(index);
			const props = { item, id, onSelected: this._handleMenuItemSelected, key: index };
			let element;
			
			if (this.props.menuItemElement) {
				element = React.cloneElement(this.props.menuItemElement, props);
			} else {
				element = <LookupMenuItem {...props} />;
			}
			
			return element;
		});
	},

	render () {
		const selectedItems = this._getSelectedItems();
		const hasSelection = selectedItems.length() > 0;
		
		return (
		<div className={classNames('slds-lookup', { 'slds-has-selection': hasSelection })} data-select="single" data-scope="single" data-typeahead="true" onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
			{this._renderInput(hasSelection, selectedItems)}
			{this._renderMenu(hasSelection)}
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
