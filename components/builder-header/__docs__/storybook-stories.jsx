import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import IconSettings from '../../icon-settings';
import BuilderHeader from '../../builder-header';

import { BUILDER_HEADER } from '../../../utilities/constants';

storiesOf(BUILDER_HEADER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => (
		<BuilderHeader />
	));
