/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { BUTTON_GROUP } from '../../utilities/constants';
import MoreIcon from './more-icon';
import IconGroup from './icon-group';

storiesOf(BUTTON_GROUP, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('More Icon', () => <MoreIcon />)
	.add('Icon Group', () => <IconGroup />);
