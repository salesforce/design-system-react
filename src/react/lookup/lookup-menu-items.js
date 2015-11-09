// LOOKUP MENU ITEMS - REACT FACADE

import React from 'react';
import classNames from 'classnames';

const LookupMenuItems = React.createClass({
	propTypes: {
		activeDescendantId: React.PropTypes.string,
		collection: React.PropTypes.object.isRequired,
		getMenuItemId: React.PropTypes.func.isRequired,
		onSelected: React.PropTypes.func.isRequired,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		return (
			<ul className="slds-lookup__list" role="presentation">
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

	_handleClicked (item, e) {
		e.preventDefault();
		this.props.onSelected(item);
	}
});

export default LookupMenuItems;
