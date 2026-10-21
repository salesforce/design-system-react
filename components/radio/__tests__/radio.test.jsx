import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../index';
import IconSettings from '../../icon-settings';

describe('SLDSRadio', () => {
	const renderVisualPicker = (props) =>
		render(
			<IconSettings iconPath="/assets/icons">
				<Radio
					id="radio-visual-picker"
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

	describe('canDeselect', () => {
		it('calls onChange when a checked radio is clicked', () => {
			const onChange = vi.fn();
			const { container } = render(
				<Radio
					id="radio-deselect"
					labels={{ label: 'Option' }}
					checked
					canDeselect
					onChange={onChange}
				/>
			);

			fireEvent.click(container.querySelector('input'));
			expect(onChange).toHaveBeenCalledWith(expect.anything(), {
				checked: false,
			});
		});

		it('does not call onChange when a checked radio is clicked without it', () => {
			const onChange = vi.fn();
			const { container } = render(
				<Radio
					id="radio-no-deselect"
					labels={{ label: 'Option' }}
					checked
					onChange={onChange}
				/>
			);

			fireEvent.click(container.querySelector('input'));
			expect(onChange).not.toHaveBeenCalled();
		});
	});

	describe('Deprecated prop aliases', () => {
		it('still supports `coverable`, `vertical`, and `deselectable` and warns', () => {
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

			const onChange = vi.fn();
			const { container: deselect } = render(
				<Radio
					id="radio-deselectable"
					labels={{ label: 'Option' }}
					checked
					deselectable
					onChange={onChange}
				/>
			);
			fireEvent.click(deselect.querySelector('input'));
			expect(onChange).toHaveBeenCalledWith(expect.anything(), {
				checked: false,
			});

			['coverable', 'vertical', 'deselectable'].forEach((prop) => {
				expect(consoleError).toHaveBeenCalledWith(
					expect.stringContaining(`\`${prop}\` will be removed`)
				);
			});
			consoleError.mockRestore();
		});
	});
});
