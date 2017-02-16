import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { BREAD_CRUMB } from '../../utilities/constants';
import Base from './base';
import OneItem from './one-item';


storiesOf(BREAD_CRUMB, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('2 Items', () => <Base />)
	.add('1 Item', () => <OneItem />);
