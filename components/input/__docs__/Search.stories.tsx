/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import Search from '../search';
import IconSettings from '../../icon-settings';

const meta: Meta<typeof Search> = {
	title: 'Components/Input/Search',
	component: Search,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-p-around_medium" style={{ maxWidth: '400px' }}>
					<Story />
				</div>
			</IconSettings>
		),
	],
	argTypes: {
		clearable: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Search>;

// Base search
export const Base: Story = {
	args: {
		id: 'base-search',
		placeholder: 'Search Salesforce',
		assistiveText: { label: 'Search' },
		onSearch: action('search'),
	},
};

// With clearable button
export const Clearable: Story = {
	render: () => {
		const ClearableExample = () => {
			const [value, setValue] = useState('');
			return (
				<Search
					id="clearable-search"
					placeholder="Search..."
					assistiveText={{ label: 'Search' }}
					value={value}
					onChange={(event, data) => setValue(data.value)}
					clearable={value.length > 0}
					onClear={() => setValue('')}
					onSearch={action('search')}
				/>
			);
		};
		return <ClearableExample />;
	},
};

// With label
export const WithLabel: Story = {
	args: {
		id: 'labeled-search',
		label: 'Search Contacts',
		placeholder: 'Enter name or email',
		onSearch: action('search'),
	},
};

// Disabled state
export const Disabled: Story = {
	args: {
		id: 'disabled-search',
		placeholder: 'Search disabled',
		assistiveText: { label: 'Search' },
		disabled: true,
	},
};

// With controlled value
export const Controlled: Story = {
	render: () => {
		const ControlledExample = () => {
			const [value, setValue] = useState('');
			const [results, setResults] = useState<string[]>([]);

			const handleSearch = () => {
				if (value.trim()) {
					setResults([
						`Result 1 for "${value}"`,
						`Result 2 for "${value}"`,
						`Result 3 for "${value}"`,
					]);
				}
			};

			const handleClear = () => {
				setValue('');
				setResults([]);
			};

			return (
				<div>
					<Search
						id="controlled-search"
						placeholder="Search and press Enter"
						assistiveText={{ label: 'Search' }}
						value={value}
						onChange={(event, data) => setValue(data.value)}
						clearable={value.length > 0}
						onClear={handleClear}
						onSearch={handleSearch}
					/>
					{results.length > 0 && (
						<ul className="slds-m-top_small slds-list_dotted">
							{results.map((result, index) => (
								<li key={index} className="slds-item">
									{result}
								</li>
							))}
						</ul>
					)}
				</div>
			);
		};
		return <ControlledExample />;
	},
};




