import { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
	describe,
	it,
	expect,
	vi,
	beforeAll,
	afterAll,
	afterEach,
} from 'vitest';

import Modal from '../';
import IconSettings from '../../icon-settings';
import Settings from '../../settings';

describe('SLDSModal', () => {
	let appNode;

	// Set "app node" fixture, so no warnings are triggered
	beforeAll(() => {
		appNode = document.createElement('span');
		appNode.id = 'app';
		document.body.appendChild(appNode);
		Settings.setAppElement('#app');
	});

	afterAll(() => {
		if (appNode && document.body.contains(appNode)) {
			document.body.removeChild(appNode);
		}
	});

	const defaultProps = {
		align: 'top',
		children: <div key="test">hello</div>,
	};

	const renderModal = (props = {}) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Modal {...defaultProps} {...props} />
			</IconSettings>
		);
	};

	// NOTE: Modal uses react-modal which renders into document.body via portal,
	// so we query document.body, not just the returned container
	const getModalNode = () => document.body.querySelector('.slds-modal');
	const getModalContainerNode = () =>
		document.body.querySelector('[role="dialog"]') ||
		document.body.querySelector('[role="alertdialog"]');

	describe('Styling', () => {
		it('has correct classNameContainer, classNameContent, styleContent, and classNamePortal', () => {
			renderModal({
				classNameContainer: 'container-class-name-test',
				classNameContent: 'content-class-name-test',
				styleContent: { height: '500px' },
				isOpen: true,
				classNamePortal: 'portal-class-name-test',
			});

			const modalContainer = getModalNode().querySelector(
				'.slds-modal__container.container-class-name-test'
			);
			expect(modalContainer).toBeInTheDocument();

			const modalContent = getModalNode().querySelector(
				'.slds-modal__content.content-class-name-test'
			);
			expect(modalContent).toBeInTheDocument();
			expect(modalContent).toHaveStyle({ height: '500px' });

			const modalPortal = document.body.querySelector(
				'.portal-class-name-test'
			);
			expect(modalPortal).toBeInTheDocument();
		});
	});

	describe('Deprecated class and style props', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('still apply, merged with the new props, and warn', async () => {
			// Fresh modules so the once-per-session warning state is reset
			vi.resetModules();
			const { default: FreshModal } = await import('../');
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			render(
				<FreshModal
					ariaHideApp={false}
					classNameContent="new-content"
					containerClassName="old-container"
					contentClassName="old-content"
					contentStyle={{ height: '200px', width: '50px' }}
					footer={<button type="button">OK</button>}
					footerClassName="old-footer"
					heading="Heading"
					headerClassName="old-header"
					isOpen
					portalClassName="old-portal"
					styleContent={{ height: '300px' }}
				>
					hello
				</FreshModal>
			);

			const modal = getModalNode();
			expect(modal.querySelector('.slds-modal__container')).toHaveClass(
				'old-container'
			);
			const content = modal.querySelector('.slds-modal__content');
			expect(content).toHaveClass('old-content', 'new-content');
			expect(content).toHaveStyle({ height: '300px', width: '50px' });
			expect(modal.querySelector('.slds-modal__header')).toHaveClass(
				'old-header'
			);
			expect(modal.querySelector('.slds-modal__footer')).toHaveClass(
				'old-footer'
			);
			expect(document.body.querySelector('.old-portal')).toBeInTheDocument();

			const messages = consoleError.mock.calls.map((call) => call.join(' '));
			[
				['containerClassName', 'classNameContainer'],
				['contentClassName', 'classNameContent'],
				['contentStyle', 'styleContent'],
				['footerClassName', 'classNameFooter'],
				['headerClassName', 'classNameHeader'],
				['portalClassName', 'classNamePortal'],
			].forEach(([oldProp, newProp]) => {
				expect(
					messages.some(
						(m) =>
							m.includes(`\`${oldProp}\` will be removed`) &&
							m.includes(`Use \`${newProp}\` instead.`)
					)
				).toBe(true);
			});
		});
	});

	describe('ref', () => {
		it('forwards ref to the root section.slds-modal element', () => {
			const ref = createRef();
			renderModal({ isOpen: true, ref });
			expect(ref.current).toBe(getModalNode());
			expect(ref.current.tagName).toBe('SECTION');
		});
	});

	describe('Sizing', () => {
		it('size is set to small', () => {
			renderModal({
				isOpen: true,
				size: 'small',
			});
			const modal = getModalNode();
			expect(modal).toHaveClass('slds-modal_small');
		});

		it('size is set to medium', () => {
			renderModal({
				isOpen: true,
				size: 'medium',
			});
			const modal = getModalNode();
			expect(modal).toHaveClass('slds-modal_medium');
		});

		it('size is set to large', () => {
			renderModal({
				isOpen: true,
				size: 'large',
			});
			const modal = getModalNode();
			expect(modal).toHaveClass('slds-modal_large');
		});
	});

	describe('Closed modal', () => {
		it('updates the overflow', () => {
			renderModal({ isOpen: false });
			expect(document.body.style.overflow).toBe('inherit');
		});

		it('does not render to the body', () => {
			renderModal({ isOpen: false });
			expect(getModalNode()).not.toBeInTheDocument();
		});
	});

	describe('Open modal', () => {
		it('size is set to large', () => {
			renderModal({
				isOpen: true,
				size: 'large',
			});
			const modal = getModalNode();
			expect(modal).toHaveClass('slds-modal_large');
		});

		it('adds custom classname from modal container prop', () => {
			renderModal({
				isOpen: true,
				classNameContainer: 'my-custom-class',
			});
			const modal = getModalNode();
			expect(modal.firstChild).toHaveClass('my-custom-class');
		});

		it('renders correct assistive text/title for close button', () => {
			renderModal({
				assistiveText: {
					closeButton: 'Exit',
				},
				isOpen: true,
			});
			const modal = getModalNode();
			const closeBtn = modal.querySelector('.slds-modal__close');
			expect(closeBtn).toHaveAttribute('title', 'Exit');
		});

		it('calls onRequestClose', () => {
			const onRequestClose = vi.fn();
			renderModal({
				isOpen: true,
				onRequestClose,
			});
			const modal = getModalNode();
			const closeBtn = modal.querySelector('.slds-modal__close');
			fireEvent.click(closeBtn);
			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event).toEqual(expect.objectContaining({ type: 'click' }));
			expect(data).toEqual({ trigger: 'close-button' });
		});

		it('calls onRequestClose with trigger "click-outside" when clicking outside the container', () => {
			const onRequestClose = vi.fn();
			renderModal({
				isOpen: true,
				onRequestClose,
			});
			fireEvent.click(getModalNode());
			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event).toEqual(expect.objectContaining({ type: 'click' }));
			expect(data).toEqual({ trigger: 'click-outside' });
		});

		it('calls onRequestClose with trigger "click-outside" when react-modal reports an overlay click', () => {
			const onRequestClose = vi.fn();
			renderModal({
				isOpen: true,
				onRequestClose,
			});
			fireEvent.click(document.body.querySelector('.ReactModal__Overlay'));
			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event).toEqual(expect.objectContaining({ type: 'click' }));
			expect(data).toEqual({ trigger: 'click-outside' });
		});

		it('does not call onRequestClose for clicks inside the modal content', () => {
			const onRequestClose = vi.fn();
			renderModal({
				isOpen: true,
				onRequestClose,
			});
			fireEvent.click(getModalNode().querySelector('.slds-modal__content'));
			expect(onRequestClose).not.toHaveBeenCalled();
		});

		it('does not call onRequestClose on outside click when dismissOnClickOutside is false', () => {
			const onRequestClose = vi.fn();
			renderModal({
				isOpen: true,
				dismissOnClickOutside: false,
				onRequestClose,
			});
			fireEvent.click(getModalNode());
			expect(onRequestClose).not.toHaveBeenCalled();
		});

		it('does not call onRequestClose on Escape or outside click when disableClose is set', () => {
			const onRequestClose = vi.fn();
			renderModal({
				isOpen: true,
				disableClose: true,
				onRequestClose,
			});
			fireEvent.keyDown(getModalNode(), { key: 'Escape', keyCode: 27 });
			fireEvent.click(getModalNode());
			expect(onRequestClose).not.toHaveBeenCalled();
		});
	});

	describe('Proper HTML markup', () => {
		it('dismissible modal has role=dialog', () => {
			renderModal({
				isOpen: true,
				size: 'medium',
			});
			const modal = getModalContainerNode();
			expect(modal).toHaveAttribute('role', 'dialog');
		});

		it('non-dismissible modal has role=alertdialog', () => {
			renderModal({
				isOpen: true,
				disableClose: true,
			});
			const modal = getModalContainerNode();
			expect(modal).toHaveAttribute('role', 'alertdialog');
		});
	});

	describe('Open with custom header and header className', () => {
		it('adds the header', () => {
			renderModal({
				header: <div id="art-vandelay">Art vandelay</div>,
				isOpen: true,
			});
			const modal = getModalNode();
			const customHeader = modal.querySelector('#art-vandelay');
			expect(customHeader).toBeInTheDocument();
		});

		it('adds the custom header class', () => {
			renderModal({
				header: <div id="art-vandelay">Art vandelay</div>,
				classNameHeader: 'art-vandelay',
				isOpen: true,
			});
			const modal = getModalNode();
			const header = modal.querySelector('.slds-modal__header');
			expect(header).toHaveClass('art-vandelay');
		});
	});

	describe('Open with Prompt and Footer', () => {
		it('adds the default h1 heading element', () => {
			renderModal({
				isOpen: true,
				prompt: 'warning',
				heading: 'are you sure?',
				footer: <div className="toes">Toes</div>,
			});
			const modal = getModalNode();
			const header = modal.querySelector('section .slds-modal__header h1');
			expect(header).toBeInTheDocument();
		});

		it('adds the footer', () => {
			renderModal({
				isOpen: true,
				prompt: 'warning',
				heading: 'are you sure?',
				footer: <div className="toes">Toes</div>,
			});
			const modal = getModalNode();
			const footer = modal.querySelector('.slds-modal__footer');
			expect(footer).toHaveClass('slds-theme_default');
		});

		it('adds the prompt class', () => {
			renderModal({
				isOpen: true,
				prompt: 'warning',
				heading: 'are you sure?',
				footer: <div className="toes">Toes</div>,
			});
			const modal = getModalNode();
			expect(modal).toHaveClass('slds-modal_prompt');
		});

		it('adds the prompt theme class', () => {
			renderModal({
				isOpen: true,
				prompt: 'warning',
				heading: 'are you sure?',
				footer: <div className="toes">Toes</div>,
			});
			const modal = getModalNode();
			const header = modal.querySelector('.slds-modal__header');
			expect(header).toHaveClass('slds-theme_warning');
		});

		it('adds the footer html content', () => {
			renderModal({
				isOpen: true,
				prompt: 'warning',
				heading: 'are you sure?',
				footer: <div className="toes">Toes</div>,
			});
			const modal = getModalNode();
			const toes = modal.querySelector('.toes');
			expect(toes).toHaveTextContent('Toes');
		});
	});

	describe('Open Directional', () => {
		it('adds the footer', () => {
			const feet = [
				<div key="test-content1" className="toes">
					Toe 1
				</div>,
				<div key="test-content2" className="toes">
					Toe 2
				</div>,
			];
			renderModal({
				isOpen: true,
				directional: true,
				footer: feet,
			});
			const modal = getModalNode();
			const footer = modal.querySelector('.slds-modal__footer_directional');
			expect(footer).toHaveClass('slds-modal__footer');
		});
	});

	describe('Keyboard behavior', () => {
		it('closes on the Escape key', () => {
			const onRequestClose = vi.fn();
			renderModal({
				isOpen: true,
				dismissible: true,
				onRequestClose,
			});

			const modal = getModalNode();
			fireEvent.keyDown(modal, { key: 'Escape', keyCode: 27 });

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event).toEqual(
				expect.objectContaining({ type: 'keydown', key: 'Escape' })
			);
			expect(data).toEqual({ trigger: 'escape' });
		});

		// Real browser focus behavior (focus-on-open, Enter-activates-button,
		// focus trap) is covered in `modal.browser.test.jsx` under the Vitest
		// `browser` project — jsdom cannot move focus on Tab or synthesize a click
		// from Enter on a focused <button>. (Escape-to-close, above, is a keyboard
		// path jsdom *can* test.)
	});
});
