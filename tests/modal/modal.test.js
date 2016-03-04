/* global describe, it, before, after, beforeEach, afterEach */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import { expect } from 'chai';
import assign from 'lodash.assign';
import { Modal } from '../../src/react/dist';

const { Simulate,
				scryRenderedDOMComponentsWithClass,
				findRenderedDOMComponentWithTag,
				findRenderedDOMComponentWithClass } = TestUtils;
chai.should();

describe('Modal: ', function(){
	let body, opener;

	afterEach(() => {
		document.body.removeChild(body)
		Array.prototype.forEach.call(document.body.querySelectorAll('.ReactModalPortal'), c => document.body.removeChild(c))
	})

	const defaultProps = {align: "top", isOpen: false}

	const renderModal = inst => {
		body = document.createElement('div');
		opener = <button>{inst}</button>
		document.body.appendChild(body)
		return ReactDOM.render(opener, body)
	}

	const createModal = props => React.createElement(Modal, assign({}, defaultProps, props))

	const getModal = ps => renderModal(createModal(ps))

	const getModalNode = dom => dom.querySelector('.slds-modal')

	describe('Closed modal', () => {
		let cmp;

		beforeEach(() => {
			cmp = getModal({isOpen: false})
		})

		it('updates the overflow', () => {
			expect(document.body.style.overflow).to.equal('inherit')
		})

		it('does not render to the body', () => {
			expect(getModalNode(document.body)).to.be.null
		})
	})

	describe('Open modal', () => {
		let cmp, closed, modal;

		beforeEach(() => {
			closed = false;
			cmp = getModal({isOpen: true, size: 'large', onRequestClose: () => closed = true})
			modal = getModalNode(document.body)
		})

		it('renders a noscript', () => {
			const renderedNode = React.findDOMNode(cmp)
			expect(renderedNode.firstChild.tagName).to.equal('NOSCRIPT')
		})

		it('adds the large class', () => {
			expect(modal.className).to.include('slds-modal--large')
		})

		it('calls onRequestClose', () => {
			const close_btn = modal.querySelector('.slds-modal__close')
			expect(closed).to.be.false
			Simulate.click(close_btn, {})
			expect(closed).to.be.true
		})
	})


	describe('Open with Prompt and Footer', () => {
		let cmp, modal;

		beforeEach(() => {
			const feet = [<div className="toes">Toes</div>]
			cmp = getModal({isOpen: true, prompt: 'warning', footer:feet })
			modal = getModalNode(document.body)
		})

		it('adds the footer', () => {
			const footer = modal.querySelector('.slds-modal__footer')
			expect(footer.className).to.include('slds-theme--default')
		})

		it('adds the prompt class', () => {
			expect(modal.className).to.include('slds-modal--prompt')
		})

		it('adds the prompt class', () => {
			expect(modal.querySelector('.toes').innerHTML).to.equal('Toes')
		})
	})

	describe('Open Directional', () => {
		let cmp, modal;

		beforeEach(() => {
			const feet = [<div className="toes">Toes</div>]
			cmp = getModal({isOpen: true, directional: true, footer: feet})
			modal = getModalNode(document.body)
		})

		it('adds the footer', () => {
			const footer = modal.querySelector('.slds-modal__footer--directional')
			expect(footer.className).to.include('slds-modal__footer')
		})
	})
})
