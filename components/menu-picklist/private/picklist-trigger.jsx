/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Dropdown Trigger for Picklist

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import InputIcon from '../../icon/input-icon';

// ## Constants
import { MENU_DROPDOWN_TRIGGER } from '../../../utilities/constants';

/**
*  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
*/
const PicklistDropdownTrigger = React.createClass({
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: MENU_DROPDOWN_TRIGGER,

	// ### Prop Types
	propTypes: {
		/**
		 * Whether the item is active or not.
		 */
		active: React.PropTypes.bool,
		/**
		 * Allows alignment of active item with active application background color.
		 */
		activeBackgroundColor: PropTypes.string,
		/**
		 * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
		 * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
		 */
		assistiveText: PropTypes.string.isRequired,
		/**
		 * CSS classes to be added to the 'li'.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Determines position of separating bar.
		 */
		dividerPosition: PropTypes.oneOf(['left', 'right']),
		/**
		 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText: PropTypes.string,
		/**
		* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		*/
		id: PropTypes.string,
		/**
		* Allows the dropdown menu to style itself accordingly when open since CSS hover rules cannot take effect if the menu is not inline.
		*/
		isOpen: PropTypes.bool,
		/**
		 * Visible label on the dropdown menu trigger button.
		 */
		label: PropTypes.string,
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
		 * Called when mouse clicks down on the trigger `li`.
		 */
		onMouseDown: PropTypes.func,
		/**
		 * Called when mouse hovers over the trigger `li`.
		 */
		onMouseEnter: PropTypes.func,
		/**
		 * Called when mouse leaves trigger `li` or the menu.
		 */
		onMouseLeave: PropTypes.func,
		/**
		 * The ref of the actual triggering button.
		 */
		triggerRef: PropTypes.func
	},

	componentWillMount () {
		if (this.props.errorText) {
			this.errorId =  this.props['aria-describedby'] || shortid.generate();
		}
	},


	// ### Render
	render () {
		const {
			active,
			activeBackgroundColor,
			className,
			disabled,
			dropdownId,
			errorText,
			id,
			isOpen,
			label,
			menu,
			onClick,
			onKeyDown,
			required,
			triggerRef
		} = this.props;

		const listItemstyle = {};
		// TODO: This should eventually exist in a CSS class. Feature has been filed.
		const hoverBackgroundColor = '#f7f9fb';

		if (active) {
			listItemstyle.backgroundColor = activeBackgroundColor;
			listItemstyle.borderBottomColor = activeBackgroundColor;
		}

		// Per SLDS pattern, set trigger style like hover style, so that hover visuals and menu being open and closed are in same state
		if (isOpen) {
			listItemstyle.backgroundColor = hoverBackgroundColor;
		}

		return (
			<div // eslint-disable-line jsx-a11y/no-static-element-interactions
				aria-expanded={isOpen}
				aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
				className={classNames(
						'slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click',
						{ 'slds-is-open': isOpen },
						className
					)}
				ref={triggerRef}
				role="combobox"
			>
				<div
					className={classNames('slds-form-element', {
						'slds-has-error': errorText
					})}
				>
					<label
						className="slds-form-element__label"
						htmlFor={id}
					>
						{required && <abbr className="slds-required" title="required">*</abbr>}
						Categories
					</label>
					<div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right slds-picklist__input">
						<input
							aria-activedescendant=""
							aria-controls={dropdownId}
							aria-describedby={this.errorId}
							aria-required={this.props['aria-required']}
							autoComplete="off"
							className="slds-lookup__search-input slds-input"
							id={id}
							onClick={onClick}
							onKeyDown={onKeyDown}
							placeholder="Select an Option"
							readOnly
							role="textbox"
							type="text"
							value={label}
						/>
						<InputIcon
							aria-expanded={isOpen}
							className="slds-button slds-button--icon slds-input__icon slds-text-color--default"
							assistiveText="Expand category options"
							name="down"
							category="utility"
							onClick={() => {}}
							disabled={disabled}
							title="Expand category options"
							tabIndex="-1"
						/>
						{errorText && <div id={this.errorId} className="slds-form-element__help" style={{ position: 'absolute' }}>{errorText}</div>}
						{menu}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = PicklistDropdownTrigger;
