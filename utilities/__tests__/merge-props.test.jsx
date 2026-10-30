/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import mergeProps, { renderTrigger } from '../merge-props';

describe('mergeProps', () => {
	it('lets consumer props win', () => {
		expect(mergeProps({ id: 'a', tabIndex: 0 }, { id: 'b' })).toEqual({
			id: 'b',
			tabIndex: 0,
		});
	});

	it('ignores undefined consumer values', () => {
		expect(mergeProps({ id: 'a' }, { id: undefined })).toEqual({ id: 'a' });
	});

	it('composes handlers, running the consumer handler first', () => {
		const calls = [];
		const merged = mergeProps(
			{ onClick: (value) => calls.push(['component', value]) },
			{ onClick: (value) => calls.push(['consumer', value]) }
		);
		merged.onClick('event');
		expect(calls).toEqual([
			['consumer', 'event'],
			['component', 'event'],
		]);
	});

	it('keeps a consumer handler when the component has none', () => {
		const onClick = vi.fn();
		expect(mergeProps({}, { onClick }).onClick).toBe(onClick);
	});

	it('joins className and aria id lists', () => {
		expect(
			mergeProps(
				{
					className: 'a',
					'aria-describedby': 'help',
					'aria-labelledby': undefined,
				},
				{
					className: 'b',
					'aria-describedby': 'error',
					'aria-labelledby': 'label',
				}
			)
		).toEqual({
			className: 'a b',
			'aria-describedby': 'help error',
			'aria-labelledby': 'label',
		});
	});

	it('drops duplicate ids when joining', () => {
		expect(
			mergeProps({ 'aria-describedby': 'tip' }, { 'aria-describedby': 'tip' })
		).toEqual({ 'aria-describedby': 'tip' });
	});

	it('merges styles, the consumer properties winning', () => {
		expect(
			mergeProps(
				{ style: { color: 'red', margin: 0 } },
				{ style: { color: 'blue' } }
			).style
		).toEqual({ color: 'blue', margin: 0 });
	});

	it('composes refs', () => {
		const componentRef = vi.fn();
		const consumerRef = createRef();
		const merged = mergeProps({ ref: componentRef }, { ref: consumerRef });
		merged.ref('node');
		expect(componentRef).toHaveBeenCalledWith('node');
		expect(consumerRef.current).toBe('node');
	});
});

describe('renderTrigger', () => {
	it('calls a function trigger with the props', () => {
		const trigger = vi.fn(() => <span>trigger</span>);
		const { getByText } = render(renderTrigger(trigger, { id: 'a' }));
		expect(trigger).toHaveBeenCalledWith({ id: 'a' });
		expect(getByText('trigger')).toBeTruthy();
	});

	it('merges the props into an element trigger', () => {
		const componentClick = vi.fn();
		const consumerClick = vi.fn();
		const { getByRole } = render(
			renderTrigger(
				<button type="button" className="mine" onClick={consumerClick}>
					trigger
				</button>,
				{ className: 'theirs', id: 'a', onClick: componentClick }
			)
		);
		const button = getByRole('button');
		expect(button.id).toBe('a');
		expect(button.className).toBe('theirs mine');
		fireEvent.click(button);
		expect(consumerClick).toHaveBeenCalledTimes(1);
		expect(componentClick).toHaveBeenCalledTimes(1);
	});
});
