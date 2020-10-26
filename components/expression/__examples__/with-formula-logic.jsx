import React from 'react';
import Example from './example';

function FormulaLogic(props) {
	return (
		<Example
			action={props.action}
			conditions={[
				{
					resource: '',
				},
			]}
			triggerType="formula"
		/>
	);
}

FormulaLogic.displayName = 'ExpressionWithFormulaLogicExample';

export default FormulaLogic;
