/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Button Component

// ## Dependencies

// ### React
import React from 'react';

// ### Button
import Button from '../button';

// ## Constants
import { GLOBAL_HEADER_TOOL } from '../../utilities/constants';

/**
 * A helper component that renders a Button in the tools area of the Global Header. Currently defaults to a bare icon, but this can be overriden if text-based buttons are required.
 */
const GlobalHeaderButton = (props) => (
	<li>
		<Button iconVariant="global-header" variant="icon" {...props} />
	</li>
);

GlobalHeaderButton.displayName = GLOBAL_HEADER_TOOL;

export default GlobalHeaderButton;
