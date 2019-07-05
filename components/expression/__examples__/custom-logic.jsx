import React from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Expression from '~/components/expression';
import ExpressionGroup from '~/components/expression/group';
import ExpressionCondition from '~/components/expression/condition';


class Example extends React.Component {
	static displayName = 'ExpressionCustomLogicExample';

	render() {
		const ResourcesList = [
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
						triggerType="custom"
						onChangeTrigger={(t) => console.log("Trigger: ", t)}
						onAddCondition={() => console.log("Add Condition Button Clicked")}
						onAddGroup={() => console.log("Add Group Button Clicked")}
					>
						<ExpressionCondition
							resourcesList={ResourcesList}
							resourceSelected={{
								id: '1',
								label: 'Resource 1'
							}}
							labels={{
								condition: "1"
							}}
							operatorSelection="equal"
							onChangeOperator={(o) => console.log("operator: ", o)}
							onChangeResource={(e,obj) => console.log("resource: ", obj)}
							onDelete={() => console.log("Delete Condition Button Clicked")}
						/>
						<ExpressionCondition
							resourcesList={ResourcesList}
							labels={{
								condition: "2"
							}}
						/>
					</ExpressionGroup>
				</Expression>
			</IconSettings>
		);
	}
}

export default Example;
