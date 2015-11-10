// PICKLIST ITEMS - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

// Children
import PicklistItem from './picklist-item';

export const CONTROL = 'picklist-items';

const PicklistItems = React.createClass({
	displayName: CONTROL,

	propTypes: {
		// TODO: Type of collection unknown until parsed by Data Adapter
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		id: React.PropTypes.string,
		getMenuItemId: React.PropTypes.func.isRequired,
		labelledBy: React.PropTypes.string,
		onSelected: React.PropTypes.func.isRequired,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.object
		]),
		show: React.PropTypes.bool.isRequired
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
			<div className={classNames('slds-dropdown', 'slds-dropdown--left', 'slds-dropdown--menu', {'slds-hide': !this.props.show})} id={this.props.id}>
				<ul className="slds-dropdown__list" role="menu" aria-labelledby={this.props.labelledBy}>
				{this._menuItems()}
				</ul>
			</div>
		);
	}
});

export default PicklistItems;
