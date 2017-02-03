/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/* eslint-disable no-script-url */

// # Panel - Filter variant

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

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
		assistiveTextRemoveFilter: PropTypes.string,
		/**
		 * Assistive text for changing a filter
		 */
		assistiveTextChangeFilter: PropTypes.string,
		/**
		 * Assistive text for Popover heading
		 */
		assistiveTextChangeFilterHeading: PropTypes.string,
		/**
		 * Contents of popover. That is the dropdowns and inputs that set the filter criteria. Dropdowns, Picklists and other menus must use `isInline` to work properly within a Popover.
		 */
		children: PropTypes.node,
		/**
			* Will put filter into error styling and add error label to it.
			*/
		errorLabel: PropTypes.string,
		/**
		* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		*/
		id: PropTypes.string,
		/**
			* If true, the filter will not display an editing popover when clicked
			*/
		locked: PropTypes.bool,
		/**
			* Applies new filter styling
			*/
		new: PropTypes.bool,
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
		predicate: PropTypes.node,
		/**
		 * The property you are filter
		 */
		property: PropTypes.node
	},

	getDefaultProps () {
		return {
			assistiveTextChangeFilter: 'Edit filter:',
			assistiveTextChangeFilterHeading: 'Choose filter criteria',
			assistiveTextRemoveFilter: 'Remove filter:',
			predicate: 'New Filter'
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
		const popoverBody = (
			<div>
				<h4 className="slds-assistive-text" id={`${this.getId()}-popover-heading`}>{this.props.assistiveTextChangeFilterHeading}</h4>
				{this.props.children}
				<div className="slds-m-top--small slds-text-align--right">
					<Button
						className="slds-col--bump-left"
						label="Done"
						onClick={this.handleChange}
					/>
				</div>
			</div>
		);

		/* TODO: Button wrapper for property and predictate should be transitioned to `Button` component */

		return (
			<li className="slds-item slds-hint-parent">
				<div
					className={classNames(
						'slds-filters__item',
						'slds-grid',
						'slds-grid--vertical-align-center', {
							'slds-is-locked': this.props.locked,
							'slds-is-new': this.props.new,
							'slds-has-error': this.props.errorLabel
						}
					)}
				>
				{!this.props.locked && this.props.children
					? <Popover
						ariaLabelledby={`${this.getId()}-popover-heading`}
						align="left"
						body={popoverBody}
						heading=""
						id={this.getId()}
						isOpen={this.state.popoverIsOpen}
						onClose={this.handleClose}
						onRequestClose={this.handleClose}
						triggerClassName="slds-grow"
					>
						<button
							className="slds-button--reset slds-grow slds-has-blur-focus"
							onClick={this.handleFilterClick}
							disabled={this.props.locked}
							aria-describedby={this.props.errorLabel ? `${this.getId()}-error` : undefined}
						>
							<span className="slds-assistive-text">{this.props.assistiveTextChangeFilter}</span>
							{this.props.property ? <p className="slds-text-body--small">{this.props.property}</p> : null}
							<p>{this.props.predicate}</p>
						</button>
					</Popover>
					: <button className="slds-button--reset slds-grow slds-has-blur-focus" disabled>
						<p className="slds-text-body--small">{this.props.property}</p>
						<p>{this.props.predicate}</p>
					</button>
					}
					{!this.props.permanent && !this.props.locked
						? <Button
							assistiveText={`${this.props.assistiveTextRemoveFilter} ${this.props.property} ${this.props.predicate}`}
							hint
							iconCategory="utility"
							iconName="close"
							iconSize="small"
							iconVariant="bare"
							onClick={this.handleRemove}
							title={`${this.props.assistiveTextRemoveFilter} ${this.props.predicate}`}
							variant="icon"
						/>
					: null}
				</div>
				<p id={`${this.getId()}-error`} className="slds-text-color--error slds-m-top--xx-small">{this.props.errorLabel}</p>
			</li>
		);
	}
});

module.exports = FilteringPanelFilter;
