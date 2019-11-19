/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import BuilderHeader from '../../builder-header';
import IconSettings from '../../icon-settings';

const { Simulate, scryRenderedDOMComponentsWithClass } = TestUtils;

describe('SLDSBuilderHeader: ', () => {
	let clicked;
	let body;

	const setClick = () => {
		clicked = true;
	};

	const renderBuilderHeader = () => {
		body = document.createElement('div');
		document.body.appendChild(body);
		/* deepscan-disable REACT_ASYNC_RENDER_RETURN_VALUE */
		return ReactDOM.render(
			<IconSettings iconPath="/assets/icons">
				<BuilderHeader
					events={{ onClickBack: setClick, onClickHelp: setClick }}
				/>
			</IconSettings>,
			body
		);
		/* deepscan-enable REACT_ASYNC_RENDER_RETURN_VALUE */
	};

	function removeBuilderHeader() {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	describe('Links are clickable', () => {
		let cmp;
		let links;

		beforeEach(() => {
			clicked = false;
			cmp = renderBuilderHeader();
			links = scryRenderedDOMComponentsWithClass(
				cmp,
				'slds-builder-header__item-action'
			);
		});

		afterEach(() => {
			removeBuilderHeader();
		});

		it('triggers when Back link is clicked', () => {
			expect(clicked).to.be.false;
			Simulate.click(links[0], {});
			expect(clicked).to.be.true;
		});

		it('triggers when Help link is clicked', () => {
			expect(clicked).to.be.false;
			Simulate.click(links[1], {});
			expect(clicked).to.be.true;
		});
	});
});
