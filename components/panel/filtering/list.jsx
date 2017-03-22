/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Filter List

// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ## Constants
import { PANEL_FILTER_LIST } from '../../../utilities/constants';

/**
 * A list of Filters. This is a higher order component for filters that decorates the filter to work within a Filtering Panel. It also adds support for a Filter error label.
 */
const PanelFilterList = React.createClass({
	displayName: PANEL_FILTER_LIST,

	propTypes () {
		return {
			/**
			 * Pass in `Filter` components
			 */
			children: PropTypes.node
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();
	},

	render () {
		const children = React.Children.map(this.props.children, (child, index) => {
			const id = child && child.props.id
			? child.props.id
			: `${this.generatedId}-${index}`;

			let clonedChild;

			if (child && child.props.errorLabel) {
				clonedChild = React.cloneElement(child, {
					isError: true
				});
			}

			return (
				child ? <li className="slds-item slds-hint-parent">
					{clonedChild || child}
					{child.props.errorLabel ? <p id={`${id}-error`} className="slds-text-color--error slds-m-top--xx-small">{child.props.errorLabel}</p> : null}
				</li> : null
			);
		});

		return (
			<ol className="slds-list--vertical slds-list--vertical-space">
				{children}
			</ol>
		);
	}
});

export default PanelFilterList;
