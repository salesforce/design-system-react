import React from 'react';
import { storiesOf } from '@storybook/react';

import Active from '../__examples__/active';
import Base from '../__examples__/base';
import Complete from '../__examples__/complete';
import Warning from '../__examples__/warning';
import Expired from '../__examples__/expired';
import CustomIcon from '../__examples__/customIcon';
import Examples from '../__examples__/examples';

import { PROGRESS_RING } from '../../../utilities/constants';

storiesOf(PROGRESS_RING, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <Base />)
	.add('Theme: Active', () => <Active />)
	.add('Theme: Complete', () => <Complete />)
	.add('Theme: Warning', () => <Warning />)
	.add('Theme: Expired', () => <Expired />)
	.add('Custom Icon', () => <CustomIcon />)
	.add('Snapshot Test Examples', () => <Examples />);
