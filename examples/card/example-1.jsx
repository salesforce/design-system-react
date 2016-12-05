import { CARD } from '../../utilities/constants';
import Button from 'design-system-react/components/button';
import Card from 'design-system-react/components/card';
import CardEmpty from 'design-system-react/components/card/empty';
import CardFilter from 'design-system-react/components/card/filter';
import DataTable from 'design-system-react/components/data-table';
import DataTableColumn from 'design-system-react/components/data-table/column';
import DataTableHighlightCell from 'design-system-react/components/data-table/highlight-cell';
import Icon from 'design-system-react/components/icon';

const sampleItems = [{
	name: 'Cloudhub'}, {
	name: 'Cloudhub + Anypoint Connectors'},{
	name: 'Cloud City'}];

const CardExample = React.createClass({
	displayName: 'CardExample',

	getInitialState () {
		return {
			items: sampleItems,
			isFiltering: false
		};
	},

	render () {
		const isEmpty = (this.state.items.length === 0);

		return (
			<div className="slds-grid slds-grid--vertical">

				<Card
					id="ExampleCard"
					filter={
						(!isEmpty || this.state.isFiltering) && <CardFilter onChange={this.handleFilterChange} />
					}
					headerActions={
						!isEmpty && <Button label="Delete All Items" onClick={this.handleDeleteAllItems} />
					}
					heading="Releated Items"
					icon={<Icon category="standard" name="document" size="small" />}
					empty={isEmpty ? <CardEmpty heading="No Related Items">
							<Button label="Add Item" onClick={this.handleAddItem} />
						</CardEmpty> : null}
				>
					<DataTable items={this.state.items} id="DataTableExample-1" bordered>
						<DataTableColumn
							label="Opportunity Name"
							property="name"
							truncate
						/>
					</DataTable>
				</Card>

			</div>
		);
	},

	handleFilterChange (event) {
		const filteredItems = sampleItems.filter( (item) => RegExp(event.target.value, 'i').test(item.name));
		this.setState({isFiltering: true, items: filteredItems});
	},

	handleDeleteAllItems () {
		this.setState({isFiltering: false, items: []});
	},

	handleAddItem () {
		this.setState({items: sampleItems});
	},
});

ReactDOM.render(<CardExample />, mountNode);
