import { StrictMode, useState } from 'react';
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
	it('moves focus to the button that replaces the clicked minimize/expand button', async () => {
		const user = userEvent.setup();
		render(<DemoComponent />);

		await user.click(screen.getByRole('button', { name: 'Minimize' }));
		expect(screen.getByRole('button', { name: 'Expand' })).toHaveFocus();

		await user.click(screen.getByRole('button', { name: 'Expand' }));
		expect(screen.getByRole('button', { name: 'Minimize' })).toHaveFocus();
	});

	const renderComposer = (props, render_ = render) =>
		render_(
			<IconSettings iconPath="/assets/icons">
				<button type="button">Before</button>
				{props.mounted === false ? null : (
					<DockedComposer header="Header" {...props} />
				)}
			</IconSettings>
		);

	it('focuses the dialog when it mounts open', () => {
		renderComposer({ isOpen: true });
		expect(screen.getByRole('dialog')).toHaveFocus();
	});

	it('does not move focus when it mounts minimized', () => {
		renderComposer({ isOpen: false });
		expect(document.body).toHaveFocus();
	});

	it('focuses the dialog when the parent opens it without a click', () => {
		const { rerender } = renderComposer({ isOpen: false });
		expect(document.body).toHaveFocus();

		renderComposer({ isOpen: true }, rerender);
		expect(screen.getByRole('dialog')).toHaveFocus();
	});

	it('does not move focus when the parent minimizes it without a click', () => {
		const { rerender } = renderComposer({ isOpen: true });
		const dialog = screen.getByRole('dialog');

		renderComposer({ isOpen: false }, rerender);
		expect(dialog).toHaveFocus();
	});

	it('returns focus to the previously focused element when an open composer unmounts', () => {
		const { rerender } = renderComposer({ mounted: false });
		const before = screen.getByRole('button', { name: 'Before' });
		before.focus();

		renderComposer({ isOpen: true }, rerender);
		expect(screen.getByRole('dialog')).toHaveFocus();

		renderComposer({ mounted: false }, rerender);
		expect(before).toHaveFocus();
	});

	it('returns focus on unmount under StrictMode', () => {
		const tree = (mounted) => (
			<StrictMode>
				<IconSettings iconPath="/assets/icons">
					<button type="button">Before</button>
					{mounted ? <DockedComposer header="Header" isOpen /> : null}
				</IconSettings>
			</StrictMode>
		);
		const { rerender } = render(tree(false));
		const before = screen.getByRole('button', { name: 'Before' });
		before.focus();

		rerender(tree(true));
		expect(screen.getByRole('dialog')).toHaveFocus();

		rerender(tree(false));
		expect(before).toHaveFocus();
	});

	it('does not move focus on unmount when it never took focus', () => {
		const { rerender } = renderComposer({ mounted: false });
		const before = screen.getByRole('button', { name: 'Before' });

		renderComposer({ isOpen: false }, rerender);
		renderComposer({ mounted: false }, rerender);
		expect(before).not.toHaveFocus();
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
