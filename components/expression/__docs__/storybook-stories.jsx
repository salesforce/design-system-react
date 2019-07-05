import React from 'react';
import { storiesOf } from '@storybook/react';

import { EXPRESSION } from '../../../utilities/constants';

import BaseExample from '../__examples__/base';
import MultipleCondition from '../__examples__/multiple-conditions';
import ExpressionGroup from '../__examples__/with-group';
import CustomLogic from '../__examples__/custom-logic';


storiesOf(EXPRESSION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base Example', () => <BaseExample />)
	.add('w/ Musltiple Conditions', () => <MultipleCondition />)
	.add('w/ Expression Group', () => <ExpressionGroup />)
	.add('w/ Custom Logic', () => <CustomLogic />);



