import React from 'react';
import { storiesOf } from '@storybook/react';

import { ALERT } from '../../../utilities/constants';
import Info from '../__examples__/info';
import Warning from '../__examples__/warning';
import ErrorAlert from '../__examples__/error';
import Offline from '../__examples__/offline';
import Dismissable from '../__examples__/dismissable';
import CloseAlert from '../__examples__/close-alert';
import CustomClassNames from '../__examples__/custom-class-name';
import CustomStyles from '../__examples__/custom-style';

/* eslint-disable react/display-name */

storiesOf(ALERT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium slds-p-top_xx-large">{getStory()}</div>
	))
	.add('Info', () => <Info />)
	.add('Warning', () => <Warning />)
	.add('Error', () => <ErrorAlert />)
	.add('Offline', () => <Offline />)
	.add('Dismissable', () => <Dismissable />)
	.add('Close alert', () => <CloseAlert />)
	.add('Custom Class Names', () => <CustomClassNames />)
	.add('Custom Styles', () => <CustomStyles />);
