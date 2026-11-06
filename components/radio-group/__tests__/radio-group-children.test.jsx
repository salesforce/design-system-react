import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import RadioGroup from '../';
import Radio from '../radio';

describe('RadioGroup children', () => {
	it("keeps a Radio's own name and joins its aria-describedby with the group's error id", () => {
		const calls = [];
		const { getByLabelText } = render(
			<RadioGroup
				labels={{ label: 'Group', error: 'Required' }}
				errorId="group-error"
				name="group-name"
				onChange={() => calls.push('group')}
				value={null}
			>
				<Radio
					labels={{ label: 'One' }}
					value="one"
					name="own-name"
					aria-describedby="own-help"
				/>
				<Radio labels={{ label: 'Two' }} value="two" />
			</RadioGroup>
		);

		const one = getByLabelText('One');
		expect(one).toHaveAttribute('name', 'own-name');
		expect(one).toHaveAttribute('aria-describedby', 'own-help group-error');
		expect(getByLabelText('Two')).toHaveAttribute('name', 'group-name');

		fireEvent.click(one);
		expect(calls).toEqual(['group']);
	});
});
