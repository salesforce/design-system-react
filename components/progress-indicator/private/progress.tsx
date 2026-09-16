/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
import classNames from 'classnames';

import ProgressBar from './progress-bar';

import { PROGRESS_INDICATOR_PROGRESS } from '../../../utilities/constants';
import {
	type ProgressIndicatorAssistiveText,
	type ProgressIndicatorOrientation,
	type ProgressIndicatorVariant,
} from '../index';

export interface ProgressProps {
	/**
	 * Assistive text for percentage
	 */
	assistiveText?: ProgressIndicatorAssistiveText;
	/**
	 * Steps in the component
	 */
	children?: ReactNode;
	/**
	 * CSS class names to be added to the container element.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * HTML id for component.
	 */
	id: string;
	/**
	 * Determines the orientation of the progress indicator
	 */
	orientation?: ProgressIndicatorOrientation;
	/**
	 * Percentage of progress completion, ranging [0, 100]
	 */
	value: string;
	/**
	 * Determines component style
	 */
	variant?: ProgressIndicatorVariant;
}

/**
 * Progress renders all step buttons and a container wrapping these buttons and a progress bar
 */
class Progress extends React.Component<ProgressProps> {
	static displayName = PROGRESS_INDICATOR_PROGRESS;

	/**
	 * Get the progress's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id;
	}

	render() {
		return (
			<div
				id={this.getId()}
				className={classNames(
					'slds-progress',
					{ 'slds-progress_shade': this.props.variant === 'modal' },
					{ 'slds-progress_vertical': this.props.orientation === 'vertical' },
					{ 'slds-progress_success': this.props.variant === 'setup-assistant' },
					this.props.className as string
				)}
			>
				<ol
					className={classNames('slds-progress__list', {
						'slds-progress__list-bordered':
							this.props.variant === 'setup-assistant',
					})}
				>
					{this.props.children}
				</ol>
				{this.props.orientation !== 'vertical' && (
					<ProgressBar
						value={this.props.value}
						orientation={this.props.orientation}
						assistiveText={this.props.assistiveText}
					/>
				)}
			</div>
		);
	}
}

export default Progress;
