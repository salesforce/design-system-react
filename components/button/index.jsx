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
import componentDoc from './component.json';
// eslint-disable-next-line import/no-cycle
import Tooltip from '../tooltip';

import getAriaProps from '../../utilities/get-aria-props';
import getDataProps from '../../utilities/get-data-props';
import getFormProps from '../../utilities/get-form-props';

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
 * Although not listed in the prop table, all `aria-*`, `data-*` and `form*` props will be added to the `button` element if passed in.
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
			'brand',
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
		 * Triggered to indicate that this component should receive focus.
		 */
		onRequestFocus: PropTypes.func,
		/**
		 * If true, will trigger `onRequestFocus`.
		 */
		requestFocus: PropTypes.bool,
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
			'outline-brand',
			'destructive',
			'success',
			'text-destructive',
			'icon',
		]),
		/**
		 * Custom styles to be passed to the component
		 */
		style: PropTypes.object,
	};

	static defaultProps = defaultProps;

	constructor(props) {
		super(props);

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(BUTTON, props, componentDoc);
	}

	getClassName = () => {
		const isIcon = this.props.variant === 'icon';

		let { iconVariant } = this.props;
		const iconMore = iconVariant === 'more';
		const iconBorder = iconVariant === 'border';
		const iconGlobalHeader = iconVariant === 'global-header';

		const showButtonVariant =
			(this.props.variant !== 'base' &&
				!iconVariant &&
				!this.props.inverse &&
				this.props.variant !== 'link') ||
			iconVariant === 'bare';
		const plainInverseBtn = this.props.inverse && !isIcon;
		const plainInverseIcon =
			this.props.inverse && isIcon && !iconMore && !iconBorder;
		const moreInverseIcon = this.props.inverse && iconMore;
		const borderInverseIcon = this.props.inverse && iconBorder;

		// After hijacking `iconVariant` to let `Button` know it's in the header, we reset to container style for the actual button CSS.
		if (iconVariant === 'global-header') {
			iconVariant = 'container';
		}

		return classNames(
			{
				'slds-button': this.props.variant !== 'link',
				[`slds-button_${this.props.variant}`]: showButtonVariant,
				'slds-button_inverse': plainInverseBtn,
				'slds-button_icon-inverse': plainInverseIcon || moreInverseIcon,
				'slds-button_icon-border-inverse': borderInverseIcon,
				[`slds-button_icon-${iconVariant}`]: iconVariant && !borderInverseIcon,
				'slds-global-header__button_icon': iconGlobalHeader,
				// If icon has a container, then we apply the icon size to the container not the svg. Icon size is medium by default, so we don't need to explicitly render it here.
				[`slds-button_icon-${this.props.iconSize}`]:
					iconVariant && this.props.iconSize !== 'medium',
				'slds-button_reset': this.props.variant === 'link',
				'slds-text-link': this.props.variant === 'link',
			},
			this.props.className
		);
	};

	handleClick = (event) => {
		if (this.props.onClick) {
			this.props.onClick(event, {});
		}
	};

	renderIcon = (name) => {
		const iconSize =
			!this.props.iconSize || this.props.iconVariant
				? null
				: this.props.iconSize;
		return (
			<ButtonIcon
				category={this.props.iconCategory || 'utility'} // BREAKING CHANGE we will introduce in 1.0. For the moment, set default prop here if none specified.
				className={classNames(
					{
						'slds-global-header__icon':
							this.props.iconVariant === 'global-header',
					},
					this.props.iconClassName
				)}
				hint={this.props.hint}
				inverse={this.props.inverse}
				name={name}
				path={this.props.iconPath}
				position={this.props.iconPosition}
				size={iconSize}
			/>
		);
	};

	renderLabel = () => {
		const iconOnly = this.props.iconName || this.props.iconPath;
		const assistiveTextIcon =
			typeof this.props.assistiveText === 'string'
				? this.props.assistiveText
				: {
						...defaultProps.assistiveText,
						...this.props.assistiveText,
				  }.icon;

		return iconOnly && assistiveTextIcon ? (
			<span className="slds-assistive-text">{assistiveTextIcon}</span>
		) : (
			this.props.label
		);
	};

	renderButton = () => {
		const ariaProps = getAriaProps(this.props);
		const dataProps = getDataProps(this.props);
		const formProps = getFormProps(this.props);

		return (
			// eslint-disable-next-line react/button-has-type
			<button
				className={this.getClassName()}
				disabled={this.props.disabled}
				id={this.props.id}
				onBlur={this.props.onBlur}
				onClick={this.handleClick}
				onFocus={this.props.onFocus}
				onKeyDown={this.props.onKeyDown}
				onKeyPress={this.props.onKeyPress}
				onKeyUp={this.props.onKeyUp}
				onMouseDown={this.props.onMouseDown}
				onMouseEnter={this.props.onMouseEnter}
				onMouseLeave={this.props.onMouseLeave}
				onMouseUp={this.props.onMouseUp}
				ref={(component) => {
					if (this.props.buttonRef) {
						this.props.buttonRef(component);
					}
					if (
						component &&
						this.props.requestFocus &&
						this.props.onRequestFocus
					) {
						this.props.onRequestFocus(component);
					}
				}}
				tabIndex={this.props.tabIndex}
				title={this.props.title}
				// eslint-disable-next-line react/button-has-type
				type={this.props.type || 'button'}
				style={this.props.style}
				{...ariaProps}
				{...dataProps}
				{...formProps}
			>
				{this.props.iconPosition === 'right' ? this.renderLabel() : null}

				{this.props.iconName || this.props.iconPath
					? this.renderIcon(this.props.iconName)
					: null}
				{this.props.iconVariant === 'more' ? (
					<ButtonIcon
						category="utility"
						name="down"
						size="x-small"
						className={this.props.iconClassName}
					/>
				) : null}

				{this.props.iconPosition === 'left' || !this.props.iconPosition
					? this.renderLabel()
					: null}
				{
					this.props.children // eslint-disable-line react/prop-types
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
