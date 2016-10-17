/* eslint-disable indent */
/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { MENU_DROPDOWN } from '../../utilities/constants';
import Dropdown from '../../components/menu-dropdown';
import { DropdownNubbinPositions } from '../../components/menu-dropdown/menu-dropdown';
import List from '../../components/menu-list/list';
import Button from '../../components/button';
import Trigger from '../../components/menu-dropdown/button-trigger';

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
	{ label: 'E2 Option Super Super Long', value: 'E1' }
];

const getDropdown = (props) => (
	<Dropdown {...props} />
);

const DropdownControlled = React.createClass({
	displayName: 'DropdownControlled',
	getInitialState () {
		return {
			isOpen: false
		};
	},
	handleButtonClickOpen () {
		this.handleOpen();
	},
	handleButtonClickClose () {
		this.handleClose();
	},
	handleButtonClickReset () {
		this.setState({ isOpen: undefined });
	},
	handleOpen () {
		this.setState({ isOpen: true });
	},
	handleClose () {
		this.setState({ isOpen: false });
	},
	handleClickCustomContent () {
		this.setState({ isOpen: false });
	},
	render () {
		let isOpen;
		if (this.state && this.state.isOpen === true) {
			isOpen = true;
		} else if (this.state && this.state.isOpen === false) {
			isOpen = false;
		}	else {
			isOpen = undefined;
		}
		const props = this.props;
		return (
			<div className="slds-grid">

				<div className="slds-col">
					<Dropdown
						{...props}
						modal={false}
						isOpen={isOpen}
						onClose={this.handleClose}
						onOpen={this.handleOpen}
						options={options}
						onClick={this.handleOpen}
					/>
				</div>
				<div className="slds-col">
					<Button label="Open Dropdown" onClick={this.handleButtonClickOpen} />
					<Button label="Close Dropdown" onClick={this.handleButtonClickClose} />
					<Button label="Reset Dropdown" onClick={this.handleButtonClickReset} />
				</div>
			</div>
		);
	}
});

const getDropdownPositioned = (props) => {
	const positionedDropdowns = [];
	DropdownNubbinPositions.forEach((position) => {
		positionedDropdowns.push(
			<div className="slds-col slds-size--1-of-3" style={{ minHeight: '500px' }}>
				<Dropdown
					{...props}
					forceOpen
					nubbinPosition={position}
				>
					<Trigger>
						<Button iconVariant="container" iconName="settings" label={position} />
					</Trigger>
				</Dropdown>
			</div>
		);
	});

	return (
		<div>
			<div className="slds-grid slds-wrap">
				{positionedDropdowns}
			</div>
			<div className="slds-col" style={{ minHeight: '500px' }}>
				<Dropdown
					{...props}
					nubbinPosition="top right"
				>
					<Trigger>
						<Button iconVariant="container" iconName="settings" assistiveText="top right" />
					</Trigger>
				</Dropdown>
			</div>
		</div>
	);
};

const getDropdownCustomTrigger = (props) => (
	<Dropdown {...props} >
		<Trigger>
			<Button iconCategory="utility" iconName="settings" />
		</Trigger>
	</Dropdown>
);

/* eslint-disable react/prop-types */
/* eslint-disable no-script-url */
const DropdownCustomContent = (props) => (
	<div id="custom-dropdown-menu-content">
		<div className="slds-m-around--medium">
			<div className="slds-tile slds-tile--board slds-m-horizontal--small">
				<p className="tile__title slds-text-heading--small">Art Vandelay</p>
				<div className="slds-tile__detail">
					<p className="slds-truncate">
						<a className="slds-m-right--medium" href="javascript:void(0)" onClick={props.onClick}>Settings</a>
						<a href="javascript:void(0)" onClick={props.onClick}>Log Out</a>
					</p>
				</div>
			</div>
		</div>
	</div>
);

const getDropdownCustomContent = (props) => (
	<Dropdown {...props} >
		<DropdownCustomContent />
		<List options={[{ label: 'Custom Content Option' }, ...options]} />
	</Dropdown>
);

storiesOf(MENU_DROPDOWN, module)
	.addDecorator(getStory => <div className="slds-p-around--medium slds-text-align--center">{getStory()}</div>)
	.add('Base', () => getDropdown({
		align: 'right',
		label: 'Dropdown Click',
		onClick: (...rest) => {
			action('Clicked')(...rest);
		},
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		options
	}))
	.add('No Modal', () => getDropdown({
		align: 'right',
		label: 'Dropdown Click',
		onClick: (...rest) => {
			action('Clicked')(...rest);
		},
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		modal: false,
		options
	}))
	.add('No Modal w/ Nubbins', () => getDropdownPositioned({
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		modal: false,
		options
	}))
	.add('Custom Trigger', () => getDropdownCustomTrigger({
		assistiveText: 'Custom Dropdown Trigger',
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		options
	}))
	.add('Custom Content', () => getDropdownCustomContent({
		label: 'Custom Content Dropdown Click',
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		options
	}))
	.add('Hover', () => getDropdown({
		assistiveText: 'Icon More large',
		buttonVariant: 'icon',
		iconName: 'settings',
		iconVariant: 'more',
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		openOn: 'hover',
		options
	}))
	.add('Two Hovers', () => <div>
		{getDropdown({
			assistiveText: 'Icon More large',
			buttonVariant: 'icon',
			iconName: 'settings',
			iconVariant: 'more',
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			openOn: 'hover',
			options
		})}
		{' '}
		{getDropdown({
			assistiveText: 'Icon More large',
			buttonVariant: 'icon',
			iconName: 'settings',
			iconVariant: 'more',
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			openOn: 'hover',
			options
		})}
	</div>)
	.add('Hover with Checkmark', () => getDropdown({
		assistiveText: 'More Options',
		buttonVariant: 'icon',
		checkmark: true,
		iconName: 'down',
		iconVariant: 'border-filled',
		onMouseEnter: action('Mouse enter'),
		onMouseLeave: action('Mouse leave'),
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		openOn: 'hover',
		options,
		value: 'C0'
	}))
	.add('Controled w/ isOpen', () => <DropdownControlled
		align="right"
		label="Dropdown Click"
		options={options}
	/>);
