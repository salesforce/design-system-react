// LOOKUP PILL - REACT FACADE

// Framework specific
import React from 'react';
import Svg from '../svg/svg';

const LookupPills = React.createClass({
	propTypes: {
		onDeselect: React.PropTypes.func.isRequired,
		renderer: React.PropTypes.func.isRequired,
		selectedItems: React.PropTypes.object.isRequired,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		return (
			<div className="slds-pill-container slds-show">
				<span className="slds-pill slds-pill--bare">
					{this.props.selectedItems.map((item, index) => {
						return (
							<a key={index} href="#" className="slds-pill__label" onClick={this._handlePillClick.bind(this, item)}>
								{this.props.renderer({
									icon: item.getIcon(),
									text: item.getText(),
									item: item._item,
									strings: this.props.strings
								})}
							</a>
						);
					})}
					<button className="slds-button slds-button--icon-bare" onClick={this._handleCloseClick}>
						<Svg icon="utility.close" className="slds-button__icon" />
						<span className="slds-assistive-text">Remove</span>
					</button>
				</span>
			</div>
		);
	},

	_handlePillClick (item, e) {
		e.preventDefault();
		this.props.onDeselect(item);
	},

	_handleCloseClick (e) {
		e.preventDefault();
		this.props.onDeselect();
	}
});

export default LookupPills;
