/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { useRef, forwardRef, type ForwardedRef } from 'react';
import Datepicker, { type DatePickerProps } from './date-picker';
import { useClickOutside } from '../../utilities/hooks/use-click-outside';

export type {
	DatePickerProps,
	DatePickerAssistiveText,
	DatePickerLabels,
	DatePickerChangeData,
} from './date-picker';

/**
 * DatePicker wrapper that handles click outside detection
 * Replaces react-onclickoutside HOC for React 19 compatibility
 */
const DatepickerWithClickOutside = forwardRef<HTMLDivElement, DatePickerProps>(
	(props, ref: ForwardedRef<HTMLDivElement>) => {
		const containerRef = useRef<HTMLDivElement>(null);

		// Use our custom hook to detect clicks outside
		useClickOutside(
			containerRef,
			() => {
				// Trigger request close when clicking outside
				if (props.onRequestClose) {
					props.onRequestClose();
				}
			},
			{
				enabled: true,
				ignoreClass: 'ignore-react-onclickoutside',
			}
		);

		return (
			<div ref={containerRef}>
				<Datepicker {...props} />
			</div>
		);
	}
);

DatepickerWithClickOutside.displayName = 'DatepickerWithClickOutside';

export default DatepickerWithClickOutside;

