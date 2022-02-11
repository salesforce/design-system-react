import React from 'react';
import Example from './example';

class MultipleConditions extends React.Component {
	static displayName = 'ExpressionMultipleConditionsExample';

	render() {
		return (
			<Example
				action={this.props.action}
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
}

export default MultipleConditions;
