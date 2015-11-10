// LOOKUP PILLS - REACT FACADE

// Framework specific
import React from 'react';
import Svg from '../svg/svg';

export const CONTROL = 'lookup-pills';

const LookupPills = React.createClass({
	displayName: CONTROL,

	propTypes: {
		onDeselect: React.PropTypes.func.isRequired,
		renderer: React.PropTypes.func.isRequired,
		selectedItems: React.PropTypes.object.isRequired,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		return (
			<div className="slds-pill-container slds-show">
				{this.props.selectedItems.map((item, index) => {
					return (
						<span key={index} className="slds-pill slds-pill--bare" tabIndex="0" onClick={this._handlePillClick.bind(this, item)}>
							<a href="#" className="slds-pill__label" tabIndex="-1">
								{this.props.renderer({
									icon: item.getIcon(),
									text: item.getText(),
									item: item._item,
									strings: this.props.strings
								})}
							</a>
							<button className="slds-button slds-button--icon-bare" onClick={this._handleCloseClick}>
								<Svg icon="utility.close" className="slds-button__icon" />
								<span className="slds-assistive-text">Remove</span>
							</button>
					</span>
					);
				})}
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
