import { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import ColorPicker from '../index';
import KEYS from '../../../utilities/key-code';
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

const makeRtl = (component) => (
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

const selectors = {
	cancel: '.slds-color-picker__selector-cancel',
	customError: '.slds-color-picker__input-custom-error',
	customHex: '.slds-color-picker__input-custom-hex',
	customRed: '.slds-color-picker__input-custom-r',
	gridPoint: '.slds-color-picker__range-indicator',
	hueSlider: '.slds-color-picker__hue-slider',
	popover: '.slds-color-picker__selector',
	summaryInput: '.slds-color-picker__summary-input input',
	submit: '.slds-color-picker__selector-submit',
	svGrid: '.slds-color-picker__custom-range',
	swatch: '.slds-color-picker__swatch-trigger',
	toggle: '.slds-color-picker__summary-button',
};

// `value` is controlled: a parent that accepts every `onChange`
const StatefulColorPicker = ({ initialValue = '', events = {}, ...props }) => {
	const [value, setValue] = useState(initialValue);
	return (
		<ColorPicker
			{...props}
			events={{
				...events,
				onChange: (event, data) => {
					setValue(data.color);
					events.onChange?.(event, data);
				},
			}}
			value={value}
		/>
	);
};

describe('SLDSColorPicker', () => {
	describe('Summary input', () => {
		it('fires onChange with value and isValid set to true when valid', () => {
			const onChange = vi.fn();
			const { container } = render(
				<ColorPicker value=""
					events={{
						onChange: onChange,
					}}
				/>
			);

			const input = container.querySelector(selectors.summaryInput);
			fireEvent.change(input, {
				target: {
					value: '#ff0000',
				},
			});

			expect(onChange).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					color: '#ff0000',
					isValid: true,
				})
			);
		});

		it('fires onChange with named value and isValid set to true when valid', () => {
			const onChange = vi.fn();
			const { container } = render(
				<ColorPicker value=""
					events={{
						onChange: onChange,
					}}
				/>
			);

			const input = container.querySelector(selectors.summaryInput);
			fireEvent.change(input, {
				target: {
					value: 'red',
				},
			});

			expect(onChange).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					color: 'red',
					isValid: true,
				})
			);
		});

		it('fires onChange with value and isValid set to false when invalid', () => {
			const onChange = vi.fn();
			const { container } = render(
				<ColorPicker value=""
					events={{
						onChange: onChange,
					}}
				/>
			);

			const input = container.querySelector(selectors.summaryInput);
			fireEvent.change(input, {
				target: {
					value: 'invalid',
				},
			});

			expect(onChange).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					color: 'invalid',
					isValid: false,
				})
			);
		});

		it('fires onValidateColor when input changes', () => {
			const customValidator = vi.fn();
			const { container } = render(
				<ColorPicker value=""
					events={{
						onValidateColor: customValidator,
					}}
				/>
			);

			const input = container.querySelector(selectors.summaryInput);
			fireEvent.change(input, {
				target: {
					value: '#FFFFFF',
				},
			});

			expect(customValidator).toHaveBeenCalledWith('#FFFFFF');
		});

		it('value prop is set in input', () => {
			const { container } = render(<ColorPicker value="#FFFFFF" />);

			const input = container.querySelector(selectors.summaryInput);
			expect(input.value).toBe('#FFFFFF');
		});
	});

	describe('Swatch toggle button', () => {
		it('opens popover when clicked and expects onRequestOpen and onOpen to be fired once', async () => {
			const onRequestOpenSpy = vi.fn();
			const onOpenSpy = vi.fn();

			const { container } = render(
				<ColorPicker value="" onRequestOpen={onRequestOpenSpy} onOpen={onOpenSpy} />
			);

			const button = container.querySelector(selectors.toggle);
			await userEvent.click(button);

			await waitFor(() => {
				expect(container.querySelector(selectors.popover)).toBeInTheDocument();
			});
			expect(onRequestOpenSpy).toHaveBeenCalledTimes(1);
			expect(onOpenSpy).toHaveBeenCalledTimes(1);
		});

		it('closes popover when clicked and popover is open', async () => {
			const onCloseSpy = vi.fn();
			const { container } = render(
				<ColorPicker value="" defaultIsOpen onClose={onCloseSpy} />
			);

			const button = container.querySelector(selectors.toggle);
			await userEvent.click(button);

			expect(onCloseSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('Popover', () => {
		const clickSubmit = (container) => {
			const submitBtn = container.querySelector(selectors.submit);
			fireEvent.click(submitBtn);
		};

		describe('Swatch tab', () => {
			it('clicking a swatch sets that working color', () => {
				const onWorkingColorChange = vi.fn();
				const { container } = render(
					<ColorPicker
						isOpen
						value="#000000"
						swatchColors={['#ff0000']}
						events={{
							onWorkingColorChange: onWorkingColorChange,
						}}
					/>
				);

				const swatch = container.querySelector(selectors.swatch);
				// NOTE: Using fireEvent instead of userEvent due to pointer-events: none on swatches
				fireEvent.click(swatch);

				expect(onWorkingColorChange).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({
						color: expect.objectContaining({ hex: '#ff0000' }),
					})
				);
			});
		});

		describe('Swatch keyboard navigation', () => {
			it('pressing right will move the color to the next one', () => {
				const onWorkingColorChange = vi.fn();
				const { container } = render(
					<ColorPicker
						isOpen
						value="#ff0000"
						swatchColors={['#ff0000', '#0000ff']}
						events={{
							onWorkingColorChange: onWorkingColorChange,
						}}
					/>
				);

				const swatch = container.querySelector(selectors.swatch);
				fireEvent.keyDown(swatch, {
					keyCode: KEYS.RIGHT,
					which: KEYS.RIGHT,
				});

				expect(onWorkingColorChange).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({
						color: expect.objectContaining({ hex: '#0000ff' }),
					})
				);
			});

			it('pressing left will move the color to the previous one', () => {
				const onWorkingColorChange = vi.fn();
				const { container } = render(
					<ColorPicker
						isOpen
						value="#0000ff"
						swatchColors={['#ff0000', '#0000ff']}
						events={{
							onWorkingColorChange: onWorkingColorChange,
						}}
					/>
				);

				const swatch = container.querySelector(selectors.swatch);
				fireEvent.keyDown(swatch, {
					keyCode: KEYS.LEFT,
					which: KEYS.LEFT,
				});

				expect(onWorkingColorChange).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({
						color: expect.objectContaining({ hex: '#ff0000' }),
					})
				);
			});

			it('pressing right in RTL will move the color to the previous one', () => {
				const onWorkingColorChange = vi.fn();
				const { container } = render(
					makeRtl(
						<ColorPicker
							isOpen
							value="#0000ff"
							swatchColors={['#ff0000', '#0000ff']}
							events={{
								onWorkingColorChange: onWorkingColorChange,
							}}
						/>
					)
				);

				const swatch = container.querySelector(selectors.swatch);
				fireEvent.keyDown(swatch, {
					keyCode: KEYS.RIGHT,
					which: KEYS.RIGHT,
				});

				expect(onWorkingColorChange).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({
						color: expect.objectContaining({ hex: '#ff0000' }),
					})
				);
			});

			it('pressing left in RTL will move the color to the next one', () => {
				const onWorkingColorChange = vi.fn();
				const { container } = render(
					makeRtl(
						<ColorPicker
							isOpen
							value="#ff0000"
							swatchColors={['#ff0000', '#0000ff']}
							events={{
								onWorkingColorChange: onWorkingColorChange,
							}}
						/>
					)
				);

				const swatch = container.querySelector(selectors.swatch);
				fireEvent.keyDown(swatch, {
					keyCode: KEYS.LEFT,
					which: KEYS.LEFT,
				});

				expect(onWorkingColorChange).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({
						color: expect.objectContaining({ hex: '#0000ff' }),
					})
				);
			});
		});

		describe('Submit button', () => {
			it('sets the input color', () => {
				const { container } = render(
					<StatefulColorPicker
						defaultIsOpen
						initialValue="#000000"
						swatchColors={['#ff0000']}
					/>
				);

				const swatch = container.querySelector(selectors.swatch);
				// NOTE: Using fireEvent instead of userEvent due to pointer-events: none on swatches
				fireEvent.click(swatch);
				clickSubmit(container);

				const input = container.querySelector(selectors.summaryInput);
				expect(input.value).toBe('#ff0000');
			});

			it('triggers onChange with value and isValid set to true', () => {
				const onChange = vi.fn();
				const { container } = render(
					<ColorPicker
						isOpen
						value="#000000"
						swatchColors={['#ff0000']}
						events={{
							onChange: onChange,
						}}
					/>
				);

				const swatch = container.querySelector(selectors.swatch);
				// NOTE: Using fireEvent instead of userEvent due to pointer-events: none on swatches
				fireEvent.click(swatch);
				clickSubmit(container);

				expect(onChange).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({
						color: '#ff0000',
						isValid: true,
					})
				);
			});
		});

		describe('Cancel button', () => {
			it('does not trigger onChange but triggers onRequestClose', () => {
				const onChange = vi.fn();
				const onRequestCloseSpy = vi.fn();
				const { container } = render(
					<ColorPicker
						isOpen
						value="#000000"
						swatchColors={['#ff0000']}
						events={{
							onChange: onChange,
						}}
						onRequestClose={onRequestCloseSpy}
					/>
				);

				const swatch = container.querySelector(selectors.swatch);
				// NOTE: Using fireEvent instead of userEvent due to pointer-events: none on swatches
				fireEvent.click(swatch);

				const cancel = container.querySelector(selectors.cancel);
				fireEvent.click(cancel);

				expect(onChange).not.toHaveBeenCalled();
				expect(onRequestCloseSpy).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({
						trigger: 'cancel',
					})
				);
			});
		});

		describe('Custom tab', () => {
			describe('HSV', () => {
				describe('hue slider', () => {
					it('change causes color hue to update', () => {
						const onWorkingColorChange = vi.fn();
						const { container } = render(
							<ColorPicker value=""
								isOpen
								events={{
									onWorkingColorChange: onWorkingColorChange,
								}}
							/>
						);

						const hue = container.querySelector(selectors.hueSlider);
						fireEvent.change(hue, {
							target: {
								value: 50,
							},
						});

						// NOTE: HSV values come back as strings from input elements
						expect(onWorkingColorChange).toHaveBeenCalledWith(
							expect.anything(),
							expect.objectContaining({
								color: expect.objectContaining({
									hsv: expect.objectContaining({ hue: '50' }),
								}),
							})
						);
					});
				});

				describe('saturation-value grid', () => {
					it('up key causes color value to go up', () => {
						const onWorkingColorChange = vi.fn();
						const { container } = render(
							<ColorPicker
								value="#000000"
								isOpen
								events={{
									onWorkingColorChange: onWorkingColorChange,
								}}
							/>
						);

						const point = container.querySelector(selectors.gridPoint);
						fireEvent.keyDown(point, {
							keyCode: KEYS.UP,
							which: KEYS.UP,
						});

						expect(onWorkingColorChange).toHaveBeenCalledWith(
							expect.anything(),
							expect.objectContaining({
								color: expect.objectContaining({
									hsv: expect.objectContaining({ value: 1 }),
								}),
							})
						);
					});

					it('down key causes color value to go down', () => {
						const onWorkingColorChange = vi.fn();
						const { container } = render(
							<ColorPicker
								value="#ffffff"
								isOpen
								events={{
									onWorkingColorChange: onWorkingColorChange,
								}}
							/>
						);

						const point = container.querySelector(selectors.gridPoint);
						fireEvent.keyDown(point, {
							keyCode: KEYS.DOWN,
							which: KEYS.DOWN,
						});

						expect(onWorkingColorChange).toHaveBeenCalledWith(
							expect.anything(),
							expect.objectContaining({
								color: expect.objectContaining({
									hsv: expect.objectContaining({ value: 99 }),
								}),
							})
						);
					});

					it('left key causes color sat. to go down 1', () => {
						const onWorkingColorChange = vi.fn();
						const { container } = render(
							<ColorPicker
								value="#ff0000"
								isOpen
								events={{
									onWorkingColorChange: onWorkingColorChange,
								}}
							/>
						);

						const point = container.querySelector(selectors.gridPoint);
						fireEvent.keyDown(point, {
							keyCode: KEYS.LEFT,
							which: KEYS.LEFT,
						});

						expect(onWorkingColorChange).toHaveBeenCalledWith(
							expect.anything(),
							expect.objectContaining({
								color: expect.objectContaining({
									hsv: expect.objectContaining({ saturation: 99 }),
								}),
							})
						);
					});

					it('right key causes color sat. to go up 1', () => {
						const onWorkingColorChange = vi.fn();
						const { container } = render(
							<ColorPicker
								value="#000000"
								isOpen
								events={{
									onWorkingColorChange: onWorkingColorChange,
								}}
							/>
						);

						const point = container.querySelector(selectors.gridPoint);
						fireEvent.keyDown(point, {
							keyCode: KEYS.RIGHT,
							which: KEYS.RIGHT,
						});

						expect(onWorkingColorChange).toHaveBeenCalledWith(
							expect.anything(),
							expect.objectContaining({
								color: expect.objectContaining({
									hsv: expect.objectContaining({ saturation: 1 }),
								}),
							})
						);
					});

					it('shift-up causes color value to go up 10', () => {
						const onWorkingColorChange = vi.fn();
						const { container } = render(
							<ColorPicker
								value="#000000"
								isOpen
								events={{
									onWorkingColorChange: onWorkingColorChange,
								}}
							/>
						);

						const point = container.querySelector(selectors.gridPoint);
						fireEvent.keyDown(point, {
							shiftKey: true,
							keyCode: KEYS.UP,
							which: KEYS.UP,
						});

						expect(onWorkingColorChange).toHaveBeenCalledWith(
							expect.anything(),
							expect.objectContaining({
								color: expect.objectContaining({
									hsv: expect.objectContaining({ value: 10 }),
								}),
							})
						);
					});

					it('up key at value 100 causes no change', () => {
						const onWorkingColorChange = vi.fn();
						const { container } = render(
							<ColorPicker
								value="#ffffff"
								isOpen
								events={{
									onWorkingColorChange: onWorkingColorChange,
								}}
							/>
						);

						const point = container.querySelector(selectors.gridPoint);
						fireEvent.keyDown(point, {
							keyCode: KEYS.UP,
							which: KEYS.UP,
						});

						expect(onWorkingColorChange).toHaveBeenCalledWith(
							expect.anything(),
							expect.objectContaining({
								color: expect.objectContaining({
									hsv: expect.objectContaining({ value: 100 }),
								}),
							})
						);
					});

					it('shift-up at value > 90 causes value to be 100', () => {
						const onWorkingColorChange = vi.fn();
						const { container } = render(
							<ColorPicker
								value="#EBEBEB"
								isOpen
								events={{
									onWorkingColorChange: onWorkingColorChange,
								}}
							/>
						);

						const point = container.querySelector(selectors.gridPoint);
						fireEvent.keyDown(point, {
							shiftKey: true,
							keyCode: KEYS.UP,
							which: KEYS.UP,
						});

						expect(onWorkingColorChange).toHaveBeenCalledWith(
							expect.anything(),
							expect.objectContaining({
								color: expect.objectContaining({
									hsv: expect.objectContaining({ value: 100 }),
								}),
							})
						);
					});
				});
			});

			describe('Hex input', () => {
				it('invalid value sets error message', () => {
					const onWorkingColorChange = vi.fn();
					const { container } = render(
						<ColorPicker value=""
							isOpen
							events={{
								onWorkingColorChange: onWorkingColorChange,
							}}
						/>
					);

					const hexInput = container.querySelector(selectors.customHex);
					const input = hexInput.querySelector('input');
					fireEvent.change(input, {
						target: {
							value: 'invalid',
						},
					});

					expect(onWorkingColorChange).toHaveBeenCalledWith(
						expect.anything(),
						expect.objectContaining({
							color: expect.objectContaining({
								errors: expect.objectContaining({ hex: true }),
							}),
						})
					);
				});

				it('valid value updates color', () => {
					const onWorkingColorChange = vi.fn();
					const { container } = render(
						<ColorPicker value=""
							isOpen
							events={{
								onWorkingColorChange: onWorkingColorChange,
							}}
						/>
					);

					const hexInput = container.querySelector(selectors.customHex);
					const input = hexInput.querySelector('input');
					fireEvent.change(input, {
						target: {
							value: '#00ff00',
						},
					});

					expect(onWorkingColorChange).toHaveBeenCalledWith(
						expect.anything(),
						expect.objectContaining({
							color: expect.objectContaining({ hex: '#00ff00' }),
						})
					);
				});

				it('fires onValidateWorkingColor when set', () => {
					const spyCustomColorValidator = vi.fn();
					const customColorValidator = (hex) => {
						spyCustomColorValidator(hex);
						return true;
					};

					const { container } = render(
						<ColorPicker value=""
							isOpen
							events={{ onValidateWorkingColor: customColorValidator }}
						/>
					);

					const hexInput = container.querySelector(selectors.customHex);
					const input = hexInput.querySelector('input');
					fireEvent.change(input, {
						target: {
							value: '#00ff00',
						},
					});

					expect(spyCustomColorValidator).toHaveBeenCalledWith('#00ff00');
				});

				it('valueWorking is set in custom tab inner input', () => {
					const { container } = render(
						<ColorPicker value="" isOpen valueWorking="#00ff00" />
					);

					const hexInput = container.querySelector(selectors.customHex);
					const input = hexInput.querySelector('input');
					expect(input.value).toBe('#00ff00');
				});
			});

			describe('RGB input', () => {
				it('non-number causes error message', () => {
					const onWorkingColorChange = vi.fn();
					const { container } = render(
						<ColorPicker value=""
							isOpen
							events={{
								onWorkingColorChange: onWorkingColorChange,
							}}
						/>
					);

					const redInput = container.querySelector(selectors.customRed);
					const input = redInput.querySelector('input');
					fireEvent.change(input, {
						target: {
							value: 'abc',
						},
					});

					expect(onWorkingColorChange).toHaveBeenCalledWith(
						expect.anything(),
						expect.objectContaining({
							color: expect.objectContaining({
								errors: expect.objectContaining({ red: true }),
							}),
						})
					);
				});

				it('non-integer number causes error message', () => {
					const onWorkingColorChange = vi.fn();
					const { container } = render(
						<ColorPicker value=""
							isOpen
							events={{
								onWorkingColorChange: onWorkingColorChange,
							}}
						/>
					);

					const redInput = container.querySelector(selectors.customRed);
					const input = redInput.querySelector('input');
					fireEvent.change(input, {
						target: {
							value: 123.45,
						},
					});

					expect(onWorkingColorChange).toHaveBeenCalledWith(
						expect.anything(),
						expect.objectContaining({
							color: expect.objectContaining({
								errors: expect.objectContaining({ red: true }),
							}),
						})
					);
				});

				it('number greater than 255 causes error message', () => {
					const onWorkingColorChange = vi.fn();
					const { container } = render(
						<ColorPicker value=""
							isOpen
							events={{
								onWorkingColorChange: onWorkingColorChange,
							}}
						/>
					);

					const redInput = container.querySelector(selectors.customRed);
					const input = redInput.querySelector('input');
					fireEvent.change(input, {
						target: {
							value: 500,
						},
					});

					expect(onWorkingColorChange).toHaveBeenCalledWith(
						expect.anything(),
						expect.objectContaining({
							color: expect.objectContaining({
								errors: expect.objectContaining({ red: true }),
							}),
						})
					);
				});

				it('negative number causes error message', () => {
					const onWorkingColorChange = vi.fn();
					const { container } = render(
						<ColorPicker value=""
							isOpen
							events={{
								onWorkingColorChange: onWorkingColorChange,
							}}
						/>
					);

					const redInput = container.querySelector(selectors.customRed);
					const input = redInput.querySelector('input');
					fireEvent.change(input, {
						target: {
							value: -123,
						},
					});

					expect(onWorkingColorChange).toHaveBeenCalledWith(
						expect.anything(),
						expect.objectContaining({
							color: expect.objectContaining({
								errors: expect.objectContaining({ red: true }),
							}),
						})
					);
				});

				it('valid number updates color', () => {
					const onWorkingColorChange = vi.fn();
					const { container } = render(
						<ColorPicker value=""
							isOpen
							events={{
								onWorkingColorChange: onWorkingColorChange,
							}}
						/>
					);

					const redInput = container.querySelector(selectors.customRed);
					const input = redInput.querySelector('input');
					fireEvent.change(input, {
						target: {
							value: 123,
						},
					});

					// NOTE: RGB values come back as strings from input elements
					expect(onWorkingColorChange).toHaveBeenCalledWith(
						expect.anything(),
						expect.objectContaining({
							color: expect.objectContaining({
								rgb: expect.objectContaining({ red: '123' }),
							}),
						})
					);
				});
			});
		});
	});

	describe('Accessibility label for toggle button is configured correctly for screen reader', () => {
		it('Use assistive text label if present', () => {
			const label = 'Pick a color';
			const assistiveText = 'Should be read';
			const { container } = render(
				<ColorPicker value=""
					labels={{ label }}
					assistiveText={{ label: assistiveText }}
				/>
			);

			const button = container.querySelector(selectors.toggle);
			const span = button.querySelector('span');
			expect(span.textContent).toContain(assistiveText);
		});

		it('Use label for screen reader if assistive text is not provided', () => {
			const label = 'Pick a color';
			const { container } = render(<ColorPicker value="" labels={{ label }} />);

			const button = container.querySelector(selectors.toggle);
			const span = button.querySelector('span');
			expect(span.textContent).toContain(label);
		});
	});

	describe('Control model', () => {
		it('summary input renders the controlled value and reports typed text without changing', () => {
			const onChange = vi.fn();
			const { container } = render(
				<ColorPicker events={{ onChange }} value="#000000" />
			);

			const input = container.querySelector(selectors.summaryInput);
			fireEvent.change(input, { target: { value: '#ff0000' } });

			expect(onChange).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({ color: '#ff0000', isValid: true })
			);
			// The parent did not update `value`, so the input keeps showing it
			expect(input.value).toBe('#000000');
		});

		it('summary input does not type uncontrolled when events.onChange is missing', () => {
			const { container } = render(<ColorPicker value="#000000" />);

			const input = container.querySelector(selectors.summaryInput);
			fireEvent.change(input, { target: { value: '#ff0000' } });

			expect(input.value).toBe('#000000');
		});

		it('summary input follows value when the parent updates it', () => {
			const { container } = render(<StatefulColorPicker />);

			const input = container.querySelector(selectors.summaryInput);
			fireEvent.change(input, { target: { value: '#ff0000' } });

			expect(input.value).toBe('#ff0000');
		});

		it('a parent that rejects Done keeps the old value', () => {
			const onChange = vi.fn();
			const { container } = render(
				<ColorPicker
					defaultIsOpen
					events={{ onChange }}
					swatchColors={['#ff0000']}
					value="#000000"
				/>
			);

			fireEvent.click(container.querySelector(selectors.swatch));
			fireEvent.click(container.querySelector(selectors.submit));

			expect(onChange).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({ color: '#ff0000', isValid: true })
			);
			expect(container.querySelector(selectors.summaryInput).value).toBe(
				'#000000'
			);
		});

		it('derives the error message from value instead of seeding it', () => {
			const { container, rerender } = render(<ColorPicker value="#000000" />);
			expect(container.querySelector('.slds-form-error')).not.toBeInTheDocument();

			rerender(<ColorPicker value="not-a-color" />);
			expect(container.querySelector('.slds-form-error')).toHaveTextContent(
				'The color entered is invalid'
			);

			rerender(<ColorPicker value="#00ff00" />);
			expect(container.querySelector('.slds-form-error')).not.toBeInTheDocument();

			rerender(<ColorPicker errorText="Custom error" value="#00ff00" />);
			expect(container.querySelector('.slds-form-error')).toHaveTextContent(
				'Custom error'
			);
		});

		it('warns when value is omitted and renders no color', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const { container } = render(<ColorPicker />);

			expect(container.querySelector(selectors.summaryInput).value).toBe('');
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining('`value` is required by SLDSColorPicker')
			);
			consoleError.mockRestore();
		});

		describe('isOpen', () => {
			it('controlled isOpen={false} does not open on click, but requests open', () => {
				const onRequestOpen = vi.fn();
				const { container } = render(
					<ColorPicker
						isOpen={false}
						onRequestOpen={onRequestOpen}
						value="#000000"
					/>
				);

				fireEvent.click(container.querySelector(selectors.toggle));

				expect(onRequestOpen).toHaveBeenCalledTimes(1);
				expect(
					container.querySelector(selectors.popover)
				).not.toBeInTheDocument();
			});

			it('controlled isOpen stays open on Cancel, Done and trigger click, and requests close', () => {
				const onRequestClose = vi.fn();
				const onRequestOpen = vi.fn();
				const { container } = render(
					<ColorPicker
						isOpen
						onRequestClose={onRequestClose}
						onRequestOpen={onRequestOpen}
						value="#000000"
					/>
				);

				fireEvent.click(container.querySelector(selectors.cancel));
				fireEvent.click(container.querySelector(selectors.submit));
				fireEvent.click(container.querySelector(selectors.toggle));

				expect(container.querySelector(selectors.popover)).toBeInTheDocument();
				expect(onRequestClose.mock.calls.map((call) => call[1])).toEqual([
					{ trigger: 'cancel' },
					{ trigger: 'submit' },
					{ trigger: 'triggerClick' },
				]);
				// A click while open is a close request, not an open request
				expect(onRequestOpen).not.toHaveBeenCalled();
			});

			it('controlled isOpen opens and closes when the parent updates it', () => {
				const ControlledOpen = () => {
					const [isOpen, setIsOpen] = useState(false);
					return (
						<ColorPicker
							isOpen={isOpen}
							onRequestClose={() => setIsOpen(false)}
							onRequestOpen={() => setIsOpen(true)}
							value="#000000"
						/>
					);
				};
				const { container } = render(<ControlledOpen />);

				fireEvent.click(container.querySelector(selectors.toggle));
				expect(container.querySelector(selectors.popover)).toBeInTheDocument();

				fireEvent.click(container.querySelector(selectors.cancel));
				expect(
					container.querySelector(selectors.popover)
				).not.toBeInTheDocument();
			});

			it('uncontrolled opens and closes itself without callbacks', () => {
				const { container } = render(<ColorPicker value="#000000" />);

				fireEvent.click(container.querySelector(selectors.toggle));
				expect(container.querySelector(selectors.popover)).toBeInTheDocument();

				fireEvent.click(container.querySelector(selectors.cancel));
				expect(
					container.querySelector(selectors.popover)
				).not.toBeInTheDocument();

				fireEvent.click(container.querySelector(selectors.toggle));
				fireEvent.click(container.querySelector(selectors.submit));
				expect(
					container.querySelector(selectors.popover)
				).not.toBeInTheDocument();
			});

			it('uncontrolled with callbacks still opens and closes itself', () => {
				const onRequestOpen = vi.fn();
				const onRequestClose = vi.fn();
				const { container } = render(
					<ColorPicker
						onRequestClose={onRequestClose}
						onRequestOpen={onRequestOpen}
						value="#000000"
					/>
				);

				fireEvent.click(container.querySelector(selectors.toggle));
				expect(container.querySelector(selectors.popover)).toBeInTheDocument();
				expect(onRequestOpen).toHaveBeenCalledTimes(1);

				fireEvent.click(container.querySelector(selectors.toggle));
				expect(
					container.querySelector(selectors.popover)
				).not.toBeInTheDocument();
				expect(onRequestClose).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({ trigger: 'triggerClick' })
				);
			});

			it('defaultIsOpen seeds the uncontrolled open state', () => {
				const { container } = render(
					<ColorPicker defaultIsOpen value="#000000" />
				);
				expect(container.querySelector(selectors.popover)).toBeInTheDocument();

				fireEvent.click(container.querySelector(selectors.cancel));
				expect(
					container.querySelector(selectors.popover)
				).not.toBeInTheDocument();
			});
		});

		describe('working color', () => {
			it('re-syncs the draft from value when the popover opens', () => {
				const { container, rerender } = render(
					<ColorPicker
						swatchColors={['#ff0000']}
						value="#000000"
						variant="custom"
					/>
				);
				const customHexValue = () =>
					container.querySelector(`${selectors.customHex} input`).value;

				fireEvent.click(container.querySelector(selectors.toggle));
				expect(customHexValue()).toBe('#000000');

				fireEvent.change(
					container.querySelector(`${selectors.customHex} input`),
					{ target: { value: '#00ff00' } }
				);
				expect(customHexValue()).toBe('#00ff00');

				// Cancel discards the draft
				fireEvent.click(container.querySelector(selectors.cancel));
				fireEvent.click(container.querySelector(selectors.toggle));
				expect(customHexValue()).toBe('#000000');

				// A new value is picked up the next time the popover opens
				fireEvent.click(container.querySelector(selectors.cancel));
				rerender(
					<ColorPicker
						swatchColors={['#ff0000']}
						value="#0000ff"
						variant="custom"
					/>
				);
				fireEvent.click(container.querySelector(selectors.toggle));
				expect(customHexValue()).toBe('#0000ff');
			});

			it('controlled valueWorking is honored when the parent rejects a change', () => {
				const onWorkingColorChange = vi.fn();
				const { container } = render(
					<ColorPicker
						events={{ onWorkingColorChange }}
						isOpen
						value="#000000"
						valueWorking="#00ff00"
						variant="custom"
					/>
				);
				const hexInput = container.querySelector(`${selectors.customHex} input`);

				fireEvent.change(hexInput, { target: { value: '#ff0000' } });

				expect(onWorkingColorChange).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({
						color: expect.objectContaining({ hex: '#ff0000' }),
					})
				);
				expect(hexInput.value).toBe('#00ff00');
			});

			it('controlled valueWorking follows the parent', () => {
				const ControlledWorking = () => {
					const [valueWorking, setValueWorking] = useState('#00ff00');
					return (
						<ColorPicker
							events={{
								onWorkingColorChange: (event, data) =>
									setValueWorking(data.color.hex),
							}}
							isOpen
							value="#000000"
							valueWorking={valueWorking}
							variant="custom"
						/>
					);
				};
				const { container } = render(<ControlledWorking />);
				const hexInput = container.querySelector(`${selectors.customHex} input`);
				const redInput = container.querySelector(`${selectors.customRed} input`);

				fireEvent.change(hexInput, { target: { value: '#ff0000' } });
				expect(hexInput.value).toBe('#ff0000');

				// Partial (invalid) RGB input keeps the hex, so the draft is kept
				fireEvent.change(redInput, { target: { value: 'abc' } });
				expect(redInput.value).toBe('abc');
			});
		});
	});
});
