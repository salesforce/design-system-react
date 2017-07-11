import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Datepicker from '~/components/date-picker';
import { COMBOBOX } from '../../utilities/constants';

import Default from './default';

storiesOf(COMBOBOX, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Default', () => (<Default action={action} />));
