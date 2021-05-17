import React from 'react';

import Dropdown from '~/components/menu-dropdown';
import DataTable from '~/components/data-table'; // `~` is replaced with design-system-react at runtime
import DataTableColumn from '~/components/data-table/column';
import DataTableCell from '~/components/data-table/cell';
import DataTableInteractiveLink from '~/components/data-table/interactive-link';
import DataTableRowActions from '~/components/data-table/row-actions';
import IconSettings from '~/components/icon-settings';

const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell title={children} {...props}>
		<DataTableInteractiveLink>{children}</DataTableInteractiveLink>
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
		const { sortDirection } = sortColumn;
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
			<div
				ref={(ref) => {
					this.wrapperRef = ref;
				}}
				style={{
					height: '200px',
					width: '400px',
				}}
			>
				<IconSettings iconPath="/assets/icons">
					<DataTable
						assistiveText={{
							actionsHeader: 'actions',
							columnSort: 'sort this column',
							columnSortedAscending: 'asc',
							columnSortedDescending: 'desc',
							selectAllRows: 'Select all rows',
							selectRow: 'Select this row',
						}}
						fixedHeader
						fixedLayout
						keyboardNavigation
						items={this.state.items}
						id="DataTableExample-FixedHeaders"
						onRowChange={this.handleChanged}
						onSort={this.handleSort}
						selection={this.state.selection}
						selectRows="checkbox"
						style={{ minWidth: '800px' }}
					>
						<DataTableColumn
							isSorted={this.state.sortColumn === 'opportunityName'}
							label="Name"
							primaryColumn
							property="opportunityName"
							sortable
							sortDirection={this.state.sortColumnDirection.opportunityName}
						>
							<CustomDataTableCell />
						</DataTableColumn>
						<DataTableColumn label="Account Name" property="accountName" />
						<DataTableColumn label="Close Date" property="closeDate" />
						<DataTableColumn label="Stage" property="stage" />
						<DataTableColumn
							isSorted={this.state.sortColumn === 'confidence'}
							label="Confidence"
							property="confidence"
							sortable
							sortDirection={this.state.sortColumnDirection.confidence}
						/>
						<DataTableColumn label="Amount" property="amount" />
						<DataTableColumn label="Contact" property="contact">
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
							menuPosition="overflowBoundaryElement"
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
