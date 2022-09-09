import React from 'react';

import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import DataTableInteractiveLink from '~/components/data-table/interactive-link';
import IconSettings from '~/components/icon-settings';

const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell {...props}>
		<DataTableInteractiveLink
			onClick={(event) => {
				event.preventDefault();
			}}
		>
			{children}
		</DataTableInteractiveLink>
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
		sortColumn: 'opportunityName',
		sortColumnDirection: {
			opportunityName: 'asc',
		},
		items: [
			{
				id: '896a6a60',
				opportunityName: 'Acme - 1,200 Widgets',
				accountName: 'Acme',
				closeDate: '4/10/15',
				stage: 'Value Proposition',
				confidence: '70%',
				amount: '$25,000,000',
				contact: 'jrogers@acme.com',
			},
			{
				id: '44da9dcd',
				opportunityName: 'Acme - 200 Widgets',
				accountName: 'Acme',
				closeDate: '1/31/15',
				stage: 'Prospecting',
				confidence: '30%',
				amount: '$5,000,000',
				contact: 'bob@acme.com',
			},
			{
				id: 'f988a721',
				opportunityName: 'salesforce.com - 1,000 Widgets',
				accountName: 'salesforce.com',
				closeDate: '1/31/15 3:45PM',
				stage: 'Id. Decision Makers',
				confidence: '60%',
				amount: '$25,000',
				contact: 'nathan@salesforce.com',
			},
			{
				id: 'd7679cdd',
				opportunityName: 'Acme - 800 Widgets',
				accountName: 'Acme',
				closeDate: '6/11/18',
				stage: 'Value Proposition',
				confidence: '85%',
				amount: '$970,000',
				contact: 'jrogers@acme.com',
			},
			{
				id: '0085f7a0',
				opportunityName: 'Acme - 744 Widgets',
				accountName: 'Acme',
				closeDate: '4/15/17',
				stage: 'Prospecting',
				confidence: '56%',
				amount: '$3,110,000',
				contact: 'bob@acme.com',
			},
			{
				id: 'b7acc778',
				opportunityName: 'salesforce.com - 847 Widgets',
				accountName: 'salesforce.com',
				closeDate: '5/23/18 1:02PM',
				stage: 'Id. Decision Makers',
				confidence: '62%',
				amount: '$18,000',
				contact: 'nathan@salesforce.com',
			},
			{
				id: '17991de5',
				opportunityName: 'Acme - 1,621 Widgets',
				accountName: 'Acme',
				closeDate: '5/16/17',
				stage: 'Value Proposition',
				confidence: '70%',
				amount: '$23,600,000',
				contact: 'jrogers@acme.com',
			},
			{
				id: '09b2cee9',
				opportunityName: 'Acme - 430 Widgets',
				accountName: 'Acme',
				closeDate: '6/12/18',
				stage: 'Prospecting',
				confidence: '42%',
				amount: '$4,222,222',
				contact: 'bob@acme.com',
			},
			{
				id: 'd0035700',
				opportunityName: 'salesforce.com - 677 Widgets',
				accountName: 'salesforce.com',
				closeDate: '7/21/17 10:11AM',
				stage: 'Id. Decision Makers',
				confidence: '42%',
				amount: '$24,200',
				contact: 'nathan@salesforce.com',
			},
			{
				id: '4a526f0c',
				opportunityName: 'Acme - 1,444 Widgets',
				accountName: 'Acme',
				closeDate: '3/18/18',
				stage: 'Value Proposition',
				confidence: '66%',
				amount: '$22,000,000',
				contact: 'jrogers@acme.com',
			},
			{
				id: '9a5dbdb2',
				opportunityName: 'Acme - 320 Widgets',
				accountName: 'Acme',
				closeDate: '1/31/18',
				stage: 'Prospecting',
				confidence: '36%',
				amount: '$4,322,000',
				contact: 'bob@acme.com',
			},
			{
				id: '356dbb52',
				opportunityName: 'salesforce.com - 4,000 Widgets',
				accountName: 'salesforce.com',
				closeDate: '2/21/17 8:33PM',
				stage: 'Id. Decision Makers',
				confidence: '72%',
				amount: '$15,000',
				contact: 'nathan@salesforce.com',
			},
		],
	};

	render() {
		return (
			<React.Fragment>
				<React.Fragment>
					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						With keyboard navigation
					</h3>
					<IconSettings iconPath="/assets/icons">
						<div style={{ height: '200px' }}>
							<DataTable
								items={this.state.items}
								id="DataTableExample-4-resizable-cols"
								resizable
								keyboardNavigation
								fixedLayout
								resizableOptions={{
									onResize: (columnsResized) => {
										console.log(JSON.stringify(columnsResized));
									},
								}}
							>
								{columns}
							</DataTable>
						</div>
					</IconSettings>
				</React.Fragment>
				<React.Fragment>
					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						Resizeable: Columns 0 and 3 fixed
					</h3>
					<IconSettings iconPath="/assets/icons">
						<div style={{ height: '200px' }}>
							<DataTable
								items={this.state.items}
								id="DataTableExample-2-resizable-cols"
								fixedLayout
								resizable
								keyboardNavigation
								resizableOptions={{
									onResize: (columnsResized) => {
										console.log(JSON.stringify(columnsResized));
									},
									disabledColumns: [0, 3],
								}}
							>
								{columns}
							</DataTable>
						</div>
					</IconSettings>
				</React.Fragment>
			</React.Fragment>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
