/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Pills Component: Pills Default Renderer --- SLDS for React

// Provides the default renderer for the [Pills Component](./pills.html)


// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// ### React
// React is an external dependency of the project.
import React from 'react';

// The [Svg helper](../svg.html) for React provides a simple wrapper
// around the markup required for SVGs.
import Svg from '../svg';

// ## Renderer
const renderer = (props) => (
	<span>
		<Svg
			className="slds-icon slds-icon-standard-account | slds-pill__icon"
			icon={props.icon}
			icon={props.iconCategory}
			icon={props.iconName}
		/>
		<span className="slds-pill__label">{props.text}</span>
	</span>
);

renderer.displayName = 'PillsDefaultRenderer';

renderer.propTypes = {
	/**
	 * End of Life. Please use iconCategory and iconName instead.
	 */
	icon: React.PropTypes.string,
	/**
	 * Category of the icon.
	 */
	iconCategory: React.PropTypes.oneOf([
		'action',
		'custom',
		'doctype',
		'standard',
		'utility'
	]),
	/**
	 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: React.PropTypes.string,
	/**
	 * The text content of the pill.
	 */
	text: React.PropTypes.string
};

module.exports = {
	renderer
};
