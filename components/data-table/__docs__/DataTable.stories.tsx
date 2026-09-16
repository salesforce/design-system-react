import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import IconSettings from '../../icon-settings';
import DataTable from '../index';

import Advanced from '../__examples__/advanced';
import AdvancedHeaderRow from '../__examples__/advanced-header-row';
import AdvancedSingleSelect from '../__examples__/advanced-single-select';
import AdvancedSingleSelectFixedHeader from '../__examples__/advanced-single-select-fixed-header';
import BasicFixedLayout from '../__examples__/basic-fixed-layout';
import BasicFluid from '../__examples__/basic-fluid';
import BasicFluidColumnBordered from '../__examples__/basic-fluid-column-bordered';
import BasicFluidNoRowHover from '../__examples__/basic-fluid-no-row-hover';
import BasicFluidStriped from '../__examples__/basic-fluid-striped';
import BasicFluidHeadless from '../__examples__/basic-fluid-headless';
import FixedHeader from '../__examples__/fixed-header';
import InteractiveElements from '../__examples__/interactive-elements';
import FixedHeaderHorizontalScroller from '../__examples__/fixed-header-horizontal-scrolling';
import JoinedWithPageHeader from '../__examples__/joined-with-page-header';
import CustomClasses from '../__examples__/custom-classes';
import InfiniteScrolling from '../__examples__/infinite-scrolling';
import ResizableColumns from '../__examples__/resizable-columns';

const meta: Meta<typeof DataTable> = {
	title: 'Components/DataTable',
	component: DataTable,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const BasicFluidLayoutDefault: Story = {
	name: 'Basic Fluid Layout (Default)',
	render: () => <BasicFluid />,
};

export const BasicFluidLayoutStriped: Story = {
	name: 'Basic Fluid Layout - Striped',
	render: () => <BasicFluidStriped />,
};

export const BasicFluidLayoutNoRowHover: Story = {
	name: 'Basic Fluid Layout - No Row Hover',
	render: () => <BasicFluidNoRowHover />,
};

export const BasicFluidLayoutColumnBordered: Story = {
	name: 'Basic Fluid Layout - Column Bordered',
	render: () => <BasicFluidColumnBordered />,
};

export const BasicFluidLayoutHeadless: Story = {
	name: 'Basic Fluid Layout - Headless',
	render: () => <BasicFluidHeadless />,
};

export const BasicFixedLayoutStory: Story = {
	name: 'Basic Fixed Layout',
	render: () => <BasicFixedLayout />,
};

export const AdvancedFixedLayout: Story = {
	name: 'Advanced (Fixed Layout)',
	render: () => <Advanced log={action} />,
};

export const AdvancedSingleSelectFixedLayout: Story = {
	name: 'Advanced Single Select (Fixed Layout)',
	render: () => <AdvancedSingleSelect log={action} />,
};

export const AdvancedSingleSelectFixedHeaderStory: Story = {
	name: 'Advanced Single Select (Fixed Header)',
	render: () => <AdvancedSingleSelectFixedHeader log={action} />,
};

export const AdvancedWithHeaderRow: Story = {
	name: 'Advanced with Header Row',
	render: () => <AdvancedHeaderRow log={action} />,
};

export const FixedHeaderStory: Story = {
	name: 'Fixed Header',
	render: () => <FixedHeader />,
};

export const InteractiveElementsStory: Story = {
	name: 'Interactive Elements',
	render: () => <InteractiveElements />,
};

export const FixedHeaderHorizontalScrolling: Story = {
	render: () => <FixedHeaderHorizontalScroller />,
};

export const JoinedWithPageHeaderStory: Story = {
	name: 'Joined with Page Header',
	render: () => <JoinedWithPageHeader />,
};

export const CustomClassesStory: Story = {
	name: 'Custom Classes',
	render: () => <CustomClasses />,
};

export const InfiniteScrollingStory: Story = {
	name: 'Infinite Scrolling',
	render: () => <InfiniteScrolling />,
};

export const ResizableColumnsStory: Story = {
	name: 'Resizable Columns',
	render: () => <ResizableColumns />,
};
