// import * as Lib from '../../lib/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from './data-table';

export default function () {
	const collection = [
		{
			id: '8IKZHZZV80',
			name: 'Item One',
			count: '100,976',
			lastModified: 'Yesterday',
			modifiedBy: 'Ashley McDougal'
		},
		{
			id: '5GJOOOPWU7',
			name: 'Item Two',
			count: '54,976',
			lastModified: 'Today',
			modifiedBy: 'Ashley McDougal'
		},
		{
			id: 'Q8Z71ZUCEZ',
			name: 'Item Three',
			count: '10,128',
			lastModified: 'Today',
			modifiedBy: 'Ashley McDougal'
		},
		{
			id: 'WA0Q0XARAR',
			name: 'Item Four',
			count: '63,616',
			lastModified: 'Yesterday',
			modifiedBy: 'Ashley McDougal'
		},
		{
			id: 'N8M7CMNU39',
			name: 'Item Five',
			count: '25,615',
			lastModified: 'Yesterday',
			modifiedBy: 'Steve Daniels'
		}
	];

	const columns = [
		{
			propertyName: 'name',
			displayName: 'Campaign Name',
			sortable: false,
			hintParent: false
		},
		{
			propertyName: 'count',
			displayName: 'Count',
			sortable: true,
			hintParent: false
		},
		{
			propertyName: 'lastModified',
			displayName: 'Last Modified',
			sortable: true,
			hintParent: false
		}
	];

	const DataTableExample = React.createClass({
		propTypes: {
			models: React.PropTypes.arrayOf(React.PropTypes.object)
		},

		getInitialState () {
			return {
				models: {
					collection: collection,
					columns: columns
				},

				selection: []
			};
		},

		render () {
			return (
				<div>
					<div className="slds-col example">
						<DataTable
							collection={this.state.models.collection}
							selection={this.state.selection}
							columns={this.state.models.columns}
							bordered={true}
							striped={true}
							onChanged={this.handleChanged}
						/>
					</div>
					<div className="slds-col demo-controls"></div>
				</div>
			);
		},

		handleChanged (item, selection) {
			this.setState({ selection });
		},

		_handleModelChange (index, selection) { // TODO: feature.selection
			void(selection);
			// const models = this.state.models;
			// models[index].selection = selection;
			// this.setState({models});
		},

		logSelectedItem (index) { // TODO: feature.selection
			void(index);
			// Lib.log(this.state.models[index].selection);
		},

		setSelection (index) { // TODO: feature.selection
			void(index);
			// const models = this.state.models;
			// models[index].selection = collection[5];
			// this.setState({models});
		}
	});

	ReactDOM.render(<DataTableExample />, document.getElementById('data-table-react-control'));
}
