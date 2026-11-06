/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { ProgressStep } from '../index';

/**
 * The assistive text that replaces a step's generated text: `assistiveText.label`, or the
 * deprecated plain `assistiveText` string.
 */
export default function getStepAssistiveLabel(
	step: ProgressStep
): string | undefined {
	return typeof step.assistiveText === 'string'
		? step.assistiveText
		: step.assistiveText?.label;
}
