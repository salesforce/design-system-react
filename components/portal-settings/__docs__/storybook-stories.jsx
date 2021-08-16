import React from 'react';
import { storiesOf } from '@storybook/react';

import { PORTAL_SETTINGS } from '../../../utilities/constants';

import Default from '../__examples__/default';
import Override from '../__examples__/override';

storiesOf(PORTAL_SETTINGS, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default, not used', () => <Default />)
	.add('Override', () => <Override />);
