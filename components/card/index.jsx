/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// # Card Component

// Implements the [Card design pattern](https://www.lightningdesignsystem.com/components/cards/) in React.

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

// ## Children
import Header from './header';
import Body from './body';
import Footer from './footer';
import Empty from './empty';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.
const COMPONENT = 'Card';

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
const cssClasses = {
	base: 'slds-card'
}

/**
 * Cards are used to apply a container around a related grouping of information. It has a header, a body, and an optional footer. It often contains a DataTable or Tile (coming soon). Actions associated with selected items or with all items are included within the header actions. Footer often contains pagination.
 */
const Card = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		/**
		 * The main section of the card. It often contains a `DataTable` or `Tile`.
		 */
		children: PropTypes.node,
		/**
		 * CSS classes to be added to the card.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Replaces the body (that is the children) with the specified empty state, this will also remove header actions, the filter, and the icon. If the default empty state is wanted, set to `true`.
		 */
		empty: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
		/**
		 * Adds a filter input to the card header.
		 */
		filter: PropTypes.node,
		/**
		 * Footer often contains pagination.
		 */
		footer: PropTypes.node,
		/**
		 * The heading is the name of the related item group.
		 */
		heading: PropTypes.string.isRequired,
		/**
		 * Actions to perform on selected items or actions that are not specific to one item such as adding an item. If no group actions are needed, then the number of selected items is often present.
		 */
		headerActions: PropTypes.node,
		/**
		 * Icon associated with the items within the `body`.
		 */
		icon: PropTypes.node,
		/**
		 * Set the HTML `id` of the card. This also sets the `id` of the filter and the header actions.
		 */
		id: PropTypes.string.isRequired
	},

	getDefaultProps () {
		return {
			heading: 'Related Items'
		};
	},

	_renderFooter () {
		return (
			<Footer>
				{this.props.footer}
			</Footer>
		);
	},

	_renderBody (body) {
		return (
			<Body>
				{body}
			</Body>
		);
	},

	// Can be overridden by passing in a node to the empty prop
	_renderDefaultEmpty () {
		return (
			<Empty id={this.props.id} heading={this.props.heading} />
		);
	},

	// ### Render
	render () {
		let { empty } = this.props;
		if (empty === true) {
			empty = this._renderDefaultEmpty();
		}
		return (
			<div id={this.props.id} className={classnames(cssClasses.base, this.props.className)}>
				<Header
					icon={empty ? null : this.props.icon}
					id={this.props.id}
					filter={this.props.filter}
					heading={this.props.heading}
					headerActions={empty ? null : this.props.headerActions} />
				{!empty ? this._renderBody(this.props.children) : this._renderBody(empty)}
				{this.props.footer && !empty ? this._renderFooter() : null}
			</div>
		);
	},

});

module.exports = Card;
module.exports.COMPONENT = COMPONENT;
module.exports.cssClasses = cssClasses;
