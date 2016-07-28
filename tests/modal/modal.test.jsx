/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-expressions */

import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import { SLDSModal } from '../../components';

const { Simulate } = TestUtils;

describe('SLDSModal: ', function () {
	let container;
	let renderedNode;

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(container);
		document.body.removeChild(container);
		container = null;
	});

	const defaultProps = {
		align: 'top',
		children: (<div>hello</div>)
	};

	const renderModal = (modalInstance) => {
		container = document.createElement('div');
		const opener = <button>{modalInstance}</button>;
		document.body.appendChild(container);
		renderedNode = ReactDOM.render(opener, container);
		return renderedNode;
	};

	const createModal = (props) => React.createElement(SLDSModal, assign({}, defaultProps, props));

	const getModal = (props) => renderModal(createModal(props));

	const getModalNode = (dom) => dom.querySelector('.slds-modal');

	describe('Closed modal', () => {
		beforeEach(() => {
			getModal({ isOpen: false });
		});

		it('updates the overflow', () => {
			expect(document.body.style.overflow).to.equal('inherit');
		});

		it('does not render to the body', () => {
			expect(getModalNode(document.body)).to.be.null;
		});
	});

	describe('Open modal', () => {
		let cmp;
		let closed;
		let modal;

		beforeEach(() => {
			closed = false;
			cmp = getModal({
				isOpen: true,
				size: 'large',
				containerClassName: 'my-custom-class',
				onRequestClose: () => { closed = true; }
			});
			modal = getModalNode(document.body);
		});

		it('renders a noscript', () => {
			const renderedNoScriptNode = ReactDOM.findDOMNode(cmp);
			expect(renderedNoScriptNode.firstChild.tagName).to.equal('NOSCRIPT');
		});

		it('adds the large class', () => {
			expect(modal.className).to.include('slds-modal--large');
		});

		it('adds custom classname from modal container prop', () => {
			expect(modal.firstChild.className).to.include('my-custom-class');
		});

		it('calls onRequestClose', () => {
			const closeBtn = modal.querySelector('.slds-modal__close');
			expect(closed).to.be.false;
			Simulate.click(closeBtn, {});
			expect(closed).to.be.true;
		});
	});


	describe('Open with Prompt and Footer', () => {
		let modal;

		beforeEach(() => {
			const feet = [<div className="toes">Toes</div>];
			getModal({
				isOpen: true,
				prompt: 'warning',
				footer: feet });
			modal = getModalNode(document.body);
		});

		it('adds the footer', () => {
			const footer = modal.querySelector('.slds-modal__footer');
			expect(footer.className).to.include('slds-theme--default');
		});

		it('adds the prompt class', () => {
			expect(modal.className).to.include('slds-modal--prompt');
		});

		it('adds the prompt class', () => {
			expect(modal.querySelector('.toes').innerHTML).to.equal('Toes');
		});
	});

	describe('Open Directional', () => {
		let modal;

		beforeEach(() => {
			const feet = [<div className="toes">Toes</div>];
			getModal({
				isOpen: true,
				directional: true,
				footer: feet
			});
			modal = getModalNode(document.body);
		});

		it('adds the footer', () => {
			const footer = modal.querySelector('.slds-modal__footer--directional');
			expect(footer.className).to.include('slds-modal__footer');
		});
	});

	describe('Keyboard behavior', () => {
		let modal;

		beforeEach(() => {
			const feet = [
				<button className="cancel">Cancel</button>,
				<button className="save">Save</button>
			];
			getModal({
				isOpen: true,
				directional: true,
				footer: feet
			});
			modal = getModalNode(document.body);
		});

		it('first tab focuses close button', (done) => {
			setTimeout(() => {
				Simulate.keyDown(modal, { key: 'Tab',
					keyCode: 9,
					which: 9
				});
				setTimeout(() => {
					expect(document.activeElement.className).to.include('slds-modal__close');
					done();
				}, 200);
			}, 200);
		});

		it('enter on close button works', () => {
			// TODO: simulate enter on close button and modal is undefined
		});

		it('traps focus inside Modal', () => {
			// TODO: simulate tabbing around inside of Modal
		});
	});
});

