/*
 * This file exists to place a buffer between
 * the Express server loading and image snapshots
 * running.
 */

import React from 'react';
import { storiesOf, action } from '@storybook/react';

storiesOf('Inital Blank Story', module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">{getStory()}</div>
	))
	.add('Placeholder', () => null);
