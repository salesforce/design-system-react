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

// Third party
import classNames from 'classnames';

// Children
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
		return this._collection.map((item, index) => {
			return (
				<PicklistItem key={index} item={item} onSelected={this._handleMenuItemSelected} />
			);
		});
	},

	render () {
		const icon = '<use xlink:href="/assets/design-system/icons/utility-sprite/svg/symbols.svg#down"></use>'; // react doesn't currently support xlink:href in a svg tag
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
			  <svg aria-hidden="true" className="slds-icon" dangerouslySetInnerHTML={{__html: icon}} />
			</button>
			<div className={classNames('slds-dropdown', 'slds-dropdown--left', 'slds-dropdown--small', 'lds-dropdown--menu', {'slds-hide': !this.state.isOpen})}>
			  <ul className="slds-dropdown__list" role="menu" style={styles} ref={this.cssClasses.MENU}>
				{this._menuItems()}
			  </ul>
			</div>
			<input className="slds-hide" readOnly aria-hidden="true" type="text"></input>
		  </div>
		</div>
		);
	},

	componentDidMount () {
		document.addEventListener('click', this._closeOnClick, false);
		this._findElements();
	},

	componentDidUpdate () {
		this._findElements();
	},

	componentWillUnmount () {
		document.removeEventListener('click', this._closeOnClick, false);
	},

	_findElements () {
		this.elements.dropdownMenu = Lib.wrapElement(ReactDOM.findDOMNode(this.refs[this.cssClasses.MENU]));

		this.elements.menuItems = [];
		const menuItems = this.elements.dropdownMenu[0].getElementsByTagName('li');

		for (let i = 0; i < menuItems.length; i++) {
			const menuItem = menuItems[i].getElementsByTagName('a');

			if (!menuItems[i].disabled && menuItem.length === 1) {
				this.elements.menuItems.push(menuItem[0]);
			}
		}
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
