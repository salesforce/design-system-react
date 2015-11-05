import React from 'react';
import ReactDOM from 'react-dom';
import Lookup from './lookup';
import sampleData from '../../../sample-data/lookup';

export default function () {
	const LookupExample = React.createClass({
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
					<Lookup label="Accounts" collection={this.state.collection} selection={this.state.selection} onChanged={this._handleModelChange} onFilter={this._filterCollection} onAddClick={this._handleAdd} />
				</div>
			);
		},

		_handleModelChange (item, selection) {
			this.setState({ selection });
		},
		
		_filterCollection (searchTerm) {
			let collection = sampleData.defaultArray;
			
			if (searchTerm && searchTerm.length > 0) {
				const pattern = searchTerm.toLowerCase();
				
				collection = collection.filter(item => {
					return item.text.substr(0, pattern.length).toLowerCase() === pattern;
				});
			}
			
			this.setState({
				collection
			});
		},
		
		_handleAdd () {
			console.log('Add an item!');
		}
	});

	ReactDOM.render(<LookupExample />, document.getElementById('lookup-react-control'));
}
