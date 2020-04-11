import React from 'react';

import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import IconSettings from '~/components/icon-settings';

const columns = [
	<DataTableColumn
		key="opportunity"
		label="Opportunity Name"
		property="opportunityName"
		width="6em"
	/>,

	<DataTableColumn
		key="account-name"
		label="Account Name"
		property="accountName"
		width="5em"
	/>,

	<DataTableColumn
		key="close-date"
		label="Close Date"
		property="closeDate"
		width="5em"
	/>,

	<DataTableColumn key="stage" label="Stage" property="stage" width="5em" />,

	<DataTableColumn
		key="confidence"
		label="Confidence"
		property="confidence"
		width="5em"
	/>,

	<DataTableColumn key="amount" label="Amount" property="amount" width="5em" />,

	<DataTableColumn
		key="contact"
		label="Contact"
		property="contact"
		width="6em"
	/>,
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
					<DataTable
						items={this.state.items}
						id="DataTableExample-1-default"
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
