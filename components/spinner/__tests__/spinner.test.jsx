import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Spinner from '../../spinner';

describe('Spinner', () => {
	const getSpinner = (container) => container.querySelector('.slds-spinner');

	describe('Default spinner renders properly', () => {
		it('Spinner exists', () => {
			const { container } = render(<Spinner />);
			expect(getSpinner(container)).toBeInTheDocument();
		});

		it('renders default classes when no props passed in', () => {
			const { container } = render(<Spinner />);
			expect(getSpinner(container)).toHaveClass(
				'slds-spinner',
				'slds-spinner_medium'
			);
		});
	});

	describe('Props render proper css classes', () => {
		it('renders correct classes when props passed in', () => {
			const { container } = render(
				<Spinner size="small" variant="brand" isDelayed />
			);
			const spinner = getSpinner(container);
			expect(spinner).toHaveClass(
				'slds-spinner_brand',
				'slds-spinner_delayed',
				'slds-spinner_small'
			);
		});
	});

	describe('Container', () => {
		it('renders the container by default', () => {
			const { container } = render(<Spinner />);
			expect(
				container.querySelector('.slds-spinner_container > .slds-spinner')
			).toBeInTheDocument();
		});

		it('omits the container when hasNoContainer is set', () => {
			const { container } = render(<Spinner hasNoContainer />);
			expect(
				container.querySelector('.slds-spinner_container')
			).not.toBeInTheDocument();
			expect(getSpinner(container)).toBeInTheDocument();
		});
	});

	describe('Deprecated props', () => {
		it('still honors hasContainer, and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const { container } = render(<Spinner hasContainer={false} />);
			expect(
				container.querySelector('.slds-spinner_container')
			).not.toBeInTheDocument();
			expect(getSpinner(container)).toBeInTheDocument();

			const { container: withContainer } = render(<Spinner hasContainer />);
			expect(
				withContainer.querySelector('.slds-spinner_container')
			).toBeInTheDocument();

			const messages = consoleError.mock.calls.map((args) => args.join(' '));
			expect(
				messages.some(
					(m) => m.includes('`hasContainer`') && m.includes('`hasNoContainer`')
				)
			).toBe(true);
			consoleError.mockRestore();
		});
	});
});
