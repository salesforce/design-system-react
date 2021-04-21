/* eslint-disable lines-between-class-members */
/* eslint-disable react/button-has-type */
/* eslint-disable indent */ /* eslint-disable react/display-name */ import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';
import { MENU_PICKLIST } from '../../../utilities/constants';
import Picklist from '../../menu-picklist';

import Base from '../__examples__/base';
import SnapshotDefault from '../__examples__/snapshot-default';
import TooltipListItem from '../__examples__/tooltip-list-item';

const options = [
	{
		label: 'An option that is Super Super Long',
		value: 'A0',
	},
	{
		label: 'Another option',
		value: 'B0',
	},
	{
		label: 'C Option',
		value: 'C0',
	},
	{
		label: 'D Option',
		value: 'D0',
	},
	{
		label: 'E Option',
		value: 'E0',
	},
	{
		label: 'A1 Option',
		value: 'A1',
	},
	{
		label: 'B2 Option',
		value: 'B1',
	},
	{
		label: 'C2 Option',
		value: 'C1',
	},
	{
		label: 'D2 Option',
		value: 'D1',
	},
	{
		label: 'E2 Option Super Super Long',
		value: 'E1',
	},
];

const getPicklist = (props) => (
	<div>
		<Picklist {...props} />
		<button
			style={{
				padding: '10px',
				margin: '50px',
			}}
		>
			test
		</button>
	</div>
);

class MultipleExample extends React.Component {
	static displayName = 'MultiplePicklistExample';
	state = {
		selectedIndexes: new Set(),
	};
	handleSelect = (selectedItem, data) => {
		this.setState((prevState, props) => ({
			selectedItems: prevState.selectedIndexes.has(data.optionIndex)
				? Array.from(prevState.selectedIndexes.delete(data.optionIndex))
				: Array.from(prevState.selectedIndexes.add(data.optionIndex)),
		}));
	};

	render() {
		console.log(this.state.selectedIndexes);
		return (
			<Picklist
				label="Contacts"
				labels={{
					multipleOptionsSelected: `${this.state.selectedIndexes.size} Contacts Selected`,
				}}
				multiple
				onSelect={this.handleSelect}
				options={options}
				onPillRemove={(removedItem, data) => {
					console.log(
						`data.option.label: '${data.option.label}' data.option.value: '${data.option.value}'`
					);
					this.handleSelect(removedItem, data);
				}}
				silenceDeprecationWarning
			/>
		);
	}
}
storiesOf(MENU_PICKLIST, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
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
	.add('Multiselect', () => <MultipleExample />)
	.add('Docs site Base', () => <Base />)
	.add('Docs site SnapshotDefault', () => <SnapshotDefault />)
	.add('Docs site TooltipListItem', () => <TooltipListItem />);
