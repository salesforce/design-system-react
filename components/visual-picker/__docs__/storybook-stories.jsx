import React from 'react';
import { storiesOf } from '@storybook/react';
import { VISUAL_PICKER } from '../../../utilities/constants';
import NonCoverable from '../__examples__/non-coverable';
import Coverable from '../__examples__/coverable';
import Links from '../__examples__/links';
import Vertical from '../__examples__/vertical';
import VerticalCoverable from '../__examples__/vertical-coverable';

storiesOf(VISUAL_PICKER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Coverable', () => <Coverable />)
	.add('Non-Coverable', () => <NonCoverable />)
	.add('Links', () => <Links />)
	.add('Vertical', () => <Vertical />)
	.add('Vertical Coverable', () => <VerticalCoverable />);
