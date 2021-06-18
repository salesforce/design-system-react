import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PILL_CONTAINER } from '../../../utilities/constants';
import IconSettings from '../../icon-settings';
import BaseExample from '../__examples__/base';
import IconsExample from '../__examples__/icons';
import AvatarsExample from '../__examples__/avatars';
import BareExample from '../__examples__/bare';

storiesOf(PILL_CONTAINER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base Pill Container', () => <BaseExample action={action} />)
	.add('Pill Container With Icons', () => <IconsExample action={action} />)
	.add('Pill Container With Avatars', () => <AvatarsExample action={action} />)
	.add('Bare Pill Container', () => <BareExample action={action} />);
