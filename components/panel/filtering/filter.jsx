/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Panel - Filter variant

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

import Button from '../../button';
import Popover from '../../popover';

// ## Constants
import { PANEL_FILTERING_FILTER } from '../../../utilities/constants';

/**
 * A filtering panel contextual filtering options.
 */
const FilteringPanelFilter = ({ assistiveTextRemoveFilter, children, predicate, property }) => (
	<li className="slds-item slds-hint-parent">
		<div className="slds-filters__item slds-grid slds-grid--vertical-align-center">
			<Popover
				align="left"
				body={children}
				heading="Choose filter criteria"
			>
				<a href="javascript:void(0);" className="slds-grow slds-has-blur-focus">
					<p className="slds-text-body--small">{property}</p>
					<p>{predicate}</p>
				</a>
			</Popover>

			<Button
				className="slds-col--bump-left"
				assistiveText={assistiveTextRemoveFilter}
				hint
				iconCategory="utility"
				iconName="close"
				iconVariant="bare"
				iconSize="small"
				variant="icon"
			/>
		</div>
	</li>
);

FilteringPanelFilter.displayName = PANEL_FILTERING_FILTER;

FilteringPanelFilter.propTypes = {
	/**
	 * Assistive text for removing a filter
	 */
	assistiveTextRemoveFilter: PropTypes.string,
	/**
	 * The property you are filter
	 */
	property: PropTypes.string,
	/**
	 * The criteria you are filtering for. ("[The property] is blue")
	 */
	predicate: PropTypes.string
};

module.exports = FilteringPanelFilter;
