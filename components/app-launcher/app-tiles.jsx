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

// ## Constants
import { APP_LAUNCHER_TILES } from '../../utilities/constants';

const AppTiles = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER_TILES,

	// ### Prop Types
	propTypes: {
		/**
		 * The localized text for the "More to Explore" App Launcher section.
		 */
		localizedMoreToExploreText: PropTypes.string,
		/**
		 * The localized text for the "Not Installed" subheader.
		 */
		localizedNotInstalledText: PropTypes.string,
		appTileClicked: PropTypes.func,
		collection: PropTypes.array.isRequired,
		isVisible: PropTypes.bool,
		search: PropTypes.string,
		filterForSearch: PropTypes.func.isRequired
	},

	getDefaultProps () {
		return {
			localizedMoreToExploreText: 'More to Explore',
			localizedNotInstalledText: 'Not Installed'
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
			<div>
				<h2 className="slds-text-heading--small slds-m-left--small">Marketing Cloud ({installedApps.length})</h2>
				<ul className="slds-list--horizontal slds-has-cards--space has-selections slds-wrap">
					{this.renderAppTiles(installedApps)}
				</ul>
				<hr />
				<h2 className="slds-text-heading--small slds-m-left--small">
					{this.props.localizedMoreToExploreText} ({uninstalledApps.length})
					<div className="slds-text-heading--label slds-p-top--xxx-small">{this.props.localizedNotInstalledText}</div>
				</h2>
				<ul className="slds-list--horizontal slds-has-cards--space has-selections slds-wrap">
					{this.renderAppTiles(uninstalledApps)}
				</ul>
			</div>
		);
	}
});

module.exports = AppTiles;
