/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { forwardRef, useEffect, type CSSProperties } from 'react';
import classNames from 'classnames';
import { SPINNER } from '../../utilities/constants';
import checkProps from './check-props';
import componentDoc from './component.json';

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
	assistiveText?: SpinnerAssistiveText;
	/**
	 * CSS classes for the root element: the `.slds-spinner_container` div, or the
	 * `.slds-spinner` div when `hasContainer` is `false`.
	 */
	className?: string | string[] | Record<string, boolean>;
	/** CSS classes for the `.slds-spinner` div */
	classNameSpinner?: string | string[] | Record<string, boolean>;
	/** @deprecated Use `className`, which lands on the container when `hasContainer` is `true`. */
	containerClassName?: string | string[] | Record<string, boolean>;
	/** @deprecated Use `style`, which lands on the container when `hasContainer` is `true`. */
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
	/** Styles for the root element (see `className`) */
	style?: CSSProperties;
	/** Color variant */
	variant?: SpinnerVariant;
}

const defaultAssistiveText: SpinnerAssistiveText = { label: 'Loading...' };

/**
 * Spinners are CSS loading indicators that should be shown when retrieving data
 * or performing slow computations.
 */
const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
	(
		{
			assistiveText = defaultAssistiveText,
			className,
			classNameSpinner,
			containerClassName,
			containerStyle,
			hasContainer = true,
			id,
			isDelayed = false,
			isInline = false,
			isInput = false,
			size = 'medium',
			style,
			variant = 'base',
		},
		ref
	) => {
		useEffect(() => {
			checkProps(SPINNER, { containerClassName, containerStyle }, componentDoc);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []); // Only run on mount

		const mergedAssistiveText = {
			...defaultAssistiveText,
			...assistiveText,
		}.label;

		// The deprecated container props only ever applied to the container
		const rootClassName = hasContainer
			? classNames(containerClassName, className)
			: className;
		const rootStyle = hasContainer ? { ...containerStyle, ...style } : style;

		const spinnerClassName = classNames(
			'slds-spinner',
			{
				'slds-spinner_inline': isInline,
				'slds-input__spinner': isInput,
				'slds-spinner_brand': variant === 'brand',
				'slds-spinner_inverse': variant === 'inverse',
				'slds-spinner_delayed': isDelayed,
				[`slds-spinner_${size}`]: size,
			},
			classNameSpinner,
			hasContainer ? undefined : rootClassName
		);

		const spinner = (
			<div
				aria-hidden="false"
				className={spinnerClassName}
				id={id}
				ref={hasContainer ? undefined : ref}
				role="status"
				style={hasContainer ? undefined : rootStyle}
			>
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
					className={classNames(rootClassName, 'slds-spinner_container')}
					ref={ref}
					style={rootStyle}
				>
					{spinner}
				</div>
			);
		}

		return spinner;
	}
);

Spinner.displayName = SPINNER;

export default Spinner;
