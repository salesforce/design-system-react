import React from 'react';
import { storiesOf } from '@storybook/react';
import { SETUP_ASSISTANT } from '../../../utilities/constants';
import Base from '../__examples__/base';
import StepProgress from '../__examples__/step-progress';
import Card from '../__examples__/card';

storiesOf(SETUP_ASSISTANT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base Variant', () => <Base />)
	.add('w/ Step Progress', () => <StepProgress />)
	.add('In a Card', () => <Card />);
