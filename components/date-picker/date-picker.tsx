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
import {
	useClickOutside,
	useControllableState,
} from '../../utilities/hooks';

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
	/**
	 * The requested date: the selected calendar date, or the result of `parser` for typed text.
	 * `null` when the input is cleared.
	 */
	date: Date | null;
	/** The formatted date, or the typed text */
	formattedDate: string;
	/** `date.getTimezoneOffset()`, or the current offset when `date` is `null` */
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
 * - `input-change`: the user typed in the input
 */
export type DatePickerRequestCloseTrigger =
	'date-select' | 'escape' | 'enter' | 'click-outside' | 'input-change';

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
	/** Date formatting function. Called with `null` when there is no date. */
	formatter?: (date: Date | null | undefined) => string;
	/** Whether to show error state */
	hasError?: boolean;
	/** Prevent dropdown position flipping */
	hasStaticAlignment?: boolean;
	/** HTML id */
	id?: string;
	/** Custom input component */
	input?: ReactElement;
	/**
	 * Initial open state of the calendar when `isOpen` is not set (uncontrolled). Defaults to `false`.
	 */
	defaultIsOpen?: boolean;
	/**
	 * Whether the calendar is open. When set, the calendar is controlled: it never opens or closes
	 * itself, so update it from `onRequestOpen` and `onRequestClose`. When `undefined`, the calendar
	 * manages its own open state (see `defaultIsOpen`).
	 */
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
	/**
	 * Called when the user selects a date in the calendar or types in the input. `value` is
	 * controlled: set it to `data.date` here (or keep the old value to reject the change).
	 * Clearing the input reports `date: null`.
	 */
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
	 * When `isOpen` is `undefined` the calendar also closes itself; when `isOpen` is set,
	 * set it to `false` here.
	 */
	onRequestClose?: (
		event: React.SyntheticEvent | MouseEvent | TouchEvent | undefined,
		data: DatePickerRequestCloseData
	) => void;
	/**
	 * Called when the calendar requests to open (input click, icon click, or Down/Up arrow).
	 * When `isOpen` is `undefined` the calendar also opens itself; when `isOpen` is set, set it
	 * to `true` here. Not fired by the arrow keys while already open.
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
	/**
	 * Selected date, or `null` for no date. Required and controlled: the input and calendar
	 * always reflect it, and the input's typed text is reset from it whenever it changes.
	 * Update it from `onChange`. (`undefined` is treated as `null` and warns in development.)
	 */
	value: Date | null;
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

const isDate = (date: unknown): date is Date =>
	Object.prototype.toString.call(date) === '[object Date]';

/**
 * Stable identity of a `value`, so a parent passing `new Date(...)` on every render does not
 * re-sync the typed text. Invalid dates share one key.
 */
const getDateKey = (date: Date | null): string =>
	date ? String(date.getTime()) : 'null';

// ===== Component =====

const Datepicker: React.FC<DatePickerProps> = (props) => {
	const {
		assistiveText: assistiveTextProp = {},
		align = 'left',
		className,
		children,
		disabled,
		dateDisabled = () => false,
		defaultIsOpen = false,
		formatter = defaultFormatter,
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
		value: valueProp,
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

	// `value` is controlled data; `undefined` (warned in `checkProps`) means no date
	const value = valueProp ?? null;
	const valueKey = getDateKey(value);

	// State
	// The calendar's open state is ephemeral UI: controlled when `isOpen` is set
	const [isOpen, setIsOpen] = useControllableState(isOpenProp, defaultIsOpen);
	const [isOpenFromIcon, setIsOpenFromIcon] = useState(false);
	// The input's text is a buffer so it can hold partial input. `valueKey` is the `value` it was
	// last synced from, and `typedKey` the date reported for the typed text.
	const [inputBuffer, setInputBuffer] = useState<{
		text: string;
		valueKey: string;
		typedKey: string | null;
	}>(() => ({ text: formatter(value), valueKey, typedKey: null }));
	const [inputRendered, setInputRendered] = useState(false);

	// Re-sync the typed text whenever `value` changes, unless the change is the parent accepting
	// the date that was just typed (so the user's text is not reformatted mid-typing)
	if (inputBuffer.valueKey !== valueKey) {
		setInputBuffer({
			text:
				inputBuffer.typedKey === valueKey ? inputBuffer.text : formatter(value),
			valueKey,
			typedKey: null,
		});
	}
	const inputValue = inputBuffer.text;

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

	const getIsOpen = useCallback(() => !!isOpen, [isOpen]);

	const parseDate = useCallback(
		(dateString: string): Date => {
			let parsedDate = parser(dateString);
			if (!isDate(parsedDate) || isNaN(parsedDate.getTime())) {
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

			// No-op when `isOpen` is controlled: the parent decides
			setIsOpen(false);
			setIsOpenFromIcon(false);

			if (inputRef.current) {
				inputRef.current.focus();
			}
		},
		[onRequestClose, getIsOpen, setIsOpen]
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

			// No-op when `isOpen` is controlled: the parent decides
			setIsOpen(true);
			onRequestOpen?.(event, data);
		},
		[onRequestOpen, setIsOpen]
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
			handleRequestClose(event, { trigger: 'date-select' });

			if (onChange) {
				onChange(event, {
					date,
					formattedDate: formatter(date),
					timezoneOffset: date.getTimezoneOffset(),
				});
			}
		},
		[formatter, handleRequestClose, onChange]
	);

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const text = event.target.value;
			// Clearing the input requests no date. `parser` is typed to return a `Date`, but guard
			// against parsers that return `null` for partial input.
			const parsedDate = text === '' ? null : parser(text);
			const date = isDate(parsedDate) ? parsedDate : null;

			setInputBuffer((buffer) => ({
				...buffer,
				text,
				typedKey: getDateKey(date),
			}));

			// Typing closes the calendar, through the same request path as the keyboard and mouse
			handleRequestClose(event, { trigger: 'input-change' });

			if (onChange) {
				onChange(event, {
					date,
					formattedDate: text,
					timezoneOffset: (date ?? new Date()).getTimezoneOffset(),
				});
			}
		},
		[handleRequestClose, parser, onChange]
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
		if (value) {
			const formattedDate = formatter(value);
			date = formattedDate ? parseDate(formattedDate) : value;
		} else {
			date = new Date();
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
			value: inputValue,
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
