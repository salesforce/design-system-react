import React from 'react';
import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import IconSettings from '~/components/icon-settings';

const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell {...props}>
		<a
			href="javascript:void(0);"
			onClick={(event) => {
				event.preventDefault();
			}}
		>
			{children}
		</a>
	</DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;

const columns = [
	<DataTableColumn
		key="opportunity"
		label="Opportunity Name"
		property="opportunityName"
	>
		<CustomDataTableCell />
	</DataTableColumn>,

	<DataTableColumn
		key="account-name"
		label="Account Name"
		property="accountName"
	/>,

	<DataTableColumn key="close-date" label="Close Date" property="closeDate" />,

	<DataTableColumn key="stage" label="Stage" property="stage" />,

	<DataTableColumn key="confidence" label="Confidence" property="confidence" />,

	<DataTableColumn key="amount" label="Amount" property="amount" />,

	<DataTableColumn key="contact" label="Contact" property="contact">
		<CustomDataTableCell />
	</DataTableColumn>,
];

class Example extends React.Component {
	static displayName = 'DataTableExample';

	state = {
		items: [
			{
				id: '8IKZHZZV80',
				opportunityName: 'Cloudhub',
				accountName: 'Cloudhub',
				closeDate: '4/14/2015',
				stage: 'Prospecting',
				confidence: '20%',
				amount: '$25k',
				contact: 'jrogers@cloudhub.com',
			},
			{
				id: '5GJOOOPWU7',
				opportunityName: 'Cloudhub + Anypoint Connectors',
				accountName: 'Cloudhub',
				closeDate: '4/14/2015',
				stage: 'Prospecting',
				confidence: '20%',
				amount: '$25k',
				contact: 'jrogers@cloudhub.com',
			},
			{
				id: '8IKZHZZV81',
				opportunityName: 'Cloudhub',
				accountName: 'Cloudhub',
				closeDate: '4/14/2015',
				stage: 'Prospecting',
				confidence: '20%',
				amount: '$25k',
				contact: 'jrogers@cloudhub.com',
			},
		],
	};

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ overflow: 'auto' }}>
					<h3 className="slds-text-heading--medium slds-m-vertical--medium">
						Default Fluid Layout
					</h3>
					<DataTable items={this.state.items} id="DataTableExample-1-default">
						{columns}
					</DataTable>

					<h3 className="slds-text-heading--medium slds-m-vertical--medium">
						Striped
					</h3>

					<DataTable
						items={this.state.items}
						id="DataTableExample-1-striped"
						striped
					>
						{columns}
					</DataTable>

					<h3 className="slds-text-heading--medium slds-m-vertical--medium">
						No Row Hover
					</h3>

					<DataTable
						items={this.state.items}
						id="DataTableExample-noRowHover"
						noRowHover
					>
						{columns}
					</DataTable>

					<h3 className="slds-text-heading--medium slds-m-vertical--medium">
						Column Bordered
					</h3>

					<DataTable
						columnBordered
						items={this.state.items}
						id="DataTableExample-columnBordered"
					>
						{columns}
					</DataTable>

					<h3 className="slds-text-heading--medium slds-m-vertical--medium">
						Compact
					</h3>

					<DataTable
						compact
						items={this.state.items}
						id="DataTableExample-compact"
					>
						{columns}
					</DataTable>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
