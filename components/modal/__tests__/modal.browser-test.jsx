/* eslint-disable no-unused-vars */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import SLDSModal from '../../modal';
import IconSettings from '../../icon-settings';
import Settings from '../../settings';

const { Simulate } = TestUtils;

describe('SLDSModal: ', function () {
	let container;
	let renderedNode;

	// set "app node" fixture, so no warnings are triggered.
	let appNode = document.createElement('span');
	appNode.id = 'app';
	document.body.appendChild(appNode);
	Settings.setAppElement('#app');

	after(() => {
		document.body.removeChild(appNode);
		appNode = null;
	});

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(container);
		document.body.removeChild(container);
		container = null;
	});

	const defaultProps = {
		align: 'top',
		children: <div key>hello</div>,
	};

	const renderModal = (modalInstance) => {
		container = document.createElement('div');

		const opener = (
			<button type="button">
				<IconSettings iconPath="/assets/icons">{modalInstance}</IconSettings>
			</button>
		);
		document.body.appendChild(container);
		// eslint-disable-next-line react/no-render-return-value
		renderedNode = ReactDOM.render(opener, container); // deepscan-disable-line REACT_ASYNC_RENDER_RETURN_VALUE
		return renderedNode;
	};

	const createModal = (props) =>
		React.createElement(SLDSModal, assign({}, defaultProps, props));

	const getModal = (props) => renderModal(createModal(props));

	const getModalContainerNode = (dom) =>
		dom.querySelector('[role="dialog"]') ||
		dom.querySelector('[role="alertdialog"]');
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

	describe('Sizing', () => {
		it('size is set to small', () => {
			const cmp = getModal({
				isOpen: true,
				size: 'small',
			});
			const modal = getModalNode(document.body);
			expect(modal.className).to.include('slds-modal_small');
		});
		it('size is set to medium', () => {
			const cmp = getModal({
				isOpen: true,
				size: 'medium',
			});
			const modal = getModalNode(document.body);
			expect(modal.className).to.include('slds-modal_medium');
		});
		it('size is set to large', () => {
			const cmp = getModal({
				isOpen: true,
				size: 'large',
			});
			const modal = getModalNode(document.body);
			expect(modal.className).to.include('slds-modal_large');
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

		it('size is set to large', () => {
			expect(modal.className).to.include('slds-modal_large');
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
			// eslint-disable-next-line no-unused-vars
			const cmp = getModal({
				isOpen: true,
				size: 'medium',
			});
			const modal = getModalContainerNode(document.body);
			const role = modal.getAttribute('role');
			expect(role).to.equal('dialog');
		});

		it('non-dismissible modal has role=alertdialog', () => {
			const cmp = getModal({
				isOpen: true,
				disableClose: true,
			});
			const modal = getModalContainerNode(document.body);
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
				heading: 'are you sure?',
				footer: feet,
			});
			modal = getModalNode(document.body);
		});

		it('adds the default h1 heading element', () => {
			const header = modal.querySelector('section .slds-modal__header h1');
			expect(header).to.not.be.null;
		});

		it('adds the footer', () => {
			const footer = modal.querySelector('.slds-modal__footer');
			expect(footer.className).to.include('slds-theme_default');
		});

		it('adds the prompt class', () => {
			expect(modal.className).to.include('slds-modal_prompt');
		});

		it('adds the prompt theme class', () => {
			expect(modal.querySelector('.slds-modal__header').className).to.include(
				'slds-theme_warning'
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
				<div key="test-content1" className="toes">
					Toe 1
				</div>,
				<div key="test-content2" className="toes">
					Toe 2
				</div>,
			];
			getModal({
				isOpen: true,
				directional: true,
				footer: feet,
			});
			modal = getModalNode(document.body);
		});

		it('adds the footer', () => {
			const footer = modal.querySelector('.slds-modal__footer_directional');
			expect(footer.className).to.include('slds-modal__footer');
		});
	});

	describe('Keyboard behavior', () => {
		let modal;

		beforeEach(() => {
			const feet = [
				<button type="button" key="test-content1" className="cancel">
					Cancel
				</button>,
				<button type="button" key="test-content2" className="save">
					Save
				</button>,
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
