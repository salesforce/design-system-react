import React from 'react';
import { storiesOf } from '@storybook/react';
import { SCOPED_NOTIFICATION } from '../../../utilities/constants';
import Base from '../__examples__/base';
import CustomIcon from '../__examples__/custom-icon';
import Light from '../__examples__/light';
import Dark from '../__examples__/dark';

storiesOf(SCOPED_NOTIFICATION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <Base />)
	.add('Light', () => <Light />)
	.add('Dark', () => <Dark />)
	.add('Custom Icon', () => <CustomIcon />);
