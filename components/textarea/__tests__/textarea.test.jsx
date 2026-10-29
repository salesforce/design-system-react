import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import Textarea from '../';

describe('SLDS TEXTAREA', () => {
	const defaultProps = {
		placeholder: 'Placeholder Text',
	};

	describe('Standard Textarea with Label', () => {
		it('is wrapped in div with class "slds-form-element"', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					labels={{ label: 'Textarea Label' }}
					id="custom-id"
				/>
			);

			const wrapper = container.querySelector('.slds-form-element');
			expect(wrapper).toBeInTheDocument();
			expect(wrapper).toHaveClass('slds-form-element');
		});

		it('renders label', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					labels={{ label: 'Textarea Label' }}
					id="custom-id"
				/>
			);

			const label = container.querySelector('.slds-form-element__label');
			expect(label).toBeInTheDocument();
			expect(label.textContent).toBe('Textarea Label');
		});

		it('renders textarea element with class "slds-textarea"', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					labels={{ label: 'Textarea Label' }}
					id="custom-id"
				/>
			);

			const textarea = container.querySelector('textarea');
			expect(textarea).toBeInTheDocument();
			expect(textarea).toHaveClass('slds-textarea');
		});

		it('has an id', () => {
			const { container } = render(
				<Textarea {...defaultProps} labels={{ label: 'Textarea Label' }} />
			);

			const textarea = container.querySelector('textarea');
			expect(textarea.getAttribute('id')).toBeTruthy();
		});

		it('can pass custom id', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					labels={{ label: 'Textarea Label' }}
					id="custom-id"
				/>
			);

			const textarea = container.querySelector('textarea');
			expect(textarea).toHaveAttribute('id', 'custom-id');
		});

		it('renders placeholder text', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					labels={{ label: 'Textarea Label' }}
					id="custom-id"
				/>
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
					<Textarea {...defaultProps} labels={{ label: 'Textarea One' }} />
					<Textarea {...defaultProps} labels={{ label: 'Textarea Two' }} />
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
					hasError
					labels={{ label: 'Textarea Label', error: 'Error Message' }}
					required={true}
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
					hasError
					labels={{ label: 'Textarea Label', error: 'Error Message' }}
					required={true}
				/>
			);

			const wrapper = container.querySelector('.slds-form-element');
			expect(wrapper).toHaveClass('slds-has-error');
		});

		it('renders error message', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					hasError
					labels={{ label: 'Textarea Label', error: 'Error Message' }}
					required={true}
				/>
			);

			const error = container.querySelector('.slds-form-element__help');
			expect(error).toBeInTheDocument();
			expect(error.textContent).toBe('Error Message');
		});
	});

	describe('maxLength', () => {
		it('passes a numeric maxLength to the textarea', () => {
			const { container } = render(
				<Textarea
					{...defaultProps}
					labels={{ label: 'Textarea Label' }}
					maxLength={100}
				/>
			);

			expect(container.querySelector('textarea')).toHaveAttribute(
				'maxlength',
				'100'
			);
		});

		it('still accepts a string maxLength from untyped callers and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			const { container } = render(
				<Textarea
					{...defaultProps}
					labels={{ label: 'Textarea Label' }}
					maxLength="50"
				/>
			);

			expect(container.querySelector('textarea')).toHaveAttribute(
				'maxlength',
				'50'
			);
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining('`maxLength` as a string has been deprecated')
			);
			consoleError.mockRestore();
		});
	});

	describe('Error labels', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('does not show labels.error until hasError is true', () => {
			const { container, rerender } = render(
				<Textarea
					labels={{ label: 'Textarea Label', error: 'Error Message' }}
				/>
			);

			expect(container.querySelector('.slds-form-element')).not.toHaveClass(
				'slds-has-error'
			);
			expect(container.querySelector('.slds-form-element__help')).toBeNull();

			rerender(
				<Textarea
					hasError
					labels={{ label: 'Textarea Label', error: 'Error Message' }}
				/>
			);

			const error = container.querySelector('.slds-form-element__help');
			expect(container.querySelector('.slds-form-element')).toHaveClass(
				'slds-has-error'
			);
			expect(error).toHaveTextContent('Error Message');
			expect(container.querySelector('textarea')).toHaveAttribute(
				'aria-describedby',
				error.id
			);
		});

		it('still accepts the deprecated label and errorText props and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			const { container } = render(
				<Textarea label="Old Label" errorText="Old Error" />
			);

			expect(
				container.querySelector('.slds-form-element__label')
			).toHaveTextContent('Old Label');
			expect(container.querySelector('.slds-form-element')).toHaveClass(
				'slds-has-error'
			);
			expect(
				container.querySelector('.slds-form-element__help')
			).toHaveTextContent('Old Error');

			const messages = consoleError.mock.calls.map((args) => args.join(' '));
			expect(messages.some((m) => m.includes('`errorText`'))).toBe(true);
			expect(
				messages.some(
					(m) => m.includes('`label`') && m.includes('labels.label')
				)
			).toBe(true);
		});
	});
});
