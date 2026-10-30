import { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import Radio from '../index';

const getFigure = (container) =>
	container.querySelector('.slds-visual-picker__figure');

describe('Radio visual picker figure', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders visualPickerFigure into the text figure', () => {
		const { container } = render(
			<Radio
				id="vp-text"
				variant="visual-picker"
				labels={{ label: 'Option' }}
				visualPickerFigure={<span className="figure-content">$30</span>}
			/>
		);

		const figure = getFigure(container);
		expect(figure).toHaveClass('slds-visual-picker__text');
		expect(figure.querySelector('.figure-content')).toHaveTextContent('$30');
	});

	it('renders visualPickerFigureSelected and visualPickerFigureNotSelected into the coverable figure', () => {
		const { container } = render(
			<Radio
				id="vp-coverable"
				variant="visual-picker"
				coverable
				labels={{ label: 'Option' }}
				visualPickerFigureSelected={
					<span className="selected-content">Selected</span>
				}
				visualPickerFigureNotSelected={
					<span className="not-selected-content">Not selected</span>
				}
			/>
		);

		const figure = getFigure(container);
		expect(figure).toHaveClass('slds-visual-picker__icon');
		expect(
			figure.querySelector('.slds-is-selected .selected-content')
		).toHaveTextContent('Selected');
		expect(
			figure.querySelector('.slds-is-not-selected .not-selected-content')
		).toHaveTextContent('Not selected');
	});

	it('still renders the deprecated onRenderVisualPicker* props and warns', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		const { container: textContainer } = render(
			<Radio
				id="vp-text-deprecated"
				variant="visual-picker"
				labels={{ label: 'Option' }}
				onRenderVisualPicker={() => <span className="figure-content">$30</span>}
			/>
		);
		const { container: coverableContainer } = render(
			<Radio
				id="vp-coverable-deprecated"
				variant="visual-picker"
				coverable
				labels={{ label: 'Option' }}
				onRenderVisualPickerSelected={() => (
					<span className="selected-content">Selected</span>
				)}
				onRenderVisualPickerNotSelected={() => (
					<span className="not-selected-content">Not selected</span>
				)}
			/>
		);

		expect(
			getFigure(textContainer).querySelector('.figure-content')
		).toHaveTextContent('$30');
		const coverableFigure = getFigure(coverableContainer);
		expect(
			coverableFigure.querySelector('.slds-is-selected .selected-content')
		).toHaveTextContent('Selected');
		expect(
			coverableFigure.querySelector(
				'.slds-is-not-selected .not-selected-content'
			)
		).toHaveTextContent('Not selected');

		const messages = consoleError.mock.calls.map((args) => args.join(' '));
		expect(messages.some((m) => m.includes('`onRenderVisualPicker`'))).toBe(
			true
		);
		expect(
			messages.some((m) => m.includes('`onRenderVisualPickerSelected`'))
		).toBe(true);
		expect(
			messages.some((m) => m.includes('`onRenderVisualPickerNotSelected`'))
		).toBe(true);
	});

	it('prefers the new slot over the deprecated render prop', () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});

		const { container } = render(
			<Radio
				id="vp-both"
				variant="visual-picker"
				labels={{ label: 'Option' }}
				visualPickerFigure={<span>new</span>}
				onRenderVisualPicker={() => <span>old</span>}
			/>
		);

		expect(getFigure(container).textContent).toBe('new');
	});
});

describe('Radio control model', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	const getInput = (container) => container.querySelector('input');

	it('honors checked: selecting does not check it unless the parent updates the prop', () => {
		const onChange = vi.fn();
		const { container } = render(
			<Radio
				id="radio-controlled"
				labels={{ label: 'Option' }}
				value="a"
				checked={false}
				onChange={onChange}
			/>
		);

		const input = getInput(container);
		fireEvent.click(input);
		expect(input.checked).toBe(false);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][0].target).toBe(input);
		expect(onChange.mock.calls[0][1]).toEqual({ checked: true });
	});

	it('checks when the parent stores the requested value', () => {
		const Wrapper = () => {
			const [checked, setChecked] = useState(false);
			return (
				<Radio
					id="radio-wrapper"
					labels={{ label: 'Option' }}
					checked={checked}
					onChange={(event, data) => setChecked(data.checked)}
				/>
			);
		};
		const { container } = render(<Wrapper />);
		const input = getInput(container);

		fireEvent.click(input);
		expect(input.checked).toBe(true);
	});

	it('requests checked: false when a checked deselectable radio is clicked', () => {
		const onChange = vi.fn();
		const { container } = render(
			<Radio
				id="radio-deselectable"
				labels={{ label: 'Option' }}
				checked
				deselectable
				onChange={onChange}
			/>
		);

		const input = getInput(container);
		fireEvent.click(input);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toEqual({ checked: false });
		expect(input.checked).toBe(true);
	});

	it('does not warn about switching between controlled and uncontrolled', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const { rerender } = render(<Radio id="radio-flip" />);
		rerender(<Radio id="radio-flip" checked onChange={() => {}} />);
		rerender(<Radio id="radio-flip" checked={undefined} />);

		const messages = consoleError.mock.calls.map((args) => args.join(' '));
		expect(messages.some((m) => /uncontrolled|controlled/i.test(m))).toBe(
			false
		);
	});

	it('ignores the removed defaultChecked prop and warns', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const { container } = render(
			<Radio
				id="radio-default"
				checked={false}
				onChange={() => {}}
				defaultChecked
			/>
		);

		const input = getInput(container);
		expect(input.checked).toBe(false);
		expect(input.defaultChecked).toBe(false);

		const messages = consoleError.mock.calls.map((args) => args.join(' '));
		expect(
			messages.some(
				(m) => m.includes('`defaultChecked`') && m.includes('`checked`')
			)
		).toBe(true);
	});
});
