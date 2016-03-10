/* global describe, it, before, after, beforeEach, afterEach */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { expect } from 'chai';

import { ButtonGroup } from '../../src';
import { Button } from '../../src';

chai.should();

describe('ButtonGroup: ', () => {
	let generateButtonGroup = function (buttonGroupInstance) {
		let reactCmp = TestUtils.renderIntoDocument(buttonGroupInstance);
		return ReactDOM.findDOMNode(reactCmp);
	};

	describe('component renders', () => {
		it('buttonGroup renders', () => {
			let instance = <ButtonGroup>
				<Button label="Chart" variant="icon" iconName="chart" iconVariant="border"/>
				<Button label="Filter" variant="icon" iconName="filter" iconVariant="border"/>
				<Button label="Sort" variant="icon" iconName="sort" iconVariant="more"/>
			</ButtonGroup>;
			let buttonGroup = generateButtonGroup(instance);
			expect(buttonGroup).to.not.equal(undefined);
		});

		it('renders proper attributes', () => {
			let instance = <ButtonGroup>
				<Button label="Chart" variant="icon" iconName="chart" iconvariant="border"/>
				<Button label="Filter" variant="icon" iconName="filter" iconvariant="border"/>
				<Button label="Sort" variant="icon" iconName="sort" iconvariant="more"/>
			</ButtonGroup>;
			let buttonGroup = generateButtonGroup(instance);
			let role = buttonGroup.getAttribute('role');
			expect(role).to.equal('group');
		});

		it('renders children', () => {
			let instance = <ButtonGroup>
				<Button label="Chart" variant="icon" iconName="chart" iconvariant="border"/>
				<Button label="Filter" variant="icon" iconName="filter" iconvariant="border"/>
				<Button label="Sort" variant="icon" iconName="sort" iconvariant="more"/>
			</ButtonGroup>;
			let buttonGroup = generateButtonGroup(instance);
			let children = buttonGroup.getElementsByTagName('button');
			expect(children.length).to.equal(3);
		});
	});

	describe('component behavior works', function() {
		it('first button in group invokes method from props', function() {
			let onClick = sinon.spy();
			let instance = <ButtonGroup>
									<Button label="Refresh" variant="neutral" onClick={onClick} />
									<Button label="Edit" variant="neutral" />
									<Button label="Save" variant="neutral" />
									<Button label="More Options" variant="icon" iconName="down" iconvariant="border-filled" />
			</ButtonGroup>;
			let buttonGroup = generateButtonGroup(instance);
			let firstBtn = buttonGroup.getElementsByTagName('button')[0];
			TestUtils.Simulate.click(firstBtn);
			expect(onClick.calledOnce).to.be.true;
		});
	});

});
