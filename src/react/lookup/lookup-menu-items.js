// LOOKUP MENU ITEMS - REACT FACADE

// Framework specific
import React from 'react';

const LookupMenuItems = React.createClass({
	propTypes: {
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
					const renderer = item.getRenderer();
					
					return (
						<li id={id} key={index} className="slds-lookup__item">
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
