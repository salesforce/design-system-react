import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ProgressBar from '../index';

describe('ProgressBar', () => {
	it('puts className on the root and classNameBar on the progressbar element', () => {
		const { container } = render(
			<ProgressBar
				id="p"
				value={40}
				className="on-root"
				classNameBar="on-bar"
			/>
		);
		expect(container.firstChild).toHaveClass('on-root');
		expect(container.firstChild).toHaveAttribute('id', 'p');
		const bar = screen.getByRole('progressbar');
		expect(bar).toHaveClass('on-bar');
		expect(bar).not.toHaveClass('on-root');
	});
});
