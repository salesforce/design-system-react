/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Button design pattern](https://lightningdesignsystem.com/components/buttons/) in React.
// Based on SLDS v2.2.1

import React from 'react';
import requiredIf from 'react-required-if';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonIcon from '../icon/button-icon';
import checkProps from './check-props';
import componentDoc from './docs.json';
import Tooltip from '../tooltip';

import getAriaProps from '../../utilities/get-aria-props';

import { BUTTON } from '../../utilities/constants';

const defaultProps = {
	assistiveText: { icon: '' },
	disabled: false,
	hint: false,
	iconSize: 'medium',
	responsive: false,
	type: 'button',
	variant: 'neutral',
};

/**
 * The Button component is the Lightning Design System Button component. The Button should be used for label buttons, icon buttons, or buttons that have both labels and icons.
 * Either a <code>label</code> or <code>assistiveText.icon</code> is required; see the Prop Details table below. For buttons that maintain selected/unselected states, use the <a href="#/button-stateful">ButtonStateful</a> component.
 * Although not listed in the prop table, all `aria-*` props will be added to the `button` element if passed in.
 */
class Button extends React.Component {
	static displayName = BUTTON;

	static propTypes = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
		 */
		assistiveText: PropTypes.shape({
			icon: PropTypes.string,
		}),

		/**
		 * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
		 */
		buttonRef: PropTypes.func,
		/**
		 * CSS classes to be added to button.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Disables the button and adds disabled styling.
		 */
		disabled: PropTypes.bool,
		/**
		 * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
		 */
		hint: PropTypes.bool,
		/**
		 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
		 */
		iconCategory: requiredIf(
			PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
			(props) => !!props.iconName
		),
		/**
		 * CSS classes to be added to icon.
		 */
		iconClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
		 */
		iconName: PropTypes.string,
		/**
		 * Path to the icon. This will override any global icon settings.
		 */
		iconPath: PropTypes.string,
		/**
		 * If omitted, icon position is centered.
		 */
		iconPosition: PropTypes.oneOf(['left', 'right']),
		/**
		 * Determines the size of the icon.
		 */
		iconSize: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
		 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
		 */
		iconVariant: PropTypes.oneOf([
			'bare',
			'container',
			'border',
			'border-filled',
			'more',
			'global-header',
		]),
		/**
		 * Id string applied to button node.
		 */
		id: PropTypes.string,
		/**
		 * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
		 */
		inverse: PropTypes.bool,
		/**
		 * Visible label on the button. If the button is an icon button with no label, you must use the <code>assistiveText.icon</code> prop.
		 */
		label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
		 * Triggered when a mouse arrow no longer hovers
		 */
		onMouseLeave: PropTypes.func,
		/**
		 * Triggered when a mouse button is released
		 */
		onMouseUp: PropTypes.func,
		/**
		 * If true, button scales to 100% width on small form factors.
		 */
		responsive: PropTypes.bool,
		/**
		 * Write <code>"-1"</code> if you don't want the user to tab to the button.
		 */
		tabIndex: PropTypes.string,
		/**
		 * Button type
		 */
		type: PropTypes.oneOf(['reset', 'submit', 'button']),
		/**
		 * HTML title attribute
		 */
		title: PropTypes.string,
		/**
		 * [Deprecated] Tooltip on button. Button should be a child of `Tooltip` instead.
		 */
		tooltip: PropTypes.node,
		/**
		 * Different types of buttons
		 */
		variant: PropTypes.oneOf([
			'base',
			'link',
			'neutral',
			'brand',
			'destructive',
			'success',
			'icon',
		]),
		/**
		 * Custom styles to be passed to the component
		 */
		style: PropTypes.object,
	};

	static defaultProps = defaultProps;

	componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(BUTTON, this.props, componentDoc);
	}

	getClassName = () => {
		const { variant, inverse, iconSize, className } = this.props;
		let { iconVariant } = this.props;
		const isIcon = variant === 'icon';

		const iconMore = iconVariant === 'more';
		const iconBorder = iconVariant === 'border';
		const iconGlobalHeader = iconVariant === 'global-header';

		const showButtonVariant =
			(variant !== 'base' && !iconVariant && !inverse && variant !== 'link') ||
			iconVariant === 'bare';
		const plainInverseBtn = inverse && !isIcon;
		const plainInverseIcon = inverse && isIcon && !iconMore && !iconBorder;
		const moreInverseIcon = inverse && iconMore;
		const borderInverseIcon = inverse && iconBorder;

		// After hijacking `iconVariant` to let `Button` know it's in the header, we reset to container style for the actual button CSS.
		if (iconVariant === 'global-header') {
			iconVariant = 'container';
		}

		return classNames(
			{
				'slds-button': variant !== 'link',
				[`slds-button_${variant}`]: showButtonVariant,
				'slds-button_inverse': plainInverseBtn,
				'slds-button_icon-inverse': plainInverseIcon || moreInverseIcon,
				'slds-button_icon-border-inverse': borderInverseIcon,
				[`slds-button_icon-${iconVariant}`]: iconVariant && !borderInverseIcon,
				'slds-global-header__button_icon': iconGlobalHeader,
				// If icon has a container, then we apply the icon size to the container not the svg. Icon size is medium by default, so we don't need to explicitly render it here.
				[`slds-button_icon-${iconSize}`]: iconVariant && iconSize !== 'medium',
				'slds-button_reset': variant === 'link',
				'slds-text-link': variant === 'link',
			},
			className
		);
	};

	handleClick = (event) => {
		const { onClick } = this.props;
		if (onClick) {
			onClick(event, {});
		}
	};

	renderIcon = (name) => {
		const {
			iconVariant,
			iconCategory,
			iconClassName,
			hint,
			inverse,
			iconPath,
			iconPosition,
		} = this.props;
		const iconSize =
			this.props.iconSize === '' || iconVariant ? null : this.props.iconSize;
		return (
			<ButtonIcon
				category={iconCategory || 'utility'} // BREAKING CHANGE we will introduce in 1.0. For the moment, set default prop here if none specified.
				className={classNames(
					{
						'slds-global-header__icon': iconVariant === 'global-header',
					},
					iconClassName
				)}
				hint={hint}
				inverse={inverse}
				name={name}
				path={iconPath}
				position={iconPosition}
				size={iconSize}
			/>
		);
	};

	renderLabel = () => {
		const { assistiveText, label } = this.props;
		const iconOnly = this.props.iconName || this.props.iconPath;
		const assistiveTextIcon =
			typeof assistiveText === 'string'
				? assistiveText
				: {
						...defaultProps.assistiveText,
						...assistiveText,
					}.icon;

		return iconOnly && assistiveTextIcon ? (
			<span className="slds-assistive-text">{assistiveTextIcon}</span>
		) : (
			label
		);
	};

	renderButton = () => {
		const ariaProps = getAriaProps(this.props);
		const {
			disabled,
			id,
			onBlur,
			onFocus,
			onKeyDown,
			onKeyPress,
			onKeyUp,
			onMouseUp,
			onMouseDown,
			onMouseEnter,
			onMouseLeave,
			buttonRef,
			tabIndex,
			title,
			type,
			style,
			iconPosition,
			iconName,
			iconPath,
			iconVariant,
			iconClassName,
			children,
		} = this.props;
		return (
			<button
				className={this.getClassName()}
				disabled={disabled}
				id={id}
				onBlur={onBlur}
				onClick={this.handleClick}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				onKeyPress={onKeyPress}
				onKeyUp={onKeyUp}
				onMouseDown={onMouseDown}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onMouseUp={onMouseUp}
				ref={(component) => {
					if (buttonRef) {
						buttonRef(component);
					}
				}}
				tabIndex={tabIndex}
				title={title}
				type={type}
				style={style}
				{...ariaProps}
			>
				{iconPosition === 'right' ? this.renderLabel() : null}

				{iconName || iconPath ? this.renderIcon(iconName) : null}
				{iconVariant === 'more' ? (
					<ButtonIcon
						category="utility"
						name="down"
						size="x-small"
						className={iconClassName}
					/>
				) : null}

				{iconPosition === 'left' || !iconPosition ? this.renderLabel() : null}
				{
					children // eslint-disable-line react/prop-types
				}
			</button>
		);
	};

	// This is present for backwards compatibility and should be removed at a future breaking change release. Please wrap a `Button` in a `PopoverTooltip` to achieve the same result. There will be an extra trigger `div` wrapping the `Button` though.
	renderTooltip = () => (
		<Tooltip content={this.props.tooltip}>{this.renderButton}</Tooltip>
	);

	render() {
		return this.props.tooltip ? this.renderTooltip() : this.renderButton();
	}
}

export default Button;
