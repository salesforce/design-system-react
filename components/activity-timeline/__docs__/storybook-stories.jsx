import React from 'react';
import { storiesOf } from '@storybook/react';
import { ACTIVITY_TIMELINE } from '../../../utilities/constants';
import Base from '../__examples__/base';

storiesOf(ACTIVITY_TIMELINE, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <Base />);
