/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type CSSProperties } from 'react';
import RadioGroup, { type RadioGroupChangeProps } from '../radio-group';
import { RADIO_BUTTON_GROUP } from '../../utilities/constants';
import type { ChildrenOf } from '../../types/common';
import type { RadioGroupItemProps } from '../radio';

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

interface RadioButtonGroupBaseProps {
	/** Assistive text for accessibility */
	assistiveText?: RadioButtonGroupAssistiveText;
	/** `Radio` elements (from `radio-button-group/radio`); see `RadioGroup` `children` */
	children: ChildrenOf<RadioGroupItemProps>;
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
	/** Whether the field is required */
	required?: boolean;
	/** Custom styles */
	style?: CSSProperties;
	/**
	 * The `value` of the selected radio, or `null` for no selection. The group
	 * is controlled: each child radio is checked when its `value` equals this.
	 * Leaving it `undefined` falls back to each `Radio`'s own `checked`
	 * (deprecated).
	 */
	value: string | null;
}

/**
 * Props for the RadioButtonGroup component. The group is controlled, so
 * `onChange` is required unless the group is `disabled`.
 */
export type RadioButtonGroupProps = RadioButtonGroupBaseProps &
	RadioGroupChangeProps;

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
