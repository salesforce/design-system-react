/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable import/no-mutable-exports */
/* eslint-disable  max-len */

import deprecatedProperty from '../../utilities/warning/deprecated-property';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		// Deprecated and changed to another property
		deprecatedProperty(COMPONENT, props.modal, 'modal', 'isInline', 'In an effort to add clarity to the meaning of the modal prop and to make more props default to false, `isInline` has replaced `modal` and is the reverse of modal.');

		deprecatedProperty(COMPONENT, props.onFocus, 'onFocus', undefined, 'Please see children prop description and add your own `Input` with this prop as a child of Datepicker.');

		deprecatedProperty(COMPONENT, props.onBlur, 'onBlur', undefined, 'Please see children prop description and add your own `Input` with this prop as a child of Datepicker.');

		deprecatedProperty(COMPONENT, props.onFocus, 'abbrWeekDayLabels', 'abbreviatedWeekDayLabels', 'Prop name has changed.');

		deprecatedProperty(COMPONENT, props.onFocus, 'onDateChange', 'onChange', 'Please see prop description for `onChange`. Parameters have changed. The callback recieves an event and a data object of the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`');

		deprecatedProperty(COMPONENT, props.onFocus, 'onKeyDown', undefined, 'Please see children prop description and add your own `Input` as a child of Datepicker.');

		deprecatedProperty(COMPONENT, props.onFocus, 'required', undefined, 'Please see children prop description and add your own `Input` as a child of Datepicker.');

		deprecatedProperty(COMPONENT, props.strValue, 'strValue', 'formattedValue');
	};
}

export default checkProps;
