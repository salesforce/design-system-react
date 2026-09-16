/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type CSSProperties, type ChangeEvent } from 'react';
import RadioGroup from '../radio-group';
import { RADIO_BUTTON_GROUP } from '../../utilities/constants';

/**
 * Assistive text for RadioButtonGroup
 */
export interface RadioButtonGroupAssistiveText {
	/** Label for the group */
	label?: string;
	/** Text for required indicator */
	required?: string;
}

/**
 * Labels for RadioButtonGroup
 */
export interface RadioButtonGroupLabels {
	/** Error message to display */
	error?: string;
	/** Label above the button group */
	label?: string;
}

/**
 * Props for the RadioButtonGroup component
 */
export interface RadioButtonGroupProps {
	/** Assistive text for accessibility */
	assistiveText?: RadioButtonGroupAssistiveText;
	/** Radio components as children */
	children: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Disable all radio inputs */
	disabled?: boolean;
	/** ID for error message element */
	errorId?: string;
	/** Text labels */
	labels?: RadioButtonGroupLabels;
	/** Name attribute for all radios */
	name?: string;
	/** Change handler */
	onChange?: (event: ChangeEvent<HTMLInputElement>, data: { checked: boolean }) => void;
	/** Whether the field is required */
	required?: boolean;
	/** Custom styles */
	style?: CSSProperties;
}

/**
 * A styled select list that can have a single entry checked at any one time.
 * The RadioButtonGroup component wraps Radio components, which should be used as children.
 * This is a convenience wrapper around RadioGroup with variant="button-group".
 */
const RadioButtonGroup = ({
	labels = {},
	assistiveText = {},
	...rest
}: RadioButtonGroupProps): React.ReactElement => {
	return (
		<RadioGroup
			variant="button-group"
			labels={labels}
			assistiveText={assistiveText}
			{...rest}
		/>
	);
};

RadioButtonGroup.displayName = RADIO_BUTTON_GROUP;

export default RadioButtonGroup;















