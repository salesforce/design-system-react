import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useControllableState } from '../use-controllable-state';

describe('useControllableState', () => {
	it('starts at defaultValue and updates when uncontrolled', () => {
		const { result } = renderHook(() => useControllableState(undefined, false));
		expect(result.current[0]).toBe(false);
		expect(result.current[2]).toBe(false);

		act(() => result.current[1](true));
		expect(result.current[0]).toBe(true);
	});

	it('always returns the controlled value and ignores the setter', () => {
		const { result, rerender } = renderHook(
			({ value }) => useControllableState(value, true),
			{ initialProps: { value: false } }
		);
		expect(result.current[0]).toBe(false);
		expect(result.current[2]).toBe(true);

		act(() => result.current[1](true));
		expect(result.current[0]).toBe(false);

		rerender({ value: true });
		expect(result.current[0]).toBe(true);
	});

	it('treats null as a controlled value', () => {
		const { result } = renderHook(() => useControllableState(null, 'x'));
		expect(result.current[0]).toBe(null);
		expect(result.current[2]).toBe(true);
	});

	it('keeps a stable setter across renders', () => {
		const { result, rerender } = renderHook(
			({ value }) => useControllableState(value, 0),
			{ initialProps: { value: undefined } }
		);
		const setter = result.current[1];
		rerender({ value: 1 });
		expect(result.current[1]).toBe(setter);
	});
});
