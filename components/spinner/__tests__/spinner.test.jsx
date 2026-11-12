import { createRef } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

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

	describe('className and ref', () => {
		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('puts className, style and ref on the container when hasContainer', () => {
			const ref = createRef();
			const { container } = render(
				<Spinner
					className="root-class"
					classNameSpinner="spinner-class"
					ref={ref}
					style={{ zIndex: 5 }}
				/>
			);
			const root = container.firstChild;
			expect(root).toHaveClass('slds-spinner_container', 'root-class');
			expect(root).toHaveStyle({ zIndex: 5 });
			expect(ref.current).toBe(root);
			expect(getSpinner(container)).toHaveClass('spinner-class');
			expect(getSpinner(container)).not.toHaveClass('root-class');
		});

		it('puts className, style and ref on .slds-spinner without a container', () => {
			const ref = createRef();
			const { container } = render(
				<Spinner
					className="root-class"
					classNameSpinner="spinner-class"
					hasContainer={false}
					ref={ref}
					style={{ zIndex: 5 }}
				/>
			);
			const root = container.firstChild;
			expect(root).toBe(getSpinner(container));
			expect(root).toHaveClass('root-class', 'spinner-class');
			expect(root).toHaveStyle({ zIndex: 5 });
			expect(ref.current).toBe(root);
		});

		it('still applies deprecated containerClassName and containerStyle, and warns', async () => {
			// Fresh modules so the once-per-session warning state is reset
			vi.resetModules();
			const { default: FreshSpinner } = await import('../../spinner');
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			const { container } = render(
				<FreshSpinner
					className="new-class"
					containerClassName="old-class"
					containerStyle={{ zIndex: 1, top: '2px' }}
					style={{ zIndex: 5 }}
				/>
			);
			const root = container.firstChild;
			expect(root).toHaveClass(
				'slds-spinner_container',
				'old-class',
				'new-class'
			);
			expect(root).toHaveStyle({ zIndex: 5, top: '2px' });

			const messages = consoleError.mock.calls.map((call) => call.join(' '));
			expect(
				messages.some(
					(m) =>
						m.includes('`containerClassName` will be removed') &&
						m.includes('Use `className` instead.')
				)
			).toBe(true);
			expect(
				messages.some(
					(m) =>
						m.includes('`containerStyle` will be removed') &&
						m.includes('Use `style` instead.')
				)
			).toBe(true);
		});
	});
});
