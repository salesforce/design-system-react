/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { ProgressIndicatorProps } from './index';

/**
 * Development-only prop checker that warns about props that `type="path"` ignores.
 */
declare function checkProps(
	componentName: string,
	props: ProgressIndicatorProps
): void;

export default checkProps;
