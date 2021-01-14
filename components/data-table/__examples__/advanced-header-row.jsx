import React from 'react';

import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import IconSettings from '~/components/icon-settings';

const CustomHeaderRow = ({ columns, item }) => (
	// +1 colSpan due to selection.
	<tr key={item.id}>
		<th
			style={{ backgroundColor: '#fff', padding: '0.5rem 1.25rem' }}
			id={item.id}
			colSpan={columns.length + 1}
			scope="colgroup"
		>
			<p style={{ fontWeight: 700 }} role="heading" aria-level={item.ariaLevel}>
				{item.heading}
			</p>
		</th>
	</tr>
);
CustomHeaderRow.displayName = DataTableCell.displayName;

class Example extends React.Component {
	static displayName = 'DataTableExample';

	state = {
		sortColumn: 'opportunityName',
		sortColumnDirection: {
			opportunityName: 'asc',
		},
		items: [
			{
				type: 'header-row',
				id: 'header-row-example-id-1',
				heading: 'Argentina',
				ariaLevel: 1,
			},
			{
				id: '8IKSDFZV91',
				headerId: 'header-row-example-id-1',
				opportunityName: 'Mule Systems',
				accountName: 'MuleSoft',
				closeDate: '3/31/17 2:05PM',
				stage: 'Processing',
				confidence: '80%',
				amount: '$14,000',
				contact: 'bob@mulesoft.com',
			},
			{
				id: '8IKZHZZV80',
				opportunityName: 'Acme - 1,200 Widgets',
				headerId: 'header-row-example-id-1',
				accountName: 'Acme',
				closeDate: '4/10/15',
				stage: 'Value Proposition',
				confidence: '70%',
				amount: '$25,000,000',
				contact: 'jrogers@acme.com',
			},
			{
				id: '5GJOOOPWU7',
				opportunityName: 'Acme - 200 Widgets',
				headerId: 'header-row-example-id-1',
				accountName: 'Acme',
				closeDate: '1/31/15',
				stage: 'Prospecting',
				confidence: '30%',
				amount: '$5,000,000',
				contact: 'bob@acme.com',
			},
			{
				type: 'header-row',
				id: 'header-row-example-id-2',
				heading: 'Argentina > Autonomous City of Buenos Aires',
				ariaLevel: 2,
			},
			{
				id: '8SDFDSZHZZV34',
				headerId: 'header-row-example-id-2',
				opportunityName: 'salesforce.com - 5,000 Widgets',
				accountName: 'MulesSoft',
				closeDate: '10/31/18 4:15AM',
				stage: 'Id. Decision Makers',
				confidence: '35%',
				amount: '$50,000',
				contact: 'chyral@salesforce.com',
			},
			{
				type: 'header-row',
				id: 'header-row-example-id-3',
				heading: 'Argentina > Autonomous City of Buenos Aires > Belgrano',
				ariaLevel: 3,
			},
			{
				id: '8IKZHWERWRV81',
				headerId: 'header-row-example-id-3',
				opportunityName: 'salesforce.com - 1,000 Widgets',
				accountName: 'salesforce.com',
				closeDate: '1/31/15 3:45PM',
				stage: 'Id. Decision Makers',
				confidence: '60%',
				amount: '$25,000',
				contact: 'nathan@salesforce.com',
			},
		],
		selection: [],
	};

	handleChanged = (event, data) => {
		this.setState({ selection: data.selection });
		console.log(event, data);
	};

	render() {
		return (
			<div>
				<IconSettings iconPath="/assets/icons">
					<DataTable
						assistiveText={{
							actionsHeader: 'actions',
							columnSort: 'sort this column',
							columnSortedAscending: 'asc',
							columnSortedDescending: 'desc',
							selectAllRows: 'Select all rows',
							selectRow: 'Select this row',
						}}
						fixedLayout
						items={this.state.items}
						id="DataTableExample-2"
						onRowChange={this.handleChanged}
						selection={this.state.selection}
						selectRows="checkbox"
						onRenderSubHeadingRow={CustomHeaderRow}
					>
						<DataTableColumn
							label="Name"
							primaryColumn
							property="opportunityName"
							width="10rem"
						/>
						<DataTableColumn
							label="Account Name"
							property="accountName"
							width="8rem"
						/>
						<DataTableColumn label="Close Date" property="closeDate" />
						<DataTableColumn label="Stage" property="stage" />
						<DataTableColumn label="Confidence" property="confidence" />
						<DataTableColumn label="Amount" property="amount" />
						<DataTableColumn label="Contact" property="contact" />
					</DataTable>
				</IconSettings>
			</div>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
