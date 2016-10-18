'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-mutable-exports */

/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// This function will deliver an error message to the browser console about the removal of a property.
var isTriggerTabbable = function isTriggerTabbable() {};

if (process.env.NODE_ENV !== 'production') {
	(function () {
		var hasWarned = {};

		isTriggerTabbable = function isTriggerTabbable(COMPONENT, trigger, comment) {
			var additionalComment = comment ? ' ' + comment : '';
			var childTabIndex = trigger.props.tabIndex;
			var elementIsTabbable = true;

			if (
			// List of "native" HTML elements that are tabbable by default
			trigger.type !== 'button' && trigger.type !== 'input' && trigger.type !== 'select' && trigger.type !== 'textarea' && trigger.type !== 'a'
			// List of components that are tabbable by default
			 && trigger.type.displayName !== _constants.BUTTON && trigger.type.displayName !== _constants.BUTTON_STATEFUL && trigger.type.displayName !== _constants.BUTTON_GROUP && trigger.type.displayName !== _constants.CHECKBOX && trigger.type.displayName !== _constants.DATEPICKER && trigger.type.displayName !== _constants.FORMS_INPUT && trigger.type.displayName !== _constants.LOOKUP && trigger.type.displayName !== _constants.TIME_PICKER) {
				// if it's not one of the above, then check to see if it has a tabIndex
				if (childTabIndex === '-1' || childTabIndex === undefined) {
					elementIsTabbable = false;
					if (!hasWarned[COMPONENT]) {
						/* eslint-disable max-len */
						(0, _warning2.default)(elementIsTabbable, '[Design System React] The element that triggers ' + COMPONENT + ' must be tabbable for  keyboard users. Elements such as anchor, button, input or a DOM element with tabIndex="0" specified are tabbable.' + additionalComment);
						/* eslint-enable max-len */
						hasWarned[COMPONENT] = !!elementIsTabbable;
					}
				}
			}
		};
	})();
}

exports.default = isTriggerTabbable;