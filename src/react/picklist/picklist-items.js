// PICKLIST ITEMS - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

// Children
import PicklistItem from './picklist-item';

const PicklistItems = React.createClass({
	propTypes: {
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		id: React.PropTypes.string,
		getMenuItemId: React.PropTypes.func.isRequired,
		onSelected: React.PropTypes.func.isRequired,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.object
		]),
		show: React.PropTypes.bool.isRequired
	},

	cssClasses: {
		DROPDOWN: 'slds-dropdown',
		LEFT: 'slds-dropdown--left slds-dropdown--small',
		MENU: 'slds-dropdown--menu',
		LIST: 'dropdown__list'
	},

	_menuItems () {
		return this.props.collection.map((item, index) => {
			return (
				<PicklistItem id={this.props.getMenuItemId(index)} key={index} selected={item._item === this.props.selection} item={item} onSelected={this.props.onSelected} />
			);
		});
	},

	render () {
		return (
			<div className={classNames(this.cssClasses.DROPDOWN, this.cssClasses.LEFT, {'slds-hide': !this.props.show})} id={this.props.id}>
				<ul className={this.cssClasses.LIST} role="menu" ref={this.cssClasses.LIST}>
				{this._menuItems()}
				</ul>
			</div>
		);
	}
});

export default PicklistItems;
