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

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### isBoolean
import isBoolean from 'lodash.isboolean';

// ### isFunction
import isFunction from 'lodash.isfunction';

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
 * The Popover component is a non-modal dialogs.
 */
const Popover = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: POPOVER,

	// ### Prop Types
	propTypes: {
		/**
		 * Aligns the menu with the respective side of the trigger. That is `top` will place the `Popover` above the trigger.
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
		 * The trigger of the component. This must be a single node. Many props will be passed into this trigger related to popover interactions.
		 */
		children: PropTypes.node,
		/**
		 * The contents of the popover. This should also accept arrays.
		 */
		content: PropTypes.node,
		/**
		 * CSS classes to be added to the popover.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * These class names will be added to the absolutely-positioned `Dialog` component which is a DOM container for the SLDS Popover.
		 */
		containerClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
		 */
		disabled: PropTypes.bool,
		/* Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen.
		*/
		hasStaticAlignment: PropTypes.bool,
		heading: PropTypes.oneOfType([PropTypes.string]),
		/**
		 * Delay on menu closing in milliseconds.
		 */
		hoverCloseDelay: PropTypes.number,
		/**
		* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
		*/
		id: PropTypes.string,
		/**
		 * Forces the popover to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use [](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
		 */
		isOpen: PropTypes.bool,
		/**
		 * Style applied to the absolutely-positioned `Dialog` component which is a DOM container for the SLDS Popover.
		 */
		containerStyle: PropTypes.object,
		/**
		 * Renders menu within an absolutely positioned container at an elevated z-index.
		 */
		modal: PropTypes.bool,
		/**
		 *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
		 */
		offset: PropTypes.string,
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
		return !!(isBoolean(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);
	},

	getMenu () {
		// needed by keyboard navigation
		return ReactDOM.findDOMNode(this.dialog);
	},

	handleClose () {
		const isOpen = this.getIsOpen();

		if (isOpen) {
			if (currentOpenPopover === this) {
				currentOpenPopover = undefined;
			}

			this.setState({
				isOpen: false
			});

			this.isHover = false;

			if (this.props.onClose) {
				this.props.onClose();
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

			if (this.props.onOpen) {
				this.props.onOpen();
			}
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
		let offset = this.props.offset;

		return (
			isOpen ?
				<Dialog
					align={this.props.align}
					className={classNames(this.props.containerClassName)}
					constrainToScrollParent={this.props.constrainToScrollParent}
					flippable={!this.props.hasStaticAlignment}
					initialFocus={this.dialog}
					marginBottom="0px"
					marginLeft="0px"
					marginRight="0px"
					marginTop="0px"
					offset={offset}
					onClose={this.handleClose}
					onKeyDown={this.handleKeyDown}
					onMouseEnter={(this.props.openOn === 'hover') ? this.handleMouseEnter : null}
					onMouseLeave={(this.props.openOn === 'hover') ? this.handleMouseLeave : null}
					outsideClickIgnoreClass={outsideClickIgnoreClass}
					targetElement={this.triggerContainer}
					variant="popover"
				>
					<div
						aria-labelledby={`${this.generatedId}-dialog-heading`}
						aria-describedby={`${this.generatedId}-dialog-body`}
						className={classNames(
							'slds-popover',
							getNubbinClassName(this.props.align),
							this.props.className,
						)}
						role="dialog"
						style={Object.assign({ outline: '0' }, this.props.style)}
						tabIndex="0"
						ref={(component) => { this.dialog = component; }}
					>
						<Button
							assistiveText="Close dialog"
							iconName="close"
							iconSize="small"
							className="slds-float--right slds-popover__close"
							onClick={this.handleCancel}
							variant="icon"
						/>
						<header
							className="slds-popover__header"
						>
							<h2 id={`${this.generatedId}-dialog-heading`} className="slds-text-heading--small">{this.props.heading}</h2>
						</header>
						<div
							id={`${this.generatedId}-dialog-body`}
							className="slds-popover__body"
						>
							{this.props.content}
						</div>
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
		const isOpen = this.props.isOpen === undefined ? !this.props.disabled && this.state && this.state.isOpen && !!this.trigger : this.props.isOpen;

		const clonedTrigger = React.cloneElement(this.props.children, {
			tabIndex: this.props.children.props.tabIndex || '0',
			ref: (component) => { this.trigger = component; },
			['aria-haspopup']: 'true',
			className: classNames(outsideClickIgnoreClass),
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
				? this.handleMouseLeave : null
		});

		this.renderOverlay(isOpen);

		const containerStyles = { display: 'inline' };
		return (
			<div
				style={containerStyles}
			>
				{clonedTrigger}
				{this.renderDialog(isOpen, outsideClickIgnoreClass)}
			</div>
		);
	}
});

module.exports = Popover;
module.exports.PopoverNubbinPositions = PopoverNubbinPositions;
