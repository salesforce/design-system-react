import React from 'react';

import SimpleDataTable from '~/components/simple-data-table'; // `~` is replaced with design-system-react at runtime
import SimpleDataTableColumn from '~/components/simple-data-table/column';
import IconSettings from '~/components/icon-settings';

const columns = [
	<SimpleDataTableColumn
		key="opportunity"
		label="Opportunity Name"
		property="opportunityName"
	/>,
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

	<SimpleDataTableColumn key="contact" label="Contact" property="contact" />,
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
				classNameRow: 'slds-text-color_success',
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
				classNameRow: 'slds-text-font_monospace slds-text-heading_medium',
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
				classNameRow: 'slds-is-selected',
			},
		],
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div style={{ overflow: 'auto' }}>
					<SimpleDataTable items={this.state.items} id="CustomClasses-Example">
						{columns}
					</SimpleDataTable>
				</div>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
