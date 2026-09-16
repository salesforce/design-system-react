import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import Tree from '../index';
import sampleNodesDynamicHashMap from './dynamic-hashmap.tsx';
import DefaultExample from '../__examples__/default';

const meta: Meta<typeof Tree> = {
	title: 'Components/Tree',
	component: Tree,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<Story />
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					'A tree is a visualization of a structure hierarchy. A branch can be expanded or collapsed. This is a controlled component.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Tree>;

export const Base: Story = {
	render: () => (
		<DefaultExample nodes={sampleNodesDynamicHashMap.base} action={action} />
	),
};

export const BaseWithStencil: Story = {
	name: 'Base with stencil',
	render: () => <DefaultExample action={action} loadingStencil />,
};

export const InitialExpandedSelected: Story = {
	name: 'Initial Expanded/Selected',
	render: () => (
		<DefaultExample
			action={action}
			nodes={sampleNodesDynamicHashMap.initialExpandedSelected}
		/>
	),
};

export const NoBranchSelect: Story = {
	render: () => <DefaultExample action={action} noBranchSelection />,
};

export const MultipleSelection: Story = {
	render: () => <DefaultExample action={action} multipleSelection />,
};

export const AssistiveHeading: Story = {
	render: () => (
		<DefaultExample
			action={action}
			noHeading
			assistiveText={{ label: 'Miscellaneous Foods' }}
		/>
	),
};

export const OverflowHidden: Story = {
	render: () => (
		<DefaultExample
			action={action}
			listStyle={{
				height: '300px',
				overflowY: 'auto',
			}}
			nodes={sampleNodesDynamicHashMap.large}
		/>
	),
};

export const LargeDataset: Story = {
	name: 'Large dataset (300+)',
	render: () => (
		<DefaultExample action={action} nodes={sampleNodesDynamicHashMap.large} />
	),
};

export const HighlightedSearch: Story = {
	render: () => <DefaultExample action={action} searchable />,
};

