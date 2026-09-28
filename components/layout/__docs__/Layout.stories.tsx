/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout, LayoutItem } from '../index';

const Cell = ({ children, tall }: { children: ReactNode; tall?: boolean }) => (
	<div
		className="slds-box slds-box_x-small slds-theme_shade slds-text-align_center"
		style={{ minWidth: '3rem', ...(tall ? { paddingTop: '3rem' } : {}) }}
	>
		{children}
	</div>
);

const Hint = ({ children }: { children: ReactNode }) => (
	<p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small">
		{children}
	</p>
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
		<>
			<Hint>
				Items don&rsquo;t fill the row, so the leftover space is distributed by{' '}
				<code>horizontalAlign</code>. Switch the control between{' '}
				<code>center</code>, <code>space</code>, <code>spread</code>, and{' '}
				<code>end</code> to compare.
			</Hint>
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
		</>
	),
};

export const VerticalAlign: Story = {
	args: { verticalAlign: 'center' },
	render: (args) => (
		<>
			<Hint>
				One item is deliberately taller. The short items align to the{' '}
				<code>verticalAlign</code> position within the row — switch the control
				between <code>start</code>, <code>center</code>, and <code>end</code> to
				see them move to the top, middle, and bottom.
			</Hint>
			<Layout {...args}>
				<LayoutItem>
					<Cell tall>tall item</Cell>
				</LayoutItem>
				<LayoutItem>
					<Cell>short</Cell>
				</LayoutItem>
				<LayoutItem>
					<Cell>short</Cell>
				</LayoutItem>
			</Layout>
		</>
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
		<>
			<Hint>
				<code>pullToBoundary</code> applies a negative margin that cancels the
				items&rsquo; padding, so their content sits flush with the container
				edge. Compare the two rows: the first has no pull, the second pulls to
				the medium boundary.
			</Hint>
			<div style={{ background: '#f3f3f3' }}>
				<Layout>
					<LayoutItem padding="around-medium">
						<Cell>no pull</Cell>
					</LayoutItem>
					<LayoutItem padding="around-medium">
						<Cell>no pull</Cell>
					</LayoutItem>
				</Layout>
			</div>
			<div style={{ background: '#f3f3f3', marginTop: '1rem' }}>
				<Layout {...args}>
					<LayoutItem padding="around-medium">
						<Cell>pulled</Cell>
					</LayoutItem>
					<LayoutItem padding="around-medium">
						<Cell>pulled</Cell>
					</LayoutItem>
				</Layout>
			</div>
		</>
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
		<>
			<Hint>
				Resize the preview (or your browser) to see these change. Each item is
				full width by default (<code>size=12</code>), then 1/2 on small, 1/3 on
				medium, and 1/4 on large viewports.
			</Hint>
			<Layout multipleRows>
				{Array.from({ length: 4 }, (_, i) => (
					<LayoutItem
						key={i}
						size={12}
						smallDeviceSize={6}
						mediumDeviceSize={4}
						largeDeviceSize={3}
					>
						<Cell>{i + 1}</Cell>
					</LayoutItem>
				))}
			</Layout>
		</>
	),
};

export const Flexibility: Story = {
	render: () => (
		<>
			<Hint>
				<code>flexibility</code> controls how an item grows and shrinks to fill
				the row. It accepts a single keyword or an array of them (last item
				below combines <code>grow</code> and <code>no-shrink</code>).
			</Hint>
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
		</>
	),
};

export const AlignmentBump: Story = {
	render: () => (
		<>
			<Hint>
				<code>alignmentBump=&quot;left&quot;</code> adds an auto-margin on the
				item&rsquo;s left, pushing it (and everything after it) to the far right
				edge.
			</Hint>
			<Layout>
				<LayoutItem>
					<Cell>left</Cell>
				</LayoutItem>
				<LayoutItem alignmentBump="left">
					<Cell>bumped right</Cell>
				</LayoutItem>
			</Layout>
		</>
	),
};

export const Padding: Story = {
	render: () => (
		<>
			<Hint>
				Padding is applied to the <code>LayoutItem</code> itself (tinted here to
				show the padded area). <code>around-*</code> pads all sides;{' '}
				<code>horizontal-*</code> pads only left and right.
			</Hint>
			<Layout>
				<LayoutItem padding="around-large" style={{ background: '#e5f0fb' }}>
					<Cell>around-large</Cell>
				</LayoutItem>
				<LayoutItem
					padding="horizontal-medium"
					style={{ background: '#e5f0fb' }}
				>
					<Cell>horizontal-medium</Cell>
				</LayoutItem>
			</Layout>
		</>
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
