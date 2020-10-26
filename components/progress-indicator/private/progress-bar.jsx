/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

function ProgressBar(props) {
	return (
		<div
			className={classNames('slds-progress-bar slds-progress-bar_x-small', {
				'slds-progress-bar_vertical': props.orientation === 'vertical',
			})}
			aria-valuemin="0"
			aria-valuemax="100"
			aria-valuenow={props.value}
			role="progressbar"
		>
			<span
				className="slds-progress-bar__value"
				style={
					props.orientation === 'vertical'
						? { height: `${props.value}%` }
						: { width: `${props.value}%` }
				}
			>
				<span className="slds-assistive-text">
					{props.assistiveText.percentage || `Progress: ${props.value}%`}
				</span>
			</span>
		</div>
	);
}

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = propTypes;

export default ProgressBar;
