import React from 'react';
import { storiesOf } from '@storybook/react';

import { TOAST } from '../../../utilities/constants';
import Info from '../__examples__/info';
import Success from '../__examples__/success';
import Warning from '../__examples__/warning';
import ErrorAlert from '../__examples__/error';
import ErrorWithDetailsAlert from '../__examples__/error-with-details';
import CloseToast from '../__examples__/close-toast';
import DurationToast from '../__examples__/duration-toast';
import CustomClassNames from '../__examples__/custom-class-name';
import CustomStyle from '../__examples__/custom-style';

/* eslint-disable react/display-name */

storiesOf(TOAST, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Info', () => <Info />)
	.add('Success', () => <Success />)
	.add('Warning', () => <Warning />)
	.add('Error', () => <ErrorAlert />)
	.add('Error With Details', () => <ErrorWithDetailsAlert />)
	.add('Close Toast', () => <CloseToast />)
	.add('Duration Toast', () => <DurationToast />)
	.add('Custom Class Names', () => <CustomClassNames />)
	.add('Custom Style', () => <CustomStyle />);
