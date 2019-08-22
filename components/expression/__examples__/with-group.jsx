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
					{
						isGroup: true,
						triggerType: 'custom',
						customLogic: '1 & 2',
						conditions: [
							{
								resource: '111',
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
