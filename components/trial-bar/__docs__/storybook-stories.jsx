import React from 'react';
import { storiesOf } from '@storybook/react';
import { TRIAL_BAR } from '../../../utilities/constants';
import Default from '../__examples__/default';

storiesOf(TRIAL_BAR, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default', () => <Default />);
