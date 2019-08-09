import React from 'react';
import { storiesOf } from '@storybook/react';
import { TREE_GRID } from '../../../utilities/constants';
import Default from '../__examples__/default';

storiesOf(TREE_GRID, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default', () => <Default />);
