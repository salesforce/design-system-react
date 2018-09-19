/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel Filter Group Footer

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../button';

/**
 * A filtering panel contextual filtering options.
 */
const PanelFilterFooter = ({
	addFilterLabel,
	onClickAdd,
	onClickRemoveAll,
	removeAllLabel,
}) => (
	<div className="slds-filters__footer slds-grid slds-shrink-none">
		<Button label={addFilterLabel} onClick={onClickAdd} variant="link" />
		<Button
			className="slds-col_bump-left"
			label={removeAllLabel}
			onClick={onClickRemoveAll}
			variant="link"
		/>
	</div>
);

PanelFilterFooter.displayName = 'SLDSPanelFilterFooter';

PanelFilterFooter.propTypes = {
	/**
	 * Localized description of the "Add Filter" button in the footer
	 */
	addFilterLabel: PropTypes.node.isRequired,
	/**
	 * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
	 */
	onClickAdd: PropTypes.func.isRequired,
	/**
	 * Callback triggered when "Remove All" is clicked. Recieves an `event`.
	 */
	onClickRemoveAll: PropTypes.func.isRequired,
	/**
	 * Localized description of the "Remove All" button in the footer
	 */
	removeAllLabel: PropTypes.node.isRequired,
};

export default PanelFilterFooter;
