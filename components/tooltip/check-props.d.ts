/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { TooltipProps } from './index';

/**
 * Development-only prop checker that validates component props and
 * issues warnings for deprecated properties.
 */
declare function checkProps(
	componentName: string,
	props: TooltipProps,
	jsonDoc?: Record<string, unknown>
): void;

export default checkProps;














