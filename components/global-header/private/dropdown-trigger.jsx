/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// # Global Header Dropdown Component

// ## Dependencies

// ### React
import React from 'react';

import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

// ### Dropdown
import Button from '../button';

// ### Children
import { MENU_DROPDOWN_TRIGGER } from '../../../utilities/constants';

/**
 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
 */
class GlobalHeaderDropdownTrigger extends React.Component {
	// TODO: Make this a stateless component, however dropdowns break when this component becomes stateless.

	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	static displayName = MENU_DROPDOWN_TRIGGER;

	// ### Prop Types
	static propTypes = {
		/**
		 * An image URL or avatar node to display for the user profile.
		 */
		avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		/**
		 * CSS classes to be added to `li` element.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		 */
		id: PropTypes.string,
		/**
		 * Informs the trigger on the open/close state of the dropdown menu
		 */
		isOpen: PropTypes.bool,
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
		 * Called when mouse hovers over the trigger `li`.
		 */
		onMouseEnter: PropTypes.func,
		/**
		 * Called when mouse leaves trigger `li` or the menu.
		 */
		onMouseLeave: PropTypes.func,
		/**
		 * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
		 */
		openOn: PropTypes.oneOf(['hover', 'click', 'hybrid']),
		/**
		 * Set to true if menu is inline and relatively positioned with CSS. This is the typical use case for menus with nubbins.
		 */
		positioned: PropTypes.bool,
		/**
		 * The ref of the actual triggering button.
		 */
		triggerRef: PropTypes.func,
	};

	renderAvatar = () => {
		const { avatar } = this.props;
		if (typeof avatar === 'string') {
			return (
				<span className="slds-avatar slds-avatar_circle slds-avatar_medium">
					<img src={avatar} alt="" />
				</span>
			);
		}
		return avatar || null;
	};

	// ### Render
	render() {
		// The following props are provided to the `li`, all others are passed into the `Button`
		const {
			className,
			id,
			isOpen,
			globalAction,
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

		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			// eslint-disable-next-line jsx-a11y/role-supports-aria-props
			<li
				aria-haspopup="true"
				className={classnames(
					'slds-dropdown-trigger slds-dropdown-trigger_click',
					{
						'slds-is-open': isOpen,
						'slds-p-around_xx-small': globalAction,
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
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<Button
					className={classnames({
						'slds-global-header__button_icon-actions': globalAction,
					})}
					iconClassName={classnames({
						'slds-global-header__icon-actions': globalAction,
					})}
					aria-haspopup="true"
					buttonVariant="dropdown"
					{...rest}
				>
					{this.renderAvatar()}
				</Button>
				{menu}
			</li>
		);
	}
}

export default GlobalHeaderDropdownTrigger;
