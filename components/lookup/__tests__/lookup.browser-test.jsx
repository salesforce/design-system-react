/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';

import assign from 'lodash.assign';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import SLDSLookup from '../../lookup';
import IconSettings from '../../icon-settings';

import Header from '../../lookup/header';
import Footer from '../../lookup/footer';

const { Simulate } = TestUtils;

describe('SLDSLookup: ', () => {
	const generateLookup = function (lookupInstance) {
		const reactCmp = TestUtils.renderIntoDocument(
			<div>
				<IconSettings iconPath="/assets/icons">{lookupInstance}</IconSettings>
			</div>
		);
		return ReactDOM.findDOMNode(reactCmp);
	};

	const defaultProps = {
		emptyMessage: 'No items found',
		footerRenderer: Footer,
		iconCategory: 'standard',
		iconName: 'account',
		isInline: true,
		label: 'Account',
		onChange(newValue) {
			// console.log('New search term: ', newValue);
		},
		onSelect(item) {
			// console.log(item, ' Selected');
		},
		options: [
			{ label: 'Paddy"s Pub' },
			{ label: 'Tyrell Corp' },
			{ label: 'Paper St. Soap Company' },
			{ label: 'Nakatomi Investments' },
			{ label: 'Acme Landscaping' },
			{ label: 'Acme Construction' },
		],
		silenceDeprecationWarning: true,
	};

	const getLookup = (props = {}) =>
		React.createElement(SLDSLookup, assign({}, defaultProps, props));
	const getLookupWithHeader = (props = { headerRenderer: Header }) =>
		React.createElement(SLDSLookup, assign({}, defaultProps, props));
	const getLookupWithSelection = (props = { selectedItem: 1 }) =>
		React.createElement(SLDSLookup, assign({}, defaultProps, props));

	const getItems = (lookup) =>
		lookup.getElementsByClassName('js-slds-lookup__item');

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
			expect(label.textContent).to.equal('Account');
		});

		it('LookupWithSelection - renders label', () => {
			const lookup = generateLookup(getLookupWithSelection());
			const label = lookup.getElementsByTagName('span')[0];
			expect(label.textContent).to.equal('Account');
		});

		it('isOpen=true renders open dropdown', () => {
			const lookup = generateLookup(getLookup({ isOpen: true }));
			const input = lookup.getElementsByTagName('input')[0];
			const ariaExpanded = input.getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('true');
		});
	});

	describe('accessibility markup passes', () => {
		it('label for matches input id', () => {
			const lookup = generateLookup(getLookup());
			const labelFor = lookup
				.getElementsByTagName('label')[0]
				.getAttribute('for');
			const inputId = lookup
				.getElementsByTagName('input')[0]
				.getAttribute('id');
			expect(labelFor).to.equal(inputId);
		});
	});

	describe('accessibility aria attributes pass', () => {
		it('aria-expanded is false initally', () => {
			const lookup = generateLookup(getLookup());
			const ariaExpanded = lookup
				.getElementsByTagName('input')[0]
				.getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('false');
		});

		it('aria-expanded is true when clicking on input field', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			const ariaExpanded = lookup
				.getElementsByTagName('input')[0]
				.getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('true');
		});

		it('LookupWithSelection - aria-expanded is true when deleting selection', () => {
			const lookup = generateLookup(getLookupWithSelection());
			const deleteBtn = lookup.getElementsByTagName('button')[0];
			TestUtils.Simulate.keyDown(deleteBtn, {
				key: 'Down',
				keyCode: 46,
				which: 46,
			});
			const ariaExpanded = lookup
				.getElementsByTagName('input')[0]
				.getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('true');
		});
	});

	describe('selecting item works', () => {
		it('no fixed header: focuses correct item', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			const ariaActiveDescendant = lookup
				.getElementsByTagName('input')[0]
				.getAttribute('aria-activedescendant');
			expect(ariaActiveDescendant).to.equal('item-1');
		});

		it('with fixed header: focuses correct item', () => {
			const lookup = generateLookup(getLookupWithHeader());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			const ariaActiveDescendant = lookup
				.getElementsByTagName('input')[0]
				.getAttribute('aria-activedescendant');
			expect(ariaActiveDescendant).to.equal('item-0');
		});

		it('no header: selects correct item', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			const selected = lookup
				.getElementsByTagName('a')[0]
				.getElementsByClassName('slds-pill__label')[0].textContent;
			expect(selected).to.equal('Paper St. Soap Company');
		});

		it('with header: selects correct item', () => {
			const lookup = generateLookup(getLookupWithHeader());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			const selected = lookup
				.getElementsByTagName('a')[0]
				.getElementsByClassName('slds-pill__label')[0].textContent;
			expect(selected).to.equal('Tyrell Corp');
		});

		it('closes lookup menu on esc', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, { key: 'Esc', keyCode: 27, which: 27 });
			const ariaExpanded = input.getAttribute('aria-expanded');
			expect(ariaExpanded).to.equal('false');
		});

		it('aria-expanded is false after selecting item', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			TestUtils.Simulate.keyDown(input, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			const menu = lookup.getElementsByTagName('ul');
			expect(menu.length).to.equal(0);
		});

		it('focusedItem has correct style', () => {
			const lookup = generateLookup(getLookup());
			const input = lookup.getElementsByTagName('input')[0];
			TestUtils.Simulate.click(input);
			TestUtils.Simulate.keyDown(input, {
				key: 'Down',
				keyCode: 40,
				which: 40,
			});
			const focusedItem = lookup
				.getElementsByTagName('ul')[0]
				.getElementsByTagName('li')[0];
			expect(focusedItem.className).to.have.string('slds-theme_shade');
		});

		it('isOpen=false prevents dropdown from opening', () => {
			const lookup = generateLookup(getLookup({ isOpen: false }));
			const input = lookup.getElementsByTagName('input')[0];
			expect(input.getAttribute('aria-expanded')).to.equal('false');
			Simulate.click(input);
			expect(input.getAttribute('aria-expanded')).to.equal('false');
		});
	});

	describe('expanded', () => {
		let lookup;
		let input;

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
			expect(
				lookup.getElementsByClassName('slds-lookup__message').length
			).to.equal(0);
			Simulate.change(input, { target: { value: 'kdjfksjdf' } });
			expect(getItems(lookup).length).to.equal(1); // add item
			expect(
				lookup.getElementsByClassName('slds-lookup__message').length
			).to.equal(1);
		});
	});

	describe('custom filter', () => {
		let lookup;
		let input;

		beforeEach(() => {
			lookup = generateLookup(
				getLookup({ filterWith: (text, i) => text === i.label[0] })
			);
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
