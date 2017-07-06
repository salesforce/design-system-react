/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';

import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import { SLDSLookup } from '../../components';

const Header = SLDSLookup.DefaultHeader;
const Footer = SLDSLookup.DefaultFooter;
const { Simulate, scryRenderedDOMComponentsWithClass, scryRenderedDOMComponentsWithTag } = TestUtils;

describe('SLDSLookup: ', () => {
	const generateLookup = function (lookupInstance) {
		const reactCmp = TestUtils.renderIntoDocument(lookupInstance);
		return ReactDOM.findDOMNode(reactCmp);
	};

	const defaultProps = {
		emptyMessage: 'No items found',
		footerRenderer: Footer,
		iconCategory: 'standard',
		iconName: 'account',
		isInline: true,
		label: 'Account',
		onChange (newValue) { console.log('New search term: ', newValue); },
		onSelect (item) { console.log(item, ' Selected'); },
		options: [
			{ label: 'Paddy"s Pub' },
			{ label: 'Tyrell Corp' },
			{ label: 'Paper St. Soap Company' },
			{ label: 'Nakatomi Investments' },
			{ label: 'Acme Landscaping' },
			{ label: 'Acme Construction' }
		]
	};

	const getLookup = (props = {}) => React.createElement(SLDSLookup, assign({}, defaultProps, props));
	const getLookupWithHeader = (props = { headerRenderer: Header }) => React.createElement(SLDSLookup, assign({}, defaultProps, props));
	const getLookupWithSelection = (props = { selectedItem: 1 }) => React.createElement(SLDSLookup, assign({}, defaultProps, props));

	const getItems = (lookup) => lookup.getElementsByClassName('js-slds-lookup__item');

	describe('component renders', () => {
		it('lookup renders', () => {
			const lookup = generateLookup(getLookup());
			expect(lookup).to.not.equal(undefined);
		});
	});

	describe('component basic props render', () => {
		it('renders label', () => {
			const lookup = generateLookup(getLookup());
			const label = lookup.getElementsByTagName('label')[0];
			expect(label.innerHTML).to.equal('<!-- react-text: 3 -->Account<!-- /react-text -->');
		});
	});

	describe('accessibility markup passes', () => {
		it('label for matches input id', () => {
			const lookup = generateLookup(getLookup());
			const labelFor = lookup.getElementsByTagName('label')[0].getAttribute('for');
			const inputId = lookup.getElementsByTagName('input')[0].getAttribute('id');
			expect(labelFor).to.equal(inputId);
		});

		it('aria-expanded is false initally', () => {
			const lookup = generateLookup(getLookup());
			const ariaExpanded = lookup.getElementsByClassName('slds-combobox')[0].getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('false');
		});

		it('aria-expanded is true when clicking on input field', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			const ariaExpanded = lookup.getElementsByClassName('slds-combobox')[0].getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('true');
		});

		it('LookupWithSelection - aria-expanded is true when deleting selection', () => {
			const lookup = generateLookup(getLookupWithSelection());
			const deleteBtn = lookup.getElementsByTagName('button')[0];
			TestUtils.Simulate.click(deleteBtn);
			const ariaExpanded = lookup.getElementsByClassName('slds-combobox')[0].getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('true');
		});
	});


	describe('Single Select - selecting item works', () => {
		it('no fixed header: focuses correct item', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			const ariaActiveDescendant = lookup.getElementsByTagName('input')[0].getAttribute('aria-activedescendant');
			expect(ariaActiveDescendant).to.equal('item-1');
		});

		it('with fixed header: focuses correct item', () => {
			const lookup = generateLookup(getLookupWithHeader());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			const ariaActiveDescendant = lookup.getElementsByTagName('input')[0].getAttribute('aria-activedescendant');
			expect(ariaActiveDescendant).to.equal('item-0');
		});

		it('no header: selects correct item', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
			const selected = input.getAttribute('value');
			expect(selected).to.equal('Paper St. Soap Company');
		});

		it('with header: selects correct item', () => {
			const lookup = generateLookup(getLookupWithHeader());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
			const selected = input.getAttribute('value');
			expect(selected).to.equal('Tyrell Corp');
		});

		it('closes lookup menu on esc', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Esc', keyCode: 27, which: 27 });
			const ariaExpanded = lookup.getElementsByClassName('slds-combobox')[0].getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('false');
		});

		it('aria-expanded is false after selecting item', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
			const menu = lookup.getElementsByTagName('ul');
			expect(menu.length).to.equal(0);
		});

		it('focusedItem has correct style', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			const focusedItem = lookup.getElementsByTagName('ul')[0].getElementsByTagName('li')[0];
			expect(focusedItem.className).to.have.string('slds-theme--shade');
		});
	});

	describe('Multiple Select - selecting items work', () => {
		let lookup;
		let input;

		beforeEach(() => {
			lookup = generateLookup(getLookup({ multiple: true }));
			input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
			TestUtils.Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
		});

		afterEach(() => {
			lookup = null;
		});

		it('renders pills', () => {
			const pills = lookup.getElementsByClassName('slds-pill');
			expect(pills.length).to.equal(1);
		});

		it('renders correct input value', () => {
			const value = input.getAttribute('value');
			expect(value).to.equal('1 Option(s) Selected');
		});

		it('deletes pill when clicking remove button', () => {
			const pills = lookup.getElementsByClassName('slds-pill');
			expect(pills.length).to.equal(1);

			const deleteBtn = pills[0].getElementsByTagName('button')[0];
			TestUtils.Simulate.click(deleteBtn);
			expect(pills.length).to.equal(0);
		});

		it('deletes pill on delete/backspace key', () => {
			const pills = lookup.getElementsByClassName('slds-pill');
			const pill1 = lookup.getElementsByClassName('slds-pill')[0];
			expect(pills.length).to.equal(1);

			TestUtils.Simulate.keyDown(input, { key: 'Tab', keyCode: 9, which: 9 });
			TestUtils.Simulate.keyDown(pill1, { key: 'Backspace', keyCode: 8, which: 8 });
			expect(pills.length).to.equal(0);
		});
	});

	describe('expanded', () => {
		let lookup;
		let	input;

		beforeEach(() => {
			lookup = generateLookup(getLookup());
			input = lookup.getElementsByTagName('input')[0];
			Simulate.click(input);
		});

		it('filters its items', () => {
			Simulate.change(input, { target: { value: 'Pa' } });
			expect(getItems(lookup).length).to.equal(3);
		});

		it('filters its items all the way!', () => {
			Simulate.change(input, { target: { value: 'Poof!' } });
			expect(getItems(lookup).length).to.equal(1); // 1 cause of add-item
		});

		it('unfilters its items if no val', () => {
			Simulate.change(input, { target: { value: '' } });
			expect(getItems(lookup).length).to.equal(7);
		});

		it('displays no items when item count is 0', () => {
			Simulate.change(input, { target: { value: 'kdjfksjdf' } });
			expect(getItems(lookup).length).to.equal(1); // add item
			expect(lookup.getElementsByClassName('slds-listbox__option')[0].innerHTML).to.equal('No items found');
		});
	});

	describe('custom filter', () => {
		let lookup;
		let	input;

		beforeEach(() => {
			lookup = generateLookup(getLookup({ filterWith: (text, i) => text === i.label[0] }));
			input = lookup.getElementsByTagName('input')[0];
			Simulate.click(input);
		});

		it('filters its items by case sensitive first letter', () => {
			Simulate.change(input, { target: { value: 'P' } });
			expect(getItems(lookup).length).to.equal(3);
			Simulate.change(input, { target: { value: 'p' } });
			expect(getItems(lookup).length).to.equal(1);
		});
	});
});
