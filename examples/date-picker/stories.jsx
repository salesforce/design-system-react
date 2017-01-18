import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Datepicker from '~/components/date-picker';
import { DATE_PICKER } from '../../utilities/constants';

import Default from './default';
import IsoWeekdays from './iso-weekday';
import CustomInput from './custom-input';
import SnaphotDefault from './snapshot-default';

storiesOf(DATE_PICKER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Default', () => (<Default log={action} />))
	.add('ISO weekdays', () => (<IsoWeekdays log={action} />))
	.add('Custom Input', () => (<CustomInput log={action} />))
	.add('Inline menu', () => (<Datepicker isInline />))
	.add('DOM Snapshot', () => (<SnaphotDefault />));
