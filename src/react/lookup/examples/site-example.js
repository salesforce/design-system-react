import React from 'react';
import Lookup from '../lookup';
import sampleData from '../../../../sample-data/lookup';

export default React.createClass({
	propTypes: {
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		return {
			collection: sampleData.defaultArray
		};
	},

	render () {
		return (
			<div className="slds-col example">
				<Lookup label="Accounts"
					collection={this.state.collection}
					selection={this.state.selection}
					onChanged={this._handleModelChange}
					filterPredicate={this._filterPredicate}
					onAddClick={this._handleAdd}
					isOpen={this.state.isOpen} />
			</div>
		);
	},
	
	componentDidMount () {
		this._addItemsTimeout = window.setTimeout(this._addItems, 4000);
	},
	
	_addItems () {
		this.setState({
			collection: sampleData.defaultArray.concat(sampleData.additionalItems)
		});
		
		window.clearTimeout(this._addItemsTimeout);
	},
	
	_filterPredicate (text, pattern) {
		return pattern.length < 2 || text.substr(0, pattern.length).toLowerCase() === pattern;
	},

	_handleModelChange (item, selection) {
		this.setState({ selection });
	},
	
	_handleAdd () {
		console.log('Add an item!');
	}
});
