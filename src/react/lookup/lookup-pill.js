// LOOKUP ITEM - REACT FACADE

import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';
import Svg from '../svg/svg';

const LookupItem = React.createClass({
	propTypes: {
		item: React.PropTypes.shape({
			getText: React.PropTypes.func.isRequired,
			getIcon: React.PropTypes.func.isRequired
		}).isRequired
	},

	_renderIcon () {
		const icon = this.props.item.getIcon();

		if (Lib.isString(icon)) {
			// TODO: Seems strange that this classname is specific to account
			return <Svg className="slds-icon slds-icon-standard-account slds-icon--small" icon={icon} />;
		}
	},

	render () {
		return (
		<a href="#" className="slds-pill__label">
			{this._renderIcon()}
			{this.props.item.getText()}
		</a>
		);
	}
});

export default LookupItem;
