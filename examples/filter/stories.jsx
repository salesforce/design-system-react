import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { FILTER } from '../../utilities/constants';
import Default from './default';
import NewFilter from './new';
import LockedFilter from './locked';
import PermanantFilter from './permanant';
import ErrorFilter from './error';
import AssistiveTextFilter from './assistive-text';

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

const CustomAlignment = ({ children, align }) => (<div className="slds-grid slds-m-around--xx-large">
	<div
		className={`slds-col--bump-${align}`}
		style={{ width: '420px' }}
	>
		{children}
	</div>
</div>);

CustomAlignment.defaultProps = { align: 'left' };

storiesOf(FILTER, module)
	.add('Filter', () => (
		<CustomAlignment>
			<Default />
		</CustomAlignment>))
	.add('New Filter', () => (
		<CustomAlignment>
			<NewFilter />
		</CustomAlignment>))
	.add('Locked Filter', () => (
		<CustomAlignment>
			<LockedFilter />
		</CustomAlignment>))
	.add('Permanant Filter', () => (
		<CustomAlignment>
			<PermanantFilter />
		</CustomAlignment>))
	.add('Filter Align Right', () => (
		<CustomAlignment align="right">
			<Default align="right" />
		</CustomAlignment>))
	.add('AssistiveTextFilter', () => (
		<CustomAlignment>
			<AssistiveTextFilter />
		</CustomAlignment>));
