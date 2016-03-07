import React from 'react';
import { Lookup } from 'design-system-react';

// SAMPLE CONTROL CODE -->

const LookupExample = React.createClass({
	propTypes: {
		modal: React.PropTypes.bool,
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		const lookupSampleData = {
			collection: [
				{ text: 'Paddy\'s Pub', icon: 'standard.account' },
				{ text: 'Tyrell Corporation', icon: 'standard.account' },
				{ text: 'Paper St. Soap Company', icon: 'standard.account' },
				{ text: 'Nakatomi Investments', icon: 'standard.account' },
				{ text: 'Acme Landscaping', icon: 'standard.account' },
				{ text: 'ACME Construction', icon: 'standard.account' }
			],
			additionalItems: [
				{ text: 'Standard Oil', icon: 'standard.account' },
				{ text: 'Eli Rose', icon: 'standard.account' },
				{ text: 'Paper St. Paper Company', icon: 'standard.account' }
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

// <-- SAMPLE CONTROL CODE

export default LookupExample;
