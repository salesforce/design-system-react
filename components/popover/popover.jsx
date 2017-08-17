/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// # Popver Component

// Implements the [Popover design pattern](https://www.lightningdesignsystem.com/components/popovers) in React.

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### assign
import assign from 'lodash.assign';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### isBoolean
import isBoolean from 'lodash.isboolean';

// ### isFunction
import isFunction from 'lodash.isfunction';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import Button from '../button';

// ### Children
import Dialog from '../utilities/dialog';

// ### Traits
import { getMargin, getNubbinClassName } from '../../utilities/dialog-helpers';

// #### KeyboardNavigable
import keyboardNavigableDialog from '../../utilities/keyboard-navigable-dialog';

import KEYS from '../../utilities/key-code';
import { POPOVER } from '../../utilities/constants';

// The overlay is an optional way to allow the popover to close on outside
// clicks even when those clicks are over areas that wouldn't normally fire
// click or touch events (for example, iframes). A single overlay is shared
// between all popovers in the app.
const overlay = document.createElement('span');
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.position = 'absolute';

let currentOpenPopover;

const PopoverNubbinPositions = [
	'top left',
	'top',
	'top right',
	'bottom left',
	'bottom',
	'bottom right'
];

/**
 * The Popover component is a non-modal dialog. It should be paired with a clickable trigger such as a `Button`. It traps focus from the page and must be exited if focus needs to be outside the Popover. Use a `Tooltip` if there are no call to actions within the dialog. A `Tooltip` does not need to be clicked.
 */
const Popover = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: POPOVER,

	// ### Prop Types
	propTypes: {
		/**
		 * Aligns the popover with the respective side of the trigger. That is `top` will place the `Popover` above the trigger.
		 */
		align: PropTypes.oneOf([
			'top',
			'top left',
			'top right',
			'right',
			'bottom',
			'bottom left',
			'bottom right',
			'left'
		]),
		/**
		 * HTML `id` of heading for popover. Only use if your header is within your popover body.
		 */
		ariaLabelledby: PropTypes.string,
		/**
		 * The trigger of the component. This must be a **single node**. Many props will be passed into this trigger related to popover interactions. The child needs to be a clickable element, such as a `Button` or an anchor tag (`a`).
		 */
		children: PropTypes.node.isRequired,
		/**
		 * The contents of the popover. This should also accept arrays.
		 */
		body: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
		/**
		 * CSS classes to be added to the popover. That is the element with `.slds-popover` on it.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/*
		 * All popovers require a close button.
		*/
		closeButtonAssistiveText: PropTypes.oneOfType([PropTypes.string]),
		/**
		 * This prop is passed onto the triggering `Button`. Prevent popover from opening. Also applies disabled styling to trigger button.
		 */
		disabled: PropTypes.bool,
		/*
		 * A footer is an optional. Buttons are often placed here.
		*/
		footer: PropTypes.node,
		/* Prevents the Popover from changing position based on the viewport/window. If set to true your popover can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the popover contents scrollable to fit the menu on the screen.
		*/
		hasStaticAlignment: PropTypes.bool,
		/*
		 * All popovers require a heading that labels the popover for assistive technology users. This text will be placed within a heading HTML tag. A heading is **highly recommended for accessibility reasons.** Please see `ariaLabelledby` prop.
		*/
		heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		/**
		* By default, a unique ID will be created at render to support keyboard navigation, ARIA roles, and connect the popover to the triggering button. This ID will be applied to the triggering element. `${id}-popover`, `${id}-dialog-heading`, `${id}-dialog-body` are also created.
		*/
		id: PropTypes.string,
		/**
		 * Forces the popover to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use [](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) You will want this if Popover is to be a controlled component.
		 */
		isOpen: PropTypes.bool,
		/**
		 *  Offset adds pixels to the absolutely positioned dialog in the format: ([vertical]px [horizontal]px).
		 */
		offset: PropTypes.string,
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
		 * This function is triggered when the user clicks outside the Popover or clicks the close button. You will want to define this if Popover is to be a controlled component. Most of the time you will want wnat to set `isOpen` to `false` when this is triggered unless you need to validate something.
		 */
		onRequestClose: PropTypes.func,
		/**
		 * Absolutely positioned DOM nodes, such as a popover dialog, may need their own React DOM tree root. They may need their alignment "flipped" if extended beyond the window or outside the bounds of an overflow-hidden scrolling modal. This library's portal mounts are added as a child node of `body`. This prop will be triggered instead of the default `ReactDOM.mount()` when this dialog is mounted. This prop is useful for testing and simliar to a "callback ref." Two arguments,`reactElement` and `domContainerNode` are passed in. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
		 *
		 * ```
		 * <Popover
				isOpen
				portalMount={(reactElement, domContainerNode) => {
					portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
				}}
				onOpen={() => {
					expect(portalWrapper.find(`#my-heading`)).to.exist;
					done();
				}}
			/>
			```
		 */
		portalMount: PropTypes.func,
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
		triggerClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])
	},

	getDefaultProps () {
		return {
			align: 'right',
			closeButtonAssistiveText: 'Close dialog',
			hoverCloseDelay: 300,
			openOn: 'click'
		};
	},

	getInitialState () {
		return {
			isOpen: false
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(POPOVER, this.props);
	},

	componentWillUnmount () {
		if (currentOpenPopover === this) {
			currentOpenPopover = undefined;
		}
		this.isUnmounting = true;
		this.renderOverlay(false);
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getIsOpen () {
		return !this.props.disabled && !!(isBoolean(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);
	},

	getMenu () {
		// needed by keyboard navigation
		return this.dialog;
	},

	handleDialogClose (event, data) {
		const componentWillUnmount = (data && data.componentWillUnmount) || false;

		if (currentOpenPopover === this) {
			currentOpenPopover = undefined;
		}

		if (this.props.onClose) {
			this.props.onClose(event, {
				component: this,
				componentWillUnmount
			});
		}
	},

	handleClose (event, data) {
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
				isOpen: false
			});

			this.isHover = false;
		}
	},

	handleOpen () {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			if (currentOpenPopover && isFunction(currentOpenPopover.handleClose)) {
				currentOpenPopover.handleClose(undefined, { trigger: 'newPopover', id: currentOpenPopover.getId() });
			}

			currentOpenPopover = this;

			this.setState({
				isOpen: true
			});
		}
	},

	/* props.openOn is not a part of prop-types because it is not a supported feature, but may be needed for backwards compatibility with non-accessible dropdown/popover hybrids. */

	/* eslint-disable react/prop-types */
	handleMouseEnter (event) {
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
	},

	handleMouseLeave (event) {
		const isOpen = this.getIsOpen();

		if (isOpen) {
			this.isClosing = setTimeout(() => {
				this.handleClose();
			}, this.props.hoverCloseDelay);
		}

		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(event);
		}
	},
	/* eslint-enable react/prop-types */

	handleClick (event, { triggerOnClickCallback }) {
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
	},

	handleFocus (event) {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			this.handleOpen();
		}

		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	},

	handleKeyDown (event) {
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
					trigger: this.trigger
				});
			}
			if (this.props.onKeyDown) {
				this.props.onKeyDown(event);
			}
		}
	},

	handleCancel (event) {
		this.handleClose(event, { trigger: 'cancel' });
	},

	handleClickOutside (event) {
		this.handleClose(event, { trigger: 'clickOutside' });
	},

	toggleOpenFromKeyboard (event) {
		const isOpen = this.getIsOpen();
		if (isOpen) {
			this.handleCancel(event);
		} else {
			this.handleOpen();
		}
	},

	renderDialog (isOpen, outsideClickIgnoreClass) {
		const props = this.props;
		const offset = props.offset;
		const style = this.props.style || {};

		return (
			isOpen ?
				<Dialog
					align={props.align}
					contentsClassName={classNames(this.props.contentsClassName, 'ignore-react-onclickoutside')}
					constrainToScrollParent={props.constrainToScrollParent}
					context={this.context}
					flippable={!props.hasStaticAlignment}
					marginBottom={getMargin.bottom(props.align)}
					marginLeft={getMargin.left(props.align)}
					marginRight={getMargin.right(props.align)}
					marginTop={getMargin.top(props.align)}
					offset={offset}
					onCancel={this.handleClose}
					onClose={this.handleDialogClose}
					onOpen={this.props.onOpen}
					onKeyDown={this.handleKeyDown}
					onMouseEnter={(props.openOn === 'hover') ? this.handleMouseEnter : null}
					onMouseLeave={(props.openOn === 'hover') ? this.handleMouseLeave : null}
					outsideClickIgnoreClass={outsideClickIgnoreClass}
					portalMount={this.props.portalMount}
					variant="popover"
				>
					<div
						aria-labelledby={this.props.ariaLabelledby ? this.props.ariaLabelledby : `${this.getId()}-dialog-heading`}
						aria-describedby={`${this.getId()}-dialog-body`}
						className={classNames(
						'slds-popover',
						getNubbinClassName(props.align),
						props.className,
						)}
						id={`${this.getId()}-popover`}
						role="dialog"
						style={assign({ outline: '0' }, style)}
						tabIndex="-1"
						ref={(component) => { this.dialog = component; }}
					>
						<Button
							assistiveText={props.closeButtonAssistiveText}
							iconName="close"
							iconSize="small"
							className="slds-float--right slds-popover__close"
							onClick={this.handleCancel}
							variant="icon"
						/>
						{this.props.heading
							? <header
								className="slds-popover__header"
							>
								<h2 id={`${this.getId()}-dialog-heading`} className="slds-text-heading--small">{this.props.heading}</h2>
							</header>
							: null}
						<div
							id={`${this.getId()}-dialog-body`}
							className="slds-popover__body"
						>
							{props.body}
						</div>
						{this.props.footer
							? <footer className="slds-popover__footer">
								{this.props.footer}
							</footer>
							: null}
					</div>
				</Dialog> : null
		);
	},

	renderOverlay (isOpen) {
		if (isFunction(overlay)) {
			overlay(isOpen, overlay);
		} else if (this.props.overlay && isOpen && !this.overlay) {
			this.overlay = overlay;
			document.querySelector('body').appendChild(this.overlay);
		} else if (!isOpen && this.overlay && this.overlay.parentNode) {
			this.overlay.parentNode.removeChild(this.overlay);
			this.overlay = undefined;
		}
	},

	render () {
		const outsideClickIgnoreClass = `ignore-click-${this.getId()}`;

		const clonedTrigger = this.props.children ? React.cloneElement(this.props.children, {
			id: this.getId(),
			onClick:
				this.props.openOn === 'click'
				|| this.props.openOn === 'hybrid'
				? (event) => { this.handleClick(event, { triggerOnClickCallback: this.props.children.props.onClick }); } : this.children.props.onClick,
			onFocus: this.props.openOn === 'hover' ? this.handleFocus : null,
			onMouseDown: this.props.onMouseDown,
			onMouseEnter: (this.props.openOn === 'hover' || this.props.openOn === 'hybrid')
				? this.handleMouseEnter
				: null,
			onMouseLeave:
				this.props.openOn === 'hover'
				|| this.props.openOn === 'hybrid'
				? this.handleMouseLeave : null,
			tabIndex: this.props.children.props.tabIndex || '0',
			...this.props.children.props
		}) : null;

		this.renderOverlay(this.getIsOpen());

		const containerStyles = { display: 'inline' };
		return (
			<div
				className={this.props.triggerClassName}
				style={containerStyles}
			>
				{clonedTrigger}
				{this.renderDialog(this.getIsOpen(), outsideClickIgnoreClass)}
			</div>
		);
	}
});

Popover.contextTypes = {
	iconPath: PropTypes.string
};

module.exports = Popover;
module.exports.PopoverNubbinPositions = PopoverNubbinPositions;
