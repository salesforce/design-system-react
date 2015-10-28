// PICKLIST ITEMS - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

// Children
import PicklistItem from './picklist-item';

const PicklistItems = React.createClass({
	propTypes: {
		show: React.PropTypes.bool.isRequired,
		onSelected: React.PropTypes.func.isRequired,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.object
		]),
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired
	},

	cssClasses: {
		DROPDOWN: 'slds-dropdown',
		LEFT: 'slds-dropdown--left',
		MENU: 'slds-dropdown--menu',
		LIST: 'slds-dropdown__list'
	},

	_menuItems () {
		return this.props.collection.map((item, index) => {
			return (
				<PicklistItem key={index} selected={item._item === this.props.selection} item={item} onSelected={this.props.onSelected} />
			);
		});
	},

	render () {
		return (
			<div className={classNames(this.cssClasses.DROPDOWN, this.cssClasses.LEFT, this.cssClasses.MENU, {'slds-hide': !this.props.show})}>
				<ul className={this.cssClasses.LIST} role="menu" ref={this.cssClasses.LIST}>
				{this._menuItems()}
				</ul>
			</div>
		);
	}
});

export default PicklistItems;
