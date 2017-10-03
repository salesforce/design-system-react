import React from 'react';
import { storiesOf } from '@storybook/react';

import { AVATAR } from '../../utilities/constants';
import Base from './base';
import UserIcon from './user-icon.jsx';
import UserInitials from './user-initials.jsx';
import EntityIcon from './entity-icon.jsx';
import EntityInitials from './entity-initials.jsx';

/* eslint-disable react/display-name */

storiesOf(AVATAR, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Base Avatar</h1>
			<Base />
		</div>
	))
	.add('Entity Icon', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Entity Icon Avatar</h1>
			<EntityIcon />
		</div>
	))
	.add('Entity Initials', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Entity Initials Avatar</h1>
			<EntityInitials />
		</div>
	))
	.add('User Icon', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>User Icon Avatar</h1>
			<UserIcon />
		</div>
	))
	.add('User Initials', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>User Initials Avatar</h1>
			<UserInitials />
		</div>
	));
