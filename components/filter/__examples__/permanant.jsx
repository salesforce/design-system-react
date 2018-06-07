import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import IconSettings from '~/components/icon-settings';

import Panel from '~/components/panel'; // `~` is replaced with design-system-react at runtime
import FilterGroup from '~/components/panel/filtering/group';
import FilterList from '~/components/panel/filtering/list';
import FilterListHeading from '~/components/panel/filtering/list-heading';
import Filter from '~/components/filter';

import Picklist from '~/components/menu-picklist';

const options = {
	'show-me': [
		{ label: 'All Products', value: 'all-products' },
		{ label: 'All Wackamoles', value: 'all-Wackamoles' },
	],
};

const Example = createReactClass({
	displayName: 'FilterExample',

	propTypes () {
		return {
			align: PropTypes.string,
		};
	},

	getInitialState () {
		return {
			'show-me': {
				selectedPicklistItem: options['show-me'][0],
				selectedItem: options['show-me'][0],
				isActive: true,
			},
		};
	},

	onChangePredicate (event, { id }) {
		const idSuffix = id.split('sample-panel-filtering-')[1];
		this.setState({
			[idSuffix]: {
				...this.state[idSuffix],
				selectedItem: this.state[idSuffix].selectedPicklistItem,
			},
		});
	},

	onSelectPicklist (selectedItem, id) {
		this.setState({
			[id]: {
				...this.state[id],
				selectedPicklistItem: selectedItem,
			},
		});
	},

	onRemove (event, { id }) {
		const idSuffix = id.split('sample-panel-filtering-')[1];
		this.setState({
			[idSuffix]: {
				...this.state[idSuffix],
				isActive: false,
			},
		});
	},

	render () {
		return (
			this.state['show-me'].isActive && (
				<IconSettings iconPath="/assets/icons">
					<Filter
						align={this.props.align}
						id="sample-panel-filtering-show-me"
						isPermanent
						onChange={this.onChangePredicate}
						onRemove={this.onRemove}
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
				</IconSettings>
			)
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
