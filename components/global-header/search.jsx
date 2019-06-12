/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Global Header Search Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ## Constants
import { GLOBAL_HEADER_SEARCH } from '../../utilities/constants';

/**
 * The GlobalHeaderSearch component is used for application wide search. The form element is implemented as a `Combobox`.
 */
const GlobalHeaderSearch = (props) => (
	<div className="slds-global-header__item slds-global-header__item_search">
		{props.combobox}
	</div>
);

GlobalHeaderSearch.displayName = GLOBAL_HEADER_SEARCH;

GlobalHeaderSearch.propTypes = {
	/**
	 * A required `Combobox` component. The props from this combobox will be merged and override any default props.
	 */
	combobox: PropTypes.node.isRequired,
};

export default GlobalHeaderSearch;
