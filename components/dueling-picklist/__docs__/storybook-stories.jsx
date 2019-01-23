import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import DuelingPicklist from '../../dueling-picklist';
import { DUELING_PICKLIST } from '../../../utilities/constants';

import Default from '../__examples__/default';
import IsReorderable from '../__examples__/is-reorderable';
import AutoHeightMinimization from '../__examples__/automatic-height-minimization';
import Disabled from '../__examples__/disabled';
import ViewOnly from '../__examples__/view-only';
import Required from '../__examples__/required';
import Responsive from '../__examples__/responsive';
import ManualHeight from '../__examples__/manual-height';
import Locked from '../__examples__/locked-options';
import Tooltip from '../__examples__/tooltip';

storiesOf(DUELING_PICKLIST, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <Default action={action} />)
	.add('Reorderable', () => <IsReorderable action={action} />)
	.add('Auto Height Minimization', () => (
		<AutoHeightMinimization action={action} />
	))
	.add('Disabled', () => <Disabled action={action} />)
	.add('ViewOnly', () => <ViewOnly action={action} />)
	.add('Required', () => <Required action={action} />)
	.add('Responsive', () => <Responsive action={action} />)
	.add('ManualHeight', () => <ManualHeight action={action} />)
	.add('Locked', () => <Locked action={action} />)
	.add('Tooltip', () => <Tooltip action={action} />);
