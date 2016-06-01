/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// # ContextBar Component

// Implements the [ContextBar design pattern](https://www.lightningdesignsystem.com/components/context-bar/) in React.

// ## Dependencies

// ### React
import React from 'react';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { CONTEXT_BAR, CONTEXT_BAR_TITLE } from './constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * Component description.
 */
const ContextBar = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: CONTEXT_BAR,

	// ### Prop Types
	propTypes: {
		/**
		 * The items to be displayed in the ContextBar.
		 */
		children: PropTypes.node,
		/**
		 * Class names to be added to the container element (this element also has `slds-context-bar slds-grid` classes).
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])
	},

	// ### Render
	render () {
		let title;

		const children = React.Children.map(this.props.children, (child) => {
			if (child && child.type.displayName === CONTEXT_BAR_TITLE) {
				title = child;
			} else {
				return child;
			}
		});

		return (
			<div className={classNames('slds-context-bar slds-grid', this.props.className)}>
				<div className="slds-context-bar__shadow"></div>
				{title}
				<div className="slds-grid slds-size--1-of-1">
					{children}
				</div>
			</div>
		);
	}
});

export default ContextBar;
