import React from 'react';
import LegacyDataTable from './legacy';
import DataTable from './index';

// SAMPLE COMPONENT CODE -->
import sortBy from 'lodash/collection/sortBy';

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

const DataTableExample = React.createClass({
	displayName: 'DataTableExample',

	propTypes: {
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		return {
			collection,
			columns,
			selection: [],
			styles
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
				onSort={this.sort}
				selectRows
			/>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	sort (colData) {
		let rowData = this.state.collection;

		if (colData.sortColumn.propertyName === 'count') {
			rowData = sortBy(rowData, 'count');
		} else if (colData.sortColumn.propertyName === 'lastModified') {
			rowData = sortBy(rowData, 'lastModified');
		}

		if (colData.sortDirection === 'desc') rowData.reverse();

		this.setState({
			collection: rowData
		});
	}
});
// <-- SAMPLE COMPONENT CODE

export default DataTableExample;
