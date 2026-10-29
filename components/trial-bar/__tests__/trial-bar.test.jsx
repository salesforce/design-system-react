import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import TrialBar from '../index';

const getTimeLeft = (container) => container.querySelector('.slds-box');
const getTimeLeftAfter = (container) =>
	container.querySelector('.slds-m-horizontal_x-small');

describe('TrialBar', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('renders labels.timeLeft and labels.timeLeftAfter without joining strings', () => {
		const { container } = render(
			<TrialBar labels={{ timeLeft: '30', timeLeftAfter: 'jours restants' }} />
		);

		expect(getTimeLeft(container)).toHaveTextContent('30');
		expect(getTimeLeftAfter(container).textContent).toBe('jours restants');
	});

	it('defaults timeLeftAfter to English', () => {
		const { container } = render(<TrialBar labels={{ timeLeft: '30' }} />);

		expect(getTimeLeftAfter(container).textContent).toBe('left in trial');
	});

	it('renders the actions slot', () => {
		const { getByRole } = render(
			<TrialBar actions={<button type="button">Subscribe</button>} />
		);

		expect(getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
	});

	it('still renders the deprecated timeLeftUnit, timeLeftUnitAfter and onRenderActions and warns', () => {
		const consoleError = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {});

		const { container, getByRole } = render(
			<TrialBar
				labels={{
					timeLeft: '30',
					timeLeftUnit: 'days',
					timeLeftUnitAfter: 'remaining',
				}}
				onRenderActions={() => <button type="button">Subscribe</button>}
			/>
		);

		expect(getTimeLeftAfter(container).textContent).toBe('days remaining');
		expect(getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();

		const messages = consoleError.mock.calls.map((args) => args.join(' '));
		expect(messages.some((m) => m.includes('labels.timeLeftUnit`'))).toBe(true);
		expect(messages.some((m) => m.includes('labels.timeLeftUnitAfter'))).toBe(
			true
		);
		expect(messages.some((m) => m.includes('onRenderActions'))).toBe(true);
	});

	it('keeps the old default suffix when only the deprecated unit is passed', () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});

		const { container } = render(
			<TrialBar labels={{ timeLeft: '30', timeLeftUnit: 'days' }} />
		);

		expect(getTimeLeftAfter(container).textContent).toBe('days left in trial');
	});
});
