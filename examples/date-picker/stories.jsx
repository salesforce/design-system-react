import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { DATE_PICKER } from '../../utilities/constants';

import Default from './default';
import CustomInput from './custom-input';

storiesOf(DATE_PICKER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Default', () => (<Default log={action} />))
	.add('Custom Input', () => (<CustomInput log={action} />));
