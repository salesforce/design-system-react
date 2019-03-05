import React from 'react';
import { storiesOf } from '@storybook/react';
import { SELECT } from '../../../utilities/constants';
import IconSettings from '../../icon-settings';

import Base from '../__examples__/base';
import Required from '../__examples__/required';
import Error from '../__examples__/error';
import Disabled from '../__examples__/disabled';
import MultipleSelectionNarrow from '../__examples__/multipleSelectionNarrow';

storiesOf(SELECT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => <Base />)
	.add('Required', () => <Required />)
	.add('Error', () => <Error />)
	.add('Disabled', () => <Disabled />)
	.add('MultipleSelectionNarrow', () => <MultipleSelectionNarrow />);
