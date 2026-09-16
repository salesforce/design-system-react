import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import IconSettings from '../../icon-settings';
import Default from '../__examples__/default';
import NewFilter from '../__examples__/new';
import LockedFilter from '../__examples__/locked';
import PermanantFilter from '../__examples__/permanant';
import ErrorFilter from '../__examples__/error';
import AssistiveTextFilter from '../__examples__/assistive-text';
import Filter from '../index';

interface CustomAlignmentProps {
	children: React.ReactNode;
	align?: 'left' | 'right';
}

const CustomAlignment: React.FC<CustomAlignmentProps> = ({
	children,
	align = 'left',
}) => (
	<div className="slds-grid slds-m-around_xx-large">
		<div className={`slds-col_bump-${align}`} style={{ width: '420px' }}>
			{children}
		</div>
	</div>
);

const meta: Meta<typeof Filter> = {
	title: 'Components/Filter',
	component: Filter,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
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
					'A Filter is a popover with custom trigger. It can be used by Panel Filtering. Menus within a Filter Popover will need to not have "portal mounts" and be inline.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Filter>;

export const Base: Story = {
	name: 'Filter',
	render: () => (
		<CustomAlignment>
			<Default />
		</CustomAlignment>
	),
};

export const New: Story = {
	name: 'New Filter',
	render: () => (
		<CustomAlignment>
			<NewFilter />
		</CustomAlignment>
	),
};

export const Locked: Story = {
	name: 'Locked Filter',
	render: () => (
		<CustomAlignment>
			<LockedFilter />
		</CustomAlignment>
	),
};

export const Permanent: Story = {
	name: 'Permanent Filter',
	render: () => (
		<CustomAlignment>
			<PermanantFilter />
		</CustomAlignment>
	),
};

export const AlignRight: Story = {
	name: 'Filter Align Right',
	render: () => (
		<CustomAlignment align="right">
			<Default align="right" />
		</CustomAlignment>
	),
};

export const AssistiveText: Story = {
	name: 'Assistive Text Filter',
	render: () => (
		<CustomAlignment>
			<AssistiveTextFilter />
		</CustomAlignment>
	),
};

export const Error: Story = {
	name: 'Error Filter',
	render: () => (
		<CustomAlignment>
			<ErrorFilter />
		</CustomAlignment>
	),
};



