import { useState } from 'react';
import IconSettings from '../../icon-settings';
import Button from '../../button';
import Card from '../../card';
import CardEmpty from '../../card/empty';
import CardFilter from '../../card/filter';
import DataTable from '../../data-table';
import DataTableColumn from '../../data-table/column';
import DataTableHighlightCell from '../../data-table/highlight-cell';
import Icon from '../../icon';
import MediaObject from '../../media-object';

const sampleItems = [
	{ id: '0', name: 'Cloudhub' },
	{ id: '1', name: 'Cloudhub + Anypoint Connectors' },
	{ id: '2', name: 'Cloud City' },
];

export default {
	title: 'Components/Card',
	component: Card,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	tags: ['autodocs'],
};

/**
 * Basic card with items
 */
export const WithItems = {
	render: () => (
		<div className="slds-grid slds-grid_vertical">
			<Card
				id="ExampleCard"
				heading={`Related Items (${sampleItems.length})`}
				icon={<Icon category="standard" name="document" size="small" />}
				headerActions={<Button label="New" />}
				footer="Card Footer"
			>
				<DataTable id="SLDSDataTableExample-1" items={sampleItems}>
					<DataTableColumn label="Opportunity Name" property="name" truncate>
						<DataTableHighlightCell />
					</DataTableColumn>
				</DataTable>
			</Card>
		</div>
	),
};

/**
 * Interactive card with filtering
 */
export const InteractiveCard = {
	render: function InteractiveCardStory() {
		const [items, setItems] = useState(sampleItems);
		const [filter, setFilter] = useState(null);
		let currentId = 3;

		const handleFilterChange = (event) => {
			const filterValue =
				event.target.value !== '' ? RegExp(event.target.value, 'i') : null;
			setFilter(filterValue);
		};

		const handleDeleteAll = () => {
			setFilter(null);
			setItems([]);
		};

		const handleAddItem = () => {
			setItems([
				{ id: String(currentId++), name: `New Item ${Date.now()}` },
				...items,
			]);
		};

		let displayItems = items;
		if (filter) {
			displayItems = items.filter((item) => filter.test(item.name));
		}

		const isEmpty = displayItems.length === 0;
		const heading = items.length > 0 ? `Related Items (${items.length})` : 'Related Items';

		return (
			<div className="slds-grid slds-grid_vertical">
				<Card
					id="InteractiveCard"
					filter={
						!isEmpty || filter ? (
							<CardFilter onChange={handleFilterChange} />
						) : null
					}
					headerActions={
						!isEmpty ? (
							<Button label="Delete All Items" onClick={handleDeleteAll} />
						) : (
							<Button label="New" onClick={handleAddItem} />
						)
					}
					footer="Card Footer"
					heading={heading}
					icon={<Icon category="standard" name="document" size="small" />}
					empty={isEmpty ? <CardEmpty heading="No Related Items" /> : null}
				>
					<DataTable id="SLDSDataTableExample-2" items={displayItems}>
						<DataTableColumn label="Opportunity Name" property="name" truncate>
							<DataTableHighlightCell search={filter} />
						</DataTableColumn>
					</DataTable>
				</Card>
			</div>
		);
	},
};

/**
 * Empty card state
 */
export const EmptyCard = {
	render: () => (
		<Card
			id="EmptyCard"
			heading="Related Items"
			icon={<Icon category="standard" name="document" size="small" />}
			headerActions={<Button label="New" />}
			empty={<CardEmpty heading="No Related Items" />}
		/>
	),
};

/**
 * Card with custom header using MediaObject
 */
export const CustomHeader = {
	render: () => (
		<Card
			id="CustomHeaderCard"
			header={
				<MediaObject
					body={
						<h2 className="slds-text-heading_small slds-truncate">
							Custom Media Object Header
						</h2>
					}
					figure={<Icon category="standard" name="account" size="small" />}
				/>
			}
			footer="Card Footer"
		>
			<DataTable id="SLDSDataTableExample-3" items={sampleItems}>
				<DataTableColumn label="Opportunity Name" property="name" truncate>
					<DataTableHighlightCell />
				</DataTableColumn>
			</DataTable>
		</Card>
	),
};

/**
 * Card with custom heading style
 */
export const CustomHeading = {
	render: () => (
		<Card
			id="CustomHeadingCard"
			heading={<span style={{ color: 'var(--slds-g-color-brand-base-50, #0070d2)' }}>Custom Styled Heading</span>}
			icon={<Icon category="standard" name="document" size="small" />}
			footer="Card Footer"
		>
			<DataTable id="SLDSDataTableExample-4" items={sampleItems}>
				<DataTableColumn label="Opportunity Name" property="name" truncate>
					<DataTableHighlightCell />
				</DataTableColumn>
			</DataTable>
		</Card>
	),
};

/**
 * Card with fixed height and scrollable body
 */
export const SetHeightCard = {
	render: () => (
		<Card
			bodyClassName="slds-grow slds-scrollable_y"
			className="slds-grid slds-grid_vertical"
			footer={<a href="#">View All</a>}
			heading="Card with Set Height"
			icon={<Icon category="standard" name="document" size="small" />}
			style={{ height: '300px' }}
		>
			<div className="slds-card__body_inner">
				{Array.from({ length: 15 }, (_, i) => (
					<div key={i} className="slds-p-around_x-small">
						Scrollable content line {i + 1}
					</div>
				))}
			</div>
		</Card>
	),
};

/**
 * Card without header
 */
export const WithoutHeader = {
	render: () => (
		<Card
			bodyClassName="slds-grow slds-scrollable_y"
			className="slds-grid slds-grid_vertical"
			footer={<a href="#">Footer Link</a>}
			hasNoHeader
			style={{ height: '200px' }}
		>
			<DataTable id="SLDSDataTableExample-5" items={sampleItems}>
				<DataTableColumn label="Opportunity Name" property="name" truncate>
					<DataTableHighlightCell />
				</DataTableColumn>
			</DataTable>
		</Card>
	),
};

/**
 * Simple card with text content
 */
export const SimpleCard = {
	render: () => (
		<Card
			heading="Simple Card"
			icon={<Icon category="standard" name="account" size="small" />}
		>
			<div className="slds-card__body_inner slds-p-around_medium">
				<p>This is a simple card with text content.</p>
				<p>Cards are used to group related information.</p>
			</div>
		</Card>
	),
};
