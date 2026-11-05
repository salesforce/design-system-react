import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import EditDialog from '../edit-dialog';
import IconSettings from '../../icon-settings';

const renderEditDialog = (props) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<EditDialog
				id="edit-dialog"
				ariaLabelledby="edit-dialog-heading"
				body={<p id="edit-dialog-heading">Edit status</p>}
				isOpen
				{...props}
			/>
		</IconSettings>
	);

describe('EditDialog', () => {
	it('passes the click event and isModified to onCancel', () => {
		const onCancel = vi.fn();
		renderEditDialog({ onCancel });

		fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

		const [event, data] = onCancel.mock.calls[0];
		expect(event).toEqual(expect.objectContaining({ type: 'click' }));
		expect(data).toEqual({ isModified: false });
	});

	it('passes the click event and isModified to onSave', () => {
		const onSave = vi.fn();
		renderEditDialog({ onSave, isModified: true });

		fireEvent.click(screen.getByRole('button', { name: 'Save' }));

		const [event, data] = onSave.mock.calls[0];
		expect(event).toEqual(expect.objectContaining({ type: 'click' }));
		expect(data).toEqual({ isModified: true });
	});
});
