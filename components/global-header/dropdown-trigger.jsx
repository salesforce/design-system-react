/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Global Header Dropdown Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classnames from 'classnames';

// ### Dropdown
import Button from '../button';

// ### Children
import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';

/**
*  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
*/
const GlobalHeaderDropdownTrigger = React.createClass({
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: MENU_DROPDOWN_TRIGGER,

	// ### Prop Types
	propTypes: {
		/**
		 * An image URL to display for the user profile.
		 */
		avatar: PropTypes.string,
		/**
		 * CSS classes to be added to `li` element.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		*/
		id: PropTypes.string,
		/**
		* Adds custom styling such as inverse fill and special sizing/spacing
		*/
		globalAction: PropTypes.bool,
		/**
		 * The dropdown menu.
		 */
		menu: PropTypes.node,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering li loses focus.
		 */
		onBlur: PropTypes.func,
		/**
		 * This prop is passed onto the triggering `li`. Triggered when the trigger li is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering li gains focus.
		 */
		onFocus: PropTypes.func,
		/**
		 * Called when a key pressed.
		 */
		onKeyDown: PropTypes.func,
		/**
		 * Called when mouse clicks down on the trigger li.
		 */
		onMouseDown: PropTypes.func,
		/**
		 * The ref of the actual triggering button.
		 */
		triggerRef: PropTypes.func
	},

	// ### Render
	render () {
		// The following props are provided to the `li`, all others are passed into the `Button`
		const {
			avatar,
			className,
			id,
			globalAction,
			menu,
			onBlur,
			onClick,
			onFocus,
			onKeyDown,
			onMouseDown,
			triggerRef,
			...rest
		} = this.props;

		// TODO: Add avatar component for use across multiple components
		return (
			<li
				aria-haspopup="true"
				className={classnames(
					'slds-dropdown-trigger slds-dropdown-trigger--click',
					{ 'slds-p-around--xx-small': globalAction },
					className
				)}
				id={id}
				onBlur={onBlur}
				onClick={onClick}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				onMouseDown={onMouseDown}
			>
				<Button
					className={classnames({ 'slds-global-header__button--icon-actions': globalAction })}
					iconClassName={classnames({ 'slds-global-header__icon-actions': globalAction })}
					aria-haspopup="true"
					{...rest}
					ref={triggerRef}
				>
					{avatar ? <span className="slds-avatar slds-avatar--circle slds-avatar--medium">
						<img src={avatar} alt="" />
					</span> : null}
				</Button>
				{menu}
			</li>
		);
	}
});

module.exports = GlobalHeaderDropdownTrigger;
