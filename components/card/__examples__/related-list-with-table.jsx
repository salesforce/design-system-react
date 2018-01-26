import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime
import Card from '~/components/card';
import CardEmpty from '~/components/card/empty';
import CardFilter from '~/components/card/filter';
import DataTable from '~/components/data-table';
import DataTableColumn from '~/components/data-table/column';
import Icon from '~/components/icon';

const sampleItems = [
	{ name: 'Cloudhub' },
	{ name: 'Cloudhub + Anypoint Connectors' },
	{ name: 'Cloud City' }
];

const Example = createReactClass({
	displayName: 'CardExample',

	getInitialState () {
		return {
			items: sampleItems,
			isFiltering: false
		};
	},

	handleFilterChange (event) {
		const filteredItems = sampleItems.filter((item) =>
			RegExp(event.target.value, 'i').test(item.name)
		);
		this.setState({ isFiltering: true, items: filteredItems });
	},

	handleDeleteAllItems () {
		this.setState({ isFiltering: false, items: [] });
	},

	handleAddItem () {
		this.setState({ items: sampleItems });
	},

	render () {
		const isEmpty = this.state.items.length === 0;

		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid--vertical">
					<Card
						id="ExampleCard"
						filter={
							(!isEmpty || this.state.isFiltering) && (
								<CardFilter onChange={this.handleFilterChange} />
							)
						}
						headerActions={
							!isEmpty && (
								<Button
									label="Delete All Items"
									onClick={this.handleDeleteAllItems}
								/>
							)
						}
						heading="Releated Items"
						icon={<Icon category="standard" name="document" size="small" />}
						empty={
							isEmpty ? (
								<CardEmpty heading="No Related Items">
									<Button label="Add Item" onClick={this.handleAddItem} />
								</CardEmpty>
							) : null
						}
					>
						<DataTable
							items={this.state.items}
							id="DataTableExample-1"
							bordered
						>
							<DataTableColumn
								label="Opportunity Name"
								property="name"
								truncate
							/>
						</DataTable>
					</Card>
				</div>
			</IconSettings>
		);
	}
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
