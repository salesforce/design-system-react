import React from 'react';
import { storiesOf } from '@storybook/react';

import Base from '../__examples__/base';
import Darker from '../__examples__/darker.jsx';
import Lightest from '../__examples__/lightest.jsx';
import LeftIcon from '../__examples__/left-icon.jsx';
import InverseRightIcon from '../__examples__/inverse-right-icon.jsx';
import Nested from '../__examples__/nested.jsx';

import { BADGE } from '../../../utilities/constants';

/* eslint-disable react/display-name */

storiesOf(BADGE, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Base Badge</h1>
			<Base />
		</div>
	))
	.add('Darker', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Darker Badger</h1>
			<Darker />
		</div>
	))
	.add('Lightest', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Lightest Badge</h1>
			<Lightest />
		</div>
	))
	.add('Left Icon', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Icon on the left</h1>
			<LeftIcon />
		</div>
	))
	.add('Inverse Right Icon', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>
				Inverse badge with the icon on the left
			</h1>
			<InverseRightIcon />
		</div>
	))
	.add('Nested Elements', () => (
		<div>
			<h1 style={{ marginBottom: '10px' }}>Badge with Nested Elements</h1>
			<Nested />
		</div>
	));
