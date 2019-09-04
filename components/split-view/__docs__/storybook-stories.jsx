import React from 'react';
import { storiesOf } from '@storybook/react';

import { SPLIT_VIEW } from '../../../utilities/constants';
import Base from '../__examples__/base';
import BaseMultiple from '../__examples__/base-multiple';
import ExternalState from '../__examples__/external-state';
import CustomItemList from '../__examples__/custom-items-list';

storiesOf(SPLIT_VIEW, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base: Open', () => <Base />)
	.add('Base: Closed', () => <Base isOpen={false} />)
	.add('Base: Multiple', () => <BaseMultiple />)
	.add('External State', () => <ExternalState />)
	.add('Custom List', () => <CustomItemList />);
