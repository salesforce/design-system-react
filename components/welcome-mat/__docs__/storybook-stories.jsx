import React from 'react';
import { storiesOf } from '@storybook/react';
import { WELCOME_MAT } from '../../../utilities/constants';
import Default from '../__examples__/default';
import Splash from '../__examples__/splash';
import InfoOnly from '../__examples__/info-only';

storiesOf(WELCOME_MAT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default', () => <Default />)
	.add('Info Only', () => <InfoOnly />)
	.add('Splash', () => <Splash />);
