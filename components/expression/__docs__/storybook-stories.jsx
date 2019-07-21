import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EXPRESSION } from '../../../utilities/constants';

import Base from '../__examples__/base';
import Initial from '../__examples__/initial';
import MultipleConditions from '../__examples__/multi-condition';
import WithGroup from '../__examples__/with-group';
import CustomLogic from '../__examples__/with-custom-Logic';
import FormulaLogic from '../__examples__/with-formula-logic';

storiesOf(EXPRESSION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Initial State', () => <Initial action={action} />)
	.add('w/ Resource Selected', () => <Base action={action} />)
	.add('w/ Multiple Conditions', () => <MultipleConditions action={action} />)
	.add('w/ Group', () => <WithGroup action={action} />)
	.add('w/ Custom Logic', () => <CustomLogic action={action} />)
	.add('w/ Formula Logic', () => <FormulaLogic action={action} />);
