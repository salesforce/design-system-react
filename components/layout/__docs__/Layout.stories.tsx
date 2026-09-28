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
		<>
			<Hint>
				Three items with <code>flexibility=&quot;auto&quot;</code> each grow to
				share the row equally.
			</Hint>
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
		</>
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
				see them move to the top, middle, and bottom; <code>stretch</code> makes
				every item fill the full row height.
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
		<>
			<Hint>
				With <code>multipleRows</code>, items that exceed the row width wrap to
				the next line. Eight quarter-width (<code>size=3</code>) items form two
				rows of four; without it they would overflow a single row.
			</Hint>
			<Layout {...args}>
				{Array.from({ length: 8 }, (_, i) => (
					<LayoutItem key={i} size={3}>
						<Cell>{i + 1}</Cell>
					</LayoutItem>
				))}
			</Layout>
		</>
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
		<>
			<Hint>
				<code>size</code> is a fraction of 12 columns. Here 6/12 (½) + 3/12 (¼)
				+ 3/12 (¼) fills the row exactly.
			</Hint>
			<Layout>
				<LayoutItem size={6}>
					<Cell>6 / 12</Cell>
				</LayoutItem>
				<LayoutItem size={3}>
					<Cell>3 / 12</Cell>
				</LayoutItem>
				<LayoutItem size={3}>
					<Cell>3 / 12</Cell>
				</LayoutItem>
			</Layout>
		</>
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
				the row. It accepts three forms: a single keyword, an array of keywords,
				or — for Lightning Base Component parity — a comma-separated string. All
				three are shown below.
			</Hint>
			<Layout>
				<LayoutItem flexibility="auto">
					<Cell>&quot;auto&quot; (single, grows)</Cell>
				</LayoutItem>
				<LayoutItem flexibility="no-flex">
					<Cell>&quot;no-flex&quot; (single)</Cell>
				</LayoutItem>
				<LayoutItem flexibility={['grow', 'no-shrink']}>
					<Cell>[&quot;grow&quot;, &quot;no-shrink&quot;] (array)</Cell>
				</LayoutItem>
				<LayoutItem flexibility="auto, no-shrink">
					<Cell>&quot;auto, no-shrink&quot; (string)</Cell>
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
		<>
			<Hint>
				A <code>LayoutItem</code> can contain its own <code>Layout</code>. The
				outer grid splits into two halves (<code>size=6</code> each, solid blue
				outline). The left half holds a nested grid (dashed orange outline) that
				spreads its own two cells to its edges — laid out independently of the
				outer grid.
			</Hint>
			<Layout multipleRows>
				<LayoutItem
					size={6}
					style={{ outline: '2px solid #1b96ff', outlineOffset: '-2px' }}
				>
					<div className="slds-p-around_x-small">
						<p className="slds-text-title slds-m-bottom_xx-small">
							outer left (½) — nested Layout inside
						</p>
						<div
							className="slds-p-around_x-small"
							style={{ outline: '2px dashed #ff9a3c', outlineOffset: '-2px' }}
						>
							<p className="slds-text-title slds-m-bottom_xx-small">
								inner Layout · horizontalAlign=&quot;spread&quot;
							</p>
							<Layout horizontalAlign="spread">
								<LayoutItem>
									<Cell>a</Cell>
								</LayoutItem>
								<LayoutItem>
									<Cell>b</Cell>
								</LayoutItem>
							</Layout>
						</div>
					</div>
				</LayoutItem>
				<LayoutItem
					size={6}
					style={{ outline: '2px solid #1b96ff', outlineOffset: '-2px' }}
				>
					<div className="slds-p-around_x-small">
						<p className="slds-text-title slds-m-bottom_xx-small">
							outer right (½)
						</p>
						<Cell>right</Cell>
					</div>
				</LayoutItem>
			</Layout>
		</>
	),
};

export const Toolbar: Story = {
	name: 'Example: Toolbar',
	render: () => (
		<>
			<Hint>
				A realistic composition — the common toolbar / page-header pattern. The
				title takes <code>flexibility=&quot;auto&quot;</code> so it absorbs the
				free space and pushes the action buttons to the right;{' '}
				<code>verticalAlign=&quot;center&quot;</code> keeps everything on one
				baseline.
			</Hint>
			<Layout verticalAlign="center">
				<LayoutItem flexibility="auto">
					<h2 className="slds-text-heading_small">Recent Accounts</h2>
				</LayoutItem>
				<LayoutItem padding="horizontal-small">
					<button type="button" className="slds-button slds-button_neutral">
						New
					</button>
				</LayoutItem>
				<LayoutItem>
					<button type="button" className="slds-button slds-button_brand">
						Import
					</button>
				</LayoutItem>
			</Layout>
		</>
	),
};

export const Playground: Story = {
	args: {
		horizontalAlign: 'spread',
		verticalAlign: 'center',
		multipleRows: true,
	},
	render: (args) => (
		<>
			<Hint>
				Every container prop is wired to the Controls panel below. Combine{' '}
				<code>horizontalAlign</code>, <code>verticalAlign</code>,{' '}
				<code>pullToBoundary</code>, and <code>multipleRows</code> and watch the
				three items respond.
			</Hint>
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
		</>
	),
};
