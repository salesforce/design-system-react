import { useState } from 'react';
import IconSettings from '../../icon-settings';
import VerticalNavigation from '../';

const categories = [
	{
		id: 'reports',
		label: 'Reports',
		items: [
			{ id: 'recent', label: 'Recent', url: '#recent' },
			{ id: 'created-by-me', label: 'Created by Me', url: '#created' },
			{ id: 'private', label: 'Private Reports', url: '#private' },
			{ id: 'public', label: 'Public Reports', url: '#public' },
			{ id: 'all', label: 'All Reports', url: '#all' },
		],
	},
	{
		id: 'folders',
		label: 'Folders',
		items: [
			{ id: 'created-by-me-folders', label: 'Created by Me', url: '#my-folders' },
			{ id: 'shared', label: 'Shared with Me', url: '#shared' },
			{ id: 'all-folders', label: 'All Folders', url: '#all-folders' },
		],
	},
];

export default {
	title: 'Components/VerticalNavigation',
	component: VerticalNavigation,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ maxWidth: '320px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Default navigation
export const Default = {
	render: () => (
		<VerticalNavigation categories={categories} selectedId="recent" />
	),
};

// Interactive example
export const Interactive = {
	render: () => {
		const [selectedId, setSelectedId] = useState('recent');

		return (
			<VerticalNavigation
				categories={categories}
				selectedId={selectedId}
				onSelect={(event, { item }) => {
					event.preventDefault();
					setSelectedId(item.id);
				}}
			/>
		);
	},
};

// Single category
export const SingleCategory = {
	render: () => (
		<VerticalNavigation
			categories={[categories[0]]}
			selectedId="recent"
		/>
	),
};

// Multiple categories
export const MultipleCategories = {
	render: () => {
		const extendedCategories = [
			...categories,
			{
				id: 'dashboards',
				label: 'Dashboards',
				items: [
					{ id: 'my-dashboards', label: 'My Dashboards', url: '#my-dashboards' },
					{ id: 'shared-dashboards', label: 'Shared Dashboards', url: '#shared-dashboards' },
				],
			},
		];

		return (
			<VerticalNavigation
				categories={extendedCategories}
				selectedId="recent"
			/>
		);
	},
};
