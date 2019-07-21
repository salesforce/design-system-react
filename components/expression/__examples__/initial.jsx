import React from 'react';
import Example from './example';

class Initial extends React.Component {
	static displayName = 'ExpressionInitialStateExample';

	render() {
		return (
			<Example
				action={this.props.action}
				conditions={[
					{
						resource: '',
					},
				]}
				triggerType="all"
			/>
		);
	}
}

export default Initial;
