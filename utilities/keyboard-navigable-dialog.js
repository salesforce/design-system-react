define(['module', 'react-dom', './KEYS'], function (module, _reactDom, _KEYS) {
	'use strict';

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _KEYS2 = _interopRequireDefault(_KEYS);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	// # Assistive Technology / Keyboard Navigable Trait for Dialogs with Tabbable content

	/*
  * Guidelines for Popover
  *
  * - Focus is trapped. Tabbing to an index outside of the dialog is not allowed. Popover must be closed first via ESC.
  * - There should always be a focusable element inside, to place user focus on such as a close button
  * - Must be dismissible via ESC and a close button
  * - Uses tabIndex in wrapper and has tabbable items within it despite being outside document flow.
  * - Entire popover receives focus when opened and has a aria-labelledby that points to the header id, so it will read the heading,
  * - Must return focus to trigger after closing.
  * - F6 will allow the user to keep popover open and go back to tabbing in “app-context” instead of “dialog-context.” (not implemented, yet)
  */

	// ## Dependencies

	// ### React
	var internalHandleClick = function internalHandleClick(_ref) {
		var trigger = _ref.trigger,
		    eventTarget = _ref.eventTarget,
		    handleClick = _ref.handleClick;

		if (trigger && _reactDom2.default.findDOMNode(trigger) === eventTarget) {
			handleClick(event);
		}
	};

	// ### Event Helpers


	var KeyboardNavigableDialog = function KeyboardNavigableDialog(_ref2) {
		var isOpen = _ref2.isOpen,
		    handleClick = _ref2.handleClick,
		    keyCode = _ref2.keyCode,
		    eventTarget = _ref2.eventTarget,
		    trigger = _ref2.trigger,
		    toggleOpen = _ref2.toggleOpen;

		switch (keyCode) {
			case _KEYS2.default.ESCAPE:
				if (isOpen) {
					toggleOpen();
				}
				break;
			case _KEYS2.default.ENTER:
				if (!isOpen) {
					internalHandleClick({
						trigger: trigger,
						eventTarget: eventTarget,
						handleClick: handleClick
					});
				}
				break;
			default:
				break;
		}
	};

	module.exports = KeyboardNavigableDialog;
});