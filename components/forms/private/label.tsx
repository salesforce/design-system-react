/* eslint-disable react/jsx-curly-brace-presence */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode } from 'react';
import classNames from 'classnames';

export interface LabelProps {
	/**
	 * Assistive Text to use instead of a visible label
	 */
	assistiveText?: {
		label?: string;
		[key: string]: unknown;
	};
	/**
	 * Id of the input associated with this label
	 */
	htmlFor?: string;
	/**
	 * Input Label or inner node for formatting purposes
	 */
	label?: ReactNode | string;
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
	label,
	assistiveText,
	htmlFor,
	required,
	variant = 'base',
}: LabelProps) => {
	const labelText = label || (assistiveText && assistiveText.label); // One of these is required to pass accessibility tests

	const subRenders: Record<'base' | 'static', React.ReactElement> = {
		base: (
			<label
				className={classNames('slds-form-element__label', {
					'slds-assistive-text': assistiveText && !label,
				})}
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
		static: <span className="slds-form-element__label">{labelText}</span>,
	};

	return labelText ? subRenders[variant] : null;
};

Label.displayName = 'Label';

export default Label;
