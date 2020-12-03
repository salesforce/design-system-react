/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// # Global Navigation Dropdown Component

// ## Dependencies

// ### React
import React from 'react';

import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

import colors from '../../utilities/design-tokens/dist/salesforce-skin.common.js';

import checkProps from './check-props';
import componentDoc from './component.json';

import Button from '../button';

// ## Constants
import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';

/**
 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
 */
class GlobalNavigationDropdownTrigger extends React.Component {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	static displayName = MENU_DROPDOWN_TRIGGER;

	// ### Prop Types
	static propTypes = {
		/**
		 * Whether the item is active or not.
		 */
		active: PropTypes.bool,
		/**
		 * Allows alignment of active item with active application background color.
		 */
		activeBackgroundColor: PropTypes.string,
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
		 */
		assistiveText: PropTypes.shape({
			icon: PropTypes.string,
		}),
		/**
		 * CSS classes to be added to the 'li'.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Determines position of separating bar.
		 */
		dividerPosition: PropTypes.oneOf(['left', 'right']),
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
		triggerRef: PropTypes.func,
	};

	static defaultProps = { assistiveText: { icon: 'Open menu item submenu' } };

	constructor(props) {
		super(props);
		checkProps(MENU_DROPDOWN_TRIGGER, this.props, componentDoc);
	}

	// ### Render
	render() {
		const {
			active,
			activeBackgroundColor,
			className,
			dividerPosition,
			id,
			isOpen,
			label,
			menu,
			onBlur,
			onClick,
			onFocus,
			onKeyDown,
			onMouseDown,
			onMouseEnter,
			onMouseLeave,
			triggerRef,
			...rest
		} = this.props;

		const listItemstyle = {};
		// Uses design token to get correct color
		const hoverBackgroundColor = colors.brandPrimaryTransparent10;

		if (active) {
			listItemstyle.backgroundColor = activeBackgroundColor;
			listItemstyle.borderBottomColor = activeBackgroundColor;
		}

		// Per SLDS pattern, set trigger style like hover style, so that hover visuals and menu being open and closed are in same state
		if (isOpen) {
			listItemstyle.backgroundColor = hoverBackgroundColor;
		}

		return (
			// eslint-disable-next-line jsx-a11y/role-supports-aria-props
			<li
				aria-haspopup="true"
				className={classNames(
					'slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click',
					{
						'slds-is-open': isOpen,
						'slds-is-active': active,
						[`slds-context-bar__item_divider-${dividerPosition}`]: dividerPosition,
					},
					className
				)}
				id={id}
				onBlur={onBlur}
				onClick={onClick}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				onMouseDown={onMouseDown}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				ref={triggerRef}
				style={listItemstyle}
			>
				<a className="slds-context-bar__label-action" title={label}>
					<span className="slds-truncate" title={label}>
						{label}
					</span>
				</a>
				<div className="slds-context-bar__icon-action slds-p-left_none">
					<Button
						assistiveText={this.props.assistiveText}
						{...rest}
						className="slds-context-bar__button"
						aria-haspopup="true"
						iconCategory="utility"
						iconName="chevrondown"
						iconVariant="bare"
						variant="icon"
					/>
				</div>
				{menu}
			</li>
		);
	}
}

export default GlobalNavigationDropdownTrigger;
