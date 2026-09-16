import { Component } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import IconSettings from '../../icon-settings';
import Datepicker from '../index';
import Input from '../../input';
import KEYS from '../../../utilities/key-code';

// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

const makeRtl = (component) => (
	// eslint-disable-next-line
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

const defaultProps = {
	id: 'sample-datepicker',
	value: new Date(2007, 0, 6),
};

// Simple date formatter without moment dependency
const formatDate = (date) => {
	if (!date) return '';
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();
	return `${month}/${day}/${year}`;
};

// Simple date parser without moment dependency
const parseDate = (dateString) => {
	if (!dateString) return null;
	const parts = dateString.split(/[-/]/);
	if (parts.length === 3) {
		const month = parseInt(parts[0], 10) - 1;
		const day = parseInt(parts[1], 10);
		const year = parseInt(parts[2], 10);
		return new Date(year, month, day);
	}
	return null;
};

class DemoComponent extends Component {
	static displayName = 'DatepickerDemoComponent';

	static defaultProps = defaultProps;

	state = {};

	render() {
		const component = (
			<IconSettings iconPath="/assets/icons">
				<Datepicker
					formatter={formatDate}
					parser={parseDate}
					{...this.props}
				/>
			</IconSettings>
		);

		return this.props.isRtl ? makeRtl(component) : component;
	}
}

describe('SLDSDatepicker', () => {
	const triggerClassSelector = 'button.slds-input__icon';

	describe('Assistive technology', () => {
		it('has aria-haspopup, correct aria-expanded on input trigger', () => {
			const { container } = render(<DemoComponent isOpen />);

			const inputTrigger = container.querySelector(triggerClassSelector);
			expect(inputTrigger).toHaveAttribute('aria-haspopup', 'true');
			expect(inputTrigger).toHaveAttribute('aria-expanded', 'true');
		});
	});

	describe('Optional props', () => {
		const customPlaceholder = 'With custom Input';
		const optionalProps = {
			input: <Input placeholder={customPlaceholder} />,
		};

		it('has custom input with custom placeholder', () => {
			const { container } = render(<DemoComponent {...optionalProps} />);

			const input = container.querySelector('input');
			expect(input).toHaveAttribute('placeholder', customPlaceholder);
		});
	});

	describe('onClose, onRequestClose, onOpen callbacks are set', () => {
		it('onOpen is executed when trigger is clicked, onClose is executed when date is selected', async () => {
			const onOpen = vi.fn();
			const onRequestClose = vi.fn();
			const onClose = vi.fn();

			const { container } = render(
				<DemoComponent
					menuPosition="relative"
					onClose={onClose}
					onRequestClose={onRequestClose}
					onOpen={onOpen}
				/>
			);

			const trigger = container.querySelector(triggerClassSelector);
			fireEvent.click(trigger);

			// Wait for calendar to open
			await waitFor(() => {
				expect(onOpen).toHaveBeenCalledTimes(1);
				expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
			});

			// Click first enabled day
			const firstDayOfMonth = container.querySelector(
				'.datepicker__month [aria-disabled=false]'
			);
			expect(firstDayOfMonth).toBeInTheDocument();
			fireEvent.click(firstDayOfMonth);

			// Verify callbacks
			await waitFor(() => {
				expect(onRequestClose).toHaveBeenCalled();
				expect(onClose).toHaveBeenCalled();
			});
		});

		it('onChange is triggered when date is selected', async () => {
			const onChange = vi.fn();
			const onOpen = vi.fn();

			const { container } = render(
				<DemoComponent
					menuPosition="relative"
					onChange={onChange}
					onOpen={onOpen}
				/>
			);

			const trigger = container.querySelector(triggerClassSelector);
			fireEvent.click(trigger);

			// Wait for calendar to open
			await waitFor(() => {
				expect(onOpen).toHaveBeenCalledTimes(1);
				expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
			});

			// Click first enabled day
			const firstDayOfMonth = container.querySelector(
				'.datepicker__month [aria-disabled=false]'
			);
			fireEvent.click(firstDayOfMonth);

			// Verify onChange callback
			await waitFor(() => {
				expect(onChange).toHaveBeenCalledTimes(1);
				const callArgs = onChange.mock.calls[0];
				expect(callArgs[0]).toBeTruthy(); // event
				expect(callArgs[1]).toBeTruthy(); // data
				expect(callArgs[1].date).toBeInstanceOf(Date);
				expect(callArgs[1].date.getTime()).toBe(new Date('1/1/2007').getTime());
				expect(callArgs[1].formattedDate).toBe('1/1/2007');
			});
		});
	});

	describe('keyboard interactions', () => {
		describe('Esc when menu is open', () => {
			it('opens on trigger click, closes on ESC', async () => {
				const onOpen = vi.fn();
				const onClose = vi.fn();

				const { container } = render(
					<DemoComponent
						menuPosition="relative"
						onClose={onClose}
						onOpen={onOpen}
					/>
				);

				const trigger = container.querySelector(triggerClassSelector);
				fireEvent.click(trigger);

				// Wait for calendar to open
				await waitFor(() => {
					expect(onOpen).toHaveBeenCalledTimes(1);
					expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
				});

				// Press ESC
				const firstDayOfMonth = container.querySelector(
					'.datepicker__month [aria-disabled=false]'
				);
				fireEvent.keyDown(firstDayOfMonth, {
					key: 'Esc',
					keyCode: KEYS.ESCAPE,
					which: KEYS.ESCAPE,
				});

				// Verify calendar closed
				await waitFor(() => {
					expect(onClose).toHaveBeenCalled();
					expect(container.querySelector('.datepicker__month')).not.toBeInTheDocument();
				});
			});

			it('navigates to next week', async () => {
				const onCalendarFocus = vi.fn();

				const { container } = render(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={onCalendarFocus}
					/>
				);

				// Wait for calendar to be visible
				await waitFor(() => {
					expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
				});

				const selectedDay = container.querySelector(
					'.datepicker__month [aria-selected=true]'
				);
				expect(selectedDay).toBeInTheDocument();

				fireEvent.keyDown(selectedDay, {
					key: 'Down',
					keyCode: KEYS.DOWN,
					which: KEYS.DOWN,
				});

				await waitFor(() => {
					expect(onCalendarFocus).toHaveBeenCalledTimes(1);
					const callArgs = onCalendarFocus.mock.calls[0];
					expect(callArgs[1].date.getTime()).toBe(new Date(2007, 0, 13).getTime());
				});
			});

			it('navigates to next day', async () => {
				const onCalendarFocus = vi.fn();

				const { container } = render(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={onCalendarFocus}
					/>
				);

				await waitFor(() => {
					expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
				});

				const selectedDay = container.querySelector(
					'.datepicker__month [aria-selected=true]'
				);

				fireEvent.keyDown(selectedDay, {
					key: 'Right',
					keyCode: KEYS.RIGHT,
					which: KEYS.RIGHT,
				});

				await waitFor(() => {
					expect(onCalendarFocus).toHaveBeenCalledTimes(1);
					const callArgs = onCalendarFocus.mock.calls[0];
					expect(callArgs[1].date.getTime()).toBe(new Date(2007, 0, 7).getTime());
				});
			});

			it('navigates to next day with the opposite button for RTL', async () => {
				const onCalendarFocus = vi.fn();

				const { container } = render(
					<DemoComponent
						isRtl
						isOpen
						menuPosition="relative"
						onCalendarFocus={onCalendarFocus}
					/>
				);

				await waitFor(() => {
					expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
				});

				const selectedDay = container.querySelector(
					'.datepicker__month [aria-selected=true]'
				);

				fireEvent.keyDown(selectedDay, {
					key: 'Left',
					keyCode: KEYS.LEFT,
					which: KEYS.LEFT,
				});

				await waitFor(() => {
					expect(onCalendarFocus).toHaveBeenCalledTimes(1);
					const callArgs = onCalendarFocus.mock.calls[0];
					expect(callArgs[1].date.getTime()).toBe(new Date(2007, 0, 7).getTime());
				});
			});

			it('navigates to previous week (that is of a previous month)', async () => {
				const onCalendarFocus = vi.fn();

				const { container } = render(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={onCalendarFocus}
					/>
				);

				await waitFor(() => {
					expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
				});

				const selectedDay = container.querySelector(
					'.datepicker__month [aria-selected=true]'
				);

				fireEvent.keyDown(selectedDay, {
					key: 'Up',
					keyCode: KEYS.UP,
					which: KEYS.UP,
				});

				await waitFor(() => {
					expect(onCalendarFocus).toHaveBeenCalledTimes(1);
					const callArgs = onCalendarFocus.mock.calls[0];
					expect(callArgs[1].date.getTime()).toBe(new Date(2006, 11, 30).getTime());
				});
			});

			it('navigates to previous day', async () => {
				const onCalendarFocus = vi.fn();

				const { container } = render(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={onCalendarFocus}
					/>
				);

				await waitFor(() => {
					expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
				});

				const selectedDay = container.querySelector(
					'.datepicker__month [aria-selected=true]'
				);

				fireEvent.keyDown(selectedDay, {
					key: 'Left',
					keyCode: KEYS.LEFT,
					which: KEYS.LEFT,
				});

				await waitFor(() => {
					expect(onCalendarFocus).toHaveBeenCalledTimes(1);
					const callArgs = onCalendarFocus.mock.calls[0];
					expect(callArgs[1].date.getTime()).toBe(new Date(2007, 0, 5).getTime());
				});
			});

			it('navigates to previous day with the opposite button for RTL', async () => {
				const onCalendarFocus = vi.fn();

				const { container } = render(
					<DemoComponent
						isRtl
						isOpen
						menuPosition="relative"
						onCalendarFocus={onCalendarFocus}
					/>
				);

				await waitFor(() => {
					expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
				});

				const selectedDay = container.querySelector(
					'.datepicker__month [aria-selected=true]'
				);

				fireEvent.keyDown(selectedDay, {
					key: 'Right',
					keyCode: KEYS.RIGHT,
					which: KEYS.RIGHT,
				});

				await waitFor(() => {
					expect(onCalendarFocus).toHaveBeenCalledTimes(1);
					const callArgs = onCalendarFocus.mock.calls[0];
					expect(callArgs[1].date.getTime()).toBe(new Date(2007, 0, 5).getTime());
				});
			});

			it('calendar blur, focus on previous month button', async () => {
				const onCalendarFocus = vi.fn();

				const { container } = render(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={onCalendarFocus}
					/>
				);

				await waitFor(() => {
					expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
				});

				const selectedDay = container.querySelector(
					'.datepicker__month [aria-selected=true]'
				);

				fireEvent.keyDown(selectedDay, {
					key: 'Tab',
					keyCode: KEYS.TAB,
					which: KEYS.TAB,
				});

				await waitFor(() => {
					expect(onCalendarFocus).toHaveBeenCalledTimes(1);
					const callArgs = onCalendarFocus.mock.calls[0];
					expect(callArgs[1].ref.textContent).toBe('Previous month');
				});
			});

			it('calendar blur, focus on today', async () => {
				const onCalendarFocus = vi.fn();

				const { container } = render(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onCalendarFocus={onCalendarFocus}
					/>
				);

				await waitFor(() => {
					expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
				});

				const selectedDay = container.querySelector(
					'.datepicker__month [aria-selected=true]'
				);

				fireEvent.keyDown(selectedDay, {
					key: 'Tab',
					keyCode: KEYS.TAB,
					shiftKey: true,
					which: KEYS.TAB,
				});

				await waitFor(() => {
					expect(onCalendarFocus).toHaveBeenCalledTimes(1);
					const callArgs = onCalendarFocus.mock.calls[0];
					expect(callArgs[1].ref.textContent).toBe('Today');
				});
			});

			it('typing in input closes calendar', async () => {
				const { container } = render(<DemoComponent menuPosition="relative" />);

				// Calendar is closed
				expect(container.querySelector('.slds-datepicker')).not.toBeInTheDocument();

				// Click on input to open the calendar
				const trigger = container.querySelector(triggerClassSelector);
				fireEvent.click(trigger);

				await waitFor(() => {
					expect(container.querySelector('.slds-datepicker')).toBeInTheDocument();
				});

				// Changing input value closes the calendar
				const input = container.querySelector('input#sample-datepicker');
				fireEvent.change(input, { target: { value: '1/1/2020' } });

				await waitFor(() => {
					expect(container.querySelector('.slds-datepicker')).not.toBeInTheDocument();
				});
			});
		});
	});

	describe('Disabled', () => {
		it('onOpen is not called when disabled', () => {
			const triggerClicked = vi.fn();
			const dialogOpened = vi.fn();

			const { container } = render(
				<DemoComponent
					disabled
					menuPosition="relative"
					onClick={triggerClicked}
					onOpen={dialogOpened}
				/>
			);

			const wrapper = container.querySelector('.slds-form-element');
			fireEvent.click(wrapper);

			expect(dialogOpened).not.toHaveBeenCalled();
		});
	});

	describe('Disable dates', () => {
		it('disable weekends', async () => {
			const handleChangeSpy = vi.fn();
			const { container } = render(
				<DemoComponent
					isOpen
					menuPosition="relative"
					value={new Date(2007, 0, 5)}
					dateDisabled={({ date }) => date.getDay() > 5 || date.getDay() < 1}
					onChange={handleChangeSpy}
				/>
			);

			await waitFor(() => {
				expect(container.querySelector('.datepicker__month')).toBeInTheDocument();
			});

			const input = container.querySelector('input');
			expect(input).toHaveValue('1/5/2007');

			// Try clicking a disabled day (weekend)
			const disabledDay = container.querySelector(
				'.datepicker__month [aria-disabled=true]'
			);
			expect(disabledDay).toBeInTheDocument();
			fireEvent.click(disabledDay);

			// onChange should not have been called
			expect(handleChangeSpy).not.toHaveBeenCalled();

			// Click an enabled day (weekday)
			const enabledDay = container.querySelector(
				'.datepicker__month [aria-disabled=false]'
			);
			expect(enabledDay).toBeInTheDocument();
			fireEvent.click(enabledDay);

			// onChange should have been called
			await waitFor(() => {
				expect(handleChangeSpy).toHaveBeenCalledTimes(1);
			});
		});
	});
});
