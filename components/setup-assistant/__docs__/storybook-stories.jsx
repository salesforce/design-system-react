import React from 'react';
import { storiesOf } from '@storybook/react';

import Base from '../__examples__/base';
import Card from '../__examples__/card';
import HubWithExpandableSteps from '../__examples__/hub-expandable-steps';
import StepProgress from '../__examples__/step-progress';

import { SETUP_ASSISTANT } from '../../../utilities/constants';

storiesOf(SETUP_ASSISTANT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base Variant', () => <Base />)
	.add('With Step Progress', () => <StepProgress />)
	.add('Hub with Expandable Steps', () => <HubWithExpandableSteps />)
	.add('In a Card', () => <Card />);
