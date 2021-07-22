import React from 'react';

import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import IconSettings from '~/components/icon-settings';

const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell {...props}>
		<a
			href="#"
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

	render() {
		return (
			<React.Fragment>
				<React.Fragment>
					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						Fully resizable
					</h3>
					<IconSettings iconPath="/assets/icons">
						<div style={{ overflow: 'auto' }}>
							<DataTable
								items={this.state.items}
								id="DataTableExample-1-resizable-cols"
								resizable
								resizerOptions={{
									resizeMode: 'overflow',
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
						Columns 0 and 3 fixed
					</h3>
					<IconSettings iconPath="/assets/icons">
						<div style={{ overflow: 'auto' }}>
							<DataTable
								items={this.state.items}
								id="DataTableExample-2-resizable-cols"
								resizable
								fixedLayout
								resizerOptions={{
									resizeMode: 'overflow',
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
				<React.Fragment>
					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						With fixed header
					</h3>
					<IconSettings iconPath="/assets/icons">
						<div style={{ overflow: 'auto' }}>
							<DataTable
								items={this.state.items}
								id="DataTableExample-3-resizable-cols"
								fixedHeader
								fixedLayout
								resizable
								resizerOptions={{
									resizeMode: 'overflow',
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
			</React.Fragment>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
