/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { MenuDropdownProps } from './menu-dropdown';

/**
 * Checks props for MenuDropdown component and warns about deprecated or incorrect usage.
 * Only runs in development mode.
 */
declare function checkProps(
	componentName: string,
	props: MenuDropdownProps,
	jsonDoc?: Record<string, unknown>
): void;

export default checkProps;





