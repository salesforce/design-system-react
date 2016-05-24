/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { DATA_TABLE } from '../../utilities/constants';
import DataTable from '../../components/data-table';
import Column from '../../components/data-table/column';

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
				}
			],
			selection: []
		};
	},

	render () {
		return (
			<DataTable
				id="DemoDataTable"
				items={this.state.items}
				onChange={this.handleChange}
				onSort={this.handleSort}
				selection={this.state.selection}
				{...this.props}
			>
				<Column
					label="Opportunity Name"
					property="name"
					truncate
				/>
				<Column
					label="Count"
					property="count"
					sortable
				/>
				<Column
					label="Last Modified"
					property="lastModified"
					sortable
					truncate
				/>
			</DataTable>
		);
	},

	handleChange (selection) {
		action('change')(...arguments);

		this.setState({ selection });
	},

	handleSort (sortColumn) {
		action('sort')(...arguments);

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

			if (sortDirection === 'desc') val = val * -1;

			return val;
		});

		this.setState(newState);
	}
});

storiesOf(DATA_TABLE, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('striped', () => <DemoDataTable striped={true} />)
	.add('bordered', () => <DemoDataTable bordered={true} />)
	.add('selectable', () => <DemoDataTable selectRows={true} />);
