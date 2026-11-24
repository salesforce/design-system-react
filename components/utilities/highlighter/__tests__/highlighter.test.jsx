import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Highlighter from '../index';

// Regression: `react-highlighter-ts` hard-depended on React 17, so a
// consumer's install nested a React 17 under it and every highlight threw
// "Objects are not valid as a React child". The highlighter has no
// dependency now; `check-packed-install` checks a consumer gets one React.
describe('Highlighter', () => {
	it('marks every case-insensitive match of a string and keeps the rest as spans', () => {
		const { container } = render(
			<Highlighter search="ap" className="label">
				Apple and grape
			</Highlighter>
		);
		expect(container.innerHTML).toBe(
			'<span><span class="label" title="Apple and grape">' +
				'<mark class="">Ap</mark><span>ple and gr</span><mark class="">ap</mark><span>e</span>' +
				'</span></span>'
		);
	});

	it('treats a string search literally, not as a pattern', () => {
		const { container } = render(
			<Highlighter search="a.c">abc a.c</Highlighter>
		);
		expect(
			[...container.querySelectorAll('mark')].map((m) => m.textContent)
		).toEqual(['a.c']);
	});

	it('uses a RegExp search as given, even with the global flag', () => {
		const { container } = render(
			<Highlighter search={/b+/g}>abbcb</Highlighter>
		);
		expect(
			[...container.querySelectorAll('mark')].map((m) => m.textContent)
		).toEqual(['bb', 'b']);
	});

	it('keeps the text, unmarked, on a zero-width match', () => {
		const { container } = render(<Highlighter search={/x*/}>abc</Highlighter>);
		expect(container.querySelector('mark')).toBeNull();
		expect(container.textContent).toBe('abc');
	});

	it('renders the text unmarked without a search', () => {
		const { container } = render(
			<Highlighter className="label">Apple</Highlighter>
		);
		expect(container.innerHTML).toBe(
			'<span class="label" title="Apple">Apple</span>'
		);
	});
});
