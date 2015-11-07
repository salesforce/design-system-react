// LOOKUP BUTTON - REACT FACADE

// Framework specific
import React from 'react';

const LookupAction = React.createClass({
	propTypes: {
		id: React.PropTypes.string.isRequired,
		label: React.PropTypes.string,
		onClick: React.PropTypes.func,
		renderer: React.PropTypes.func.isRequired,
		searchString: React.PropTypes.string,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		return (
			<div className="slds-lookup__item" id={this.props.id}>
				<button className="slds-button" onClick={this.props.onClick} tabIndex="-1">
					{this.props.renderer({
						searchString: this.props.searchString,
						label: this.props.label,
						strings: this.props.strings
					})}
				</button>
			</div>
		);
	}
});

export default LookupAction;
