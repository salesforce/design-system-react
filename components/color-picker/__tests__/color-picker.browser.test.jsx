import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ColorPicker from '../';
import IconSettings from '../../icon-settings';
import { expectNoAxeViolations, notActEnvironment } from '../../__tests__/axe';

// axe on the open popover, with real SLDS CSS. A closed popover isn't
// rendered.
describe('ColorPicker accessibility (browser)', () => {
	notActEnvironment();

	it.each([
		['base', {}],
		['custom', { variant: 'custom' }],
		['swatches', { variant: 'swatches' }],
	])('%s: has no axe violations while open', async (name, props) => {
		render(
			<IconSettings iconPath="/assets/icons">
				<ColorPicker
					events={{ onChange: () => {} }}
					id="color-picker"
					isOpen
					labels={{ label: 'Choose color' }}
					value="#00ff00"
					{...props}
				/>
			</IconSettings>
		);
		expect(screen.getByRole('dialog')).toBeInTheDocument();
		await expectNoAxeViolations();
	});
});
