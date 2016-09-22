/* eslint-disable indent */
/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { MENU_DROPDOWN } from '../../utilities/constants';
import Dropdown from '../../components/menu-dropdown';
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
			isOpen: undefined
		};
	},
	handleClickOpen () {
		this.setState({ isOpen: true });
	},
	handleClickClose () {
		this.setState({ isOpen: false });
	},
	handleClickReset () {
		this.setState({ isOpen: null });
	},
	handleOpen () {
		this.setState({ isOpen: true });
	},
	handleClose () {
		this.setState({ isOpen: undefined });
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
						isOpen={isOpen}
						onClose={this.handleClose}
						onOpen={this.handleOpen}
					>
						<div id="custom-dropdown-menu-content">
							<div className="slds-m-around--medium">
								<div className="slds-tile slds-tile--board slds-m-horizontal--small">
									<p className="tile__title slds-text-heading--small">Art Vandelay</p>
									<div className="slds-tile__detail">
										<p className="slds-truncate">
											<a className="slds-m-right--medium" onClick={this.handleClickCustomContent}>Settings</a>
											<a href="#" >Log Out</a>
										</p>
									</div>
								</div>
							</div>
						</div>
						<List options={options} />
					</Dropdown>
				</div>
				<div className="slds-col">
					<Button label="Open Dropdown" onClick={this.handleClickOpen} />
					<Button label="Close Dropdown" onClick={this.handleClickClose} />
					<Button label="Reset Dropdown" onClick={this.handleClickReset} />
				</div>
			</div>
		);
	}
});

const getDropdownCustomTrigger = (props) => (
	<Dropdown {...props} >
		<Trigger>
			<Button iconCategory="utility" iconName="settings" />
		</Trigger>
	</Dropdown>
);

const getDropdownCustomContent = (props) => (
	<Dropdown {...props} >
		<div id="custom-dropdown-menu-content">
			<div className="slds-m-around--medium">
				<div className="slds-tile slds-tile--board slds-m-horizontal--small">
					<p className="tile__title slds-text-heading--small">Art Vandelay</p>
					<div className="slds-tile__detail">
						<p className="slds-truncate">
							<a className="slds-m-right--medium" href="#">Settings</a>
							<a href="#" >Log Out</a>
						</p>
					</div>
				</div>
			</div>
		</div>
		<List options={[{ label: 'Custom Content Option' }, ...options]} />
	</Dropdown>
);

storiesOf(MENU_DROPDOWN, module)
	.addDecorator(getStory => <div className="slds-p-around--medium slds-text-align--center">{getStory()}</div>)
	.add('Base', () => getDropdown({
		align: 'right',
		label: 'Dropdown Click',
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		options
	}))
	.add('No Modal', () => getDropdown({
		align: 'right',
		label: 'Dropdown Click',
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		modal: false,
		options
	}))
	.add('Controled w/ isOpen', () => <DropdownControlled
		align="right"
		label="Dropdown Click"
		options={options}
	/>)
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
	}));
