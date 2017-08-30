/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// Dialog
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Popper from 'popper.js';
import isEqual from 'lodash.isequal';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the element itself
import onClickOutside from 'react-onclickoutside';

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';
import DOMElementFocus from '../../../utilities/dom-element-focus';

import { DIALOG } from '../../../utilities/constants';

// Translates the prop into a string pooper can use
function mapPropToPopperPlacement (propString) {
	let placement;
	switch (propString) {
		case 'top left':
			placement = 'top-start';
			break;
		case 'top right':
			placement = 'top-end';
			break;
		case 'right top':
			placement = 'right-start';
			break;
		case 'right bottom':
			placement = 'right-end';
			break;
		case 'bottom left':
			placement = 'bottom-start';
			break;
		case 'bottom right':
			placement = 'bottom-end';
			break;
		case 'left top':
			placement = 'left-start';
			break;
		case 'left bottom':
			placement = 'left-end';
			break;
		default:
			placement = propString;
	}
	return placement;
}

/* Dialog creates a new top-level React tree and injects its child into it. This is necessary for proper styling (especially positioning). A dialog is a non-modal container that separates content from the rest of the web application. This library uses the Drop library (https://github.com/HubSpot/drop which is based on TetherJS) to absolutely position and align content to another item on the page. This component is not meant for external consumption or part of the published component API.
*/
const Dialog = React.createClass({

	displayName: DIALOG,

	propTypes: {
		/**
		 * Aligns the right or left side of the dialog with the respective side of the target.
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
		 * CSS classes to be added to the absolutely positioned element.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string]
		),
		/**
		 * CSS classes to be added to the wrapping `div` of the contents of the dialog.
		 */
		contentsClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string]
		),
		/**
		 * Contents of dialog
		**/
		children: PropTypes.node,
		/**
		 * Closes dialog when tab key is pressed
		**/
		closeOnTabKey: PropTypes.bool,
		/**
		 * If true, the dialog is constrained to the scrolling parent and may be flipped up instead of down. This is helpful for use within modals.
		 */
		constrainToScrollParent: PropTypes.bool,
		/**
		 * Positions the dialog horizontally.
		**/
		horizontalAlign: PropTypes.oneOf([
			'left',
			'right',
			'center'
		]),
		/**
		 * Sets the dialog width to the width of the target.
		 */
		inheritTargetWidth: PropTypes.bool,
		/**
		 * If true, the dialog is constrained to the window and may be flipped up instead of down.
		 */
		flippable: PropTypes.bool,
		/**
		 * Top margin offset of dialog from target.
		 */
		marginTop: PropTypes.string,
		/**
		 * Bottom margin offset of dialog from target.
		 */
		marginBottom: PropTypes.string,
		/**
		 * Left margin offset of dialog from target.
		 */
		marginLeft: PropTypes.string,
		/**
		 * Right margin offset of dialog from target.
		 */
		marginRight: PropTypes.string,
		/**
		 *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
		 */
		offset: PropTypes.string,
		/**
		 * Called when dialog closes (that is unmounts).
		 */
		onClose: PropTypes.func,
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
		 * Called when dialog opens (that is mounts). The parameters are `undefined, { portal: this.portal }`.
		 */
		onOpen: PropTypes.func,
		/**
		 * Triggered when an item in the menu is clicked.
		 */
		outsideClickIgnoreClass: PropTypes.string,
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
		 * An object of CSS styles that are applied to the immediate parent `div` of the contents.
		 */
		style: PropTypes.object,
		/**
		 * React component to be aligned with. This will be passed to `ReactDOM.findDOMNode()` if set and should be set from a component reference (`ref`).
		 */
		targetElement: PropTypes.object,
		/**
		 * Informs the component on how to handle focus. Popovers trap focus and must be exited to regain focus.
		**/
		variant: PropTypes.oneOf(['dropdown', 'popover', 'tooltip']),
		/**
		 * Positions the dialog vertically.
		**/
		verticalAlign: PropTypes.oneOf(['bottom', 'middle', 'top'])
	},

	getDefaultProps () {
		return {
			align: 'bottom left',
			verticalAlign: 'bottom',
			horizontalAlign: 'left',
			closeOnTabKey: false,
			flippable: true,
			marginTop: '0.20rem',
			marginBottom: '0.35rem',
			marginLeft: '0px',
			marginRight: '0px',
			offset: '0px 0px',
			outsideClickIgnoreClass: 'ignore-react-onclickoutside',
			constrainToScrollParent: false,
			inheritTargetWidth: false
		};
	},

	getInitialState () {
		return {
			isOpen: false
		};
	},

	componentWillMount () {
	},

	componentDidMount () {
		/* Instantiate a _popper instance here */
		this._createPopper();
	},

	componentDidUpdate () {
		/* Schedule an update to _popper here */
		/* Do something else from popper here maybe? */
	},

	componentWillUnmount () {
		this._destroyPopper();
	},

	_createPopper () {
		const reference = this.target();
		const popper = this.dialogContent;
		const placement = mapPropToPopperPlacement(this.props.align);
		const eventsEnabled = true; // Lets popper listen to events (resize, scroll, etc.)
		const modifiers = {
			applyStyle: { enabled: false },
			preventOverflow: { enabled: false },
			flip: { enabled: false },
			updateState: {
				enabled: true,
				order: 900,
				fn: data => {
					if (
						(this.state.data && !isEqual(data.offsets, this.state.data.offsets)) ||
						!this.state.data
					) {
						this.setState({ data });
					}
					return data;
				}
			}
			// arrow property can also point to an element
		};
		if (!reference || !popper) {
			console.error('Target node not found!', reference);
			console.error('Popper node not found!', popper);
		}
		this._popper = new Popper(reference, popper, {
			placement,
			eventsEnabled,
			modifiers
		});
		this._popper.scheduleUpdate();
	},

	_getPopperStyles () {
		const { data } = this.state;
		if (!this._popper || !data) {
			return {
				position: 'absolute',
				pointerEvents: 'none'
			};
		}

		const { position } = data.offsets.popper;
		const left = `${data.offsets.popper.left}px`;
		const top = `${data.offsets.popper.top}px`;
		return { ...data.style, left, top, position };
	},

	_destroyPopper () {
		if (this._popper) this._popper.destroy();
	},

	handleClickOutside () {
		this.handleClose();
	},

	handleClose (event, data) {
		if (this.props.onClose) {
			this.props.onClose(event, data);
		}
	},

	handleClick (event) {
		if (event.nativeEvent) {
			event.nativeEvent.preventDefault();
			event.nativeEvent.stopPropagation();
		}
	},

	handleKeyDown (event) {
		if (event.keyCode === KEYS.TAB) {
			if (this.props.closeOnTabKey) {
				EventUtil.trap(event);
				this.handleClose(event);
			}
		}

		if (this.props.onKeyDown) {
			this.props.onKeyDown(event);
		}
	},

	renderDialogContents () {
		let style = Object.assign(this._getPopperStyles(), {
			marginTop: this.props.marginTop,
			marginBottom: this.props.marginBottom,
			marginLeft: this.props.marginLeft,
			marginRight: this.props.marginRight
		});

		if (this.props.inheritTargetWidth) {
			style.width = this.target().getBoundingClientRect().width;
		}
		if (this.props.style) {
			style = Object.assign({}, style, this.props.style);
		}

		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<div
				className={classNames(this.props.contentsClassName, this.props.outsideClickIgnoreClass)}
				style={style}
				onKeyDown={this.handleKeyDown}
				onMouseEnter={this.props.onMouseEnter}
				onMouseLeave={this.props.onMouseLeave}
				ref={(component) => { this.dialogContent = component; }}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				{this.props.children}
			</div>
		);
	},

	target () {
		return this.props.targetElement ? ReactDOM.findDOMNode(this.props.targetElement) : ReactDOM.findDOMNode(this).parentNode; // eslint-disable-line react/no-find-dom-node
	},

	handleOpen () {
		this.setState({ isOpen: true });

		if (this.props.variant === 'popover') {
			DOMElementFocus.storeActiveElement();
			DOMElementFocus.setupScopedFocus({ ancestorElement: ReactDOM.findDOMNode(this.dialogElement).querySelector('.slds-popover') }); // eslint-disable-line react/no-find-dom-node
			// Don't steal focus from inner elements
			if (!DOMElementFocus.hasOrAncestorHasFocus()) {
				DOMElementFocus.focusAncestor();
			}
		}

		if (this.props.onOpen) {
			this.props.onOpen(undefined, { portal: this.portal });
		}
	},

	renderDialog () {
		// By default ReactDOM is used to create a portal mount on the `body` tag. This can be overridden with the `portalMount` prop.
		// let mount = ReactDOM.render;

		if (this.props.portalMount) {
			mount = this.props.portalMount;
		}

		// nextElement, container, callback
		// this.portal = mount(this.renderDialogContents(), this.dialogElement);
		return this.renderDialogContents();

		// This used to set the zindex of the dialog element to 10001

		/* Probably position stuff using popper here? */
	},

	// componentWillUnmount () {
	// 	if (this.props.variant === 'popover') {
	// 		DOMElementFocus.teardownScopedFocus();
	// 		DOMElementFocus.returnFocusToStoredElement();
	// 	}

	// 	this.handleClose(undefined, { componentWillUnmount: true });
	// },

	render () {
		// Must use `<noscript></noscript>` in order for `this.drop` to not be undefined when unmounting
		return this.renderDialog();
	}
});

module.exports = onClickOutside(Dialog);
