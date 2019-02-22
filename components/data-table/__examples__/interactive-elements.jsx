import React from 'react';

import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import DataTableInteractiveElement from '~/components/data-table/interactive-element';
import IconSettings from '~/components/icon-settings';
import Button from '~/components/button';
import Checkbox from '~/components/checkbox';

const InteractiveButton = DataTableInteractiveElement(Button);
const InteractiveCheckBox = DataTableInteractiveElement(Checkbox);

const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell {...props}>
		<InteractiveCheckBox
			label="Option"
		/>
		<InteractiveButton
			onClick={(event) => {
				event.preventDefault();
			}}
			label="Open"
		/>
	</DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;

const columns = [
	<DataTableColumn
		key="opportunity"
		label="Opportunity Name"
		property="opportunityName"
		primaryColumn
	>
		<CustomDataTableCell />
	</DataTableColumn>,

	<DataTableColumn
		key="account-name"
		label="Account Name"
		property="accountName"
	/>,

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

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ overflow: 'auto' }}>
					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						Default Fluid Layout
					</h3>
					<DataTable items={this.state.items} id="DataTableExample-1-default" fixedLayout>
						{columns}
					</DataTable>

					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						Striped
					</h3>

					<DataTable
						items={this.state.items}
						id="DataTableExample-1-striped"
						striped
						fixedLayout
					>
						{columns}
					</DataTable>

					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						No Row Hover
					</h3>

					<DataTable
						items={this.state.items}
						id="DataTableExample-noRowHover"
						noRowHover
						fixedLayout
					>
						{columns}
					</DataTable>

					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						Column Bordered
					</h3>

					<DataTable
						columnBordered
						items={this.state.items}
						id="DataTableExample-columnBordered"
						fixedLayout
					>
						{columns}
					</DataTable>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
