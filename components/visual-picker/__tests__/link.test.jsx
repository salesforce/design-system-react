import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import VisualPickerLink from '../link';

describe('VisualPickerLink', () => {
	it('renders an anchor with the href', () => {
		const { container } = render(
			<VisualPickerLink href="https://example.com" title="Title" />
		);

		expect(container.querySelector('a')).toHaveAttribute(
			'href',
			'https://example.com'
		);
	});

	it('warns once when href is missing', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		render(<VisualPickerLink title="First" />);
		render(<VisualPickerLink title="Second" />);

		const warnings = consoleError.mock.calls.filter(([message]) =>
			message.includes('`href` is required by SLDSVisualPickerLink')
		);
		expect(warnings).toHaveLength(1);
		consoleError.mockRestore();
	});
});

describe('VisualPickerLink heading level', () => {
	it('renders the title as an h2 by default', () => {
		const { container } = render(<VisualPickerLink href="#" title="Title" />);
		expect(container.querySelector('h2')).toHaveTextContent('Title');
	});

	it('renders the title at headingLevel', () => {
		const { container } = render(
			<VisualPickerLink href="#" title="Title" headingLevel={4} />
		);
		expect(container.querySelector('h4')).toHaveTextContent('Title');
		expect(container.querySelector('h2')).toBeNull();
	});
});
