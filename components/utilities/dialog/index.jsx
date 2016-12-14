/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Dialog
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the element itself
import onClickOutside from 'react-onclickoutside';

import TetherDrop from 'tether-drop';

import EventUtil from '../../../utilities/EventUtil';
import KEYS from '../../../utilities/KEYS';
import DOMElementFocus from '../../../utilities/dom-element-focus';

import { DIALOG } from '../../../utilities/constants';

/* A dialog is a non-modal container that separates content from the rest of the web application. This library uses the Drop library (https://github.com/HubSpot/drop which is based on TetherJS) to absolutely position and align content to another item on the page. This component is not meant for external consumption or part of the published component API.
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
		 * Called when dialog opens (that is mounts).
		 */
		onOpen: PropTypes.func,
		/**
		 * Triggered when an item in the menu is clicked.
		 */
		outsideClickIgnoreClass: PropTypes.string,
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
		this.dialogElement = document.createElement('span');
		document.querySelector('body').appendChild(this.dialogElement);
	},

	componentDidMount () {
		this.renderDialog();
	},

	componentDidUpdate () {
		this.renderDialog();
	},

	handleClickOutside () {
		this.handleClose();
	},

	handleClose (data) {
		if (this.props.onClose) {
			this.props.onClose(data);
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
				this.handleClose();
			}
		}

		if (this.props.onKeyDown) {
			this.props.onKeyDown(event);
		}
	},

	renderDialogContents () {
		if (!this.state.isOpen) {
			return <span></span>;
		}

		let style = {
			transform: 'none',
			WebkitTransform: 'none',
			marginTop: this.props.marginTop,
			marginBottom: this.props.marginBottom,
			marginLeft: this.props.marginLeft,
			marginRight: this.props.marginRight,
			float: 'inherit',
			position: 'inherit'
		};

		if (this.props.inheritTargetWidth) {
			style.width = this.target().getBoundingClientRect().width;
		}
		if (this.props.style) {
			style = Object.assign({}, style, this.props.style);
		}

		return (
			<div
				className={classNames(this.props.contentsClassName, this.props.outsideClickIgnoreClass)}
				style={style}
				onKeyDown={this.handleKeyDown}
				onMouseEnter={this.props.onMouseEnter}
				onMouseLeave={this.props.onMouseLeave}
				ref={(component) => { this.dialogContent = component; }}
			>
				{this.props.children}
			</div>
		);
	},

	getHorizontalAlign (align) {
		if (align.indexOf('left') > -1) {
			return 'left';
		} else if (align.indexOf('right') > -1) {
			return 'right';
		}
		return 'center';
	},

	getVerticalAlign (align) {
		if (align.indexOf('bottom') > -1) {
			return 'bottom';
		} else if (align.indexOf('top') > -1) {
			return 'top';
		}
		return 'middle';
	},

	isHorizontalAlign (align) {
		return (
			align === 'left' ||
			align === 'right' ||
			align === 'center'
		);
	},

	isVerticalAlign (align) {
		return (
			align === 'bottom' ||
			align === 'top' ||
			align === 'middle'
		);
	},

	getPosition () {
		if (this.props.align) {
			let align = [];
			if (this.props.align) {
				const splits = this.props.align.split(' ');
				if (this.isHorizontalAlign(splits[0])) {
					const verticalAlign = splits.length > 1 ? this.getVerticalAlign(splits[1]) : this.getVerticalAlign('');
					align = [
						this.getHorizontalAlign(splits[0]),
						verticalAlign
					];
				} else {
					const horizontalAlign = splits.length > 1 ? this.getHorizontalAlign(splits[1]) : this.getHorizontalAlign('');
					align = [
						this.getVerticalAlign(splits[0]),
						horizontalAlign
					];
				}
			}

			return align.join(' ');
		}

		const positions = [];
		if (this.props.verticalAlign === 'top' || this.props.verticalAlign === 'bottom') {
			positions.push(this.props.verticalAlign);
			positions.push(this.props.horizontalAlign);
		} else {
			positions.push(this.props.horizontalAlign);
			positions.push(this.props.verticalAlign);
		}

		return positions.join(' ');
	},

	target () {
		return this.props.targetElement ? ReactDOM.findDOMNode(this.props.targetElement) : ReactDOM.findDOMNode(this).parentNode;
	},

	tetherDropOptions () {
		// Please reference http://github.hubspot.com/drop/ for options.
		const position = this.getPosition();

		return {
			beforeClose: this.beforeClose,
			constrainToWindow: this.props.flippable,
			constrainToScrollParent: this.props.constrainToScrollParent,
			content: this.dialogElement,
			openOn: 'always',
			position,
			remove: true,
			target: this.target(),
			tetherOptions: {
				offset: this.props.offset
			}
		};
	},

	handleOpen () {
		this.setState({ isOpen: true });

		if (this.props.variant === 'popover') {
			DOMElementFocus.storeActiveElement();
			DOMElementFocus.setupScopedFocus({ ancestorElement: ReactDOM.findDOMNode(this.dialogElement).querySelector('.slds-popover') });
			// Don't steal focus from inner elements
			if (!DOMElementFocus.hasOrAncestorHasFocus()) {
				DOMElementFocus.focusAncestor();
			}
		}

		if (this.props.onOpen) {
			this.props.onOpen(this.portal);
		}
	},

	renderDialog () {
		let mount = ReactDOM.render;

		if (this.props.portalMount) {
			mount = this.props.portalMount;
		}

		// nextElement, container, callback
		this.portal = mount(this.renderDialogContents(), this.dialogElement);

		if (this.dialogElement &&
				this.dialogElement.parentNode &&
				this.dialogElement.parentNode.parentNode &&
				this.dialogElement.parentNode.parentNode.className &&
				this.dialogElement.parentNode.parentNode.className.indexOf('drop ') > -1) {
			this.dialogElement.parentNode.parentNode.style.zIndex = 10001;
		}

		if (this.drop !== null && this.drop !== undefined) {
			if (this.drop && this.drop) {
				this.drop.position();
			}
		} else if (window && document) {
			this.drop = new TetherDrop(this.tetherDropOptions());
			this.drop.once('open', this.handleOpen);
		}
	},

	componentWillUnmount () {
		if (this.props.variant === 'popover') {
			DOMElementFocus.teardownScopedFocus();
			DOMElementFocus.returnFocusToStoredElement();
		}

		this.drop.destroy();
		ReactDOM.unmountComponentAtNode(this.dialogElement);

		if (this.dialogElement.parentNode) {
			this.dialogElement.parentNode.removeChild(this.dialogElement);
		}

		this.handleClose({ componentWillUnmount: true });
	},

	render () {
		// Must use `<noscript></noscript>` in order for `this.drop` to not be undefined when unmounting
		return <noscript></noscript>;
	}
});

module.exports = onClickOutside(Dialog);
