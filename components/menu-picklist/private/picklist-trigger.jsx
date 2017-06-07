/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

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

// ### Display Name
// Always use the canonical component name (set in the core) as the React
// display name.
const displayName = MENU_DROPDOWN_TRIGGER;

// ### Prop Types
const propTypes = {
	/**
	 *  A unique ID that matches the error label to the trigger element for screen readers.
	 */
	'aria-describedby': React.PropTypes.string,
	/**
	 * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon inside the <input /> means.
	 */
	assistiveText: PropTypes.string,
	/**
	 * CSS classes to be added to the parent <div /> with class="slds-picklist" and role="combobox".
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Disables the <input /> and adds disabled styling.
	 */
	disabled: PropTypes.bool,
	/**
	 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
	 */
	errorText: PropTypes.string,
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering <input />.
	 */
	id: PropTypes.string,
	/**
	 * Allows the picklist menu to style itself accordingly when open since CSS hover rules cannot take effect if the menu is not inline.
	 */
	isOpen: PropTypes.bool,
	/**
	 * Visible label on the picklist menu trigger <input />.
	 */
	label: PropTypes.string,
	/**
	 * The picklist menu.
	 */
	menu: PropTypes.node,
	/**
	 * This prop is passed onto the triggering `li`. Triggered when the trigger li is clicked.
	 */
	onClick: PropTypes.func,
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
	 * Placeholder value in <input />.
	 */
	placeholder: PropTypes.string,
	/**
	 * Highlights the input as a required field (does not perform any validation).
	 */
	required: PropTypes.bool,
	/**
	 * The ref of the actual triggering <input />.
	 */
	triggerRef: PropTypes.func
};

const defaultProps = {
	assistiveText: 'Open Menu',
	placeholder: 'Select option'
};

/**
 *  The Picklist Trigger renders the default readonly <input /> trigger which opens the picklist menu.
 */
const PicklistDropdownTrigger = (props) => {
	let errorId = null;
	if (props.errorText) {
		errorId =  props['aria-describedby'] || shortid.generate();
	}

	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions
			aria-expanded={props.isOpen}
			aria-haspopup="listbox" // eslint-disable-line jsx-a11y/aria-proptypes
			className={classNames(
				'slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click',
				{ 'slds-is-open': props.isOpen },
				props.className
			)}
			role="combobox"
		>
			<div
				className={classNames('slds-form-element', {
					'slds-has-error': props.errorText
				})}
			>
				<label
					className="slds-form-element__label"
					htmlFor={props.id}
				>
					{props.required && <abbr className="slds-required" title="required">*</abbr>}
					{props.label}
				</label>
				<div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right slds-picklist__input">
					<input
						aria-activedescendant={props['aria-activedescendant']}
						aria-controls={props.dropdownId}
						aria-describedby={errorId}
						aria-required={props['aria-required']}
						autoComplete="off"
						className="slds-lookup__search-input slds-input"
						id={props.id}
						onClick={props.onClick}
						onKeyDown={props.onKeyDown}
						placeholder={props.placeholder}
						readOnly
						ref={props.triggerRef}
						role="textbox"
						type="text"
						value={props.value}
					/>
					<InputIcon
						aria-expanded={props.isOpen}
						className="slds-button slds-button--icon slds-input__icon slds-text-color--default"
						assistiveText={props.assistiveText}
						name="down"
						category="utility"
						onClick={() => {}}
						disabled={props.disabled}
						title={props.assistiveText}
						tabIndex="-1"
					/>
					{props.errorText && <div id={errorId} className="slds-form-element__help" style={{ position: 'absolute' }}>{props.errorText}</div>}
					{props.menu}
				</div>
			</div>
		</div>
	);
};

PicklistDropdownTrigger.displayName = displayName;
PicklistDropdownTrigger.propTypes = propTypes;
PicklistDropdownTrigger.defaultProps = defaultProps;

module.exports = PicklistDropdownTrigger;
