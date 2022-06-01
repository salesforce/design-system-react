import React from 'react';
import { storiesOf } from '@storybook/react';
// import IconSettings from '../../icon-settings';

import { BRAND_BAND } from '../../../utilities/constants';
import Default from '../__examples__/default';
import Large from '../__examples__/large';
import NoImage from '../__examples__/no-image';
import Small from '../__examples__/small';
import BackgroundCover from '../__examples__/background-cover';
import UserImage from '../__examples__/user-image';
import GroupImage from '../__examples__/group-image';

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
	.add('Default (medium)', () => <Default />)
	.add('Small', () => <Small />)
	.add('Large', () => <Large />)
	.add('No Image', () => <NoImage />)
	.add('User Image', () => <UserImage />)
	.add('Group Image', () => <GroupImage />)
	.add('Image with background size cover', () => <BackgroundCover />);
