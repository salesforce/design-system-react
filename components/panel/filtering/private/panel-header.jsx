/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel Filter Group Header

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../button';

/**
 * Header for a Filter Group within a Panel.
 */
const PanelFilterHeader = ({
	assistiveTextCloseFilterPanel,
	cancelLabel,
	heading,
	modified,
	onRequestCancel,
	onRequestClose,
	onRequestSave,
	saveLabel
}) => (modified
? <div className="slds-filters__header slds-grid slds-has-divider--bottom-space slds-grid--align-spread">
	<Button
		label={cancelLabel}
		onClick={onRequestCancel}
		variant="neutral"
	/>
	<Button
		label={saveLabel}
		onClick={onRequestSave}
		variant="brand"
	/>
</div>
	: <div className="slds-filters__header slds-grid slds-has-divider--bottom-space">
		<h2 className="slds-align-middle slds-text-heading--small">{heading}</h2>
		<Button
			className="slds-col--bump-left"
			assistiveText={assistiveTextCloseFilterPanel}
			iconCategory="utility"
			iconName="forward"
			iconVariant="bare"
			iconSize="small"
			onClick={onRequestClose}
			title={assistiveTextCloseFilterPanel}
			variant="icon"
		/>
	</div>
);

PanelFilterHeader.displayName = 'SLDSPanelFilterHeader';

PanelFilterHeader.propTypes = {
	/**
	 * Localized description of the close button for the panel for screen readers
	 */
	assistiveTextCloseFilterPanel: PropTypes.node,
	/**
	 * Label for button that cancels modified filters
	 */
	cancelLabel: PropTypes.string,
	/**
	 * The heading of the filtering panel
	 */
	heading: PropTypes.node,
	/**
	 * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
	 */
	modified: PropTypes.bool,
	/**
	 * When the panel's cancel button is clicked in order to reset filter panel to previous state.
	 */
	onRequestCancel: PropTypes.func,
	/**
	 * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
	 */
	onRequestClose: PropTypes.func,
	/**
	 * When the panel's save button is clicked in order to confirm filter panel state.
	 */
	onRequestSave: PropTypes.func,
	/**
	 * Label for button that saves modified filters
	 */
	saveLabel: PropTypes.string
};

export default PanelFilterHeader;
