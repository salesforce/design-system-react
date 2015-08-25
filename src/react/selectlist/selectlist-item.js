// Framework specific
import React from 'react';

const SelectlistItem = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired,
		type: React.PropTypes.string,
		text: React.PropTypes.string,
		disabled: React.PropTypes.bool.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},

	render () {
		let html;
		
		switch (this.props.type) {
		case 'header':
			html = <li className="slds-dropdown__header"><span className="slds-text-heading--label">{this.props.text}</span></li>;
			break;
		case 'divider':
			html = <li className="slds-dropdown__header"> - </li>;
			break;
		default:
			html = (
				<li className="slds-dropdown__item slds-has-icon--left slds-dropdown__item has-icon--left" role="menuitem option" tabIndex="0">
					<a href="#" onClick={this.handleClicked} tabIndex="-1" className="slds-truncate">{this.props.text}</a>
				</li>
			);
		}
		
		return html;
	},

	handleClicked (e) {
		e.preventDefault();
		this.props.onSelected(this.props.item);
	}
});

export default SelectlistItem;
