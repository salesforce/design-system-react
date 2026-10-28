import { render } from '@testing-library/react';
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
