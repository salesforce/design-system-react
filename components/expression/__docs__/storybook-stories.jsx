import React from 'react';
import { storiesOf } from '@storybook/react';

import { EXPRESSION } from '../../../utilities/constants';

import BaseExample from '../__examples__/base';

storiesOf(EXPRESSION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base Example', () => <BaseExample />);
