import React from 'react';
import { storiesOf } from '@storybook/react';

import { TOAST } from '../../utilities/constants';
import Info from './info';
import Success from './success';
import Warning from './warning';
import ErrorAlert from './error';
import ErrorWithDetailsAlert from './error-with-details';
import CloseToast from './close-toast';
import DurationToast from './duration-toast';
import CustomClassNames from './custom-class-name';

/* eslint-disable react/display-name */

storiesOf(TOAST, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">{getStory()}</div>
	))
	.add('Info', () => (
		<Info />
	))
	.add('Success', () => (
		<Success />
	))
	.add('Warning', () => (
		<Warning />
	))
	.add('Error', () => (
		<ErrorAlert />
	))
	.add('Error With Details', () => (
		<ErrorWithDetailsAlert />
	))
	.add('Close Toast', () => (
		<CloseToast />
	))
	.add('Duration Toast', () => (
		<DurationToast />
	))
	.add('Custom Class Names', () => (
		<CustomClassNames />
	));
