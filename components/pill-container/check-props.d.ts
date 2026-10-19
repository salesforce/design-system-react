/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { PillContainerProps } from './index';

/**
 * Development-only prop checker that issues warnings for deprecated properties.
 */
declare function checkProps(
	componentName: string,
	props: Pick<
		PillContainerProps,
		'onClickPill' | 'onRequestRemovePill' | 'options'
	>,
	jsonDoc?: Record<string, unknown>
): void;

export default checkProps;
