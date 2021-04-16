/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';

import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import IconSettings from '../../icon-settings';
import SLDSButtonGroup from '../../button-group';
import SLDSButton from '../../button';

describe('SLDSButtonGroup: ', () => {
	const generateButtonGroup = (buttonGroupInstance) => {
		const ref = React.createRef();
		TestUtils.renderIntoDocument(
			<IconSettings iconPath="/assets/icons">
				<div ref={ref}>{buttonGroupInstance}</div>
			</IconSettings>
		);
		return ReactDOM.findDOMNode(ref.current);
	};

	describe('component renders', () => {
		it('buttonGroup renders', () => {
			const instance = (
				<SLDSButtonGroup>
					<SLDSButton
						label="Chart"
						variant="icon"
						iconCategory="utility"
						iconName="chart"
						iconVariant="border"
					/>
					<SLDSButton
						label="Filter"
						variant="icon"
						iconCategory="utility"
						iconName="filter"
						iconVariant="border"
					/>
					<SLDSButton
						label="Sort"
						variant="icon"
						iconCategory="utility"
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
						iconCategory="utility"
						iconName="chart"
						iconVariant="border"
					/>
					<SLDSButton
						label="Filter"
						variant="icon"
						iconCategory="utility"
						iconName="filter"
						iconVariant="border"
					/>
					<SLDSButton
						label="Sort"
						variant="icon"
						iconCategory="utility"
						iconName="sort"
						iconVariant="more"
					/>
				</SLDSButtonGroup>
			);
			const [buttonGroupElement] = generateButtonGroup(
				instance
			).getElementsByClassName('slds-button-group');
			const role = buttonGroupElement.getAttribute('role');
			expect(role).to.equal('group');
		});

		it('renders children', () => {
			const instance = (
				<SLDSButtonGroup>
					<SLDSButton
						label="Chart"
						variant="icon"
						iconCategory="utility"
						iconName="chart"
						iconVariant="border"
					/>
					<SLDSButton
						label="Filter"
						variant="icon"
						iconCategory="utility"
						iconName="filter"
						iconVariant="border"
					/>
					<SLDSButton
						label="Sort"
						variant="icon"
						iconCategory="utility"
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
						iconCategory="utility"
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
