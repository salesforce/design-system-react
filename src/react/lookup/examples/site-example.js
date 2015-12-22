import React from 'react';
import Lookup from '../lookup';
import {sampleData} from 'design-system-facades-utilities';

export default React.createClass({
	propTypes: {
		modal: React.PropTypes.bool,
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		return {
			collection: sampleData.lookup.defaultArray
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
					modalMenu={this.props.modal}
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
			collection: sampleData.lookup.defaultArray.concat(sampleData.lookup.additionalItems)
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
