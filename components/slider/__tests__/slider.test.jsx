import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Slider from '../';

describe('SLDSSlider', () => {
	describe('Standard Slider with Label', () => {
		it('has type of "range"', () => {
			const { container } = render(<Slider label="Slider Label" id="custom-id" />);

			const slider = container.querySelector('input');
			expect(slider).toHaveAttribute('type', 'range');
		});

		it('is wrapped in div with class "slds-form-element"', () => {
			const { container } = render(<Slider label="Slider Label" id="custom-id" />);

			const wrapper = container.querySelector('.slds-form-element');
			expect(wrapper).toHaveClass('slds-form-element');
		});

		it('renders label', () => {
			const { container } = render(<Slider label="Slider Label" id="custom-id" />);

			const labelText = container.querySelector('.slds-slider-label__label');
			expect(labelText.textContent).toBe('Slider Label');
		});

		it('renders slider element with class "slds-slider"', () => {
			const { container } = render(<Slider label="Slider Label" id="custom-id" />);

			const slider = container.querySelector('input');
			// NOTE: The input element has class slds-slider__range, not slds-slider
			expect(slider).toHaveClass('slds-slider__range');
		});

		it('has an id', () => {
			const { container } = render(<Slider label="Slider Label" id="custom-id" />);

			const slider = container.querySelector('input');
			expect(slider).toHaveAttribute('id');
		});

		it('can pass custom id', () => {
			const { container } = render(<Slider label="Slider Label" id="custom-id" />);

			const slider = container.querySelector('input');
			expect(slider).toHaveAttribute('id', 'custom-id');
		});

		it('has associated label for tag pointing to id of slider', () => {
			const { container } = render(<Slider label="Slider Label" id="custom-id" />);

			const label = container.querySelector('.slds-form-element__label');
			const slider = container.querySelector('input');
			const labelForTag = label.getAttribute('for');
			const sliderId = slider.getAttribute('id');
			expect(labelForTag).toBe(sliderId);
		});
	});

	describe('Component basic props', () => {
		it('has min', () => {
			const { container } = render(
				<Slider
					label="Slider Label"
					id="custom-id"
					value={200}
					min={0}
					max={400}
					step={100}
				/>
			);

			const slider = container.querySelector('input');
			expect(slider).toHaveAttribute('min', '0');
		});

		it('has max', () => {
			const { container } = render(
				<Slider
					label="Slider Label"
					id="custom-id"
					value={200}
					min={0}
					max={400}
					step={100}
				/>
			);

			const slider = container.querySelector('input');
			expect(slider).toHaveAttribute('max', '400');
		});

		it('min/max matches label range', () => {
			const { container } = render(
				<Slider
					label="Slider Label"
					id="custom-id"
					value={200}
					min={0}
					max={400}
					step={100}
				/>
			);

			const labelRange = container.querySelector('.slds-slider-label__range');
			expect(labelRange.textContent).toBe('0 - 400');
		});

		it('has step', () => {
			const { container } = render(
				<Slider
					label="Slider Label"
					id="custom-id"
					value={200}
					min={0}
					max={400}
					step={100}
				/>
			);

			const slider = container.querySelector('input');
			expect(slider).toHaveAttribute('step', '100');
		});

		it('has value', () => {
			const { container } = render(
				<Slider
					label="Slider Label"
					id="custom-id"
					value={200}
					min={0}
					max={400}
					step={100}
				/>
			);

			const slider = container.querySelector('input');
			expect(slider).toHaveAttribute('value', '200');
		});

		it('value matches slider value label', () => {
			const { container } = render(
				<Slider
					label="Slider Label"
					id="custom-id"
					value={200}
					min={0}
					max={400}
					step={100}
				/>
			);

			const slider = container.querySelector('input');
			const sliderValue = container.querySelector('.slds-slider__value');
			expect(slider.value).toBe(sliderValue.textContent);
		});
	});

	describe('onInput, onChange callbacks are set', () => {
		it('onChange trigged callback', () => {
			let callbackCalled = false;
			const { container } = render(
				<Slider
					value={200}
					min={0}
					max={400}
					step={100}
					onChange={(e, { value }) => {
						expect(value).toBe(300);
						callbackCalled = true;
					}}
				/>
			);

			const trigger = container.querySelector('input');
			fireEvent.change(trigger, { target: { value: 300 } });
			expect(callbackCalled).toBe(true);
		});

		it('onInput trigged callback', () => {
			let callbackCalled = false;
			const { container } = render(
				<Slider
					value={200}
					min={0}
					max={400}
					step={100}
					onInput={(e, { value }) => {
						expect(value).toBe(300);
						callbackCalled = true;
					}}
				/>
			);

			const trigger = container.querySelector('input');
			fireEvent.input(trigger, { target: { value: '300' } });
			expect(callbackCalled).toBe(true);
		});
	});

	describe('Slider with Assistive Text Label', () => {
		it('renders label (assitive)', () => {
			const { container } = render(
				<Slider assistiveText={{ label: 'Assistive Label' }} />
			);

			const labelText = container.querySelector('.slds-slider-label__label');
			expect(labelText.textContent).toBe('Assistive Label');
		});

		it('label has class "slds-assistive-text"', () => {
			const { container } = render(
				<Slider assistiveText={{ label: 'Assistive Label' }} />
			);

			const label = container.querySelector('.slds-form-element__label');
			expect(label).toHaveClass('slds-assistive-text');
		});

		it('has associated label for tag pointing to id of slider', () => {
			const { container } = render(
				<Slider assistiveText={{ label: 'Assistive Label' }} />
			);

			const label = container.querySelector('.slds-form-element__label');
			const slider = container.querySelector('input');
			const labelForTag = label.getAttribute('for');
			const sliderId = slider.getAttribute('id');
			expect(labelForTag).toBe(sliderId);
		});
	});

	describe('Disabled slider', () => {
		it('slider has attribute "disabled"', () => {
			const { container } = render(<Slider label="Slider Label" disabled />);

			const slider = container.querySelector('input');
			expect(slider).toHaveAttribute('disabled');
		});
	});

	describe('Slider size', () => {
		it('renders size class', () => {
			const { container } = render(
				<Slider id="custom-id" label="Slider Label" size="medium" />
			);

			const sliderContainer = container.querySelector('.slds-slider');
			expect(sliderContainer).toHaveClass('slds-size_medium');
		});
	});

	describe('Multiple sliders', () => {
		it('each slider has unique generated id', () => {
			const { container: container1 } = render(<Slider label="Slider One" />);
			const { container: container2 } = render(<Slider label="Slider Two" />);

			const slider1 = container1.querySelector('input');
			const slider2 = container2.querySelector('input');

			expect(slider1.getAttribute('id')).not.toBe(slider2.getAttribute('id'));
		});
	});

	describe('Required slider in Error State', () => {
		it('slider wrapper has class "slds-has-error"', () => {
			const { container } = render(
				<Slider
					label="Slider Label"
					required
					errorText="Error Message"
				/>
			);

			const wrapper = container.querySelector('.slds-form-element');
			expect(wrapper).toHaveClass('slds-has-error');
		});

		it('renders error message', () => {
			const { container } = render(
				<Slider
					label="Slider Label"
					required
					errorText="Error Message"
				/>
			);

			const error = container.querySelector('.slds-form-element__help');
			expect(error.textContent).toBe('Error Message');
		});

		it('has associated aria-describedby pointing to id of error message', () => {
			const { container } = render(
				<Slider
					label="Slider Label"
					required
					errorText="Error Message"
				/>
			);

			const slider = container.querySelector('input');
			const error = container.querySelector('.slds-form-element__help');
			const sliderDescribedBy = slider.getAttribute('aria-describedby');
			const errorId = error.getAttribute('id');
			expect(sliderDescribedBy).toBe(errorId);
		});
	});

	describe('Vertical slider', () => {
		it('slider has class "slds-slider_vertical"', () => {
			const { container } = render(<Slider label="Slider Label" vertical />);

			const sliderContainer = container.querySelector('.slds-slider');
			expect(sliderContainer).toHaveClass('slds-slider_vertical');
		});
	});
});
