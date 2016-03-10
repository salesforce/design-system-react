/* global describe, it, before, after, beforeEach, afterEach */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { expect } from 'chai';
import assign from 'lodash/object/assign';
import { Dropdown } from '../../src';

const { Simulate,
				scryRenderedDOMComponentsWithClass,
				findRenderedDOMComponentWithTag,
				findRenderedDOMComponentWithClass } = TestUtils;
chai.should();

describe('Dropdown: ', function(){

	let body;
	const options = [
		{label:'A super short',value:'A'},
		{label:'B Option Super Super Long',value:'B'}
	]

	const renderDropdown = inst => {
		body = document.createElement('div');
		document.body.appendChild(body)
		return ReactDOM.render(inst, body)
	}

	const defaultProps = {
		label: "Contacts",
		modal: false,
		options: options,
		placeholder: "Select a contact",
		value: 'C0'
	}

	const createDropdown = props => React.createElement(Dropdown, assign({}, defaultProps, props))

	const dropItDown = ps => renderDropdown(createDropdown(ps))

	const getMenu = dom => dom.querySelector('.slds-dropdown--menu')

	describe('Hoverable', () => {
		let cmp, btn;

		beforeEach(() => {
			cmp = dropItDown({buttonClassName: 'dijkstrafied', openOn: 'hover'})
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
		})

		it('gives the button correct aria properties', () => {
			expect(btn.props['aria-haspopup']).to.equal("true")
		})

		it('sets the label', () => {
			expect(btn.innerText).to.equal("Contacts")
		})

		it('preseves the className', () => {
			expect(btn.className).to.include("dijkstrafied")
		})

		it('expands the dropdown on hover', () => {
			expect(getMenu(body)).to.equal(null)
			Simulate.mouseEnter(btn, {})
			expect(getMenu(body).className).to.include('slds-dropdown')
			Simulate.mouseLeave(btn, {})
		})

		it('closes on blur based on timeout delay', (done) => {
			expect(getMenu(body)).to.equal(null)
			Simulate.mouseEnter(btn, {})
			Simulate.mouseLeave(btn)
			expect(getMenu(body)).to.not.equal(null)
			setTimeout(() => {
				expect(getMenu(body)).to.equal(null)
				done()
			}, 600)
		})

		it('doesn\'t close on quick hover outside', (done) => {
			expect(getMenu(body)).to.equal(null)
			Simulate.mouseEnter(btn, {})
			Simulate.mouseLeave(btn)
			setTimeout(() => {
				expect(getMenu(body)).to.not.equal(null)
				setTimeout(() => {
					expect(getMenu(body)).to.equal(null)
					done()
				}, 600)
			}, 100)
		})
	})

	describe('Clickable', () => {
		let cmp, btn, clicked;

		beforeEach(() => {
			clicked = false;
			cmp = dropItDown({openOn: 'click', onClick: () => clicked = true })
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
		})

		it('doesnt expand on hover', () => {
			expect(getMenu(body)).to.equal(null)
			Simulate.mouseEnter(btn, {})
			expect(getMenu(body)).to.equal(null)
		})

		it('expands/contracts on click', () => {
			expect(getMenu(body)).to.equal(null)
			Simulate.click(btn, {})
			expect(getMenu(body).className).to.include('slds-dropdown')
			Simulate.click(btn, {})
			expect(getMenu(body)).to.equal(null)
		})

		it('preserves click behavior', (done) => {
			expect(clicked).to.be.false
			Simulate.click(btn, {})
			expect(clicked).to.be.true
			Simulate.click(btn, {}) //cleanup
			setTimeout(() => done(), 600)
		})
	})
	describe('Expanded', () => {
		let cmp, btn, selected;

		beforeEach(() => {
			selected = false;
			cmp = dropItDown({openOn: 'click', onSelect: i => selected = i })
			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
		})

		it('selects an item', () => {
			Simulate.click(btn, {})
			expect(selected).to.be.false
			const items = getMenu(body).querySelectorAll('.slds-dropdown__item')
			Simulate.click(items[1].querySelector('a'), {})
			expect(selected.value).to.equal('B')
		})

	})

})
