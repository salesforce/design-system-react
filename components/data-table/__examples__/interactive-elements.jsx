import React from 'react';
import { action } from '@storybook/addon-actions';

import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import DataTableInteractiveElement from '~/components/data-table/interactive-element';
import DataTableInteractiveLink from '~/components/data-table/interactive-link';
import IconSettings from '~/components/icon-settings';
import Button from '~/components/button';
import Checkbox from '~/components/checkbox';

const InteractiveButton = DataTableInteractiveElement(Button);
const InteractiveCheckBox = DataTableInteractiveElement(Checkbox);

const CustomDataTableCell = ({ id, children, ...props }) => {
	const cell = (
		<DataTableCell {...props}>
			<InteractiveCheckBox id={`${id}-checkbox`} labels={{ label: 'Option' }} />
			<InteractiveButton onClick={action('button clicked')} label="Open" />
			<div>
				<DataTableInteractiveLink onClick={action('link clicked')}>
					Click me
				</DataTableInteractiveLink>
			</div>
		</DataTableCell>
	);
	return cell;
};
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
					<DataTable
						items={this.state.items}
						id="DataTableExample-1-default"
						fixedLayout
						keyboardNavigation
					>
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
						keyboardNavigation
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
						keyboardNavigation
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
						keyboardNavigation
					>
						{columns}
					</DataTable>

					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						Resizable columns
					</h3>
					<DataTable
						items={this.state.items}
						id="DataTableExample-column-resizable"
						fixedLayout
						fixedHeader
						resizable
						keyboardNavigation
					>
						{columns}
					</DataTable>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
