/* eslint-env mocha */
/* global sinon */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Dropdown from '../../components/menu-dropdown';
import List from '../../components/menu-list/list';
const { Simulate,	findRenderedDOMComponentWithClass } = TestUtils;

describe('SLDSMenuDropdown: ', () => {
	let body;
	const options = [
		{ label: 'A super short', value: 'A0' },
		{ label: 'B Option Super Super Long', value: 'B0' },
		{ label: 'C Option', value: 'C0' },
		{ label: 'D Option', value: 'D0' }
	];

	const renderDropdown = (inst) => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(inst, body);
	};

	function removeDropdownTrigger () {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const defaultProps = {
		label: 'Contacts',
		openOn: 'click',
		modal: false,
		options,
		placeholder: 'Select a contact',
		value: 'B0'
	};

	const iconOnlyProps = {
		assistiveText: 'more options',
		buttonVariant: 'icon',
		checkmark: true,
		iconName: 'down',
		iconVariant: 'border-filled',
		openOn: 'click',
		modal: false,
		options,
		placeholder: 'Select an Action',
		value: 'C0'
	};

	const createDropdown = (props) => React.createElement(Dropdown, assign({}, defaultProps, props));
	createDropdown.displayName = 'createDropdown';
	const createDropdownIcon = (props) => React.createElement(Dropdown, assign({}, iconOnlyProps, props));
	createDropdownIcon.displayName = 'createDropdownIcon';

	/* eslint-disable react/prop-types */
	const DropdownCustomContent = (props) => (
		<div id="custom-dropdown-menu-content">
			<div className="slds-m-around--medium">
				<div className="slds-tile slds-tile--board slds-m-horizontal--small">
					<p className="tile__title slds-text-heading--small">Art Vandelay</p>
					<div className="slds-tile__detail">
						<p className="slds-truncate">
							<a id="custom-dropdown-menu-content-link" className="slds-m-right--medium" href="#" onClick={props.onClick}>Settings</a>
							<a href="#" onClick={props.onClick}>Log Out</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
	DropdownCustomContent.displayName = 'DropdownCustomContent';

	const createDropdownWithCustomChildren = (props) => (
		<Dropdown {...assign({}, defaultProps, props)} >
			<DropdownCustomContent />
			<List options={[{ label: 'Custom Content Option' }, ...options]} />
		</Dropdown>
	);

	createDropdownWithCustomChildren.displayName = 'createDropdownWithCustomChildren';

	const dropItDown = (props, children) => renderDropdown(createDropdown(props, children));
	const dropItDownWithCustomChildren = (props) => renderDropdown(createDropdownWithCustomChildren(props));
	const dropItDownIconOnly = (props) => renderDropdown(createDropdownIcon(props));

	const getMenu = (dom) => dom.querySelector('.slds-dropdown');

	describe('Custom Content Present', () => {
		let cmp;
		let btn;
		beforeEach(() => {
			/* eslint-disable no-unused-vars */
			let selected = false;
			/* eslint-enable no-unused-vars */
			cmp = dropItDownWithCustomChildren({ onSelect: (i) => {
				selected = i;
			} },
			);
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
		});

		it('has content with custom ID is present', () => {
			Simulate.click(btn, {});
			const customContent = getMenu(body).querySelector('#custom-dropdown-menu-content');
			expect(customContent).to.not.equal(undefined);
		});

		it('closes when custom content is clicked', () => {
			Simulate.click(btn, {});
			const customContentLink = getMenu(body).querySelector('#custom-dropdown-menu-content').querySelector('#custom-dropdown-menu-content-link');
			Simulate.click(customContentLink, {});
			expect(getMenu(body)).to.equal(null);
		});

		it('has additional ListItem from list child\'s options prop', () => {
			const buttonId = body.querySelector('button').id;
			Simulate.click(btn, {});
			const customContentFirstItemText = getMenu(body).querySelector(`#${buttonId}-item-0`).firstChild.firstChild.textContent;
			expect(customContentFirstItemText).to.equal('Custom Content Option');
		});
	});

	describe('Hoverable', () => {
		let cmp;
		let btn;

		beforeEach(() => {
			cmp = dropItDown({ buttonClassName: 'dijkstrafied', openOn: 'hover' });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
		});

		it('gives the button correct aria properties', () => {
			expect(btn.props['aria-haspopup']).to.equal('true');
		});

		it('sets the label', () => {
			expect(btn.textContent).to.equal('Contacts');
		});

		it('expands the dropdown on hover', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			expect(getMenu(body).className).to.include('slds-dropdown');
			Simulate.mouseLeave(btn, {});
		});

		it('closes on blur based on timeout delay', (done) => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			Simulate.mouseLeave(btn);
			expect(getMenu(body)).to.not.equal(null);
			setTimeout(() => {
				expect(getMenu(body)).to.equal(null);
				done();
			}, 600);
		});

		it('doesn\'t close on quick hover outside', (done) => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			Simulate.mouseLeave(btn);
			setTimeout(() => {
				expect(getMenu(body)).to.not.equal(null);
				setTimeout(() => {
					expect(getMenu(body)).to.equal(null);
					done();
				}, 600);
			}, 100);
		});
	});

	describe('Clickable', () => {
		let cmp;
		let btn;
		const onClick = sinon.spy();

		beforeEach(() => {
			cmp = dropItDown({ openOn: 'click', onClick });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
		});

		it('doesnt expand on hover', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			expect(getMenu(body)).to.equal(null);
		});

		it('expands/contracts on click', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.click(btn, {});
			expect(getMenu(body).className).to.include('slds-dropdown');
			Simulate.click(btn, {});
			expect(getMenu(body)).to.equal(null);
		});

		it('preserves click behavior', () => {
			onClick.reset();
			Simulate.click(btn, {});
			expect(onClick.calledOnce);
			Simulate.click(btn, {});
		});
	});

	describe('Hybrid-able', () => {
		let cmp;
		let btn;
		const onClick = sinon.spy();

		beforeEach(() => {
			cmp = dropItDown({ openOn: 'hybrid', onClick });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
		});

		it('doesnt expand on hover', () => {
			expect(getMenu(body)).to.equal(null);
			Simulate.mouseEnter(btn, {});
			expect(getMenu(body)).to.equal(null);
		});

		it('opens on click, closes on mouseLeave', (done) => {
			// open
			expect(getMenu(body)).to.equal(null);
			Simulate.click(btn, {});
			expect(getMenu(body).className).to.include('slds-dropdown');
			
			// close
			Simulate.mouseEnter(btn, {});
			Simulate.mouseLeave(btn);
			expect(getMenu(body)).to.not.equal(null);
			setTimeout(() => {
				expect(getMenu(body)).to.equal(null);
				done();
			}, 600);
		});
	});

	describe('Expanded', () => {
		let cmp;
		let btn;
		let selected;

		beforeEach(() => {
			selected = false;
			cmp = dropItDown({ openOn: 'click', onSelect: (i) => { selected = i; } });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
		});

		it('selects an item on click', () => {
			Simulate.click(btn, {});
			expect(selected).to.be.false;
			const items = getMenu(body).querySelectorAll('.slds-dropdown__item');
			Simulate.click(items[1].querySelector('a'), {});
			expect(selected.value).to.equal('B0');
		});
	});

	describe('accessible markup for label Dropdowns', () => {
		let cmp;
		let btn;
		beforeEach(() => {
			/* eslint-disable no-unused-vars */
			let selected = false;
			/* eslint-enable no-unused-vars */
			cmp = dropItDown({ onSelect: (i) => {
				selected = i;
			} });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
		});

		it('<ul> has role menu & aria-labelledby', () => {
			Simulate.click(btn, {});
			const ulRole = getMenu(body).querySelector('ul').getAttribute('role');
			const ulAria = getMenu(body).querySelector('ul').getAttribute('aria-labelledby');
			expect(ulRole).to.equal('menu');
			expect(ulAria).to.equal(btn.getAttribute('id'));
		});

		it('<a> inside <li> has role menuitem', () => {
			Simulate.click(btn, {});
			const items = getMenu(body).querySelectorAll('.slds-dropdown__item a');
			const anchorRole = items[1].getAttribute('role');
			const match = (anchorRole === 'menuitem' || anchorRole === 'menuitemradio' || anchorRole === 'menuitemcheckbox');
			expect(match).to.be.true;
		});
	});

	describe('accessible markup for Icon Only Dropdowns', () => {
		let cmp;
		let btn;
		beforeEach(() => {
			/* eslint-disable no-unused-vars */
			let selected = false;
			/* eslint-enable no-unused-vars */
			cmp = dropItDownIconOnly({ onSelect: (i) => {
				selected = i;
			} });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
		});

		it('<ul> has role menu & aria-labelledby', () => {
			Simulate.click(btn, {});
			const ulRole = getMenu(body).querySelector('ul').getAttribute('role');
			const ulAria = getMenu(body).querySelector('ul').getAttribute('aria-labelledby');
			expect(ulRole).to.equal('menu');
			expect(ulAria).to.equal(btn.getAttribute('id'));
		});

		it('<a> inside <li> has role menuitem', () => {
			Simulate.click(btn, {});
			const items = getMenu(body).querySelectorAll('.slds-dropdown__item a');
			const anchorRole = items[1].getAttribute('role');
			const match = (anchorRole === 'menuitem' || anchorRole === 'menuitemradio' || anchorRole === 'menuitemcheckbox');
			expect(match).to.be.true;
		});
	});

	describe('Keyboard behavior', () => {
		let cmp;
		let btn;
		let selected = false;
		beforeEach(() => {
			cmp = dropItDown({
				openOn: 'click',
				onSelect: (i) => {
					selected = i;
				} });
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
		});

		afterEach(() => {
			removeDropdownTrigger(btn);
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
			Simulate.keyDown(menuItems[1].querySelector('a'), { key: 'Esc', keyCode: 27, which: 27 });
			expect(getMenu(body)).to.equal(null);
		});
	});
});
