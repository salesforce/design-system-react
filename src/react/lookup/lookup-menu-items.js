// LOOKUP MENU ITEMS - REACT FACADE

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export const CONTROL = 'lookup-menu-items';

const LookupMenuItems = React.createClass({
	displayName: CONTROL,

	propTypes: {
		activeDescendantId: React.PropTypes.string,
		collection: React.PropTypes.object.isRequired,
		getMenuItemId: React.PropTypes.func.isRequired,
		onSelected: React.PropTypes.func.isRequired,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		return (
			<ul className="slds-lookup__list" role="presentation" ref={this._setMenuRef}>
				{this.props.collection.map((item, index) => {
					const id = this.props.getMenuItemId(index);
					const isHighlighted = this.props.activeDescendantId === id;
					const renderer = item.getRenderer();
					
					return (
						<li id={id} key={index} className={classNames('slds-lookup__item', {'slds-theme--shade': isHighlighted})}>
							<a href="#" role="option" onClick={this._handleClicked.bind(this, item)} tabIndex="-1">
								{renderer({
									icon: item.getIcon(),
									text: item.getText(),
									item: item._item,
									strings: this.props.strings
								})}
							</a>
						</li>
					);
				})}
			</ul>
		);
	},
	
	_setMenuRef (menu) {
		this._menu = ReactDOM.findDOMNode(menu);
	},
	
	componentDidUpdate () {
		let _menuItem = this._menu.getElementsByClassName('slds-theme--shade');
		
		if (_menuItem && _menuItem.length === 1) {
			_menuItem = _menuItem[0];
			
			const menuHeight = this._menu.offsetHeight;
			
			const menuTop = this._menu.scrollTop;
			const menuItemTop = _menuItem.offsetTop;
			
			if (menuItemTop < menuTop) {
				this._menu.scrollTop = menuItemTop;
			} else {
				const menuBottom = menuTop + menuHeight + this._menu.offsetTop;
				const menuItemBottom = menuItemTop + _menuItem.offsetHeight;
				
				if (menuItemBottom > menuBottom) {
					this._menu.scrollTop = menuItemBottom - menuHeight;
				}
			}
		} else {
			this._menu.scrollTop = 0;
		}
	},

	_handleClicked (item, e) {
		e.preventDefault();
		this.props.onSelected(item);
	}
});

export default LookupMenuItems;
