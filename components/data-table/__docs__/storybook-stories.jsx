import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { DATA_TABLE } from '../../../utilities/constants';

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

storiesOf(DATA_TABLE, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Basic Fluid Layout (Default)', () => <BasicFluid />)
	.add('Basic Fluid Layout - Striped', () => <BasicFluidStriped />)
	.add('Basic Fluid Layout - No Row Hover', () => <BasicFluidNoRowHover />)
	.add('Basic Fluid Layout - Column Bordered', () => (
		<BasicFluidColumnBordered />
	))
	.add('Basic Fluid Layout - Headless', () => <BasicFluidHeadless />)
	.add('Basic Fixed Layout', () => <BasicFixedLayout />)
	.add('Advanced (Fixed Layout)', () => <Advanced log={action} />)
	.add('Advanced Single Select (Fixed Layout)', () => (
		<AdvancedSingleSelect log={action} />
	))
	.add('Advanced Single Select (Fixed Header)', () => (
		<AdvancedSingleSelectFixedHeader log={action} />
	))
	.add('Advanced with Header Row', () => <AdvancedHeaderRow log={action} />)
	.add('Fixed Header', () => <FixedHeader />)
	.add('Interactive Elements', () => <InteractiveElements />)
	.add('Fixed Header Horizontal Scrolling', () => (
		<FixedHeaderHorizontalScroller />
	))
	.add('Joined with Page Header', () => <JoinedWithPageHeader />)
	.add('Custom Classes', () => <CustomClasses />)
	.add('Infinite Scrolling', () => <InfiniteScrolling />)
	.add('Resizable Columns', () => <ResizableColumns />);
