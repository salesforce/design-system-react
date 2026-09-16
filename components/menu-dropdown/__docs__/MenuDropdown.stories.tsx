/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import MenuDropdown from '../index';
import ButtonTrigger from '../button-trigger';
import IconSettings from '../../icon-settings';
import Button from '../../button';
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

// Re-export nubbin positions from the component
const DropdownNubbinPositions = [
	'top left',
	'top',
	'top right',
	'bottom left',
	'bottom',
	'bottom right',
] as const;

const options = [
	{
		className: 'custom-li-class',
		divider: 'bottom' as const,
		label: 'A Header',
		type: 'header' as const,
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
		type: 'item' as const,
		value: 'B0',
	},
	{
		type: 'divider' as const,
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

const meta: Meta<typeof MenuDropdown> = {
	title: 'Components/MenuDropdown',
	component: MenuDropdown,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium slds-text-align_center">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					'The MenuDropdown component is a variant of the Lightning Design System Menu component. It provides a dropdown menu triggered by a button.',
			},
		},
	},
	argTypes: {
		align: {
			control: 'select',
			options: ['center', 'left', 'right'],
			description: 'Aligns the menu center, right, or left respective to the trigger',
		},
		buttonVariant: {
			control: 'select',
			options: ['base', 'neutral', 'brand', 'destructive', 'icon'],
		},
		openOn: {
			control: 'select',
			options: ['click', 'hover', 'hybrid'],
		},
		width: {
			control: 'select',
			options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof MenuDropdown>;

// Base story
export const Base: Story = {
	args: {
		align: 'right',
		id: 'base-dropdown',
		label: 'Dropdown Click',
		options,
	},
};

// Center aligned
export const CenterAligned: Story = {
	args: {
		align: 'center',
		id: 'center-dropdown',
		label: 'Center Aligned',
		options,
	},
};

// With icon
export const WithIcon: Story = {
	args: {
		align: 'right',
		id: 'icon-dropdown',
		label: 'Dropdown with Icon',
		iconCategory: 'utility',
		iconName: 'down',
		iconPosition: 'right',
		options,
	},
};

// Hover trigger
export const HoverTrigger: Story = {
	args: {
		assistiveText: { icon: 'Icon More large' },
		buttonVariant: 'icon',
		iconCategory: 'utility',
		iconName: 'settings',
		iconVariant: 'more',
		id: 'hover-dropdown',
		openOn: 'hover',
		options,
	},
};

// With checkmark
export const WithCheckmark: Story = {
	render: () => {
		const CheckmarkDropdown = () => {
			const [value, setValue] = useState<string | undefined>('C0');
			return (
				<MenuDropdown
					assistiveText={{ icon: 'More Options' }}
					buttonVariant="icon"
					checkmark
					iconCategory="utility"
					iconName="down"
					iconVariant="border-filled"
					id="checkmark-dropdown"
					onSelect={(option) => {
						setValue(option.value as string);
					}}
					options={options}
					value={value}
				/>
			);
		};
		return <CheckmarkDropdown />;
	},
};

// Multiple selection
export const MultipleSelection: Story = {
	render: () => {
		const MultipleDropdown = () => {
			const [values, setValues] = useState<string[]>(['C0', 'D0']);
			return (
				<MenuDropdown
					assistiveText={{ icon: 'More Options' }}
					buttonVariant="icon"
					checkmark
					iconCategory="utility"
					iconName="down"
					iconVariant="border-filled"
					id="multiple-dropdown"
					multiple
					onSelect={(option) => {
						const val = option.value as string;
						setValues((prev) =>
							prev.includes(val)
								? prev.filter((v) => v !== val)
								: [...prev, val]
						);
					}}
					options={options}
					value={values}
				/>
			);
		};
		return <MultipleDropdown />;
	},
};

// Custom trigger
export const CustomTrigger: Story = {
	args: {
		id: 'custom-trigger-dropdown',
		options,
	},
	render: (args) => (
		<MenuDropdown {...args}>
			<ButtonTrigger>
				<Button
					assistiveText={{ icon: 'Custom Dropdown Trigger' }}
					iconCategory="utility"
					iconName="settings"
				/>
			</ButtonTrigger>
		</MenuDropdown>
	),
};

// Inline (relative position)
export const RenderInline: Story = {
	args: {
		align: 'right',
		id: 'inline-dropdown',
		label: 'Inline Dropdown',
		menuPosition: 'relative',
		options,
	},
};

// With nubbins
export const WithNubbins: Story = {
	render: () => (
		<div className="slds-grid slds-wrap">
			{DropdownNubbinPositions.map((position) => (
				<div
					className="slds-col slds-size_1-of-3"
					key={`nubbin-${position.replace(' ', '-')}`}
					style={{ minHeight: '300px', padding: '20px' }}
				>
					<MenuDropdown
						id={`nubbin-${position.replace(' ', '-')}`}
						menuPosition="relative"
						nubbinPosition={position}
						options={options.slice(0, 5)}
					>
						<ButtonTrigger>
							<Button
								iconVariant="container"
								iconCategory="utility"
								iconName="settings"
								label={position}
							/>
						</ButtonTrigger>
					</MenuDropdown>
				</div>
			))}
		</div>
	),
};

// Right-to-left
export const RightToLeft: Story = {
	render: () => (
		<UNSAFE_DirectionSettings.Provider value="rtl">
			<div dir="rtl">
				<MenuDropdown
					align="right"
					id="rtl-dropdown"
					label="RTL Dropdown"
					iconCategory="utility"
					iconName="down"
					iconPosition="right"
					options={options}
				/>
			</div>
		</UNSAFE_DirectionSettings.Provider>
	),
};

// Controlled dropdown
export const Controlled: Story = {
	render: () => {
		const ControlledDropdown = () => {
			const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

			return (
				<div className="slds-grid">
					<div className="slds-col slds-m-right_medium">
						<MenuDropdown
							align="right"
							id="controlled-dropdown"
							isOpen={isOpen}
							label="Controlled Dropdown"
							options={options}
						/>
					</div>
					<div className="slds-col">
						<Button
							label="Force Open"
							onClick={() => setIsOpen(true)}
							className="slds-m-right_small"
						/>
						<Button
							label="Force Close"
							onClick={() => setIsOpen(false)}
							className="slds-m-right_small"
						/>
						<Button label="Reset" onClick={() => setIsOpen(undefined)} />
					</div>
				</div>
			);
		};
		return <ControlledDropdown />;
	},
};

// Icon button variant
export const IconButton: Story = {
	args: {
		assistiveText: { icon: 'More Options' },
		buttonVariant: 'icon',
		iconCategory: 'utility',
		iconName: 'down',
		iconVariant: 'border-filled',
		id: 'icon-button-dropdown',
		options,
	},
};

// Inverse variant
export const Inverse: Story = {
	args: {
		id: 'inverse-dropdown',
		inverse: true,
		label: 'Inverse Dropdown',
		options,
	},
	decorators: [
		(Story) => (
			<div
				className="slds-p-around_medium"
				style={{ backgroundColor: '#16325c' }}
			>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	render: (args) => (
		<MenuDropdown {...args} buttonInverse />
	),
};
