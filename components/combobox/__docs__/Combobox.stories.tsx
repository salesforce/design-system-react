/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Combobox from '../index';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

const meta: Meta<typeof Combobox> = {
	title: 'Components/Combobox',
	component: Combobox,
	decorators: [
		(Story) => (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-p-around_medium">
					<Story />
				</div>
			</IconSettings>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					'A widget that provides a user with an input field that is either an autocomplete or readonly, accompanied with a listbox of pre-defined options.',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Combobox>;

// Sample account options
const accounts = [
	{ id: '1', label: 'Acme', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '2', label: 'Salesforce.com, Inc.', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '3', label: 'Global Media', subTitle: 'Account • New York', type: 'account' },
	{ id: '4', label: 'United Partners', subTitle: 'Account • Chicago', type: 'account' },
	{ id: '5', label: 'Edge Communications', subTitle: 'Account • Austin', type: 'account' },
];

// Sample accounts with icons
const accountsWithIcons = accounts.map((account) => ({
	...account,
	icon: <Icon assistiveText={{ label: 'Account' }} category="standard" name="account" />,
}));

// ===== Base Variant Stories =====

export const Base: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="base-combobox"
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				options={accountsWithIcons.filter(
					(account) =>
						!inputValue ||
						account.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
				selection={selection}
				value={inputValue}
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
					onRequestRemoveSelectedOption: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

export const BaseWithMenuSubheader: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		const optionsWithSeparator = [
			{ id: 'header', label: 'Recent Accounts', type: 'separator' },
			...accountsWithIcons.slice(0, 3),
			{ id: 'divider', type: 'separator' },
			...accountsWithIcons.slice(3),
		];

		return (
			<Combobox
				id="base-with-subheader"
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				options={optionsWithSeparator}
				selection={selection}
				value={inputValue}
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
				}}
			/>
		);
	},
};

// ===== Inline Listbox Variant Stories =====

export const InlineSingle: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="inline-single"
				labels={{ label: 'Account', placeholder: 'Search Accounts' }}
				options={accountsWithIcons.filter(
					(account) =>
						!inputValue ||
						account.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
				selection={selection}
				value={inputValue}
				variant="inline-listbox"
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
					onRequestRemoveSelectedOption: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

export const InlineMultiple: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="inline-multiple"
				labels={{ label: 'Accounts', placeholder: 'Search Accounts' }}
				multiple
				options={accountsWithIcons.filter(
					(account) =>
						!inputValue ||
						account.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
				selection={selection}
				value={inputValue}
				variant="inline-listbox"
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
					onRequestRemoveSelectedOption: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// ===== Readonly Variant Stories (Picklist) =====

const picklistOptions = [
	{ id: '1', label: 'Option One' },
	{ id: '2', label: 'Option Two' },
	{ id: '3', label: 'Option Three' },
	{ id: '4', label: 'Option Four' },
	{ id: '5', label: 'Option Five' },
];

export const ReadonlySingle: Story = {
	render: () => {
		const [selection, setSelection] = useState<typeof picklistOptions>([]);

		return (
			<Combobox
				id="readonly-single"
				labels={{ label: 'Select Option' }}
				options={picklistOptions}
				selection={selection}
				variant="readonly"
				events={{
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

export const ReadonlySingleWithSelection: Story = {
	render: () => {
		const [selection, setSelection] = useState([picklistOptions[1]]);

		return (
			<Combobox
				id="readonly-single-selected"
				labels={{ label: 'Select Option' }}
				options={picklistOptions}
				selection={selection}
				variant="readonly"
				events={{
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

export const ReadonlyMultiple: Story = {
	render: () => {
		const [selection, setSelection] = useState<typeof picklistOptions>([]);

		return (
			<Combobox
				id="readonly-multiple"
				labels={{ label: 'Select Options' }}
				multiple
				options={picklistOptions}
				selection={selection}
				variant="readonly"
				events={{
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
					onRequestRemoveSelectedOption: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

export const ReadonlyWithDeselect: Story = {
	render: () => {
		const [selection, setSelection] = useState([picklistOptions[0]]);

		return (
			<Combobox
				id="readonly-deselect"
				hasDeselect
				labels={{ label: 'Select Option', deselectOption: 'None' }}
				options={picklistOptions}
				selection={selection}
				variant="readonly"
				events={{
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

export const ReadonlyDisabled: Story = {
	render: () => {
		const [selection, setSelection] = useState([picklistOptions[1]]);

		return (
			<Combobox
				id="readonly-disabled"
				labels={{ label: 'Select Option' }}
				options={picklistOptions}
				selection={selection}
				singleInputDisabled
				variant="readonly"
			/>
		);
	},
};

// ===== Error State =====

export const WithErrorState: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="error-state"
				errorText="This field is required"
				labels={{ label: 'Account', placeholder: 'Search Accounts' }}
				options={accountsWithIcons}
				required
				selection={selection}
				value={inputValue}
				variant="inline-listbox"
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
				}}
			/>
		);
	},
};

// ===== Loading State =====

export const WithLoadingSpinner: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="loading-state"
				hasInputSpinner
				labels={{ label: 'Account', placeholder: 'Search Accounts' }}
				options={accountsWithIcons}
				selection={selection}
				value={inputValue}
				variant="inline-listbox"
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
				}}
			/>
		);
	},
};

export const WithMenuSpinner: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="menu-loading"
				hasMenuSpinner
				labels={{ label: 'Account', placeholder: 'Search Accounts' }}
				options={accountsWithIcons}
				selection={selection}
				value={inputValue}
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
				}}
			/>
		);
	},
};

// ===== Custom Menu Item Rendering =====

// A custom renderer for each option, showing a two-line entity layout
// (label + meta) via `onRenderMenuItem`.
const EntityMenuItem = ({
	option,
}: {
	option: { label: string; subTitle?: string };
}) => (
	<span>
		<span className="slds-listbox__option-text slds-listbox__option-text_entity">
			{option.label}
		</span>
		<span className="slds-listbox__option-meta slds-listbox__option-meta_entity">
			{option.subTitle || ' '}
		</span>
	</span>
);

export const WithCustomMenuItem: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="custom-menu-item"
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				multiple
				onRenderMenuItem={EntityMenuItem}
				options={accountsWithIcons.filter(
					(account) =>
						!inputValue ||
						account.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
				selection={selection}
				value={inputValue}
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
					onRequestRemoveSelectedOption: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// ===== Disabled Options =====

// Individual options can be disabled via `disabled: true`; they render
// dimmed and are not selectable, while the rest stay interactive.
export const WithDisabledOptions: Story = {
	render: () => {
		const optionsWithDisabled = accountsWithIcons.map((account, index) => ({
			...account,
			disabled: index === 1 || index === 3,
		}));
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof optionsWithDisabled>([]);

		return (
			<Combobox
				id="disabled-options"
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				multiple
				options={optionsWithDisabled.filter(
					(account) =>
						!inputValue ||
						account.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
				selection={selection}
				value={inputValue}
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
					onRequestRemoveSelectedOption: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// ===== Right-to-Left =====

// Combobox rendered in RTL mode. Note: the static SLDS 2 CSS is LTR-only,
// so some visuals may look off — this exercises the component's RTL wiring.
export const RightToLeft: Story = {
	render: () => {
		const [selection, setSelection] = useState<typeof picklistOptions>([]);

		return (
			<UNSAFE_DirectionSettings.Provider value="rtl">
				<div dir="rtl" style={{ width: '300px' }}>
					<Combobox
						id="rtl-combobox"
						labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
						options={picklistOptions}
						selection={selection}
						variant="readonly"
						events={{
							onSelect: (_event, { selection: newSelection }) => {
								setSelection(newSelection);
							},
						}}
					/>
				</div>
			</UNSAFE_DirectionSettings.Provider>
		);
	},
};

// ===== Predefined Options Only =====

export const PredefinedOptionsOnly: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="predefined-only"
				labels={{ label: 'Account', placeholder: 'Search Accounts' }}
				options={accountsWithIcons.filter(
					(account) =>
						!inputValue ||
						account.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
				predefinedOptionsOnly
				selection={selection}
				value={inputValue}
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
				}}
			/>
		);
	},
};





