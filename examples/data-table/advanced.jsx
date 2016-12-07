import React from 'react';
import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import DataTableRowActions from '~/components/data-table/row-actions';

const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell {...props} >
		<a
			href="javascript:void(0);"
			onClick={(event) => {
				event.preventDefault();
			}}
		>{children}</a>
	</DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;

const Example = React.createClass({
	displayName: 'DataTableExample',

	getInitialState () {
		return {
			items: [
				{
					id: '8IKZHZZV80',
					opportunityName: 'Acme - 1,200 Widgets',
					accountName: 'Acme',
					closeDate: '4/10/15',
					stage: 'Value Proposition',
					confidence: '30%',
					amount: '$25,000,000',
					contact: 'jrogers@acme.com'
				}, {
					id: '5GJOOOPWU7',
					opportunityName: 'Acme - 200 Widgets',
					accountName: 'Acme',
					closeDate: '1/31/15',
					stage: 'Prospecting',
					confidence: '60%',
					amount: '$5,000,000',
					contact: 'bob@acme.com'
				},
				{
					id: '8IKZHZZV81',
					opportunityName: 'salesforce.com - 1,000 Widgets',
					accountName: 'salesforce.com',
					closeDate: '1/31/15 3:45PM',
					stage: 'Id. Decision Makers',
					confidence: '70%',
					amount: '$25,000',
					contact: 'nathan@salesforce.com'
				}
			],
			selection: []
		};
	},

	render () {
		return (
			<div style={{ overflow: 'auto' }}>
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
						property="opportunityName"
						truncate
						sortable
					>
						<CustomDataTableCell />
					</DataTableColumn>
					<DataTableColumn
						label="Account Name"
						property="accountName"
					/>
					<DataTableColumn
						label="Close Date"
						property="closeDate"
					/>
					<DataTableColumn
						label="Stage"
						property="stage"
					/>
					<DataTableColumn
						label="Confidence"
						property="confidence"
					/>
					<DataTableColumn
						label="Amount"
						property="amount"
					/>
					<DataTableColumn
						label="Contact"
						property="contact"
					>
						<CustomDataTableCell />
					</DataTableColumn>
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
			</div>
		);
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	handleRowAction (item, action) {
		console.log(item, action);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
