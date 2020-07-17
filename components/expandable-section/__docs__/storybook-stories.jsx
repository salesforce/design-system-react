import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EXPANDABLE_SECTION } from '../../../utilities/constants';

import ControlledExample from '../__examples__/controlled';
import DefaultExample from '../__examples__/default';
import NonCollapsibleExample from '../__examples__/non-collapsible';

storiesOf(EXPANDABLE_SECTION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default', () => <DefaultExample />)
	.add('Controlled', () => <ControlledExample action={action} />)
	.add('Non-collapsible', () => <NonCollapsibleExample />);
