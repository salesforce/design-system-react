/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Button Component
// NOTE: THIS COMPONENT HAS BEEN DEPRECATED AND WILL BE REMOVED IN FUTURE MAJOR RELEASES

// ## Dependencies

// ### React
import React from 'react';

// ### Button
import Button from '../button';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ## Constants
import {
	GLOBAL_HEADER_BUTTON,
	GLOBAL_HEADER_TOOL,
} from '../../utilities/constants';

/**
 * A helper component that renders a Button in the tools area of the Global Header. Currently defaults to a bare icon, but this can be overriden if text-based buttons are required.
 */
const GlobalHeaderButton = (props) => {
	checkProps(GLOBAL_HEADER_BUTTON, props);
	const { buttonVariant, ...rest } = props;
	const btn = <Button iconVariant="global-header" variant="icon" {...rest} />;
	return buttonVariant === 'dropdown' ? btn : <li>{btn}</li>;
};

GlobalHeaderButton.displayName = GLOBAL_HEADER_TOOL;

export default GlobalHeaderButton;
