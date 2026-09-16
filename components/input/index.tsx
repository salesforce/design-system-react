/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useId,
	useRef,
	useCallback,
	forwardRef,
	type ReactNode,
	type ReactElement,
	type ChangeEvent,
	type FocusEvent,
	type KeyboardEvent,
	type MouseEvent,
	type FormEvent,
	type CSSProperties,
	type AriaAttributes,
} from 'react';
import classNames from 'classnames';

import Button from '../button';
import InnerInput from './private/inner-input';
import Label from '../utilities/label/index';
import FieldLevelHelpTooltip from '../tooltip/private/field-level-help-tooltip';
import type { TooltipProps } from '../tooltip/index';

import checkProps from './check-props';
import { INPUT } from '../../utilities/constants';
import componentDoc from './component.json';

const COUNTER = 'counter';
const DECREMENT = 'Decrement';
const INCREMENT = 'Increment';

/**
 * Input type options
 */
export type InputType =
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
export type InputVariant = 'base' | 'counter';

/**
 * Assistive text for Input accessibility
 */
export interface InputAssistiveText {
	/** Visually hidden label for screen readers */
	label?: string;
	/** Text for loading spinner icon */
	spinner?: string;
	/** Text for decrement button in counter variant */
	decrement?: string;
	/** Text for increment button in counter variant */
	increment?: string;
	/** Text for field level help button */
	fieldLevelHelpButton?: string;
}

/**
 * Data passed to onChange callback
 */
export interface InputChangeData {
	/** The input value as string */
	value: string;
	/** The input value as number (only for counter variant) */
	number?: number;
}

/**
 * Props for the Input component
 */
export interface InputProps {
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
	assistiveText?: InputAssistiveText;
	/** Browser autocomplete attribute */
	autoComplete?: string;
	/** Elements added after the input */
	children?: ReactNode;
	/** CSS classes for the outer container */
	className?: string | string[] | Record<string, boolean>;
	/** Initial value for uncontrolled usage */
	defaultValue?: string | number;
	/** Disables the input */
	disabled?: boolean;
	/** Error message (highlights input as error) */
	errorText?: ReactNode;
	/** Tooltip component for field-level help */
	fieldLevelHelpTooltip?: ReactElement<TooltipProps> | null;
	/** Fixed text/node on the left */
	fixedTextLeft?: ReactNode;
	/** Fixed text/node on the right */
	fixedTextRight?: ReactNode;
	/** Shows loading spinner inside input */
	hasSpinner?: boolean;
	/** Left-aligned icon (InputIcon instance) */
	iconLeft?: ReactNode;
	/** Right-aligned icon (InputIcon instance) */
	iconRight?: ReactNode;
	/** HTML id attribute */
	id?: string;
	/** Help text below the input */
	inlineHelpText?: ReactNode;
	/** Inline edit trigger element */
	inlineEditTrigger?: ReactNode;
	/** Ref callback for the input element */
	inputRef?: (element: HTMLInputElement | null) => void;
	/** Displays value statically (static input pattern) */
	isStatic?: boolean;
	/** Label text above input */
	label?: string;
	/** Maximum character length */
	maxLength?: string | number;
	/** Maximum value for counter variant */
	maxValue?: number;
	/** Minimum character length */
	minLength?: string | number;
	/** Minimum value for counter variant */
	minValue?: number;
	/** Form parameter name */
	name?: string;
	/** Blur event handler */
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	/** Change event handler */
	onChange?: (event: ChangeEvent<HTMLInputElement> | MouseEvent | KeyboardEvent, data: InputChangeData) => void;
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
	/** Step size for counter variant */
	step?: number;
	/** Tab index */
	tabIndex?: string | number;
	/** Custom styles for container */
	styleContainer?: CSSProperties;
	/** Custom styles for input element */
	styleInput?: CSSProperties;
	/** Input type */
	type?: InputType;
	/** Controlled value */
	value?: string | number;
	/** Input variant */
	variant?: InputVariant;
}

const defaultAssistiveText: InputAssistiveText = {
	decrement: `${DECREMENT} ${COUNTER}`,
	increment: `${INCREMENT} ${COUNTER}`,
};

/**
 * The HTML `input` with a label and error messaging.
 *
 * @see https://lightningdesignsystem.com/components/input/
 */
const Input = forwardRef<HTMLDivElement, InputProps>(
	(
		{
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
			children,
			className,
			defaultValue,
			disabled = false,
			errorText,
			fieldLevelHelpTooltip,
			fixedTextLeft,
			fixedTextRight,
			hasSpinner = false,
			iconLeft: propIconLeft,
			iconRight: propIconRight,
			id: propId,
			inlineHelpText,
			inlineEditTrigger,
			inputRef: propInputRef,
			isStatic = false,
			label,
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
			readOnly = false,
			required = false,
			role,
			step,
			tabIndex,
			styleContainer,
			styleInput,
			type = 'text',
			value,
			variant = 'base',
		},
		ref
	) => {
		const generatedId = useId();
		const generatedErrorId = useId();
		const generatedInlineHelpId = useId();
		const id = propId || generatedId;
		const errorId = errorText ? generatedErrorId : undefined;
		const inlineHelpId = inlineHelpText ? generatedInlineHelpId : undefined;
		const describedby =
			[ariaDescribedby, inlineHelpId, errorId].filter((v): v is string => Boolean(v)).join(' ') ||
			undefined;

		const inputElementRef = useRef<HTMLInputElement | null>(null);
		const steppingRef = useRef({
			currentDelay: 500,
			initialDelay: 500,
			speedDelay: 75,
			timeout: null as ReturnType<typeof setTimeout> | null,
		});
		const lastStepEventRef = useRef<MouseEvent | KeyboardEvent | null>(null);

		const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

		// Check props in development
		checkProps(INPUT, {
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
			autoComplete,
			children,
			className,
			defaultValue,
			disabled,
			errorText,
			fieldLevelHelpTooltip,
			fixedTextLeft,
			fixedTextRight,
			hasSpinner,
			iconLeft: propIconLeft,
			iconRight: propIconRight,
			id,
			inlineHelpText,
			inlineEditTrigger,
			inputRef: propInputRef,
			isStatic,
			label,
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
			tabIndex,
			styleContainer,
			styleInput,
			type,
			value,
			variant,
		}, componentDoc);

		const getValueAsNumber = useCallback((): number => {
			if (value !== undefined) {
				return Number(value);
			}
			if (inputElementRef.current) {
				return Number(inputElementRef.current.value);
			}
			return 0;
		}, [value]);

		const stopStepping = useCallback(() => {
			if (steppingRef.current.timeout) {
				clearTimeout(steppingRef.current.timeout);
			}
			steppingRef.current.currentDelay = steppingRef.current.initialDelay;
			lastStepEventRef.current = null;
		}, []);

		const performStep = useCallback(
			(direction: typeof INCREMENT | typeof DECREMENT, event?: MouseEvent | KeyboardEvent) => {
				if (steppingRef.current.timeout) {
					clearTimeout(steppingRef.current.timeout);
				}

				if (event) {
					lastStepEventRef.current = event;
				}
				const stepEvent = event ?? lastStepEventRef.current ?? undefined;

				const stepSize = step !== undefined ? Number(step) : 1;
				let currentValue = getValueAsNumber();
				let valueChanged = false;

				if (direction === DECREMENT && maxValue !== undefined && currentValue > maxValue) {
					currentValue = Number(maxValue);
					valueChanged = true;
				} else if (direction === INCREMENT && minValue !== undefined && currentValue < minValue) {
					currentValue = Number(minValue);
					valueChanged = true;
				} else {
					const decimalPlaces =
						String(stepSize).search(/\./) >= 0 ? String(stepSize).split('.')[1].length : 0;
					let minOverflow = 0;

					if (minValue !== undefined) {
						minOverflow = (currentValue - minValue) % stepSize;
					}

					if (minOverflow > 0) {
						currentValue =
							direction === DECREMENT
								? currentValue - minOverflow
								: currentValue + (stepSize - minOverflow);
					} else {
						currentValue = direction === DECREMENT ? currentValue - stepSize : currentValue + stepSize;
					}

					currentValue = Number(currentValue.toFixed(decimalPlaces));

					if (
						!(maxValue !== undefined && currentValue > maxValue) &&
						!(minValue !== undefined && currentValue < minValue)
					) {
						valueChanged = true;
					}
				}

				if (valueChanged) {
					if (value === undefined && inputElementRef.current) {
						// Uncontrolled mode
						inputElementRef.current.value = String(currentValue);
					}
					if (onChange && stepEvent) {
						onChange(stepEvent, {
							number: currentValue,
							value: String(currentValue),
						});
					}
				}

				if (
					(direction === INCREMENT && maxValue !== undefined && currentValue >= maxValue) ||
					(direction === DECREMENT && minValue !== undefined && currentValue <= minValue)
				) {
					stopStepping();
				} else {
					steppingRef.current.timeout = setTimeout(() => {
						steppingRef.current.currentDelay = steppingRef.current.speedDelay;
						performStep(direction);
					}, steppingRef.current.currentDelay);
				}
			},
			[getValueAsNumber, maxValue, minValue, onChange, step, stopStepping, value]
		);

		const setInputRef = useCallback(
			(element: HTMLInputElement | null) => {
				inputElementRef.current = element;
				if (propInputRef) {
					propInputRef(element);
				}
			},
			[propInputRef]
		);

		const handleChange = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				if (onChange) {
					const data: InputChangeData = {
						value: event.target.value,
					};

					if (variant === COUNTER) {
						data.number = Number(data.value);
					}

					onChange(event, data);
				}
			},
			[onChange, variant]
		);

		const getCounterButtonIcon = (direction: typeof INCREMENT | typeof DECREMENT) => {
			const currentValue = getValueAsNumber();
			let isDisabled = false;

			if (
				disabled ||
				(direction === INCREMENT && maxValue !== undefined && currentValue >= maxValue) ||
				(direction === DECREMENT && minValue !== undefined && currentValue <= minValue)
			) {
				isDisabled = true;
			}

			return (
				<Button
					assistiveText={{
						icon: assistiveText[direction.toLowerCase() as 'decrement' | 'increment'],
					}}
					className={classNames(
						'slds-button_icon-small',
						`slds-input__button_${direction.toLowerCase()}`
					)}
					disabled={isDisabled}
					iconCategory="utility"
					iconName={direction === DECREMENT ? 'ban' : 'new'}
					onKeyDown={(event: KeyboardEvent) => {
						if (event.keyCode === 13) {
							performStep(direction, event);
						}
					}}
					onKeyUp={stopStepping}
					onMouseDown={(event: MouseEvent) => {
						performStep(direction, event);
					}}
					onMouseLeave={stopStepping}
					onMouseUp={stopStepping}
					variant="icon"
				/>
			);
		};

		// Compute icon rendering
		let iconLeft: ReactNode = null;
		let iconRight: ReactNode = null;

		if (propIconLeft) {
			iconLeft = React.isValidElement(propIconLeft)
				? React.cloneElement(propIconLeft as React.ReactElement<{ iconPosition?: string }>, {
						iconPosition: 'left',
				  })
				: propIconLeft;
		} else if (variant === COUNTER && !isStatic && !readOnly) {
			iconLeft = getCounterButtonIcon(DECREMENT);
		}

		if (propIconRight) {
			iconRight = React.isValidElement(propIconRight)
				? React.cloneElement(propIconRight as React.ReactElement<{ iconPosition?: string }>, {
						iconPosition: 'right',
				  })
				: propIconRight;
		} else if (variant === COUNTER && !isStatic && !readOnly) {
			iconRight = getCounterButtonIcon(INCREMENT);
		}

		const hasRenderedLabel = label || assistiveText?.label;
		const inputRefToUse = variant === COUNTER ? setInputRef : propInputRef;

		return (
			<div
				className={classNames(
					'slds-form-element',
					{
						'slds-has-error': errorText,
					},
					className
				)}
				style={styleContainer}
				ref={ref}
			>
				<Label
					assistiveText={assistiveText}
					htmlFor={isStatic ? undefined : id}
					label={label}
					required={required}
					variant={isStatic ? 'static' : 'base'}
				/>
				{fieldLevelHelpTooltip && hasRenderedLabel ? (
					<FieldLevelHelpTooltip
						assistiveText={{
							triggerLearnMoreIcon: assistiveText.fieldLevelHelpButton,
						}}
						fieldLevelHelpTooltip={fieldLevelHelpTooltip}
					/>
				) : null}
				<InnerInput
					aria-activedescendant={ariaActivedescendant}
					aria-autocomplete={ariaAutocomplete}
					aria-controls={ariaControls}
					aria-labelledby={ariaLabelledby}
					aria-describedby={describedby}
					aria-expanded={ariaExpanded}
					aria-haspopup={ariaHaspopup}
					aria-owns={ariaOwns}
					aria-required={ariaRequired}
					autoComplete={autoComplete}
					className={classNames({
						'slds-input_counter': variant === COUNTER,
						'slds-p-horizontal_none': variant === COUNTER && readOnly,
					})}
					containerProps={{
						className: 'slds-form-element__control',
					}}
					defaultValue={defaultValue}
					disabled={disabled}
					fixedTextLeft={fixedTextLeft}
					fixedTextRight={fixedTextRight}
					hasSpinner={hasSpinner}
					id={id}
					iconLeft={iconLeft}
					iconRight={iconRight}
					inlineEditTrigger={inlineEditTrigger}
					isStatic={isStatic}
					minLength={minLength}
					minValue={minValue}
					maxLength={maxLength}
					maxValue={maxValue}
					name={name}
					onBlur={onBlur}
					onChange={handleChange}
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
					inputRef={inputRefToUse}
					readOnly={readOnly}
					required={required}
					role={role}
					assistiveText={assistiveText}
					type={variant === COUNTER ? 'number' : type}
					value={value}
					variant={variant}
					step={step}
					tabIndex={tabIndex}
					style={styleInput}
				/>
				{inlineHelpText && (
					<div id={inlineHelpId} className="slds-form-element__help">
						{inlineHelpText}
					</div>
				)}
				{errorText && (
					<div id={errorId} className="slds-form-element__help">
						{errorText}
					</div>
				)}
				{children}
			</div>
		);
	}
);

Input.displayName = INPUT;

export default Input;
