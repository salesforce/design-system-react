/* eslint-disable max-lines */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Popover Component

// Implements the [Popover design pattern](https://www.lightningdesignsystem.com/components/popovers) in React.

// ### React
import React from 'react';

import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

import Button from '../button';
import MediaObject from '../media-object';
import Icon from '../icon';

// ### Children
import Dialog from '../utilities/dialog';

// #### KeyboardNavigable
import keyboardNavigableDialog from '../../utilities/keyboard-navigable-dialog';

import KEYS from '../../utilities/key-code';
import { POPOVER } from '../../utilities/constants';
import { IconSettingsContext } from '../icon-settings';

const documentDefined = typeof document !== 'undefined';

// The overlay is an optional way to allow the popover to close on outside
// clicks even when those clicks are over areas that wouldn't normally fire
// click or touch events (for example, iframes). A single overlay is shared
// between all popovers in the app.
const overlay = documentDefined
	? document.createElement('span')
	: { style: {} };
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.position = 'absolute';

let currentOpenPopover;

// FIXME - what is this exported for? Probably needs to be deprecated.
const PopoverNubbinPositions = [
	'top left',
	'top',
	'top right',
	'bottom left',
	'bottom',
	'bottom right',
];

const defaultProps = {
	align: 'right',
	assistiveText: {
		closeButton: 'Close dialog',
	},
	hasNoCloseButton: false,
	hasNoNubbin: false,
	hoverCloseDelay: 300,
	openOn: 'click',
	position: 'absolute',
	variant: 'base',
};

/**
 * The Popover component is a non-modal dialog. It should be paired with a clickable trigger such as a `Button`. It traps focus from the page and must be exited if focus needs to be outside the Popover. Use a `Tooltip` if there are no call to actions within the dialog. A `Tooltip` does not need to be clicked. Multiple popovers open at the same time, each with focus trap is not supported.
 */
class Popover extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = POPOVER;

	// ### Prop Types
	static propTypes = {
		/**
		 * Aligns the popover with the respective side of the trigger. That is `top` will place the `Popover` above the trigger.
		 */
		align: PropTypes.oneOf([
			'top',
			'top left',
			'top right',
			'right',
			'right top',
			'right bottom',
			'bottom',
			'bottom left',
			'bottom right',
			'left',
			'left top',
			'left bottom',
		]),
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `closeButton`: This is a visually hidden label for the close button.
		 */
		assistiveText: PropTypes.shape({
			closeButton: PropTypes.string,
		}),
		/**
		 * HTML `id` of heading for popover. Only use if your header is within your popover body.
		 */
		ariaLabelledby: PropTypes.string,
		/**
		 * Multiple children of any kind are allowed, but the first child must serve as the trigger component. Many props will be passed into this trigger related to popover interactions. The trigger needs to be a clickable element, such as a `Button` or an anchor tag (`a`).
		 */
		children: PropTypes.node.isRequired,
		/**
		 * The contents of the popover. This should also accept arrays.
		 */
		body: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
		/**
		 * CSS classes to be added to the popover footer. That is the element with `.slds-popover__body` on it.
		 */
		classNameBody: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * CSS classes to be added to the popover footer. That is the element with `.slds-popover__footer` on it.
		 */
		classNameFooter: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * This prop is passed onto the triggering `Button`. Prevent popover from opening. Also applies disabled styling to trigger button.
		 */
		disabled: PropTypes.bool,
		/**
		 * A footer is an optional. Buttons are often placed here.
		 */
		footer: PropTypes.node,
		/**
		 * An object of CSS styles that are applied to the `slds-popover__footer` DOM element.
		 */
		footerStyle: PropTypes.object,
		/**
		 * Used with `walkthrough` variant to provide action buttons (ex: "Next" / "Skip" / etc) for a walkthrough popover footer. Accepts either a single node or array of nodes for multiple buttons.
		 */
		footerWalkthroughActions: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.arrayOf(PropTypes.node),
		]),
		/**
		 * Determines if the popover has a close button or not. Default is `false`
		 */
		hasNoCloseButton: PropTypes.bool,
		/**
		 * Determines if the popover has a nubbin or not. Default is `false`
		 */
		hasNoNubbin: PropTypes.bool,
		/**
		 * Prevents the Popover from changing position based on the viewport/window. If set to true your popover can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the popover contents scrollable to fit the menu on the screen. When enabled, `position` `absolute` is used.
		 */
		hasStaticAlignment: PropTypes.bool,
		/**
		 * Removes `display:inline-block` from the trigger button.
		 */
		hasNoTriggerStyles: PropTypes.bool,
		/**
		 * All popovers require a heading that labels the popover for assistive technology users. This text will be placed within a heading HTML tag, or in an h2 within the popover body if used with `variant="walkthrough-action"`. A heading is **highly recommended for accessibility reasons.** Please see `ariaLabelledby` prop.
		 */
		heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		/**
		 * Icon displayed in the `feature` variant
		 */
		icon: PropTypes.node,
		/**
		 * By default, a unique ID will be created at render to support keyboard navigation, ARIA roles, and connect the popover to the triggering button. This ID will be applied to the triggering element. `${id}-popover`, `${id}-dialog-heading`, `${id}-dialog-body` are also created.
		 */
		id: PropTypes.string,
		/**
		 * Forces the popover to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use [](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) You will want this if Popover is to be a controlled component.
		 */
		isOpen: PropTypes.bool,
		/**
		 * This function is passed onto the triggering `Button`. Triggered when the trigger button is clicked. You will want this if Popover is to be a controlled component.
		 */
		onClick: PropTypes.func,
		/**
		 * This function is triggered when the dialog is closed. This occurs when the Dialog child component (that is the actual popover) is unmounted and removed from the DOM. This function returns `{event, { trigger, componentWillUnmount }`. Trigger can have the values `cancel`, `clickOutside`, or `newPopover`.
		 */
		onClose: PropTypes.func,
		/**
		 * Called when a key is pressed.
		 */
		onKeyDown: PropTypes.func,
		/**
		 * Called when mouse clicks down on the trigger button.
		 */
		onMouseDown: PropTypes.func,
		/**
		 * This function is triggered when the Dialog child component (that is the actual popover) is mounted and added to the DOM. The parameters are `event, { portal: }`. `portal` can be used as a React tree root node.
		 */
		onOpen: PropTypes.func,
		/**
		 * This function is triggered when the user clicks outside the Popover or clicks the close button. You will want to define this if Popover is to be a controlled component. Most of the time you will want to set `isOpen` to `false` when this is triggered unless you need to validate something.
		 */
		onRequestClose: PropTypes.func,
		/**
		 * Callback that returns an element or React `ref` to align the Popover with. If the target element has not been rendered yet, the popover will use the triggering element as the attachment target instead. NOTE: `position="relative"` is not compatible with custom targets that are not the triggering element.
		 */
		onRequestTargetElement: PropTypes.func,
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing. NOTE: this setting is not compatible with custom targets outside the trigger
		 */
		position: PropTypes.oneOf([
			'absolute',
			'overflowBoundaryElement',
			'relative',
		]),
		/**
		 * Used with `walkthrough` variant to provide the step text (ex: "Step 1 of 4") for a walkthrough popover footer. If used with `variant="walkthrough-action"`, it will be placed in the popover body.
		 */
		stepText: PropTypes.string,
		/**
		 * An object of CSS styles that are applied to the `slds-popover` DOM element.
		 */
		style: PropTypes.object,
		/**
		 * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
		 */
		overlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
		/**
		 * CSS classes to be added to wrapping trigger `div` around the button.
		 */
		triggerClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Determines the type of the popover. `error` and `warning` allows the  content body to scroll. Default is `base` _Tested with snaphots._
		 */
		variant: PropTypes.oneOf([
			'base',
			'error',
			'feature',
			'walkthrough',
			'walkthrough-action',
			'warning',
		]),
	};

	static defaultProps = defaultProps;

	state = {
		isOpen: false,
	};

	constructor(props) {
		super(props);

		this.generatedId = shortid.generate();
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(POPOVER, props, componentDoc);
	}

	componentWillUnmount() {
		if (currentOpenPopover === this) {
			currentOpenPopover = undefined;
		}
		this.isUnmounting = true;
		this.renderOverlay(false);
	}

	getId = () => this.props.id || this.generatedId;

	getIsOpen = () =>
		!this.props.disabled &&
		!!(typeof this.props.isOpen === 'boolean'
			? this.props.isOpen
			: this.state.isOpen);

	getMenu = () =>
		// needed by keyboard navigation
		this.dialog;

	getTargetElement = () =>
		this.props.onRequestTargetElement && this.props.onRequestTargetElement()
			? this.props.onRequestTargetElement()
			: this.trigger;

	setMenuRef = (component) => {
		this.dialog = component;
	};

	setContainerRef = (component) => {
		this.trigger = component;
		// yes, this is a re-render triggered by a render.
		// Dialog/Popper.js cannot place the popover until
		// the trigger/target DOM node is mounted. This
		// way `findDOMNode` is not called and parent
		// DOM nodes are not queried.
		if (!this.state.inputRendered) {
			this.setState({ inputRendered: true });
		}
	};

	handleDialogClose = (event, data) => {
		const componentWillUnmount = (data && data.componentWillUnmount) || false;

		if (currentOpenPopover === this) {
			currentOpenPopover = undefined;
		}

		if (this.props.onClose) {
			this.props.onClose(event, {
				// Breaking change: component object reference has been
				// removed (`this`), due to endless loop creation.
				componentWillUnmount,
			});
		}
	};

	handleClose = (event, data) => {
		const isOpen = this.getIsOpen();

		if (isOpen) {
			// call even if closed
			if (this.props.onRequestClose) {
				this.props.onRequestClose(event, data);
			}

			if (currentOpenPopover === this) {
				currentOpenPopover = undefined;
			}

			this.setState({
				isOpen: false,
			});

			this.isHover = false;
		}
	};

	handleOpen = () => {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			if (currentOpenPopover && isFunction(currentOpenPopover.handleClose)) {
				currentOpenPopover.handleClose(undefined, {
					trigger: 'newPopover',
					id: currentOpenPopover.getId(),
				});
			}

			currentOpenPopover = this;

			this.setState({
				isOpen: true,
			});
		}
	};

	/* props.openOn is not a part of prop-types because it is not a supported feature, but may be needed for backwards compatibility with non-accessible dropdown/popover hybrids. */

	/* eslint-disable react/prop-types */
	handleMouseEnter = (event) => {
		const isOpen = this.getIsOpen();

		this.isHover = true;

		if (!isOpen && this.props.openOn === 'hover') {
			this.handleOpen();
		} else {
			// we want this clear when openOn is hover or hybrid
			clearTimeout(this.isClosing);
		}

		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(event);
		}
	};

	handleMouseLeave = (event) => {
		const isOpen = this.getIsOpen();

		if (isOpen) {
			this.isClosing = setTimeout(() => {
				this.handleClose();
			}, this.props.hoverCloseDelay);
		}

		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(event);
		}
	};

	/* eslint-enable react/prop-types */

	handleClick = (event, { triggerOnClickCallback }) => {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			this.handleOpen();
		} else {
			this.handleClose();
		}

		if (this.props.onClick) {
			this.props.onClick(event);
		}

		if (triggerOnClickCallback) {
			triggerOnClickCallback(event);
		}
	};

	handleFocus = (event) => {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			this.handleOpen();
		}

		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	};

	handleKeyDown = (event) => {
		if (event.keyCode) {
			if (event.keyCode !== KEYS.TAB) {
				const isOpen = this.getIsOpen();

				keyboardNavigableDialog({
					event,
					isOpen,
					handleClick: this.handleClick,
					key: event.key,
					keyCode: event.keyCode,
					targetTarget: event.target,
					toggleOpen: this.toggleOpenFromKeyboard,
					trigger: this.trigger,
				});
			}
			if (this.props.onKeyDown) {
				this.props.onKeyDown(event);
			}
		}
	};

	handleCancel = (event) => {
		this.handleClose(event, { trigger: 'cancel' });
	};

	handleClickOutside = (event) => {
		this.handleClose(event, { trigger: 'clickOutside' });
	};

	toggleOpenFromKeyboard = (event) => {
		const isOpen = this.getIsOpen();
		if (isOpen) {
			this.handleCancel(event);
		} else {
			this.handleOpen();
		}
	};

	renderDialog = (isOpen, outsideClickIgnoreClass) => {
		const { props } = this;
		const { offset } = props;
		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};
		const closeButtonAssistiveText =
			props.closeButtonAssistiveText || assistiveText.closeButton;

		// HEADER SUB-RENDERS
		const hasThemedHeader =
			this.props.variant === 'error' || this.props.variant === 'warning';
		const hasDefinedHeader = this.props.heading || hasThemedHeader;
		const headerIcon = {
			error: <Icon category="utility" name="error" size="x-small" inverse />,
			warning: (
				<Icon category="utility" name="warning" size="x-small" inverse />
			),
		};
		const headerVariants = {
			base: (
				<header
					className={classNames('slds-popover__header', {
						'slds-p-vertical_medium': props.variant === 'walkthrough',
					})}
				>
					<h2
						id={this.props.ariaLabelledby || `${this.getId()}-dialog-heading`}
						className={classNames({
							'slds-text-heading_small': props.variant !== 'walkthrough',
							'slds-text-heading_medium': props.variant === 'walkthrough',
						})}
					>
						{this.props.heading}
					</h2>
				</header>
			),
			themed: (
				<header className="slds-popover__header">
					<MediaObject
						body={
							<h2
								id={
									this.props.ariaLabelledby || `${this.getId()}-dialog-heading`
								}
								className="slds-truncate slds-text-heading_medium"
								title={props.heading}
							>
								{props.heading}
							</h2>
						}
						figure={headerIcon[this.props.variant]}
						verticalCenter
					/>
				</header>
			),
		};
		let header = null;

		if (
			hasDefinedHeader &&
			props.variant !== 'walkthrough-action' &&
			props.variant !== 'feature'
		) {
			header = headerVariants[hasThemedHeader ? 'themed' : 'base'];
		}

		// BODY SUB-RENDERS
		let body = null;

		if (props.variant === 'error' || props.variant === 'warning') {
			body = (
				<div
					id={`${this.getId()}-dialog-body`}
					className={classNames('slds-popover__body', this.props.classNameBody)}
				>
					{props.body}
				</div>
			);
		} else if (
			props.variant === 'walkthrough-action' ||
			props.variant === 'feature'
		) {
			body = (
				<div
					className={classNames('slds-popover__body', this.props.classNameBody)}
					id={`${this.getId()}-dialog-body`}
				>
					<div className="slds-media">
						<div className="slds-media__figure">
							{props.variant === 'walkthrough-action' ? (
								<Icon
									category="utility"
									name="touch_action"
									size="small"
									inverse
								/>
							) : (
								this.props.icon
							)}
						</div>
						<div className="slds-media__body">
							{props.heading ? (
								<h2
									id={
										this.props.ariaLabelledby ||
										`${this.getId()}-dialog-heading`
									}
									className="slds-text-heading_small"
								>
									{props.heading}
								</h2>
							) : null}
							{props.body}
							{props.stepText ? (
								<p className="slds-m-top_medium slds-text-title">
									{props.stepText}
								</p>
							) : null}
						</div>
					</div>
				</div>
			);
		} else {
			body = (
				// DEFAULT - NOT SCROLLABLE
				<div
					id={`${this.getId()}-dialog-body`}
					className={classNames('slds-popover__body', this.props.classNameBody)}
				>
					{props.body}
				</div>
			);
		}

		// FOOTER SUB-RENDERS
		let footer = null;

		if (props.footer) {
			footer = (
				<footer
					className={classNames(
						'slds-popover__footer',
						this.props.classNameFooter,
						this.props.footerClassName
					)}
					style={this.props.footerStyle}
				>
					{this.props.footer}
				</footer>
			);
		} else if (
			props.variant !== 'walkthrough-action' &&
			(props.footerWalkthroughActions || props.stepText)
		) {
			footer = (
				<footer className="slds-popover__footer">
					<div className="slds-grid slds-grid_vertical-align-center">
						{props.stepText ? (
							<span className="slds-text-title">{props.stepText}</span>
						) : null}
						{props.footerWalkthroughActions ? (
							<div
								className="slds-col_bump-left"
								style={{ display: 'inline-block' }}
							>
								{props.footerWalkthroughActions}
							</div>
						) : null}
					</div>
				</footer>
			);
		}

		// MAIN RENDER
		return isOpen ? (
			<Dialog
				hasNubbin={!this.props.hasNoNubbin}
				align={props.align}
				contentsClassName={classNames(
					this.props.contentsClassName,
					'ignore-react-onclickoutside',
					'slds-popover',
					{ 'slds-popover_error': props.variant === 'error' },
					{
						'slds-popover_walkthrough':
							props.variant === 'walkthrough' ||
							props.variant === 'walkthrough-action' ||
							props.variant === 'feature',
					},
					{
						'slds-popover_walkthrough-alt':
							props.variant === 'walkthrough-action',
					},
					{ 'slds-popover_feature': props.variant === 'feature' },
					{ 'slds-popover_warning': props.variant === 'warning' },
					props.className
				)}
				context={this.context}
				hasStaticAlignment={props.hasStaticAlignment}
				offset={offset}
				onCancel={this.handleClose}
				onClose={this.handleDialogClose}
				onOpen={this.props.onOpen}
				onKeyDown={this.handleKeyDown}
				onMouseEnter={props.openOn === 'hover' ? this.handleMouseEnter : null}
				onMouseLeave={props.openOn === 'hover' ? this.handleMouseLeave : null}
				outsideClickIgnoreClass={outsideClickIgnoreClass}
				onRequestTargetElement={() => this.getTargetElement()}
				position={this.props.position}
				style={this.props.style}
				variant="popover"
				ref={this.setMenuRef}
				containerProps={{
					id: `${this.getId()}-popover`,
					'aria-labelledby':
						this.props.ariaLabelledby || `${this.getId()}-dialog-heading`,
					'aria-describedby': `${this.getId()}-dialog-body`,
				}}
			>
				{!this.props.hasNoCloseButton && (
					<Button
						assistiveText={{ icon: closeButtonAssistiveText }}
						iconCategory="utility"
						iconName="close"
						className={classNames(
							'slds-button slds-button_icon-small slds-float_right slds-popover__close slds-button_icon',
							{
								'slds-button_icon-inverse':
									props.variant === 'walkthrough' ||
									props.variant === 'walkthrough-action' ||
									props.variant === 'feature',
							}
						)}
						onClick={this.handleCancel}
						variant="icon"
						inverse={
							this.props.variant === 'error' || this.props.variant === 'warning'
						}
					/>
				)}
				{header}
				{body}
				{footer}
			</Dialog>
		) : null;
	};

	renderOverlay = (isOpen) => {
		if (isFunction(overlay) && documentDefined) {
			overlay(isOpen, overlay);
		} else if (
			this.props.overlay &&
			isOpen &&
			!this.overlay &&
			documentDefined
		) {
			this.overlay = overlay;
			document.querySelector('body').appendChild(this.overlay);
		} else if (!isOpen && this.overlay && this.overlay.parentNode) {
			this.overlay.parentNode.removeChild(this.overlay);
			this.overlay = undefined;
		}
	};

	render() {
		const otherChildren = [];
		const outsideClickIgnoreClass = `ignore-click-${this.getId()}`;
		let clonedTrigger = null;

		React.Children.forEach(this.props.children, (child, index) => {
			if (index === 0) {
				clonedTrigger = React.cloneElement(child, {
					'aria-haspopup': 'dialog',
					id: this.getId(),
					onClick:
						this.props.openOn === 'click' || this.props.openOn === 'hybrid'
							? (event) => {
									this.handleClick(event, {
										triggerOnClickCallback: child.props.onClick,
									});
							  }
							: child.props.onClick,
					onFocus: this.props.openOn === 'hover' ? this.handleFocus : null,
					onMouseDown: this.props.onMouseDown,
					onMouseEnter:
						this.props.openOn === 'hover' || this.props.openOn === 'hybrid'
							? this.handleMouseEnter
							: null,
					onMouseLeave:
						this.props.openOn === 'hover' || this.props.openOn === 'hybrid'
							? this.handleMouseLeave
							: null,
					tabIndex: child.props.tabIndex || '0',
					...child.props,
				});
			} else {
				// eslint-disable-next-line fp/no-mutating-methods
				otherChildren.push(child);
			}
		});

		this.renderOverlay(this.getIsOpen());
		const containerStyles = {
			display: this.props.hasNoTriggerStyles ? undefined : 'inline-block',
		};
		return (
			<div
				className={this.props.triggerClassName}
				style={containerStyles}
				ref={this.setContainerRef}
			>
				{clonedTrigger}
				{otherChildren.length > 0 ? otherChildren : null}
				{this.renderDialog(this.getIsOpen(), outsideClickIgnoreClass)}
			</div>
		);
	}
}

Popover.contextType = IconSettingsContext;
export default Popover;
export { PopoverNubbinPositions };
