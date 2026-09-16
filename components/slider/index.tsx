/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, useCallback, type ChangeEvent, type FormEvent } from 'react';
import classNames from 'classnames';
import { SLIDER } from '../../utilities/constants';
import getAriaProps from '../../utilities/get-aria-props';

/**
 * Slider size options
 */
export type SliderSize = 'x-small' | 'small' | 'medium' | 'large';

/**
 * Assistive text for Slider
 */
export interface SliderAssistiveText {
	/** Text for disabled state */
	disabled?: string;
	/** Visually hidden label */
	label?: string;
}

/**
 * Props for the Slider component
 */
export interface SliderProps {
	/** ARIA describedby attribute */
	'aria-describedby'?: string;
	/** Assistive text for accessibility */
	assistiveText?: SliderAssistiveText;
	/** CSS classes for the container */
	classNameContainer?: string | string[] | Record<string, boolean>;
	/** Initial value for uncontrolled usage */
	defaultValue?: number;
	/** Whether the slider is disabled */
	disabled?: boolean;
	/** Error message text */
	errorText?: string;
	/** HTML id attribute */
	id?: string;
	/** Label text */
	label?: string;
	/** Maximum value (default: 100) */
	max?: number;
	/** Minimum value (default: 0) */
	min?: number;
	/** Form input name */
	name?: string;
	/** Called when value changes */
	onChange?: (event: ChangeEvent<HTMLInputElement>, data: { value: number }) => void;
	/** Called on input event */
	onInput?: (event: FormEvent<HTMLInputElement>, data: { value: number }) => void;
	/** Size of the slider */
	size?: SliderSize;
	/** Step increment (default: 1) */
	step?: number;
	/** Controlled value */
	value?: number;
	/** Display vertically */
	vertical?: boolean;
}

const defaultAssistiveText: SliderAssistiveText = {
	disabled: 'Disabled',
};

/**
 * The ability to style sliders with CSS varies across browsers.
 * Using this component ensures sliders look the same everywhere.
 */
const Slider = ({
	'aria-describedby': ariaDescribedBy,
	assistiveText: propAssistiveText,
	classNameContainer,
	defaultValue,
	disabled,
	errorText,
	id: propId,
	label,
	max = 100,
	min = 0,
	name,
	onChange,
	onInput,
	size,
	step = 1,
	value,
	vertical,
	...rest
}: SliderProps): React.ReactElement => {
	const generatedId = useId();
	const generatedErrorId = useId();

	const id = propId || generatedId;
	const errorId = ariaDescribedBy || (errorText ? generatedErrorId : undefined);
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const labelText = label || assistiveText.label;

	const ariaProps = getAriaProps(rest) as Record<string, unknown>;
	if (errorId) {
		ariaProps['aria-describedby'] = errorId;
	}

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onChange?.(event, { value: Number(event.target.value) });
		},
		[onChange]
	);

	const handleInput = useCallback(
		(event: FormEvent<HTMLInputElement>) => {
			onInput?.(event, { value: Number((event.target as HTMLInputElement).value) });
		},
		[onInput]
	);

	const displayValue = value ?? defaultValue ?? 0;

	return (
		<div
			className={classNames(
				'slds-form-element',
				{ 'slds-has-error': errorText },
				classNameContainer as string
			)}
		>
			<label
				className={classNames('slds-form-element__label', {
					'slds-assistive-text': assistiveText.label && !label,
				})}
				htmlFor={id}
			>
				<span className="slds-slider-label">
					{labelText && (
						<span className="slds-slider-label__label">{labelText}</span>
					)}
					<span className="slds-slider-label__range">
						{min} - {max}
					</span>
					{disabled && (
						<span className="slds-assistive-text"> {assistiveText.disabled}</span>
					)}
				</span>
			</label>
			<div className="slds-form-element__control">
				<div
					className={classNames('slds-slider', {
						'slds-slider_vertical': vertical,
						'slds-size_x-small': size === 'x-small',
						'slds-size_small': size === 'small',
						'slds-size_medium': size === 'medium',
						'slds-size_large': size === 'large',
					})}
				>
					<input
						type="range"
						id={id}
						name={name}
						className="slds-slider__range"
						min={min}
						max={max}
						step={step}
						disabled={disabled}
						onChange={handleChange}
						onInput={handleInput}
						{...ariaProps}
						{...(value !== undefined
							? { value }
							: { defaultValue })}
					/>
					<span className="slds-slider__value" aria-hidden="true">
						{displayValue}
					</span>
				</div>
				{errorText && (
					<div id={errorId} className="slds-form-element__help">
						{errorText}
					</div>
				)}
			</div>
		</div>
	);
};

Slider.displayName = SLIDER;

export default Slider;

