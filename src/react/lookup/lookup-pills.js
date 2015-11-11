// LOOKUP PILLS - REACT FACADE

// Framework specific
import React from 'react';
import LookupPill from './lookup-pill';

export const CONTROL = 'lookup-pills';

const LookupPills = React.createClass({
	displayName: CONTROL,

	propTypes: {
		onDeselect: React.PropTypes.func.isRequired,
		renderer: React.PropTypes.func.isRequired,
		selectedItems: React.PropTypes.object.isRequired,
		strings: React.PropTypes.object.isRequired,
		autoFocusOnNewItems: React.PropTypes.bool
	},

	getDefaultProps () {
		return {
			autoFocusOnNewItems: false
		};
	},

	render () {
		return (
			<div className="slds-pill-container slds-show">
				{this.props.selectedItems.map((item, index) => {
					return (
						<LookupPill
							key={index}
							item={item}
							onDeselect={this.props.onDeselect}
							renderer={this.props.renderer}
							strings={this.props.strings}
							autoFocus={this.props.autoFocusOnNewItems}
						/>
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
