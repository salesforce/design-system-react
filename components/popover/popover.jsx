/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Popver Component

// Implements the [Popover design pattern](https://www.lightningdesignsystem.com/components/popovers) in React.

// ### React
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

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

import KEYS from '../../utilities/KEYS';
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
			'right top',
			'right bottom',
			'bottom',
			'bottom left',
			'bottom right',
			'left',
			'left top',
			'left bottom'
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
		 * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
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
		 * Forces the popover to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use [](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
		 */
		isOpen: PropTypes.bool,
		/**
		 *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
		 */
		offset: PropTypes.string,
		/**
		 * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * Called when a key is pressed.
		 */
		onKeyDown: PropTypes.func,
		/**
		 * Called when mouse clicks down on the trigger button.
		 */
		onMouseDown: PropTypes.func,
		/**
		 * Triggered when the dropdown is opened.
		 */
		onOpen: PropTypes.func,
		/**
		 * Triggered when the dropdown is closed.
		 */
		onClose: PropTypes.func,
		/**
		 * An object of CSS styles that are applied to the `slds-popover` DOM element.
		 */
		style: PropTypes.object,
		/**
		 * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
		 */
		overlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
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
		return ReactDOM.findDOMNode(this.dialog);
	},

	handleClose (data) {
		const isOpen = this.getIsOpen();
		const componentWillUnmount = data && data.componentWillUnmount || false;

		if (isOpen) {
			if (currentOpenPopover === this) {
				currentOpenPopover = undefined;
			}

			this.setState({
				isOpen: false
			});

			this.isHover = false;

			if (this.props.onClose) {
				this.props.onClose({
					component: this,
					componentWillUnmount
				});
			}
		}
	},

	handleOpen () {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			if (currentOpenPopover && isFunction(currentOpenPopover.handleClose)) {
				currentOpenPopover.handleClose();
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

	handleClick (event) {
		const isOpen = this.getIsOpen();

		if (!isOpen) {
			this.handleOpen();
		} else {
			this.handleClose();
		}

		if (this.props.onClick) {
			this.props.onClick(event);
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
					toggleOpen: this.toggleOpen,
					trigger: this.trigger
				});
			}
			if (this.props.onKeyDown) {
				this.props.onKeyDown(event);
			}
		}
	},

	handleCancel () {
		this.handleClose();
	},

	handleClickOutside () {
		this.handleClose();
	},

	toggleOpen () {
		if (this.state.isOpen) {
			this.handleClose();
		} else {
			this.handleOpen();
		}
	},

	renderDialog (isOpen, outsideClickIgnoreClass) {
		const props = this.props;
		let offset = props.offset;
		const style = this.props.style || {};

		return (
			isOpen ?
				<Dialog
					align={props.align}
					contentsClassName={classNames(this.props.contentsClassName, 'ignore-react-onclickoutside')}
					constrainToScrollParent={props.constrainToScrollParent}
					flippable={!props.hasStaticAlignment}
					marginBottom={getMargin.bottom(props.align)}
					marginLeft={getMargin.left(props.align)}
					marginRight={getMargin.right(props.align)}
					marginTop={getMargin.top(props.align)}
					offset={offset}
					onClose={this.handleClose}
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
			ref: (component) => { this.trigger = component; },
			'aria-haspopup': true,
			'aria-expanded': this.getIsOpen(),
			className: classNames(outsideClickIgnoreClass),
			disabled: this.props.disabled,
			style: this.props.style,
			id: this.getId(),
			onBlur: this.props.onBlur,
			onClick:
				this.props.openOn === 'click'
				|| this.props.openOn === 'hybrid'
				? this.handleClick : this.props.onClick,
			onFocus: this.props.openOn === 'hover' ? this.handleFocus : null,
			onMouseDown: this.props.onMouseDown,
			onMouseEnter: (this.props.openOn === 'hover' || this.props.openOn === 'hybrid')
				? this.handleMouseEnter
				: null,
			onMouseLeave:
				this.props.openOn === 'hover'
				|| this.props.openOn === 'hybrid'
				? this.handleMouseLeave : null,
			tabIndex: this.props.children.props.tabIndex || '0'
		}) : null;

		this.renderOverlay(this.getIsOpen());

		const containerStyles = { display: 'inline' };
		return (
			<div
				style={containerStyles}
			>
				{clonedTrigger}
				{this.renderDialog(this.getIsOpen(), outsideClickIgnoreClass)}
			</div>
		);
	}
});

module.exports = Popover;
module.exports.PopoverNubbinPositions = PopoverNubbinPositions;
