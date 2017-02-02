import React from 'react';

import FilteringPanel from '~/components/panel/filtering'; // `~` is replaced with design-system-react at runtime
import PanelFilteringFooter from '~/components/panel/filtering/footer';
import PanelFilteringList from '~/components/panel/filtering/list';
import PanelFilteringListHeading from '~/components/panel/filtering/list-heading';
import PanelFilteringFilter from '~/components/panel/filtering/filter';

import Button from '~/components/button';
import Picklist from '~/components/menu-picklist';

const options = {
	'show-me': [
		{ label: 'All Products', value: 'all-products' },
		{ label: 'All Wackamoles', value: 'all-Wackamoles' }
	],
	'created-date': [
		{ label: 'equals THIS WEEK', value: 'this-week' },
		{ label: 'equals LAST WEEK', value: 'last-week' }
	],
	'list-price': [
		{ label: 'greater than "500"', value: 'greater-than-500' },
		{ label: 'greater than "100"', value: 'greater-than-100' }
	]
};

const Example = React.createClass({
	displayName: 'PanelExample',

	getInitialState () {
		return {
			'show-me': {
				id: 'show-me',
				selectedPicklistItem: options['show-me'][0],
				selectedItem: options['show-me'][0]
			},
			'created-date': {
				id: 'created-date',
				selectedPicklistItem: options['created-date'][0],
				selectedItem: options['created-date'][0],
				isActive: true
			},
			'list-price': {
				id: 'list-price',
				selectedPicklistItem: options['list-price'][0],
				selectedItem: options['list-price'][0],
				isActive: true
			}
		};
	},

	onChangePredicate ({ id }) {
		const idSuffix = id.split('sample-panel-filtering-')[1];
		this.setState({
			[idSuffix]: {
				...this.state[idSuffix],
				selectedItem: this.state[idSuffix].selectedPicklistItem
			}
		});
	},

	onSelectPicklist (selectedItem, id) {
		this.setState({
			[id]: {
				...this.state[id],
				selectedPicklistItem: selectedItem
			}
		});
	},

	onRemove ({ id }) {
		const idSuffix = id.split('sample-panel-filtering-')[1];
		this.setState({
			[idSuffix]: {
				...this.state[idSuffix],
				isActive: false
			}
		});
	},

	render () {
		return (
			<div style={{ paddingLeft: '300px' }}>
				<FilteringPanel
					footer={<PanelFilteringFooter>
						<Button
							label="Add Filter"
							onClick={() => {
								console.log('Add Filter');
							}}
							variant="link"
						/>
						<Button
							className="slds-col--bump-left"
							label="Remove All"
							onClick={() => {
								this.onRemove({ id: 'sample-panel-filtering-created-date' });
								this.onRemove({ id: 'sample-panel-filtering-list-price' });
							}}
							variant="link"
						/>
					</PanelFilteringFooter>}
				>
					<PanelFilteringList>
						<PanelFilteringFilter
							id="sample-panel-filtering-show-me"
							permanent
							property="Show Me"
							predicate={this.state['show-me'].selectedItem.label}
							onChange={this.onChangePredicate}
						>
							<Picklist
								isInline
								label="Show Me"
								onSelect={(selectedItem) => {
									this.onSelectPicklist(selectedItem, 'show-me');
								}}
								options={options['show-me']}
								placeholder="Select a criteria"
								value={this.state['show-me'].selectedPicklistItem.value}
							/>
						</PanelFilteringFilter>
					</PanelFilteringList>

					{this.state['created-date'].isActive || this.state['list-price'].isActive ? <PanelFilteringListHeading label="Matching all these filters" /> : null}
						{this.state['created-date'].isActive || this.state['list-price'].isActive ? <PanelFilteringList>
							{this.state['created-date'].isActive
								? <PanelFilteringFilter
									id="sample-panel-filtering-created-date"
									property="Created Date"
									predicate={this.state['created-date'].selectedItem.label}
									onChange={this.onChangePredicate}
									onRemove={this.onRemove}
								>
									<Picklist
										isInline
										label="Created Date EQUALS"
										onSelect={(selectedItem) => {
											this.onSelectPicklist(selectedItem, 'created-date');
										}}
										options={options['created-date']}
										placeholder="Select a time range"
										value={this.state['created-date'].selectedPicklistItem.value}
									/>
								</PanelFilteringFilter>
							: null}
							{this.state['list-price'].isActive
							?	<PanelFilteringFilter
								id="sample-panel-filtering-list-price"
								property="List Price"
								predicate={this.state['list-price'].selectedItem.label}
								onChange={this.onChangePredicate}
								onRemove={this.onRemove}
							>
								<Picklist
									isInline
									label="List Price"
									onSelect={(selectedItem) => {
										this.onSelectPicklist(selectedItem, 'list-price');
									}}
									options={options['list-price']}
									placeholder="Select a price"
									value={this.state['list-price'].selectedPicklistItem.value}
								/>
							</PanelFilteringFilter>
							: null}
						</PanelFilteringList>
					: null}
				</FilteringPanel>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
