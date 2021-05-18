/* eslint-disable max-lines */
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

import ExpressionCondition from '../../../components/expression/condition';
import IconSettings from '../../icon-settings';
import { keyObjects } from '../../../utilities/key-code';
import ExpressionGroup from '../group';
import ExpressionFormula from '../formula';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

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

const DemoCondition = (props) => (
	<ExpressionCondition
		resourcesList={ResourcesList}
		operatorsList={OperatorsList}
		{...props}
		id="test"
	/>
);

const DemoGroup = (props) => <ExpressionGroup {...props} id="test" />;

const DemoFormula = (props) => <ExpressionFormula {...props} id="test" />;

describe('SLDSExpression', function describeFunction() {
	const handles = {
		condition: null,
		group: null,
		formula: null,
	};

	function mountCondition(props) {
		handles.condition = mount(
			<IconSettings iconPath="/assets/icons">
				{DemoCondition(props)}
			</IconSettings>
		);
	}

	function mountGroup(props) {
		handles.group = mount(
			<IconSettings iconPath="/assets/icons">{DemoGroup(props)}</IconSettings>
		);
	}

	function mountFormula(props) {
		handles.formula = mount(
			<IconSettings iconPath="/assets/icons">{DemoFormula(props)}</IconSettings>
		);
	}

	describe('Expression Condition', () => {
		let resourceChange;
		let operatorChange;
		let valueChange;
		let deleteClicked;

		const getNodes = (wrapper) => ({
			resourceSelector: wrapper.find('input[id="test-resource-selector"]'),
			operatorSelector: wrapper.find('input[id="test-operator-selector"]'),
			valueInput: wrapper.find('input[id="test-input"]'),
			deleteButton: wrapper.find('button[id="test-delete-button"]'),
		});

		beforeEach(() => {
			mountCondition({
				events: {
					onChangeResource: (event, data) => {
						resourceChange = { event, data };
					},
					onChangeOperator: (event, data) => {
						operatorChange = { event, data };
					},
					onChangeValue: (event, data) => {
						valueChange = { event, data };
					},
					onDelete: (event, data) => {
						deleteClicked = { event, data };
					},
				},
			});
		});

		it('Resource selector works', function () {
			const node = getNodes(handles.condition);
			expect(node.resourceSelector).attr('value', '');
			node.resourceSelector.simulate('focus');
			node.resourceSelector.simulate('keyDown', keyObjects.DOWN);
			node.resourceSelector.simulate('keyDown', keyObjects.DOWN);
			node.resourceSelector.simulate('keyDown', keyObjects.ENTER);
			expect(resourceChange !== undefined).to.eql(true);
			expect(typeof resourceChange.event).to.eql('object');
			expect(typeof resourceChange.data).to.eql('object');
			expect(resourceChange.data.selection[0]).to.equal(ResourcesList[0]);
		});

		it('Operator selector works', function () {
			const node = getNodes(handles.condition);
			expect(node.operatorSelector).attr('value', '');
			node.operatorSelector.simulate('focus');
			node.operatorSelector.simulate('keyDown', keyObjects.DOWN);
			node.operatorSelector.simulate('keyDown', keyObjects.DOWN);
			node.operatorSelector.simulate('keyDown', keyObjects.ENTER);
			expect(operatorChange !== undefined).to.eql(true);
			expect(typeof operatorChange.event).to.eql('object');
			expect(typeof operatorChange.data).to.eql('object');
			expect(operatorChange.data.selection[0]).to.equal(OperatorsList[0]);
		});

		it('Value input works', function () {
			const node = getNodes(handles.condition);
			expect(node.valueInput).attr('value', '');
			node.valueInput.simulate('focus');
			node.valueInput.simulate('change', { target: { value: 'something' } });
			expect(valueChange.data.value).to.equal('something');
		});

		it('Delete button works', function () {
			const node = getNodes(handles.condition);
			expect(deleteClicked === undefined).to.equal(true);
			node.deleteButton.simulate('click');
			expect(deleteClicked === undefined).to.equal(false);
		});
	});

	describe('Expression Group', () => {
		let triggerChange;
		let addGroup;
		let addCondition;
		let customLogic;

		const getNodes = (wrapper) => ({
			trigger: wrapper.find('input[id="test-take-action-trigger"]'),
			addGroup: wrapper.find('button[id="test-add-group-button"]'),
			addCondition: wrapper.find('button[id="test-add-condition-button"]'),
			customLogicInput: wrapper.find('input[id="test-custom-logic-input"]'),
		});

		beforeEach(() => {
			mountGroup({
				isRoot: true,
				triggerType: 'custom',
				events: {
					onChangeTrigger: (event, data) => {
						triggerChange = { event, data };
					},
					onAddGroup: (event, data) => {
						addGroup = { event, data };
					},
					onAddCondition: (event, data) => {
						addCondition = { event, data };
					},
					onChangeCustomLogicValue: (event, data) => {
						customLogic = { event, data };
					},
				},
			});
		});

		it('Trigger change button works', function () {
			const node = getNodes(handles.group);
			expect(node.trigger).attr('value', 'Custom Logic Is Met');
			node.trigger.simulate('focus');
			// Pressing down once would not change the input value
			node.trigger.simulate('keyDown', keyObjects.DOWN);
			node.trigger.simulate('keyDown', keyObjects.UP);
			node.trigger.simulate('keyDown', keyObjects.UP);
			node.trigger.simulate('keyDown', keyObjects.ENTER);
			expect(triggerChange !== undefined).to.eql(true);
			expect(typeof triggerChange.event).to.eql('object');
			expect(typeof triggerChange.data).to.eql('object');
			expect(triggerChange.data.triggerType).to.eql('all');
		});

		it('Custom logic input works', function () {
			const node = getNodes(handles.group);
			expect(node.customLogicInput).attr('value', '');
			node.customLogicInput.simulate('focus');
			node.customLogicInput.simulate('change', { target: { value: '1 + 2' } });
			expect(customLogic.data.value).to.equal('1 + 2');
		});

		it('Add group button works', function () {
			const node = getNodes(handles.group);
			expect(addGroup === undefined).to.equal(true);
			node.addGroup.simulate('click');
			expect(addGroup === undefined).to.equal(false);
		});

		it('Add condition button works', function () {
			const node = getNodes(handles.group);
			expect(addCondition === undefined).to.equal(true);
			node.addCondition.simulate('click');
			expect(addCondition === undefined).to.equal(false);
		});
	});

	describe('Expression Formula', () => {
		let helpClicked;
		let checkSyntaxClicked;

		const getNodes = (wrapper) => ({
			helpButton: wrapper.find('button[id="test-help-button"]'),
			checkSyntax: wrapper.find('button[id="test-check-syntax-button"]'),
			contentEditor: wrapper.find('div[id="test-content-editor"]'),
		});

		beforeEach(() => {
			mountFormula({
				events: {
					onClickHelp: (event, data) => {
						helpClicked = { event, data };
					},
					onClickCheckSyntax: (event, data) => {
						checkSyntaxClicked = { event, data };
					},
				},
			});
		});

		it('Help button works', function () {
			const node = getNodes(handles.formula);
			expect(helpClicked === undefined).to.equal(true);
			node.helpButton.simulate('click');
			expect(helpClicked === undefined).to.equal(false);
		});

		it('Check syntax button works', function () {
			const node = getNodes(handles.formula);
			expect(checkSyntaxClicked === undefined).to.equal(true);
			node.checkSyntax.simulate('click');
			expect(checkSyntaxClicked === undefined).to.equal(false);
		});
	});
});
