import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { ACCORDION } from '../../utilities/constants';

import Base from './base';

storiesOf(ACCORDION, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => <Base />);
