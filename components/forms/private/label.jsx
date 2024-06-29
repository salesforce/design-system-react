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
	/*
	 * Id of the input associated with this label
	 */
	htmlFor: PropTypes.string,
	/*
	 * Input Label or inner node for formatting purposes
	 */
	label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
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
	label,
	assistiveText,
	htmlFor,
	required,
	variant = 'base',
}) => {
	const labelText = label || (assistiveText && assistiveText.label); // One of these is required to pass accessibility tests

	const subRenders = {
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
Label.propTypes = propTypes;

export default Label;
