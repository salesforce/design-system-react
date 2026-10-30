import { Component, useState } from 'react';
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
				<Datepicker formatter={formatDate} parser={parseDate} {...this.props} />
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
				expect(
					container.querySelector('.datepicker__month')
				).toBeInTheDocument();
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
				expect(
					container.querySelector('.datepicker__month')
				).toBeInTheDocument();
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

	describe('onRequestOpen, onRequestClose, onClose payloads', () => {
		const inputSelector = 'input#sample-datepicker';

		it('onRequestOpen receives the event and trigger for input click, icon click, and arrow keys', () => {
			const onRequestOpen = vi.fn();
			const { container } = render(
				<DemoComponent
					isOpen={false}
					menuPosition="relative"
					onRequestOpen={onRequestOpen}
				/>
			);

			fireEvent.click(container.querySelector(inputSelector));
			fireEvent.click(container.querySelector(triggerClassSelector));
			fireEvent.keyDown(container.querySelector(inputSelector), {
				key: 'Down',
				keyCode: KEYS.DOWN,
				which: KEYS.DOWN,
			});
			fireEvent.keyDown(container.querySelector(inputSelector), {
				key: 'Up',
				keyCode: KEYS.UP,
				which: KEYS.UP,
			});

			expect(onRequestOpen).toHaveBeenCalledTimes(4);
			const calls = onRequestOpen.mock.calls;
			expect(calls[0][0].type).toBe('click');
			expect(calls[0][1]).toEqual({ trigger: 'input-click' });
			expect(calls[1][0].type).toBe('click');
			expect(calls[1][1]).toEqual({ trigger: 'icon-click' });
			expect(calls[2][0].type).toBe('keydown');
			expect(calls[2][1]).toEqual({ trigger: 'keyboard' });
			expect(calls[3][0].type).toBe('keydown');
			expect(calls[3][1]).toEqual({ trigger: 'keyboard' });

			// Controlled: the parent did not set `isOpen`, so the calendar stays closed
			expect(
				container.querySelector('.datepicker__month')
			).not.toBeInTheDocument();
		});

		it('arrow keys do not request open when the calendar is already open', () => {
			const onRequestOpen = vi.fn();
			const { container } = render(
				<DemoComponent
					isOpen
					menuPosition="relative"
					onRequestOpen={onRequestOpen}
				/>
			);

			fireEvent.keyDown(container.querySelector(inputSelector), {
				key: 'Down',
				keyCode: KEYS.DOWN,
				which: KEYS.DOWN,
			});

			expect(onRequestOpen).not.toHaveBeenCalled();
		});

		it('onRequestClose receives the event and trigger for Escape and Enter in the input', () => {
			const onRequestClose = vi.fn();
			const { container } = render(
				<DemoComponent
					isOpen
					menuPosition="relative"
					onRequestClose={onRequestClose}
				/>
			);

			fireEvent.keyDown(container.querySelector(inputSelector), {
				key: 'Escape',
				keyCode: KEYS.ESCAPE,
				which: KEYS.ESCAPE,
			});
			fireEvent.keyDown(container.querySelector(inputSelector), {
				key: 'Enter',
				keyCode: KEYS.ENTER,
				which: KEYS.ENTER,
			});

			expect(onRequestClose).toHaveBeenCalledTimes(2);
			const calls = onRequestClose.mock.calls;
			expect(calls[0][0].type).toBe('keydown');
			expect(calls[0][1]).toEqual({ trigger: 'escape' });
			expect(calls[1][0].type).toBe('keydown');
			expect(calls[1][1]).toEqual({ trigger: 'enter' });
		});

		it('onRequestClose receives trigger "escape" for Escape in the calendar', () => {
			const onRequestClose = vi.fn();
			const { container } = render(
				<DemoComponent
					isOpen
					menuPosition="relative"
					onRequestClose={onRequestClose}
				/>
			);

			fireEvent.keyDown(
				container.querySelector('.datepicker__month [aria-selected=true]'),
				{ key: 'Escape', keyCode: KEYS.ESCAPE, which: KEYS.ESCAPE }
			);

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			expect(onRequestClose.mock.calls[0][0].type).toBe('keydown');
			expect(onRequestClose.mock.calls[0][1]).toEqual({ trigger: 'escape' });
		});

		it('onRequestClose receives trigger "date-select" when a date is clicked', () => {
			const onRequestClose = vi.fn();
			const { container } = render(
				<DemoComponent
					isOpen
					menuPosition="relative"
					onRequestClose={onRequestClose}
				/>
			);

			fireEvent.click(
				container.querySelector('.datepicker__month [aria-disabled=false]')
			);

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			expect(onRequestClose.mock.calls[0][0].type).toBe('click');
			expect(onRequestClose.mock.calls[0][1]).toEqual({
				trigger: 'date-select',
			});
		});

		it('onRequestClose receives the native event and trigger "click-outside" for outside clicks', () => {
			const onRequestClose = vi.fn();
			const { container } = render(
				<DemoComponent
					isOpen
					menuPosition="relative"
					onRequestClose={onRequestClose}
				/>
			);

			// Clicks inside do not request a close
			fireEvent.mouseDown(
				container.querySelector('.datepicker__month [aria-disabled=false]')
			);
			expect(onRequestClose).not.toHaveBeenCalled();

			const outsideElement = document.createElement('button');
			document.body.appendChild(outsideElement);
			fireEvent.mouseDown(outsideElement);
			document.body.removeChild(outsideElement);

			expect(onRequestClose).toHaveBeenCalledTimes(1);
			const [event, data] = onRequestClose.mock.calls[0];
			expect(event).toBeInstanceOf(MouseEvent);
			expect(event.type).toBe('mousedown');
			expect(data).toEqual({ trigger: 'click-outside' });
		});

		it('does not fire onRequestClose when the calendar is already closed', () => {
			const onRequestClose = vi.fn();
			const { container } = render(
				<DemoComponent
					isOpen={false}
					menuPosition="relative"
					onRequestClose={onRequestClose}
				/>
			);

			fireEvent.keyDown(container.querySelector(inputSelector), {
				key: 'Escape',
				keyCode: KEYS.ESCAPE,
				which: KEYS.ESCAPE,
			});
			fireEvent.keyDown(container.querySelector(inputSelector), {
				key: 'Enter',
				keyCode: KEYS.ENTER,
				which: KEYS.ENTER,
			});

			expect(onRequestClose).not.toHaveBeenCalled();
		});

		it('uncontrolled: arrow key opens, Escape closes via onRequestClose, and a second Escape does not fire it again', async () => {
			const onRequestClose = vi.fn();
			const onClose = vi.fn();
			const { container } = render(
				<DemoComponent
					menuPosition="relative"
					onClose={onClose}
					onRequestClose={onRequestClose}
				/>
			);
			const input = container.querySelector(inputSelector);

			fireEvent.keyDown(input, {
				key: 'Down',
				keyCode: KEYS.DOWN,
				which: KEYS.DOWN,
			});
			await waitFor(() => {
				expect(
					container.querySelector('.datepicker__month')
				).toBeInTheDocument();
			});

			fireEvent.keyDown(input, {
				key: 'Escape',
				keyCode: KEYS.ESCAPE,
				which: KEYS.ESCAPE,
			});
			await waitFor(() => {
				expect(
					container.querySelector('.datepicker__month')
				).not.toBeInTheDocument();
			});
			expect(onRequestClose).toHaveBeenCalledTimes(1);
			expect(onRequestClose.mock.calls[0][1]).toEqual({ trigger: 'escape' });

			fireEvent.keyDown(input, {
				key: 'Escape',
				keyCode: KEYS.ESCAPE,
				which: KEYS.ESCAPE,
			});
			expect(onRequestClose).toHaveBeenCalledTimes(1);

			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose).toHaveBeenCalledWith(undefined, {
				componentWillUnmount: true,
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
					expect(
						container.querySelector('.datepicker__month')
					).toBeInTheDocument();
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
					expect(
						container.querySelector('.datepicker__month')
					).not.toBeInTheDocument();
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
					expect(
						container.querySelector('.datepicker__month')
					).toBeInTheDocument();
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
					expect(callArgs[1].date.getTime()).toBe(
						new Date(2007, 0, 13).getTime()
					);
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
					expect(
						container.querySelector('.datepicker__month')
					).toBeInTheDocument();
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
					expect(callArgs[1].date.getTime()).toBe(
						new Date(2007, 0, 7).getTime()
					);
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
					expect(
						container.querySelector('.datepicker__month')
					).toBeInTheDocument();
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
					expect(callArgs[1].date.getTime()).toBe(
						new Date(2007, 0, 7).getTime()
					);
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
					expect(
						container.querySelector('.datepicker__month')
					).toBeInTheDocument();
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
					expect(callArgs[1].date.getTime()).toBe(
						new Date(2006, 11, 30).getTime()
					);
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
					expect(
						container.querySelector('.datepicker__month')
					).toBeInTheDocument();
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
					expect(callArgs[1].date.getTime()).toBe(
						new Date(2007, 0, 5).getTime()
					);
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
					expect(
						container.querySelector('.datepicker__month')
					).toBeInTheDocument();
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
					expect(callArgs[1].date.getTime()).toBe(
						new Date(2007, 0, 5).getTime()
					);
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
					expect(
						container.querySelector('.datepicker__month')
					).toBeInTheDocument();
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
					expect(
						container.querySelector('.datepicker__month')
					).toBeInTheDocument();
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
				expect(
					container.querySelector('.slds-datepicker')
				).not.toBeInTheDocument();

				// Click on input to open the calendar
				const trigger = container.querySelector(triggerClassSelector);
				fireEvent.click(trigger);

				await waitFor(() => {
					expect(
						container.querySelector('.slds-datepicker')
					).toBeInTheDocument();
				});

				// Changing input value closes the calendar
				const input = container.querySelector('input#sample-datepicker');
				fireEvent.change(input, { target: { value: '1/1/2020' } });

				await waitFor(() => {
					expect(
						container.querySelector('.slds-datepicker')
					).not.toBeInTheDocument();
				});
			});
		});
	});

	describe('closes on outside click (uncontrolled)', () => {
		it('closes the calendar when clicking outside, stays open when clicking inside', async () => {
			const { container } = render(<DemoComponent menuPosition="relative" />);

			// Calendar starts closed
			expect(
				container.querySelector('.slds-datepicker')
			).not.toBeInTheDocument();

			// Open the calendar by clicking the trigger
			const trigger = container.querySelector(triggerClassSelector);
			fireEvent.click(trigger);

			await waitFor(() => {
				expect(container.querySelector('.slds-datepicker')).toBeInTheDocument();
			});

			// Clicking inside the calendar should NOT close it
			const dayInsideCalendar = container.querySelector(
				'.datepicker__month [aria-disabled=false]'
			);
			expect(dayInsideCalendar).toBeInTheDocument();
			fireEvent.mouseDown(dayInsideCalendar);
			expect(container.querySelector('.slds-datepicker')).toBeInTheDocument();

			// Clicking an element outside the calendar should close it
			const outsideElement = document.createElement('button');
			document.body.appendChild(outsideElement);
			fireEvent.mouseDown(outsideElement);

			await waitFor(() => {
				expect(
					container.querySelector('.slds-datepicker')
				).not.toBeInTheDocument();
			});

			document.body.removeChild(outsideElement);
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
				expect(
					container.querySelector('.datepicker__month')
				).toBeInTheDocument();
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

	describe('Control model', () => {
		const inputSelector = 'input#sample-datepicker';
		const calendarSelector = '.datepicker__month';

		// A parent that accepts every `onChange`
		const StatefulDatepicker = ({ initialValue = null, ...props }) => {
			const [value, setValue] = useState(initialValue);
			return (
				<DemoComponent
					onChange={(event, data) => setValue(data.date)}
					{...props}
					value={value}
				/>
			);
		};

		describe('value', () => {
			it('a parent that rejects a calendar selection keeps the old value', () => {
				const onChange = vi.fn();
				const { container } = render(
					<DemoComponent
						defaultIsOpen
						menuPosition="relative"
						onChange={onChange}
					/>
				);

				fireEvent.click(
					container.querySelector(`${calendarSelector} [aria-disabled=false]`)
				);

				expect(onChange).toHaveBeenCalledTimes(1);
				expect(onChange.mock.calls[0][1].date.getTime()).toBe(
					new Date(2007, 0, 1).getTime()
				);
				expect(container.querySelector(inputSelector)).toHaveValue('1/6/2007');
			});

			it('a parent that accepts a calendar selection shows the new date', () => {
				const { container } = render(
					<StatefulDatepicker
						defaultIsOpen
						initialValue={new Date(2007, 0, 6)}
						menuPosition="relative"
					/>
				);

				fireEvent.click(
					container.querySelector(`${calendarSelector} [aria-disabled=false]`)
				);

				expect(container.querySelector(inputSelector)).toHaveValue('1/1/2007');
			});

			it('re-syncs the input text when value changes, including to null', () => {
				const { container, rerender } = render(<DemoComponent />);
				const input = container.querySelector(inputSelector);
				expect(input).toHaveValue('1/6/2007');

				// Partial text is kept while value does not change
				fireEvent.change(input, { target: { value: '2/1' } });
				expect(input).toHaveValue('2/1');

				rerender(<DemoComponent value={new Date(2010, 4, 5)} />);
				expect(input).toHaveValue('5/5/2010');

				rerender(<DemoComponent value={null} />);
				expect(input).toHaveValue('');
			});

			it('does not reformat typed text when the parent accepts the typed date', () => {
				const { container } = render(<StatefulDatepicker />);
				const input = container.querySelector(inputSelector);

				fireEvent.change(input, { target: { value: '03/04/2021' } });

				expect(input).toHaveValue('03/04/2021');
			});

			it('does not reset typed text when the parent passes an equal new Date every render', () => {
				const Parent = () => {
					const [, setCount] = useState(0);
					return (
						<DemoComponent
							onChange={() => setCount((count) => count + 1)}
							value={new Date(2007, 0, 6)}
						/>
					);
				};
				const { container } = render(<Parent />);
				const input = container.querySelector(inputSelector);

				fireEvent.change(input, { target: { value: '1/6/20' } });

				expect(input).toHaveValue('1/6/20');
			});

			it('clearing the input reports a null date', () => {
				const onChange = vi.fn();
				const { container } = render(
					<StatefulDatepicker
						initialValue={new Date(2007, 0, 6)}
						onChange={onChange}
					/>
				);
				const input = container.querySelector(inputSelector);

				fireEvent.change(input, { target: { value: '' } });

				expect(onChange).toHaveBeenCalledWith(
					expect.anything(),
					expect.objectContaining({ date: null, formattedDate: '' })
				);
				expect(input).toHaveValue('');
			});

			it('value={null} renders an empty input', () => {
				const { container } = render(<DemoComponent value={null} />);
				expect(container.querySelector(inputSelector)).toHaveValue('');
			});

			it('treats value={undefined} as null and warns', () => {
				const consoleError = vi
					.spyOn(console, 'error')
					.mockImplementation(() => {});
				// Not `DemoComponent`: its `defaultProps` would fill in `value`
				const { container } = render(
					<Datepicker
						formatter={formatDate}
						id="sample-datepicker"
						parser={parseDate}
					/>
				);

				expect(container.querySelector(inputSelector)).toHaveValue('');
				expect(consoleError).toHaveBeenCalledWith(
					expect.stringContaining('`value` is required by SLDSDatePicker')
				);
				consoleError.mockRestore();
			});

			it('ignores and warns about the removed formattedValue prop', () => {
				const consoleError = vi
					.spyOn(console, 'error')
					.mockImplementation(() => {});
				const { container } = render(
					<DemoComponent formattedValue="1/1/1999" value={null} />
				);

				const input = container.querySelector(inputSelector);
				expect(input).toHaveValue('');
				expect(input).not.toHaveAttribute('formattedValue');
				expect(container.innerHTML).not.toContain('1/1/1999');
				expect(consoleError).toHaveBeenCalledWith(
					expect.stringContaining('`formattedValue` has reached End-of-Life')
				);
				consoleError.mockRestore();
			});
		});

		describe('isOpen', () => {
			it('controlled isOpen stays open on Escape, Enter, typing and date select, and requests close', () => {
				const onRequestClose = vi.fn();
				const { container } = render(
					<DemoComponent
						isOpen
						menuPosition="relative"
						onRequestClose={onRequestClose}
					/>
				);
				const input = container.querySelector(inputSelector);

				fireEvent.keyDown(input, { keyCode: KEYS.ESCAPE, which: KEYS.ESCAPE });
				fireEvent.keyDown(input, { keyCode: KEYS.ENTER, which: KEYS.ENTER });
				fireEvent.change(input, { target: { value: '1/2/2007' } });
				fireEvent.click(
					container.querySelector(`${calendarSelector} [aria-disabled=false]`)
				);

				expect(container.querySelector(calendarSelector)).toBeInTheDocument();
				expect(onRequestClose.mock.calls.map((call) => call[1])).toEqual([
					{ trigger: 'escape' },
					{ trigger: 'enter' },
					{ trigger: 'input-change' },
					{ trigger: 'date-select' },
				]);
			});

			it('controlled isOpen={false} does not open on click or arrow key', () => {
				const { container } = render(
					<DemoComponent isOpen={false} menuPosition="relative" />
				);

				fireEvent.click(container.querySelector(inputSelector));
				fireEvent.click(container.querySelector(triggerClassSelector));
				fireEvent.keyDown(container.querySelector(inputSelector), {
					keyCode: KEYS.DOWN,
					which: KEYS.DOWN,
				});

				expect(
					container.querySelector(calendarSelector)
				).not.toBeInTheDocument();
			});

			it('controlled isOpen opens and closes when the parent updates it', () => {
				const Parent = () => {
					const [isOpen, setIsOpen] = useState(false);
					return (
						<DemoComponent
							isOpen={isOpen}
							menuPosition="relative"
							onRequestClose={() => setIsOpen(false)}
							onRequestOpen={() => setIsOpen(true)}
						/>
					);
				};
				const { container } = render(<Parent />);
				const input = container.querySelector(inputSelector);

				fireEvent.keyDown(input, { keyCode: KEYS.DOWN, which: KEYS.DOWN });
				expect(container.querySelector(calendarSelector)).toBeInTheDocument();

				fireEvent.keyDown(input, { keyCode: KEYS.ESCAPE, which: KEYS.ESCAPE });
				expect(
					container.querySelector(calendarSelector)
				).not.toBeInTheDocument();
			});

			it('uncontrolled with onRequestOpen still opens itself and reports the request', () => {
				const onRequestOpen = vi.fn();
				const { container } = render(
					<DemoComponent
						menuPosition="relative"
						onRequestOpen={onRequestOpen}
					/>
				);

				fireEvent.click(container.querySelector(inputSelector));

				expect(onRequestOpen).toHaveBeenCalledWith(expect.anything(), {
					trigger: 'input-click',
				});
				expect(container.querySelector(calendarSelector)).toBeInTheDocument();
			});

			it('uncontrolled typing closes the calendar through onRequestClose', () => {
				const onRequestClose = vi.fn();
				const { container } = render(
					<DemoComponent
						defaultIsOpen
						menuPosition="relative"
						onRequestClose={onRequestClose}
					/>
				);

				fireEvent.change(container.querySelector(inputSelector), {
					target: { value: '1/2/2007' },
				});

				expect(onRequestClose).toHaveBeenCalledWith(expect.anything(), {
					trigger: 'input-change',
				});
				expect(
					container.querySelector(calendarSelector)
				).not.toBeInTheDocument();
			});

			it('defaultIsOpen seeds the uncontrolled open state', () => {
				const { container } = render(
					<DemoComponent defaultIsOpen menuPosition="relative" />
				);
				expect(container.querySelector(calendarSelector)).toBeInTheDocument();

				fireEvent.keyDown(container.querySelector(inputSelector), {
					keyCode: KEYS.ESCAPE,
					which: KEYS.ESCAPE,
				});
				expect(
					container.querySelector(calendarSelector)
				).not.toBeInTheDocument();
			});
		});
	});
});
