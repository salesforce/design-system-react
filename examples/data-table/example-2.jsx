import DataTable from 'design-system-react/components/data-table';
import DataTableColumn from 'design-system-react/components/data-table/column';
import DataTableCell from 'design-system-react/components/data-table/cell';
import DataTableRowActions from 'design-system-react/components/data-table/row-actions';

const DataTableExample = React.createClass({
	displayName: 'DataTableExample',

	getInitialState () {
		return {
			items: [
				{
					id: '8IKZHZZV80',
					name: 'An item with row actions',
					count: 100976,
					lastModified: 'Yesterday'
				}, {
					id: '5GJOOOPWU7',
					name: 'Another one with row actions',
					count: 54976,
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
				id="DataTableExample-2"
				onChange={this.handleChanged}
				selection={this.state.selection}
				selectRows
			>
				<DataTableColumn
					label="Opportunity Name"
					property="name"
					truncate
				/>
				<DataTableColumn
					label="Count"
					property="count"
				/>
				<DataTableColumn
					label="Last Modified"
					property="lastModified"
					truncate
				/>
				<DataTableRowActions
					options={[
						{
							id: 0,
							label: 'Add to Group',
							value: '1'
						}, {
							id: 1,
							label: 'Publish',
							value: '2'
						}
					]}
					onAction={this.handleRowAction}
				/>
			</DataTable>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	handleRowAction (item, action) {
		console.log(item, action);
	}
});

ReactDOM.render(<DataTableExample />, mountNode);
