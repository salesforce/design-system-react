import React from 'react';
import { storiesOf, action } from '@storybook/react';

import { ACCORDION } from '../../../utilities/constants';

import Base from '../__examples__/base';

storiesOf(ACCORDION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">{getStory()}</div>
	))
	.add('Base', () => <Base action={action} />);
