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

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ## Constants
import { PANEL_FILTERING_FILTER } from '../../../utilities/constants';


/**
 * A filtering panel's contextual filtering options.
 */
const FilteringPanelFilter = React.createClass({
	displayName: PANEL_FILTERING_FILTER,

	propTypes: {
		/**
		 * Assistive text for removing a filter
		 */
		assistiveTextRemoveFilter: PropTypes.string,	/**
		 * Assistive text for removing a filter
		 */
		assistiveTextChangeFilter: PropTypes.string,
		/**
		 * Contents of popover. That is the dropdowns and inputs that set the filter criteria. Dropdowns, Picklists and other menus must use `isInline` to work properly within a Popover.
		 */
		children: PropTypes.node,
		/**
		* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		*/
		id: PropTypes.string,
		/**
			* If true, the filter will not display an editing popover when clicked
			*/
		locked: PropTypes.bool,
		/**
			* If true, the filter will not include a remove button
			*/
		permanent: PropTypes.bool,
		/**
		 * Will be triggered when Done within the Popover is clicked
		 */
		onChange: PropTypes.func,
		/**
		 * Will be triggered when "Remove Filter" button is clicked
		 */
		onRemove: PropTypes.func,
		/**
		 * The criteria you are filtering for. ("[The property] is blue")
		 */
		predicate: PropTypes.string,
		/**
		 * The property you are filter
		 */
		property: PropTypes.string
	},

	getDefaultProps () {
		return {
			assistiveTextChangeFilter: 'Select to change filter',
			assistiveTextRemoveFilter: 'Remove filter'
		};
	},

	getInitialState () {
		return {
			popoverIsOpen: false
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	handleFilterClick () {
		this.setState({ popoverIsOpen: true });
	},

	handleClose () {
		this.setState({ popoverIsOpen: false });
	},

	handleChange () {
		this.setState({ popoverIsOpen: false });
		
		if (this.props.onChange) {
			this.props.onChange({ id: this.getId() });
		}
	},

	handleRemove () {
		if (this.props.onRemove) {
			this.props.onRemove({ id: this.getId() });
		}
	},

	render () {
		return (
			<li className="slds-item slds-hint-parent">
				<div className="slds-filters__item slds-grid slds-grid--vertical-align-center">
				{!this.props.locked && this.props.children
					? <Popover
						align="left"
						body={this.props.children}
						footer={<Button
							className="slds-col--bump-left"
							label="Done"
							onClick={this.handleChange}
						/>}
						heading="Choose filter criteria"
						isOpen={this.state.popoverIsOpen}
						onClose={this.handleClose}
						onClickOutside={this.handleClose}
						triggerClassName="slds-grow"
					>
						<a
							href="javascript:void(0);"
							className="slds-has-blur-focus"
							onClick={this.handleFilterClick}
						>
							<p className="slds-text-body--small">{this.props.property}</p>
							<p>{this.props.predicate}</p>
							<span className="slds-assistive-text">{this.props.assistiveTextChangeFilter}</span>
						</a>
					</Popover>
					: <a href="javascript:void(0);" className="slds-grow slds-has-blur-focus">
						<p className="slds-text-body--small">{this.props.property}</p>
						<p>{this.props.predicate}</p>
					</a>
					}
					{!this.props.permanent
						? <Button
							className="slds-col--bump-left"
							assistiveText={this.props.assistiveTextRemoveFilter}
							hint
							iconCategory="utility"
							iconName="close"
							iconSize="small"
							iconVariant="bare"
							onClick={this.handleRemove}
							variant="icon"
						/>
					: null}
				</div>
			</li>
		);
	}
});

module.exports = FilteringPanelFilter;
