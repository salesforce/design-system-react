/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import {
	useId,
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

/**
 * Assistive text for Textarea
 */
export interface TextareaAssistiveText {
	/** Visually hidden label for screen readers */
	label?: string;
}

/**
 * Props for the Textarea component
 */
export interface TextareaProps {
	/** Assistive text for accessibility */
	assistiveText?: TextareaAssistiveText | string;
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
	/** Error message (shows error state) */
	errorText?: string;
	/** Unique ID */
	id?: string;
	/** Label above textarea */
	label?: string;
	/** Maximum character count */
	maxLength?: string;
	/** Form parameter name */
	name?: string;
	/** Blur event handler */
	onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
	/** Change event handler */
	onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
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
	/** Controlled value */
	value?: string;
	/** Initial uncontrolled value */
	defaultValue?: string;
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
			id: propId,
			label,
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
			defaultValue,
			wrap,
			...restProps
		} = props;

		const generatedId = useId();
		const generatedErrorId = useId();

		const getId = () => propId || generatedId;
		const getErrorId = () => restProps['aria-describedby'] || generatedErrorId;

		const ariaProps = getAriaProps(restProps);

		// Handle assistiveText as string or object
		const assistiveTextLabel =
			typeof assistiveText === 'string'
				? assistiveText
				: assistiveText?.label;

		const labelText = label || assistiveTextLabel;

		return (
			<div
				className={classNames(
					'slds-form-element',
					{
						'slds-has-error': errorText,
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
						maxLength={maxLength ? parseInt(maxLength, 10) : undefined}
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
						ref={ref}
						role={role}
						required={required}
						wrap={wrap}
						value={value}
						defaultValue={defaultValue}
						aria-describedby={errorText ? getErrorId() : (ariaProps as Record<string, unknown>)['aria-describedby'] as string | undefined}
						{...ariaProps}
					/>
				</div>
				{errorText && (
					<div id={getErrorId()} className="slds-form-element__help">
						{errorText}
					</div>
				)}
				{children}
			</div>
		);
	}
);

Textarea.displayName = TEXTAREA;

export default Textarea;

