import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import RadioGroup from '../';
import Radio from '../radio';

describe('RadioGroup children', () => {
	it("runs a Radio's onChange and the group's, and keeps the Radio's own name and aria-describedby", () => {
		const calls = [];
		const { getByLabelText } = render(
			<RadioGroup
				labels={{ label: 'Group', error: 'Required' }}
				errorId="group-error"
				name="group-name"
				onChange={() => calls.push('group')}
			>
				<Radio
					labels={{ label: 'One' }}
					value="one"
					name="own-name"
					aria-describedby="own-help"
					onChange={() => calls.push('radio')}
				/>
				<Radio labels={{ label: 'Two' }} value="two" />
			</RadioGroup>
		);

		const one = getByLabelText('One');
		expect(one).toHaveAttribute('name', 'own-name');
		expect(one).toHaveAttribute('aria-describedby', 'own-help group-error');
		expect(getByLabelText('Two')).toHaveAttribute('name', 'group-name');

		fireEvent.click(one);
		expect(calls).toEqual(['radio', 'group']);
	});
});
