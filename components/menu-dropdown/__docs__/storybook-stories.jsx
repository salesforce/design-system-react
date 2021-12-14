/* eslint-disable indent */
/* eslint-disable react/display-name */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';
import EventUtil from '../../../utilities/event';

import { MENU_DROPDOWN } from '../../../utilities/constants';
import Dropdown from '../../menu-dropdown';
import { DropdownNubbinPositions } from '../../menu-dropdown/menu-dropdown';
import DropdownWithTooltips from '../__examples__/with-tooltips';
import CheckmarkMenuDropdown from '../__examples__/checkmark';
import List from '../../utilities/menu-list';
import Button from '../../button';
import Trigger from '../../menu-dropdown/button-trigger';
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

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

const makeRtl = (component) => (
	// eslint-disable-next-line
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

class DropdownControlled extends React.Component {
	static displayName = 'DropdownControlled';

	state = {
		forcedState: undefined,
		menuOptions: options,
	};

	handleButtonClickReset = () => {
		this.setState({ forcedState: undefined });
	};

	handleOpen = (...params) => {
		action('Force Open')(...params);
		this.setState({ forcedState: true });
	};

	handleClose = (...params) => {
		action('Force Closed')(...params);
		this.setState({ forcedState: false });
	};

	toggleDisabledOption = () => {
		this.setState((prevState, props) => {
			prevState.menuOptions.splice(1, 1, {
				disabled: false,
				label: 'An option that is Super Super Long',
				value: 'A0',
			});
			return { options: prevState.menuOptions };
		});
	};

	render() {
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
	}
}

const getDropdownPositioned = (props) => {
	const positionedDropdowns = [];
	DropdownNubbinPositions.forEach((position) => {
		positionedDropdowns.push(
			<div
				className="slds-col slds-size_1-of-3"
				key={`positioned-dropdown-${position.replace(' ', '')}`}
				style={{ minHeight: '500px' }}
				data-ignore-axe-duplicate-id
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
			<Button
				assistiveText={{ icon: props.assistiveText.icon }}
				iconCategory="utility"
				iconName="settings"
			/>
		</Trigger>
	</Dropdown>
);

/* eslint-disable react/prop-types */
const DropdownCustomContent = (props) => (
	<div id="custom-dropdown-menu-content">
		<div className="slds-m-around_medium">
			<div className="slds-tile slds-tile_board slds-m-horizontal_small">
				<p className="tile__title slds-text-heading_small">Art Vandelay</p>
				<div className="slds-tile__detail">
					<p className="slds-truncate">
						<a
							className="slds-m-right_medium"
							href="#"
							onClick={EventUtil.trappedHandler(props.onClick)}
						>
							Settings
						</a>
						<a href="#" onClick={EventUtil.trappedHandler(props.onClick)}>
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
		<div className="slds-p-around_medium slds-text-align_center">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () =>
		getDropdown({
			align: 'right',
			id: 'base',
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
	.add('Base center-aligned', () =>
		getDropdown({
			align: 'center',
			id: 'base-center',
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
	.add('Base with icon, dropdown right-aligned', () =>
		getDropdown({
			align: 'right',
			id: 'right-align-with-icon',
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
	.add('Base with icon, dropdown right-aligned, right-to-left', () =>
		makeRtl(
			getDropdown({
				align: 'right',
				label: 'Dropdown Click',
				iconCategory: 'utility',
				iconName: 'down',
				iconPosition: 'right',
				id: 'right-align-with-icon-rtl',
				onClick: (...rest) => {
					action('Clicked')(...rest);
				},
				onSelect: (...rest) => {
					action('Selected')(...rest);
				},
				options,
			})
		)
	)
	.add('Base with icon, dropdown left-aligned', () =>
		getDropdown({
			align: 'left',
			label: 'Dropdown Click',
			iconCategory: 'utility',
			iconName: 'down',
			iconPosition: 'right',
			id: 'left-align-with-icon',
			onClick: (...rest) => {
				action('Clicked')(...rest);
			},
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Base with icon, dropdown left-aligned, right-to-left', () =>
		makeRtl(
			getDropdown({
				align: 'left',
				label: 'Dropdown Click',
				iconCategory: 'utility',
				iconName: 'down',
				iconPosition: 'right',
				id: 'left-align-with-icon-rtl',
				onClick: (...rest) => {
					action('Clicked')(...rest);
				},
				onSelect: (...rest) => {
					action('Selected')(...rest);
				},
				options,
			})
		)
	)
	.add('Render inline', () =>
		getDropdown({
			align: 'right',
			id: 'render-inline',
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
			id: 'render-inline-nubbins',
			menuPosition: 'relative',
			onSelect: (...rest) => {
				action('Selected')(...rest);
			},
			options,
		})
	)
	.add('Render inline w/ Nubbins, right-to-left', () =>
		makeRtl(
			getDropdownPositioned({
				id: 'render-inline-nubbins-rtl',
				menuPosition: 'relative',
				onSelect: (...rest) => {
					action('Selected')(...rest);
				},
				options,
			})
		)
	)
	.add('Custom Trigger', () =>
		getDropdownCustomTrigger({
			id: 'custom-trigger',
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
			id: 'custom-content',
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
			id: 'hover',
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
				id: 'hover-1',
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
				id: 'hover-2',
				onSelect: (...rest) => {
					action('Selected')(...rest);
				},
				openOn: 'hover',
				options,
			})}
		</div>
	))
	.add('Checkmark', () => <CheckmarkMenuDropdown />)
	.add('Checkmark open menu', () => <CheckmarkMenuDropdown isOpen />)
	.add('Checkmark multiple', () => <CheckmarkMenuDropdown multiple />)
	.add('Checkmark, right-to-left', () =>
		makeRtl(
			getDropdown({
				assistiveText: { icon: 'More Options' },
				buttonVariant: 'icon',
				checkmark: true,
				iconCategory: 'utility',
				iconName: 'down',
				iconVariant: 'border-filled',
				id: 'checkmark-rtl',
				onSelect: (...rest) => {
					action('Selected')(...rest);
				},
				options,
				value: 'C0',
			})
		)
	)
	.add('Hover with Checkmark', () =>
		getDropdown({
			assistiveText: { icon: 'More Options' },
			buttonVariant: 'icon',
			checkmark: true,
			iconCategory: 'utility',
			iconName: 'down',
			iconVariant: 'border-filled',
			id: 'hover-with-checkmark',
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
	.add('Controlled w/ isOpen', () => (
		<DropdownControlled
			align="right"
			id="controlled-is-open"
			label="Dropdown Click"
			options={options}
		/>
	))
	.add('With tooltips', () => <DropdownWithTooltips />)
	.add('With tooltips (open)', () => (
		<DropdownWithTooltips isOpenAllTooltips />
	));
