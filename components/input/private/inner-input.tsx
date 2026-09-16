/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type {
	ReactNode,
	ChangeEvent,
	FocusEvent,
	KeyboardEvent,
	MouseEvent,
	FormEvent,
	CSSProperties,
	AriaAttributes,
} from 'react';
import classNames from 'classnames';

import Spinner from '../../spinner';
import getAriaProps from '../../../utilities/get-aria-props';

const COUNTER = 'counter';

/**
 * Input type options
 */
export type InnerInputType =
	| 'text'
	| 'password'
	| 'datetime'
	| 'datetime-local'
	| 'date'
	| 'month'
	| 'time'
	| 'week'
	| 'number'
	| 'email'
	| 'url'
	| 'search'
	| 'tel'
	| 'color';

/**
 * Input variant options
 */
export type InnerInputVariant = 'base' | 'counter';

/**
 * Assistive text for InnerInput
 */
export interface InnerInputAssistiveText {
	/** Text for loading spinner */
	spinner?: string;
}

/**
 * Container props for the wrapper div
 */
export interface InnerInputContainerProps {
	className?: string;
	[key: string]: unknown;
}

/**
 * Props for the InnerInput component
 */
export interface InnerInputProps {
	/** ID of the currently active child in a composite widget */
	'aria-activedescendant'?: string;
	/** Indicates if suggestions complete the textbox input */
	'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
	/** ID of element controlled by this input */
	'aria-controls'?: string;
	/** ID of element(s) that describe this input */
	'aria-describedby'?: string;
	/** Whether a collapsible region is expanded */
	'aria-expanded'?: boolean;
	/** Indicates the input has a popup */
	'aria-haspopup'?: AriaAttributes['aria-haspopup'];
	/** ID of element(s) that label this input */
	'aria-labelledby'?: string;
	/** ID of element(s) owned by this input */
	'aria-owns'?: string;
	/** Whether input is required */
	'aria-required'?: boolean;
	/** Assistive text for accessibility */
	assistiveText?: InnerInputAssistiveText;
	/** Browser autocomplete attribute */
	autoComplete?: string;
	/** CSS classes for the input element */
	className?: string | string[] | Record<string, boolean>;
	/** CSS classes for the container div */
	containerClassName?: string | string[] | Record<string, boolean>;
	/** Props for the container div */
	containerProps?: InnerInputContainerProps;
	/** Initial value for uncontrolled usage */
	defaultValue?: string | number;
	/** Disables the input */
	disabled?: boolean;
	/** Fixed text/node on the left */
	fixedTextLeft?: ReactNode;
	/** Fixed text/node on the right */
	fixedTextRight?: ReactNode;
	/** Shows loading spinner */
	hasSpinner?: boolean;
	/** Left-aligned icon */
	iconLeft?: ReactNode;
	/** Right-aligned icon */
	iconRight?: ReactNode;
	/** HTML id attribute (required) */
	id: string;
	/** Inline edit trigger element */
	inlineEditTrigger?: ReactNode;
	/** Ref callback for input element */
	inputRef?: (element: HTMLInputElement | null) => void;
	/** Displays value statically */
	isStatic?: boolean;
	/** Label text */
	label?: string;
	/** Maximum character length */
	maxLength?: string | number;
	/** Maximum value for number input */
	maxValue?: number;
	/** Minimum character length */
	minLength?: string | number;
	/** Minimum value for number input */
	minValue?: number;
	/** Form parameter name */
	name?: string;
	/** Blur event handler */
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	/** Change event handler */
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	/** Click event handler */
	onClick?: (event: MouseEvent<HTMLInputElement>) => void;
	/** Focus event handler */
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
	/** Input event handler */
	onInput?: (event: FormEvent<HTMLInputElement>) => void;
	/** Invalid event handler */
	onInvalid?: (event: FormEvent<HTMLInputElement>) => void;
	/** Key down event handler */
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
	/** Key press event handler */
	onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
	/** Key up event handler */
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
	/** Select event handler */
	onSelect?: (event: FormEvent<HTMLInputElement>) => void;
	/** Submit event handler */
	onSubmit?: (event: FormEvent<HTMLInputElement>) => void;
	/** Placeholder text */
	placeholder?: string;
	/** Makes input read-only */
	readOnly?: boolean;
	/** Highlights as required field */
	required?: boolean;
	/** ARIA role */
	role?: string;
	/** Step size for number input */
	step?: number;
	/** Custom styles for input */
	style?: CSSProperties;
	/** Tab index */
	tabIndex?: string | number;
	/** Input type */
	type?: InnerInputType;
	/** Controlled value */
	value?: string | number;
	/** Input variant */
	variant?: InnerInputVariant;
}

const defaultAssistiveText: InnerInputAssistiveText = {
	spinner: 'Loading ...',
};

// Type for aria props returned from getAriaProps
interface AriaPropsResult {
	'aria-activedescendant'?: string;
	'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
	'aria-controls'?: string;
	'aria-describedby'?: string;
	'aria-expanded'?: boolean;
	'aria-haspopup'?: AriaAttributes['aria-haspopup'];
	'aria-labelledby'?: string;
	'aria-owns'?: string;
	'aria-required'?: boolean;
}

/**
 * Internal input component used by Input and Combobox.
 * This component's API is not public.
 */
const InnerInput = ({
	'aria-activedescendant': ariaActivedescendant,
	'aria-autocomplete': ariaAutocomplete,
	'aria-controls': ariaControls,
	'aria-describedby': ariaDescribedby,
	'aria-expanded': ariaExpanded,
	'aria-haspopup': ariaHaspopup,
	'aria-labelledby': ariaLabelledby,
	'aria-owns': ariaOwns,
	'aria-required': ariaRequired,
	assistiveText: propAssistiveText,
	autoComplete,
	className,
	containerClassName,
	containerProps = {},
	defaultValue,
	disabled,
	fixedTextLeft,
	fixedTextRight,
	hasSpinner,
	iconLeft,
	iconRight,
	id,
	inlineEditTrigger,
	inputRef,
	isStatic,
	maxLength,
	maxValue,
	minLength,
	minValue,
	name,
	onBlur,
	onChange,
	onClick,
	onFocus,
	onInput,
	onInvalid,
	onKeyDown,
	onKeyPress,
	onKeyUp,
	onSelect,
	onSubmit,
	placeholder,
	readOnly,
	required,
	role,
	step,
	style,
	tabIndex,
	type = 'text',
	value,
	variant,
}: InnerInputProps) => {
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

	const ariaProps: AriaPropsResult = getAriaProps({
		'aria-activedescendant': ariaActivedescendant,
		'aria-autocomplete': ariaAutocomplete,
		'aria-controls': ariaControls,
		'aria-describedby': ariaDescribedby,
		'aria-expanded': ariaExpanded,
		'aria-haspopup': ariaHaspopup,
		'aria-labelledby': ariaLabelledby,
		'aria-owns': ariaOwns,
		'aria-required': ariaRequired,
		assistiveText,
		type,
	});

	const loadingStatusIconId = `${id}-loading-status-icon`;

	// Add spinner to aria-describedby if present
	if (hasSpinner && ariaProps['aria-describedby']) {
		ariaProps['aria-describedby'] = `${loadingStatusIconId} ${ariaProps['aria-describedby']}`;
	} else if (hasSpinner) {
		ariaProps['aria-describedby'] = loadingStatusIconId;
	}

	const { className: containerPropsClassName, ...restContainerProps } = containerProps;

	return (
		<div
			className={classNames(containerPropsClassName, containerClassName, {
				'slds-input-has-icon': variant !== COUNTER && (iconLeft || iconRight),
				'slds-input-has-icon_left': iconLeft && !iconRight,
				'slds-input-has-icon_right': !iconLeft && iconRight,
				'slds-input-has-icon_left-right': variant !== COUNTER && iconLeft && iconRight,
				'slds-input-has-fixed-addon': fixedTextLeft || fixedTextRight,
				'slds-has-divider_bottom': isStatic,
			})}
			{...restContainerProps}
		>
			{iconLeft}
			{fixedTextLeft && (
				<span className="slds-form-element__addon">{fixedTextLeft}</span>
			)}

			{!isStatic && (
				<input
					autoComplete={autoComplete}
					className={classNames(
						'slds-input',
						{
							'slds-text-align_left': variant === COUNTER && readOnly,
						},
						className
					)}
					disabled={disabled}
					id={id}
					min={minValue}
					minLength={minLength !== undefined ? Number(minLength) : undefined}
					max={maxValue}
					maxLength={maxLength !== undefined ? Number(maxLength) : undefined}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					onClick={onClick}
					onFocus={onFocus}
					onInput={onInput}
					onInvalid={onInvalid}
					onKeyDown={onKeyDown}
					onKeyPress={onKeyPress}
					onKeyUp={onKeyUp}
					onSelect={onSelect}
					onSubmit={onSubmit}
					placeholder={placeholder}
					readOnly={readOnly}
					ref={inputRef}
					required={required}
					role={role}
					step={step}
					style={style}
					tabIndex={tabIndex !== undefined ? Number(tabIndex) : undefined}
					type={type}
					{...ariaProps}
					{...(value !== undefined
						? { value }
						: { defaultValue })}
				/>
			)}

			{hasSpinner ? (
				<div className="slds-input__icon-group slds-input__icon-group_right">
					<Spinner
						assistiveText={{ label: assistiveText.spinner }}
						id={loadingStatusIconId}
						isInput
						size="x-small"
						variant="brand"
					/>
					{iconRight}
				</div>
			) : (
				iconRight
			)}

			{fixedTextRight && (
				<span className="slds-form-element__addon">{fixedTextRight}</span>
			)}

			{isStatic && (
				<span
					className={classNames('slds-form-element__static', 'slds-grid', {
						'slds-grid_align-spread': variant !== COUNTER,
					})}
					onClick={onClick as unknown as (event: MouseEvent<HTMLSpanElement>) => void}
				>
					{value}
					{inlineEditTrigger}
				</span>
			)}
		</div>
	);
};

InnerInput.displayName = 'SLDSInnerInput';

export default InnerInput;
