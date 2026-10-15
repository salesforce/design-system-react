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
	tooltipIsOpenSteps: boolean;
}

/**
 * Development-only prop checker that warns about props that `type="path"` ignores.
 */
declare function checkProps(componentName: string, props: CheckedProps): void;

export default checkProps;
