import { render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

import Popover from '../';
import Button from '../../button';
import IconSettings from '../../icon-settings';

// Dialog positions itself when Floating UI's `computePosition` promise resolves, which
// sets state outside any act() scope, and waiting inside act() would hold back the very
// update being waited for. Tell React this file is not an act environment so the
// update doesn't log "not wrapped in act" warnings.
let previousActEnvironment;
beforeAll(() => {
	previousActEnvironment = globalThis.IS_REACT_ACT_ENVIRONMENT;
	globalThis.IS_REACT_ACT_ENVIRONMENT = false;
});
afterAll(() => {
	globalThis.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
});

// Browser-mode tests for positioning. They need real layout, which jsdom does
// not provide. Until Dialog has positioned the popover it renders with
// `pointer-events: none`, so nothing inside it can be clicked.
describe('Popover positioning (browser)', () => {
	it('positions a popover that mounts open, so its footer can be clicked', async () => {
		const onClick = vi.fn();
		render(
			<IconSettings iconPath="/assets/icons">
				<Popover
					body="Body"
					footer={<Button label="Footer action" onClick={onClick} />}
					id="mounts-open"
					isOpen
					onRequestClose={() => {}}
				>
					<Button label="Trigger" />
				</Popover>
			</IconSettings>
		);

		const dialog = document.getElementById('mounts-open-popover');
		await vi.waitFor(() => {
			expect(dialog.style.pointerEvents).not.toBe('none');
		});

		await userEvent.click(
			document.querySelector('.slds-popover__footer .slds-button')
		);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
