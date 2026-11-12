/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel Filter Group Footer

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { type ReactNode, type MouseEvent } from 'react';

import Button from '../../../button';

export interface PanelFilterFooterProps {
	/**
	 * Localized description of the "Add Filter" button in the footer
	 */
	addFilterLabel: ReactNode;
	/**
	 * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
	 */
	onClickAdd: (event: MouseEvent) => void;
	/**
	 * Callback triggered when "Remove All" is clicked. Recieves an `event`.
	 */
	onClickRemoveAll: (event: MouseEvent) => void;
	/**
	 * Localized description of the "Remove All" button in the footer
	 */
	removeAllLabel: ReactNode;
}

/**
 * A filtering panel contextual filtering options.
 */
const PanelFilterFooter = ({
	addFilterLabel,
	onClickAdd,
	onClickRemoveAll,
	removeAllLabel,
}: PanelFilterFooterProps): React.ReactElement => (
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

export default PanelFilterFooter;
