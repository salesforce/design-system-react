import React from 'react';
import Example from './example';

function CustomLogic(props) {
	return (
		<Example
			action={props.action}
			conditions={[
				{
					resource: '111',
				},
				{
					resource: '',
				},
			]}
			customLogic="1 AND 2"
			triggerType="custom"
		/>
	);
}

CustomLogic.displayName = 'ExpressionWithCustomLogicExample';

export default CustomLogic;
