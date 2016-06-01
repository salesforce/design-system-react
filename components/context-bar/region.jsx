/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

import { CONTEXT_BAR_REGION } from '../../utilities/constants';

// List regions for export
const regions = [
	'primary',
	'secondary',
	'tertiary'
];

/**
 * Regions make up a Context Bar and typically contain links and dropdowns. The Primary region contains the AppSwitcher, Application Name, and Object Switcher. The secondary region typically has navigation betweens sections of the application. The tertiary region is aligned to the right side of the screen and contains shortcuts or actions.
 */
 const Region = React.createClass({
	displayName: CONTEXT_BAR_REGION,

	// ### Prop Types
	propTypes: {
		/**
		 * This is typically the name of the cloud
		 */
		applicationName: PropTypes.node,
		/**
		 * Pass in the app icon with a context menu to allow switching applications
		 */
		applicationSwitcher: PropTypes.node,
		/**
		 * Contents of region. Expects `ContextBarLink` or `ContextBarDropdown`. This is optional when using `region:primary` in combination with other properties. This is also the place to pass in an Object Switcher until that is supported.
		 */
		children: PropTypes.node,
		/**
		 * CSS classes to be added to the region
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Wraps the `secondary` region in a `nav` and adds a role attribute
		 */
		navigation: PropTypes.bool,
		/**
		 * Fire on click of entire region. (Only works for `primary` region for opening an Application Switcher or Launcher)
		 */
		onClick: PropTypes.func,
		/**
		 * Region wrap children in styling specific to that region.
		 */
		region: PropTypes.oneOf(regions),
		/**
		 * Overrides truncation of `primary` region and `applicationName` to allow longer names
		 */
		truncate: PropTypes.bool
	},

	getDefaultProps () {
		return {
			navigation: false,
			truncate: true
		};
	},

	renderPrimary () {
		const truncate = this.props.truncate;
		const appName = (
			<span className="slds-context-bar__label-action slds-context-bar__app-name">
				<span className={classNames({ 'slds-truncate': truncate })}>{this.props.applicationName}</span>
			</span>
		);

		// This is a hack to allow longer application names and should be removed in the future by adding a reset class.
		let style = null;
		if (!truncate) {
			style = { maxWidth: 'none' };
		}

		return (
			<div className={classNames('slds-context-bar__item', this.props.className)} onClick={this.props.onClick} style={style}>
				{this.props.applicationSwitcher}
				{this.props.applicationName ? appName : null}
				{this.props.children}
			</div>
		);
	},

	renderSecondary () {
		const nav = (
			<nav className={classNames('slds-context-bar__secondary', this.props.className)} role="navigation">
				<div className="slds-context-bar__vertical-divider" />
				<ul className="slds-grid">
					{this.props.children}
				</ul>
			</nav>
		);

		const div = (
			<div className={classNames('slds-context-bar__secondary', this.props.className)}>
				<div className="slds-context-bar__vertical-divider" />
				<ul className="slds-grid">
					{this.props.children}
				</ul>
			</div>
		);

		return this.props.navigation ? nav : div;
	},

	renderTertiary () {
		return (
			<div className={classNames('slds-context-bar__tertiary', 'slds-col--bump-left', this.props.className)}>
				<ul className="slds-grid">
					{this.props.children}
				</ul>
			</div>
		);
	},

	// ### Render
	render () {
		const props = this.props;
		let region;

		switch (props.region) {
			case 'primary':
				region = this.renderPrimary();
				break;
			case 'secondary':
				region = this.renderSecondary();
				break;
			case 'tertiary':
				region = this.renderTertiary();
				break;
			default:
				region = null;
		}

		return region;
	}
 });

module.exports = Region;
module.exports.regions = regions;
