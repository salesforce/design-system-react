/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import {
	useId,
	useEffect,
	forwardRef,
	type ChangeEvent,
	type ReactNode,
	type TextareaHTMLAttributes,
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
 * Props for the Textarea component.
 *
 * Other `<textarea>` attributes (`rows`, `cols`, `autoComplete`, `readOnly`,
 * …) pass through to the element via `TextareaHTMLAttributes` — the same
 * approach as `Button` / `ButtonHTMLAttributes`, and equivalent to
 * `React.ComponentProps<'textarea'>` without `ref` (ref is via `forwardRef`).
 */
export interface TextareaProps extends Omit<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	'children' | 'className' | 'defaultValue' | 'onChange' | 'value'
> {
	/**
	 * **Assistive text for accessibility**
	 * * `label`: Visually hidden label. Use instead of `labels.label`.
	 */
	assistiveText?: TextareaAssistiveText;
	/** Elements rendered after the textarea, inside the form element */
	children?: ReactNode;
	/** CSS class for textarea element */
	className?: string | string[] | Record<string, boolean>;
	/** CSS class for container */
	classNameContainer?: string | string[] | Record<string, boolean>;
	/** @deprecated Use `labels.error` and `hasError` instead. */
	errorText?: string;
	/** Puts the textarea in an error state and shows `labels.error` */
	hasError?: boolean;
	/** @deprecated Use `labels.label` instead. */
	label?: string;
	/**
	 * **Text labels for internationalization**
	 * * `error`: Error message shown below the textarea while `hasError` is true
	 * * `label`: Visible label. Use `assistiveText.label` for a visually hidden label.
	 */
	labels?: TextareaLabels;
	/**
	 * Called when the text changes. Textarea is controlled: update `value` from
	 * `data.value`, or the text won't change.
	 */
	onChange: (
		event: ChangeEvent<HTMLTextAreaElement>,
		data: TextareaChangeData
	) => void;
	/** The text in the textarea. Required: Textarea is controlled. */
	value: string;
	/** Text wrapping mode */
	wrap?: 'soft' | 'hard';
}

/**
 * A multi-line plain-text editing control.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(props, ref) => {
		const {
			assistiveText,
			children,
			className,
			classNameContainer,
			errorText,
			hasError: hasErrorProp,
			id: propId,
			label: labelProp,
			labels,
			maxLength,
			onChange,
			required,
			// Removed in v11: destructured so it doesn't reach the DOM. check-props warns.
			defaultValue: _defaultValue,
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
						{...restProps}
						{...ariaProps}
						className={classNames('slds-textarea', className as string)}
						id={getId()}
						maxLength={
							// Strings are still accepted at runtime for untyped callers; check-props warns.
							typeof maxLength === 'string'
								? parseInt(maxLength, 10)
								: maxLength
						}
						onChange={(event) => {
							onChange?.(event, { value: event.target.value });
						}}
						ref={ref}
						required={required}
						aria-describedby={
							errorMessage ? getErrorId() : restProps['aria-describedby']
						}
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
