// SELECTLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore from '../../core/selectlist';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

// Children
import SelectlistItem from './selectlist-item';

const Selectlist = React.createClass(Lib.merge({}, SelectlistCore, {
	mixins: [State, Events, genericWillMount],
	
	propTypes: {
		disabled: React.PropTypes.bool,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.object
		]),
		collection: React.PropTypes.any.isRequired,
		text: React.PropTypes.string
	},

	menuItems () {
		return this._collection.map((item, index) => {
			return (
				<SelectlistItem key={index} item={item} text={item.getText()} type={item.getType()} disabled={item.getDisabled()} onSelected={this._handleMenuItemSelected} />
			);
		});
	},

	render () {
		const item = this._getSelection();

		const selectionName = (item && item.getText()) || this.state.strings.NONE_SELECTED;
		
		const hiddenClass = {};
		hiddenClass[this.cssClasses.HIDDEN] = !this.state.isOpen;

		const openClass = {};
		openClass[this.cssClasses.OPEN] = this.state.isOpen;

		return (
			<div className={classNames(this.cssClasses.CONTROL)} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed} disabled={this.props.disabled}>
				<button className={classNames(this.cssClasses.BTN_DEFAULT, this.cssClasses.PICKLIST_LABEL)} aria-expanded={this.state.isOpen} onClick={this._handleClicked} disabled={this.props.disabled}>
					<span className={classNames(this.cssClasses.TRUNCATE)}>{selectionName}</span>
					<svg aria-hidden="true" className={classNames(this.cssClasses.ICON)} dangerouslySetInnerHTML={{__html: '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>'}}></svg>
				</button>
				<div className={classNames(this.cssClasses.MENU, hiddenClass)} hidden={!this.state.isOpen}>
					<ul className={classNames(this.cssClasses.DROPDOWN_LIST)} role="menu" ref={this.cssClasses.DROPDOWN_LIST}>
						{this.menuItems()}
					</ul>
				</div>
			</div>
		);
	},
	
	componentDidMount () {
		document.addEventListener('click', this._closeMenu, false);
		this._findElements();
	},
	
	componentDidUpdate () {
		this._findElements();
	},
	
	componentWillUnmount () {
		document.removeEventListener('click', this._closeMenu, false);
	},

	_findElements () {
		this.elements.dropdownMenu = Lib.wrapElement(React.findDOMNode(this.refs[this.cssClasses.DROPDOWN_LIST]));
		
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
		this.setState({
			isOpen: false
		});
	},

	_handleMenuItemSelected (selection) {
		this.setSelection(selection);
	},

	_closeMenu (e) {
		if (e.originator !== this) {
			this.setState({
				isOpen: false
			});
		}
	},
	
	_handleClicked (e) {
		e.nativeEvent.originator = this;
		
		if (!this.props.disabled) {
			this.setState({
				isOpen: !this.getState('isOpen')
			});
		}
	},

	_handleKeyPressed (e) {
		if (e.key && (/(ArrowUp|ArrowDown)/.test(e.key) || e.key.length === 1)) {
			e.preventDefault();
			this._keyboardNav(e.key, this.elements.menuItems);
		}
	}
}));

export default Selectlist;
