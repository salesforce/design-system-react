/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, useMemo, type ReactNode, type ReactElement, type CSSProperties, type ChangeEvent } from 'react';
import classNames from 'classnames';
import { RADIO_GROUP } from '../../utilities/constants';

/**
 * Radio group variant types
 */
export type RadioGroupVariant = 'base' | 'button-group';

/**
 * Assistive text for RadioGroup
 */
export interface RadioGroupAssistiveText {
	/** Label for the group (shown in legend) */
	label?: string;
	/** Text for required indicator */
	required?: string;
}

/**
 * Labels for RadioGroup
 */
export interface RadioGroupLabels {
	/** Error message to display */
	error?: string;
	/** Label above the radio group */
	label?: string;
}

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps {
	/** Assistive text for accessibility */
	assistiveText?: RadioGroupAssistiveText;
	/** Radio components as children */
	children: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Disable all radio inputs */
	disabled?: boolean;
	/** ID for error message element */
	errorId?: string;
	/** Text labels */
	labels?: RadioGroupLabels;
	/** Name attribute for all radios */
	name?: string;
	/** Change handler */
	onChange?: (event: ChangeEvent<HTMLInputElement>, data: { checked: boolean }) => void;
	/** Whether the field is required */
	required?: boolean;
	/** Custom styles for button-group variant */
	style?: CSSProperties;
	/** Group variant */
	variant?: RadioGroupVariant;
}

const defaultAssistiveText: RadioGroupAssistiveText = {
	required: 'Required',
};

const defaultLabels: RadioGroupLabels = {};

/**
 * A styled select list that can have a single entry checked at any one time.
 * The RadioGroup component wraps Radio components, which should be used as children.
 */
const RadioGroup = ({
	assistiveText: propAssistiveText,
	children,
	className,
	disabled,
	errorId: propErrorId,
	labels: propLabels,
	name: propName,
	onChange,
	required,
	style,
	variant = 'base',
}: RadioGroupProps): React.ReactElement => {
	const generatedName = useId();
	const generatedErrorId = useId();

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const labels = { ...defaultLabels, ...propLabels };

	const name = propName || generatedName;
	const hasError = Boolean(labels.error);
	const errorId = hasError ? (propErrorId || generatedErrorId) : undefined;

	// Clone children with group props
	const enhancedChildren = useMemo(() => {
		return React.Children.map(children, (child) => {
			if (React.isValidElement(child)) {
				return React.cloneElement(child as ReactElement<{
					name?: string;
					onChange?: typeof onChange;
					'aria-describedby'?: string;
					disabled?: boolean;
				}>, {
					name,
					onChange,
					'aria-describedby': errorId,
					disabled: disabled || (child.props as { disabled?: boolean }).disabled,
				});
			}
			return child;
		});
	}, [children, name, onChange, errorId, disabled]);

	return (
		<fieldset
			className={classNames('slds-form-element', {
				'slds-has-error': hasError,
			})}
		>
			<legend
				className={classNames(
					'slds-form-element__legend',
					'slds-form-element__label',
					{ 'slds-assistive-text': assistiveText.label }
				)}
			>
				{required && (
					<abbr className="slds-required" title="required">
						*
						<div className="slds-assistive-text">{assistiveText.required} </div>
					</abbr>
				)}
				{assistiveText.label || labels.label}
			</legend>
			<div className={classNames('slds-form-element__control', className as string)}>
				{variant === 'button-group' ? (
					<div style={style} className="slds-radio_button-group">
						{enhancedChildren}
					</div>
				) : (
					enhancedChildren
				)}

				{labels.error && (
					<div id={errorId} className="slds-form-element__help">
						{labels.error}
					</div>
				)}
			</div>
		</fieldset>
	);
};

RadioGroup.displayName = RADIO_GROUP;

export default RadioGroup;















