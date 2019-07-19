import React from 'react';
import find from 'lodash.find';

// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Combobox from '~/components/combobox';
import Input from '~/components/input';
import Expression from '~/components/expression';
import ExpressionGroup from '~/components/expression/group';
import ExpressionCondition from '~/components/expression/condition';
import ExpressionFormula from '~/components/expression/formula';

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
		this.setState({ conditions });
	}

	addSubCondition(i) {
		const { conditions } = this.state;
		const newCondition = {
			resource: '',
			operator: '',
			value: '',
		};
		conditions[i].conditions.push(newCondition);
		this.setState({ conditions });
	}

	deleteCondition(i) {
		const { conditions } = this.state;
		if (conditions.length > 1) {
			conditions.splice(i, 1);
			this.setState({ conditions });
		} else {
			const newCondition = {
				resource: '',
				operator: '',
				value: '',
			};
			this.setState({ conditions: [newCondition] });
		}
	}

	deleteSubCondition(i, j) {
		const { conditions } = this.state;
		if (conditions[i].conditions.length > 1) {
			conditions[i].conditions.splice(j, 1);
			this.setState({ conditions });
		} else {
			const newCondition = {
				resource: '',
				operator: '',
				value: '',
			};
			conditions[i].conditions = [newCondition];
			this.setState({ conditions });
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
			this.setState({ conditions });
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
					events={{
						onChangeTrigger: (val) => this.setState({ triggerType: val }),
						onChangeCustomLogicValue: (e, val) =>
							this.setState({ customLogic: val }),
						onAddCondition: () => this.addCondition(),
						onAddGroup: () => this.addGroup(),
					}}
					triggerType={this.state.triggerType}
					customLogicValue={this.state.customLogic}
				>
					{this.state.triggerType === 'formula' ? (
						<ExpressionFormula
							resourceCombobox={
								<Combobox
									labels={{
										placeholder: 'Insert a Resource',
									}}
									options={ResourcesList}
									variant="inline-listbox"
								/>
							}
							onClickCheckSyntax={() => console.log('Check Syntax')}
							onClickHelp={() => console.log('Get Help')}
							functionCombobox={
								<Combobox
									labels={{
										placeholder: 'Insert a Function',
									}}
									options={ResourcesList}
									variant="inline-listbox"
								/>
							}
							operatorInput={
								<Input
									assistiveText={{ label: 'Insert a Operator' }}
									id="insert-operator-formula"
									placeholder="Insert a Operator"
								/>
							}
						/>
					) : (
						this.state.conditions.map(
							(condition, i) =>
								!condition.isGroup ? (
									<ExpressionCondition
										/* eslint-disable-next-line react/no-array-index-key */
										key={i}
										labels={{
											label: Example.getTriggerType(i, this.state.triggerType),
										}}
										events={{
											onChangeOperator: (e, obj) =>
												this.updateData(i, obj, 'operator'),
											onChangeResource: (e, obj) =>
												this.updateData(i, obj, 'resource'),
											onChangeValue: (e) =>
												this.updateData(i, e.target.value, 'value'),
											onDelete: () => this.deleteCondition(i),
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
									/>
								) : (
									<ExpressionGroup
										/* eslint-disable-next-line react/no-array-index-key */
										key={i}
										labels={{
											label: Example.getTriggerType(i, this.state.triggerType),
										}}
										events={{
											onChangeCustomLogicValue: (e, val) =>
												this.updateGroupData(i, val, 'customLogic'),
											onChangeTrigger: (val) =>
												this.updateGroupData(i, val, 'triggerType'),
											onAddCondition: () => this.addSubCondition(i),
										}}
										customLogicValue={condition.customLogic}
										triggerType={condition.triggerType}
									>
										{condition.triggerType === 'formula' ? (
											<ExpressionFormula
												resourceCombobox={
													<Combobox
														labels={{
															placeholder: 'Insert a Resource',
														}}
														options={ResourcesList}
														variant="inline-listbox"
													/>
												}
												onClickCheckSyntax={() => console.log('Check Syntax')}
												onClickHelp={() => console.log('Get Help')}
												functionCombobox={
													<Combobox
														labels={{
															placeholder: 'Insert a Function',
														}}
														options={ResourcesList}
														variant="inline-listbox"
													/>
												}
												operatorInput={
													<Input
														assistiveText={{ label: 'Insert a Operator' }}
														id={`insert-operator-formula-${i}`}
														placeholder="Insert a Operator"
													/>
												}
											/>
										) : (
											condition.conditions.map((c, j) => (
												<ExpressionCondition
													/* eslint-disable-next-line react/no-array-index-key */
													key={j}
													isSubCondition
													labels={{
														label: Example.getTriggerType(
															j,
															condition.triggerType
														),
													}}
													events={{
														onChangeOperator: (e, obj) =>
															this.updateSubData(i, j, obj, 'operator'),
														onChangeResource: (e, obj) =>
															this.updateSubData(i, j, obj, 'resource'),
														onChangeValue: (e) =>
															this.updateSubData(i, j, e.target.value, 'value'),
														onDelete: () => this.deleteSubCondition(i, j),
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
												/>
											))
										)}
									</ExpressionGroup>
								)
						)
					)}
				</Expression>
			</IconSettings>
		);
	}
}

export default Example;
