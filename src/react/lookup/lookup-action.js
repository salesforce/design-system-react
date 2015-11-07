// LOOKUP ACTION - REACT FACADE

import React from 'react';
import classNames from 'classnames';

const LookupAction = React.createClass({
	propTypes: {
		activeDescendantId: React.PropTypes.string,
		id: React.PropTypes.string.isRequired,
		label: React.PropTypes.string,
		onClick: React.PropTypes.func,
		renderer: React.PropTypes.func.isRequired,
		searchString: React.PropTypes.string,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		const isHighlighted = this.props.activeDescendantId === this.props.id;
		
		return (
			<div className={classNames('slds-lookup__item', {'slds-theme--shade': isHighlighted})} id={this.props.id}>
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
