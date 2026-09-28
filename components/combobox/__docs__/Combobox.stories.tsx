/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Combobox from '../index';
import Checkbox from '../../checkbox';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';
import Input from '../../input';
import Popover from '../../popover';
import Tooltip from '../../tooltip';
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
	{
		id: '1',
		label: 'Acme',
		subTitle: 'Account • San Francisco',
		type: 'account',
	},
	{
		id: '2',
		label: 'Salesforce.com, Inc.',
		subTitle: 'Account • San Francisco',
		type: 'account',
	},
	{
		id: '3',
		label: 'Global Media',
		subTitle: 'Account • New York',
		type: 'account',
	},
	{
		id: '4',
		label: 'United Partners',
		subTitle: 'Account • Chicago',
		type: 'account',
	},
	{
		id: '5',
		label: 'Edge Communications',
		subTitle: 'Account • Austin',
		type: 'account',
	},
];

// Sample accounts with icons
const accountsWithIcons = accounts.map((account) => ({
	...account,
	icon: (
		<Icon
			assistiveText={{ label: 'Account' }}
			category="standard"
			name="account"
		/>
	),
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
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
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

// A separator entry with no `label` renders as a plain divider rather than
// a labeled subheader (see `BaseWithMenuSubheader` above).
export const WithMenuSeparator: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		const optionsWithSeparator = [
			...accountsWithIcons.slice(0, 2),
			{ id: 'divider-1', type: 'separator' },
			...accountsWithIcons.slice(2, 4),
			{ id: 'divider-2', type: 'separator' },
			...accountsWithIcons.slice(4),
		];

		return (
			<Combobox
				id="base-with-separator"
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

// A field-level help tooltip icon rendered next to the label.
export const WithInlineHelpTooltip: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="inline-help-tooltip"
				fieldLevelHelpTooltip={
					<Tooltip
						align="top left"
						content="Type to search Salesforce objects..."
						id="combobox-help-tooltip"
					/>
				}
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
				}}
			/>
		);
	},
};

// The menu can inherit its width from a target other than the input
// (here, the menu itself is capped via `menuMaxWidth`) so long option
// labels don't force the input to grow.
export const WithInheritedMenuWidth: Story = {
	render: () => {
		const longLabelAccounts = [
			{
				id: '1',
				label:
					'A very very very very very very very very very very very long title to show how menu width will behave',
				subTitle: 'Account • San Francisco',
				type: 'account',
			},
			...accountsWithIcons.slice(1),
		];
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof longLabelAccounts>([]);

		return (
			<Combobox
				id="inherit-menu-width"
				inheritWidthOf="menu"
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				menuMaxWidth="500px"
				options={longLabelAccounts.filter(
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
				}}
			/>
		);
	},
};

// Limits the number of visible menu items before the menu scrolls, via
// `menuItemVisibleLength`.
export const WithScrollableMenu: Story = {
	render: () => {
		const manyOptions = Array.from({ length: 15 }, (_, index) => ({
			id: `option-${index}`,
			label: `Option ${index + 1}`,
		}));
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof manyOptions>([]);

		return (
			<Combobox
				id="scrollable-menu"
				labels={{ label: 'Search', placeholder: 'Search Options' }}
				menuItemVisibleLength={5}
				options={manyOptions.filter(
					(option) =>
						!inputValue ||
						option.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
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

// A custom `input` element can be supplied in place of the default
// text input, e.g. to override its label or placeholder.
export const WithCustomInputComponent: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="custom-input"
				input={
					<Input
						autoComplete="off"
						label="Search"
						placeholder="My overridden placeholder"
					/>
				}
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
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
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
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// Adds `optionsSearchEntity` (search-elsewhere shortcuts) and
// `optionsAddItem` (create-new-entity shortcut) footer rows to the menu.
export const SearchAndAddEntities: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="search-add-entities"
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				optionsAddItem={[
					{
						id: 'add-new-entity',
						icon: (
							<Icon
								assistiveText={{ label: 'Add' }}
								category="utility"
								name="add"
								size="x-small"
							/>
						),
						label: 'New Entity',
					},
				]}
				optionsSearchEntity={[
					{
						id: 'search-in-salesforce',
						icon: (
							<Icon
								assistiveText={{ label: 'Search' }}
								category="utility"
								name="search"
								size="x-small"
							/>
						),
						label: 'Search in Salesforce',
					},
					{
						id: 'search-in-accounts',
						icon: (
							<Icon
								assistiveText={{ label: 'Search in Accounts' }}
								category="utility"
								name="search"
								size="x-small"
							/>
						),
						label: 'Search in Accounts',
					},
				]}
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
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// The open/closed state is fully controlled via `isOpen` +
// `onRequestOpen`/`onRequestClose`, combined with `predefinedOptionsOnly`.
export const ControlledOpenState: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);
		const [isOpen, setIsOpen] = useState(false);

		return (
			<Combobox
				id="controlled-open-state"
				isOpen={isOpen}
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				options={accountsWithIcons.filter(
					(account) =>
						!inputValue ||
						account.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
				predefinedOptionsOnly
				selection={selection}
				value={inputValue}
				variant="inline-listbox"
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onRequestClose: () => {
						setIsOpen(false);
						setInputValue('');
					},
					onRequestOpen: () => setIsOpen(true),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
						setIsOpen(false);
					},
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// Simulates async option loading: while `hasMenuSpinner` is active, a
// smaller "loading" subset of options is shown.
export const InlineMultipleLoading: Story = {
	render: () => {
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);
		const [isLoading, setIsLoading] = useState(false);

		return (
			<Combobox
				id="inline-multiple-loading"
				hasMenuSpinner={isLoading}
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				multiple
				options={(isLoading
					? accountsWithIcons.slice(0, 3)
					: accountsWithIcons
				).filter(
					(account) =>
						!inputValue ||
						account.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
				selection={selection}
				value={inputValue}
				variant="inline-listbox"
				events={{
					onChange: (_event, { value }) => {
						setInputValue(value);
						setIsLoading(true);
						setTimeout(() => setIsLoading(false), 1000);
					},
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
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
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// Individual options can be disabled in the readonly (picklist) variant
// too, independent of `singleInputDisabled` on the whole widget.
export const ReadonlyWithDisabledOption: Story = {
	render: () => {
		const optionsWithDisabled = picklistOptions.map((option, index) => ({
			...option,
			disabled: index === 1 || index === 2,
		}));
		const [selection, setSelection] = useState<typeof optionsWithDisabled>([]);

		return (
			<Combobox
				id="readonly-disabled-option"
				labels={{ label: 'Select Option' }}
				options={optionsWithDisabled}
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

// Combines `multiple` and `hasDeselect` in the readonly variant, distinct
// from the single-select `ReadonlyWithDeselect` story above.
export const ReadonlyMultipleWithDeselect: Story = {
	render: () => {
		const [selection, setSelection] = useState([
			picklistOptions[0],
			picklistOptions[1],
		]);

		return (
			<Combobox
				id="readonly-multiple-deselect"
				hasDeselect
				labels={{ label: 'Select Options', deselectOption: 'None' }}
				multiple
				options={picklistOptions}
				selection={selection}
				variant="readonly"
				events={{
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
					},
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// A custom `onRenderMenuItem` renderer in the readonly variant, showing
// the assistive "selected" text alongside the option label.
export const ReadonlyWithCustomMenuItem: Story = {
	render: () => {
		const [selection, setSelection] = useState<typeof accountsWithIcons>([]);

		return (
			<Combobox
				id="readonly-custom-menu-item"
				labels={{ label: 'Search', placeholderReadOnly: 'Select company' }}
				onRenderMenuItem={EntityMenuItem}
				options={accountsWithIcons}
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

// ===== Popover Variant (Dialog) =====

const languages = ['English', 'German', 'Tobagonian Creole English', 'Spanish'];

// The `popover` variant renders a `Popover` (dialog) instead of a listbox
// menu, letting arbitrary content — here, a set of checkboxes — drive
// selection. Selection is only committed to the input when the popover
// closes via "OK" (not "Cancel").
export const PopoverVariant: Story = {
	render: () => {
		const [selection, setSelection] = useState<{ id: string; label: string }[]>(
			[]
		);
		const [checked, setChecked] = useState<{ id: string; label: string }[]>([]);

		const getInputString = (options: typeof selection) => {
			if (options.length === 0) return 'Select an option';
			if (options.length === 1) return options[0].label;
			return `${options.length} options selected`;
		};

		return (
			<Combobox
				id="combobox-popover"
				assistiveText={{ popoverLabel: 'Language Options' }}
				labels={{ label: 'Languages', placeholder: getInputString(selection) }}
				popover={
					<Popover
						body={
							<fieldset className="slds-form-element">
								<legend className="slds-form-element__legend slds-form-element__label">
									Select up to 2
								</legend>
								<div className="slds-form-element__control">
									{languages.map((language, index) => (
										<Checkbox
											checked={checked.some(
												(option) => option.label === language
											)}
											id={`popover-checkbox-${index}`}
											key={language}
											labels={{ label: language }}
											onChange={(_event, { checked: isChecked }) => {
												setChecked((previous) =>
													isChecked
														? [
																...previous,
																{
																	id: `popover-checkbox-${index}`,
																	label: language,
																},
															]
														: previous.filter(
																(option) => option.label !== language
															)
												);
											}}
										/>
									))}
								</div>
							</fieldset>
						}
						onClose={(
							_event,
							{ trigger }: { componentWillUnmount?: boolean; trigger?: string }
						) => {
							if (trigger === 'cancel') {
								setChecked(selection);
							} else {
								setSelection(checked);
							}
						}}
					>
						{null}
					</Popover>
				}
				selection={selection}
				value={getInputString(selection)}
				variant="popover"
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
	option: { label: string; subTitle?: string; disabled?: boolean };
}) => (
	<span>
		<span
			className={`slds-listbox__option-text slds-listbox__option-text_entity${
				option.disabled ? ' slds-disabled-text' : ''
			}`}
		>
			{option.label}
		</span>
		<span
			className={`slds-listbox__option-meta slds-listbox__option-meta_entity${
				option.disabled ? ' slds-disabled-text' : ''
			}`}
		>
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
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// A custom menu item renderer combined with a disabled option — confirms
// `disabled` styling/behavior still applies when `onRenderMenuItem` is set.
export const WithCustomMenuItemDisabledOption: Story = {
	render: () => {
		const optionsWithDisabled = accountsWithIcons.map((account, index) => ({
			...account,
			disabled: index === 1 || index === 2,
		}));
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<typeof optionsWithDisabled>([]);

		return (
			<Combobox
				id="custom-menu-item-disabled"
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				multiple
				onRenderMenuItem={EntityMenuItem}
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
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
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
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
						setSelection(newSelection);
					},
				}}
			/>
		);
	},
};

// A disabled option can supply its own `tooltipContent`, shown via the
// shared `tooltipMenuItemDisabled` template when that option is active.
export const WithDisabledOptionTooltip: Story = {
	render: () => {
		const optionsWithDisabledTooltips = accountsWithIcons.map(
			(account, index) => ({
				...account,
				disabled: index === 1 || index === 3,
				tooltipContent:
					index === 1
						? 'This account has been removed from the system.'
						: index === 3
							? "You don't have permission to access this account."
							: undefined,
			})
		);
		const [inputValue, setInputValue] = useState('');
		const [selection, setSelection] = useState<
			typeof optionsWithDisabledTooltips
		>([]);

		return (
			<Combobox
				id="disabled-option-tooltip"
				labels={{ label: 'Search', placeholder: 'Search Salesforce' }}
				multiple
				options={optionsWithDisabledTooltips.filter(
					(account) =>
						!inputValue ||
						account.label.toLowerCase().includes(inputValue.toLowerCase())
				)}
				selection={selection}
				tooltipMenuItemDisabled={<Tooltip />}
				value={inputValue}
				events={{
					onChange: (_event, { value }) => setInputValue(value),
					onSelect: (_event, { selection: newSelection }) => {
						setSelection(newSelection);
						setInputValue('');
					},
					onRequestRemoveSelectedOption: (
						_event,
						{ selection: newSelection }
					) => {
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
