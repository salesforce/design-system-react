/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

// ## Children
import MediaObject from '../media-object';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

import { CARD_HEADER } from '../../utilities/constants';

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
const cssClasses = {
	base: 'slds-card__header'
};

const idSuffixes = {
	headerActions: '__header-actions',
	heading: '__heading'
};

// ## CardHeaderDefinition
const CardHeader = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: CARD_HEADER,
	// ### Prop Types
	propTypes: {
		/**
		 * Adds a filter input to the card header
		 */
		filter: PropTypes.node,
		/**
		 * Actions performed on selected items or that relate to the entire group of items such as "Add Item.""
		 */
		headerActions: PropTypes.node,
		/**
		 * The heading is the name of the related item group.
		 */
		heading: PropTypes.string.isRequired,
		/**
		 * Icon associated with grouped items
		 */
		icon: PropTypes.node,
		/**
		 * Set the HTML `id` of the card filter and header actions.
		 */
		id: PropTypes.string.isRequired
	},

	renderFilter () {
		const filter = React.cloneElement(this.props.filter, {
			id: this.props.id
		});

		return (
			<div className="slds-input-has-icon slds-input-has-icon--left slds-size--1-of-3">
				{filter}
			</div>
		);
	},

	renderMediaObjectBody () {
		return (
			<h2
				id={this.props.id + idSuffixes.heading}
				className="slds-text-heading--small slds-truncate"
				title={this.props.heading}
			>
				{this.props.heading}
			</h2>
		);
	},

	render () {
		let filter = null;
		const hasFilter = this.props.filter ? true : null;

		if (this.props.filter) {
			filter = this.renderFilter();
		}

		return (
			<div className={classnames(cssClasses.base, 'slds-grid')}>
				<MediaObject
					figure={this.props.icon}
					body={this.renderMediaObjectBody()}
					verticalCenter
					canTruncate
				/>
				{filter}
				<div
					id={this.props.id + idSuffixes.headerActions}
					className={classnames('slds-no-flex', { 'slds-size--1-of-3': hasFilter, 'slds-text-align--right': hasFilter })}
				>
					{this.props.headerActions}
				</div>
			</div>
		);
	}
});

module.exports = CardHeader;
module.exports.cssClasses = cssClasses;
module.exports.idSuffixes = idSuffixes;
