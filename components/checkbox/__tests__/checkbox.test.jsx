import { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import Checkbox from '../index';

const getFigure = (container) =>
	container.querySelector('.slds-visual-picker__figure');

describe('Checkbox visual picker figure', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders visualPickerFigure into the text figure', () => {
		const { container } = render(
			<Checkbox
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

	it('does not put the button-group label class on the visual picker label', () => {
		// SLDS 2 styles `.slds-checkbox_button__label` on its own, which draws
		// a border and background around the whole picker.
		const { container } = render(
			<Checkbox
				id="vp-label"
				variant="visual-picker"
				labels={{ label: 'Option' }}
				visualPickerFigure="$30"
			/>
		);

		expect(
			container.querySelector('.slds-visual-picker > label')
		).not.toHaveClass('slds-checkbox_button__label');
	});

	it('renders visualPickerFigureSelected and visualPickerFigureNotSelected into the coverable figure', () => {
		const { container } = render(
			<Checkbox
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
			<Checkbox
				id="vp-text-deprecated"
				variant="visual-picker"
				labels={{ label: 'Option' }}
				onRenderVisualPicker={() => <span className="figure-content">$30</span>}
			/>
		);
		const { container: coverableContainer } = render(
			<Checkbox
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
			<Checkbox
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

describe('Checkbox control model', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	const getInput = (container) => container.querySelector('input');

	it('honors checked: clicking does not change it unless the parent updates the prop', () => {
		const onChange = vi.fn();
		const { container } = render(
			<Checkbox
				id="cb-controlled"
				labels={{ label: 'Option' }}
				checked={false}
				onChange={onChange}
			/>
		);

		const input = getInput(container);
		fireEvent.click(input);
		expect(input.checked).toBe(false);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toEqual({
			checked: true,
			indeterminate: false,
		});
	});

	it('reports the requested value in onChange', () => {
		const onChange = vi.fn();
		const { container } = render(
			<Checkbox
				id="cb-checked"
				labels={{ label: 'Option' }}
				checked
				onChange={onChange}
			/>
		);

		const input = getInput(container);
		fireEvent.click(input);
		expect(onChange.mock.calls[0][0].target).toBe(input);
		expect(onChange.mock.calls[0][1]).toEqual({
			checked: false,
			indeterminate: false,
		});
		expect(input.checked).toBe(true);
	});

	it('toggles when the parent stores the requested value', () => {
		const Wrapper = () => {
			const [checked, setChecked] = useState(false);
			return (
				<Checkbox
					id="cb-wrapper"
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
		fireEvent.click(input);
		expect(input.checked).toBe(false);
	});

	it('applies indeterminate to the DOM and clears it when the prop goes back to undefined', () => {
		const { container, rerender } = render(
			<Checkbox id="cb-indeterminate" checked={false} indeterminate />
		);
		const input = getInput(container);
		expect(input.indeterminate).toBe(true);

		rerender(<Checkbox id="cb-indeterminate" checked={false} />);
		expect(input.indeterminate).toBe(false);

		rerender(<Checkbox id="cb-indeterminate" checked={false} indeterminate />);
		expect(input.indeterminate).toBe(true);

		rerender(
			<Checkbox id="cb-indeterminate" checked={false} indeterminate={false} />
		);
		expect(input.indeterminate).toBe(false);
	});

	it('keeps a controlled indeterminate state when the parent ignores the change', () => {
		const onChange = vi.fn();
		const { container } = render(
			<Checkbox
				id="cb-indeterminate-click"
				checked={false}
				indeterminate
				onChange={onChange}
			/>
		);
		const input = getInput(container);

		fireEvent.click(input);
		expect(onChange.mock.calls[0][1]).toEqual({
			checked: true,
			indeterminate: false,
		});
		expect(input.indeterminate).toBe(true);
		expect(input.checked).toBe(false);
	});

	it('does not warn about switching between controlled and uncontrolled', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const { rerender } = render(<Checkbox id="cb-flip" />);
		rerender(<Checkbox id="cb-flip" checked />);
		rerender(<Checkbox id="cb-flip" checked={undefined} />);

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
			<Checkbox id="cb-default" checked={false} defaultChecked />
		);

		const input = getInput(container);
		expect(input.checked).toBe(false);
		expect(input.defaultChecked).toBe(false);
		expect(input).not.toHaveAttribute('defaultChecked');

		const messages = consoleError.mock.calls.map((args) => args.join(' '));
		expect(
			messages.some(
				(m) => m.includes('`defaultChecked`') && m.includes('`checked`')
			)
		).toBe(true);
	});
});

describe('Checkbox: required `onChange`', () => {
	it('warns once when `onChange` is missing, and not when exempt', async () => {
		// Fresh modules so the once-per-session warning state is reset
		vi.resetModules();
		const { default: FreshCheckbox } = await import('../index');
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const requiredWarnings = () =>
			consoleError.mock.calls
				.map((call) => call.join(' '))
				.filter((m) => m.includes('`onChange` is required by'));

		// `disabled` and `readOnly` don't need `onChange`
		render(<FreshCheckbox checked disabled labels={{ label: 'A' }} />);
		expect(requiredWarnings()).toHaveLength(0);
		render(<FreshCheckbox checked readOnly labels={{ label: 'B' }} />);
		expect(requiredWarnings()).toHaveLength(0);
		render(<FreshCheckbox checked labels={{ label: 'C' }} />);
		expect(requiredWarnings()).toHaveLength(1);

		consoleError.mockRestore();
	});
});

describe('Checkbox keyboard and readOnly', () => {
	it('does not fake a change on Enter or Space keydown', () => {
		const onChange = vi.fn();
		const onKeyDown = vi.fn();
		const { container } = render(
			<Checkbox
				labels={{ label: 'A' }}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		);
		const input = container.querySelector('input');

		fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
		fireEvent.keyDown(input, { key: ' ', keyCode: 32 });

		// Space toggles a native checkbox through its click; Enter does not toggle it
		expect(onChange).not.toHaveBeenCalled();
		expect(onKeyDown).toHaveBeenCalledTimes(2);
	});

	it.each(['base', 'toggle', 'button-group', 'visual-picker'])(
		'%s: readOnly is announced, stays focusable and does not toggle',
		(variant) => {
			const onChange = vi.fn();
			const { container } = render(
				<Checkbox
					checked
					labels={{ label: 'A' }}
					onChange={onChange}
					readOnly
					variant={variant}
				/>
			);
			const input = container.querySelector('input');

			expect(input).toHaveAttribute('aria-readonly', 'true');
			expect(input).not.toBeDisabled();
			fireEvent.click(input);
			expect(onChange).not.toHaveBeenCalled();
			expect(input).toBeChecked();
		}
	);

	it('does not set aria-readonly by default', () => {
		const { container } = render(
			<Checkbox labels={{ label: 'A' }} onChange={() => {}} />
		);
		expect(container.querySelector('input')).not.toHaveAttribute(
			'aria-readonly'
		);
	});
});

describe('Checkbox: deprecated requestFocus props', () => {
	it('still calls onRequestFocus with the input, and warns', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});
		const onRequestFocus = vi.fn();
		const { container } = render(
			<Checkbox
				id="cb-request-focus"
				labels={{ label: 'Option' }}
				checked={false}
				onChange={() => {}}
				onRequestFocus={onRequestFocus}
				requestFocus
			/>
		);

		const input = container.querySelector('input');
		expect(onRequestFocus).toHaveBeenCalledWith(input);
		expect(input).not.toHaveAttribute('requestFocus');
		expect(consoleError).toHaveBeenCalledWith(
			expect.stringContaining(
				'`requestFocus` will be removed in the next major version'
			)
		);
		expect(consoleError).toHaveBeenCalledWith(
			expect.stringContaining(
				'`onRequestFocus` will be removed in the next major version'
			)
		);
		consoleError.mockRestore();
	});

	it('forwards ref to the input so it can be focused', () => {
		const ref = { current: null };
		render(
			<Checkbox
				id="cb-ref"
				labels={{ label: 'Option' }}
				checked={false}
				onChange={() => {}}
				ref={ref}
			/>
		);

		ref.current.focus();
		expect(document.activeElement).toBe(ref.current);
		expect(ref.current.tagName).toBe('INPUT');
	});
});
