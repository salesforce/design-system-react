import { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import EditDialog from '../edit-dialog';
import IconSettings from '../../icon-settings';

describe('EditDialog', () => {
	it("calls a consumer's onOpen, onRequestClose and onClose alongside its own", () => {
		const onOpen = vi.fn();
		const onRequestClose = vi.fn();
		const onClose = vi.fn();
		const ref = createRef();
		const { container } = render(
			<IconSettings iconPath="/assets/icons">
				<EditDialog
					ref={ref}
					id="edit-dialog"
					body="Body"
					onOpen={onOpen}
					onRequestClose={onRequestClose}
					onClose={onClose}
				/>
			</IconSettings>
		);
		const trigger = container.querySelector('#edit-dialog');

		fireEvent.click(trigger);
		expect(document.querySelector('#edit-dialog-popover')).toBeInTheDocument();
		expect(onOpen).toHaveBeenCalledTimes(1);
		// EditDialog's own handler still ran
		expect(ref.current.state.isOpen).toBe(true);

		fireEvent.click(trigger);
		expect(onRequestClose).toHaveBeenCalledTimes(1);
		expect(onRequestClose.mock.calls[0][1]).toEqual({
			trigger: 'triggerClick',
		});
		expect(
			document.querySelector('#edit-dialog-popover')
		).not.toBeInTheDocument();
		expect(onClose).toHaveBeenCalledTimes(1);
		expect(ref.current.state.isOpen).toBe(false);
	});
});
