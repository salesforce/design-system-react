import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import PanelFilterGroup from '../filtering/group';
import IconSettings from '../../icon-settings';

const renderGroup = (props) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<PanelFilterGroup variant="panel" {...props} />
		</IconSettings>
	);

const expectCall = (handler, action) => {
	const [event, data] = handler.mock.calls[0];
	expect(event).toEqual(expect.objectContaining({ type: 'click' }));
	expect(data).toEqual({ action });
};

describe('PanelFilterGroup', () => {
	it('passes the click event and the action to the footer callbacks', () => {
		const onClickAdd = vi.fn();
		const onClickRemoveAll = vi.fn();
		renderGroup({ onClickAdd, onClickRemoveAll });

		fireEvent.click(screen.getByRole('button', { name: 'Add Filter' }));
		fireEvent.click(screen.getByRole('button', { name: 'Remove All' }));

		expectCall(onClickAdd, 'add');
		expectCall(onClickRemoveAll, 'remove-all');
	});

	it('passes the click event and the action to onRequestClose', () => {
		const onRequestClose = vi.fn();
		renderGroup({ onRequestClose });

		fireEvent.click(screen.getByRole('button', { name: 'Close Filter Panel' }));

		expectCall(onRequestClose, 'close');
	});

	it('passes the click event and the action to onRequestCancel and onRequestSave', () => {
		const onRequestCancel = vi.fn();
		const onRequestSave = vi.fn();
		renderGroup({ modified: true, onRequestCancel, onRequestSave });

		fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		fireEvent.click(screen.getByRole('button', { name: 'Save' }));

		expectCall(onRequestCancel, 'cancel');
		expectCall(onRequestSave, 'save');
	});
});
