/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import classNames from 'classnames';

import { type ProgressIndicatorOrientation } from '../index';

export interface ProgressBarProps {
	/**
	 * Assistive text for percentage
	 */
	assistiveText?: {
		percentage?: string;
	};
	/**
	 * Determines the orientation of the progress bar
	 */
	orientation?: ProgressIndicatorOrientation;
	/**
	 * Percentage of progress completion, with range of [0, 100]
	 */
	value: string;
}

/**
 * ProgressBar renders the blue/gray progress bar and dynamically updates its completion percentage
 */
class ProgressBar extends React.Component<ProgressBarProps> {
	static displayName = 'ProgressBar';

	render() {
		return (
			<div
				className={classNames('slds-progress-bar slds-progress-bar_x-small', {
					'slds-progress-bar_vertical': this.props.orientation === 'vertical',
				})}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Number(this.props.value)}
				role="progressbar"
			>
				<span
					className="slds-progress-bar__value"
					style={
						this.props.orientation === 'vertical'
							? { height: `${this.props.value}%` }
							: { width: `${this.props.value}%` }
					}
				>
					<span className="slds-assistive-text">
						{this.props.assistiveText?.percentage ||
							`Progress: ${this.props.value}%`}
					</span>
				</span>
			</div>
		);
	}
}

export default ProgressBar;
