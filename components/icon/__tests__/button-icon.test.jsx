import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ButtonIcon from '../button-icon';
import IconSettings from '../../icon-settings';

describe('ButtonIcon', () => {
	const renderButtonIcon = (props) =>
		render(
			<IconSettings iconPath="/assets/icons">
				<ButtonIcon name="settings" {...props} />
			</IconSettings>
		);

	it('applies hint classes from `isHint` and `isInverse`', () => {
		const { container: hint } = renderButtonIcon({ isHint: true });
		expect(hint.querySelector('svg')).toHaveClass('slds-button__icon_hint');

		const { container: inverseHint } = renderButtonIcon({
			isHint: true,
			isInverse: true,
		});
		expect(inverseHint.querySelector('svg')).toHaveClass(
			'slds-button__icon_inverse-hint'
		);
	});

	describe('Deprecated boolean prop aliases', () => {
		it('still applies `hint` and `inverse`, and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const { container } = renderButtonIcon({ hint: true, inverse: true });

			expect(container.querySelector('svg')).toHaveClass(
				'slds-button__icon_inverse-hint'
			);
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining('`isHint`')
			);
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining('`isInverse`')
			);
			consoleError.mockRestore();
		});
	});
});
