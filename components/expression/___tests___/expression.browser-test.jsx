import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';
import assign from 'lodash.assign';

import ExpressionCondition from '../../expression/condition';
import IconSettings from '../../icon-settings';

const { expect } = chai;
const should = chai.should();

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

describe('SLDSExpression', () => {
	const handles = {
		condition: null,
	};

	const createCondition = (props) =>
		React.createElement(ExpressionCondition, assign({}, {}, props));
	function mountCondition(props) {
		handles.condition = mount(
			<IconSettings iconPath="/assets/icons">
				{createCondition(props)}
			</IconSettings>
		);
	}

	describe('Condition Row', () => {
		const deleteButtonClicked = sinon.spy();
		const changeResource = sinon.spy();
		const changeOperator = sinon.spy();
		const changeValue = sinon.spy();

		beforeEach(() => {
			mountCondition({
				resourcesList: ResourcesList,
				events: {
					onChangeResource: changeResource,
					onChangeOperator: changeOperator,
					onChangeValue: changeValue,
					onDelete: deleteButtonClicked,
				},
				operatorsList: OperatorsList,
			});
		});

		it('expression condition exists', () => {
			should.exist(handles.condition);
			console.log(handles.condition.getDOMNode());
		});

		it('changing resource works', () => {
			const resourceButton = handles.condition
				.find('.slds-col')
				.find('.slds-combobox')
				.at(0);
			resourceButton.simulate('change', {
				target: { value: ResourcesList[0] },
			});
			expect(changeResource.called).to.equal(true);
		});

		it('delete button works', () => {
			const deleteButton = handles.condition.find(
				'button[title="Delete Condition"]'
			);
			expect(deleteButtonClicked.called).to.equal(false);
			deleteButton.simulate('click');
			expect(deleteButtonClicked.called).to.equal(true);
		});
	});
});
