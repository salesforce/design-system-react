import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

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
			expect(getSpinner(container)).toHaveClass('slds-spinner', 'slds-spinner_medium');
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
});
