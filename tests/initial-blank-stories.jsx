/*
 * This file exists to place a buffer between
 * the Express server loading and image snapshots
 * running.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Inital Blank Story', module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Placeholder', () => null);
