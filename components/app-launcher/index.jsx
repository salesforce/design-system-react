import AppLauncherModal from './app-launcher-modal';
import Button from 'slds-for-react/button';
import Dropdown from 'slds-for-react/dropdown';
import functionBinder from '../utilities/function-binder.js';
import Menu from 'slds-for-react/menu';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';
import PreviewMenuItems from './preview-menu-items';
import Search from '../search';
import Trigger from 'slds-for-react/dropdown/button-trigger';

class AppLauncher extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};

		functionBinder(this, [
			'handleDropdownClose',
			'handleDropdownOpen',
			'handleSearchChange',
			'handleSearchInputClick',
			'handleTriggerClick'
		]);

		this.handleDropdownClose = this.handleDropdownClose.bind(this);
		this.handleDropdownOpen = this.handleDropdownOpen.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchInputClick = this.handleSearchInputClick.bind(this);
		this.handleTriggerClick = this.handleTriggerClick.bind(this);
	}

	handleDropdownClose () {
		if (this.props.onDropdownClose) {
			this.props.onDropdownClose();
		}
	}

	handleDropdownOpen () {
		if (this.props.onDropdownOpen) {
			this.props.onDropdownOpen();
		}
		// TODO: Figure out why this doesn't work. -cdmc
		ReactDOM.findDOMNode(this.refs['app-launcher__search'].refs.input).focus();
	}

	handleSearchChange (value, e) {
		e.stopPropagation();
		// TODO: why does search act so wonky within a dropdown that three event handlers and this value check is needed...
		if (value !== this.props.search && this.props.onSearchChange) {
			this.props.onSearchChange(value, e);
		}
	}

	handleSearchInputClick (e) {
		e.nativeEvent.stopImmediatePropagation();
	}

	handleTriggerClick (e) {
		if (this.props.onModalOpen) {
			this.props.onModalOpen(e);
		}
	}

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
	}

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
	}

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
	}

	render () {
		const localization = this.props.localization;

		const sharedFilterDefinition = this.props.filterForSearch || this.defaultFilterForSearch;

		const collection = this.populateAppVisibility(this.props.collection);
		let filteredCollection = collection;

		if (this.props.search) {
			filteredCollection = sharedFilterDefinition(filteredCollection, ['appName', 'categoryName'], this.props.search);
		}

		const dropdownCollection = filteredCollection.filter((item) => (item.visibleInAppLauncherMenu));

		// max visible apps out at 10.
		if (dropdownCollection.length > 10) {
			dropdownCollection.length = 10;
		}

		const matchingText = (dropdownCollection.length === 1) ?
			this.props.localization.APP_LAUNCHER_MATCHING_ITEM :
			this.props.localization.APP_LAUNCHER_MATCHING_ITEMS;

		const dropdownTitle = (this.props.search.length > 0) ?
			`${dropdownCollection.length} ${matchingText}` :
			this.props.localization.APP_LAUNCHER_MARKETING_CLOUD_APPS;

		return (
			<div className="slds-global-nav__app-launcher">
				<Dropdown
					id="slds-global-nav__app-launcher__dropdown"
					onClosed={this.handleDropdownClose}
					onOpened={this.handleDropdownOpen}
				>
					<Trigger>
						<Button
							iconCategory="utility"
							iconName="apps"
							iconStyle="icon-inverse"
							iconSize="large"
							assistiveText="Open Other Apps"
						/>
					</Trigger>
					<Menu nubbinPosition="top left">
						<div className="slds-global-nav__app-launcher__menu">
							<Search
								className="slds-m-horizontal--medium slds-m-top--medium"
								onChange={this.handleSearchChange}
								onInputClick={this.handleSearchInputClick}
								onKeyDown={this.handleSearchChange}
								onKeyPress={this.handleSearchChange}
								placeholder={localization.APP_LAUNCHER_SEARCH_PLACEHOLDER}
								value={this.props.search}
								ref="app-launcher__search"
							/>
							<div className="slds-text-heading--label slds-m-horizontal--medium slds-m-top--medium">
								{dropdownTitle}
							</div>
							<div className="slds-m-top--x-small slds-global-nav__app-launcher__menu__body">
								<PreviewMenuItems collection={dropdownCollection} className="slds-scrollable--y"/>
							</div>
							<div className="slds-text-align--left slds-m-horizontal--medium slds-m-top--xx-small">
								<a
									ref="trigger"
									href="#"
									onClick={this.handleTriggerClick}
								>{localization.APP_LAUNCHER_MORE_APPS}</a>
							</div>
						</div>
					</Menu>
				</Dropdown>
				<AppLauncherModal
					appTileClicked={this.props.appTileClicked}
					collection={collection}
					data={this.props.data}
					modalIsOpen={this.props.modalIsOpen}
					localization={localization}
					onClose={this.props.onModalClose}
					trigger={this.refs.trigger}
					filterForSearch={sharedFilterDefinition}
					search={this.props.modalSearch}
					onSearchChange={this.props.onModalSearchChange}
				/>
			</div>
		);
	}
}

AppLauncher.propTypes = {
	appTileClicked: React.PropTypes.func,
	collection: React.PropTypes.array.isRequired,
	filterForSearch: React.PropTypes.func,
	localization: React.PropTypes.object.isRequired,
	modalIsOpen: React.PropTypes.bool,
	modalSearch: React.PropTypes.string,
	onModalClose: React.PropTypes.func,
	onModalOpen: React.PropTypes.func,
	onDropdownClose: React.PropTypes.func,
	onDropdownOpen: React.PropTypes.func,
	onSearchChange: React.PropTypes.func,
	onModalSearchChange: React.PropTypes.func,
	search: React.PropTypes.string,
	data: React.PropTypes.object
};

AppLauncher.displayName = 'AppLauncher';

reactMixin(AppLauncher.prototype, PureRenderMixin);

export default AppLauncher;
