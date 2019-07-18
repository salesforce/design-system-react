import React from 'react';
import { storiesOf } from '@storybook/react';
import { TREE_GRID } from '../../../utilities/constants';
import Default from '../__examples__/default';
import Nested from '../__examples__/nested';
import PreSelected from '../__examples__/pre-selected';
import SingleSelect from '../__examples__/single-select';


storiesOf(TREE_GRID, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default', () => <Default />)
	.add('w/ Nesting', () => <Nested />)
	.add('w/ Pre-Selection', () => <PreSelected />)
	.add('w/ Single Select', () => <SingleSelect />);

