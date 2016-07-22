/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Timepicker Dropdown Trigger

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### Children
import Input from '../forms/input';

import { KEYS } from '../../utilities';

// ## Constants
import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';

/**
*  Component description.
*/
const TimepickerDropdownTrigger = React.createClass({
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: MENU_DROPDOWN_TRIGGER,

	// ### Prop Types
	propTypes: {
		/**
		* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering input.
		*/
		id: PropTypes.string,
		/**
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		/**
		 * The dropdown menu.
		 */
		menu: PropTypes.node,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering input loses focus.
		 */
		onBlur: PropTypes.func,
		/**
		 * This prop is passed onto the triggering `Input`. Triggered when the trigger input is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering input gains focus.
		 */
		onFocus: PropTypes.func,
		/**
		 * Called when a key pressed.
		 */
		onKeyDown: PropTypes.func,
		/**
		 * Called when mouse clicks down on the trigger input.
		 */
		onMouseDown: PropTypes.func,
		/**
		 * The ref of the actual triggering input.
		 */
		triggerRef: PropTypes.func,
		/**
		 * Date
		 */
		value: PropTypes.string
	},

	// ### Render
	render () {
		const {
			menu,
			onBlur,
			onFocus,
			onKeyDown, // eslint-disable-line no-unused-vars
			onMouseDown,
			triggerRef,
			...props
		} = this.props;

		return (
			<div
				onBlur={onBlur}
				onFocus={onFocus}
				onKeyDown={this.handleKeyDown}
				onMouseDown={onMouseDown}
			>
				<Input {...props} inputRef={triggerRef}>
					{menu}
				</Input>
			</div>
		);
	},

	handleKeyDown (event) {
		if (this.props.onKeyDown && event.keyCode) {
			if (event.keyCode === KEYS.ENTER ||
					event.keyCode === KEYS.DOWN ||
					event.keyCode === KEYS.UP ||
					event.keyCode === KEYS.ESCAPE) {
				this.props.onKeyDown(event);
			}
		}
	}
});

module.exports = TimepickerDropdownTrigger;
