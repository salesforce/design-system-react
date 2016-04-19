// SAMPLE COMPONENT CODE -->
import React from 'react';

import Lookup from 'slds-for-react/lookup';

const LookupExample = React.createClass({
	displayName: 'LookupExample',

	propTypes: {
		modal: React.PropTypes.bool
	},

	getInitialState () {
		return {
			collection: [
				{ text: 'Paddy\'s Pub', iconCategory: 'standard', iconName: 'account' },
				{ text: 'Tyrell Corporation', iconCategory: 'standard', iconName: 'account' },
				{ text: 'Paper St. Soap Company', iconCategory: 'standard', iconName: 'account' },
				{ text: 'Nakatomi Investments', iconCategory: 'standard', iconName: 'account' },
				{ text: 'Acme Landscaping', iconCategory: 'standard', iconName: 'account' },
				{ text: 'ACME Construction', iconCategory: 'standard', iconName: 'account' }
			],
			additionalItems: [
				{ text: 'Standard Oil', iconCategory: 'standard', iconName: 'account' },
				{ text: 'Eli Rose', iconCategory: 'standard', iconName: 'account' },
				{ text: 'Paper St. Paper Company', iconCategory: 'standard', iconName: 'account' }
			]
		};
	},

	render () {
		return (
			<Lookup label="Accounts"
				collection={this.state.collection}
				selection={this.state.selection}
				onChange={this._handleModelChange}
				filterPredicate={this._filterPredicate}
				modalMenu={this.props.modal}
				onAddClick={this._handleAdd}
				isOpen={this.state.isOpen}
			/>
		);
	},

	componentDidMount () {
		this._addItemsTimeout = window.setTimeout(this._addItems, 4000);
	},

	_addItems () {
		this.setState({
			collection: this.state.collection.concat(this.state.additionalItems)
		});

		window.clearTimeout(this._addItemsTimeout);
	},

	_filterPredicate (text, pattern) {
		return pattern.length < 2 || text.substr(0, pattern.length).toLowerCase() === pattern;
	},

	_handleModelChange (selection) {
		this.setState({ selection });
	}
});

// <-- SAMPLE COMPONENT CODE

export default LookupExample;
