/* eslint-disable indent */
/* eslint-disable react/display-name */

import React from 'react';
import createReactClass from 'create-react-class';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { MENU_PICKLIST } from '../../../utilities/constants';
import Picklist from '../../menu-picklist';

const options = [
	{ label: 'An option that is Super Super Long', value: 'A0' },
	{ label: 'Another option', value: 'B0' },
	{ label: 'C Option', value: 'C0' },
	{ label: 'D Option', value: 'D0' },
	{ label: 'E Option', value: 'E0' },
	{ label: 'A1 Option', value: 'A1' },
	{ label: 'B2 Option', value: 'B1' },
	{ label: 'C2 Option', value: 'C1' },
	{ label: 'D2 Option', value: 'D1' },
	{ label: 'E2 Option Super Super Long', value: 'E1' },
];

const getPicklist = (props) => (
	<div>
		<Picklist {...props} />
		<button style={{ padding: '10px', margin: '50px' }}>test</button>
	</div>
);

const MultipleExample = createReactClass({
	displayName: 'MultiplePicklistExample',

	getInitialState () {
		return {
			selectedIndexes: new Set(),
		};
	},

	handleSelect (selectedItem, data) {
		this.setState((prevState, props) => ({
			selectedItems: prevState.selectedIndexes.has(data.optionIndex)
				? Array.from(prevState.selectedIndexes.delete(data.optionIndex))
				: Array.from(prevState.selectedIndexes.add(data.optionIndex)),
		}));
	},

	render () {
		console.log(this.state.selectedIndexes);

		return (
			<Picklist
				label="Contacts"
				labels={{
					multipleOptionsSelected: `${
						this.state.selectedIndexes.size
					} Contacts Selected`,
				}}
				multiple
				onSelect={this.handleSelect}
				options={options}
				onPillRemove={(removedItem, data) => {
					console.log(
						`data.option.label: '${data.option.label}' data.option.value: '${
							data.option.value
						}'`
					);
					this.handleSelect(removedItem, data);
				}}
			/>
		);
	},
});

storiesOf(MENU_PICKLIST, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Modal', () =>
		getPicklist({
			label: 'Contacts',
			placeholder: 'Select a contact',
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Non-modal', () =>
		getPicklist({
			label: 'Contacts',
			isInline: true,
			onClick: (event) => {
				console.log('clicked', event.target);
			},
			placeholder: 'Select a contact',
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Error state', () =>
		getPicklist({
			errorText: 'This field is required',
			label: 'Contacts',
			placeholder: 'Select a contact',
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
			required: true,
		})
	)
	.add('Multiselect', () => <MultipleExample />);
