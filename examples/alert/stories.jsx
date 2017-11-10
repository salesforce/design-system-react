import React from 'react';
import { storiesOf } from '@storybook/react';

import { ALERT } from '../../utilities/constants';
import Info from './info';
import Warning from './warning';
import ErrorAlert from './error';
import Offline from './offline';
import Dismissable from './dismissable';
import CloseAlert from './close-alert';
import CustomClassNames from './custom-class-name';

/* eslint-disable react/display-name */

storiesOf(ALERT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">{getStory()}</div>
	))
	.add('Info', () => (
		<Info />
	))
	.add('Warning', () => (
		<Warning />
	))
	.add('Error', () => (
		<ErrorAlert />
	))
	.add('Offline', () => (
		<Offline />
	))
	.add('Dismissable', () => (
		<Dismissable />
	))
	.add('Close alert', () => (
		<CloseAlert />
	))
	.add('Custom Class Names', () => (
		<CustomClassNames />
	));
