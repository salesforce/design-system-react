/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useRef,
	useCallback,
	useEffect,
	useContext,
	type ReactNode,
	type ReactElement,
	type KeyboardEvent,
	type ChangeEvent,
} from 'react';

import assign from 'lodash.assign';
import classNames from 'classnames';

import Dialog from '../utilities/dialog';
import CalendarWrapper from './private/calendar-wrapper';
import InputIcon from '../icon/input-icon';
import Input from '../input';

import checkProps from './check-props';
import componentDoc from './component.json';

import EventUtil from '../../utilities/event';
import KEYS from '../../utilities/key-code';
import lowPriorityWarning from '../../utilities/warning/low-priority-warning';

import { DATE_PICKER } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';
import { IconSettingsContext } from '../icon-settings';
import { useClickOutside } from '../../utilities/hooks/use-click-outside';

// ===== Types =====

export interface DatePickerAssistiveText {
	nextMonth?: string;
	openCalendar?: string;
	previousMonth?: string;
	year?: string;
}

export interface DatePickerLabels {
	abbreviatedWeekDays?: string[];
	label?: string;
	months?: string[];
	placeholder?: string;
	today?: string;
	weekDays?: string[];
}

export interface DatePickerChangeData {
	date: Date;
	formattedDate: string;
	timezoneOffset: number;
}

/**
 * What caused the DatePicker to request opening its calendar.
 * - `input-click`: the input (or deprecated `children` input) was clicked
 * - `icon-click`: the calendar icon button was clicked
 * - `keyboard`: Down or Up arrow was pressed in the input
 */
export type DatePickerRequestOpenTrigger =
	'input-click' | 'icon-click' | 'keyboard';

/** Data passed to `onRequestOpen` */
export interface DatePickerRequestOpenData {
	/** What caused the open request */
	trigger: DatePickerRequestOpenTrigger;
}

/**
 * What caused the DatePicker to request closing its calendar.
 * - `date-select`: a date was selected in the calendar (click, Space, or Enter)
 * - `escape`: Escape was pressed in the input or in the calendar
 * - `enter`: Enter was pressed in the input
 * - `click-outside`: a mousedown/touchstart happened outside the DatePicker
 */
export type DatePickerRequestCloseTrigger =
	'date-select' | 'escape' | 'enter' | 'click-outside';

/** Data passed to `onRequestClose` */
export interface DatePickerRequestCloseData {
	/** What caused the close request */
	trigger: DatePickerRequestCloseTrigger;
}

/** Data passed to `onClose` */
export interface DatePickerCloseData {
	/**
	 * `true` when the close was reported by the calendar dialog unmounting. The calendar
	 * dialog is unmounted whenever the DatePicker closes, so this is currently always `true`.
	 */
	componentWillUnmount: boolean;
}

export interface DatePickerProps {
	/** Assistive text for accessibility */
	assistiveText?: DatePickerAssistiveText;
	/** Alignment of dropdown */
	align?: 'left' | 'right';
	/** CSS classes for datepicker */
	className?: string | string[] | Record<string, boolean>;
	/** Children (deprecated - use input prop) */
	children?: ReactElement;
	/** Whether component is disabled */
	disabled?: boolean;
	/** Function to determine if a date should be disabled */
	dateDisabled?: (date: Date) => boolean;
	/** Date formatting function */
	formatter?: (date: Date | null | undefined) => string;
	/** Initial formatted value (deprecated) */
	formattedValue?: string;
	/** Whether to show error state */
	hasError?: boolean;
	/** Prevent dropdown position flipping */
	hasStaticAlignment?: boolean;
	/** HTML id */
	id?: string;
	/** Custom input component */
	input?: ReactElement;
	/** Whether dropdown is open (controlled) */
	isOpen?: boolean;
	/** Make Monday first day of week */
	isIsoWeekday?: boolean;
	/** Text labels for internationalization */
	labels?: DatePickerLabels;
	/** Menu position strategy */
	menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	/** Called when calendar focus changes */
	onCalendarFocus?: (
		event: React.SyntheticEvent | null,
		data: { date?: Date; ref?: HTMLElement; direction?: string }
	) => void;
	/** Called when date changes */
	onChange?: (event: React.SyntheticEvent, data: DatePickerChangeData) => void;
	/**
	 * Called after the calendar has closed. `event` is `undefined` because the close
	 * is reported when the calendar dialog unmounts, not by a user event.
	 */
	onClose?: (
		event: React.SyntheticEvent | undefined,
		data: DatePickerCloseData
	) => void;
	/** Called when calendar opens */
	onOpen?: (
		event: React.SyntheticEvent | undefined,
		data: { portal?: HTMLElement }
	) => void;
	/**
	 * Called when the calendar requests to close. Only fires while the calendar is open.
	 * `event` is the triggering React event; for `trigger: 'click-outside'` it is the
	 * native `mousedown`/`touchstart` event from the document listener. It is typed as
	 * possibly `undefined` because the internal calendar's close request has an optional event.
	 * In uncontrolled mode the calendar also closes itself; in controlled mode (`isOpen`)
	 * set `isOpen` to `false` here.
	 */
	onRequestClose?: (
		event: React.SyntheticEvent | MouseEvent | TouchEvent | undefined,
		data: DatePickerRequestCloseData
	) => void;
	/**
	 * Called when the calendar requests to open. If provided, the calendar does not open
	 * itself: set `isOpen` to `true` here. Not fired by the arrow keys while already open.
	 */
	onRequestOpen?: (
		event: React.MouseEvent | KeyboardEvent,
		data: DatePickerRequestOpenData
	) => void;
	/** Date parsing function */
	parser?: (str: string) => Date;
	/** Portal mount function */
	portalMount?: (element: ReactNode, container: HTMLElement) => void;
	/** Years before current year in dropdown */
	relativeYearFrom?: number;
	/** Years after current year in dropdown */
	relativeYearTo?: number;
	/** CSS classes for trigger wrapper */
	triggerClassName?: string | string[] | Record<string, boolean>;
	/** Selected date value */
	value?: Date;
	/** @deprecated Use labels.label */
	label?: string;
	/** @deprecated Use labels.placeholder */
	placeholder?: string;
	/** @deprecated Use assistiveText.openCalendar */
	assistiveTextOpenCalendar?: string;
	/** Whether field is required */
	required?: boolean;
	/** Blur handler */
	onBlur?: (event: React.FocusEvent) => void;
	/** Focus handler */
	onFocus?: (event: React.FocusEvent) => void;
	/** Keydown handler */
	onKeyDown?: (event: KeyboardEvent, data: Record<string, unknown>) => void;
}

// ===== Default Props =====

const defaultAssistiveText: Required<DatePickerAssistiveText> = {
	nextMonth: 'Next month',
	openCalendar: 'Open Calendar',
	previousMonth: 'Previous month',
	year: 'Year',
};

const defaultLabels: Required<DatePickerLabels> = {
	abbreviatedWeekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	label: '',
	months: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	],
	placeholder: 'Pick a Date',
	today: 'Today',
	weekDays: [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	],
};

const defaultFormatter = (date: Date | null | undefined): string => {
	return date
		? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
		: '';
};

const defaultParser = (str: string): Date => {
	lowPriorityWarning(
		false,
		`Please use an external library for date parsing and internationalization like MomentJS (https://github.com/moment/moment/) instead of the default parser.`
	);
	return new Date(str);
};

// ===== Component =====

const Datepicker: React.FC<DatePickerProps> = (props) => {
	const {
		assistiveText: assistiveTextProp = {},
		align = 'left',
		className,
		children,
		disabled,
		dateDisabled = () => false,
		formatter = defaultFormatter,
		formattedValue: formattedValueProp,
		hasError,
		hasStaticAlignment,
		id: idProp,
		input,
		isOpen: isOpenProp,
		isIsoWeekday,
		labels: labelsProp = {},
		menuPosition = 'absolute',
		onCalendarFocus,
		onChange,
		onClose,
		onOpen,
		onRequestClose,
		onRequestOpen,
		parser = defaultParser,
		portalMount,
		relativeYearFrom = -10,
		relativeYearTo = 10,
		triggerClassName,
		value,
		// Deprecated props
		label,
		placeholder,
		assistiveTextOpenCalendar,
		required,
		onBlur,
		onFocus,
		onKeyDown,
	} = props;

	// Merge with defaults
	const assistiveText = assign({}, defaultAssistiveText, assistiveTextProp);
	const labels = assign({}, defaultLabels, labelsProp);

	// Context
	const iconSettingsContext = useContext(IconSettingsContext);

	// Refs
	const triggerRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const selectedDateCellRef = useRef<HTMLElement | null>(null);
	const generatedId = useRef(generateId());

	// State
	const [isOpenState, setIsOpenState] = useState(false);
	const [isOpenFromIcon, setIsOpenFromIcon] = useState(false);
	const [internalValue, setInternalValue] = useState<Date | undefined>(value);
	const [formattedValue, setFormattedValue] = useState(() => {
		const dateString = formatter(value);
		return value ? dateString : formattedValueProp || '';
	});
	const [inputValue, setInputValue] = useState(() => {
		const dateString = formatter(value);
		return value ? dateString : formattedValueProp || '';
	});
	const [inputRendered, setInputRendered] = useState(false);

	// Check props on mount (only in development)
	useEffect(() => {
		if (typeof checkProps === 'function') {
			checkProps(
				DATE_PICKER,
				props as unknown as Record<string, unknown>,
				componentDoc
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Derived state
	const getId = useCallback(() => idProp || generatedId.current, [idProp]);

	const getIsOpen = useCallback(() => {
		return !!(typeof isOpenProp === 'boolean' ? isOpenProp : isOpenState);
	}, [isOpenProp, isOpenState]);

	const parseDate = useCallback(
		(dateString: string): Date => {
			let parsedDate = parser(dateString);
			if (
				Object.prototype.toString.call(parsedDate) !== '[object Date]' ||
				isNaN(parsedDate.getTime())
			) {
				parsedDate = new Date();
			}
			return parsedDate;
		},
		[parser]
	);

	// ===== Event Handlers =====

	const handleRequestClose = useCallback(
		(
			event: React.SyntheticEvent | MouseEvent | TouchEvent | undefined,
			data: DatePickerRequestCloseData
		) => {
			// Only request a close while open, so `onRequestClose` never fires when
			// the calendar is already closed (e.g. Escape in a closed input).
			if (!getIsOpen()) {
				return;
			}

			onRequestClose?.(event, data);

			setIsOpenState(false);
			setIsOpenFromIcon(false);

			if (inputRef.current) {
				inputRef.current.focus();
			}
		},
		[onRequestClose, getIsOpen]
	);

	const handleCalendarRequestClose = useCallback(
		(event?: React.SyntheticEvent) => {
			// The calendar's only close request is Escape (see `CalendarWrapper#handleKeyDown`)
			handleRequestClose(event, { trigger: 'escape' });
		},
		[handleRequestClose]
	);

	const handleClose = useCallback(
		(
			event: React.SyntheticEvent | undefined,
			data?: { componentWillUnmount?: boolean }
		) => {
			onClose?.(event, {
				componentWillUnmount: !!data?.componentWillUnmount,
			});
		},
		[onClose]
	);

	const handleOpen = useCallback(
		(
			event: React.SyntheticEvent | undefined,
			data: { portal?: HTMLElement }
		) => {
			if (onOpen) {
				onOpen(event, data);
			}

			if (selectedDateCellRef.current && isOpenFromIcon) {
				selectedDateCellRef.current.focus();
			}
		},
		[onOpen, isOpenFromIcon]
	);

	const openDialog = useCallback(
		(
			event: React.MouseEvent | KeyboardEvent,
			data: DatePickerRequestOpenData,
			fromIcon = false
		) => {
			if (!fromIcon) {
				setIsOpenFromIcon(false);
			}
			if (onRequestOpen) {
				onRequestOpen(event, data);
			} else {
				setIsOpenState(true);
			}
		},
		[onRequestOpen]
	);

	const openDialogFromIcon = useCallback(
		(event: React.MouseEvent) => {
			setIsOpenFromIcon(true);
			openDialog(event, { trigger: 'icon-click' }, true);
		},
		[openDialog]
	);

	const handleCalendarChange = useCallback(
		(event: React.SyntheticEvent, { date }: { date: Date }) => {
			if (!value) {
				setInternalValue(date);
				setFormattedValue(formatter(date));
				setInputValue(formatter(date));
			}

			handleRequestClose(event, { trigger: 'date-select' });

			if (onChange) {
				onChange(event, {
					date,
					formattedDate: formatter(date),
					timezoneOffset: date.getTimezoneOffset(),
				});
			}
		},
		[value, formatter, handleRequestClose, onChange]
	);

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			// Typing in the input closes the calendar when it's used as an uncontrolled component
			if (typeof isOpenProp !== 'boolean' && isOpenState) {
				setIsOpenState(false);
			}

			setFormattedValue(event.target.value);
			setInputValue(event.target.value);

			const date = parser(event.target.value);

			if (onChange) {
				onChange(event, {
					date,
					formattedDate: event.target.value,
					timezoneOffset: date.getTimezoneOffset(),
				});
			}
		},
		[isOpenProp, isOpenState, parser, onChange]
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			// Don't open if user is selecting text
			if (
				event.keyCode &&
				!event.shiftKey &&
				(event.keyCode === KEYS.DOWN || event.keyCode === KEYS.UP)
			) {
				EventUtil.trapEvent(event);
				// Go through the same request path as clicking, so a controlled
				// DatePicker hears about keyboard opens via `onRequestOpen`
				if (!getIsOpen()) {
					openDialog(event, { trigger: 'keyboard' });
				}
			}

			if (event.keyCode === KEYS.ESCAPE || event.keyCode === KEYS.ENTER) {
				EventUtil.trapEvent(event);
				handleRequestClose(event, {
					trigger: event.keyCode === KEYS.ESCAPE ? 'escape' : 'enter',
				});
			}

			if (onKeyDown) {
				onKeyDown(event, {});
			}
		},
		[getIsOpen, openDialog, handleRequestClose, onKeyDown]
	);

	const handleClickOutside = useCallback(
		(event: MouseEvent | TouchEvent) => {
			handleRequestClose(event, { trigger: 'click-outside' });
		},
		[handleRequestClose]
	);

	// Detect clicks outside the trigger/calendar and close the dialog. Anchored
	// on the trigger element so this works whether the DatePicker is controlled
	// (`onRequestClose` is invoked via `handleRequestClose`) or uncontrolled
	// (internal open state is reset). The trigger carries the
	// `ignore-react-onclickoutside` class and, in `overflowBoundaryElement`
	// mode, so does the portaled calendar, so clicks within the calendar are
	// treated as inside.
	useClickOutside(triggerRef, handleClickOutside, {
		enabled: getIsOpen(),
		ignoreClass: 'ignore-react-onclickoutside',
	});

	// ===== Refs =====

	const setInputRefCallback = useCallback(
		(component: HTMLInputElement | null) => {
			inputRef.current = component;
			if (!inputRendered) {
				setInputRendered(true);
			}
		},
		[inputRendered]
	);

	// ===== Render Helpers =====

	const getDatePicker = useCallback(() => {
		let date: Date;
		// Use props if present. Otherwise, use state.
		if (value) {
			const formattedDate = formatter(value);
			date = formattedDate ? parseDate(formattedDate) : value;
		} else {
			date = formattedValue
				? parseDate(formattedValue)
				: internalValue || new Date();
		}

		return (
			<CalendarWrapper
				abbreviatedWeekDayLabels={labels.abbreviatedWeekDays}
				assistiveTextNextMonth={assistiveText.nextMonth}
				assistiveTextPreviousMonth={assistiveText.previousMonth}
				assistiveTextYear={assistiveText.year}
				canFocusCalendar={isOpenFromIcon}
				id={getId()}
				isIsoWeekday={isIsoWeekday}
				monthLabels={labels.months}
				onCalendarFocus={onCalendarFocus}
				dateDisabled={dateDisabled}
				onRequestClose={handleCalendarRequestClose}
				onSelectDate={handleCalendarChange}
				relativeYearFrom={relativeYearFrom}
				relativeYearTo={relativeYearTo}
				selectedDate={date}
				selectedDateRef={(component: HTMLElement | null) => {
					selectedDateCellRef.current = component;
				}}
				todayLabel={labels.today}
				weekDayLabels={labels.weekDays}
			/>
		);
	}, [
		value,
		formatter,
		parseDate,
		formattedValue,
		internalValue,
		labels,
		assistiveText,
		isOpenFromIcon,
		getId,
		isIsoWeekday,
		onCalendarFocus,
		dateDisabled,
		handleCalendarRequestClose,
		handleCalendarChange,
		relativeYearFrom,
		relativeYearTo,
	]);

	const getDialog = useCallback(() => {
		// SLDS override
		const style = menuPosition !== 'relative' ? { transform: 'none' } : {};

		if (disabled || !getIsOpen()) {
			return null;
		}

		const dialogProps = {
			align: `bottom ${align}` as const,
			contentsClassName: classNames(
				'slds-datepicker slds-dropdown',
				{
					'slds-dropdown_right':
						menuPosition === 'relative' && align === 'right',
					'slds-dropdown_left': menuPosition === 'relative' && align === 'left',
				},
				className
			),
			context: iconSettingsContext,
			hasStaticAlignment,
			style,
			onClose: handleClose,
			onOpen: handleOpen,
			onRequestTargetElement: () => inputRef.current,
			position: menuPosition,
			portalMount,
		};

		return (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<Dialog {...(dialogProps as any)}>{getDatePicker()}</Dialog>
		);
	}, [
		menuPosition,
		disabled,
		getIsOpen,
		align,
		className,
		iconSettingsContext,
		hasStaticAlignment,
		handleClose,
		handleOpen,
		portalMount,
		getDatePicker,
	]);

	const getInputProps = useCallback(() => {
		const defaultInputProps = {
			iconRight: (
				<InputIcon
					assistiveText={{
						icon: assistiveTextOpenCalendar || assistiveText.openCalendar,
					}}
					aria-haspopup
					aria-expanded={getIsOpen()}
					category="utility"
					name="event"
					onClick={(event: React.MouseEvent) => {
						openDialogFromIcon(event);
					}}
					type="button"
				/>
			),
			inputRef: (component: HTMLInputElement | null) => {
				setInputRefCallback(component);
			},
			id: getId(),
			onChange: handleInputChange,
			onClick: (event: React.MouseEvent<HTMLInputElement>) => {
				openDialog(event, { trigger: 'input-click' });
			},
			onKeyDown: handleKeyDown,
			value: value ? formatter(value) : inputValue,
		};

		const topLevelDeprecatedComponentProps = {
			disabled,
			label: label || labels.label,
			onBlur,
			onFocus,
			placeholder: placeholder || labels.placeholder,
			required,
		};

		const childrenProps = (children?.props || {}) as Record<string, unknown>;
		const childrenPropInputProps = {
			...childrenProps,
			onClick: (event: React.MouseEvent<HTMLInputElement>) => {
				openDialog(event, { trigger: 'input-click' });
				if (typeof childrenProps.onClick === 'function') {
					childrenProps.onClick();
				}
			},
		};

		const inputRenderProps = input?.props || {};

		return {
			...defaultInputProps,
			...topLevelDeprecatedComponentProps,
			...childrenPropInputProps,
			...inputRenderProps,
		};
	}, [
		assistiveTextOpenCalendar,
		assistiveText.openCalendar,
		getIsOpen,
		openDialogFromIcon,
		setInputRefCallback,
		getId,
		handleInputChange,
		openDialog,
		handleKeyDown,
		value,
		formatter,
		inputValue,
		disabled,
		label,
		labels.label,
		labels.placeholder,
		onBlur,
		onFocus,
		placeholder,
		required,
		children,
		input,
	]);

	// ===== Main Render =====

	const inputProps = getInputProps();

	// `children` prop is a deprecated API
	const inputToRender = children ? (
		React.cloneElement(children, inputProps as Record<string, unknown>)
	) : (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		<Input {...(inputProps as any)} />
	);

	return (
		<div
			ref={triggerRef}
			className={classNames(
				'slds-dropdown-trigger',
				'slds-dropdown-trigger_click',
				'ignore-react-onclickoutside',
				{
					'slds-has-error': hasError,
					'slds-is-open': getIsOpen(),
				},
				triggerClassName
			)}
		>
			{inputToRender}
			{getDialog()}
		</div>
	);
};

Datepicker.displayName = DATE_PICKER;

export default Datepicker;
