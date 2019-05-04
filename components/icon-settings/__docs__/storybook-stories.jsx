import React from 'react';
import { storiesOf } from '@storybook/react';

import { ICON_SETTINGS } from '../../../utilities/constants';

import Sprite from '../__examples__/sprite';
import IconPath from '../__examples__/icon-path';
import OnRequestIconPath from '../__examples__/on-request-icon-path';

storiesOf(ICON_SETTINGS, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base: Icon path', () => <IconPath />)
	.add('Base: Sprite imports NoTest', () => <Sprite />)
	.add('Base: OnRequestIconPath NoTest', () => <OnRequestIconPath />);
