/* eslint-disable react/jsx-curly-brace-presence */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
	/*
	 * Assistive Text to use instead of a visible label
	 */
	assistiveText: PropTypes.object,
	/**
	 * Class names to be added to the label
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/*
	 * Id of the input associated with this label
	 */
	htmlFor: PropTypes.string,
	/*
	 * Input Label
	 */
	label: PropTypes.string,
	/*
	 * Applies label styling for a required form element
	 */
	required: PropTypes.bool,
	/**
	 * Changes markup of label.
	 */
	variant: PropTypes.oneOf(['base', 'static']),
};

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
}) => {
	const labelText = label || (assistiveText && assistiveText.label); // One of these is required to pass accessibility tests

	const subRenders = {
		base: (
			<label
				className={classNames(
					'slds-form-element__label',
					{
						'slds-assistive-text': assistiveText && !label,
					},
					className
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
			<span className={classNames('slds-form-element__label', className)}>
				{labelText}
			</span>
		),
	};

	return labelText ? subRenders[variant] : null;
};

Label.displayName = 'Label';
Label.propTypes = propTypes;

export default Label;
