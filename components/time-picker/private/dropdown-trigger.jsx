/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Timepicker Dropdown Trigger

// ## Dependencies

// ### React
import React from 'react';

import PropTypes from 'prop-types';

// ### Children
import Input from '../../input';

// ### Event Helpers
import KEYS from '../../../utilities/key-code';

// ## Constants
import { MENU_DROPDOWN_TRIGGER } from '../../../utilities/constants';

/**
 *  Component description.
 */
class TimepickerDropdownTrigger extends React.Component {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	static displayName = MENU_DROPDOWN_TRIGGER;

	// ### Prop Types
	static propTypes = {
		/**
		 * Icon for right side of trigger
		 */
		iconRight: PropTypes.node,
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
		value: PropTypes.string,
	};

	handleKeyDown = (event) => {
		if (this.props.onKeyDown && event.keyCode) {
			if (
				event.keyCode === KEYS.ENTER ||
				event.keyCode === KEYS.DOWN ||
				event.keyCode === KEYS.UP ||
				event.keyCode === KEYS.ESCAPE
			) {
				this.props.onKeyDown(event);
			}
		}
	};

	// ### Render
	render() {
		const {
			iconRight,
			menu,
			onBlur,
			onFocus,
			onKeyDown, // eslint-disable-line no-unused-vars
			onMouseDown,
			triggerRef,
			...props
		} = this.props;

		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<div
				onBlur={onBlur}
				onFocus={onFocus}
				onKeyDown={this.handleKeyDown}
				onMouseDown={onMouseDown}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<Input iconRight={iconRight} {...props} inputRef={triggerRef}>
					{menu}
				</Input>
			</div>
		);
	}
}

export default TimepickerDropdownTrigger;
