/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type CSSProperties } from 'react';
import classNames from 'classnames';
import { PROGRESS_BAR } from '../../utilities/constants';

/**
 * Progress bar thickness options
 */
export type ProgressBarThickness = 'x-small' | 'small' | 'medium' | 'large';

/**
 * Progress bar radius options
 */
export type ProgressBarRadius = 'circular';

/**
 * Progress bar color options
 */
export type ProgressBarColor = 'success';

/**
 * Progress bar orientation
 */
export type ProgressBarOrientation = 'horizontal' | 'vertical';

/**
 * Assistive text for ProgressBar
 */
export interface ProgressBarAssistiveText {
	/** Label for progress announcement */
	progress?: string;
}

/**
 * Labels for ProgressBar
 */
export interface ProgressBarLabels {
	/** Label displayed above the progress bar */
	label?: ReactNode;
	/** Text shown after percentage (e.g., "Complete") */
	complete?: ReactNode;
}

/**
 * Props for the ProgressBar component
 */
export interface ProgressBarProps {
	/** Assistive text for accessibility */
	assistiveText?: ProgressBarAssistiveText;
	/** CSS classes for the progress bar */
	className?: string | string[] | Record<string, boolean>;
	/** Color variant */
	color?: ProgressBarColor;
	/** Unique identifier */
	id?: string;
	/** Text labels */
	labels?: ProgressBarLabels;
	/** Orientation of the progress bar */
	orientation?: ProgressBarOrientation;
	/** Border radius variant */
	radius?: ProgressBarRadius;
	/** Custom styles */
	style?: CSSProperties;
	/** Thickness of the progress bar */
	thickness?: ProgressBarThickness;
	/** Progress value (0-100) */
	value: number;
}

const defaultAssistiveText: ProgressBarAssistiveText = {
	progress: 'Progress',
};

const defaultLabels: ProgressBarLabels = {
	complete: 'Complete',
};

/**
 * A progress bar component communicates to the user the progress of a particular process.
 */
const ProgressBar = ({
	assistiveText: propAssistiveText,
	className,
	color,
	id: propId,
	labels: propLabels,
	orientation = 'horizontal',
	radius,
	style,
	thickness,
	value,
}: ProgressBarProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const labels = { ...defaultLabels, ...propLabels };

	const containerStyle: CSSProperties = {
		height: '100%',
		...style,
	};

	// Render descriptive label section for horizontal orientation
	const renderDescription = () => {
		if (labels.label) {
			return (
				<div
					className="slds-grid slds-grid_align-spread slds-p-bottom_x-small"
					id={`progress-bar-label-${id}`}
				>
					<span>{labels.label}</span>
					<span>
						<strong>
							{value}% {labels.complete}
						</strong>
					</span>
				</div>
			);
		}
		return null;
	};

	return (
		<div id={id} style={containerStyle}>
			{orientation === 'horizontal' && renderDescription()}
			<div
				aria-labelledby={
					orientation === 'horizontal' && labels.label
						? `progress-bar-label-${id}`
						: undefined
				}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={value}
				aria-valuetext={`${assistiveText.progress}: ${value}%`}
				role="progressbar"
				className={classNames(
					'slds-progress-bar',
					radius && `slds-progress-bar_${radius}`,
					thickness && `slds-progress-bar_${thickness}`,
					{
						'slds-progress-bar_vertical': orientation === 'vertical',
					},
					className as string
				)}
			>
				<span
					className={classNames(
						'slds-progress-bar__value',
						color && `slds-progress-bar__value_${color}`
					)}
					style={
						orientation === 'vertical'
							? { height: `${value}%` }
							: { width: `${value}%` }
					}
				>
					<span className="slds-assistive-text">
						{`${assistiveText.progress}: ${value}%`}
					</span>
				</span>
			</div>
		</div>
	);
};

ProgressBar.displayName = PROGRESS_BAR;

export default ProgressBar;















