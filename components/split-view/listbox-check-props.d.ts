/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

declare const checkProps: (
	componentName: string,
	props: { listItem?: unknown },
	jsonDoc?: Record<string, unknown>
) => void;

export default checkProps;
