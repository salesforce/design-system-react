import React from 'react';
import { storiesOf } from '@storybook/react';

import { BREADCRUMB } from '../../utilities/constants';
import Base from './base';
import OneItem from './one-item';


storiesOf(BREADCRUMB, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('2 Items', () => <Base />)
	.add('1 Item', () => <OneItem />);
