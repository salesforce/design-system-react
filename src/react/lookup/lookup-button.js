// LOOKUP BUTTON - REACT FACADE

import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';
import Svg from '../svg/svg';

const LookupButton = React.createClass({
	propTypes: {
		id: React.PropTypes.string,
		icon: React.PropTypes.string,
		label: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func
	},

	_renderIcon () {
		if (Lib.isString(this.props.icon)) {
			return <Svg className="slds-icon slds-icon-text-default slds-icon--small" icon={this.props.icon} />;
		}
	},

	render () {
		return (
		<div className="slds-lookup__item" id={this.props.id}>
			<button className="slds-button" onClick={this.props.onClick}>
				{this._renderIcon()}
				{this.props.label}
			</button>
		</div>
		);
	}
});

export default LookupButton;
