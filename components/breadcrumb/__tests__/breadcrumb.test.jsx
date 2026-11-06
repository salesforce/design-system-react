import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../index';

const trail = [
	<a key="a" href="#a">
		A
	</a>,
];

describe('Breadcrumb', () => {
	it('puts className and style on the root nav', () => {
		render(<Breadcrumb trail={trail} className="x" style={{ color: 'red' }} />);
		const nav = screen.getByRole('navigation');
		expect(nav).toHaveClass('x');
		expect(nav.style.color).toBe('red');
	});

	it('still honours the deprecated styleContainer', () => {
		render(<Breadcrumb trail={trail} styleContainer={{ color: 'blue' }} />);
		expect(screen.getByRole('navigation').style.color).toBe('blue');
	});
});
