/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import { EventUtil } from '../../utilities';

const displayName = 'LookupDefaultSectionDivider';
const propTypes = {
	data: PropTypes.object
};

class DefaultSectionDivider extends React.Component {
	constructor (props) {
		super(props);
	}

	handleMouseDown (event) {
		EventUtil.trapImmediate(event);
	}

	render () {
		return (
			<li className="slds-p-around--x-small slds-lookup__divider" tabIndex="-1">
				<span className="slds-m-left--x-small">
					<strong>{this.props.data.label}</strong>
				</span>
			</li>
		);
	}
}

DefaultSectionDivider.displayName = displayName;
DefaultSectionDivider.propTypes = propTypes;

module.exports = DefaultSectionDivider;

