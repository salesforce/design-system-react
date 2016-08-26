import React from 'react';
import uniqueId from 'lodash.uniqueid';
import { storiesOf, action } from '@kadira/storybook';

import { CARD } from '../../utilities/constants';
import Button from '../../components/button';
import Card from '../../components/card';
import CardEmpty from '../../components/card/empty';
import CardFilter from '../../components/card/filter';
import DataTable from '../../components/data-table';
import DataTableColumn from '../../components/data-table/column';
import DataTableHighlightCell from '../../components/data-table/highlight-cell';
import Icon from '../../components/icon';

const sampleItems = [
	{ name: 'Cloudhub' },
	{ name: 'Cloudhub + Anypoint Connectors' },
	{ name: 'Cloud City' }
];

const DemoCard = React.createClass({
	displayName: 'DemoCard',

	propTypes: {
		items: React.PropTypes.array
	},

	getInitialState () {
		return {
			filter: null,
			items: this.props.items
		};
	},

	render () {
		let items = this.state.items;
		if (this.state.filter) {
			items = items.filter((item) => this.state.filter.test(item.name));
		}

		const isEmpty = (items.length === 0);

		return (
			<div className="slds-grid slds-grid--vertical">
				<Card
					id="ExampleCard"
					filter={(!isEmpty || this.state.filter)
						? <CardFilter onChange={this.handleFilterChange} />
						: null
					}
					headerActions={!isEmpty
						? <Button label="Delete All Items" onClick={this.handleDeleteAllItems} />
						: null
					}
					heading="Releated Items"
					icon={<Icon category="standard" name="document" size="small" />}
					empty={isEmpty
						? <CardEmpty heading="No Related Items">
							<Button label="Add Item" onClick={this.handleAddItem} />
						</CardEmpty>
						: null}
				>
					<DataTable
						id="SLDSDataTableExample-1"
						items={items}
						bordered
					>
						<DataTableColumn
							label="Opportunity Name"
							property="name"
							truncate
						>
							<DataTableHighlightCell search={this.state.filter} />
						</DataTableColumn>
					</DataTable>
				</Card>

			</div>
		);
	},

	handleFilterChange (event, ...rest) {
		action('filter')(event, ...rest);

		const filter = event.target.value !== '' ? RegExp(event.target.value, 'i') : null;

		this.setState({
			filter
		});
	},

	handleDeleteAllItems (...rest) {
		action('delete all')(...rest);

		this.setState({
			filter: null,
			items: []
		});
	},

	handleAddItem (...rest) {
		action('add')(...rest);

		this.setState({
			items: [
				{ name: uniqueId('New item #') },
				...this.state.items
			]
		});
	}
});

const SetHeightCard = () => (
	<Card
		bodyClassName="slds-grow slds-scrollable--y"
		className="slds-grid slds-grid--vertical"
		footer={<a href="javascript:void(0);">Footer text</a>} // eslint-disable-line no-script-url
		heading="Card with set height"
		icon={<Icon category="standard" name="document" size="small" />}
		style={{ height: '300px' }}
	>
		<div className="slds-card__body--inner">
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
			<div>asdf</div>
		</div>
	</Card>
);

SetHeightCard.displayName = 'SET_HEIGHT_CARD';

storiesOf(CARD, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('w/ Items', () => <DemoCard items={sampleItems} />)
	.add('Empty', () => <DemoCard items={[]} />)
	.add('Set height card', () => <SetHeightCard />);
