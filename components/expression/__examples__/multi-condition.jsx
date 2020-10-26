import React from 'react';
import Example from './example';

function MultipleConditions(props) {
	return (
		<Example
			action={props.action}
			conditions={[
				{
					resource: '111',
				},
				{
					resource: '112',
				},
			]}
			triggerType="any"
		/>
	);
}

MultipleConditions.displayName = 'ExpressionMultipleConditionsExample';

export default MultipleConditions;
