import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../index';
import IconSettings from '../../icon-settings';

describe('SLDSCheckbox', () => {
	const renderVisualPicker = (props) =>
		render(
			<IconSettings iconPath="/assets/icons">
				<Checkbox
					id="checkbox-visual-picker"
					labels={{ label: 'Option' }}
					variant="visual-picker"
					onRenderVisualPicker={() => <span>content</span>}
					onRenderVisualPickerSelected={() => <span>selected</span>}
					onRenderVisualPickerNotSelected={() => <span>not selected</span>}
					{...props}
				/>
			</IconSettings>
		);

	describe('Visual picker variant', () => {
		it('renders coverable and vertical markup with `isCoverable` and `isVertical`', () => {
			const { container } = renderVisualPicker({
				isCoverable: true,
				isVertical: true,
			});

			expect(container.querySelector('.slds-visual-picker')).toHaveClass(
				'slds-visual-picker_vertical'
			);
			expect(container.querySelector('.slds-is-selected')).toBeInTheDocument();
			expect(
				container.querySelector('.slds-visual-picker__body')
			).not.toBeInTheDocument();
		});
	});

	describe('Deprecated prop aliases', () => {
		it('still supports `coverable` and `vertical` and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			const { container: expected } = renderVisualPicker({
				isCoverable: true,
				isVertical: true,
			});
			expect(consoleError).not.toHaveBeenCalled();

			const { container: actual } = renderVisualPicker({
				coverable: true,
				vertical: true,
			});
			expect(actual.innerHTML).toBe(expected.innerHTML);
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining('`coverable` will be removed')
			);
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining('`vertical` will be removed')
			);
			consoleError.mockRestore();
		});
	});
});
