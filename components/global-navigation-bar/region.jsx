/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Navigation Bar Region Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_REGION } from '../../utilities/constants';

// List regions for export
const regions = [
	'primary',
	'secondary',
	'tertiary'
];

/**
 * Regions make up a GlobalNavigation Bar and typically contain links and dropdowns. The Primary region contains the AppSwitcher, Application Name, and Object Switcher. The secondary region typically has navigation betweens sections of the application. The tertiary region is aligned to the right side of the screen and contains shortcuts or actions.
 */
 const Region = React.createClass({
	displayName: GLOBAL_NAVIGATION_BAR_REGION,

	// ### Prop Types
	propTypes: {
		/**
		 * Contents of region. Expects `GlobalNavigationBarLink`, `GlobalNavigationBarDropdown`, `GlobalNavigationBarApplicationName`, `AppSwitcher`, but could be any component. This is the place to pass in an Object Switcher until that is supported.
		 */
		children: PropTypes.node,
		/**
		 * Determines position of separating bar. The default is `null` except for the `primary` region which is set to `right` due to design system styling.
		 */
		dividerPosition: PropTypes.oneOf(['left', 'right']),
		/**
		 * CSS classes to be added to the region
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Wraps the `secondary` region in a `nav` and adds a role attribute
		 */
		navigation: PropTypes.bool,
		/**
		 * Region wrap children in styling specific to that region.
		 */
		region: PropTypes.oneOf(regions)
	},

	renderPrimary (dividerClass) {
		return (
			<div className={classNames('slds-context-bar__primary', dividerClass, this.props.className)}>
				{this.props.children}
			</div>
		);
	},

	renderSecondary (dividerClass) {
		let region;

		if (this.props.navigation) {
			region = (
				<nav className={classNames('slds-context-bar__secondary', dividerClass, this.props.className)} role="navigation">
					<ul className="slds-grid">
						{this.props.children}
					</ul>
				</nav>
			);
		} else {
			region = (
				<div className={classNames('slds-context-bar__secondary', dividerClass, this.props.className)}>
					<ul className="slds-grid">
						{this.props.children}
					</ul>
				</div>
			);
		}
		return region;
	},

	renderTertiary (dividerClass) {
		return (
			<div className={classNames('slds-context-bar__tertiary', 'slds-col--bump-left', dividerClass, this.props.className)}>
				<ul className="slds-grid">
					{this.props.children}
				</ul>
			</div>
		);
	},

	// ### Render
	render () {
		let region;
		let dividerClass;

		if (this.props.dividerPosition) {
			dividerClass = `slds-context-bar__item--divider-${this.props.dividerPosition}`;
		} else if (this.props.dividerPosition === null) {
			dividerClass = null;
		} else if (this.props.region === 'primary' && typeof(dividerClass) === 'undefined') {
			// By default divider position is always `right` for the primary region due to SLDS guidelines. Implicit defaults are bad and this is a compromise to not add yet another import for just the primary region.
			dividerClass = 'slds-context-bar__item--divider-right';
		}

		switch (this.props.region) {
			case 'primary':
				region = this.renderPrimary(dividerClass);
				break;
			case 'secondary':
				region = this.renderSecondary(dividerClass);
				break;
			case 'tertiary':
				region = this.renderTertiary(dividerClass);
				break;
			default:
				region = null;
		}

		return region;
	}
 });

module.exports = Region;
module.exports.regions = regions;
