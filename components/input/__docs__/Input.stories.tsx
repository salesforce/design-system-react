/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import Input from '../index';
import InputIcon from '../../icon/input-icon/index';
import IconSettings from '../../icon-settings';
import Tooltip from '../../tooltip';

const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-p-around_medium">
					<Story />
				</div>
			</IconSettings>
		),
	],
	argTypes: {
		variant: {
			control: 'select',
			options: ['base', 'counter'],
		},
		type: {
			control: 'select',
			options: [
				'text',
				'password',
				'email',
				'url',
				'tel',
				'number',
				'search',
				'date',
				'datetime-local',
				'time',
			],
		},
		disabled: {
			control: 'boolean',
		},
		readOnly: {
			control: 'boolean',
		},
		required: {
			control: 'boolean',
		},
		isStatic: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

// Base input
export const Base: Story = {
	args: {
		id: 'base-input',
		label: 'Input Label',
		placeholder: 'Enter text...',
	},
};

// With assistive text (hidden label)
export const AssistiveTextLabel: Story = {
	args: {
		id: 'assistive-label-input',
		assistiveText: { label: 'Hidden label for screen readers' },
		placeholder: 'Input with hidden label',
	},
};

// With error state
export const ErrorState: Story = {
	args: {
		id: 'error-input',
		label: 'Email',
		placeholder: 'Enter email',
		required: true,
		errorText: 'Please enter a valid email address.',
	},
};

// With inline help text
export const InlineHelp: Story = {
	args: {
		id: 'inline-help-input',
		label: 'Username',
		placeholder: 'Enter username',
		inlineHelpText: 'Username must be at least 3 characters.',
	},
};

// With left icon
export const WithLeftIcon: Story = {
	args: {
		id: 'left-icon-input',
		label: 'Search',
		placeholder: 'Search...',
		iconLeft: <InputIcon name="search" category="utility" />,
	},
};

// With right icon
export const WithRightIcon: Story = {
	args: {
		id: 'right-icon-input',
		label: 'Input with Icon',
		placeholder: 'Enter text...',
		iconRight: <InputIcon name="clear" category="utility" />,
	},
};

// With clickable icons
export const WithClickableIcons: Story = {
	args: {
		id: 'clickable-icons-input',
		label: 'Search',
		placeholder: 'Search...',
		iconLeft: (
			<InputIcon
				name="search"
				category="utility"
				onClick={action('search clicked')}
				assistiveText={{ icon: 'Search' }}
			/>
		),
		iconRight: (
			<InputIcon
				name="clear"
				category="utility"
				onClick={action('clear clicked')}
				assistiveText={{ icon: 'Clear' }}
			/>
		),
	},
};

// With loading spinner
export const WithSpinner: Story = {
	args: {
		id: 'spinner-input',
		label: 'Loading Input',
		placeholder: 'Loading...',
		hasSpinner: true,
		iconLeft: <InputIcon name="search" category="utility" />,
		assistiveText: { spinner: 'Loading results' },
	},
};

// Fixed text input
export const FixedText: Story = {
	args: {
		id: 'fixed-text-input',
		label: 'Price',
		placeholder: '0.00',
		fixedTextLeft: '$',
	},
};

// Read only input
export const ReadOnly: Story = {
	args: {
		id: 'readonly-input',
		label: 'Read Only',
		value: 'This value cannot be edited',
		readOnly: true,
	},
};

// Disabled input
export const Disabled: Story = {
	args: {
		id: 'disabled-input',
		label: 'Disabled Input',
		value: 'Disabled value',
		disabled: true,
	},
};

// Static input
export const Static: Story = {
	args: {
		id: 'static-input',
		label: 'Static Value',
		value: 'This is displayed as static text',
		isStatic: true,
	},
};

// Counter variant
export const Counter: Story = {
	render: () => {
		const CounterExample = () => {
			const [value, setValue] = useState('5');
			return (
				<Input
					id="counter-input"
					label="Quantity"
					variant="counter"
					value={value}
					onChange={(event, data) => setValue(data.value)}
					minValue={0}
					maxValue={10}
					step={1}
				/>
			);
		};
		return <CounterExample />;
	},
};

// Counter with decimal step
export const CounterDecimal: Story = {
	render: () => {
		const CounterDecimalExample = () => {
			const [value, setValue] = useState('1.5');
			return (
				<Input
					id="counter-decimal-input"
					label="Amount"
					variant="counter"
					value={value}
					onChange={(event, data) => setValue(data.value)}
					minValue={0}
					maxValue={5}
					step={0.5}
				/>
			);
		};
		return <CounterDecimalExample />;
	},
};

// Counter static display
export const CounterStatic: Story = {
	args: {
		id: 'counter-static-input',
		label: 'Items',
		variant: 'counter',
		value: '7',
		isStatic: true,
	},
};

// With field level help tooltip
export const FieldLevelHelp: Story = {
	args: {
		id: 'field-level-help-input',
		label: 'API Key',
		placeholder: 'Enter your API key',
		fieldLevelHelpTooltip: (
			<Tooltip
				id="field-level-help-tooltip"
				align="top left"
				content="Your API key can be found in Settings > Developer > API Keys."
			/>
		),
	},
};

// Custom styling
export const CustomStyling: Story = {
	args: {
		id: 'custom-style-input',
		label: 'Custom Styled Input',
		placeholder: 'Enter text...',
		autoComplete: 'off',
		styleInput: {
			backgroundColor: '#f4f6f9',
			borderRadius: '8px',
		},
		styleContainer: {
			maxWidth: '300px',
		},
	},
};

// Controlled input example
export const Controlled: Story = {
	render: () => {
		const ControlledExample = () => {
			const [value, setValue] = useState('');
			return (
				<div>
					<Input
						id="controlled-input"
						label="Controlled Input"
						value={value}
						onChange={(event, data) => setValue(data.value)}
						placeholder="Type something..."
					/>
					<p className="slds-m-top_small slds-text-body_small">
						Current value: {value || '(empty)'}
					</p>
				</div>
			);
		};
		return <ControlledExample />;
	},
};

// Multiple input types showcase
export const InputTypes: Story = {
	render: () => (
		<div className="slds-grid slds-wrap slds-gutters">
			<div className="slds-col slds-size_1-of-2 slds-p-bottom_medium">
				<Input id="text-input" label="Text" type="text" placeholder="Text input" />
			</div>
			<div className="slds-col slds-size_1-of-2 slds-p-bottom_medium">
				<Input id="email-input" label="Email" type="email" placeholder="email@example.com" />
			</div>
			<div className="slds-col slds-size_1-of-2 slds-p-bottom_medium">
				<Input id="password-input" label="Password" type="password" placeholder="Enter password" />
			</div>
			<div className="slds-col slds-size_1-of-2 slds-p-bottom_medium">
				<Input id="tel-input" label="Phone" type="tel" placeholder="(555) 555-5555" />
			</div>
			<div className="slds-col slds-size_1-of-2 slds-p-bottom_medium">
				<Input id="url-input" label="URL" type="url" placeholder="https://example.com" />
			</div>
			<div className="slds-col slds-size_1-of-2 slds-p-bottom_medium">
				<Input id="number-input" label="Number" type="number" placeholder="0" />
			</div>
			<div className="slds-col slds-size_1-of-2 slds-p-bottom_medium">
				<Input id="date-input" label="Date" type="date" />
			</div>
			<div className="slds-col slds-size_1-of-2 slds-p-bottom_medium">
				<Input id="time-input" label="Time" type="time" />
			</div>
		</div>
	),
};




