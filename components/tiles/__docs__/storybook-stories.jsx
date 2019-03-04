import React from 'react';
import { storiesOf } from '@storybook/react';
import { TILES } from '../../../utilities/constants';
import IconSettings from '../../icon-settings';

import Default from '../__examples__/default';
import DefaultWithActions from '../__examples__/defaultWithActions';
import Icon from '../__examples__/icon';
import Avatar from '../__examples__/avatar';
import Task from '../__examples__/task';
import Article from '../__examples__/article';
import Board from '../__examples__/board';

storiesOf(TILES, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => <Default />)
	.add('DefaultWithActions', () => <DefaultWithActions />)
	.add('Icon', () => <Icon />)
	.add('Avatar', () => <Avatar />)
	.add('Task', () => <Task />)
	.add('Article', () => <Article />)
	.add('Board', () => <Board />);
