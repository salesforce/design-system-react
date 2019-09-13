import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TREE_GRID } from '../../../utilities/constants';
import Default from '../__examples__/default';
import Headless from '../__examples__/headless';

storiesOf(TREE_GRID, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default', () => <Default action={action} />)
	.add('Single Select', () => <Default action={action} selectRows="single" />)
	.add('w/o Border', () => <Default action={action} isBorderless />)
	.add('Single Select w/o Border', () => (
		<Default action={action} selectRows="single" isBorderless />
	))
	.add('Headless Single Select w/ Border', () => (
		<Headless action={action} selectRows="single" />
	))
	.add('Headless w/ Border', () => <Headless action={action} />)
	.add('Headless Single Select w/o Border', () => (
		<Headless action={action} selectRows="single" isBorderless />
	))
	.add('Headless w/o Border', () => <Headless action={action} isBorderless />);
