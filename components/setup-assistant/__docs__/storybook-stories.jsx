import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Base from '../__examples__/base';
import Card from '../__examples__/card';
import HubWithExpandableSteps from '../__examples__/hub-expandable-steps';
import StepProgress from '../__examples__/step-progress';
import WithIcons from '../__examples__/with-icons';

import { SETUP_ASSISTANT } from '../../../utilities/constants';

storiesOf(SETUP_ASSISTANT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base Variant', () => <Base action={action} />)
	.add('With Step Progress', () => <StepProgress action={action} />)
	.add('Hub with Expandable Steps', () => (
		<HubWithExpandableSteps action={action} />
	))
	.add('In a Card', () => <Card action={action} />)
	.add('With Icons', () => <WithIcons action={action} />);
