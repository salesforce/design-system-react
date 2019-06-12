/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Panel Filter Group

// Implements the Filter part of [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import checkProps from './check-props';

import PanelFilteringFooter from './private/panel-footer';
import PanelHeader from './private/panel-header';

// ## Constants
import { PANEL_FILTER_GROUP } from '../../../utilities/constants';

const defaultProps = {
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
const PanelFilterGroup = (props) => {
	checkProps(PANEL_FILTER_GROUP, props);
	const {
		children,
		errorLabel,
		footer,
		header,
		variant,

		// footer
		addFilterLabel,
		onClickAdd,
		onClickRemoveAll,
		removeAllLabel,

		// header
		cancelLabel,
		heading,
		modified,
		onRequestCancel,
		onRequestClose,
		onRequestSave,
		saveLabel,
	} = props;
	const assistiveText = {
		...defaultProps.assistiveText,
		...props.assistiveText,
	};
	if (props.assistiveTextCloseFilterPanel) {
		assistiveText.closeButton = props.assistiveTextCloseFilterPanel;
	}
	return (
		<div className="slds-filters">
			{variant === 'panel' ? (
				<PanelHeader
					assistiveText={assistiveText}
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
					onClickAdd={onClickAdd}
					onClickRemoveAll={onClickRemoveAll}
					removeAllLabel={removeAllLabel}
				/>
			) : (
				footer || null
			)}
		</div>
	);
};

PanelFilterGroup.displayName = PANEL_FILTER_GROUP;

PanelFilterGroup.propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `closeButton`: Localized description of the close button for the panel for screen readers
	 */
	assistiveText: PropTypes.shape({
		closeButton: PropTypes.string,
	}),
	/**
	 * Localized description of the "Add Filter" button in the footer
	 */
	addFilterLabel: PropTypes.node,
	/**
	 * Label for button that cancels modified filters
	 */
	cancelLabel: PropTypes.string,
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
	children: PropTypes.node,
	/**
	 * Label for the error message at the top of the panel.
	 */
	errorLabel: PropTypes.string,
	/**
	 * Allows for customization of footer. This will be added after any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
	 */
	footer: PropTypes.node,
	/**
	 * Allows for customization of header. This will be added before any `FilterList`'s in the DOM. If using Panel Filter Group outside of a panel, do not set the variant to `panel` and header and footer will be removed.
	 */
	header: PropTypes.node,
	/**
	 * The heading within the header of the filtering panel
	 */
	heading: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	/**
	 * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
	 */
	modified: PropTypes.bool,
	/**
	 * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
	 */
	onClickAdd: PropTypes.func,
	/**
	 * Callback triggered when "Remove All" is clicked. Recieves an `event`.
	 */
	onClickRemoveAll: PropTypes.func,
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
	 * Localized description of the "Remove All" button in the footer
	 */
	removeAllLabel: PropTypes.node,
	/**
	 * Label for button that saves modified filters
	 */
	saveLabel: PropTypes.string,
	/**
	 * Adds in default Panel header and footer
	 */
	variant: PropTypes.oneOf(['panel']),
};

PanelFilterGroup.defaultProps = defaultProps;

export default PanelFilterGroup;
