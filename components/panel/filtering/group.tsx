/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel Filter Group

// Implements the Filter part of [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { useCallback, type ReactNode, type MouseEvent } from 'react';

import checkProps from './check-props';

import PanelFilteringFooter from './private/panel-footer';
import PanelHeader from './private/panel-header';

// ## Constants
import { PANEL_FILTER_GROUP } from '../../../utilities/constants';

export interface PanelFilterGroupAssistiveText {
	/** Localized description of the close button for the panel for screen readers */
	closeButton?: string;
}

/**
 * Data passed to the panel's button callbacks
 */
export interface PanelFilterGroupActionData {
	/** Which button was clicked */
	action: 'add' | 'remove-all' | 'cancel' | 'close' | 'save';
}

/** Signature of the panel's button callbacks */
export type PanelFilterGroupActionHandler = (
	event: MouseEvent,
	data: PanelFilterGroupActionData
) => void;

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
	 * Called when "Add Filter" is clicked, with `data.action` `'add'`.
	 */
	onClickAdd?: PanelFilterGroupActionHandler;
	/**
	 * Called when "Remove All" is clicked, with `data.action` `'remove-all'`.
	 */
	onClickRemoveAll?: PanelFilterGroupActionHandler;
	/**
	 * Called when the panel's cancel button is clicked, to reset the filter panel to its previous
	 * state. `data.action` is `'cancel'`.
	 */
	onRequestCancel?: PanelFilterGroupActionHandler;
	/**
	 * Called when the panel's close button is clicked. Place Panel within another element to control
	 * position and visibility. `data.action` is `'close'`.
	 */
	onRequestClose?: PanelFilterGroupActionHandler;
	/**
	 * Called when the panel's save button is clicked, to confirm the filter panel state.
	 * `data.action` is `'save'`.
	 */
	onRequestSave?: PanelFilterGroupActionHandler;
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

	const handleClickAdd = useCallback(
		(event: MouseEvent) => onClickAdd?.(event, { action: 'add' }),
		[onClickAdd]
	);
	const handleClickRemoveAll = useCallback(
		(event: MouseEvent) => onClickRemoveAll?.(event, { action: 'remove-all' }),
		[onClickRemoveAll]
	);
	const handleRequestCancel = useCallback(
		(event: MouseEvent) => onRequestCancel?.(event, { action: 'cancel' }),
		[onRequestCancel]
	);
	const handleRequestClose = useCallback(
		(event: MouseEvent) => onRequestClose?.(event, { action: 'close' }),
		[onRequestClose]
	);
	const handleRequestSave = useCallback(
		(event: MouseEvent) => onRequestSave?.(event, { action: 'save' }),
		[onRequestSave]
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
					onRequestCancel={handleRequestCancel}
					onRequestClose={handleRequestClose}
					onRequestSave={handleRequestSave}
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
					onClickAdd={handleClickAdd}
					onClickRemoveAll={handleClickRemoveAll}
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
