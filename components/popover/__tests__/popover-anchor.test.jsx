import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Popover from '../';
import IconSettings from '../../icon-settings';

// A walkthrough step that points at part of the page (here a toolbar) rather
// than at a button that opens it
const renderWalkthrough = (props = {}) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<Popover
				body="Use the toolbar to filter and sort the records in this card."
				heading="The card toolbar"
				id="walkthrough-step"
				openOn="none"
				stepText="Step 2 of 4"
				variant="walkthrough"
				{...props}
			>
				<div className="toolbar" data-testid="toolbar" role="toolbar">
					Toolbar
				</div>
			</Popover>
		</IconSettings>
	);

describe('Popover openOn="none"', () => {
	it('leaves the anchor as it is', () => {
		const { getByTestId } = renderWalkthrough({ isOpen: true });
		const toolbar = getByTestId('toolbar');

		expect(toolbar).not.toHaveAttribute('id');
		expect(toolbar).not.toHaveAttribute('aria-haspopup');
		expect(toolbar).not.toHaveAttribute('tabindex');
		expect(toolbar).toHaveAttribute('role', 'toolbar');
	});

	it('opens and closes only through isOpen', () => {
		const onRequestOpen = vi.fn();
		const { getByTestId, rerender, container } = renderWalkthrough({
			isOpen: false,
			onRequestOpen,
		});

		fireEvent.click(getByTestId('toolbar'));
		fireEvent.focus(getByTestId('toolbar'));
		fireEvent.mouseEnter(getByTestId('toolbar'));
		expect(onRequestOpen).not.toHaveBeenCalled();
		expect(
			container.querySelector('#walkthrough-step-popover')
		).not.toBeInTheDocument();

		rerender(
			<IconSettings iconPath="/assets/icons">
				<Popover
					body="Use the toolbar to filter and sort the records in this card."
					heading="The card toolbar"
					id="walkthrough-step"
					isOpen
					openOn="none"
					variant="walkthrough"
				>
					<div className="toolbar" data-testid="toolbar" role="toolbar">
						Toolbar
					</div>
				</Popover>
			</IconSettings>
		);
		expect(
			container.querySelector('#walkthrough-step-popover')
		).toBeInTheDocument();
	});

	it('still requests a close from the close button', () => {
		const onRequestClose = vi.fn();
		const { container } = renderWalkthrough({ isOpen: true, onRequestClose });

		fireEvent.click(container.querySelector('button.slds-popover__close'));

		expect(onRequestClose).toHaveBeenCalledWith(expect.anything(), {
			trigger: 'cancel',
		});
	});
});
