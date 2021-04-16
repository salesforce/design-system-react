/* eslint-disable react/no-render-return-value */

import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import SLDSMenuPicklist from '../../menu-picklist';
import IconSettings from '../../icon-settings';

const { Simulate } = TestUtils;

describe('SLDSMenuPicklist: ', function () {
	let body;

	const options = [
		{
			label: 'A Option Option Super Super Long',
			value: 'A0',
			title: 'Greg',
		},
		{
			label: 'B Option',
			value: 'B0',
		},
	];

	const renderPicklist = (inst) => {
		body = document.createElement('div');
		document.body.appendChild(body);
		/* deepscan-disable REACT_ASYNC_RENDER_RETURN_VALUE */
		return ReactDOM.render(
			<div>
				<IconSettings iconPath="/assets/icons">{inst}</IconSettings>
			</div>,
			body
		);
		/* deepscan-enable REACT_ASYNC_RENDER_RETURN_VALUE */
	};

	function removePicklist() {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const defaultProps = {
		modal: false,
		options,
		placeholder: 'Select a contact',
		value: 'C0',
		silenceDeprecationWarning: true,
	};

	const createPicklist = (props) =>
		React.createElement(SLDSMenuPicklist, assign({}, defaultProps, props));

	const getPicklist = (props) => renderPicklist(createPicklist(props));
	const getMenu = (dom) => dom.querySelector('.slds-dropdown');

	describe('in modal mode', () => {
		let cmp;
		let btn;

		beforeEach(() => {
			cmp = getPicklist({ modal: true });
			[btn] = cmp.getElementsByClassName('slds-button');
		});

		afterEach(() => {
			removePicklist();
		});

		it('expands/contracts the dropdown on click', () => {
			expect(getMenu(document.body)).to.equal(null);
			Simulate.click(btn, {});
			expect(getMenu(document.body).className).to.include('slds-dropdown_left');
			Simulate.click(btn, {});
			expect(getMenu(document.body)).to.equal(null);
		});
	});

	describe('with click handler', () => {
		let cmp;
		let btn;
		let clicked;

		beforeEach(() => {
			clicked = false;
			cmp = getPicklist({
				onClick: () => {
					clicked = true;
				},
			});
			[btn] = cmp.getElementsByClassName('slds-button');
		});

		afterEach(() => {
			removePicklist();
		});

		it('gives the button correct aria properties', () => {
			expect(btn.getAttribute('aria-haspopup')).to.equal('true');
		});

		it('sets the placeholder', () => {
			expect(btn.textContent).to.equal('Select a contact');
		});

		it('expands/contracts the dropdown on click', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.click(btn, {});
			expect(getMenu(body).className).to.include('slds-dropdown');
			Simulate.click(btn, {});
			expect(getMenu(body)).to.equal(null);
		});

		it('preserves click behavior', () => {
			expect(clicked).to.be.false;
			Simulate.click(btn, {});
			expect(clicked).to.be.true;
		});
	});

	describe('expanded with onSelect', () => {
		let cmp;
		let btn;
		let selected;

		beforeEach(() => {
			selected = false;
			cmp = getPicklist({
				onSelect: (i) => {
					selected = i;
				},
			});
			[btn] = cmp.getElementsByClassName('slds-button');
			Simulate.click(btn, {});
		});

		afterEach(() => {
			removePicklist();
		});

		it('selects an item', () => {
			expect(selected).to.be.false;
			const items = getMenu(body).querySelectorAll('.slds-dropdown__item');
			Simulate.click(items[1].querySelector('a'), {});
			expect(selected.value).to.equal('B0');
		});
	});

	describe('disabled', () => {
		let cmp;
		let btn;
		let clicked;

		beforeEach(() => {
			clicked = false;
			cmp = getPicklist({
				disabled: true,
				onClick: () => {
					clicked = true;
				},
			});
			[btn] = cmp.getElementsByClassName('slds-button');
		});

		afterEach(() => {
			removePicklist();
		});

		it("doesn't open", () => {
			Simulate.click(btn, {});
			expect(getMenu(body)).to.equal(null);
		});

		it('prevents click behavior', () => {
			expect(clicked).to.be.false;
			Simulate.click(btn, {});
			expect(clicked).to.be.false;
		});
	});

	describe('accessible markup', () => {
		let cmp;
		let btn;

		beforeEach(() => {
			cmp = getPicklist({});
			[btn] = cmp.getElementsByClassName('slds-button');
		});

		afterEach(() => {
			removePicklist();
		});

		it('<ul> has role menu & aria-labelledby', () => {
			Simulate.click(btn, {});
			const ulRole = getMenu(body).querySelector('ul').getAttribute('role');
			const ulAria = getMenu(body)
				.querySelector('ul')
				.getAttribute('aria-labelledby');
			expect(ulRole).to.equal('menu');
			expect(ulAria).to.equal(btn.getAttribute('id'));
		});

		it('<a> inside <li> has role menuitem', () => {
			Simulate.click(btn, {});
			const items = getMenu(body).querySelectorAll('.slds-dropdown__item a');
			const anchorRole = items[1].getAttribute('role');
			const match =
				anchorRole === 'menuitem' ||
				anchorRole === 'menuitemradio' ||
				anchorRole === 'menuitemcheckbox';
			expect(match).to.be.true;
		});
	});

	describe('Keyboard behavior', () => {
		let cmp;
		let btn;
		let selected;

		beforeEach(() => {
			selected = false;
			cmp = getPicklist({
				onSelect: (i) => {
					selected = i;
				},
			});
			[btn] = cmp.getElementsByClassName('slds-button');
		});

		afterEach(() => {
			removePicklist();
		});

		it('opens menu with enter', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.keyDown(btn, { key: 'Enter', keyCode: 13, which: 13 });
			expect(getMenu(body)).to.not.equal(null);
		});

		it('opens menu with down arrow key', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.keyDown(btn, { key: 'Down', keyCode: 40, which: 40 });
			expect(getMenu(body)).to.not.equal(null);
		});

		it('selects an item with keyboard', () => {
			Simulate.click(btn, {});
			expect(selected).to.be.false;

			const menu = getMenu(body);
			Simulate.keyDown(menu, { key: 'Down', keyCode: 40, which: 40 });
			Simulate.keyDown(menu, { key: 'Down', keyCode: 40, which: 40 });
			Simulate.keyDown(menu, { key: 'Enter', keyCode: 13, which: 13 });
			expect(selected.value).to.equal('B0');
		});

		it('closes Menu on esc', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.click(btn, {});
			expect(getMenu(body)).to.not.equal(null);
			const menuItems = getMenu(body).querySelectorAll('.slds-dropdown__item');
			Simulate.keyDown(menuItems[1].querySelector('a'), {
				key: 'Esc',
				keyCode: 27,
				which: 27,
			});
			expect(getMenu(body)).to.equal(null);
		});
	});
});
