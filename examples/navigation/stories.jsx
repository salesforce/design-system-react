import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../components/iconSettings';

import Navigation from '~/components/navigation';
import { NAVIGATION } from '../../utilities/constants';

import Default from './default';
import Shade from './shade';
import SnaphotDefault from './snapshot-default';

storiesOf(NAVIGATION, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Default', () => (<Default action={action} />))
	.add('Inverse', () => (<Shade action={action} />))
	.add('DOM Snapshot', () => (<SnaphotDefault />));
