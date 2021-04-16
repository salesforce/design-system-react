/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import BuilderHeader from '../../builder-header';
import IconSettings from '../../icon-settings';

describe('SLDSBuilderHeader: ', () => {
	let clicked;
	const setClick = () => {
		clicked = true;
	};

	const renderBuilderHeader = () => {
		const ref = React.createRef();
		TestUtils.renderIntoDocument(
			<IconSettings iconPath="/assets/icons">
				<div ref={ref}>
					<BuilderHeader
						events={{ onClickBack: setClick, onClickHelp: setClick }}
					/>
				</div>
			</IconSettings>
		);
		return ReactDOM.findDOMNode(ref.current);
	};

	describe('Links are clickable', () => {
		let cmp;
		let links;

		beforeEach(() => {
			clicked = false;
			cmp = renderBuilderHeader();
			links = cmp.getElementsByClassName('slds-builder-header__item-action');
		});

		it('triggers when Back link is clicked', () => {
			expect(clicked).to.be.false;
			TestUtils.Simulate.click(links[0], {});
			expect(clicked).to.be.true;
		});

		it('triggers when Help link is clicked', () => {
			expect(clicked).to.be.false;
			TestUtils.Simulate.click(links[1], {});
			expect(clicked).to.be.true;
		});
	});
});
