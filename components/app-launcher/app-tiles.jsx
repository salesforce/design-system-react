import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React from 'react';
import reactMixin from 'react-mixin';

import AppTile from './app-tile.js';

class AppTiles extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	renderAppTiles (collection) {
		return collection.map(
			(item, i) => (
				<AppTile
					appTileClicked={this.props.appTileClicked}
					localization={this.props.localization}
					isVisible={this.props.isVisible}
					{...item}
					key={i}
				/>
			)
		);
	}

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
					{this.props.localization.APP_LAUNCHER_MORE_TO_EXPLORE} ({uninstalledApps.length})
					<div className="slds-text-heading--label slds-p-top--xxx-small">{this.props.localization.APP_LAUNCHER_NOT_INSTALLED}</div>
				</h2>
				<ul className="slds-list--horizontal slds-has-cards--space has-selections slds-wrap">
					{this.renderAppTiles(uninstalledApps)}
				</ul>
			</div>
		);
	}
}

AppTiles.propTypes = {
	appTileClicked: React.PropTypes.func,
	collection: React.PropTypes.array.isRequired,
	isVisible: React.PropTypes.bool,
	localization: React.PropTypes.object.isRequired,
	search: React.PropTypes.string,
	filterForSearch: React.PropTypes.func.isRequired
};

AppTiles.displayName = 'AppTiles';

reactMixin(AppTiles.prototype, PureRenderMixin);

export default AppTiles;
