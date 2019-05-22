/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable  max-len */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		deprecatedProperty(
			COMPONENT,
			props.children,
			'children',
			'input',
			`Please see \`input\` prop description and add your own \`Input\`. Props will be shallow merged. ${createDocUrl(
				'input'
			)}`
		);

		deprecatedProperty(
			COMPONENT,
			props.onFocus,
			'onFocus',
			undefined,
			`Please see \`input\` prop description and add your own \`Input\`. Props will be shallow merged. ${createDocUrl(
				'input'
			)}`
		);

		deprecatedProperty(
			COMPONENT,
			props.onBlur,
			'onBlur',
			undefined,
			`Please see \`input\` prop description and add your own \`Input\`. Props will be shallow merged. ${createDocUrl(
				'input'
			)}`
		);

		deprecatedProperty(
			COMPONENT,
			props.abbrWeekDayLabels,
			'abbrWeekDayLabels',
			'abbreviatedWeekDayLabels',
			`Prop name has changed. ${createDocUrl('labels')}`
		);

		deprecatedProperty(
			COMPONENT,
			props.onDateChange,
			'onDateChange',
			'onChange',
			`Please see prop description for \`onChange\`. Parameters have changed. The callback receives an event and a data object of the shape: \`{date: [Date object], formattedDate: [string], timezoneOffset: [number]}\` ${createDocUrl(
				'onChange'
			)}`
		);

		deprecatedProperty(
			COMPONENT,
			props.onKeyDown,
			'onKeyDown',
			undefined,
			`Please see \`input\` prop description and add your own \`Input\`. Props will be shallow merged. ${createDocUrl(
				'input'
			)}`
		);

		deprecatedProperty(
			COMPONENT,
			props.onFocus,
			'required',
			undefined,
			`Please see children prop description and add your own \`Input\` as a child of Datepicker. ${createDocUrl(
				'children'
			)}`
		);

		deprecatedProperty(
			COMPONENT,
			props.strValue,
			'strValue',
			'formattedValue',
			createDocUrl('formattedValue')
		);

		deprecatedProperty(
			COMPONENT,
			props.isInline,
			'isInline',
			'menuPosition="relative"',
			createDocUrl('menuPosition')
		);
	};
}

export default checkProps;
