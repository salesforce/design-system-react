import React from 'react';
import createReactClass from 'create-react-class';
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

const Example = createReactClass({
	displayName: 'DataTableExample',

	getInitialState () {
		return {
			sortColumn: 'opportunityName',
			sortColumnDirection: {
				opportunityName: 'asc'
			},
			items: [
				{
					id: '8IKZHZZV80',
					opportunityName: 'Acme - 1,200 Widgets',
					accountName: 'Acme',
					closeDate: '4/10/15',
					stage: 'Value Proposition',
					confidence: '70%',
					amount: '$25,000,000',
					contact: 'jrogers@acme.com'
				},
				{
					id: '5GJOOOPWU7',
					opportunityName: 'Acme - 200 Widgets',
					accountName: 'Acme',
					closeDate: '1/31/15',
					stage: 'Prospecting',
					confidence: '30%',
					amount: '$5,000,000',
					contact: 'bob@acme.com'
				},
				{
					id: '8IKZHZZV81',
					opportunityName: 'salesforce.com - 1,000 Widgets',
					accountName: 'salesforce.com',
					closeDate: '1/31/15 3:45PM',
					stage: 'Id. Decision Makers',
					confidence: '60%',
					amount: '$25,000',
					contact: 'nathan@salesforce.com'
				}
			],
			selection: [
				{
					id: '8IKZHZZV81',
					opportunityName: 'salesforce.com - 1,000 Widgets',
					accountName: 'salesforce.com',
					closeDate: '1/31/15 3:45PM',
					stage: 'Id. Decision Makers',
					confidence: '60%',
					amount: '$25,000',
					contact: 'nathan@salesforce.com'
				}
			]
		};
	},

	handleChanged (selection) {
		this.setState({ selection });
	},

	handleRowAction (item, action) {
		console.log(item, action);
	},

	handleSort (sortColumn, ...rest) {
		if (this.props.log) {
			this.props.log('sort')(sortColumn, ...rest);
		}

		const sortProperty = sortColumn.property;
		const sortDirection = sortColumn.sortDirection;
		const newState = {
			sortColumn: sortProperty,
			sortColumnDirection: {
				[sortProperty]: sortDirection
			},
			items: [...this.state.items]
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
	},

	render () {
		return (
			<div>
				<IconSettings iconPath="/assets/icons">
					<DataTable
						fixedLayout
						items={this.state.items}
						id="DataTableExample-2"
						onChange={this.handleChanged}
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
									value: '1'
								},
								{
									id: 1,
									label: 'Publish',
									value: '2'
								}
							]}
							onAction={this.handleRowAction}
						/>
					</DataTable>
				</IconSettings>
			</div>
		);
	}
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
