/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useId,
	useCallback,
	useEffect,
	type ChangeEvent,
	type FormEvent,
	type ReactNode,
} from 'react';
import classNames from 'classnames';
import { SLIDER } from '../../utilities/constants';
import getAriaProps from '../../utilities/get-aria-props';
import checkProps from './check-props';
import componentDoc from './component.json';

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
 * Labels for Slider
 */
export interface SliderLabels {
	/** Error message shown below the slider while `hasError` is true */
	error?: ReactNode;
	/** Visible label */
	label?: ReactNode;
}

/**
 * Props for the Slider component
 */
export interface SliderProps {
	/** ARIA describedby attribute */
	'aria-describedby'?: string;
	/**
	 * **Assistive text for accessibility**
	 * * `disabled`: Read after the range while the slider is disabled
	 * * `label`: Visually hidden label. Use instead of `labels.label`.
	 */
	assistiveText?: SliderAssistiveText;
	/** CSS classes for the container */
	classNameContainer?: string | string[] | Record<string, boolean>;
	/** Whether the slider is disabled */
	disabled?: boolean;
	/** @deprecated Use `labels.error` and `hasError` instead. */
	errorText?: string;
	/** Puts the slider in an error state and shows `labels.error` */
	hasError?: boolean;
	/** HTML id attribute */
	id?: string;
	/** @deprecated Use `labels.label` instead. */
	label?: string;
	/**
	 * **Text labels for internationalization**
	 * * `error`: Error message shown below the slider while `hasError` is true
	 * * `label`: Visible label. Use `assistiveText.label` for a visually hidden label.
	 */
	labels?: SliderLabels;
	/** Maximum value (default: 100) */
	max?: number;
	/** Minimum value (default: 0) */
	min?: number;
	/** Form input name */
	name?: string;
	/**
	 * Called when the value changes. Slider is controlled: update `value` from
	 * `data.value`, or the thumb won't move.
	 */
	onChange?: (
		event: ChangeEvent<HTMLInputElement>,
		data: { value: number }
	) => void;
	/** Called on input event */
	onInput?: (
		event: FormEvent<HTMLInputElement>,
		data: { value: number }
	) => void;
	/** Size of the slider */
	size?: SliderSize;
	/** Step increment (default: 1) */
	step?: number;
	/** The current value. Required: Slider is controlled. */
	value: number;
	/** Display vertically */
	vertical?: boolean;
}

/**
 * Props removed in v11. They are ignored at runtime and warn in development.
 */
interface SliderRemovedProps {
	/** @removed Slider is controlled: pass `value` and update it in `onChange`. */
	defaultValue?: unknown;
}

const defaultAssistiveText: SliderAssistiveText = {
	disabled: 'Disabled',
};

/**
 * The ability to style sliders with CSS varies across browsers.
 * Using this component ensures sliders look the same everywhere.
 */
const Slider = (props: SliderProps): React.ReactElement => {
	const {
		'aria-describedby': ariaDescribedBy,
		assistiveText: propAssistiveText,
		classNameContainer,
		defaultValue,
		disabled,
		errorText,
		hasError: hasErrorProp,
		id: propId,
		label: labelProp,
		labels,
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
	} = props as SliderProps & SliderRemovedProps;

	const generatedId = useId();
	const generatedErrorId = useId();

	const id = propId || generatedId;
	// `errorText` is deprecated: it sets both the error state and the message
	const hasError = hasErrorProp ?? !!errorText;
	const errorMessage = hasError ? (labels?.error ?? errorText) : undefined;
	const errorId =
		ariaDescribedBy || (errorMessage ? generatedErrorId : undefined);
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	// `label` is deprecated
	const label = labels?.label ?? labelProp;
	const labelText = label || assistiveText.label;

	useEffect(() => {
		checkProps(
			SLIDER,
			{
				assistiveText: propAssistiveText,
				defaultValue,
				errorText,
				label: labelProp,
				labels,
			},
			componentDoc
		);
	}, [propAssistiveText, defaultValue, errorText, labelProp, labels]);

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
			onInput?.(event, {
				value: Number((event.target as HTMLInputElement).value),
			});
		},
		[onInput]
	);

	return (
		<div
			className={classNames(
				'slds-form-element',
				{ 'slds-has-error': hasError },
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
						<span className="slds-assistive-text">
							{' '}
							{assistiveText.disabled}
						</span>
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
						value={value}
					/>
					<span className="slds-slider__value" aria-hidden="true">
						{value}
					</span>
				</div>
				{errorMessage && (
					<div id={errorId} className="slds-form-element__help">
						{errorMessage}
					</div>
				)}
			</div>
		</div>
	);
};

Slider.displayName = SLIDER;

export default Slider;
