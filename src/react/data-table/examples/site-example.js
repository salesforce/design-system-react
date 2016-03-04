import React          from 'react';
import { DataTable }  from 'design-system-react';

// SAMPLE CONTROL CODE -->

// Third-party
import _ from 'underscore';

const DataTableExample = React.createClass({
	propTypes: {
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		const collection = [
			{
				id: '8IKZHZZV80', name: 'Item One', count: 100976, lastModified: 'Yesterday', modifiedBy: 'Ashley McDougal'
			}, {
				id: '5GJOOOPWU7', name: 'Item Two', count: 54976, lastModified: 'Today', modifiedBy: 'Ashley McDougal'
			}, {
				id: 'Q8Z71ZUCEZ', name: 'Item Three', count: 10128, lastModified: 'Today', modifiedBy: 'Ashley McDougal'
			}, {
				id: 'WA0Q0XARAR', name: 'Item Four', count: 63616, lastModified: 'Yesterday', modifiedBy: 'Ashley McDougal'
			}, {
				id: 'N8M7CMNU39', name: 'Item Five', count: 25615, lastModified: 'Yesterday', modifiedBy: 'Steve Daniels'
			}
		];
		const columns = [
			{
				propertyName: 'name', displayName: 'Campaign Name', sortable: false, hintParent: false
			}, {
				propertyName: 'count', displayName: 'Count', sortable: true, hintParent: false
			}, {
				propertyName: 'lastModified', displayName: 'Last Modified', sortable: true, hintParent: false
			}
		];

		const styles = {
			bordered: true, striped: true
		};

		const dataTableSampleData = {
			collection: collection, columns: columns, styles: styles
		};

		return {
			collection: dataTableSampleData.collection, columns: dataTableSampleData.columns, selection: [], styles: styles
		};
	},

	render () {
		return (
			<DataTable
				collection={this.state.collection}
				selection={this.state.selection}
				columns={this.state.columns}
				bordered={this.state.styles.bordered}
				striped={this.state.styles.striped}
				onChange={this.handleChanged}
				onSort={this.sort}/>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	sort (colData) {
		let rowData = this.state.collection;

		if (colData.sortColumn.propertyName === 'count') {
			rowData = _.sortBy(rowData, 'count');
		} else if (colData.sortColumn.propertyName === 'lastModified') {
			rowData = _.sortBy(rowData, 'lastModified');
		}

		if ( colData.sortDirection === 'desc') rowData.reverse();

		this.setState({
			collection: rowData
		});
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

// <-- SAMPLE CONTROL CODE

export default DataTableExample;
