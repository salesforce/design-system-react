import { useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Input from '../';
import Icon from '../../icon';
import InputIcon from '../../icon/input-icon';
import IconSettings from '../../icon-settings';
import Tooltip from '../../tooltip';

describe('SLDSInput', () => {
	const defaultProps = {
		placeholder: 'Placeholder Text',
	};

	const renderInput = (props) => {
		return render(
			<IconSettings iconPath="/assets/icons">
				<Input {...defaultProps} {...props} />
			</IconSettings>
		);
	};

	describe('Standard Input with Label', () => {
		it('renders label and input with correct classes and attributes', () => {
			const { container } = renderInput({
				label: 'Input Label',
				id: 'custom-id',
			});

			const wrapper = container.querySelector('.slds-form-element');
			expect(wrapper).toBeInTheDocument();
			expect(wrapper).toHaveClass('slds-form-element');

			const label = container.querySelector('.slds-form-element__label');
			expect(label).toBeInTheDocument();
			expect(label.textContent).toBe('Input Label');

			const input = container.querySelector('input');
			expect(input).toBeInTheDocument();
			expect(input).toHaveClass('slds-input');
			expect(input).toHaveAttribute('id', 'custom-id');
			expect(input).toHaveAttribute('placeholder', 'Placeholder Text');

			// Label for attribute should match input id
			expect(label).toHaveAttribute('for', 'custom-id');
		});

		it('generates unique id when not provided', () => {
			const { container } = renderInput({ label: 'Input Label' });
			const input = container.querySelector('input');
			expect(input).toHaveAttribute('id');
			expect(input.getAttribute('id')).toBeTruthy();
		});
	});

	describe('Input without Assistive Text Label', () => {
		it('renders assistive text label with correct class', () => {
			const { container } = renderInput({
				assistiveText: { label: 'Assistive Label' },
			});

			const label = container.querySelector('.slds-form-element__label');
			expect(label).toBeInTheDocument();
			expect(label.textContent).toBe('Assistive Label');
			expect(label).toHaveClass('slds-assistive-text');

			const input = container.querySelector('input');
			expect(label).toHaveAttribute('for', input.getAttribute('id'));
		});
	});

	describe('Read Only Input', () => {
		it('renders readonly input with correct attributes', () => {
			const { container } = renderInput({
				label: 'Input Label',
				readOnly: true,
			});

			const label = container.querySelector('label');
			expect(label).toHaveClass('slds-form-element__label');

			const input = container.querySelector('input');
			expect(input).toHaveAttribute('readonly');
		});
	});

	describe('Static Input', () => {
		it('renders static input as span elements', () => {
			const { container } = renderInput({
				label: 'Input Label',
				isStatic: true,
			});

			const spans = container.querySelectorAll('span');
			const label = spans[0];
			const input = spans[1];

			expect(label).toHaveClass('slds-form-element__label');
			expect(input).toHaveClass('slds-form-element__static');
		});
	});

	describe('Disabled Input', () => {
		it('renders disabled input with correct attribute', () => {
			const { container } = renderInput({
				label: 'Input Label',
				disabled: true,
			});

			const input = container.querySelector('input');
			expect(input).toHaveAttribute('disabled');
		});
	});

	describe('Multiple Inputs', () => {
		it('each input has unique generated id', () => {
			const { container: container1 } = render(
				<IconSettings iconPath="/assets/icons">
					<Input
						className="input-one"
						label="Input One"
						placeholder="Placeholder Text"
					/>
				</IconSettings>
			);
			const { container: container2 } = render(
				<IconSettings iconPath="/assets/icons">
					<Input
						className="input-two"
						label="Input Two"
						placeholder="Placeholder Text"
					/>
				</IconSettings>
			);

			const input1 = container1.querySelector('input');
			const input2 = container2.querySelector('input');

			expect(input1.getAttribute('id')).not.toBe(input2.getAttribute('id'));
		});
	});

	describe('Required Input in Error State', () => {
		it('renders error state with correct classes and messages', () => {
			const { container } = renderInput({
				label: 'Input Label',
				required: true,
				errorText: 'Error Message',
			});

			const wrapper = container.querySelector('.slds-form-element');
			expect(wrapper).toHaveClass('slds-has-error');

			const abbr = container.querySelector('abbr');
			expect(abbr).toHaveClass('slds-required');

			const error = container.querySelector('.slds-form-element__help');
			expect(error).toBeInTheDocument();
			expect(error.textContent).toBe('Error Message');

			const input = container.querySelector('input');
			const inputDescribedby = input.getAttribute('aria-describedby');
			const errorId = error.getAttribute('id');
			expect(inputDescribedby).toBe(errorId);
		});
	});

	describe('Input with Left Clickable Icon', () => {
		it('renders left icon with correct position and handles click', () => {
			const clickCallback = vi.fn();
			const { container } = renderInput({
				iconLeft: (
					<InputIcon
						assistiveText={{ icon: 'Passed assistive text to icon' }}
						name="search"
						category="utility"
						onClick={clickCallback}
					/>
				),
			});

			const elementControl = container.querySelector(
				'.slds-form-element__control'
			);
			expect(elementControl).toHaveClass('slds-input-has-icon');

			const iconAssistiveText = container.querySelector('.slds-assistive-text');
			expect(iconAssistiveText.textContent).toBe(
				'Passed assistive text to icon'
			);

			// Icon button should render before input
			const html = elementControl.innerHTML;
			expect(html.indexOf('<button')).toBeLessThan(html.indexOf('<input'));

			const leftButton = container.querySelector('button');
			fireEvent.click(leftButton);
			expect(clickCallback).toHaveBeenCalledTimes(1);
		});
	});

	describe('Input with Right Clickable Icon', () => {
		it('renders right icon with correct position and handles click', () => {
			const clickCallback = vi.fn();
			const { container } = renderInput({
				iconRight: (
					<InputIcon
						assistiveText={{ icon: 'Passed assistive text to icon' }}
						name="search"
						category="utility"
						onClick={clickCallback}
					/>
				),
			});

			const elementControl = container.querySelector(
				'.slds-form-element__control'
			);
			expect(elementControl).toHaveClass('slds-input-has-icon');

			// Icon button should render after input
			const html = elementControl.innerHTML;
			expect(html.indexOf('<button')).toBeGreaterThan(html.indexOf('<input'));

			const button = container.querySelector('button');
			fireEvent.click(button);
			expect(clickCallback).toHaveBeenCalledTimes(1);
		});
	});

	describe('Input with Non-Clickable Icon', () => {
		it('does not render button tag for non-clickable icon', () => {
			const { container } = renderInput({
				iconRight: <Icon name="search" category="utility" />,
			});

			const elementControl = container.querySelector(
				'.slds-form-element__control'
			);
			const button = elementControl.querySelector('button');
			expect(button).not.toBeInTheDocument();
		});

		it('lets clicks pass through a decorative InputIcon to the input', () => {
			// SLDS 2 dropped `.slds-input__icon:not(button) { pointer-events: none }`.
			const { container } = renderInput({
				iconLeft: <InputIcon name="search" category="utility" />,
			});

			const icon = container.querySelector('svg.slds-input__icon');
			expect(icon.style.pointerEvents).toBe('none');
		});
	});

	describe('Input with Loading Spinner Icon', () => {
		it('renders spinner with correct aria-describedby', () => {
			const { container } = renderInput({
				assistiveText: { label: 'Passed assistive text to icon' },
				hasSpinner: true,
				iconRight: (
					<InputIcon
						assistiveText={{ icon: 'Passed assistive text to icon' }}
						name="search"
						category="utility"
					/>
				),
				id: 'unique-id-4',
				label: 'Input Label',
			});

			const spinner = container.querySelector('.slds-spinner');
			expect(spinner).toBeInTheDocument();

			const input = container.querySelector('input');
			const spinnerId = spinner.getAttribute('id');
			const inputDescribedby = input.getAttribute('aria-describedby');
			expect(inputDescribedby).toContain(spinnerId);
		});
	});

	describe('Input with Loading Spinner Icon & Error', () => {
		it('input aria-describedby points to both spinner and error message', () => {
			const { container } = renderInput({
				assistiveText: { label: 'Passed assistive text to icon' },
				required: true,
				errorText: 'Error Message',
				hasSpinner: true,
				iconRight: (
					<InputIcon
						assistiveText={{ icon: 'Passed assistive text to icon' }}
						name="search"
						category="utility"
					/>
				),
				id: 'unique-id-4',
				label: 'Input Label',
			});

			const spinner = container.querySelector('.slds-spinner');
			const error = container.querySelector('.slds-form-element__help');
			const input = container.querySelector('input');

			const errorId = error.getAttribute('id');
			const spinnerId = spinner.getAttribute('id');
			const inputDescribedby = input.getAttribute('aria-describedby');

			expect(inputDescribedby).toBe(`${spinnerId} ${errorId}`);
		});
	});

	describe('Input with Fixed Left Text', () => {
		it('renders fixed text node with correct content', () => {
			const { container } = renderInput({
				fixedTextLeft: '$',
				id: 'unique-id-5',
				label: 'Input Label',
			});

			const fixedTextLeft = container.querySelector(
				'.slds-form-element__addon'
			);
			expect(fixedTextLeft).toBeInTheDocument();
			expect(fixedTextLeft.textContent).toBe('$');
		});
	});

	describe('Counter Input', () => {
		it('increments and decrements as expected', () => {
			let onChangeData;
			const { container } = renderInput({
				onChange: (event, data) => {
					onChangeData = data;
				},
				value: 1,
				variant: 'counter',
			});

			const decrement = container.querySelector(
				'.slds-input__button_decrement'
			);
			const increment = container.querySelector(
				'.slds-input__button_increment'
			);

			// Test increment with mouse
			onChangeData = {};
			fireEvent.mouseDown(increment);
			fireEvent.mouseUp(increment);
			expect(onChangeData.number).toBe(2);
			expect(onChangeData.value).toBe('2');

			// Test increment with keyboard
			onChangeData = {};
			fireEvent.keyDown(increment, { key: 'Enter', keyCode: 13, which: 13 });
			fireEvent.keyUp(increment, { key: 'Enter', keyCode: 13, which: 13 });
			expect(onChangeData.number).toBe(2);
			expect(onChangeData.value).toBe('2');

			// Test decrement with mouse
			fireEvent.mouseDown(decrement);
			fireEvent.mouseUp(decrement);
			expect(onChangeData.number).toBe(0);
			expect(onChangeData.value).toBe('0');

			// Test decrement with keyboard
			onChangeData = {};
			fireEvent.keyDown(decrement, { key: 'Enter', keyCode: 13, which: 13 });
			fireEvent.keyUp(decrement, { key: 'Enter', keyCode: 13, which: 13 });
			expect(onChangeData.number).toBe(0);
			expect(onChangeData.value).toBe('0');
		});

		it('respects min and max values', () => {
			let changeOccurred = false;
			const { container } = renderInput({
				maxValue: 1,
				minValue: 1,
				onChange: () => {
					changeOccurred = true;
				},
				value: 1,
				variant: 'counter',
			});

			const decrement = container.querySelector(
				'.slds-input__button_decrement'
			);
			const increment = container.querySelector(
				'.slds-input__button_increment'
			);

			// Try to increment beyond max
			changeOccurred = false;
			fireEvent.mouseDown(increment);
			fireEvent.mouseUp(increment);
			expect(changeOccurred).toBe(false);
			expect(increment.disabled).toBe(true);

			// Try to decrement below min
			changeOccurred = false;
			fireEvent.mouseDown(decrement);
			fireEvent.mouseUp(decrement);
			expect(changeOccurred).toBe(false);
			expect(decrement.disabled).toBe(true);
		});

		it('acknowledges custom step values', () => {
			let onChangeData;
			const { container } = renderInput({
				onChange: (event, data) => {
					onChangeData = data;
				},
				step: 0.1,
				value: 1,
				variant: 'counter',
			});

			const decrement = container.querySelector(
				'.slds-input__button_decrement'
			);
			const increment = container.querySelector(
				'.slds-input__button_increment'
			);

			// Test increment with custom step
			onChangeData = {};
			fireEvent.mouseDown(increment);
			fireEvent.mouseUp(increment);
			expect(onChangeData.number).toBe(1.1);
			expect(onChangeData.value).toBe('1.1');

			// Test decrement with custom step
			fireEvent.mouseDown(decrement);
			fireEvent.mouseUp(decrement);
			expect(onChangeData.number).toBe(0.9);
			expect(onChangeData.value).toBe('0.9');
		});

		it('keeps counting while a button is held in controlled mode', () => {
			vi.useFakeTimers();
			try {
				const values = [];
				const ControlledCounter = () => {
					const [value, setValue] = useState('0');
					return (
						<Input
							label="Counter"
							onChange={(event, data) => {
								values.push(data.value);
								setValue(data.value);
							}}
							value={value}
							variant="counter"
						/>
					);
				};
				const { container } = render(
					<IconSettings iconPath="/assets/icons">
						<ControlledCounter />
					</IconSettings>
				);

				const increment = container.querySelector(
					'.slds-input__button_increment'
				);

				fireEvent.mouseDown(increment);
				// First repeat after 500ms, then one every 75ms. Advance one step
				// per `act` so the parent re-renders with the new value in between.
				[500, 75, 75].forEach((delay) => {
					act(() => {
						vi.advanceTimersByTime(delay);
					});
				});
				fireEvent.mouseUp(increment);

				expect(values).toEqual(['1', '2', '3', '4']);
			} finally {
				vi.useRealTimers();
			}
		});

		it('disables the increment button once the parent sets `value` to maxValue', () => {
			const ControlledCounter = () => {
				const [value, setValue] = useState('0');
				return (
					<Input
						label="Counter"
						maxValue={1}
						onChange={(event, data) => setValue(data.value)}
						value={value}
						variant="counter"
					/>
				);
			};
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<ControlledCounter />
				</IconSettings>
			);

			const increment = container.querySelector(
				'.slds-input__button_increment'
			);

			fireEvent.mouseDown(increment);
			fireEvent.mouseUp(increment);

			expect(container.querySelector('input')).toHaveValue(1);
			expect(increment).toBeDisabled();
		});

		it('does not write the DOM; the input only changes when the parent updates `value`', () => {
			const onChange = vi.fn();
			const { container, rerender } = renderInput({
				onChange,
				value: 5,
				variant: 'counter',
			});
			const input = container.querySelector('input');
			const increment = container.querySelector(
				'.slds-input__button_increment'
			);

			fireEvent.mouseDown(increment);
			fireEvent.mouseUp(increment);
			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange.mock.calls[0][1]).toEqual({ number: 6, value: '6' });
			expect(input.value).toBe('5');

			rerender(
				<IconSettings iconPath="/assets/icons">
					<Input
						{...defaultProps}
						onChange={onChange}
						value={6}
						variant="counter"
					/>
				</IconSettings>
			);
			expect(input.value).toBe('6');

			// The next step is computed from the new prop value.
			fireEvent.mouseDown(increment);
			fireEvent.mouseUp(increment);
			expect(onChange.mock.calls[1][1]).toEqual({ number: 7, value: '7' });
		});

		it('steps from 0 when `value` is not set, without writing the DOM', () => {
			const onChange = vi.fn();
			const { container } = renderInput({ onChange, variant: 'counter' });
			const input = container.querySelector('input');
			input.value = '42'; // a stray DOM value must not be read
			const decrement = container.querySelector(
				'.slds-input__button_decrement'
			);

			fireEvent.mouseDown(decrement);
			fireEvent.mouseUp(decrement);
			expect(onChange.mock.calls[0][1]).toEqual({ number: -1, value: '-1' });
			expect(input.value).toBe('42');
		});
	});

	describe('Removed props', () => {
		it('warns once for `defaultValue` and does not pass it to the input', async () => {
			vi.resetModules();
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			try {
				const { default: checkProps } = await import('../check-props');
				const { INPUT } = await import('../../../utilities/constants');
				checkProps(INPUT, { defaultValue: 'x' });
				checkProps(INPUT, { defaultValue: 'x' });
				const sunsetCalls = errorSpy.mock.calls.filter((call) =>
					String(call[0]).includes('defaultValue')
				);
				expect(sunsetCalls).toHaveLength(1);
			} finally {
				errorSpy.mockRestore();
			}

			const { container } = renderInput({ defaultValue: 'stale' });
			expect(container.querySelector('input').value).toBe('');
		});

		it('ignores and warns about `assistiveText.fieldLevelHelpButton`', () => {
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			try {
				const { container } = renderInput({
					assistiveText: { fieldLevelHelpButton: 'Old help' },
					fieldLevelHelpTooltip: <Tooltip content="Some help" />,
					label: 'Name',
				});
				expect(container.innerHTML).not.toContain('Old help');
				expect(container.innerHTML).toContain('Help');
				expect(errorSpy).toHaveBeenCalledWith(
					expect.stringContaining(
						'`assistiveText.fieldLevelHelpButton` has reached End-of-Life'
					)
				);
			} finally {
				errorSpy.mockRestore();
			}
		});
	});
});

describe('Input required', () => {
	it('sets the native required attribute', () => {
		const { container } = render(<Input id="r" label="L" required />);
		expect(container.querySelector('input')).toBeRequired();
	});

	it('still passes the deprecated aria-required through', () => {
		const { container } = render(<Input id="r" label="L" aria-required />);
		expect(container.querySelector('input')).toHaveAttribute(
			'aria-required',
			'true'
		);
	});
});

describe('Input root, parts and ref', () => {
	it('puts className and style on the root, classNameInput on the input, and ref on the input', async () => {
		const { createRef } = await import('react');
		const ref = createRef();
		const inputRef = vi.fn();
		const { container } = render(
			<Input
				id="i"
				label="L"
				className="on-root"
				classNameInput="on-input"
				style={{ margin: '3px' }}
				ref={ref}
				inputRef={inputRef}
				value=""
				onChange={() => {}}
			/>
		);
		const root = container.querySelector('.slds-form-element');
		expect(root).toHaveClass('on-root');
		expect(root.style.margin).toBe('3px');
		expect(ref.current).toBe(container.querySelector('input'));
		expect(ref.current).toHaveClass('on-input');
		expect(inputRef).toHaveBeenCalledWith(ref.current);
	});

	it('still honours the deprecated styleContainer', () => {
		const { container } = render(
			<Input
				id="i"
				label="L"
				styleContainer={{ margin: '4px' }}
				value=""
				onChange={() => {}}
			/>
		);
		expect(container.querySelector('.slds-form-element').style.margin).toBe(
			'4px'
		);
	});
});
