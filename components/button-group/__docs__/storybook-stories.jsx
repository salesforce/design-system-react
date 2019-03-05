/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { BUTTON_GROUP } from '../../../utilities/constants';
import MoreIcon from '../__examples__/more-icon';
import IconGroup from '../__examples__/icon-group';
import Checkbox from '../__examples__/checkbox';
import CheckboxError from '../__examples__/checkbox-error';
import ListGroup from '../__examples__/list-group';

storiesOf(BUTTON_GROUP, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('More Icon', () => <MoreIcon />)
	.add('Icon Group', () => <IconGroup />)
	.add('Checkbox', () => <Checkbox />)
	.add('Checkbox Error', () => <CheckboxError />)
	.add('List Group', () => <ListGroup />);
