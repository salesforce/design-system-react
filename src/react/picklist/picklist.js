// PICKLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import PicklistCore, {CONTROL} from '../../core/picklist';

// Traits
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
		selection: React.PropTypes.oneOfType([
			React.PropTypes.object
		]),
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired
	},

	componentWillMount () {
		Positionable.setElement(this, Positionable.attachPositionedElementToBody('slds-picklist'));
	},

	componentWillUnmount () {
		if (this.props.modalMenu) {
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
			<div className="slds-picklist" id={this.state.id} aria-expanded={isOpen} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
				<Button
					id={triggerId}
					className="slds-picklist__label"
					disabled={this.props.disabled}
					onClick={this._handleClicked}
					ref={this.onButtonRendered}
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
				selection={this.getSelection()}
				show={isOpen}
				onSelected={this._handleMenuItemSelected} />
		);

		return menu;
	},

	onButtonRendered (element) {
		Positionable.setTarget(this, ReactDOM.findDOMNode(element));
	},

	// Modal dropdown menus' parent is `body` and are absolutely positioned in order to visually attach the dropdown to the input.
	_renderModalMenu () {
		const menu = this._renderMenu();
		ReactDOM.render(menu, Positionable.getElement(this));
		Positionable.setContainer(this, document.querySelector('body'));
		Positionable.position(this);
	},

	_handleMenuItemSelected (selection) {
		this.setSelection(selection);
		Openable.close(this);
	},

	_handleClicked (e) {
		Openable.toggle(this, e.nativeEvent);
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
	},

	_onOpened () {
		Positionable.show(this);
	},

	_onClosed () {
		Positionable.hide(this);
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
	}
};

let Picklist = Lib.merge({}, PicklistCore, PicklistObject);

Picklist = Lib.runHelpers('react', CONTROL, Picklist);
Picklist = React.createClass(Picklist);

export default Picklist;
