/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import {
	useId,
	useRef,
	useEffect,
	forwardRef,
	type ChangeEvent,
	type FocusEvent,
	type KeyboardEvent,
	type ReactNode,
} from 'react';
import classNames from 'classnames';
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';
import getAriaProps from '../../utilities/get-aria-props';
import { CHECKBOX } from '../../utilities/constants';
import Icon from '../icon/index';

/**
 * Checkbox variant types
 */
export type CheckboxVariant = 'base' | 'toggle' | 'button-group' | 'visual-picker';

/**
 * Checkbox size for visual picker
 */
export type CheckboxSize = 'medium' | 'large';

/**
 * Assistive text for Checkbox
 */
export interface CheckboxAssistiveText {
	heading?: string;
	label?: string;
}

/**
 * Labels for Checkbox
 */
export interface CheckboxLabels {
	heading?: string;
	label?: string;
	toggleDisabled?: string;
	toggleEnabled?: string;
}

/**
 * Change event data
 */
export interface CheckboxChangeData {
	checked: boolean;
	indeterminate: boolean;
}

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps {
	/** aria-controls for related regions */
	'aria-controls'?: string;
	/** aria-describedby for descriptions */
	'aria-describedby'?: string;
	/** aria-labelledby for labels */
	'aria-labelledby'?: string;
	/** aria-owns for owned elements */
	'aria-owns'?: string;
	/** aria-required for validation */
	'aria-required'?: boolean;
	/** Assistive text for accessibility */
	assistiveText?: CheckboxAssistiveText | string;
	/** Controlled checked state */
	checked?: boolean;
	/**
	 * Preserves the legacy `onChange(event, { checked })` parameter order used
	 * by the deprecated `components/forms/checkbox` alias. Not for new code.
	 */
	oldEventParameterOrder?: boolean;
	/** Initial uncontrolled checked state */
	defaultChecked?: boolean;
	/** CSS class for container */
	className?: string | string[] | Record<string, boolean>;
	/** Disable the checkbox */
	disabled?: boolean;
	/** Error message */
	errorText?: string;
	/** Unique ID */
	id?: string;
	/** Indeterminate state (partial selection) */
	indeterminate?: boolean;
	/** Text labels */
	labels?: CheckboxLabels;
	/** Form parameter name */
	name?: string;
	/** Blur event handler */
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	/** Change event handler */
	onChange?: (event: ChangeEvent<HTMLInputElement>, data: CheckboxChangeData) => void;
	/** Focus event handler */
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
	/** Key down event handler */
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
	/** Key press event handler */
	onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
	/** Key up event handler */
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
	/** Request focus callback */
	onRequestFocus?: (element: HTMLInputElement) => void;
	/** Read-only mode */
	readOnly?: boolean;
	/** Trigger onRequestFocus */
	requestFocus?: boolean;
	/** Mark as required */
	required?: boolean;
	/** ARIA role */
	role?: string;
	/** Tab index */
	tabIndex?: string;
	/** Checkbox variant */
	variant?: CheckboxVariant;
	/** Coverable visual picker */
	coverable?: boolean;
	/** Vertical visual picker */
	vertical?: boolean;
	/** Render function for visual picker */
	onRenderVisualPicker?: () => ReactNode;
	/** Render function for selected visual picker */
	onRenderVisualPickerSelected?: () => ReactNode;
	/** Render function for not selected visual picker */
	onRenderVisualPickerNotSelected?: () => ReactNode;
	/** Size for visual picker */
	size?: CheckboxSize;
	/** Label ID for label element */
	labelId?: string;
}

const defaultLabels: CheckboxLabels = {
	toggleDisabled: 'Disabled',
	toggleEnabled: 'Enabled',
};

/**
 * The ability to style checkboxes with CSS varies across browsers.
 * Using this component ensures checkboxes look the same everywhere.
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
	const {
		assistiveText: assistiveTextProp,
		checked,
		defaultChecked,
		className,
		disabled,
		errorText,
		id: propId,
		indeterminate,
		labels: labelsProp,
		name,
		onBlur,
		onChange,
		onFocus,
		onKeyDown,
		onKeyPress,
		onKeyUp,
		onRequestFocus,
		readOnly,
		requestFocus,
		required,
		role,
		tabIndex,
		variant = 'base',
		coverable,
		vertical,
		onRenderVisualPicker,
		onRenderVisualPickerSelected,
		onRenderVisualPickerNotSelected,
		size = 'medium',
		labelId,
		...restProps
	} = props;

	const generatedId = useId();
	const internalRef = useRef<HTMLInputElement | null>(null);

	const getId = () => propId || generatedId;
	const getErrorId = () => (errorText ? `${getId()}-error-text` : undefined);

	// Merge assistive text
	const assistiveText: CheckboxAssistiveText =
		typeof assistiveTextProp === 'string'
			? { label: assistiveTextProp }
			: { ...assistiveTextProp };

	// Merge labels
	const labels: CheckboxLabels = {
		...defaultLabels,
		...labelsProp,
	};

	// Handle indeterminate state
	useEffect(() => {
		if (internalRef.current && indeterminate !== undefined) {
			internalRef.current.indeterminate = indeterminate;
		}
	}, [indeterminate]);

	// Handle request focus
	useEffect(() => {
		if (requestFocus && onRequestFocus && internalRef.current) {
			onRequestFocus(internalRef.current);
		}
	}, [requestFocus, onRequestFocus]);

	const getAriaDescribedBy = (idArray: string[] = []): string | undefined => {
		const describedBy = idArray
			.concat(restProps['aria-describedby'] || '', getErrorId() || '')
			.filter(Boolean)
			.join(' ');
		return describedBy || undefined;
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event, {
				checked: indeterminate ? true : !checked,
				indeterminate: false,
			});
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode === KEYS.ENTER || event.keyCode === KEYS.SPACE) {
			EventUtil.trapImmediate(event);
			handleChange(event as unknown as ChangeEvent<HTMLInputElement>);
		}
		onKeyDown?.(event);
	};

	const ariaProps = getAriaProps(restProps);

	// Common input props
	const inputProps = {
		disabled,
		...(checked !== undefined ? { checked } : { defaultChecked }),
		id: getId(),
		name,
		onBlur,
		onChange: handleChange,
		onFocus,
		onKeyDown: handleKeyDown,
		onKeyPress,
		onKeyUp,
		role,
		required,
		type: 'checkbox' as const,
		...ariaProps,
	};

	// Set ref
	const setRef = (node: HTMLInputElement | null) => {
		internalRef.current = node;
		if (typeof ref === 'function') {
			ref(node);
		} else if (ref) {
			ref.current = node;
		}
	};

	// Button Group Variant
	if (variant === 'button-group') {
		return (
			<span className="slds-button slds-checkbox_button">
				<input
					{...inputProps}
					ref={setRef}
					aria-describedby={getAriaDescribedBy()}
				/>
				<label className="slds-checkbox_button__label" htmlFor={getId()}>
					<span className="slds-checkbox_faux">{labels.label}</span>
					{assistiveText.label && (
						<span className="slds-assistive-text">{assistiveText.label}</span>
					)}
				</label>
			</span>
		);
	}

	// Toggle Variant
	if (variant === 'toggle') {
		return (
			<div
				className={classNames(
					'slds-form-element',
					{
						'is-required': required,
						'slds-has-error': errorText,
					},
					className as string
				)}
			>
				<label className="slds-checkbox_toggle slds-grid" htmlFor={getId()}>
					{required && (
						<abbr className="slds-required" title="required">
							*
						</abbr>
					)}
					{labels.label && (
						<span className="slds-form-element__label slds-m-bottom_none">
							{labels.label}
						</span>
					)}
					{assistiveText.label && (
						<span className="slds-assistive-text">{assistiveText.label}</span>
					)}
					<input
						{...inputProps}
						ref={setRef}
						aria-describedby={getAriaDescribedBy([`${getId()}-desc`])}
					/>
					<span
						id={`${getId()}-desc`}
						className="slds-checkbox_faux_container"
						aria-live="assertive"
					>
						<span className="slds-checkbox_faux" />
						<span className="slds-checkbox_on">{labels.toggleEnabled}</span>
						<span className="slds-checkbox_off">{labels.toggleDisabled}</span>
					</span>
				</label>
				{errorText && (
					<div className="slds-form-element__help" id={getErrorId()}>
						{errorText}
					</div>
				)}
			</div>
		);
	}

	// Visual Picker Variant
	if (variant === 'visual-picker') {
		return (
			<span
				className={classNames(
					'slds-visual-picker',
					`slds-visual-picker_${size}`,
					vertical && 'slds-visual-picker_vertical'
				)}
			>
				<input
					{...inputProps}
					ref={setRef}
					aria-describedby={getAriaDescribedBy()}
				/>
				<label className="slds-checkbox_button__label" htmlFor={getId()}>
					{coverable ? (
						<div className="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
							<span className="slds-is-selected">
								{onRenderVisualPickerSelected?.()}
							</span>
							<span className="slds-is-not-selected">
								{onRenderVisualPickerNotSelected?.()}
							</span>
						</div>
					) : (
						<span className="slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center">
							{onRenderVisualPicker?.()}
						</span>
					)}
					{!vertical && (
						<span className="slds-visual-picker__body">
							{labels.heading && (
								<span className="slds-text-heading_small">
									{labels.heading}
								</span>
							)}
							<span className="slds-text-title">{labels.label}</span>
							{(assistiveText.label || assistiveText.heading) && (
								<span className="slds-assistive-text">
									{assistiveText.label || assistiveText.heading}
								</span>
							)}
						</span>
					)}
					{!coverable && (
						<span className="slds-icon_container slds-visual-picker__text-check">
							<Icon
								assistiveText={assistiveText}
								category="utility"
								name="check"
								colorVariant="base"
								size="x-small"
							/>
						</span>
					)}
				</label>
			</span>
		);
	}

	// Base Variant (default)
	return (
		<div
			className={classNames(
				'slds-form-element',
				{
					'is-required': required,
					'slds-has-error': errorText,
				},
				className as string
			)}
		>
			<div className="slds-form-element__control">
				<span className="slds-checkbox">
					{required && (
						<abbr className="slds-required" title="required">
							*
						</abbr>
					)}
					<input
						{...inputProps}
						ref={setRef}
						tabIndex={tabIndex ? parseInt(tabIndex, 10) : undefined}
						aria-describedby={getAriaDescribedBy()}
					/>
					<label
						className="slds-checkbox__label"
						htmlFor={getId()}
						id={labelId}
					>
						<span className="slds-checkbox_faux" />
						{labels.label && (
							<span className="slds-form-element__label">{labels.label}</span>
						)}
						{assistiveText.label && (
							<span className="slds-assistive-text">{assistiveText.label}</span>
						)}
					</label>
				</span>
			</div>
			{errorText && (
				<div className="slds-form-element__help" id={getErrorId()}>
					{errorText}
				</div>
			)}
		</div>
	);
});

Checkbox.displayName = CHECKBOX;

export default Checkbox;

