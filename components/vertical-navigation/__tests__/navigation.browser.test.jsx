import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import VerticalNavigation from '../../vertical-navigation';

const categories = [
	{
		id: 'reports',
		label: 'Reports',
		items: [
			{ id: 'link', label: 'With url', url: '#with-url' },
			{ id: 'button', label: 'Without url' },
		],
	},
];

describe('VerticalNavigation item without url (real SLDS)', () => {
	it('renders a button that lays out like the link items', () => {
		const { container } = render(
			<div style={{ width: '320px' }}>
				<VerticalNavigation
					categories={categories}
					onSelect={() => {}}
					selectedId={null}
				/>
			</div>
		);

		const link = container.querySelector('a[data-id="link"]');
		const button = container.querySelector('button[data-id="button"]');
		const linkStyle = getComputedStyle(link);
		const buttonStyle = getComputedStyle(button);

		expect(button.getBoundingClientRect().width).toBe(
			link.getBoundingClientRect().width
		);
		expect(button.getBoundingClientRect().height).toBe(
			link.getBoundingClientRect().height
		);
		[
			'display',
			'padding-left',
			'font-size',
			'font-family',
			'color',
			'text-align',
			'background-color',
		].forEach((property) => {
			expect(buttonStyle.getPropertyValue(property)).toBe(
				linkStyle.getPropertyValue(property)
			);
		});
	});
});
