/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * Check props function for Input component.
 * Only runs in development mode to warn about deprecated/invalid props.
 */
declare function checkProps(
	componentName: string,
	props: Record<string, unknown>,
	jsonDoc?: unknown
): void;

export default checkProps;




