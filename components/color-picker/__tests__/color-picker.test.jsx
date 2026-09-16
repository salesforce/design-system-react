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

describe('SLDSColorPicker', () => {
	describe('Summary input', () => {
		it('fires onChange with value and isValid set to true when valid', () => {
			const onChange = vi.fn();
			const { container } = render(
				<ColorPicker
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
				<ColorPicker
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
				<ColorPicker
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
				<ColorPicker
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
				<ColorPicker onRequestOpen={onRequestOpenSpy} onOpen={onOpenSpy} />
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
			const { container } = render(<ColorPicker isOpen onClose={onCloseSpy} />);

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
					<ColorPicker isOpen value="#000000" swatchColors={['#ff0000']} />
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
							<ColorPicker
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
						<ColorPicker
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
						<ColorPicker
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
						<ColorPicker
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
						<ColorPicker isOpen valueWorking="#00ff00" />
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
						<ColorPicker
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
						<ColorPicker
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
						<ColorPicker
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
						<ColorPicker
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
						<ColorPicker
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
				<ColorPicker
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
			const { container } = render(<ColorPicker labels={{ label }} />);

			const button = container.querySelector(selectors.toggle);
			const span = button.querySelector('span');
			expect(span.textContent).toContain(label);
		});
	});
});
