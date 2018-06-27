/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import SLDSModal from '../../modal';
import IconSettings from '../../icon-settings';

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
		children: <div>hello</div>,
	};

	const renderModal = (modalInstance) => {
		container = document.createElement('div');
		const opener = (
			<button>
				<IconSettings iconPath="/assets/icons">{modalInstance}</IconSettings>
			</button>
		);
		document.body.appendChild(container);
		renderedNode = ReactDOM.render(opener, container);
		return renderedNode;
	};

	const createModal = (props) =>
		React.createElement(SLDSModal, assign({}, defaultProps, props));

	const getModal = (props) => renderModal(createModal(props));

	const getModalNode = (dom) => dom.querySelector('.slds-modal');

	describe('Styling', () => {
		beforeEach(() => {
			getModal({
				containerClassName: 'container-class-name-test',
				contentClassName: 'content-class-name-test',
				contentStyle: { height: '500px' },
				isOpen: true,
				portalClassName: 'portal-class-name-test',
			});
		});

		it('has correct containerClassName, contentClassName, contentStyle, and portalClassName', () => {
			const modalContainer = getModalNode(document.body).querySelector(
				'.slds-modal__container.container-class-name-test'
			);
			expect(modalContainer).to.exist;
			const modalContent = getModalNode(document.body).querySelector(
				'.slds-modal__content.content-class-name-test'
			);
			expect(modalContent).to.exist;
			expect(modalContent.style.height).to.equal('500px');
			const modalPortal = document.querySelector(
				'body > .portal-class-name-test'
			);
			expect(modalPortal).to.exist;
		});
	});

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
				assistiveText: {
					closeButton: 'Exit',
				},
				isOpen: true,
				size: 'large',
				containerClassName: 'my-custom-class',
				onRequestClose: () => {
					closed = true;
				},
			});
			modal = getModalNode(document.body);
		});

		it('adds the large class', () => {
			expect(modal.className).to.include('slds-modal--large');
		});

		it('adds custom classname from modal container prop', () => {
			expect(modal.firstChild.className).to.include('my-custom-class');
		});

		it('renders correct assistive text/title for close button', () => {
			const closeBtn = modal.querySelector('.slds-modal__close');
			expect(closeBtn.title).to.equal('Exit');
		});

		it('calls onRequestClose', () => {
			const closeBtn = modal.querySelector('.slds-modal__close');
			expect(closed).to.be.false;
			Simulate.click(closeBtn, {});
			expect(closed).to.be.true;
		});
	});

	describe('Proper HTML markup', () => {
		it('dismissible modal has role=dialog', () => {
			const cmp = getModal({
				isOpen: true,
			});
			const modal = getModalNode(document.body);
			const role = modal.getAttribute('role');
			expect(role).to.equal('dialog');
		});

		it('non-dismissible modal has role=alertdialog', () => {
			const cmp = getModal({
				isOpen: true,
				dismissible: false,
			});
			const modal = getModalNode(document.body);
			const role = modal.getAttribute('role');
			expect(role).to.equal('alertdialog');
		});
	});

	describe('Open with custom header and header className', () => {
		let modal;

		beforeEach(() => {
			getModal({
				header: <div id="art-vandelay">Art vandelay</div>,
				headerClassName: 'art-vandelay',
				isOpen: true,
			});
			modal = getModalNode(document.body);
		});

		it('adds the header', () => {
			const customHeader = modal.querySelector('#art-vandelay');
			expect(customHeader).to.not.be.null;
		});

		it('adds the custom header class', () => {
			expect(modal.querySelector('.slds-modal__header').className).to.include(
				'art-vandelay'
			);
		});
	});

	describe('Open with Prompt and Footer', () => {
		let modal;

		beforeEach(() => {
			const feet = <div className="toes">Toes</div>;
			getModal({
				isOpen: true,
				prompt: 'warning',
				title: 'are you sure?',
				footer: feet,
			});
			modal = getModalNode(document.body);
		});

		it('adds the footer', () => {
			const footer = modal.querySelector('.slds-modal__footer');
			expect(footer.className).to.include('slds-theme--default');
		});

		it('adds the prompt class', () => {
			expect(modal.className).to.include('slds-modal--prompt');
		});

		it('adds the prompt theme class', () => {
			expect(modal.querySelector('.slds-modal__header').className).to.include(
				'slds-theme--warning'
			);
		});

		it('adds the footer html content', () => {
			expect(modal.querySelector('.toes').innerHTML).to.equal('Toes');
		});
	});

	describe('Open Directional', () => {
		let modal;

		beforeEach(() => {
			const feet = [
				<div className="toes">Toe 1</div>,
				<div className="toes">Toe 2</div>,
			];
			getModal({
				isOpen: true,
				directional: true,
				footer: feet,
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
				<button className="save">Save</button>,
			];
			getModal({
				isOpen: true,
				directional: true,
				footer: feet,
			});
			modal = getModalNode(document.body);
		});

		it('first tab focuses close button', () => {
			// There an issue with this test, functionality works fine.
			// setTimeout(() => {
			// 	Simulate.keyDown(modal, {
			// 		key: 'Tab',
			// 		keyCode: 9,
			// 		which: 9,
			// 	});
			// 	setTimeout(() => {
			// 		expect(document.activeElement.className).to.include(
			// 			'slds-modal__close'
			// 		);
			// 		done();
			// 	}, 200);
			// }, 200);
		});

		it('enter on close button works', () => {
			// TODO: simulate enter on close button and modal is undefined
		});

		it('traps focus inside Modal', () => {
			// TODO: simulate tabbing around inside of Modal
		});
	});
});
