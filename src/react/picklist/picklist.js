// PICKLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PicklistCore, {CONTROL} from '../../core/picklist';

// Traits
import Eventable from '../../traits/eventable';
import KeyboardNavigable from '../../traits/keyboard-navigable';
import Multiselectable from '../../traits/multiselectable';
import Openable from '../../traits/openable';
import Positionable from '../../traits/positionable';

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

	displayName: CONTROL,

	propTypes: {
		disabled: React.PropTypes.bool,
		id: React.PropTypes.string,
		modalMenu: React.PropTypes.bool,
		selection: React.PropTypes.object,
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired
	},

	componentWillMount () {
		Positionable.setElement(this, Positionable.attachPositionedElementToBody({classes: 'slds-picklist'}));
		
		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	componentWillUnmount () {
		if (this.props.modalMenu) {
			Positionable.removeEventListeners(this);
		}
	},
	
	componentDidUpdate () {
		if (this.props.modalMenu) {
			this._renderModalMenu();
		}
		
		const isOpen = Openable.isOpen(this);

		if (this.props.modalMenu && isOpen) {
			Positionable.addEventListeners(this);
		} else if (this.props.modalMenu && !isOpen) {
			Positionable.removeEventListeners(this);
		}
	},

	render () {
		const triggerId = this._getTriggerId();
		const item = this._getSelection();
		const isOpen = Openable.isOpen(this);
		const selectionName = item.getText() || this.state.strings.NONE_SELECTED;
		const styles = {
			width: this.state.width
		};

		return (
			<div className="slds-picklist"
				id={this.state.id}
				aria-expanded={isOpen}
				onKeyDown={this._handleKeyPressed}
				onKeyPress={this._handleKeyPressed}>
				<Button
					id={triggerId}
					className="slds-picklist__label"
					disabled={this.props.disabled}
					onClick={this._handleClicked}
					ref={this._onButtonRendered}
					style={styles}
					theme="neutral"
					aria-haspopup="true">
					<span className="slds-truncate">{selectionName}</span>
					<Svg className="slds-icon" icon="utility.down" />
				</Button>
				{this.props.modalMenu ? null : this._renderMenu()}
			</div>
		);
	},

	_renderMenu () {
		const isOpen = Openable.isOpen(this);
		const triggerId = this._getTriggerId();

		const menu = (
			<PicklistItems
				id={this._getMenuId()}
				labelledBy={triggerId}
				getMenuItemId={this._getMenuItemId}
				collection={this._collection}
				selection={this.props.selection}
				show={isOpen}
				onSelected={this._handleMenuItemSelected} />
		);

		return menu;
	},

	// Modal dropdown menus' parent is `body` and are absolutely positioned in order to visually attach the dropdown to the input.
	_renderModalMenu () {
		const menu = this._renderMenu();
		ReactDOM.render(menu, Positionable.getElement(this));
		Positionable.setContainer(this, document.querySelector('body'));
		Positionable.position(this);
	},

	_handleMenuItemSelected (selection) {
		Multiselectable.selectItem(this, selection._item);
		Openable.close(this);
	},

	_handleClicked (e) {
		Openable.toggle(this, e.nativeEvent);
	},

	_keyboardSelect (item) {
		Multiselectable.selectItem(this, item._item, [this.props.selection]);
	},

	_handleKeyPressed (e) {
		if (e.key && (/(ArrowUp|ArrowDown|Escape)/.test(e.key) || e.key.length === 1)) {
			e.preventDefault();
			const focusedIndex = KeyboardNavigable.keyboardNav(this, e.key, this._keyboardSelect, this._collection);
			if (focusedIndex !== undefined) {
				document.getElementById(this._getMenuItemId(focusedIndex)).getElementsByTagName('a')[0].focus();
			}
		}
	},
	
	_onButtonRendered (element) {
		this.elements.button = ReactDOM.findDOMNode(element);
		Positionable.setTarget(this, ReactDOM.findDOMNode(element));
	},

	_onOpened () {
		this.elements.control.addClass('slds-is-open');
		Positionable.show(this);
	},

	_onClosed () {
		this.elements.control.removeClass('slds-is-open');
		Positionable.hide(this);
	},
	
	_getSelection () {
		let item = this._collection.findWhere(this.props.selection);
		
		if (!item) {
			item = this._getItemAdapter(this.props.selection);
		}
		
		return item;
	},

	_onSelect (itemsToSelect, selection) {
		if (Lib.isFunction(this.props.onSelect)) {
			this.props.onSelect(selection.at(0));
		}

		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection.at(0));
		}

		Lib.returnFocusToPopupTrigger(this);
	},

	_onDeselect (itemsToDeselect, selection) {
		if (Lib.isFunction(this.props.onDeselect)) {
			this.props.onDeselect(selection.at(0));
		}
		
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection.at(0));
		}
	}
};

let Picklist = Lib.merge({}, PicklistCore, PicklistObject);

Picklist = Lib.runHelpers('react', CONTROL, Picklist);
Picklist = React.createClass(Picklist);

export default Picklist;
