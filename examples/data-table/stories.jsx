import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { DATA_TABLE } from '../../utilities/constants';
import DataTable from '../../components/data-table';
import DataTableColumn from '../../components/data-table/column';
import DataTableCell from '../../components/data-table/cell';

/* eslint-disable no-script-url */
/* eslint-disable react/prop-types */
const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell {...props} >
		<a
			href="javascript:void(0);"
			onClick={(event) => {
				event.preventDefault();
				action('Link clicked')(event, { name: props.item.name });
			}}
		>{children}</a>
	</DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;
/* eslint-enable react/prop-types */

const DemoDataTable = React.createClass({
	displayName: 'DemoDataTable',

	getInitialState () {
		return {
			items: [
				{
					id: '8IKZHZZV80',
					name: 'Cloudhub',
					count: 100976,
					lastModified: 'Yesterday'
				}, {
					id: '5GJOOOPWU7',
					name: 'Cloudhub + Anypoint Connectors',
					count: 54976,
					lastModified: 'Today'
				}, {
					id: 'Q8Z71ZUCEZ',
					name: 'Cloud City',
					count: 101280,
					lastModified: 'Today'
				}, {
					id: '2FSH2DP0LY',
					name: 'IoT',
					count: 976,
					lastModified: 'Yesterday'
				}, {
					id: '8NE888QKV1',
					name: 'IoT + Anypoint Connectors',
					count: 54976,
					lastModified: 'Today'
				}, {
					id: 'M4D37GW83H',
					name: 'Salesforce Tower',
					count: 101280,
					lastModified: 'Today'
				}
			],
			selection: [{
				id: 'M4D37GW83H',
				name: 'Salesforce Tower',
				count: 101280,
				lastModified: 'Today'
			}]
		};
	},

	render () {
		return (
			<DataTable
				items={this.state.items}
				onChange={this.handleChange}
				onSort={this.handleSort}
				selection={this.state.selection}
				{...this.props}
			>
				<DataTableColumn
					label="Opportunity Name"
					property="name"
					truncate
					sortable
				>
					<CustomDataTableCell />
				</DataTableColumn>
				<DataTableColumn
					label="Count"
					property="count"
					sortable
				/>
				<DataTableColumn
					label="Last Modified"
					property="lastModified"
					sortable
					truncate
				/>
			</DataTable>
		);
	},

	handleChange (selection, ...rest) {
		action('change')(selection, ...rest);
		console.log('selection', selection);
		console.dir(...rest);
		this.setState({ selection });
	},

	handleSort (sortColumn, ...rest) {
		action('sort')(sortColumn, ...rest);

		const sortProperty = sortColumn.property;
		const sortDirection = sortColumn.sortDirection;
		const newState = {
			items: [...this.state.items]
		};

		newState.items = newState.items.sort((a, b) => {
			let val = 0;

			if (a[sortProperty] > b[sortProperty]) {
				val = 1;
			}
			if (a[sortProperty] < b[sortProperty]) {
				val = -1;
			}

			if (sortDirection === 'desc') val *= -1;

			return val;
		});

		this.setState(newState);
	}
});

storiesOf(DATA_TABLE, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Striped', () => <DemoDataTable striped />)
	.add('Bordered', () => <DemoDataTable bordered />)
	.add('Buffered', () => <DemoDataTable buffered />)
	.add('Buffered + Bordered', () => <DemoDataTable buffered bordered />)
	.add('Selectable', () => <DemoDataTable selectRows />)
	.add('Custom Cell Component', () => <DemoDataTable customCellComponent />);
