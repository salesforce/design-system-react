// Framework specific
import React from 'react';

const SelectlistItem = React.createClass({

	cssClasses: {
		HEADER: 'slds-dropdown__header',
		HEADERTEXT: 'slds-text-heading--label',
		DIVIDER: 'slds-has-divider'
	},

	propTypes: {
		item: React.PropTypes.object.isRequired,
		onSelected: React.PropTypes.func.isRequired
	},

	render () {
		let html;

		switch (this.props.item.getType()) {
			case 'header':
				html = <li className={this.cssClasses.HEADER}><span className={this.cssClasses.HEADERTEXT}>{this.props.item.getText()}</span></li>;
				break;
			case 'divider':
				html = <li className={this.cssClasses.DIVIDER}></li>;
				break;
			default:
				const disabled = this.props.item.getDisabled();
			
				html = (
					<li className="slds-dropdown__item slds-has-icon--left" disabled={disabled}>
					<a href="#" className="slds-truncate" onClick={this.handleClicked}>{this.props.item.getText()}</a>
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
