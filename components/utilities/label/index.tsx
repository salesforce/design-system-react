/* eslint-disable react/jsx-curly-brace-presence */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import classNames from 'classnames';

export interface LabelAssistiveText {
	label?: string;
}

export interface LabelProps {
	/**
	 * Assistive Text to use instead of a visible label
	 */
	assistiveText?: LabelAssistiveText | Record<string, unknown>;
	/**
	 * Class names to be added to the label
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Id of the input associated with this label
	 */
	htmlFor?: string;
	/**
	 * Input Label
	 */
	label?: string;
	/**
	 * Applies label styling for a required form element
	 */
	required?: boolean;
	/**
	 * Changes markup of label.
	 */
	variant?: 'base' | 'static';
}

/*
 * Form label. This returns null if there is no label text (hidden or shown)
 */
const Label = ({
	variant = 'base',
	label,
	assistiveText,
	className,
	htmlFor,
	required,
}: LabelProps) => {
	const labelText =
		label || (assistiveText && (assistiveText as LabelAssistiveText).label); // One of these is required to pass accessibility tests

	const subRenders: Record<'base' | 'static', React.ReactElement> = {
		base: (
			<label
				className={classNames(
					'slds-form-element__label',
					{
						'slds-assistive-text': assistiveText && !label,
					},
					className as string
				)}
				htmlFor={htmlFor}
			>
				{required && (
					<abbr className="slds-required" title="required">
						{'*'}
					</abbr>
				)}
				{labelText}
			</label>
		),
		static: (
			<span
				className={classNames('slds-form-element__label', className as string)}
			>
				{labelText}
			</span>
		),
	};

	return labelText ? subRenders[variant] : null;
};

Label.displayName = 'Label';

export default Label;
