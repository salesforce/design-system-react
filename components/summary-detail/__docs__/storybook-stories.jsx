import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SUMMARY_DETAIL } from '../../../utilities/constants';
import Base from '../__examples__/base';
import WithComplexTitle from '../__examples__/with-complex-title';

storiesOf(SUMMARY_DETAIL, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <Base action={action} />)
	.add('w/ Complex Title', () => <WithComplexTitle action={action} />);
