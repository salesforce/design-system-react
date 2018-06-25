/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Search Component

// ## Dependencies

// ### React
import React from 'react';

// ### Lookup
import Lookup from '../lookup';

// ## Constants
import { GLOBAL_HEADER_SEARCH } from '../../utilities/constants';

/**
 * The Global Header Search component is currently a Lookup. In the future this wrapper may provide additional presets or features.
 */
const GlobalHeaderSearch = (props) => (
	<div className="slds-global-header__item slds-global-header__item--search">
		<Lookup iconPosition="left" {...props} />
	</div>
);

GlobalHeaderSearch.displayName = GLOBAL_HEADER_SEARCH;

export default GlobalHeaderSearch;
