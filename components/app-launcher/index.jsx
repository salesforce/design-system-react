/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # App Launcher Component

// ## Dependencies

// ### React
import React from 'react';

// Removes the need for `React.PropTypes.prop`
const { PropTypes } = React;

// ## Children
import Modal from './modal';
import Button from '../button';
// import Dropdown from 'slds-for-react/dropdown';
// import functionBinder from '../utilities/function-binder.js';
// import Menu from 'slds-for-react/menu';
// import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
// import ReactDOM from 'react-dom';
// import reactMixin from 'react-mixin';
// import PreviewMenuItems from './preview-menu-items';
// import Search from '../search';
// import Trigger from 'slds-for-react/dropdown/button-trigger';

// ## Constants
import { APP_LAUNCHER } from '../../utilities/constants';

const AppLauncher = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER,

	// ### Prop Types
	propTypes: {
		// TODO: ADD PROPTYPE DESCRIPTIONS
		/*
		 * Set the App Launcher's title text (for localization)
		 */
		appLauncherTitle: PropTypes.string,
		/*
		 * Set the search input's placeholder text (for localization)
		 */
		searchPlaceholderText: PropTypes.string,
		/*
		 * Set the App Exchange Button's text (for localization)
		 */
		appExchangeButtonText: PropTypes.string,
		appTileClicked: PropTypes.func,
		collection: PropTypes.array.isRequired,
		filterForSearch: PropTypes.func,
		// localization: PropTypes.object.isRequired,
		modalIsOpen: PropTypes.bool,
		modalSearch: PropTypes.string,
		onModalClose: PropTypes.func,
		onModalOpen: PropTypes.func,
		onDropdownClose: PropTypes.func,
		onDropdownOpen: PropTypes.func,
		onSearchChange: PropTypes.func,
		onModalSearchChange: PropTypes.func,
		search: PropTypes.string,
		data: PropTypes.object
	},

	handleDropdownClose () {
		if (this.props.onDropdownClose) {
			this.props.onDropdownClose();
		}
	},

	handleDropdownOpen () {
		if (this.props.onDropdownOpen) {
			this.props.onDropdownOpen();
		}
		// TODO: Figure out why this doesn't work. -cdmc
		ReactDOM.findDOMNode(this.refs['app-launcher__search'].refs.input).focus();
	},

	handleSearchChange (value, e) {
		e.stopPropagation();
		// TODO: why does search act so wonky within a dropdown that three event handlers and this value check is needed...
		if (value !== this.props.search && this.props.onSearchChange) {
			this.props.onSearchChange(value, e);
		}
	},

	handleSearchInputClick (e) {
		e.nativeEvent.stopImmediatePropagation();
	},

	handleTriggerClick (e) {
		if (this.props.onModalOpen) {
			this.props.onModalOpen(e);
		}
	},

	/*
	 * itemCollection - collection of items to search/filter
	 * searchableFields - which fields in the itemCollection should be searched against
	 * queryString - text to use to perform search
	 */
	defaultFilterForSearch (itemCollection, searchableFields, queryString) {
		let queryTerms = [queryString].concat(queryString.split(' '));

		// strip out spaces and blank characters left by split -cdmc
		queryTerms = queryTerms.filter((term) => (term !== ' ' && term.length > 0));

		const queryExpressions = queryTerms.map((term) => new RegExp(term, 'gi'));

		const results = [];
		/*
			Make sure we prioritize itemCollection instead of queryExpressions, otherwise
			full string matches will take precedence over item order, meaning:

			A search for "Social Studio" against ["Email Studio", "Social Studio"]
			would return ["Social Studio", "Email Studio"] -cdmc
		*/
		itemCollection.forEach((item) => {
			queryExpressions.forEach((queryExpression) => {
				searchableFields.forEach((field) => {
					if (item[field] && item[field].search(queryExpression) > -1) {
						results.push(item);
					}
				});
			});
		});

		// TODO: Sort each results array further? -cdmc

		// Remove duplicates -cdmc
		const rankedSearchResults = [...new Set(results)];

		return rankedSearchResults;
	},

	/*
	 * This filter is much more intelligent, in that it prioritizes not only full-string matches,
	 * but also allows you to rank search-able fields in a weighted order.
	 *
	 * If you pass in [a, b] for searchableFields, matches against a will rank higher in search
	 * than matches for b. -cdmc
	 */
	defaultRankedFilterForSearch (itemCollection, searchableFields, queryString) {
		let queryTerms = [queryString].concat(queryString.split(' '));

		// strip out spaces and blank characters left by split -cdmc
		queryTerms = queryTerms.filter((term) => (term !== ' ' && term.length > 0));

		const queryExpressions = queryTerms.map((term) => new RegExp(term, 'gi'));

		// instantiate results object and create empty arrays for each field to match against
		const results = {};
		searchableFields.forEach((field) => { results[field] = []; });

		/*
			Make sure we prioritize queryExpressions instead of itemCollection, otherwise
			item order will take precedence over full string matches, meaning:

			A search for "Social Studio" against ["Email Studio", "Social Studio"]
			would return ["Email Studio", "Social Studio"] because all regex
			(/Social Studio/gi, /Social/gi, /Studio/gi) would be run against
			"Email Studio" first, and then run against "Social Studio". Both
			return matches, so, "Email Studio" would then appear first in the
			search results, which is inappropriate.

			Meaning: we need to loop through search Expressions and then
			iterate over all itemCollection for each expression in order to get properly
			prioritized results (the way this is written, a refactor could do
			it differently I suppose) -cdmc
		*/
		queryExpressions.forEach((queryExpression) => {
			itemCollection.forEach((item) => {
				searchableFields.forEach((field) => {
					if (item[field] && item[field].search(queryExpression) > -1) {
						results[field].push(item);
					}
				});
			});
		});

		// TODO: Sort each results array further? -cdmc

		// Flatten out the results, keeping ranked-order intact -cdmc
		let combinedResults = [];
		for (const resultSet of Object.keys(results)) {
			combinedResults = combinedResults.concat(results[resultSet]);
		}

		// Remove duplicates -cdmc
		const rankedSearchResults = [...new Set(combinedResults)];

		return rankedSearchResults;
	},

	/*
	 * Contains business rules for whether an app is considered "installed" or not,
	 * and if it should be displayed in waffle menu.
	 */
	populateAppVisibility (collection) {
		collection.forEach((item) => {
			const isInstalled = (item.hasAccess && item.isProvisioned && item.isVisibleImh);
			const isUninstalled = ((!item.hasAccess || !item.isProvisioned) && item.isVisibleImh);

			item.installed = isInstalled;
			item.uninstalled = isUninstalled;
			item.visibleInAppLauncherMenu = (
				isInstalled &&
				item.appName.toLowerCase() !== 'pulse' && //TODO: add attribute (onlyModal) to data structure MCGLOBALNV-269
				item.appName.toLowerCase() !== 'playbooks'
			);
		});

		return collection;
	},

	// getDefaultProps () {
	// 	return {

	// 	};
	// },

	// ### Render
	render () {
		const sharedFilterDefinition = this.props.filterForSearch || this.defaultFilterForSearch;

		const collection = this.populateAppVisibility(this.props.collection);
		// let filteredCollection = collection;

		// if (this.props.search) {
		// 	filteredCollection = sharedFilterDefinition(filteredCollection, ['appName', 'categoryName'], this.props.search);
		// }

		// const dropdownCollection = filteredCollection.filter((item) => (item.visibleInAppLauncherMenu));

		// // max visible apps out at 10.
		// if (dropdownCollection.length > 10) {
		// 	dropdownCollection.length = 10;
		// }

		// const matchingText = (dropdownCollection.length === 1) ?
		// 	this.props.localization.APP_LAUNCHER_MATCHING_ITEM :
		// 	this.props.localization.APP_LAUNCHER_MATCHING_ITEMS;

		// const dropdownTitle = (this.props.search.length > 0) ?
		// 	`${dropdownCollection.length} ${matchingText}` :
		// 	this.props.localization.APP_LAUNCHER_MARKETING_CLOUD_APPS;

		return (
			<div className="slds-global-nav__app-launcher">
				<Modal
					appLauncherTitle={this.props.appLauncherTitle}
					searchPlaceholderText={this.props.searchPlaceholderText}
					appExchangeButtonText={this.props.appExchangeButtonText}
					appTileClicked={this.props.appTileClicked}
					collection={collection}
					data={this.props.data}
					modalIsOpen={this.props.modalIsOpen}
					onClose={this.props.onModalClose}
					trigger={this.refs.trigger}
					filterForSearch={sharedFilterDefinition}
					search={this.props.modalSearch}
					onSearchChange={this.props.onModalSearchChange}
				/>
			</div>
		);
	}
});

module.exports = AppLauncher;
