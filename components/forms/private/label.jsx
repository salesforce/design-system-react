/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const propTypes = {
	/*
	 * Assistive Text to use instead of a visible label
	 */
	assistiveText: PropTypes.string,
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
	required: PropTypes.string
};

const Label = (props) => {
	const anyLabelText = props.label
		|| props.assistiveText; // One of these is required to pass accessibility tests

	return (
		anyLabelText
			?	<label
				className={classNames('slds-form-element__label', {
					'slds-assistive-text': props.assistiveText && !props.label
				})}
				htmlFor={props.htmlFor}
			>
				{props.required && <abbr className="slds-required" title="required">*</abbr>}
				{anyLabelText}
			</label>
		: null
	);
};

Label.displayName = 'Label';
Label.propTypes = propTypes;

export default Label;
