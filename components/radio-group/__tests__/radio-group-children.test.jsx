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

describe('RadioGroup labels', () => {
	const renderGroup = (props) =>
		render(
			<RadioGroup onChange={() => {}} value={null} {...props}>
				<Radio labels={{ label: 'One' }} value="one" />
			</RadioGroup>
		);

	it('derives the error id and describes the radios with it', () => {
		const { container, getByLabelText } = renderGroup({
			labels: { label: 'Group', error: <em>Pick one</em> },
		});
		const error = container.querySelector('.slds-form-element__help');
		expect(error.id).not.toBe('');
		expect(getByLabelText('One')).toHaveAttribute('aria-describedby', error.id);
		expect(container.querySelector('.slds-has-error')).toBeInTheDocument();
	});

	it('shows labels.label visibly even when assistiveText.label is set', () => {
		const { container } = renderGroup({
			labels: { label: 'Visible' },
			assistiveText: { label: 'Hidden' },
		});
		const legend = container.querySelector('legend');
		expect(legend).toHaveTextContent('Visible');
		expect(legend).not.toHaveClass('slds-assistive-text');
	});

	it('hides the legend when only assistiveText.label is set', () => {
		const { container } = renderGroup({ assistiveText: { label: 'Hidden' } });
		expect(container.querySelector('legend')).toHaveClass(
			'slds-assistive-text'
		);
	});

	it('hasError applies error styling without a message', () => {
		const { container } = renderGroup({ hasError: true });
		expect(container.querySelector('.slds-has-error')).toBeInTheDocument();
	});
});
