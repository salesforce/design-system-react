import React from 'react';
import { storiesOf } from '@storybook/react';
import { DYNAMIC_ICON } from '../../../utilities/constants';

import Ellie from '../__examples__/ellie';
import Eq from '../__examples__/eq';
import Score from '../__examples__/score';
import Strength from '../__examples__/strength';
import Trend from '../__examples__/trend';
import Typing from '../__examples__/typing';
import Waffle from '../__examples__/waffle';

storiesOf(DYNAMIC_ICON, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Ellie', () => <Ellie />)
	.add('Eq', () => <Eq />)
	.add('Score', () => <Score />)
	.add('Strength', () => <Strength />)
	.add('Trend', () => <Trend />)
	.add('Typing', () => <Typing />)
	.add('Waffle', () => <Waffle />);
