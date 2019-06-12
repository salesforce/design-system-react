import React from 'react';
import { storiesOf } from '@storybook/react';
import { SLIDER } from '../../../utilities/constants';
import Base from '../__examples__/base';
import Disabled from '../__examples__/disabled';
import Error from '../__examples__/error';
import Vertical from '../__examples__/vertical';
import SizesExtraSmall from '../__examples__/sizes-x-small';
import SizesSmall from '../__examples__/sizes-small';
import SizesMedium from '../__examples__/sizes-medium';
import SizesLarge from '../__examples__/sizes-large';
import Sizes from '../__examples__/sizes';

storiesOf(SLIDER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Slider', () => <Base />)
	.add('Disabled', () => <Disabled />)
	.add('Error', () => <Error />)
	.add('Vertical', () => <Vertical />)
	.add('Size: X-Small', () => <SizesExtraSmall />)
	.add('Size: Small', () => <SizesSmall />)
	.add('Size: Medium', () => <SizesMedium />)
	.add('Size: Large', () => <SizesLarge />)
	.add('Docs site Sizes', () => <Sizes />);
