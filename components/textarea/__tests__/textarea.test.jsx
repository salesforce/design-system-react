import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Textarea from '../';

describe('SLDS TEXTAREA', () => {
	const defaultProps = {
		placeholder: 'Placeholder Text',
	};

	describe('Standard Textarea with Label', () => {
		it('is wrapped in div with class "slds-form-element"', () => {
			const { container } = render(
				<Textarea {...defaultProps} label="Textarea Label" id="custom-id" />
			);

			const wrapper = container.querySelector('.slds-form-element');
			expect(wrapper).toBeInTheDocument();
			expect(wrapper).toHaveClass('slds-form-element');
		});

		it('renders label', () => {
			const { container } = render(
				<Textarea {...defaultProps} label="Textarea Label" id="custom-id" />
			);

			const label = container.querySelector('.slds-form-element__label');
			expect(label).toBeInTheDocument();
			expect(label.textContent).toBe('Textarea Label');
		});

		it('renders textarea element with class "slds-textarea"', () => {
			const { container } = render(
				<Textarea {...defaultProps} label="Textarea Label" id="custom-id" />
			);

			const textarea = container.querySelector('textarea');
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveClass('slds-textarea');
		});

		it('has an id', () => {
			const { container } = render(
				<Textarea {...defaultProps} label="Textarea Label" />
			);

			const textarea = container.querySelector('textarea');
			expect(textarea.getAttribute('id')).toBeTruthy();
		});

		it('can pass custom id', () => {
			const { container } = render(
				<Textarea {...defaultProps} label="Textarea Label" id="custom-id" />
			);

			const textarea = container.querySelector('textarea');
			expect(textarea).toHaveAttribute('id', 'custom-id');
		});

		it('renders placeholder text', () => {
			const { container } = render(
				<Textarea {...defaultProps} label="Textarea Label" id="custom-id" />
			);

			const textarea = container.querySelector('textarea');
			expect(textarea).toHaveAttribute('placeholder', 'Placeholder Text');
		});
	});

	describe('Textarea without Label', () => {
		it('renders label (assistive)', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					assistiveText={{ label: 'Assistive Label' }}
				/>
			);

			const label = container.querySelector('.slds-form-element__label');
			expect(label).toBeInTheDocument();
			expect(label.textContent).toBe('Assistive Label');
		});

		it('label has class "slds-assistive-text"', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					assistiveText={{ label: 'Assistive Label' }}
				/>
			);

			const label = container.querySelector('.slds-form-element__label');
			expect(label).toHaveClass('slds-assistive-text');
		});
	});

	describe('Multiple Textareas', () => {
		it('each textarea has unique generated id', () => {
			const { container } = render(
				<div>
					<Textarea {...defaultProps} label="Textarea One" />
					<Textarea {...defaultProps} label="Textarea Two" />
				</div>
			);

			const textareas = container.querySelectorAll('textarea');
			expect(textareas).toHaveLength(2);

			const textarea1Id = textareas[0].getAttribute('id');
			const textarea2Id = textareas[1].getAttribute('id');

			expect(textarea1Id).toBeTruthy();
			expect(textarea2Id).toBeTruthy();
			expect(textarea1Id).not.toBe(textarea2Id);
		});
	});

	describe('Required Textarea in Error State', () => {
		it('textarea wrapper contains an <abbr> that has class "slds-required"', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					label="Textarea Label"
					required={true}
					errorText="Error Message"
				/>
			);

			const abbr = container.querySelector('abbr');
			expect(abbr).toBeInTheDocument();
			expect(abbr).toHaveClass('slds-required');
		});

		it('textarea wrapper has class "slds-has-error"', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					label="Textarea Label"
					required={true}
					errorText="Error Message"
				/>
			);

			const wrapper = container.querySelector('.slds-form-element');
			expect(wrapper).toHaveClass('slds-has-error');
		});

		it('renders error message', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					label="Textarea Label"
					required={true}
					errorText="Error Message"
				/>
			);

			const error = container.querySelector('.slds-form-element__help');
			expect(error).toBeInTheDocument();
			expect(error.textContent).toBe('Error Message');
		});
	});
});
