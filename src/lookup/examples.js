import React from 'react';
import Lookup from './index';

// SAMPLE COMPONENT CODE -->

const LookupExample = React.createClass({
	propTypes: {
		modal: React.PropTypes.bool,
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		const lookupSampleData = {
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

		return lookupSampleData;
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
				isOpen={this.state.isOpen} />
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
	},

	_handleAdd () {
		console.log('Add an item!');
	}
});

// <-- SAMPLE COMPONENT CODE

export default LookupExample;
