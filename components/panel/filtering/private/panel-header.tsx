/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel Filter Group Header

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { type ReactNode, type MouseEvent } from 'react';

import Button from '../../../button';

export interface PanelFilterHeaderAssistiveText {
	/** Localized description of the close button for the panel for screen readers */
	closeButton?: string;
}

export interface PanelFilterHeaderProps {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `closeButton`: Localized description of the close button for the panel for screen readers
	 */
	assistiveText?: PanelFilterHeaderAssistiveText;
	/**
	 * Label for button that cancels modified filters
	 */
	cancelLabel?: string;
	/**
	 * The heading of the filtering panel
	 */
	heading?: ReactNode;
	/**
	 * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
	 */
	modified?: boolean;
	/**
	 * When the panel's cancel button is clicked in order to reset filter panel to previous state.
	 */
	onRequestCancel?: (event: MouseEvent) => void;
	/**
	 * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
	 */
	onRequestClose?: (event: MouseEvent) => void;
	/**
	 * When the panel's save button is clicked in order to confirm filter panel state.
	 */
	onRequestSave?: (event: MouseEvent) => void;
	/**
	 * Label for button that saves modified filters
	 */
	saveLabel?: string;
}

/**
 * Header for a Filter Group within a Panel.
 */
const PanelFilterHeader = ({
	assistiveText = {},
	cancelLabel,
	heading,
	modified,
	onRequestCancel,
	onRequestClose,
	onRequestSave,
	saveLabel,
}: PanelFilterHeaderProps): React.ReactElement =>
	modified ? (
		<div className="slds-filters__header slds-grid slds-has-divider_bottom-space slds-grid_align-spread">
			<Button label={cancelLabel} onClick={onRequestCancel} variant="neutral" />
			<Button label={saveLabel} onClick={onRequestSave} variant="brand" />
		</div>
	) : (
		<div className="slds-filters__header slds-grid slds-has-divider_bottom-space">
			<h2 className="slds-align-middle slds-text-heading_small">{heading}</h2>
			<Button
				className="slds-col_bump-left"
				assistiveText={{ icon: assistiveText.closeButton }}
				iconCategory="utility"
				iconName="forward"
				iconVariant="bare"
				iconSize="small"
				onClick={onRequestClose}
				title={assistiveText.closeButton}
				variant="icon"
			/>
		</div>
	);

PanelFilterHeader.displayName = 'SLDSPanelFilterHeader';

export default PanelFilterHeader;
