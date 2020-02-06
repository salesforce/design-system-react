import React from 'react';
import Example from './example';

class CustomLogic extends React.Component {
	static displayName = 'ExpressionWithCustomLogicExample';

	render() {
		return (
			<Example
				action={this.props.action}
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
}

export default CustomLogic;
