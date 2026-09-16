/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel Filter Group

// Implements the Filter part of [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { type ReactNode, type MouseEvent } from 'react';

import checkProps from './check-props';

import PanelFilteringFooter from './private/panel-footer';
import PanelHeader from './private/panel-header';

// ## Constants
import { PANEL_FILTER_GROUP } from '../../../utilities/constants';

export interface PanelFilterGroupAssistiveText {
	/** Localized description of the close button for the panel for screen readers */
	closeButton?: string;
}

export interface PanelFilterGroupProps {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `closeButton`: Localized description of the close button for the panel for screen readers
	 */
	assistiveText?: PanelFilterGroupAssistiveText;
	/**
	 * Localized description of the "Add Filter" button in the footer
	 */
	addFilterLabel?: ReactNode;
	/**
	 * Label for button that cancels modified filters
	 */
	cancelLabel?: string;
	/**
	 * Pass in `FilterList`'s of `Filters`:
	 *
	 * ```
	 * <FilterGroup
	 *   variant="panel"
	 * >
	 *   <FilterList>
	 *   <Filter
	 *     property="Show Me"
	 *     predicate="All Wackamoles"
	 *   >
	 *   {popoverContents}
	 *   </Filter>
	 *   </FilterList>
	 * </FilterGroup>
	 * ```
	 */
	children?: ReactNode;
	/**
	 * Label for the error message at the top of the panel.
	 */
	errorLabel?: string;
	/**
	 * Allows for customization of footer. This will be added after any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
	 */
	footer?: ReactNode;
	/**
	 * Allows for customization of header. This will be added before any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
	 */
	header?: ReactNode;
	/**
	 * The heading within the header of the filtering panel
	 */
	heading?: ReactNode | string;
	/**
	 * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
	 */
	modified?: boolean;
	/**
	 * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
	 */
	onClickAdd?: (event: MouseEvent) => void;
	/**
	 * Callback triggered when "Remove All" is clicked. Recieves an `event`.
	 */
	onClickRemoveAll?: (event: MouseEvent) => void;
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
	 * Localized description of the "Remove All" button in the footer
	 */
	removeAllLabel?: ReactNode;
	/**
	 * Label for button that saves modified filters
	 */
	saveLabel?: string;
	/**
	 * Adds in default Panel header and footer
	 */
	variant?: 'panel';
	/**
	 * Localized description of the close button for the panel for screen readers
	 */
	assistiveTextCloseFilterPanel?: string;
	[key: string]: unknown;
}

const defaultProps: Partial<PanelFilterGroupProps> = {
	addFilterLabel: 'Add Filter',
	cancelLabel: 'Cancel',
	assistiveText: {
		closeButton: 'Close Filter Panel',
	},
	heading: 'Filter',
	saveLabel: 'Save',
	removeAllLabel: 'Remove All',
};

/**
 * A filtering panel contextual filtering options.
 */
const PanelFilterGroup = ({
	children,
	errorLabel,
	footer,
	header,
	variant,
	addFilterLabel = defaultProps.addFilterLabel,
	onClickAdd,
	onClickRemoveAll,
	removeAllLabel = defaultProps.removeAllLabel,
	cancelLabel = defaultProps.cancelLabel,
	heading = defaultProps.heading,
	modified,
	onRequestCancel,
	onRequestClose,
	onRequestSave,
	saveLabel = defaultProps.saveLabel,
	assistiveText = defaultProps.assistiveText,
	assistiveTextCloseFilterPanel,
	...rest
}: PanelFilterGroupProps): React.ReactElement => {
	(checkProps as (name: string, props: unknown, doc?: unknown) => void)(
		PANEL_FILTER_GROUP,
		{
			children,
			errorLabel,
			footer,
			header,
			variant,
			addFilterLabel,
			onClickAdd,
			onClickRemoveAll,
			removeAllLabel,
			cancelLabel,
			heading,
			modified,
			onRequestCancel,
			onRequestClose,
			onRequestSave,
			saveLabel,
			assistiveText,
			assistiveTextCloseFilterPanel,
			...rest,
		}
	);

	const mergedAssistiveText: PanelFilterGroupAssistiveText = {
		...defaultProps.assistiveText,
		...assistiveText,
	};
	if (assistiveTextCloseFilterPanel) {
		mergedAssistiveText.closeButton = assistiveTextCloseFilterPanel;
	}
	return (
		<div className="slds-filters">
			{variant === 'panel' ? (
				<PanelHeader
					assistiveText={mergedAssistiveText}
					cancelLabel={cancelLabel}
					heading={heading}
					modified={modified}
					onRequestCancel={onRequestCancel}
					onRequestClose={onRequestClose}
					onRequestSave={onRequestSave}
					saveLabel={saveLabel}
				/>
			) : (
				header || null
			)}
			<div className="slds-filters__body">
				{errorLabel ? (
					<div
						className="slds-text-color_error slds-m-bottom_x-small"
						role="alert"
					>
						{errorLabel}
					</div>
				) : null}
				{children}
			</div>
			{variant === 'panel' ? (
				<PanelFilteringFooter
					addFilterLabel={addFilterLabel}
					onClickAdd={onClickAdd as (event: MouseEvent) => void}
					onClickRemoveAll={onClickRemoveAll as (event: MouseEvent) => void}
					removeAllLabel={removeAllLabel}
				/>
			) : (
				footer || null
			)}
		</div>
	);
};

PanelFilterGroup.displayName = PANEL_FILTER_GROUP;

export default PanelFilterGroup;
