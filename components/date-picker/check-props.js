/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable  max-len */

import deprecatedProperty from '../../utilities/warning/deprecated-property';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		deprecatedProperty(
			COMPONENT,
			props.onFocus,
			'onFocus',
			undefined,
			'Please see children prop description and add your own `Input` with this prop as a child of Datepicker.'
		);

		deprecatedProperty(
			COMPONENT,
			props.onBlur,
			'onBlur',
			undefined,
			'Please see children prop description and add your own `Input` with this prop as a child of Datepicker.'
		);

		deprecatedProperty(
			COMPONENT,
			props.onFocus,
			'abbrWeekDayLabels',
			'abbreviatedWeekDayLabels',
			'Prop name has changed.'
		);

		deprecatedProperty(
			COMPONENT,
			props.onFocus,
			'onDateChange',
			'onChange',
			'Please see prop description for `onChange`. Parameters have changed. The callback recieves an event and a data object of the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`'
		);

		deprecatedProperty(
			COMPONENT,
			props.onFocus,
			'onKeyDown',
			undefined,
			'Please see children prop description and add your own `Input` as a child of Datepicker.'
		);

		deprecatedProperty(
			COMPONENT,
			props.onFocus,
			'required',
			undefined,
			'Please see children prop description and add your own `Input` as a child of Datepicker.'
		);

		deprecatedProperty(COMPONENT, props.strValue, 'strValue', 'formattedValue');

		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'menuPosition="relative"'
		);
	};
}

export default checkProps;
