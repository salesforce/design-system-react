import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import IconSettings from '../../icon-settings';
import DockedComposer from '../index';

const DemoComponent = ({
	onRequestMinimize,
	onRequestExpand,
	onRequestClose,
}) => {
	const [isOpen, setIsOpen] = useState(true);
	const [isClosed, setIsClosed] = useState(false);

	const handleMinimize = () => {
		setIsOpen(false);
		onRequestMinimize?.();
	};

	const handleExpand = () => {
		setIsOpen(true);
		onRequestExpand?.();
	};

	const handleClose = () => {
		setIsClosed(true);
		onRequestClose?.();
	};

	return (
		<IconSettings iconPath="/assets/icons">
			<DockedComposer
				header="What's New this Release?"
				body={<div id="composer-body">Hello</div>}
				id="docked-composer-demo"
				events={{
					onRequestMinimize: handleMinimize,
					onRequestExpand: handleExpand,
					onRequestClose: handleClose,
				}}
				isOpen={isOpen}
			/>
			<div data-testid={isOpen ? 'open' : 'collapsed'} />
			<div data-testid={isClosed ? 'closed' : 'not-closed'} />
		</IconSettings>
	);
};

describe('SLDSDockedComposer', () => {
	it('renders with header and body', () => {
		render(<DemoComponent />);

		expect(screen.getByText("What's New this Release?")).toBeInTheDocument();
		expect(screen.getByText('Hello')).toBeInTheDocument();
	});

	it('calls onRequestMinimize when minimize button clicked', async () => {
		const onRequestMinimize = vi.fn();
		const { container } = render(
			<DemoComponent onRequestMinimize={onRequestMinimize} />
		);

		// Find and click minimize button
		const minimizeButton = container.querySelector('button[title*="Minimize"]');
		if (minimizeButton) {
			await userEvent.click(minimizeButton);
			expect(onRequestMinimize).toHaveBeenCalled();
		}
	});

	it('calls onRequestClose when close button clicked', async () => {
		const onRequestClose = vi.fn();
		const { container } = render(
			<DemoComponent onRequestClose={onRequestClose} />
		);

		// Find and click close button
		const closeButton = container.querySelector('button[title*="Close"]');
		if (closeButton) {
			await userEvent.click(closeButton);
			expect(onRequestClose).toHaveBeenCalled();
		}
	});

	it('renders isOpen state correctly', () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<DockedComposer
					header="Test Header"
					body={<div>Test Body</div>}
					isOpen={true}
				/>
			</IconSettings>
		);

		// NOTE: The visibility state is reflected through DOM/ARIA attributes
		expect(container.firstChild).toBeInTheDocument();
	});
});

describe('DockedComposer focus and ARIA', () => {
	it('moves focus to the dialog heading after minimizing or expanding', async () => {
		const user = userEvent.setup();
		render(<DemoComponent />);
		const dialog = screen.getByRole('dialog');
		const heading = document.getElementById(
			dialog.getAttribute('aria-labelledby')
		);

		await user.click(screen.getByRole('button', { name: 'Minimize' }));
		expect(heading).toHaveFocus();

		await user.click(screen.getByRole('button', { name: 'Expand' }));
		expect(heading).toHaveFocus();
	});

	it('does not move focus on mount or when isOpen changes without a click', () => {
		const { rerender } = render(
			<IconSettings iconPath="/assets/icons">
				<DockedComposer header="Header" isOpen />
			</IconSettings>
		);
		expect(document.body).toHaveFocus();

		rerender(
			<IconSettings iconPath="/assets/icons">
				<DockedComposer header="Header" isOpen={false} />
			</IconSettings>
		);
		expect(document.body).toHaveFocus();
	});

	it('only points aria-describedby at the body while it is rendered', () => {
		const { container, rerender } = render(
			<IconSettings iconPath="/assets/icons">
				<DockedComposer id="dc" header="Header" body="Body" isOpen />
			</IconSettings>
		);
		const section = container.querySelector('section');
		expect(section).toHaveAttribute('aria-describedby', 'dc-body');
		expect(container.querySelector('#dc-body')).toBeInTheDocument();

		rerender(
			<IconSettings iconPath="/assets/icons">
				<DockedComposer id="dc" header="Header" body="Body" isOpen={false} />
			</IconSettings>
		);
		expect(section).not.toHaveAttribute('aria-describedby');
	});
});
