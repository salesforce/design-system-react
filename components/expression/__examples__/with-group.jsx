import React from 'react';
import Example from './example';

class WithGroup extends React.Component {
	static displayName = 'ExpressionWithGroupExample';

	render() {
		return (
			<Example
				action={this.props.action}
				conditions={[
					{
						resource: '111',
					},
					{
						isGroup: true,
						triggerType: 'any',
						conditions: [
							{
								resource: '111',
							},
							{
								resource: '',
							},
						],
					},
				]}
				triggerType="all"
			/>
		);
	}
}

export default WithGroup;
