import React from 'react';
import { action } from 'storybook/actions';

import SimpleDataTable from '~/components/simple-data-table'; // `~` is replaced with design-system-react at runtime
import SimpleDataTableColumn from '~/components/simple-data-table/column';
import SimpleDataTableCell from '~/components/simple-data-table/cell';
import SimpleDataTableInteractiveElement from '~/components/simple-data-table/interactive-element';
import SimpleDataTableInteractiveLink from '~/components/simple-data-table/interactive-link';
import IconSettings from '~/components/icon-settings';
import Button from '~/components/button';
import Checkbox from '~/components/checkbox';

const InteractiveButton = SimpleDataTableInteractiveElement(Button);
const InteractiveCheckBox = SimpleDataTableInteractiveElement(Checkbox);

const CustomSimpleDataTableCell = ({ id, children, ...props }) => {
	const cell = (
		<SimpleDataTableCell {...props}>
			<InteractiveCheckBox id={`${id}-checkbox`} labels={{ label: 'Option' }} />
			<InteractiveButton onClick={action('button clicked')} label="Open" />
			<div>
				<SimpleDataTableInteractiveLink onClick={action('link clicked')}>
					Click me
				</SimpleDataTableInteractiveLink>
			</div>
		</SimpleDataTableCell>
	);
	return cell;
};
CustomSimpleDataTableCell.displayName = SimpleDataTableCell.displayName;

const columns = [
	<SimpleDataTableColumn
		key="opportunity"
		label="Opportunity Name"
		property="opportunityName"
		primaryColumn
	>
		<CustomSimpleDataTableCell />
	</SimpleDataTableColumn>,
	<SimpleDataTableColumn
		key="account-name"
		label="Account Name"
		property="accountName"
	/>,
	<SimpleDataTableColumn key="amount" label="Amount" property="amount" />,
	<SimpleDataTableColumn key="contact" label="Contact" property="contact">
		<CustomSimpleDataTableCell />
	</SimpleDataTableColumn>,
];

class Example extends React.Component {
	static displayName = 'SimpleDataTableExample';

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
					<SimpleDataTable
						items={this.state.items}
						id="SimpleDataTableExample-1-default"
						fixedLayout
						keyboardNavigation
					>
						{columns}
					</SimpleDataTable>

					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						Striped
					</h3>
					<SimpleDataTable
						items={this.state.items}
						id="SimpleDataTableExample-1-striped"
						striped
						fixedLayout
						keyboardNavigation
					>
						{columns}
					</SimpleDataTable>

					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						No Row Hover
					</h3>
					<SimpleDataTable
						items={this.state.items}
						id="SimpleDataTableExample-noRowHover"
						noRowHover
						fixedLayout
						keyboardNavigation
					>
						{columns}
					</SimpleDataTable>

					<h3 className="slds-text-heading_medium slds-m-vertical_medium">
						Column Bordered
					</h3>
					<SimpleDataTable
						columnBordered
						items={this.state.items}
						id="SimpleDataTableExample-columnBordered"
						fixedLayout
						keyboardNavigation
					>
						{columns}
					</SimpleDataTable>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
