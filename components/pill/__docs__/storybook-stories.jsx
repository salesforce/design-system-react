import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PILL } from '~/utilities/constants';
import IconSettings from '~/components/icon-settings';
import BaseExample from '../__examples__/base';
import IconExample from '../__examples__/icon';

storiesOf(PILL, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Linked, Unlinked, Truncated', () => <BaseExample action={action} />)
	.add('Icon, Avatar, Error', () => <IconExample action={action} />);
