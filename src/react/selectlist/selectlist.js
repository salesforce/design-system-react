// SELECTLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import SelectlistCore, {CONTROL} from '../../core/selectlist';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

// Children
import SelectlistItem from './selectlist-item';

export const SelectlistObject = {
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
				<SelectlistItem key={index} item={item} onSelected={this._handleMenuItemSelected} />
			);
		});
	},

	render () {
		const item = this._getSelection();
		const selectionName = item.getText() || this.state.strings.NONE_SELECTED;

		const styles = {
			width: this.state.width
		};

		const disabledClass = {};
		disabledClass[this.cssClasses.DISABLED] = this.props.disabled;

		const openClass = {};
		openClass[this.cssClasses.OPEN] = this.state.isOpen;

		return (
			<div className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP, disabledClass, openClass)} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
				<button className={classNames(this.cssClasses.BTN_DEFAULT, this.cssClasses.TOGGLE, disabledClass)} type="button" disabled={this.props.disabled} style={styles} aria-haspopup="true" aria-expanded={this.state.isOpen} onClick={this._handleClicked}>
					<span className={this.cssClasses.LABEL}>{selectionName}</span>
					<span className={this.cssClasses.CARET}></span>
					<span className={this.cssClasses.SR_ONLY}>{this.state.strings.TOGGLE_DROPDOWN}</span>
				</button>
				<ul className={this.cssClasses.MENU} role="menu" style={styles} ref={this.cssClasses.MENU}>
					{this._menuItems()}
				</ul>
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
		this.elements.dropdownMenu = Lib.wrapElement(React.findDOMNode(this.refs[this.cssClasses.MENU]));

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

let Selectlist = Lib.merge({}, SelectlistCore, SelectlistObject);

Selectlist = Lib.runHelpers('react', CONTROL, Selectlist);
Selectlist = React.createClass(Selectlist);

export default Selectlist;
