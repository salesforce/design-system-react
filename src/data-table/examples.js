import React from 'react';
import DataTable from './index';
import DataTableColumn from './column';

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

const DataTableExample = React.createClass({
	displayName: 'DataTableExample',

	propTypes: {
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		return {
			collection,
			selection: []
		};
	},

	render () {
		return (
			<DataTable
				bordered
				collection={this.state.collection}
				columns={this.state.columns}
				onChange={this.handleChanged}
				onSort={this.sort}
				selection={this.state.selection}
				selectRows
				striped
			>
				<DataTableColumn
					label="Campaign Name"
					property="name"
				/>
				<DataTableColumn
					label="Count"
					property="count"
					sortable
					sortDirection={this.state.countSortDirection}
				/>
				<DataTableColumn
					label="Last Modified"
					property="lastModified"
					sortable
					sortDirection={this.state.lastModifiedSortDirection}
				/>
			</DataTable>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	sort (sortColumn, sortDirection) {
		let rowData = this.state.collection;
		let countSortDirection;
		let lastModifiedSortDirection;

		if (sortColumn.property === 'count') {
			rowData = sortBy(rowData, 'count');
			countSortDirection = sortDirection;
		} else if (sortColumn.property === 'lastModified') {
			rowData = sortBy(rowData, 'lastModified');
			lastModifiedSortDirection = sortDirection;
		}

		if (sortDirection === 'desc') rowData.reverse();

		this.setState({
			collection: rowData,
			countSortDirection,
			lastModifiedSortDirection
		});
	}
});
// <-- SAMPLE COMPONENT CODE

export default DataTableExample;
