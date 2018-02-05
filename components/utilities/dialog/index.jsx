/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

import Popper from 'popper.js';
import isEqual from 'lodash.isequal';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

import Portal from './portal';
import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';
import DOMElementFocus from '../../../utilities/dom-element-focus';
import { mapPropToPopperPlacement } from '../../../utilities/dialog-helpers';

import { DIALOG } from '../../../utilities/constants';

// #### Dialog doesn't pass down <IconSettings> context so repassing it here.
import IconSettings from '../../icon-settings';

/*
 * A Dialog is content that is separate from the typical flow of a page. It typically overlays other elements in the document flow. This is achieved with elevation (`z-index`) and one of the following: relative position, absolute position, or a new top-level React render tree (portal). A boundary element is a scrolling ancestor element or the edge of the browser (window/viewport). This element typically has an overflow (overflow-y/overflow-x) style that is scroll, hidden, or auto. Inverted placement is the flipping of the overlay element from top to bottom or left to right in order stay within a boundary element.
 *
 * * Dropdown menu (Combobox, DatePicker, et al.) placement is typically bottom-aligned and should be allowed to invert its placement when inside a boundary element this often happens within a modal. Dropdowns should not overflow boundary elements , since most boundary elements scroll vertically and have space for the menu.
 *
 * * If they are hidden, left and right placed overlay elements (such as Popover and Tooltip) should be placed within a portal element attached to the DOM <body>, but styled to align to its target/trigger. Since scrolling typically occurs on the vertical axis, this allows them to overflow boundary elements and still allow scrolling of content, yet still invert placement for the browser viewport. Portal elements are only necessary if an original ancestor boundary element exists. **No portals are created by default.**
 *
 * * Nubbins/arrows should be repositioned for any new placement/alignment.
 *
 * Allow Overflowing of Boundary Element: Allow applications to create a portal element attached to the DOM <body> to be outside of boundary elements if manual testing shows confusing alignment/poor usability/readability. This should be exception and not the default.
 *
 * Allow Inverted placement: Allow applications to prevent inverted placement if manual testing shows confusing alignment/poor usability/readability.
 *
 * ### How this new Dialog component works
 * * There is no longer an inline render within components. All overlays should go through `Dialog`. `position: relative` just passes on the markup with some additional event listeners. No positional library is used.
 * * The default `position: absolute` will run through three renders. It will first render the overlay at `0px/0px` offset of its parent. It will then store the target DOM node, once the DOM node is set, a state change will occur and tell a PopperJS instance to be created on update, once it is created, a third render is done to update the styles created by PopperJS.
 * * `position: overflowBoundaryElement` will do the same three renders as `absolute` except that the initial render will create a disconnected render tree (portal) on the `body`. Then, the position will change once the target is stored. The portal itself will be rendered multiple times. The first will result in `onOpen` executing. Each update will result in a re-render of the disconnected render-tree.
 *
 * This component is private.
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
			'left bottom',
		]),
		/**
		 * CSS classes to be added to the absolutely positioned element.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * CSS classes to be added to the wrapping `div` of the contents of the dialog.
		 */
		contentsClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Contents of dialog
		 */
		children: PropTypes.node.isRequired,
		/**
		 * Closes dialog when tab key is pressed
		 */
		closeOnTabKey: PropTypes.bool,
		/**
		 * Props passed along to wrapping div. This allows one less wrapping `div` to be in the markup. dialog children are expected to be wrapper in a single `div`.
		 */
		containerProps: PropTypes.object,
		/**
		 * Sets the dialog width to the width of the target. Menus attached to `input` typically follow this UX pattern.
		 */
		inheritTargetWidth: PropTypes.bool,
		/**
		 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. This is the opposite of "flippable."
		 */
		hasStaticAlignment: PropTypes.bool,
		/**
		 *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px). SHOULD BE OBJECT -----------
		 */
		offset: PropTypes.string,
		/**
		 * Called when dialog closes and unmounts.
		 */
		onClose: PropTypes.func,
		/**
		 * Called when a key pressed.
		 */
		onKeyDown: PropTypes.func,
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
		 * React component to be aligned with. Function should return a DOM `ref` from the parent component.
		 */
		onRequestTargetElement: PropTypes.func.isRequired,
		/**
		 * Triggered when an item in the menu is clicked.
		 */
		outsideClickIgnoreClass: PropTypes.string,
		/**
		 * If a dialog is `positione="overflowBoundaryElement"`, it will be rendered in a portal or separate render tree. This `portalMount` callback will be triggered instead of the the default `ReactDOM.unstable_renderSubtreeIntoContainer` and the function will mount the portal itself. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
		 *
		 * ```
		 * <Popover
		 *   isOpen
		 *   portalMount={({ instance, reactElement, domContainerNode }) => {
		 *     portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
		 *   }}
		 *   onOpen={() => {
		 *     expect(portalWrapper.find(`#my-heading`)).to.exist;
		 *     done();
		 *   }}
		 *   />
		 * ```
		 */
		portalMount: PropTypes.func,
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		position: PropTypes.oneOf([
			'absolute',
			'overflowBoundaryElement',
			'relative',
		]).isRequired,
		/**
		 * An object of CSS styles that are applied to the immediate parent `div` of the contents. Use this instead of margin props.
		 */
		style: PropTypes.object,
		/**
		 * Sets which focus UX pattern to follow. For instance, popovers trap focus and must be exited to regain focus. Dropdowns and Tooltips never have focus.
		 */
		variant: PropTypes.oneOf(['dropdown', 'popover', 'tooltip']),
	},

	getDefaultProps () {
		return {
			align: 'bottom left',
			offset: '0px 0px',
			outsideClickIgnoreClass: 'ignore-react-onclickoutside',
		};
	},

	getInitialState () {
		return {
			triggerPopperJS: false,
			isOpen: false,
		};
	},

	componentDidMount () {
		if (
			this.props.position === 'absolute' ||
			this.props.position === 'relative'
		) {
			this.handleOpen();
		}
	},

	componentDidUpdate (prevProps, prevState) {
		if (
			this.state.triggerPopperJS === true &&
			prevState.triggerPopperJS === false &&
			(this.props.position === 'absolute' ||
				this.props.position === 'overflowBoundaryElement') &&
			this.dialogContent &&
			this.props.onRequestTargetElement()
		) {
			this.createPopper();
		}
	},

	componentWillUnmount () {
		if (this.props.variant === 'popover') {
			DOMElementFocus.teardownScopedFocus();
			DOMElementFocus.returnFocusToStoredElement();
		}

		if (
			this.props.position === 'absolute' ||
			this.props.position === 'overflowBoundaryElement'
		) {
			this.destroyPopper();
		}

		this.handleClose(undefined, { componentWillUnmount: true });
	},

	getPropOffsetsInPixels (offsetString) {
		const offsetArray = offsetString.split(' ');
		return {
			vertical: parseInt(offsetArray[0], 10),
			horizontal: parseInt(offsetArray[1], 10),
		};
	},

	getPopperStyles () {
		const { popperData } = this.state;
		if (!this.popper || !popperData) {
			return {
				position: 'absolute',
				pointerEvents: 'none',
			};
		}

		const propOffsets = this.getPropOffsetsInPixels(this.props.offset);
		const { position } = popperData.offsets.popper;
		const left = `${popperData.offsets.popper.left + propOffsets.horizontal}px`;
		const top = `${popperData.offsets.popper.top + propOffsets.vertical}px`;
		return { ...popperData.style, left, top, position };
	},

	// Render
	setDialogContent (component) {
		this.dialogContent = component;
		if (!this.state.triggerPopperJS) {
			this.setState({ triggerPopperJS: true });
		}
	},

	/**
	 * Events
	 */
	handleClickOutside () {
		this.handleClose();
	},

	handleClose (event, data) {
		this.setState({ triggerPopperJS: true });
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

	handleOpen () {
		const scopedElement = this.dialogContent;

		if (this.props.variant === 'popover' && scopedElement) {
			DOMElementFocus.storeActiveElement();
			DOMElementFocus.setupScopedFocus({
				ancestorElement: scopedElement.querySelector('.slds-popover'),
			}); // eslint-disable-line react/no-find-dom-node
			// Don't steal focus from inner elements
			if (!DOMElementFocus.hasOrAncestorHasFocus()) {
				DOMElementFocus.focusAncestor();
			}
		}

		if (this.props.onOpen) {
			this.props.onOpen(undefined, { portal: this.dialogContent });
		}
	},

	/**
	 * Popper API and helper functions
	 */

	createPopper () {
		const reference = this.props.onRequestTargetElement(); // eslint-disable-line react/no-find-dom-node
		const popper = this.dialogContent;
		const placement = mapPropToPopperPlacement(this.props.align);
		const eventsEnabled = true; // Lets popper listen to events (resize, scroll, etc.)
		const modifiers = {
			applyStyle: { enabled: false },
			// moves dialog in order to not extend a boundary element such as a scrolling parent or a window/viewpoint.
			preventOverflow: {
				enabled: true,
				boundariesElement:
					this.props.position === 'absolute' ? 'scrollParent' : 'viewport',
			},
			// By default, dialogs will flip their alignment if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint
			removeOnDestroy: true,
			updateState: {
				enabled: true,
				order: 900,
				fn: (popperData) => {
					if (
						(this.state.popperData &&
							!isEqual(popperData.offsets, this.state.popperData.offsets)) ||
						!this.state.popperData
					) {
						this.setState({ popperData });
					}
					return popperData;
				},
			},
			// arrow property can also point to an element
		};
		if (!reference) {
			console.error('Target node not found!', reference); // eslint-disable-line no-console
		}
		if (!popper) {
			console.error('Popper node not found!', popper); // eslint-disable-line no-console
		}
		this.popper = new Popper(reference, popper, {
			placement,
			eventsEnabled,
			modifiers,
		});

		this.popper.scheduleUpdate();
	},

	destroyPopper () {
		if (this.popper) {
			this.popper.destroy();
		}
	},

	render () {
		let style = {};

		if (
			this.props.position === 'absolute' ||
			this.props.position === 'overflowBoundaryElement'
		) {
			style = this.getPopperStyles();
		}

		if (this.props.inheritTargetWidth && this.props.onRequestTargetElement()) {
			style.width = this.props
				.onRequestTargetElement()
				.getBoundingClientRect().width;
		}

		if (this.props.style) {
			style = Object.assign(style, this.props.style);
		}

		const contents = (
			<div // eslint-disable-line jsx-a11y/no-static-element-interactions
				className={
					classNames(
						{
							'absolute-positioned': this.props.position === 'absolute',
							'portal-positioned':
								this.props.position === 'overflowBoundaryElement',
							[`${this.props.outsideClickIgnoreClass}`]:
								this.props.position === 'overflowBoundaryElement',
						},
						this.props.contentsClassName,
					) || undefined
				}
				style={style}
				onKeyDown={this.handleKeyDown}
				onMouseEnter={this.props.onMouseEnter}
				onMouseLeave={this.props.onMouseLeave}
				{...this.props.containerProps}
				ref={this.setDialogContent}
			>
				{this.props.children}
			</div>
		);

		const subRenders = {
			absolute: () => contents,
			relative: () => contents,
			overflowBoundaryElement: () => (
				<Portal onOpen={this.handleOpen} portalMount={this.props.portalMount}>
					<IconSettings iconPath={this.context.iconPath}>
						{contents}
					</IconSettings>
				</Portal>
			),
		};

		return subRenders[this.props.position] && subRenders[this.props.position]();
	},
});

Dialog.contextTypes = {
	iconPath: PropTypes.string,
};

export default Dialog;
