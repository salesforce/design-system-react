/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import {
	useId,
	useEffect,
	forwardRef,
	type ChangeEvent,
	type FocusEvent,
	type KeyboardEvent,
	type MouseEvent,
	type FormEvent,
	type CSSProperties,
	type ReactNode,
} from 'react';
import classNames from 'classnames';
import getAriaProps from '../../utilities/get-aria-props';
import { TEXTAREA } from '../../utilities/constants';
import checkProps from './check-props';
import componentDoc from './component.json';

/**
 * Assistive text for Textarea
 */
export interface TextareaAssistiveText {
	/** Visually hidden label for screen readers */
	label?: string;
}

/**
 * Labels for Textarea
 */
export interface TextareaLabels {
	/** Error message shown below the textarea while `hasError` is true */
	error?: ReactNode;
	/** Visible label above the textarea */
	label?: ReactNode;
}

/**
 * Data passed to `onChange`
 */
export interface TextareaChangeData {
	/** The new text */
	value: string;
}

/**
 * Props removed in v11. They are ignored at runtime and warn in development.
 */
interface TextareaRemovedProps {
	/** @removed Textarea is controlled: pass `value` and update it in `onChange`. */
	defaultValue?: unknown;
}

/**
 * Props for the Textarea component
 */
export interface TextareaProps {
	/**
	 * **Assistive text for accessibility**
	 * * `label`: Visually hidden label. Use instead of `labels.label`.
	 */
	assistiveText?: TextareaAssistiveText;
	/** aria-activedescendant for composite widgets */
	'aria-activedescendant'?: string;
	/** aria-autocomplete for suggestions */
	'aria-autocomplete'?: string;
	/** aria-controls to relate with another region */
	'aria-controls'?: string;
	/** aria-describedby for descriptions */
	'aria-describedby'?: string;
	/** aria-expanded for collapsible content */
	'aria-expanded'?: boolean;
	/** aria-haspopup for popup menus */
	'aria-haspopup'?: boolean;
	/** aria-labelledby for labels */
	'aria-labelledby'?: string;
	/** aria-owns for related elements */
	'aria-owns'?: string;
	/** aria-required for form validation */
	'aria-required'?: boolean;
	/** Autofocus on load (poor UX) */
	autoFocus?: boolean;
	/** Elements added after textarea */
	children?: ReactNode;
	/** CSS class for textarea element */
	className?: string | string[] | Record<string, boolean>;
	/** CSS class for container */
	classNameContainer?: string | string[] | Record<string, boolean>;
	/** Disable the textarea */
	disabled?: boolean;
	/** @deprecated Use `labels.error` and `hasError` instead. */
	errorText?: string;
	/** Puts the textarea in an error state and shows `labels.error` */
	hasError?: boolean;
	/** Unique ID */
	id?: string;
	/** @deprecated Use `labels.label` instead. */
	label?: string;
	/**
	 * **Text labels for internationalization**
	 * * `error`: Error message shown below the textarea while `hasError` is true
	 * * `label`: Visible label. Use `assistiveText.label` for a visually hidden label.
	 */
	labels?: TextareaLabels;
	/** Maximum character count */
	maxLength?: number;
	/** Form parameter name */
	name?: string;
	/** Blur event handler */
	onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
	/**
	 * Called when the text changes. Textarea is controlled: update `value` from
	 * `data.value`, or the text won't change.
	 */
	onChange: (
		event: ChangeEvent<HTMLTextAreaElement>,
		data: TextareaChangeData
	) => void;
	/** Click event handler */
	onClick?: (event: MouseEvent<HTMLTextAreaElement>) => void;
	/** Focus event handler */
	onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
	/** Input event handler */
	onInput?: (event: FormEvent<HTMLTextAreaElement>) => void;
	/** Invalid event handler */
	onInvalid?: (event: FormEvent<HTMLTextAreaElement>) => void;
	/** Key down event handler */
	onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
	/** Key press event handler */
	onKeyPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
	/** Key up event handler */
	onKeyUp?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
	/** Select event handler */
	onSelect?: (event: FormEvent<HTMLTextAreaElement>) => void;
	/** Submit event handler */
	onSubmit?: (event: FormEvent<HTMLTextAreaElement>) => void;
	/** Placeholder text */
	placeholder?: string;
	/** Mark as required field */
	required?: boolean;
	/** ARIA role */
	role?: string;
	/** The text in the textarea. Required: Textarea is controlled. */
	value: string;
	/** Text wrapping mode */
	wrap?: 'soft' | 'hard';
	/** Custom styles */
	style?: CSSProperties;
}

/**
 * A multi-line plain-text editing control.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(props, ref) => {
		const {
			assistiveText,
			autoFocus,
			children,
			className,
			classNameContainer,
			disabled,
			errorText,
			hasError: hasErrorProp,
			id: propId,
			label: labelProp,
			labels,
			maxLength,
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
			required,
			role,
			value,
			// Removed in v11: destructured so it doesn't reach the DOM. check-props warns.
			defaultValue: _defaultValue,
			wrap,
			...restProps
		} = props as TextareaProps & TextareaRemovedProps;

		checkProps(TEXTAREA, { ...props }, componentDoc);

		const generatedId = useId();
		const generatedErrorId = useId();

		const getId = () => propId || generatedId;
		const getErrorId = () => restProps['aria-describedby'] || generatedErrorId;

		const ariaProps = getAriaProps(restProps);

		const assistiveTextLabel = assistiveText?.label;

		// `label` is deprecated
		const label = labels?.label ?? labelProp;
		const labelText = label || assistiveTextLabel;

		// `errorText` is deprecated: it sets both the error state and the message
		const hasError = hasErrorProp ?? !!errorText;
		const errorMessage = hasError ? (labels?.error ?? errorText) : undefined;

		useEffect(() => {
			checkProps(
				TEXTAREA,
				{ assistiveText, errorText, label: labelProp, labels },
				componentDoc
			);
		}, [assistiveText, errorText, labelProp, labels]);

		return (
			<div
				className={classNames(
					'slds-form-element',
					{
						'slds-has-error': hasError,
					},
					classNameContainer as string
				)}
			>
				{labelText && (
					<label
						className={classNames('slds-form-element__label', {
							'slds-assistive-text': assistiveTextLabel && !label,
						})}
						htmlFor={getId()}
					>
						{required && (
							<abbr className="slds-required" title="required">
								*
							</abbr>
						)}
						{labelText}
					</label>
				)}
				<div className="slds-form-element__control">
					<textarea
						className={classNames('slds-textarea', className as string)}
						autoFocus={autoFocus}
						disabled={disabled}
						id={getId()}
						maxLength={
							// Strings are still accepted at runtime for untyped callers; check-props warns.
							typeof maxLength === 'string'
								? parseInt(maxLength, 10)
								: maxLength
						}
						name={name}
						onBlur={onBlur}
						onChange={(event) => {
							onChange?.(event, { value: event.target.value });
						}}
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
						ref={ref}
						role={role}
						required={required}
						wrap={wrap}
						value={value}
						aria-describedby={
							errorMessage
								? getErrorId()
								: ((ariaProps as Record<string, unknown>)[
										'aria-describedby'
									] as string | undefined)
						}
						{...ariaProps}
					/>
				</div>
				{errorMessage && (
					<div id={getErrorId()} className="slds-form-element__help">
						{errorMessage}
					</div>
				)}
				{children}
			</div>
		);
	}
);

Textarea.displayName = TEXTAREA;

export default Textarea;
