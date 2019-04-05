import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { DATA_TABLE } from '../../../utilities/constants';

import Advanced from '../__examples__/advanced';
import AdvancedSingleSelect from '../__examples__/advanced-single-select';
import AdvancedSingleSelectFixedHeader from '../__examples__/advanced-single-select-fixed-header';
import BasicFixedLayout from '../__examples__/basic-fixed-layout';
import BasicFluid from '../__examples__/basic-fluid';
import BasicFluidColumnBordered from '../__examples__/basic-fluid-column-bordered';
import BasicFluidNoRowHover from '../__examples__/basic-fluid-no-row-hover';
import BasicFluidStriped from '../__examples__/basic-fluid-striped';
import FixedHeader from '../__examples__/fixed-header';

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
	.add('Basic Fixed Layout', () => <BasicFixedLayout />)
	.add('Advanced (Fixed Layout)', () => <Advanced log={action} />)
	.add('Advanced Single Select (Fixed Layout)', () => (
		<AdvancedSingleSelect log={action} />
	))
	.add('Advanced Single Select (Fixed Header)', () => (
		<AdvancedSingleSelectFixedHeader log={action} />
	))
	.add('Fixed Header', () => <FixedHeader />);
