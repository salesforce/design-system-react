import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import Popover from '../';
import EditDialog from '../edit-dialog';
import Button from '../../button';
import IconSettings from '../../icon-settings';

const defaultProps = {
	id: 'trigger-popover',
	body: <span>This is the body</span>,
	heading: <span>This is the heading</span>,
};

const renderPopover = (props) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<Popover {...defaultProps} {...props} />
		</IconSettings>
	);

const getPopover = (container) =>
	container.querySelector(`#${defaultProps.id}-popover`);

describe('Popover trigger', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('opens from an element trigger and runs its onClick first', () => {
		const calls = [];
		const { container, getByRole } = renderPopover({
			onOpen: () => calls.push('popover'),
			trigger: <Button label="Open" onClick={() => calls.push('trigger')} />,
		});
		const button = getByRole('button', { name: 'Open' });
		expect(button).toHaveAttribute('aria-haspopup', 'dialog');
		expect(button.id).toBe(defaultProps.id);

		fireEvent.click(button);
		expect(getPopover(container)).toBeInTheDocument();
		expect(calls).toEqual(['trigger', 'popover']);
	});

	it('passes the trigger props to a function trigger', () => {
		const trigger = vi.fn((props) => (
			<button type="button" {...props}>
				Open
			</button>
		));
		const { container, getByRole } = renderPopover({ trigger });
		expect(trigger).toHaveBeenCalledWith(
			expect.objectContaining({
				'aria-haspopup': 'dialog',
				id: defaultProps.id,
				onClick: expect.any(Function),
			})
		);

		fireEvent.click(getByRole('button', { name: 'Open' }));
		expect(getPopover(container)).toBeInTheDocument();
	});

	it('renders children after the trigger', () => {
		const { getByText, getByRole } = renderPopover({
			trigger: <Button label="Open" />,
			children: <span>after</span>,
		});
		expect(
			getByRole('button', { name: 'Open' }).compareDocumentPosition(
				getByText('after')
			) & Node.DOCUMENT_POSITION_FOLLOWING
		).toBeTruthy();
	});

	it('keeps the first child as a deprecated trigger, with a warning', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const { container, getByRole } = render(
			<IconSettings iconPath="/assets/icons">
				<Popover {...defaultProps}>
					<Button label="Legacy" />
				</Popover>
			</IconSettings>
		);
		fireEvent.click(getByRole('button', { name: 'Legacy' }));
		expect(getPopover(container)).toBeInTheDocument();
		expect(
			consoleError.mock.calls.some(([message]) =>
				String(message).includes('Passing the trigger of')
			)
		).toBe(true);
	});
});

describe('EditDialog trigger', () => {
	it('opens from a trigger element', () => {
		const { getByRole } = render(
			<IconSettings iconPath="/assets/icons">
				<EditDialog
					id="edit-dialog-trigger"
					body={<span>Edit body</span>}
					trigger={<Button label="Edit" />}
				/>
			</IconSettings>
		);
		fireEvent.click(getByRole('button', { name: 'Edit' }));
		expect(
			document.querySelector('#edit-dialog-trigger-popover')
		).toBeInTheDocument();
	});

	it('defaults to an edit button', () => {
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<EditDialog id="edit-dialog-default" body={<span>Edit body</span>} />
			</IconSettings>
		);
		expect(container.querySelector('#edit-dialog-default')).toHaveAttribute(
			'aria-haspopup',
			'dialog'
		);
	});
});
