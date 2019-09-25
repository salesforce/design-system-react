import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { FILTER } from '../../../utilities/constants';
import Default from '../__examples__/default';
import NewFilter from '../__examples__/new';
import LockedFilter from '../__examples__/locked';
import PermanantFilter from '../__examples__/permanant';
import ErrorFilter from '../__examples__/error';
import AssistiveTextFilter from '../__examples__/assistive-text';

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

const CustomAlignment = ({ children, align }) => (
	<div className="slds-grid slds-m-around_xx-large">
		<div className={`slds-col_bump-${align}`} style={{ width: '420px' }}>
			{children}
		</div>
	</div>
);

CustomAlignment.defaultProps = { align: 'left' };

storiesOf(FILTER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Filter', () => (
		<CustomAlignment>
			<Default />
		</CustomAlignment>
	))
	.add('New Filter', () => (
		<CustomAlignment>
			<NewFilter />
		</CustomAlignment>
	))
	.add('Locked Filter', () => (
		<CustomAlignment>
			<LockedFilter />
		</CustomAlignment>
	))
	.add('Permanant Filter', () => (
		<CustomAlignment>
			<PermanantFilter />
		</CustomAlignment>
	))
	.add('Filter Align Right', () => (
		<CustomAlignment align="right">
			<Default align="right" />
		</CustomAlignment>
	))
	.add('AssistiveTextFilter', () => (
		<CustomAlignment>
			<AssistiveTextFilter />
		</CustomAlignment>
	))
	.add('ErrorFilter', () => (
		<CustomAlignment>
			<ErrorFilter />
		</CustomAlignment>
	));
