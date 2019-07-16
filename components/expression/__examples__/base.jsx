import React from 'react';
import find from 'lodash.find';

// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Expression from '~/components/expression';
import ExpressionGroup from '~/components/expression/group';
import ExpressionCondition from '~/components/expression/condition';

const ResourcesList = [
	{
		id: '111',
		label: 'Resource 1',
	},
	{
		id: '112',
		label: 'Resource 2',
	},
	{
		id: '113',
		label: 'Resource 3',
	},
	{
		id: '114',
		label: 'Resource 4',
	},
];

const OperatorsList = [
	{
		id: '1',
		label: 'Equals',
	},
	{
		id: '2',
		label: 'Does Not Equals',
	},
	{
		id: '3',
		label: 'Greater Than',
	},
	{
		id: '4',
		label: 'Less Than',
	},
];

class Example extends React.Component {
	static displayName = 'ExpressionBaseExample';

	constructor(props) {
		super(props);
		this.state = {
			conditions: [
				{
					isGroup: false,
					resource: '',
					operator: '',
					value: '',
				},
			],
			triggerType: 'all',
			customLogic: '',
		};
	}

	static getTriggerType(i, trigger) {
		if (trigger === 'custom') return String(i + 1);
		if (i > 0) {
			if (trigger === 'all') return 'AND';
			if (trigger === 'any') return 'OR';
		}
		return '';
	}

	updateData(i, val, type) {
		const { conditions } = this.state;
		if (type === 'value') conditions[i].value = val;
		else conditions[i][type] = val.selection[0].id;
		this.setState({ conditions });
	}

	updateSubData(i, j, val, type) {
		const { conditions } = this.state;
		if (type === 'value') conditions[i].conditions[j].value = val;
		else conditions[i].conditions[j][type] = val.selection[0].id;
		this.setState({ conditions });
	}

	addCondition() {
		const { conditions } = this.state;
		const newCondition = {
			isGroup: false,
			resource: '',
			operator: '',
			value: '',
		};
		conditions.push(newCondition);
		this.setState({ conditions, update: true });
	}

	addSubCondition(i) {
		const { conditions } = this.state;
		const newCondition = {
			resource: '',
			operator: '',
			value: '',
		};
		conditions[i].conditions.push(newCondition);
		this.setState({ conditions, update: true });
	}

	deleteCondition(i) {
		const { conditions } = this.state;
		if (conditions.length > 1) {
			conditions.splice(i, 1);
			this.setState({ conditions, update: true });
		} else {
			const newCondition = {
				resource: '',
				operator: '',
				value: '',
			};
			this.setState({ conditions: [newCondition], update: true });
		}
	}

	deleteSubCondition(i, j) {
		const { conditions } = this.state;
		if (conditions[i].conditions.length > 1) {
			conditions[i].conditions.splice(j, 1);
			this.setState({ conditions, update: true });
		} else {
			const newCondition = {
				resource: '',
				operator: '',
				value: '',
			};
			conditions[i].conditions = [newCondition];
			this.setState({ conditions, update: true });
		}
	}

	addGroup() {
		if (!this.props.isChild) {
			const { conditions } = this.state;
			const newCondition = {
				resource: '',
				operator: '',
				value: '',
			};
			const newGroup = {
				isGroup: true,
				triggerType: 'all',
				conditions: [newCondition],
			};
			conditions.push(newGroup);
			this.setState({ conditions, update: true });
		}
	}

	updateGroupData(i, val, type) {
		const { conditions } = this.state;
		conditions[i][type] = val;
		this.setState({ conditions });
	}

	render() {
		console.log(this.state.conditions);
		return (
			<IconSettings iconPath="/assets/icons">
				<Expression
					triggerType={this.state.triggerType}
					onChangeTrigger={(val) => this.setState({ triggerType: val })}
					customLogic={this.state.customLogic}
					onChangeCustomLogic={(val) => this.setState({ customLogic: val })}
					onAddCondition={() => this.addCondition()}
					onAddGroup={() => this.addGroup()}
				>
					{this.state.conditions.map(
						(condition, i) =>
							!condition.isGroup ? (
								<ExpressionCondition
									/* eslint-disable-next-line react/no-array-index-key */
									key={i}
									labels={{
										condition: Example.getTriggerType(
											i,
											this.state.triggerType
										),
									}}
									resourcesList={ResourcesList}
									resourceSelected={find(ResourcesList, {
										id: condition.resource,
									})}
									operatorsList={OperatorsList}
									operatorSelected={find(OperatorsList, {
										id: condition.operator,
									})}
									value={condition.value}
									onChangeOperator={(e, obj) =>
										this.updateData(i, obj, 'operator')
									}
									onChangeResource={(e, obj) =>
										this.updateData(i, obj, 'resource')
									}
									onChangeValue={(val) => this.updateData(i, val, 'value')}
									onDelete={() => this.deleteCondition(i)}
								/>
							) : (
								<ExpressionGroup
									/* eslint-disable-next-line react/no-array-index-key */
									key={i}
									labels={{
										condition: Example.getTriggerType(
											i,
											this.state.triggerType
										),
									}}
									customLogic={condition.customLogic}
									onChangeCustomLogic={(val) =>
										this.updateGroupData(i, val, 'customLogic')
									}
									triggerType={condition.triggerType}
									onChangeTrigger={(val) =>
										this.updateGroupData(i, val, 'triggerType')
									}
									onAddCondition={() => this.addSubCondition(i)}
								>
									{condition.triggerType !== 'always'
										? condition.conditions.map((c, j) => (
												<ExpressionCondition
													isChild
													labels={{
														condition: Example.getTriggerType(
															j,
															condition.triggerType
														),
													}}
													resourcesList={ResourcesList}
													resourceSelected={find(ResourcesList, {
														id: c.resource,
													})}
													operatorsList={OperatorsList}
													operatorSelected={find(OperatorsList, {
														id: c.operator,
													})}
													value={c.value}
													onChangeOperator={(e, obj) =>
														this.updateSubData(i, j, obj, 'operator')
													}
													onChangeResource={(e, obj) =>
														this.updateSubData(i, j, obj, 'resource')
													}
													onChangeValue={(val) =>
														this.updateSubData(i, j, val, 'value')
													}
													onDelete={() => this.deleteSubCondition(i, j)}
												/>
											))
										: null}
								</ExpressionGroup>
							)
					)}
				</Expression>
			</IconSettings>
		);
	}
}

export default Example;
