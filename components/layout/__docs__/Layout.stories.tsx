/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout, LayoutItem } from '../index';

const Cell = ({ children }: { children: ReactNode }) => (
	<div
		className="slds-box slds-box_x-small slds-theme_shade slds-text-align_center"
		style={{ minWidth: '3rem' }}
	>
		{children}
	</div>
);

const meta: Meta<typeof Layout> = {
	title: 'Components/Layout',
	component: Layout,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div
				className="slds-p-around_medium"
				style={{ border: '1px dashed #c9c9c9' }}
			>
				<Story />
			</div>
		),
	],
	argTypes: {
		horizontalAlign: {
			control: 'select',
			options: [undefined, 'center', 'space', 'spread', 'end'],
		},
		verticalAlign: {
			control: 'select',
			options: [undefined, 'start', 'center', 'end', 'stretch'],
		},
		pullToBoundary: {
			control: 'select',
			options: [undefined, 'small', 'medium', 'large'],
		},
		multipleRows: { control: 'boolean' },
	},
};
export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
	render: (args) => (
		<Layout {...args}>
			<LayoutItem flexibility="auto">
				<Cell>1</Cell>
			</LayoutItem>
			<LayoutItem flexibility="auto">
				<Cell>2</Cell>
			</LayoutItem>
			<LayoutItem flexibility="auto">
				<Cell>3</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const HorizontalAlign: Story = {
	args: { horizontalAlign: 'spread' },
	render: (args) => (
		<Layout {...args}>
			<LayoutItem>
				<Cell>1</Cell>
			</LayoutItem>
			<LayoutItem>
				<Cell>2</Cell>
			</LayoutItem>
			<LayoutItem>
				<Cell>3</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const VerticalAlign: Story = {
	args: { verticalAlign: 'center' },
	render: (args) => (
		<Layout {...args} style={{ height: '6rem' }}>
			<LayoutItem>
				<Cell>tall</Cell>
			</LayoutItem>
			<LayoutItem>
				<Cell>1</Cell>
			</LayoutItem>
			<LayoutItem>
				<Cell>2</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const MultipleRows: Story = {
	args: { multipleRows: true },
	render: (args) => (
		<Layout {...args}>
			{Array.from({ length: 8 }, (_, i) => (
				<LayoutItem key={i} size={3}>
					<Cell>{i + 1}</Cell>
				</LayoutItem>
			))}
		</Layout>
	),
};

export const PullToBoundary: Story = {
	args: { pullToBoundary: 'medium' },
	render: (args) => (
		<Layout {...args}>
			<LayoutItem padding="around-medium">
				<Cell>1</Cell>
			</LayoutItem>
			<LayoutItem padding="around-medium">
				<Cell>2</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const FixedSizes: Story = {
	render: () => (
		<Layout>
			<LayoutItem size={6}>
				<Cell>6</Cell>
			</LayoutItem>
			<LayoutItem size={3}>
				<Cell>3</Cell>
			</LayoutItem>
			<LayoutItem size={3}>
				<Cell>3</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const ResponsiveSizes: Story = {
	render: () => (
		<Layout multipleRows>
			<LayoutItem
				size={12}
				smallDeviceSize={6}
				mediumDeviceSize={4}
				largeDeviceSize={3}
			>
				<Cell>responsive A</Cell>
			</LayoutItem>
			<LayoutItem
				size={12}
				smallDeviceSize={6}
				mediumDeviceSize={4}
				largeDeviceSize={3}
			>
				<Cell>responsive B</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const Flexibility: Story = {
	render: () => (
		<Layout>
			<LayoutItem flexibility="auto">
				<Cell>auto (grows)</Cell>
			</LayoutItem>
			<LayoutItem flexibility="no-flex">
				<Cell>no-flex</Cell>
			</LayoutItem>
			<LayoutItem flexibility={['grow', 'no-shrink']}>
				<Cell>grow + no-shrink</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const AlignmentBump: Story = {
	render: () => (
		<Layout>
			<LayoutItem>
				<Cell>left</Cell>
			</LayoutItem>
			<LayoutItem alignmentBump="left">
				<Cell>bumped right</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const Padding: Story = {
	render: () => (
		<Layout>
			<LayoutItem padding="around-large">
				<Cell>around-large</Cell>
			</LayoutItem>
			<LayoutItem padding="horizontal-medium">
				<Cell>horizontal-medium</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const Nested: Story = {
	render: () => (
		<Layout multipleRows>
			<LayoutItem size={6}>
				<Layout horizontalAlign="spread">
					<LayoutItem>
						<Cell>a</Cell>
					</LayoutItem>
					<LayoutItem>
						<Cell>b</Cell>
					</LayoutItem>
				</Layout>
			</LayoutItem>
			<LayoutItem size={6}>
				<Cell>right</Cell>
			</LayoutItem>
		</Layout>
	),
};

export const Playground: Story = {
	args: {
		horizontalAlign: 'spread',
		verticalAlign: 'center',
		multipleRows: true,
	},
	render: (args) => (
		<Layout {...args}>
			<LayoutItem size={4}>
				<Cell>1</Cell>
			</LayoutItem>
			<LayoutItem size={4}>
				<Cell>2</Cell>
			</LayoutItem>
			<LayoutItem size={4}>
				<Cell>3</Cell>
			</LayoutItem>
		</Layout>
	),
};
