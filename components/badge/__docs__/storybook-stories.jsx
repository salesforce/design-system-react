import React from 'react';
import { storiesOf } from '@storybook/react';

import { BADGE } from '../../../utilities/constants';
import Default from '../__examples__/default';
import WithIcon from '../__examples__/with-icon';
import ColorVariants from '../__examples__/color-variants';

storiesOf(BADGE, module)
	.addDecorator((getStory) => (
		<div
			style={{
				padding: '1rem',
			}}
		>
			{getStory()}
		</div>
	))
	.add('Default', () => <Default />)
	.add('w/ Icons', () => <WithIcon />)
	.add('Color Variants', () => <ColorVariants />);
