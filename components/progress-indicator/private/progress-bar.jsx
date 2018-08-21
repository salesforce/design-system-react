/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	/**
	 * Assistive text for percentage
	 */
	assistiveText: PropTypes.shape({
		percentage: PropTypes.string,
	}),
	/**
	 * Percentage of progress completion, with range of [0, 100]
	 */
	value: PropTypes.string.isRequired,
};
/**
 * ProgressBar renders the blue/gray progress bar and dynamically updates its completion percentage
 */
class ProgressBar extends React.Component {
	render () {
		return (
			<div
				className="slds-progress-bar slds-progress-bar_x-small"
				aria-valuemin="0"
				aria-valuemax="100"
				aria-valuenow={this.props.value}
				role="progressbar"
			>
				<span
					className="slds-progress-bar__value"
					style={{ width: `${this.props.value}%` }}
				>
					<span className="slds-assistive-text">
						{this.props.assistiveText.percentage ||
							`Progress: ${this.props.value}%`}
					</span>
				</span>
			</div>
		);
	}
}

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = propTypes;

export default ProgressBar;
