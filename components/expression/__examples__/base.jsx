import React from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Expression from '~/components/expression';
import ExpressionGroup from '~/components/expression/group';
import ExpressionCondition from '~/components/expression/condition';


class Example extends React.Component {
	static displayName = 'ExpressionBaseExample';

	render() {
		const ResourcesSelection = [
			{
				id: '1',
				label: 'Resource 1',
			},
			{
				id: '2',
				label: 'Resource 2',
			},
			{
				id: '3',
				label: 'Resource 3',
			},
			{
				id: '4',
				label: 'Resource 4',
			}
		];

		return (
			<IconSettings iconPath="/assets/icons">
				<Expression>
					<ExpressionGroup
						triggerType="all"
						onChangeTrigger={(type) => { console.log(type)}}
						onAddCondition={() => { console.log("Add Condition Button Clicked")}}
						onAddGroup={() => { console.log("Add Group Button Clicked")}}
					>
						<ExpressionCondition
								resourcesList={ResourcesSelection}
						/>
					</ExpressionGroup>
				</Expression>
			</IconSettings>
		);
	}
}

export default Example;
