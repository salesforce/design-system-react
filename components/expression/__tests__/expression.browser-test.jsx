/* eslint-disable max-lines */
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import {
	createMountNode,
	destroyMountNode,
} from '../../../tests/enzyme-helpers';

import ExpressionCondition from '../../../components/expression/condition';
import IconSettings from '../../icon-settings';
import { keyObjects } from '../../../utilities/key-code';

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
	<IconSettings iconPath="/assets/icons">
		<ExpressionCondition
			resourcesList={ResourcesList}
			operatorsList={OperatorsList}
			{...props}
			id="test"
		/>
	</IconSettings>
);

const getNodes = (wrapper) => ({
	resourceSelector: wrapper.find('input[id="test-resource-selector"]'),
	operatorSelector: wrapper.find('input[id="test-operator-selector"]'),
	valueInput: wrapper.find('input[id="test-input"]'),
	deleteButton: wrapper.find('button[id="test-delete-button"]'),
});

describe('SLDSExpression', function describeFunction() {
	let mountNode;
	let wrapper;

	describe('Expression Condition', () => {
		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('Resource Selector works', function() {
			const changeResource = sinon.spy();

			wrapper = mount(
				<DemoCondition
					events={{
						onChangeResource: changeResource,
					}}
				/>,
				{ attachTo: mountNode }
			);
			const node = getNodes(wrapper);
			expect(node.resourceSelector).attr('value', '');

			node.resourceSelector.simulate('focus');
			node.resourceSelector.simulate('change', {
				target: { value: ResourcesList[0].label },
			});
			node.resourceSelector.simulate('keyDown', keyObjects.DOWN);
			expect(node.resourceSelector).attr('value', ResourcesList[0].label);
		});

		it('Operator Selector works', function() {
			const changeOperator = sinon.spy();

			wrapper = mount(
				<DemoCondition
					events={{
						onChangeOperator: changeOperator,
					}}
				/>,
				{ attachTo: mountNode }
			);
			const node = getNodes(wrapper);
			expect(node.operatorSelector).attr('value', '');

			node.operatorSelector.simulate('focus');
			node.operatorSelector.simulate('change', {
				target: { value: OperatorsList[0].label },
			});
			node.operatorSelector.simulate('keyDown', keyObjects.DOWN);
			expect(node.operatorSelector).attr('value', OperatorsList[0].label);
		});

		it('Value Input works', function() {
			const changeValue = sinon.spy();

			wrapper = mount(
				<DemoCondition
					events={{
						onChangeValue: changeValue,
					}}
					resourceSelected={ResourcesList[0]}
				/>,
				{ attachTo: mountNode }
			);
			const node = getNodes(wrapper);
			expect(node.valueInput).attr('value', '');
			node.valueInput.simulate('focus');
			node.valueInput.simulate('change', { target: { value: 'something' } });
			expect(changeValue.callCount).to.equal(1);
			expect(changeValue.args[0][1].value).to.equal('something');
		});

		it('Delete button works', function() {
			const deleteButtonCallback = sinon.spy();

			wrapper = mount(
				<DemoCondition
					events={{
						onDelete: deleteButtonCallback,
					}}
				/>,
				{ attachTo: mountNode }
			);

			const node = getNodes(wrapper);

			expect(deleteButtonCallback.callCount).to.equal(0);
			node.deleteButton.simulate('click');
			expect(deleteButtonCallback.callCount).to.equal(1);
		});
	});
});
