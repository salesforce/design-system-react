import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { DATA_TABLE } from '../../../utilities/constants';

import Advanced from '../__examples__/advanced';
import Basic from '../__examples__/basic';

storiesOf(DATA_TABLE, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Basic (Fluid Layout)', () => <Basic />)
	.add('Advanced (Fixed Layout)', () => <Advanced log={action} />);
