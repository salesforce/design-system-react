/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Panel Filter Group

// Implements the Filter part of [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

import PanelFilteringFooter from './private/panel-footer';
import PanelHeader from './private/panel-header';

// ## Constants
import { PANEL_FILTER_GROUP } from '../../../utilities/constants';

/**
 * A filtering panel contextual filtering options.
 */
const PanelFilterGroup = ({
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
	assistiveTextCloseFilterPanel,
	cancelLabel,
	heading,
	modified,
	onRequestCancel,
	onRequestClose,
	onRequestSave,
	saveLabel
}) => (
	<div className="slds-filters">
		{variant === 'panel' ? <PanelHeader
			assistiveTextCloseFilterPanel={assistiveTextCloseFilterPanel}
			cancelLabel={cancelLabel}
			heading={heading}
			modified={modified}
			onRequestCancel={onRequestCancel}
			onRequestClose={onRequestClose}
			onRequestSave={onRequestSave}
			saveLabel={saveLabel}

		/>
		: header || null
		}
		<div className="slds-filters__body">
			{errorLabel
				? <div className="slds-text-color--error slds-m-bottom--x-small" role="alert">{errorLabel}</div>
				: null}
			{children}
		</div>
		{variant === 'panel' ? <PanelFilteringFooter
			addFilterLabel={addFilterLabel}
			onClickAdd={onClickAdd}
			onClickRemoveAll={onClickRemoveAll}
			removeAllLabel={removeAllLabel}
		/>
		: footer || null
		}
	</div>
);

PanelFilterGroup.displayName = PANEL_FILTER_GROUP;

PanelFilterGroup.propTypes = {
	/**
	 * Localized description of the "Add Filter" button in the footer
	 */
	addFilterLabel: PropTypes.node,
	/**
	 * Localized description of the close button for the panel for screen readers
	 */
	assistiveTextCloseFilterPanel: PropTypes.node,
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
	 *     <Filter
	 *       property="Show Me"
	 *       predicate="All Wackamoles"
	 *     >
	 *     {popoverContents}
	 *     </Filter>
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
	variant: React.PropTypes.oneOf(['panel'])
};

PanelFilterGroup.defaultProps = {
	addFilterLabel: 'Add Filter',
	cancelLabel: 'Cancel',
	assistiveTextCloseFilterPanel: 'Close Filter Panel',
	heading: 'Filter',
	saveLabel: 'Save',
	removeAllLabel: 'Remove All'
};

export default PanelFilterGroup;
