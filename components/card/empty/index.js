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

// Removes the need for `PropTypes`.
const { PropTypes } = React;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.
export const COMPONENT = 'CardEmpty';

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
export const idSuffixes = {
	heading: '__empty-heading'
}

const SLDSCardEmpty = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
		/**
		 * Additional call to actions that will render under the heading. Often this is an "Add Item" button.
		 */
		children: PropTypes.node,
		/**
		 * Primary text for an Empty Card.
		 */
		heading: PropTypes.string,
		/**
		 * Set the HTML `id` of the empty heading.
		 */
		id: PropTypes.string
	},

	getDefaultProps () {
		return {
			heading: "No Related Items"
		};
	},

	// ### Render
	render () {
		const id = this.props.id ? (this.props.id + idSuffixes.heading) : null;
		return ( 
			<div className="slds-p-horizontal--small">
				<div className="slds-text-align--center slds-m-bottom--x-large">
				<h3 id={id} className="slds-text-heading--small slds-p-top--large slds-p-bottom--large">{this.props.heading}</h3>
					{this.props.children}
				</div>
			</div>
		);
	}
});

export default SLDSCardEmpty;
