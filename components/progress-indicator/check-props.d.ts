/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { ProgressIndicatorProps } from './index';

/**
 * The props that `checkProps` reads. Step arrays are passed as whether they have any items.
 */
export interface CheckedProps extends Pick<
	ProgressIndicatorProps,
	'orientation' | 'tooltipPosition' | 'type' | 'variant'
> {
	disabledSteps: boolean;
	errorSteps: boolean;
	/** Whether any step passes the deprecated `onRenderSetupAssistantAction` */
	hasDeprecatedSetupAssistantAction: boolean;
	tooltipIsOpenSteps: boolean;
	/** Whether `tooltipIsOpenSteps` (deprecated) has items */
	deprecatedTooltipIsOpenSteps: boolean;
	/** The deprecated `tooltipPosition` */
	deprecatedTooltipPosition: ProgressIndicatorProps['tooltipPosition'];
	/** Whether any step passes a plain string `assistiveText` */
	hasDeprecatedStepAssistiveText: boolean;
}

/**
 * Development-only prop checker that warns about props that `type="path"` ignores
 * and about deprecated step fields.
 */
declare function checkProps(
	componentName: string,
	props: CheckedProps,
	jsonDoc?: Record<string, unknown>
): void;

export default checkProps;
