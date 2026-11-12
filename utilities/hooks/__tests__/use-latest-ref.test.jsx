import { useLayoutEffect } from 'react';
import { render, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useLatestRef } from '../use-latest-ref';

describe('useLatestRef', () => {
	it('returns the same ref holding the latest value', () => {
		const first = { onChange: () => {} };
		const second = { onChange: () => {} };
		const { result, rerender } = renderHook(
			({ value }) => useLatestRef(value),
			{
				initialProps: { value: first },
			}
		);
		const ref = result.current;
		expect(ref.current).toBe(first);

		rerender({ value: second });
		expect(result.current).toBe(ref);
		expect(ref.current).toBe(second);
	});

	it('holds the new value when a child layout effect reads it in the same commit', () => {
		const seen = [];
		const Child = ({ read }) => {
			useLayoutEffect(() => {
				seen.push(read());
			});
			return null;
		};
		const Parent = ({ value, isOpen }) => {
			const ref = useLatestRef(value);
			return isOpen ? <Child read={() => ref.current} /> : null;
		};

		const { rerender } = render(<Parent value="first" isOpen={false} />);
		rerender(<Parent value="second" isOpen />);

		expect(seen).toEqual(['second']);
	});
});
