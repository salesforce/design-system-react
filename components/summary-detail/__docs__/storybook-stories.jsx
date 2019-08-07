import React from 'react';
import { storiesOf } from '@storybook/react';
import { SUMMARY_DETAIL } from '../../../utilities/constants';
import Base from '../__examples__/base';
import WithComplexTitle from '../__examples__/with-complex-title';

storiesOf(SUMMARY_DETAIL, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <Base />)
	.add('w/ Complex Title', () => <WithComplexTitle />);
