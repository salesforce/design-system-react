import React from 'react';

import IconSettings from '~/components/icon-settings';

import Panel from '~/components/panel'; // `~` is replaced with design-system-react at runtime
import PanelFilterGroup from '~/components/panel/filtering/group';
import PanelFilterList from '~/components/panel/filtering/list';
import PanelFilterListHeading from '~/components/panel/filtering/list-heading';
import Filter from '~/components/filter';

import Picklist from '~/components/menu-picklist';

const options = {
	'show-me': [
		{ label: 'All Products', value: 'all-products' },
		{ label: 'All Wackamoles', value: 'all-Wackamoles' },
	],
	'created-date': [
		{ label: 'equals THIS WEEK', value: 'this-week' },
		{ label: 'equals LAST WEEK', value: 'last-week' },
	],
	'list-price': [
		{ label: 'greater than "500"', value: 'greater-than-500' },
		{ label: 'greater than "100"', value: 'greater-than-100' },
	],
};

class Example extends React.Component {
	static displayName = 'PanelExample';

	state = {
		modifiedPanel: false,
		'show-me': {
			selectedPicklistItem: options['show-me'][0],
			selectedItem: options['show-me'][0],
		},
		'created-date': {
			selectedPicklistItem: options['created-date'][0],
			selectedItem: options['created-date'][0],
			isActive: true,
		},
		'list-price': {
			selectedPicklistItem: options['list-price'][0],
			selectedItem: options['list-price'][0],
			isActive: true,
		},
	};

	onChangePredicate = (event, { id }) => {
		const idSuffix = id.split('sample-panel-filtering-')[1];
		this.setState({
			modifiedPanel:
				this.state[idSuffix].selectedItem !==
				this.state[idSuffix].selectedPicklistItem,
			[idSuffix]: {
				...this.state[idSuffix],
				selectedItem: this.state[idSuffix].selectedPicklistItem,
			},
		});
	};

	onSelectPicklist = (selectedItem, id) => {
		this.setState({
			[id]: {
				...this.state[id],
				selectedPicklistItem: selectedItem,
			},
		});
	};

	onRemove = (event, { id }) => {
		const idSuffix = id.split('sample-panel-filtering-')[1];
		this.setState({
			[idSuffix]: {
				...this.state[idSuffix],
				isActive: false,
			},
		});
	};

	render() {
		const hasActiveFilters =
			this.state['created-date'].isActive ||
			this.state['list-price'].isActive ||
			this.state.new.isActive;
		return (
			<IconSettings iconPath="/assets/icons">
				<Panel variant="filters">
					<PanelFilterGroup
						errorLabel="Filters could not be applied. Please fix the validation errors below."
						modified={this.state.modifiedPanel}
						onClickAdd={() => {
							this.setState({
								modifiedPanel: true,
								new: { isActive: true, new: true },
							});
						}}
						onClickRemoveAll={() => {
							this.onRemove(null, {
								id: 'sample-panel-filtering-created-date',
							});
							this.onRemove(null, { id: 'sample-panel-filtering-list-price' });
							this.onRemove(null, { id: 'sample-panel-filtering-new' });
						}}
						onRequestCancel={() => {
							this.setState({ modifiedPanel: false });
						}}
						onRequestClose={() => {
							console.log('Request filtering panel to close');
						}}
						onRequestSave={() => {
							this.setState({ modifiedPanel: false });
						}}
						variant="panel"
					>
						<PanelFilterList>
							<Filter
								id="sample-panel-filtering-show-me"
								isPermanent
								onChange={this.onChangePredicate}
								property="Show Me"
								predicate={this.state['show-me'].selectedItem.label}
							>
								<Picklist
									isInline
									label="Show Me"
									onSelect={(selectedItem) => {
										this.onSelectPicklist(selectedItem, 'show-me');
									}}
									options={options['show-me']}
									placeholder="Select record type"
									value={this.state['show-me'].selectedPicklistItem.value}
								/>
							</Filter>
						</PanelFilterList>

						{hasActiveFilters ? (
							<PanelFilterListHeading label="Matching all these filters" />
						) : null}
						{hasActiveFilters ? (
							<PanelFilterList>
								{this.state['created-date'].isActive ? (
									<Filter
										id="sample-panel-filtering-created-date"
										onChange={this.onChangePredicate}
										onRemove={this.onRemove}
										predicate={this.state['created-date'].selectedItem.label}
										property="Created Date"
									>
										<Picklist
											isInline
											label="Created Date EQUALS"
											onSelect={(selectedItem) => {
												this.onSelectPicklist(selectedItem, 'created-date');
											}}
											options={options['created-date']}
											placeholder="Select a time range"
											value={
												this.state['created-date'].selectedPicklistItem.value
											}
										/>
									</Filter>
								) : null}

								{this.state['list-price'].isActive ? (
									<Filter
										id="sample-panel-filtering-list-price"
										onChange={this.onChangePredicate}
										onRemove={this.onRemove}
										predicate={this.state['list-price'].selectedItem.label}
										property="List Price"
									>
										<Picklist
											isInline
											label="List Price"
											onSelect={(selectedItem) => {
												this.onSelectPicklist(selectedItem, 'list-price');
											}}
											options={options['list-price']}
											placeholder="Select a price"
											value={
												this.state['list-price'].selectedPicklistItem.value
											}
										/>
									</Filter>
								) : null}
								<Filter
									errorLabel="Error Message"
									id="sample-panel-filtering-error"
									predicate={'equals "Red"'}
									property="Stage"
								/>
							</PanelFilterList>
						) : null}
					</PanelFilterGroup>
				</Panel>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
