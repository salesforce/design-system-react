import React from 'react';
import { storiesOf } from '@storybook/react';
import { PROGRESS_RING } from '../../../utilities/constants';
import Base from '../__examples__/base';
import Complete from '../__examples__/complete';
import Warning from '../__examples__/warning';
import Expired from '../__examples__/expired';
import CustomIcon from '../__examples__/customIcon';

storiesOf(PROGRESS_RING, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">{getStory()}</div>
	))
	.add('Base', () => <Base />)
	.add('Theme: Complete', () => <Complete />)
	.add('Theme: Warning', () => <Warning />)
	.add('Theme: Expired', () => <Expired />)
	.add('Custom Icon', () => <CustomIcon />);
