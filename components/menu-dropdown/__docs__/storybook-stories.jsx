/* eslint-disable indent */
/* eslint-disable react/display-name */

import React from 'react';
import createReactClass from 'create-react-class';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { MENU_DROPDOWN } from '../../../utilities/constants';
import Dropdown from '../../menu-dropdown';
import { DropdownNubbinPositions } from '../../menu-dropdown/menu-dropdown';
import List from '../../utilities/menu-list';
import Button from '../../button';
import Trigger from '../../menu-dropdown/button-trigger';

const options = [
	{
		className: 'custom-li-class',
		divider: 'bottom',
		label: 'A Header',
		type: 'header',
	},
	{ disabled: true, label: 'An option that is Super Super Long', value: 'A0' },
	{ label: 'Custom Class', className: 'custom-item-class', value: 'classssss' },
	{
		href: 'http://sfdc.co/',
		id: 'custom-li-id',
		label: 'Has a value',
		leftIcon: {
			name: 'settings',
			category: 'utility',
		},
		rightIcon: {
			name: 'settings',
			category: 'utility',
		},
		type: 'item',
		value: 'B0',
	},
	{
		type: 'divider',
	},
	{ label: 'C Option', value: 'C0' },
	{ label: 'D Option', value: 'D0' },
	{ label: 'E Option', value: 'E0' },
	{ label: 'A1 Option', value: 'A1' },
	{ label: 'B2 Option', value: 'B1' },
	{ label: 'C2 Option', value: 'C1' },
	{ label: 'D2 Option', value: 'D1' },
	{ label: 'E2 Option Super Super Long', value: 'E1' },
];

const getDropdown = (props) => (
	<Dropdown {...props} onClose={action('Closed')} onOpen={action('Opened')} />
);

const DropdownControlled = createReactClass({
	displayName: 'DropdownControlled',

	getInitialState () {
		return {
			forcedState: undefined,
			menuOptions: options,
		};
	},

	handleButtonClickReset () {
		this.setState({ forcedState: undefined });
	},

	handleOpen (...params) {
		action('Force Open')(...params);
		this.setState({ forcedState: true });
	},

	handleClose (...params) {
		action('Force Closed')(...params);
		this.setState({ forcedState: false });
	},

	toggleDisabledOption () {
		this.setState((prevState, props) => {
			prevState.menuOptions.splice(1, 1, {
				disabled: false,
				label: 'An option that is Super Super Long',
				value: 'A0',
			});
			return { options: prevState.menuOptions };
		});
	},

	render () {
		return (
			<div className="slds-grid">
				<div className="slds-col">
					<Dropdown
						{...this.props}
						modal={false}
						isOpen={this.state.forcedState}
						onClose={action('Attempt Close')}
						onOpen={action('Attempt Open')}
						options={this.state.menuOptions}
					/>
				</div>
				<div className="slds-col">
					<Button label="Force Open Dropdown" onClick={this.handleOpen} />
					<Button label="Force Close Dropdown" onClick={this.handleClose} />
					<Button
						label="Reset Dropdown"
						onClick={this.handleButtonClickReset}
					/>
					<Button
						label="Toggle Option A disabled"
						onClick={this.toggleDisabledOption}
					/>
				</div>
			</div>
		);
	},
});

const getDropdownPositioned = (props) => {
	const positionedDropdowns = [];
	DropdownNubbinPositions.forEach((position) => {
		positionedDropdowns.push(
			<div
				className="slds-col slds-size--1-of-3"
				style={{ minHeight: '500px' }}
			>
				<Dropdown
					{...props}
					isOpen
					nubbinPosition={position}
					onClose={action('Closed')}
					onOpen={action('Opened')}
				>
					<Trigger>
						<Button
							iconVariant="container"
							iconCategory="utility"
							iconName="settings"
							label={position}
						/>
					</Trigger>
				</Dropdown>
			</div>
		);
	});

	return (
		<div>
			<div className="slds-grid slds-wrap">{positionedDropdowns}</div>
			<div className="slds-col" style={{ minHeight: '500px' }}>
				<Dropdown
					{...props}
					nubbinPosition="top right"
					onClose={action('Closed')}
					onOpen={action('Opened')}
				>
					<Trigger>
						<Button
							iconVariant="container"
							iconCategory="utility"
							iconName="settings"
							assistiveText={{ icon: 'top right' }}
						/>
					</Trigger>
				</Dropdown>
			</div>
		</div>
	);
};

const getDropdownCustomTrigger = (props) => (
	<Dropdown {...props} onClose={action('Closed')} onOpen={action('Opened')}>
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
						<a
							className="slds-m-right--medium"
							href="javascript:void(0)"
							onClick={props.onClick}
						>
							Settings
						</a>
						<a href="javascript:void(0)" onClick={props.onClick}>
							Log Out
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
);

const getDropdownCustomContent = (props) => (
	<Dropdown {...props} onClose={action('Closed')} onOpen={action('Opened')}>
		<DropdownCustomContent />
		<List options={[{ label: 'Custom Content Option' }, ...options]} />
	</Dropdown>
);

storiesOf(MENU_DROPDOWN, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium slds-text-align--center">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () =>
		getDropdown({
			align: 'right',
			label: 'Dropdown Click',
			onClick: (...rest) => {
				action('Clicked')(...rest);
			},
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Base with icon', () =>
		getDropdown({
			align: 'right',
			label: 'Dropdown Click',
			iconCategory: 'utility',
			iconName: 'down',
			iconPosition: 'right',
			onClick: (...rest) => {
				action('Clicked')(...rest);
			},
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Render inline', () =>
		getDropdown({
			align: 'right',
			label: 'Dropdown Click',
			menuPosition: 'relative',
			onClick: (...rest) => {
				action('Clicked')(...rest);
			},
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Render inline w/ Nubbins', () =>
		getDropdownPositioned({
			menuPosition: 'relative',
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Custom Trigger', () =>
		getDropdownCustomTrigger({
			tabIndex: '-1',
			assistiveText: { icon: 'Custom Dropdown Trigger' },
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Custom Content', () =>
		getDropdownCustomContent({
			label: 'Custom Content Dropdown Click',
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Hover', () =>
		getDropdown({
			assistiveText: { icon: 'Icon More large' },
			buttonVariant: 'icon',
			iconCategory: 'utility',
			iconName: 'settings',
			iconVariant: 'more',
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			openOn: 'hover',
			options,
		})
	)
	.add('Two Hovers', () => (
		<div>
			{getDropdown({
				assistiveText: { icon: 'Icon More large' },
				buttonVariant: 'icon',
				iconCategory: 'utility',
				iconName: 'settings',
				iconVariant: 'more',
				onSelect: (...rest) => {
					action('Selected')(...rest);
				},
				openOn: 'hover',
				options,
			})}{' '}
			{getDropdown({
				assistiveText: { icon: 'Icon More large' },
				buttonVariant: 'icon',
				iconCategory: 'utility',
				iconName: 'settings',
				iconVariant: 'more',
				onSelect: (...rest) => {
					action('Selected')(...rest);
				},
				openOn: 'hover',
				options,
			})}
		</div>
	))
	.add('Hover with Checkmark', () =>
		getDropdown({
			assistiveText: { icon: 'More Options' },
			buttonVariant: 'icon',
			checkmark: true,
			iconCategory: 'utility',
			iconName: 'down',
			iconVariant: 'border-filled',
			onMouseEnter: action('Mouse enter'),
			onMouseLeave: action('Mouse leave'),
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			openOn: 'hover',
			options,
			value: 'C0',
		})
	)
	.add('Controled w/ isOpen', () => (
		<DropdownControlled
			align="right"
			label="Dropdown Click"
			options={options}
		/>
	));
