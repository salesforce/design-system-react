import React from 'react';
import find from 'lodash.find';
import log from '~/utilities/log';
import IconSettings from '~/components/icon-settings';
import Combobox from '~/components/combobox';
import Input from '~/components/input';
import Expression from '~/components/expression';
import ExpressionGroup from '~/components/expression/group';
import ExpressionCondition from '~/components/expression/condition';
import ExpressionFormula from '~/components/expression/formula';

const ResourcesList = [
	{ id: '111', label: 'Resource 1' },
	{ id: '112', label: 'Resource 2' },
	{ id: '113', label: 'Resource 3' },
	{ id: '114', label: 'Resource 4' },
];

const OperatorsList = [
	{ id: '1', label: 'Equals' },
	{ id: '2', label: 'Does Not Equals' },
	{ id: '3', label: 'Greater Than' },
	{ id: '4', label: 'Less Than' },
];

class Example extends React.Component {
	static displayName = 'ExpressionBaseExample';

	constructor(props) {
		super(props);
		this.state = {
			conditions: props.conditions,
			triggerType: props.triggerType,
			customLogic: props.customLogic,
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

	updateFormula(data, type) {
		const { conditions } = this.state;
		conditions[type] = data;
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
			conditions.splice(i, 1);
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
		return (
			<IconSettings iconPath="/assets/icons">
				<Expression
					id="expression-example"
					events={{
						onChangeTrigger: (event, data) => {
							log({
								action: this.props.action,
								event,
								eventName: 'Trigger Changed',
								data,
							});
							this.setState({ triggerType: data.triggerType });
						},
						onChangeCustomLogicValue: (event, data) => {
							log({
								action: this.props.action,
								event,
								eventName: 'Custom Logic Changed',
								data,
							});
							this.setState({ customLogic: data.value });
						},
						onAddCondition: () => {
							log({
								action: this.props.action,
								event: null,
								eventName: 'New Condition Added',
								data: null,
							});
							this.addCondition();
						},
						onAddGroup: () => {
							log({
								action: this.props.action,
								event: null,
								eventName: 'New Group Added',
								data: null,
							});
							this.addGroup();
						},
					}}
					triggerType={this.state.triggerType}
					customLogicValue={this.state.customLogic}
				>
					{this.state.triggerType === 'formula' ? (
						<ExpressionFormula
							id="expression-formula"
							resourceCombobox={
								<Combobox
									assistiveText={{
										label: 'Insert a Resource',
									}}
									labels={{
										placeholder: 'Insert a Resource',
									}}
									id="expression-formula-insert-resource"
									multiple={false}
									options={ResourcesList}
									selection={
										this.state.conditions.resource
											? [
													find(ResourcesList, {
														id: this.state.conditions.resource,
													}),
											  ]
											: []
									}
									events={{
										onSelect: (event, data) => {
											this.updateFormula(data.selection[0].id, 'resource');
											log({
												action: this.props.action,
												event,
												eventName: `Formula Resource Changed`,
												data,
											});
										},
									}}
									variant="inline-listbox"
								/>
							}
							events={{
								onChangeTextEditor: (event, data) =>
									log({
										action: this.props.action,
										event,
										eventName: `Formula updated in Text Editor`,
										data,
									}),
								onClickCheckSyntax: () =>
									log({
										action: this.props.action,
										event: null,
										eventName: `Check Syntax Button Clicked`,
										data: null,
									}),
								onClickHelp: () =>
									log({
										action: this.props.action,
										event: null,
										eventName: `Get Help Button Clicked`,
										data: null,
									}),
							}}
							functionCombobox={
								<Combobox
									assistiveText={{
										label: 'Insert a Function',
									}}
									labels={{
										placeholder: 'Insert a Function',
									}}
									id="expression-formula-insert-function"
									options={ResourcesList}
									selection={
										this.state.conditions.function
											? [
													find(ResourcesList, {
														id: this.state.conditions.function,
													}),
											  ]
											: []
									}
									events={{
										onSelect: (event, data) => {
											this.updateFormula(data.selection[0].id, 'function');
											log({
												action: this.props.action,
												event,
												eventName: `Formula Function Changed`,
												data,
											});
										},
									}}
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
						this.state.conditions.map((condition, i) =>
							!condition.isGroup ? (
								<ExpressionCondition
									focusOnMount
									/* eslint-disable-next-line react/no-array-index-key */
									key={i}
									id={`expression-condition-${i}`}
									labels={{
										label: Example.getTriggerType(i, this.state.triggerType),
									}}
									events={{
										onChangeOperator: (event, obj) => {
											log({
												action: this.props.action,
												event,
												eventName: `Condition ${i} Operator Changed`,
												data: obj,
											});
											this.updateData(i, obj, 'operator');
										},
										onChangeResource: (event, obj) => {
											log({
												action: this.props.action,
												event,
												eventName: `Condition ${i} Resource Changed`,
												data: obj,
											});
											this.updateData(i, obj, 'resource');
										},
										onChangeValue: (event, data) => {
											log({
												action: this.props.action,
												event,
												eventName: `Condition ${i} Value Changed`,
												data,
											});
											this.updateData(i, data.value, 'value');
										},
										onDelete: () => {
											log({
												action: this.props.action,
												event: null,
												eventName: `Condition ${i} Deleted`,
												data: null,
											});
											this.deleteCondition(i);
										},
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
									focusOnMount
									/* eslint-disable-next-line react/no-array-index-key */
									key={i}
									id={`expression-group-${i}`}
									labels={{
										label: Example.getTriggerType(i, this.state.triggerType),
									}}
									events={{
										onChangeCustomLogicValue: (event, data) => {
											log({
												action: this.props.action,
												event,
												eventName: `Custom Logic Value of Condition Group ${i} Changed`,
												data,
											});
											this.updateGroupData(i, data.value, 'customLogic');
										},
										onChangeTrigger: (event, data) => {
											log({
												action: this.props.action,
												event,
												eventName: `Trigger of Condition Group ${i} Changed`,
												data,
											});
											this.updateGroupData(i, data.triggerType, 'triggerType');
										},
										onAddCondition: () => {
											log({
												action: this.props.action,
												event: null,
												eventName: `New Condition added to Condition Group ${i}`,
												data: null,
											});
											this.addSubCondition(i);
										},
									}}
									customLogicValue={condition.customLogic}
									triggerType={condition.triggerType}
								>
									{condition.triggerType === 'formula' ? (
										<ExpressionFormula
											id={`expression-group-${i}-formula`}
											resourceCombobox={
												<Combobox
													assistiveText={{
														label: 'Insert a Resource',
													}}
													labels={{
														placeholder: 'Insert a Resource',
													}}
													id={`expression-group-${i}-formula-resource`}
													options={ResourcesList}
													variant="inline-listbox"
												/>
											}
											events={{
												onClickCheckSyntax: log({
													action: this.props.action,
													event: null,
													eventName: `Check Syntax Button Clicked`,
													data: null,
												}),
												onClickHelp: log({
													action: this.props.action,
													event: null,
													eventName: `Get Help Button Clicked`,
													data: null,
												}),
											}}
											functionCombobox={
												<Combobox
													assistiveText={{
														label: 'Insert a Function',
													}}
													labels={{
														placeholder: 'Insert a Function',
													}}
													id={`expression-group-${i}-formula-function`}
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
												focusOnMount
												/* eslint-disable-next-line react/no-array-index-key */
												key={j}
												id={`expression-group-${i}-condition-${j}`}
												isSubCondition
												labels={{
													label: Example.getTriggerType(
														j,
														condition.triggerType
													),
												}}
												events={{
													onChangeOperator: (event, obj) => {
														log({
															action: this.props.action,
															event,
															eventName: `Operator of Condition ${j} of Group ${i} Changed`,
															data: obj,
														});
														this.updateSubData(i, j, obj, 'operator');
													},
													onChangeResource: (event, obj) => {
														log({
															action: this.props.action,
															event,
															eventName: `Resource of Condition [${i},${j}] Changed`,
															data: obj,
														});
														this.updateSubData(i, j, obj, 'resource');
													},
													onChangeValue: (event, data) => {
														log({
															action: this.props.action,
															event,
															eventName: `Value of Condition [${i},${j}] Changed`,
															data,
														});
														this.updateSubData(i, j, data.value, 'value');
													},
													onDelete: () => {
														log({
															action: this.props.action,
															event: null,
															eventName: `Condition [${i},${j}] deleted`,
															data: null,
														});
														this.deleteSubCondition(i, j);
													},
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
