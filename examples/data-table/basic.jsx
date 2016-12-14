import React from 'react';
import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';

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
					opportunityName: 'Cloudhub',
					accountName: 'Cloudhub',
					closeDate: '4/14/2015',
					stage: 'Prospecting',
					confidence: '20%',
					amount: '$25k',
					contact: 'jrogers@cloudhub.com'
				}, {
					id: '5GJOOOPWU7',
					opportunityName: 'Cloudhub + Anypoint Connectors',
					accountName: 'Cloudhub',
					closeDate: '4/14/2015',
					stage: 'Prospecting',
					confidence: '20%',
					amount: '$25k',
					contact: 'jrogers@cloudhub.com'
				},
				{
					id: '8IKZHZZV81',
					opportunityName: 'Cloudhub',
					accountName: 'Cloudhub',
					closeDate: '4/14/2015',
					stage: 'Prospecting',
					confidence: '20%',
					amount: '$25k',
					contact: 'jrogers@cloudhub.com'
				}
			]
		};
	},

	render () {
		return (
			<div style={{ overflow: 'auto' }}>
				<br id="default" />
				<DataTable
					fluidLayout
					items={this.state.items}
					id="DataTableExample-1-default"
				>
					<DataTableColumn
						label="Opportunity Name"
						property="opportunityName"
						truncate
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
				</DataTable>

				<br />
				
				<DataTable
					fluidLayout
					items={this.state.items}
					id="DataTableExample-1-striped"
					striped
				>
					<DataTableColumn
						label="Opportunity Name"
						property="opportunityName"
						truncate
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
				</DataTable>
				
				<br />
				
				<DataTable
					fluidLayout
					items={this.state.items}
					id="DataTableExample-noRowHover"
					noRowHover
				>
					<DataTableColumn
						label="Opportunity Name"
						property="opportunityName"
						truncate
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
				</DataTable>

				<br />
				
				<DataTable
					columnBordered
					fluidLayout
					items={this.state.items}
					id="DataTableExample-columnBordered"
					noRowHover
				>
					<DataTableColumn
						label="Opportunity Name"
						property="opportunityName"
						truncate
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
				</DataTable>

			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
