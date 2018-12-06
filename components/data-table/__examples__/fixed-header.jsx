import React from 'react';

import Dropdown from '~/components/menu-dropdown';
import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import DataTableRowActions from '~/components/data-table/row-actions';
import IconSettings from '~/components/icon-settings';

const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell title={children} {...props}>
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
				opportunityName: 'Acme - 1,200 Widgets',
				accountName: 'Acme',
				closeDate: '4/10/15',
				stage: 'Value Proposition',
				confidence: '70%',
				amount: '$25,000,000',
				contact: 'jrogers@acme.com',
			},
			{
				id: '0085f7a0',
				opportunityName: 'Acme - 200 Widgets',
				accountName: 'Acme',
				closeDate: '1/31/15',
				stage: 'Prospecting',
				confidence: '30%',
				amount: '$5,000,000',
				contact: 'bob@acme.com',
			},
			{
				id: 'b7acc778',
				opportunityName: 'salesforce.com - 1,000 Widgets',
				accountName: 'salesforce.com',
				closeDate: '1/31/15 3:45PM',
				stage: 'Id. Decision Makers',
				confidence: '60%',
				amount: '$25,000',
				contact: 'nathan@salesforce.com',
			},
			{
				id: '17991de5',
				opportunityName: 'Acme - 1,200 Widgets',
				accountName: 'Acme',
				closeDate: '4/10/15',
				stage: 'Value Proposition',
				confidence: '70%',
				amount: '$25,000,000',
				contact: 'jrogers@acme.com',
			},
			{
				id: '09b2cee9',
				opportunityName: 'Acme - 200 Widgets',
				accountName: 'Acme',
				closeDate: '1/31/15',
				stage: 'Prospecting',
				confidence: '30%',
				amount: '$5,000,000',
				contact: 'bob@acme.com',
			},
			{
				id: 'd0035700',
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

	handleRowAction = (item, action) => {
		console.log(item, action);
	};

	handleSort = (sortColumn, ...rest) => {
		if (this.props.log) {
			this.props.log('sort')(sortColumn, ...rest);
		}

		const sortProperty = sortColumn.property;
		const sortDirection = sortColumn.sortDirection;
		const newState = {
			sortColumn: sortProperty,
			sortColumnDirection: {
				[sortProperty]: sortDirection,
			},
			items: [...this.state.items],
		};

		// needs to work in both directions
		newState.items = newState.items.sort((a, b) => {
			let val = 0;

			if (a[sortProperty] > b[sortProperty]) {
				val = 1;
			}
			if (a[sortProperty] < b[sortProperty]) {
				val = -1;
			}

			if (sortDirection === 'desc') {
				val *= -1;
			}

			return val;
		});

		this.setState(newState);
	};

	render() {
		return (
			<div style={{ height: '200px' /*, width: '500px' */ }}>
				<IconSettings iconPath="/assets/icons">
					<DataTable
						assistiveText={{
							actionsHeader: 'actions',
							columnSort: 'sort this column',
							columnSortedAscending: 'asc',
							columnSortedDescending: 'desc',
							selectAllRows: 'all rows',
							selectRow: 'select this row',
						}}
						fixedHeader
						fixedLayout
						items={this.state.items}
						id="DataTableExample-2"
						onRowChange={this.handleChanged}
						onSort={this.handleSort}
						selection={this.state.selection}
						selectRows
					>
						<DataTableColumn
							isSorted={this.state.sortColumn === 'opportunityName'}
							label="Name"
							primaryColumn
							property="opportunityName"
							sortable
							sortDirection={this.state.sortColumnDirection.opportunityName}
							width="10rem"
						>
							<CustomDataTableCell />
						</DataTableColumn>
						<DataTableColumn
							label="Account Name"
							property="accountName"
							width="8rem"
						/>
						<DataTableColumn label="Close Date" property="closeDate" width="8rem" />
						<DataTableColumn label="Stage" property="stage" width="8rem" />
						<DataTableColumn
							isSorted={this.state.sortColumn === 'confidence'}
							label="Confidence"
							property="confidence"
							sortable
							sortDirection={this.state.sortColumnDirection.confidence}
							width="8rem"
						/>
						<DataTableColumn label="Amount" property="amount" width="8rem" />
						<DataTableColumn label="Contact" property="contact" width="8rem">
							<CustomDataTableCell />
						</DataTableColumn>
						<DataTableRowActions
							options={[
								{
									id: 0,
									label: 'Add to Group',
									value: '1',
								},
								{
									id: 1,
									label: 'Publish',
									value: '2',
								},
								{
									id: 2,
									label: 'Third of Seven',
									value: '3',
								},
								{
									id: 3,
									label: 'Fourth of Seven',
									value: '4',
								},
								{
									id: 4,
									label: 'Fifth of Seven',
									value: '5',
								},
								{
									id: 5,
									label: 'Sixth of Seven',
									value: '6',
								},
								{
									id: 6,
									label: 'Seventh of Seven',
									value: '7',
								},
							]}
							onAction={this.handleRowAction}
							dropdown={<Dropdown length="7" />}
						/>
					</DataTable>
				</IconSettings>
			</div>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
