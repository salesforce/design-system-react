/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # ContextBar Region Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { CONTEXT_BAR_REGION } from '../../utilities/constants';

const cssClasses = {
	primary: 'slds-context-bar__primary',
	secondary: 'slds-context-bar__secondary',
	tertiary: 'slds-context-bar__tertiary',
	appName: 'slds-context-bar__app-name'
};

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
		 * Triggered by click of application name or switcher icon in the `primary` region. Will be ignored in other regions.
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
		const props = this.props;
		const truncate = this.props.truncate;
		const appName = (
			<span className={classNames('slds-context-bar__label-action', cssClasses.appName)}>
				<span className={classNames({ 'slds-truncate': truncate })}>{props.applicationName}</span>
			</span>
		);

		// This is a hack to allow longer application names without truncating them, and should be removed in the future by adding a reset class.
		let style = null;
		if (!truncate) {
			style = { maxWidth: 'none' };
		}

		// Group these, since they have the same hover and onClick
		const primaryItem = (
			<div className="slds-context-bar__item" onClick={props.applicationNameOnClick} style={style}>
				{props.applicationSwitcher}
				{props.applicationName ? appName : null}
			</div>
		);

		return (
			<div className={classNames(cssClasses.primary, this.props.className)}>
				{props.applicationSwitcher || props.applicationName ? primaryItem : null}
				{this.props.children}
			</div>
		);
	},

	renderSecondary () {
		const nav = (
			<nav className={classNames(cssClasses.secondary, this.props.className)} role="navigation">
				<div className="slds-context-bar__vertical-divider" />
				<ul className="slds-grid">
					{this.props.children}
				</ul>
			</nav>
		);

		const div = (
			<div className={classNames(cssClasses.secondary, this.props.className)}>
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
			<div className={classNames(cssClasses.tertiary, 'slds-col--bump-left', this.props.className)}>
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
module.exports.cssClasses = cssClasses;
