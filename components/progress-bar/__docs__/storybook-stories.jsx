import React from 'react';
import { storiesOf } from '@storybook/react';
import { PROGRESS_BAR } from '../../../utilities/constants';
import Default from '../__examples__/default';
import Thickness from '../__examples__/thickness';
import Color from '../__examples__/color';
import Radius from '../__examples__/radius';
import Descriptive from '../__examples__/descriptive';
import Vertical from '../__examples__/vertical';

storiesOf(PROGRESS_BAR, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default', () => <Default />)
	.add('Descriptive', () => <Descriptive />)
	.add('Color', () => <Color />)
	.add('Radius', () => <Radius />)
	.add('Thickness', () => <Thickness />)
	.add('Vertical', () => <Vertical />);
