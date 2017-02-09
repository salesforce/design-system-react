import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Navigation from '~/components/navigation';
import { NAVIGATION } from '../../utilities/constants';

import Default from './default';
import Shade from './shade';
import SnaphotDefault from './snapshot-default';

storiesOf(NAVIGATION, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Default', () => (<Default action={action} />))
	.add('Inverse', () => (<Shade action={action} />))
	.add('DOM Snapshot', () => (<SnaphotDefault />));
