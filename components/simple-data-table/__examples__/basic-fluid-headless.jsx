import React from 'react';

import SimpleDataTable from '~/components/simple-data-table'; // `~` is replaced with design-system-react at runtime
import SimpleDataTableColumn from '~/components/simple-data-table/column';
import SimpleDataTableCell from '~/components/simple-data-table/cell';
import IconSettings from '~/components/icon-settings';

const CustomSimpleDataTableCell = ({ children, ...props }) => (
	<SimpleDataTableCell {...props}>
		<a
			href="#"
			onClick={(event) => {
				event.preventDefault();
			}}
		>
			{children}
		</a>
	</SimpleDataTableCell>
);
CustomSimpleDataTableCell.displayName = SimpleDataTableCell.displayName;

const columns = [
	<SimpleDataTableColumn
		key="opportunity"
		label="Opportunity Name"
		property="opportunityName"
	>
		<CustomSimpleDataTableCell />
	</SimpleDataTableColumn>,

	<SimpleDataTableColumn
		key="account-name"
		label="Account Name"
		property="accountName"
	/>,

	<SimpleDataTableColumn
		key="close-date"
		label="Close Date"
		property="closeDate"
	/>,

	<SimpleDataTableColumn key="stage" label="Stage" property="stage" />,

	<SimpleDataTableColumn
		key="confidence"
		label="Confidence"
		property="confidence"
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
					<SimpleDataTable
						items={this.state.items}
						id="SimpleDataTableExample-headless"
						isHeadless
					>
						{columns}
					</SimpleDataTable>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
