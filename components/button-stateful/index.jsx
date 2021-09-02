/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Button Stateful design pattern](https://lightningdesignsystem.com/components/buttons/#flavor-stateful) in React.
// Based on SLDS v2.1.1

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

// ## Children
import ButtonIcon from '../icon/button-icon';

import getAriaProps from '../../utilities/get-aria-props';
import { BUTTON_STATEFUL } from '../../utilities/constants';

const propTypes = {
	/**
	 * Specifies the current state of the button. If set, the button will act as a ['controlled' component](https://facebook.github.io/react/docs/forms.html#controlled-components).
	 */
	active: PropTypes.bool,
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. This should also include the state of the button. If the button has an icon and a visible label, you can omit the <code>icon</code> prop and use the <code>label</code> prop.
	 */
	assistiveText: PropTypes.shape({
		icon: PropTypes.string,
	}),
	/**
	 * Disables the button and adds disabled styling.
	 */
	disabled: PropTypes.bool,
	/**
	 * Icon associated with the stateful button. Accepts an `Icon` component
	 */
	icon: PropTypes.node,
	/**
	 * Triggered when focus is removed.
	 */
	onBlur: PropTypes.func,
	/**
	 * Triggered when the button is clicked.
	 */
	onClick: PropTypes.func,
	/**
	 * Triggered when component is focused.
	 */
	onFocus: PropTypes.func,
	/**
	 * Triggered when a key is pressed down
	 */
	onKeyDown: PropTypes.func,
	/**
	 * Triggered when a key is pressed and released
	 */
	onKeyPress: PropTypes.func,
	/**
	 * Triggered when a key is released
	 */
	onKeyUp: PropTypes.func,
	/**
	 * Triggered when a mouse button is pressed down
	 */
	onMouseDown: PropTypes.func,
	/**
	 * Triggered when a mouse arrow hovers
	 */
	onMouseEnter: PropTypes.func,
	/**
	 * If true, button scales to 100% width on small form factors.
	 */
	responsive: PropTypes.bool,
	/**
	 * Initial label and icon (optional) of button.
	 */
	stateOne: PropTypes.object,
	/**
	 * Selected label and icon (optional) of button.
	 */
	stateTwo: PropTypes.object,
	/**
	 * Deselect label and icon (optional) of button.
	 */
	stateThree: PropTypes.object,
	/**
	 * Write "-1" if you don't want the user to tab to the button.
	 */
	tabIndex: PropTypes.string,
	/**
	 * Different types of buttons
	 */
	variant: PropTypes.oneOf([
		'base',
		'neutral',
		'brand',
		'destructive',
		'icon',
		'icon-filled',
	]),
};

// i18n
const defaultProps = {
	assistiveText: { icon: '' },
	disabled: false,
	iconSize: 'medium',
	responsive: false,
	stateOne: { iconName: 'add', label: 'Follow' },
	stateTwo: { iconName: 'check', label: 'Following' },
	stateThree: { iconName: 'close', label: 'Unfollow' },
};

/**
 * The ButtonStateful component is a variant of the Lightning Design System Button component. It is used for buttons that have a state of unselected or selected.
 * For icon buttons, use <code>variant='icon'</code>. For buttons with labels or buttons with labels and icons, pass data to the state props (ie. <code>stateOne={{iconName: 'add', label: 'Join'}}</code>).
 * Although not listed in the prop table, all `aria-*` props will be added to the button element if passed in.
 * If no `aria-*` props are passed in, <code>aria-live='polite'</code> is used for `icon` and `icon-filled` variants,
 * and <code>aria-live='assertive'</code> is used for the remaining variants.
 */
class ButtonStateful extends React.Component {
	constructor(props) {
		super(props);
		this.state = { active: false };

		checkProps(BUTTON_STATEFUL, props, componentDoc);
	}

	getClassName(active) {
		return classNames(this.props.className, 'slds-button', {
			'slds-button_neutral':
				this.props.variant !== 'icon' && this.props.variant !== 'icon-filled',
			'slds-button_inverse': this.props.variant === 'inverse',
			'slds-not-selected': !active,
			'slds-is-selected': active,
			'slds-max-small-button_stretch': this.props.responsive,
			'slds-button_icon-border': this.props.variant === 'icon',
			'slds-button_icon-border-filled': this.props.variant === 'icon-filled',
		});
	}

	handleBlur = (e) => {
		if (this.props.onBlur) this.props.onBlur(e);
		e.currentTarget.blur();
	};

	handleClick = (e) => {
		if (isFunction(this.props.onClick)) this.props.onClick(e);
		if (typeof this.props.active !== 'boolean') {
			this.setState((prevState) => ({ active: !prevState.active }));
		}
	};

	render() {
		const {
			active,
			disabled,
			icon,
			iconName,
			iconSize,
			id,
			onFocus,
			onKeyDown,
			onKeyPress,
			onKeyUp,
			onMouseDown,
			onMouseEnter,
			// onMouseLeave,  // This prop isn't used anywhere! But removing it would be a breaking change
			stateOne,
			stateTwo,
			stateThree,
			tabIndex,
			variant,
		} = this.props;

		const defaultIconProps = {
			disabled,
			size: 'small',
			className: 'slds-button__icon_stateful',
		};
		const iconAssistiveText =
			typeof this.props.assistiveText === 'string'
				? this.props.assistiveText
				: {
						...defaultProps.assistiveText,
						...this.props.assistiveText,
				  }.icon;

		const isActive = typeof active === 'boolean' ? active : this.state.active;

		// Accept aria-* props
		let ariaProps = getAriaProps(this.props);

		if (variant === 'icon' || variant === 'icon-filled') {
			// Default aria attribute for stateful button with icon, if none is specified
			if (Object.keys(ariaProps).length === 0) {
				ariaProps = { 'aria-live': 'polite' };
			}

			return (
				<button
					{...ariaProps}
					className={this.getClassName(isActive)}
					disabled={disabled}
					id={id}
					onBlur={this.handleBlur}
					onClick={this.handleClick}
					onFocus={onFocus}
					onKeyDown={onKeyDown}
					onKeyPress={onKeyPress}
					onKeyUp={onKeyUp}
					onMouseDown={onMouseDown}
					onMouseEnter={onMouseEnter}
					onMouseLeave={this.handleBlur}
					tabIndex={tabIndex}
					type="button"
				>
					{icon ? (
						React.cloneElement(icon, {
							...defaultIconProps,
							...icon.props,
						})
					) : (
						<ButtonIcon
							disabled={disabled}
							name={iconName}
							size={iconSize}
							className="slds-button__icon_stateful"
						/>
					)}
					{iconAssistiveText ? (
						<span className="slds-assistive-text">{iconAssistiveText}</span>
					) : null}
				</button>
			);
		}

		defaultIconProps.position = 'left';

		// Default aria attribute for stateful button, if none is specified
		if (Object.keys(ariaProps).length === 0) {
			ariaProps = { 'aria-live': 'assertive' };
		}

		return (
			<button
				{...ariaProps}
				className={this.getClassName(isActive)}
				disabled={disabled}
				id={id}
				onBlur={this.handleBlur}
				onClick={this.handleClick}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				onKeyPress={onKeyPress}
				onKeyUp={onKeyUp}
				onMouseEnter={onMouseEnter}
				onMouseLeave={this.handleBlur}
				tabIndex={tabIndex}
				type="button"
			>
				<span className="slds-text-not-selected">
					{stateOne.icon ? (
						React.cloneElement(stateOne.icon, {
							...defaultIconProps,
							...stateOne.icon.props,
							size: 'small',
						})
					) : (
						<ButtonIcon
							disabled={disabled}
							name={stateOne.iconName}
							size="small"
							position="left"
							className="slds-button__icon_stateful"
						/>
					)}
					{stateOne.label}
				</span>
				<span className="slds-text-selected">
					{stateTwo.icon ? (
						React.cloneElement(stateTwo.icon, {
							...defaultIconProps,
							...stateTwo.icon.props,
							size: 'small',
						})
					) : (
						<ButtonIcon
							disabled={disabled}
							name={stateTwo.iconName}
							size="small"
							position="left"
							className="slds-button__icon_stateful"
						/>
					)}
					{stateTwo.label}
				</span>
				<span className="slds-text-selected-focus">
					{stateThree.icon ? (
						React.cloneElement(stateThree.icon, {
							...defaultIconProps,
							...stateThree.icon.props,
							size: 'small',
						})
					) : (
						<ButtonIcon
							disabled={disabled}
							name={stateThree.iconName}
							size="small"
							position="left"
							className="slds-button__icon_stateful"
						/>
					)}
					{stateThree.label}
				</span>
			</button>
		);
	}
}

ButtonStateful.displayName = BUTTON_STATEFUL;
ButtonStateful.propTypes = propTypes;
ButtonStateful.defaultProps = defaultProps;

export default ButtonStateful;
