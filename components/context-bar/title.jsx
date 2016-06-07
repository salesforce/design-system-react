/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable indent */

// ## Dependencies

// ### React
import React from 'react';

// ## Constants
import { CONTEXT_BAR_TITLE } from './constants';

// Removes the need for `PropTypes`.
const { PropTypes } = React;

/**
 * Component description.
 */
const ContextBarTitle = (props) => (
	<div className="slds-context-bar__primary slds-context-bar-action slds-grid grid--vertical-align-stretch">
		<a
			href="#void"
			className="slds-context-bar-action__label slds-grid slds-grid--vertical-align-center slds-text-link--reset slds-p-horizontal--large slds-text-heading--small"
		>{props.children}</a>
	</div>
);

ContextBarTitle.displayName = CONTEXT_BAR_TITLE;

// ### Prop Types
ContextBarTitle.propTypes = {
	/**
	 * What to display in title area (text, text + icon, etc).
	 */
	children: PropTypes.node
};

export default ContextBarTitle;
