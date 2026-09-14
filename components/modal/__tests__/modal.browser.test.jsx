import { render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

import Modal from '../';
import Button from '../../button';
import IconSettings from '../../icon-settings';
import Settings from '../../settings';

// Browser-mode counterparts of the modal focus tests that jsdom cannot run:
// jsdom neither moves focus on Tab nor synthesizes a click from Enter on a
// focused button, and it can't enforce a focus trap. These run in real Chromium
// (see vitest.config.ts `browser` project) where those behaviors are genuine.
describe('SLDSModal (browser)', () => {
	let appNode;

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

	const renderModal = (props = {}) =>
		render(
			<IconSettings iconPath="/assets/icons">
				<Modal isOpen heading="Test modal" {...props}>
					<div>hello</div>
				</Modal>
			</IconSettings>
		);

	const getCloseButton = () =>
		document.body.querySelector('button.slds-modal__close');

	it('moves focus into the modal when it opens', async () => {
		renderModal();

		// react-modal moves focus to its content container on open (the
		// `.ReactModal__Content` wrapper, which is the ancestor of `.slds-modal`).
		// Assert focus left <body> and landed on/within that container.
		const content = document.body.querySelector('.ReactModal__Content');
		await vi.waitFor(() => {
			expect(content).toBeTruthy();
			const active = document.activeElement;
			expect(content === active || content.contains(active)).toBe(true);
			expect(active).not.toBe(document.body);
		});
	});

	it('activates the close button with the Enter key', async () => {
		const onRequestClose = vi.fn();
		renderModal({ onRequestClose });

		const closeButton = getCloseButton();
		closeButton.focus();
		expect(document.activeElement).toBe(closeButton);

		await userEvent.keyboard('{Enter}');

		expect(onRequestClose).toHaveBeenCalled();
	});

	it('traps focus inside the modal when tabbing', async () => {
		renderModal({
			footer: [
				<Button key="cancel" label="Cancel" />,
				<Button key="save" label="Save" variant="brand" />,
			],
		});

		const content = document.body.querySelector('.ReactModal__Content');

		// Tab several times; focus must never escape the modal content subtree.
		for (let i = 0; i < 8; i += 1) {
			// eslint-disable-next-line no-await-in-loop
			await userEvent.keyboard('{Tab}');
			expect(content.contains(document.activeElement)).toBe(true);
		}
	});
});
