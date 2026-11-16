import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Button from '../button';
import ButtonStateful from '../button-stateful';
import Checkbox from '../checkbox';
import Input from '../input';
import Textarea from '../textarea';

// `onKeyPress` is deprecated in the 11.x RC and removed in 11.0.
const cases = [
	['Button', (props) => <Button label="Save" {...props} />, 'button'],
	[
		'ButtonStateful',
		(props) => (
			<ButtonStateful isActive={false} onClick={() => {}} {...props} />
		),
		'button',
	],
	[
		'Checkbox',
		(props) => (
			<Checkbox
				labels={{ label: 'Option' }}
				checked={false}
				onChange={() => {}}
				{...props}
			/>
		),
		'input',
	],
	[
		'Input',
		(props) => <Input label="Name" value="" onChange={() => {}} {...props} />,
		'input',
	],
	[
		'Textarea',
		(props) => (
			<Textarea
				labels={{ label: 'Notes' }}
				value=""
				onChange={() => {}}
				{...props}
			/>
		),
		'textarea',
	],
];

describe.each(cases)(
	'%s: deprecated onKeyPress',
	(name, renderComponent, selector) => {
		it('still calls onKeyPress, and warns', () => {
			const consoleError = vi
				.spyOn(console, 'error')
				.mockImplementation(() => {});
			const onKeyPress = vi.fn();
			const { container } = render(renderComponent({ onKeyPress }));

			fireEvent.keyPress(container.querySelector(selector), {
				key: 'Enter',
				charCode: 13,
			});

			expect(onKeyPress).toHaveBeenCalledTimes(1);
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining(
					'`onKeyPress` will be removed in the next major version'
				)
			);
			consoleError.mockRestore();
		});
	}
);
