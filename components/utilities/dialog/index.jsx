/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// Dialog
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
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

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';
import DOMElementFocus from '../../../utilities/dom-element-focus';

import { DIALOG } from '../../../utilities/constants';

// #### Dialog doesn't pass down <IconSettings> context so repassing it here.
import IconSettings from '../../iconSettings';

/* Dialog creates a new top-level React tree and injects its child into it. This is necessary for proper styling (especially positioning). A dialog is a non-modal container that separates content from the rest of the web application. This library uses the Drop library (https://github.com/HubSpot/drop which is based on TetherJS) to absolutely position and align content to another item on the page. This component is not meant for external consumption or part of the published component API.
*/
const Dialog = createReactClass({

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
		 */
		children: PropTypes.node,
		/**
		 * Closes dialog when tab key is pressed
		 */
		closeOnTabKey: PropTypes.bool,
		/**
		 * If true, the dialog is constrained to the scrolling parent and may be flipped up instead of down. This is helpful for use within modals.
		 */
		constrainToScrollParent: PropTypes.bool,
		/**
		 * Positions the dialog horizontally.
		 */
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
		 */
		variant: PropTypes.oneOf(['dropdown', 'popover', 'tooltip']),
		/**
		 * Positions the dialog vertically.
		 */
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
		if (!this.state.isOpen) {
			return <span />;
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
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<div
				className={classNames(this.props.contentsClassName, this.props.outsideClickIgnoreClass)}
				style={style}
				onKeyDown={this.handleKeyDown}
				onMouseEnter={this.props.onMouseEnter}
				onMouseLeave={this.props.onMouseLeave}
				ref={(component) => { this.dialogContent = component; }}
			>
				<IconSettings iconPath={this.props.context.iconPath}>
					{/* eslint-enable jsx-a11y/no-static-element-interactions */}
					{this.props.children}
				</IconSettings>
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
		return this.props.targetElement ? ReactDOM.findDOMNode(this.props.targetElement) : ReactDOM.findDOMNode(this).parentNode; // eslint-disable-line react/no-find-dom-node
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

		this.handleClose(undefined, { componentWillUnmount: true });
	},

	render () {
		// Must use `<noscript></noscript>` in order for `this.drop` to not be undefined when unmounting
		return <noscript />;
	}
});

module.exports = onClickOutside(Dialog);
