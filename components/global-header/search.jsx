/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Search Component

// ## Dependencies

// ### React
import React from 'react';

// ### Combobox
import Combobox from '../combobox';

// ## Constants
import { GLOBAL_HEADER_SEARCH } from '../../utilities/constants';

/**
 * The Global Header Search component is currently just a Combobox. In the future this component will be far more robust and adhere to SLDS standards
 */
const GlobalHeaderSearch = (props) => (
	<div className="slds-global-header__item slds-global-header__item_search">
		<Combobox {...props} />
	</div>
);

GlobalHeaderSearch.displayName = GLOBAL_HEADER_SEARCH;

export default GlobalHeaderSearch;
