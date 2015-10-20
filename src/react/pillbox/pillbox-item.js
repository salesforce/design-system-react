// Framework specific
import React from 'react';

const PillboxItem = React.createClass({

	propTypes: {
		item: React.PropTypes.object,
		onClick: React.PropTypes.func.isRequired
	},

	render () {
		return (
			<li className="slds-pill">
				<span href="#" className="slds-pill__label">{this.props.item.getText()}</span>
				<button className="slds-button slds-button--icon-bare" onClick={this._onClick}>
					<svg
						aria-hidden="true"
						className="slds-button__icon"
						dangerouslySetInnerHTML={{__html: '<use xlink:href="/examples/symbols.svg#close"></use>'}} >
					</svg>
					<span className="slds-assistive-text">Remove</span>
				</button>
			</li>
		);
	},

	_onClick () {
		this.props.onClick(this.props.item);
	}
});

export default PillboxItem;
