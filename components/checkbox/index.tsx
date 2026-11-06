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
import getAriaProps from '../../utilities/get-aria-props';
import { CHECKBOX } from '../../utilities/constants';
import Icon from '../icon/index';
import { checkDeprecatedProps, checkRequiredProps } from './check-props';
import componentDoc from './component.json';

/**
 * Checkbox variant types
 */
export type CheckboxVariant =
	'base' | 'toggle' | 'button-group' | 'visual-picker';

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
 * Called when the user toggles the checkbox, with the requested next state in
 * `data`. The rendered state only changes when `checked`/`indeterminate` are
 * updated.
 */
export type CheckboxChangeHandler = (
	event: ChangeEvent<HTMLInputElement>,
	data: CheckboxChangeData
) => void;

/**
 * Checkbox is controlled, so `onChange` is required unless the checkbox is
 * `disabled` or `readOnly`: without it, clicking the checkbox does nothing.
 */
export type CheckboxChangeProps =
	| {
			/**
			 * Called when the user toggles the checkbox, with the requested next state
			 * in `data`. The rendered state only changes when `checked`/`indeterminate`
			 * are updated. Required unless `disabled` or `readOnly` is set.
			 */
			onChange: CheckboxChangeHandler;
	  }
	| { disabled: true; onChange?: CheckboxChangeHandler }
	| { readOnly: true; onChange?: CheckboxChangeHandler };

interface CheckboxBaseProps {
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
	assistiveText?: CheckboxAssistiveText;
	/**
	 * Whether the checkbox is checked. Checkbox is controlled: update this prop
	 * from `onChange`, which reports the requested value in `data.checked`.
	 */
	checked: boolean;
	/** CSS class for container */
	className?: string | string[] | Record<string, boolean>;
	/** Disable the checkbox */
	disabled?: boolean;
	/** Error message */
	errorText?: string;
	/** Unique ID */
	id?: string;
	/**
	 * Indeterminate state (partial selection). Controlled: it is applied to the
	 * DOM node on every change and cleared when this prop is `false` or
	 * `undefined`. Clicking an indeterminate checkbox reports
	 * `{ checked: true, indeterminate: false }`.
	 */
	indeterminate?: boolean;
	/** Text labels */
	labels?: CheckboxLabels;
	/** Form parameter name */
	name?: string;
	/** Blur event handler */
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	/** Focus event handler */
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
	/** Key down event handler */
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
	/** Key press event handler */
	onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
	/** Key up event handler */
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
	/**
	 * @deprecated Focus the checkbox through `ref`, which is forwarded to the `<input>`.
	 * Called with the `<input>` when `requestFocus` is set. Still works, and warns.
	 */
	onRequestFocus?: (element: HTMLInputElement) => void;
	/**
	 * Shows the checked state without letting the user change it. The checkbox stays focusable
	 * and is announced as read-only; clicks and Space do not toggle it or call `onChange`.
	 */
	readOnly?: boolean;
	/**
	 * @deprecated Focus the checkbox through `ref`, which is forwarded to the `<input>`.
	 * Still works, and warns.
	 */
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
	/** Visual picker figure content, rendered inside `.slds-visual-picker__figure` when not `coverable` */
	visualPickerFigure?: ReactNode;
	/** Coverable visual picker figure content shown when selected */
	visualPickerFigureSelected?: ReactNode;
	/** Coverable visual picker figure content shown when not selected */
	visualPickerFigureNotSelected?: ReactNode;
	/** @deprecated Use `visualPickerFigure` instead. */
	onRenderVisualPicker?: () => ReactNode;
	/** @deprecated Use `visualPickerFigureSelected` instead. */
	onRenderVisualPickerSelected?: () => ReactNode;
	/** @deprecated Use `visualPickerFigureNotSelected` instead. */
	onRenderVisualPickerNotSelected?: () => ReactNode;
	/** Size for visual picker */
	size?: CheckboxSize;
	/** Label ID for label element */
	labelId?: string;
}

/**
 * Props for the Checkbox component
 */
export type CheckboxProps = CheckboxBaseProps & CheckboxChangeProps;

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
		// Removed in v11 (Checkbox is controlled). Destructured so it never
		// reaches the DOM; `checkDeprecatedProps` warns about it.
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
		visualPickerFigure,
		visualPickerFigureSelected,
		visualPickerFigureNotSelected,
		onRenderVisualPicker,
		onRenderVisualPickerSelected,
		onRenderVisualPickerNotSelected,
		size = 'medium',
		labelId,
		...restProps
	} = props as CheckboxProps & { defaultChecked?: boolean };

	const generatedId = useId();
	const internalRef = useRef<HTMLInputElement | null>(null);

	const getId = () => propId || generatedId;
	const getErrorId = () => (errorText ? `${getId()}-error-text` : undefined);

	// Merge assistive text
	const assistiveText: CheckboxAssistiveText = { ...assistiveTextProp };

	// Merge labels
	const labels: CheckboxLabels = {
		...defaultLabels,
		...labelsProp,
	};

	useEffect(() => {
		checkDeprecatedProps(
			CHECKBOX,
			{
				defaultChecked,
				onRenderVisualPicker,
				onRenderVisualPickerSelected,
				onRenderVisualPickerNotSelected,
				onRequestFocus,
				requestFocus,
			},
			componentDoc
		);
	}, [
		defaultChecked,
		onRequestFocus,
		requestFocus,
		onRenderVisualPicker,
		onRenderVisualPickerSelected,
		onRenderVisualPickerNotSelected,
	]);

	useEffect(() => {
		checkRequiredProps(
			CHECKBOX,
			{ disabled, onChange, readOnly },
			componentDoc
		);
	});

	// `indeterminate` only exists as a DOM property. Apply it whenever the prop
	// changes, including clearing it when the prop goes back to false/undefined.
	useEffect(() => {
		if (internalRef.current) {
			internalRef.current.indeterminate = !!indeterminate;
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
		// Read-only: skip `onChange`, so React restores the controlled `checked`. (Calling
		// `preventDefault` on the click instead conflicts with that restore and unchecks the box.)
		if (readOnly) {
			return;
		}
		onChange?.(event, {
			checked: indeterminate ? true : !checked,
			indeterminate: false,
		});
		// A click clears the DOM `indeterminate` flag natively. React restores a
		// controlled `checked` but not this property, so put the prop value back;
		// if the parent accepts the change, the effect above applies the new one.
		if (internalRef.current) {
			internalRef.current.indeterminate = !!indeterminate;
		}
	};

	const ariaProps = getAriaProps(restProps);

	// Common input props
	const inputProps = {
		disabled,
		checked: !!checked,
		id: getId(),
		name,
		onBlur,
		onChange: handleChange,
		onFocus,
		onKeyDown,
		onKeyPress,
		onKeyUp,
		role,
		'aria-readonly': readOnly || undefined,
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
			<span
				className={classNames(
					'slds-button',
					'slds-checkbox_button',
					className as string
				)}
			>
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
					vertical && 'slds-visual-picker_vertical',
					className as string
				)}
			>
				<input
					{...inputProps}
					ref={setRef}
					aria-describedby={getAriaDescribedBy()}
				/>
				<label htmlFor={getId()}>
					{coverable ? (
						<div className="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
							<span className="slds-is-selected">
								{visualPickerFigureSelected ?? onRenderVisualPickerSelected?.()}
							</span>
							<span className="slds-is-not-selected">
								{visualPickerFigureNotSelected ??
									onRenderVisualPickerNotSelected?.()}
							</span>
						</div>
					) : (
						<span className="slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center">
							{visualPickerFigure ?? onRenderVisualPicker?.()}
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
