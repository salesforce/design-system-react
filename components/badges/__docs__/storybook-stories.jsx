import React from 'react';
import { storiesOf } from '@storybook/react';
// import IconSettings from '../../icon-settings';

import { BRAND_BAND } from '../../../utilities/constants';
import Default from '../__examples__/default';

storiesOf(BRAND_BAND, module)
	.addDecorator((getStory) => (
		<div
			style={{
				bottom: '1rem',
				left: '1rem',
				overflow: 'auto',
				position: 'absolute',
				right: '1rem',
				top: '1rem',
			}}
		>
			{getStory()}
		</div>
	))
	.add('Default', () => <Default />);
