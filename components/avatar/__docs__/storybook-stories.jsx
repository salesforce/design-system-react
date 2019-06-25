import React from 'react';
import { storiesOf } from '@storybook/react';

import { AVATAR } from '../../../utilities/constants';
import Base from '../__examples__/base';
import InverseUserInitials from '../__examples__/inverse-user-initials.jsx';
import UserIcon from '../__examples__/user-icon.jsx';
import UserInitials from '../__examples__/user-initials.jsx';
import EntityIcon from '../__examples__/entity-icon.jsx';
import EntityInitials from '../__examples__/entity-initials.jsx';

/* eslint-disable react/display-name */

storiesOf(AVATAR, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
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
	))
	.add('Inverse User Initials', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Inversed User Initials Avatar</h1>
			<InverseUserInitials />
		</div>
	));
