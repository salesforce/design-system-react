import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Combobox from '../';
import Input from '../../input';
import IconSettings from '../../icon-settings';

const renderCombobox = (props) =>
	render(
		<IconSettings iconPath="/assets/icons">
			<Combobox
				id="combobox-slots"
				labels={{ label: 'Search' }}
				menuPosition="relative"
				options={[]}
				selection={[]}
				value=""
				{...props}
			/>
		</IconSettings>
	);

describe('Combobox slots', () => {
	it.each(['base', 'inline-listbox', 'readonly'])(
		"%s: runs the input slot's onChange and the combobox's",
		(variant) => {
			const calls = [];
			const { container } = renderCombobox({
				variant,
				events: { onChange: () => calls.push('combobox') },
				input: (
					<Input
						onChange={(event, data) => calls.push(['input', data.value])}
					/>
				),
			});
			fireEvent.change(container.querySelector('input#combobox-slots'), {
				target: { value: 'ab' },
			});
			expect(calls[0]).toEqual(['input', 'ab']);
			if (variant !== 'readonly') {
				expect(calls).toContain('combobox');
			}
		}
	);

	it('lets the input slot props win over the defaults', () => {
		const { container } = renderCombobox({
			input: <Input className="mine" autoComplete="on" />,
		});
		expect(container.querySelector('input#combobox-slots')).toHaveAttribute(
			'autocomplete',
			'on'
		);
	});

	it('runs onChange once per change', () => {
		const onChange = vi.fn();
		const { container } = renderCombobox({
			input: <Input onChange={onChange} />,
		});
		fireEvent.change(container.querySelector('input#combobox-slots'), {
			target: { value: 'a' },
		});
		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
