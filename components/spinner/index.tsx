/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type CSSProperties } from 'react';
import classNames from 'classnames';
import { SPINNER } from '../../utilities/constants';

/**
 * Spinner size options
 */
export type SpinnerSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

/**
 * Spinner color variant
 */
export type SpinnerVariant = 'base' | 'brand' | 'inverse';

/**
 * Assistive text for Spinner
 */
export interface SpinnerAssistiveText {
	/** Text read by screen readers */
	label?: string;
}

/**
 * Props for the Spinner component
 */
export interface SpinnerProps {
	/** Assistive text for accessibility */
	assistiveText?: SpinnerAssistiveText | string;
	/** CSS classes for the container */
	containerClassName?: string;
	/** Custom styles for the container */
	containerStyle?: CSSProperties;
	/** Render inside a container div */
	hasContainer?: boolean;
	/** Unique identifier */
	id?: string;
	/** Add 300ms delay before showing */
	isDelayed?: boolean;
	/** Inline spinner inside document flow */
	isInline?: boolean;
	/** Spinner inside an input field */
	isInput?: boolean;
	/** Size of the spinner */
	size?: SpinnerSize;
	/** Color variant */
	variant?: SpinnerVariant;
}

const defaultAssistiveText: SpinnerAssistiveText = { label: 'Loading...' };

/**
 * Spinners are CSS loading indicators that should be shown when retrieving data
 * or performing slow computations.
 */
const Spinner = ({
	assistiveText = defaultAssistiveText,
	containerClassName,
	containerStyle,
	hasContainer = true,
	id,
	isDelayed = false,
	isInline = false,
	isInput = false,
	size = 'medium',
	variant = 'base',
}: SpinnerProps): React.ReactElement => {
	// Handle assistiveText as string or object
	const mergedAssistiveText =
		typeof assistiveText === 'string'
			? assistiveText
			: {
					...defaultAssistiveText,
					...assistiveText,
			  }.label;

	const spinnerClassName = classNames('slds-spinner', {
		'slds-spinner_inline': isInline,
		'slds-input__spinner': isInput,
		'slds-spinner_brand': variant === 'brand',
		'slds-spinner_inverse': variant === 'inverse',
		'slds-spinner_delayed': isDelayed,
		[`slds-spinner_${size}`]: size,
	});

	const spinner = (
		<div aria-hidden="false" className={spinnerClassName} id={id} role="status">
			{mergedAssistiveText && (
				<span className="slds-assistive-text">{mergedAssistiveText}</span>
			)}
			<div className="slds-spinner__dot-a" />
			<div className="slds-spinner__dot-b" />
		</div>
	);

	if (hasContainer) {
		return (
			<div
				className={classNames(containerClassName, 'slds-spinner_container')}
				style={containerStyle}
			>
				{spinner}
			</div>
		);
	}

	return spinner;
};

Spinner.displayName = SPINNER;

export default Spinner;















