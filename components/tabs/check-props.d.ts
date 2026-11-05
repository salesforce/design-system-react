/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * Warns in development about removed (`defaultSelectedIndex`), deprecated
 * (`selectedIndex`) and missing (`value`) Tabs props.
 */
declare const checkProps: (
	componentName: string,
	props: Record<string, unknown>,
	jsonDoc?: Record<string, unknown>
) => void;

export default checkProps;
