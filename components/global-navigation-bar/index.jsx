/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Navigation Bar Component

// Implements the [Global Navigation Bar design pattern](https://www.lightningdesignsystem.com/components/global-navigation#flavor-navigation-bar) in React.
// Based on SLDS v2.1.0-rc.2

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { GLOBAL_NAVIGATION_BAR, GLOBAL_NAVIGATION_BAR_REGION } from '../../utilities/constants';

const auditChildren = (children) => {
	let primaryRegion;
	// there can be multiple secondary navigation regions
	const secondaryRegions = [];
	let tertiaryRegion;

	React.Children.forEach(children, (child) => {
		if (child && child.type.displayName === GLOBAL_NAVIGATION_BAR_REGION) {
			if (child.props.region === 'primary') {
				primaryRegion = child;
			} else if (child.props.region === 'secondary') {
				secondaryRegions.push(child);
			} else if (child.props.region === 'tertiary') {
				tertiaryRegion = child;
			}
		}
	});

	if (primaryRegion && secondaryRegions.length === 0) {
		primaryRegion = React.cloneElement(primaryRegion, {
			dividerPosition: null,
			key: 'primary-region'
		});
	}

	return [primaryRegion, ...secondaryRegions, tertiaryRegion];
};

/**
  * Global Navigation Bar represents a list of links that either take the user to another page or parts of the page the user is in.
 */
const GlobalNavigationBar = (props) => (
	<div
		className={classNames(
			'slds-context-bar',
			{
				[`slds-context-bar--theme-${props.cloud}`]: props.cloud,
				[`slds-context-bar--theme-${props.theme}`]: props.theme
			},
			props.className)}
	>
			{auditChildren(props.children)}
	</div>
);

// ### Prop Types
GlobalNavigationBar.propTypes = {
	/**
	 * The items to be displayed in the Global Navigation Bar.
	 */
	children: PropTypes.node,
	/**
	 * CSS class names to be added to the container element.
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Typically the cloud name (e.g.- "sales" or "marketing"). This primarily changes the background color.
	 */
	cloud: PropTypes.string,
	/**
	 * Transforms text and interactions (such as hover) to be more visually accessible.
	 */
	theme: PropTypes.oneOf(['light', 'dark'])
};

GlobalNavigationBar.defaultProps = {
	cloud: 'default',
	theme: 'dark'
};


GlobalNavigationBar.displayName = GLOBAL_NAVIGATION_BAR;

module.exports = GlobalNavigationBar;
