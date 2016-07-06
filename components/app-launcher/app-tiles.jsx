/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # App Launcher Tiles Component

// ## Dependencies

// ### React
import React from 'react';

// Removes the need for `React.PropTypes.prop`
const { PropTypes } = React;

// ## Children
import AppTile from './app-tile';
import Icon from '../icon';
import Button from '../button';

// ## Constants
import { APP_LAUNCHER_TILES } from '../../utilities/constants';

const AppTiles = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER_TILES,

	// ### Prop Types
	propTypes: {
		/**
		 * The localized text for the "All Apps" section.
		 */
		localizedAllAppsText: PropTypes.string,
		/**
		 * The localized text for the "All Items" section.
		 */
		localizedAllItemsText: PropTypes.string,
		/**
		 * The assistive text for the section collapse icons
		 */
		collapseSectionAssistiveText: PropTypes.string,
		// v REVIEW v
		appTileClicked: PropTypes.func,
		collection: PropTypes.array.isRequired,
		isVisible: PropTypes.bool,
		search: PropTypes.string,
		filterForSearch: PropTypes.func.isRequired
		// ^ REVIEW ^
	},

	getDefaultProps () {
		return {
			localizedAllAppsText: 'All Apps',
			localizedAllItemsText: 'All Items',
			collapseSectionAssistiveText: 'Toggle visibility of section'
		};
	},

	renderAppTiles (collection) {
		return collection.map(
			(item, i) => (
				<AppTile
					appTileClicked={this.props.appTileClicked}
					isVisible={this.props.isVisible}
					{...item}
					key={i}
				/>
			)
		);
	},

	render () {
		let collection = this.props.collection;

		if (this.props.search) {
			collection = this.props.filterForSearch(collection, ['appName', 'categoryName', 'appDescription'], this.props.search);
		}

		const installedApps = collection.filter((item) => (item.installed));
		const uninstalledApps = collection.filter((item) => (item.uninstalled));

		return (
			<div className="slds-modal__content slds-app-launcher__content slds-p-around--medium">
				<div className="slds-section slds-is-open">
					<div className="slds-section__title">
						<Button
							assistiveText={this.props.collapseSectionAssistiveText}
							iconName="switch"
							className="slds-button--icon slds-m-right--small"
							variant="icon"
						/>
						<h3>{this.props.localizedAllAppsText}</h3>
					</div>
					<ul className="slds-grid slds-grid--pull-padded slds-wrap">
						{this.renderAppTiles(installedApps)}
					</ul>
				</div>
				<hr />
				<div className="slds-section slds-is-open">
					<div className="slds-section__title">
						<Button
							assistiveText={this.props.collapseSectionAssistiveText}
							iconName="switch"
							className="slds-button--icon slds-m-right--small"
							variant="icon"
						/>
						<h3>{this.props.localizedAllItemsText}</h3>
					</div>
					<ul className="slds-grid slds-grid--pull-padded slds-wrap">
						{this.renderAppTiles(uninstalledApps)}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = AppTiles;
