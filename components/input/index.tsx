/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useId,
	useRef,
	useCallback,
	useEffect,
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
import type { InputIconProps } from '../icon/input-icon';

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
 * Props shared by every Input variant and label form
 */
export interface InputBaseProps {
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
	/** Browser autocomplete attribute */
	autoComplete?: string;
	/** Elements added after the input */
	children?: ReactNode;
	/** CSS classes for the outer container */
	className?: string | string[] | Record<string, boolean>;
	/** Disables the input */
	disabled?: boolean;
	/** Error message (highlights input as error) */
	errorText?: ReactNode;
	/** Tooltip component for field-level help */
	fieldLevelHelpTooltip?: ReactElement<TooltipProps> | null;
	/** Shows loading spinner inside input */
	hasSpinner?: boolean;
	/** Left-aligned `InputIcon`. The input sets its `iconPosition` to `left` unless the element sets one. */
	iconLeft?: ReactElement<InputIconProps> | null;
	/** Right-aligned `InputIcon`. The input sets its `iconPosition` to `right` unless the element sets one. */
	iconRight?: ReactElement<InputIconProps> | null;
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
	/** Maximum character length */
	maxLength?: number;
	/** Minimum character length */
	minLength?: number;
	/** Form parameter name */
	name?: string;
	/** Blur event handler */
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	/**
	 * Called with the requested value when the user types or, for the counter
	 * variant, presses the increment/decrement buttons. Input is controlled: set
	 * `value` from `data.value` (or `data.number`) to accept the change.
	 */
	onChange?: (
		event: ChangeEvent<HTMLInputElement> | MouseEvent | KeyboardEvent,
		data: InputChangeData
	) => void;
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
	/** Tab index */
	tabIndex?: number;
	/** Custom styles for container */
	styleContainer?: CSSProperties;
	/** Custom styles for input element */
	styleInput?: CSSProperties;
	/** Input type */
	type?: InputType;
	/**
	 * The input's value. Input is controlled: update `value` in `onChange`.
	 * The counter variant steps from this value. (`defaultValue` was removed
	 * in v11.)
	 */
	value?: string | number;
}

/** The plain input, and the default. Counter-only props are not accepted. */
interface InputBaseVariantProps {
	/** Input variant */
	variant?: 'base';
	maxValue?: never;
	minValue?: never;
	step?: never;
}

/** A number input with increment and decrement buttons. Its `type` is always `number`. */
interface InputCounterVariantProps {
	/** Input variant */
	variant: 'counter';
	/** Maximum value */
	maxValue?: number;
	/** Minimum value */
	minValue?: number;
	/** Step size */
	step?: number;
}

/** A visible `label`, or `assistiveText.label` for a visually hidden one, not both. */
type InputLabelProps =
	| {
			/** Label text above input */
			label?: string;
			/** Assistive text for accessibility */
			assistiveText?: InputAssistiveText & { label?: never };
	  }
	| {
			label?: undefined;
			/** Assistive text for accessibility */
			assistiveText?: InputAssistiveText;
	  };

/** Fixed text on one side of the input, not both. */
type InputFixedTextProps =
	| {
			/** Fixed text/node on the left */
			fixedTextLeft?: ReactNode;
			fixedTextRight?: never;
	  }
	| {
			fixedTextLeft?: never;
			/** Fixed text/node on the right */
			fixedTextRight?: ReactNode;
	  };

/**
 * Props for the Input component: a union on `variant` (counter-only props),
 * with `label`/`assistiveText.label` and `fixedTextLeft`/`fixedTextRight`
 * exclusive.
 */
export type InputProps = InputBaseProps &
	(InputBaseVariantProps | InputCounterVariantProps) &
	InputLabelProps &
	InputFixedTextProps;

/**
 * Props removed from the public API. Still destructured so they never reach
 * the DOM, and reported by `checkProps`.
 */
interface InputRemovedProps {
	defaultValue?: unknown;
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
		}: InputProps & InputRemovedProps,
		ref
	) => {
		const generatedId = useId();
		const generatedErrorId = useId();
		const generatedInlineHelpId = useId();
		const id = propId || generatedId;
		const errorId = errorText ? generatedErrorId : undefined;
		const inlineHelpId = inlineHelpText ? generatedInlineHelpId : undefined;
		const describedby =
			[ariaDescribedby, inlineHelpId, errorId]
				.filter((v): v is string => Boolean(v))
				.join(' ') || undefined;

		const steppingRef = useRef({
			currentDelay: 500,
			initialDelay: 500,
			speedDelay: 75,
			timeout: null as ReturnType<typeof setTimeout> | null,
		});
		const lastStepEventRef = useRef<MouseEvent | KeyboardEvent | null>(null);
		// Latest `value`, so a held-down counter button steps from the value the
		// parent rendered after the previous step rather than a stale closure.
		const valueRef = useRef(value);
		useEffect(() => {
			valueRef.current = value;
		}, [value]);

		const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

		// Check props in development
		checkProps(
			INPUT,
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
			},
			componentDoc
		);

		// The counter steps from the `value` prop only; it never reads or writes
		// the DOM value.
		const toNumber = (currentValue: string | number | undefined): number =>
			currentValue === undefined || currentValue === ''
				? 0
				: Number(currentValue);

		const stopStepping = useCallback(() => {
			if (steppingRef.current.timeout) {
				clearTimeout(steppingRef.current.timeout);
			}
			steppingRef.current.currentDelay = steppingRef.current.initialDelay;
			lastStepEventRef.current = null;
		}, []);

		const performStep = useCallback(
			(
				direction: typeof INCREMENT | typeof DECREMENT,
				event?: MouseEvent | KeyboardEvent
			) => {
				if (steppingRef.current.timeout) {
					clearTimeout(steppingRef.current.timeout);
				}

				if (event) {
					lastStepEventRef.current = event;
				}
				const stepEvent = event ?? lastStepEventRef.current ?? undefined;

				const stepSize = step !== undefined ? Number(step) : 1;
				let currentValue = toNumber(valueRef.current);
				let valueChanged = false;

				if (
					direction === DECREMENT &&
					maxValue !== undefined &&
					currentValue > maxValue
				) {
					currentValue = Number(maxValue);
					valueChanged = true;
				} else if (
					direction === INCREMENT &&
					minValue !== undefined &&
					currentValue < minValue
				) {
					currentValue = Number(minValue);
					valueChanged = true;
				} else {
					const decimalPlaces =
						String(stepSize).search(/\./) >= 0
							? String(stepSize).split('.')[1].length
							: 0;
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
						currentValue =
							direction === DECREMENT
								? currentValue - stepSize
								: currentValue + stepSize;
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
					if (onChange && stepEvent) {
						onChange(stepEvent, {
							number: currentValue,
							value: String(currentValue),
						});
					}
				}

				if (
					(direction === INCREMENT &&
						maxValue !== undefined &&
						currentValue >= maxValue) ||
					(direction === DECREMENT &&
						minValue !== undefined &&
						currentValue <= minValue)
				) {
					stopStepping();
				} else {
					steppingRef.current.timeout = setTimeout(() => {
						steppingRef.current.currentDelay = steppingRef.current.speedDelay;
						performStep(direction);
					}, steppingRef.current.currentDelay);
				}
			},
			[maxValue, minValue, onChange, step, stopStepping]
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

		const getCounterButtonIcon = (
			direction: typeof INCREMENT | typeof DECREMENT
		) => {
			const currentValue = toNumber(value);
			let isDisabled = false;

			if (
				disabled ||
				(direction === INCREMENT &&
					maxValue !== undefined &&
					currentValue >= maxValue) ||
				(direction === DECREMENT &&
					minValue !== undefined &&
					currentValue <= minValue)
			) {
				isDisabled = true;
			}

			return (
				<Button
					assistiveText={{
						icon: assistiveText[
							direction.toLowerCase() as 'decrement' | 'increment'
						],
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
			iconLeft = React.isValidElement<InputIconProps>(propIconLeft)
				? React.cloneElement(propIconLeft, {
						iconPosition: propIconLeft.props.iconPosition ?? 'left',
					})
				: propIconLeft;
		} else if (variant === COUNTER && !isStatic && !readOnly) {
			iconLeft = getCounterButtonIcon(DECREMENT);
		}

		if (propIconRight) {
			iconRight = React.isValidElement<InputIconProps>(propIconRight)
				? React.cloneElement(propIconRight, {
						iconPosition: propIconRight.props.iconPosition ?? 'right',
					})
				: propIconRight;
		} else if (variant === COUNTER && !isStatic && !readOnly) {
			iconRight = getCounterButtonIcon(INCREMENT);
		}

		const hasRenderedLabel = label || assistiveText?.label;

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
					inputRef={propInputRef}
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
