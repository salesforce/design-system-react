/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Dropdown Trigger Component (Simple Button Flavor) --- SLDS for React

// ### React
// React is an external dependency of the project.
import React from 'react';

import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classnames from 'classnames';

import Button from '../button';

// ### Children
import { MENU_DROPDOWN_TRIGGER } from '../../utilities/constants';

/**
 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
 */
class Trigger extends React.Component {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	static displayName = MENU_DROPDOWN_TRIGGER;

	// ### Prop Types
	static propTypes = {
		/**
		 * Import the module `design-system-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the triggering button. Any `id` prop or event hanlders (`onBlur`, `onClick`, etc.) set on the button grandchild will be overwritten by `MenuDropdown` to allow functionality and accessibility.
		 * ```
		 * <Dropdown>
		 *   <Trigger>
		 *   <Button iconCategory="utility" iconName="settings" />
		 *   </Trigger>
		 * </Dropdown>
		 * ```
		 */
		children: PropTypes.element,
		/**
		 * CSS classes to be added to triggering button.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. This is provided by the `MenuDropdown`. Please use `MenuDropdown` to set.
		 */
		id: PropTypes.string,
		/**
		 * Informs the trigger on the open/close state of the dropdown menu
		 */
		isOpen: PropTypes.bool,
		/**
		 * By Default the dropdown menu is inside a `Dialog` component.
		 */
		menu: PropTypes.node,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
		 */
		onBlur: PropTypes.func,
		/**
		 * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
		 */
		onFocus: PropTypes.func,
		/**
		 * Called when a key pressed.
		 */
		onKeyDown: PropTypes.func,
		/**
		 * Called when mouse clicks down on the trigger button.
		 */
		onMouseDown: PropTypes.func,
		/**
		 * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseEnter: PropTypes.func,
		/**
		 * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
		 */
		onMouseLeave: PropTypes.func,
		/**
		 * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
		 */
		openOn: PropTypes.oneOf(['hover', 'click', 'hybrid']),
		/**
		 * The ref of the actual triggering button.
		 */
		triggerRef: PropTypes.func,
		/**
		 * CSS classes to be added to wrapping trigger `div` around the button.
		 */
		triggerClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
	};

	// ### Render
	render() {
		// The following are required for use with dropdown. Any other custom props for `Button` should be set with a `Button` child of this component, and are technically just here for backwards compatibility. See `children` prop description for more information.
		const {
			assistiveText,
			children, // eslint-disable-line no-unused-vars
			className,
			id,
			isInline, // eslint-disable-line no-unused-vars
			isOpen,
			onBlur,
			menu,
			onClick,
			onFocus,
			onKeyDown,
			onMouseDown,
			onMouseEnter,
			onMouseLeave,
			triggerRef,
			triggerClassName,
			...deprecatedPropsFromMenuDropdown
		} = this.props;

		const openOn = this.props.openOn === 'hover' ? 'click' : this.props.openOn;

		// Trigger manipulation
		let propsFromGrandchildButton = {};
		// if there are no children, render the default button
		if (React.Children.count(this.props.children) !== 0) {
			React.Children.forEach(this.props.children, (child) => {
				if (child && child.type.displayName === Button.displayName) {
					propsFromGrandchildButton = child.props;
				}
			});
		}

		// If Trigger has a Button child, then use the explicitly declared child's props layered on top of those passed down by dropdown's props to allow manual override
		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<div
				className={classnames(
					`slds-dropdown-trigger slds-dropdown-trigger_${openOn}`,
					{
						'slds-is-open': isOpen,
					},
					triggerClassName
				)}
				id={id}
				onBlur={onBlur}
				onClick={onClick}
				onKeyDown={onKeyDown}
				onFocus={onFocus}
				onMouseDown={onMouseDown}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{/* eslint-disable jsx-a11y/no-static-element-interactions */}
				<Button
					assistiveText={assistiveText}
					className={className}
					aria-expanded={isOpen}
					aria-haspopup
					{...deprecatedPropsFromMenuDropdown}
					{...propsFromGrandchildButton}
					buttonRef={triggerRef}
				/>
				{menu}
			</div>
		);
	}
}

export default Trigger;
