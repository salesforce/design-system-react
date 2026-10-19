/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { MediaObjectProps } from './index';

/**
 * Development-only prop checker that issues warnings for deprecated properties.
 */
declare function checkProps(
	componentName: string,
	props: MediaObjectProps
): void;

export default checkProps;
