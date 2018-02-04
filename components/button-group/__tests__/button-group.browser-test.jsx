/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';

import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import IconSettings from '../../icon-settings';
import SLDSButtonGroup from '../../button-group';
import SLDSButton from '../../button';

describe('SLDSButtonGroup: ', () => {
	const generateButtonGroup = function (buttonGroupInstance) {
		const reactCmp = TestUtils.renderIntoDocument(
			<IconSettings iconPath="/assets/icons">
				<div>{buttonGroupInstance}</div>
			</IconSettings>
		);
		return ReactDOM.findDOMNode(reactCmp).children[0];
	};

	describe('component renders', () => {
		it('buttonGroup renders', () => {
			const instance = (
				<SLDSButtonGroup>
					<SLDSButton
						label="Chart"
						variant="icon"
						iconName="chart"
						iconVariant="border"
					/>
					<SLDSButton
						label="Filter"
						variant="icon"
						iconName="filter"
						iconVariant="border"
					/>
					<SLDSButton
						label="Sort"
						variant="icon"
						iconName="sort"
						iconVariant="more"
					/>
				</SLDSButtonGroup>
			);
			const buttonGroup = generateButtonGroup(instance);
			expect(buttonGroup).to.not.equal(undefined);
		});

		it('renders proper attributes', () => {
			const instance = (
				<SLDSButtonGroup>
					<SLDSButton
						label="Chart"
						variant="icon"
						iconName="chart"
						iconVariant="border"
					/>
					<SLDSButton
						label="Filter"
						variant="icon"
						iconName="filter"
						iconVariant="border"
					/>
					<SLDSButton
						label="Sort"
						variant="icon"
						iconName="sort"
						iconVariant="more"
					/>
				</SLDSButtonGroup>
			);
			const buttonGroup = generateButtonGroup(instance);
			const role = buttonGroup.getAttribute('role');
			expect(role).to.equal('group');
		});

		it('renders children', () => {
			const instance = (
				<SLDSButtonGroup>
					<SLDSButton
						label="Chart"
						variant="icon"
						iconName="chart"
						iconVariant="border"
					/>
					<SLDSButton
						label="Filter"
						variant="icon"
						iconName="filter"
						iconVariant="border"
					/>
					<SLDSButton
						label="Sort"
						variant="icon"
						iconName="sort"
						iconVariant="more"
					/>
				</SLDSButtonGroup>
			);
			const buttonGroup = generateButtonGroup(instance);
			const children = buttonGroup.getElementsByTagName('button');
			expect(children.length).to.equal(3);
		});
	});

	describe('component behavior works', () => {
		it('first button in group invokes method from props', () => {
			const onClick = sinon.spy();
			const instance = (
				<SLDSButtonGroup>
					<SLDSButton label="Refresh" variant="neutral" onClick={onClick} />
					<SLDSButton label="Edit" variant="neutral" />
					<SLDSButton label="Save" variant="neutral" />
					<SLDSButton
						label="More Options"
						variant="icon"
						iconName="down"
						iconVariant="border-filled"
					/>
				</SLDSButtonGroup>
			);
			const buttonGroup = generateButtonGroup(instance);
			const firstBtn = buttonGroup.getElementsByTagName('button')[0];
			TestUtils.Simulate.click(firstBtn);
			expect(onClick.calledOnce).to.be.true;
		});
	});
});
