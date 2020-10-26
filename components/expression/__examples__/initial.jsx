import React from 'react';
import Example from './example';

function Initial(props) {
	return (
		<Example
			action={props.action}
			conditions={[
				{
					resource: '',
				},
			]}
			triggerType="all"
		/>
	);
}

Initial.displayName = 'ExpressionInitialStateExample';

export default Initial;
