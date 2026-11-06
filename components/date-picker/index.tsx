/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { forwardRef, type ForwardedRef } from 'react';
import classNames from 'classnames';
import Datepicker, { type DatePickerProps } from './date-picker';

export type {
	DatePickerProps,
	DatePickerAssistiveText,
	DatePickerLabels,
	DatePickerChangeData,
	DatePickerChangeHandler,
	DatePickerChangeProps,
	DatePickerCloseData,
	DatePickerRequestCloseData,
	DatePickerRequestCloseTrigger,
	DatePickerRequestOpenData,
	DatePickerRequestOpenTrigger,
} from './date-picker';

/**
 * DatePicker wrapper preserved for markup/backwards compatibility.
 *
 * Click-outside detection now lives inside the DatePicker component itself
 * (see `date-picker.tsx`) so it can call the internal close handler directly
 * and work for both controlled and uncontrolled usage. This replaces the
 * react-onclickoutside HOC that was removed for React 19 compatibility.
 */
const DatepickerWithClickOutside = forwardRef<HTMLDivElement, DatePickerProps>(
	({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => (
		<div ref={ref} className={classNames(className as string) || undefined}>
			<Datepicker {...props} />
		</div>
	)
);

DatepickerWithClickOutside.displayName = 'DatepickerWithClickOutside';

export default DatepickerWithClickOutside;
