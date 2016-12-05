import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { BREAD_CRUMB } from '../../utilities/constants';
import BreadCrumb from '../../components/bread-crumb';
import TwoItems from './two-items';


storiesOf(BREAD_CRUMB, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('2 Items', () => <TwoItems />)
	.add('1 Item', () => <BreadCrumb trail={[(<a href="#">Parent Entity</a>)]} />);
