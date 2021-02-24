import React from 'react';
import { storiesOf } from '@storybook/react';
import { WELCOME_MAT } from '../../../utilities/constants';
import Default from '../__examples__/default';
import StepsComplete from '../__examples__/steps-complete';
import Splash from '../__examples__/splash';
import InfoOnly from '../__examples__/info-only';
import TrailHead from '../__examples__/trailhead';
import TrailHeadComplete from '../__examples__/trailhead-complete';

storiesOf(WELCOME_MAT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default', () => <Default isOpen />)
	.add('Steps Complete', () => <StepsComplete isOpen />)
	.add('Info Only', () => <InfoOnly isOpen />)
	.add('Splash', () => <Splash isOpen />)
	.add('Trailhead', () => <TrailHead isOpen />)
	.add('Trailhead Complete', () => <TrailHeadComplete isOpen />);
