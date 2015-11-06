// LOOKUP MENU ITEM - REACT FACADE

import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';
import Svg from '../svg/svg';

const LookupMenuItem = React.createClass({
	propTypes: {
		id: React.PropTypes.string.isRequired,
		item: React.PropTypes.shape({
			getText: React.PropTypes.func.isRequired,
			getIcon: React.PropTypes.func.isRequired
		}).isRequired,
		onSelected: React.PropTypes.func.isRequired
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
		<li id={this.props.id} className="slds-lookup__item">
			<a href="#" role="option" onClick={this.handleClicked} tabIndex="-1">
				{this._renderIcon()}
				{this.props.item.getText()}
			</a>
		</li>
		);
	},

	handleClicked (e) {
		e.preventDefault();
		this.props.onSelected(this.props.item);
	}
});

export default LookupMenuItem;
