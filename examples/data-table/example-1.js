import DataTable from 'design-system-react/components/data-table';
import DataTableColumn from 'design-system-react/components/data-table/column';
import DataTableCell from 'design-system-react/components/data-table/cell';

const DataTableExample = React.createClass({
	displayName: 'DataTableExample',

	getInitialState () {
		return {
			items: [
				{
					id: '8IKZHZZV80',
					name: 'Cloudhub',
					count: 100976,
					lastModified: 'Yesterday'
				}, {
					id: '5GJOOOPWU7',
					name: 'Cloudhub + Anypoint Connectors',
					count: 54976,
					lastModified: 'Today'
				}, {
					id: 'Q8Z71ZUCEZ',
					name: 'Cloud City',
					count: 101280,
					lastModified: 'Today'
				}
			],
			selection: []
		};
	},

	render () {
		return (
			<DataTable
				bordered
				items={this.state.items}
				id="DataTableExample-1"
				onChange={this.handleChanged}
				onSort={this.handleSort}
				selection={this.state.selection}
				selectRows
				striped
			>
				<DataTableColumn
					label="Opportunity Name"
					property="name"
					truncate
				/>
				<DataTableColumn
					label="Count"
					property="count"
					sortable
				/>
				<DataTableColumn
					label="Last Modified"
					property="lastModified"
					sortable
					truncate
				/>
			</DataTable>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	handleSort (sortColumn) {
		const sortProperty = sortColumn.property;
		const sortDirection = sortColumn.sortDirection;
		const newState = {
			items: [...this.state.items]
		};

		newState.items = newState.items.sort((a, b) => {
			let val = 0;

			if (a[sortProperty] > b[sortProperty]) {
				val = 1;
			}
			if (a[sortProperty] < b[sortProperty]) {
				val = -1;
			}

			if (sortDirection === 'desc') val = val * -1;

			return val;
		});

		this.setState(newState);
	}
});

ReactDOM.render(<DataTableExample />, mountNode);
