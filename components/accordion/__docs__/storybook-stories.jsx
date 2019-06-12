import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ACCORDION } from '../../../utilities/constants';

import Base from '../__examples__/base';
import BaseOpen from '../__examples__/base-open';

storiesOf(ACCORDION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <Base action={action} />)
	.add('Base Open', () => <BaseOpen action={action} />);
