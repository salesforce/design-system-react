'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


// #### Dialog doesn't pass down <IconSettings> context so repassing it here.


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _popper = require('popper.js');

var _popper2 = _interopRequireDefault(_popper);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _portal = require('./portal');

var _portal2 = _interopRequireDefault(_portal);

var _event = require('../../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _keyCode = require('../../../utilities/key-code');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _domElementFocus = require('../../../utilities/dom-element-focus');

var _domElementFocus2 = _interopRequireDefault(_domElementFocus);

var _dialogHelpers = require('../../../utilities/dialog-helpers');

var _constants = require('../../../utilities/constants');

var _iconSettings = require('../../icon-settings');

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var Dialog = (0, _createReactClass2.default)({
	displayName: _constants.DIALOG,

	propTypes: {
		/**
   * Aligns the right or left side of the dialog with the respective side of the target.
   */
		align: _propTypes2.default.oneOf(['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom']),
		/**
   * CSS classes to be added to the absolutely positioned element.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * CSS classes to be added to the wrapping `div` of the contents of the dialog.
   */
		contentsClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Contents of dialog
   */
		children: _propTypes2.default.node.isRequired,
		/**
   * Closes dialog when tab key is pressed
   */
		closeOnTabKey: _propTypes2.default.bool,
		/**
   * Props passed along to wrapping div. This allows one less wrapping `div` to be in the markup. dialog children are expected to be wrapper in a single `div`.
   */
		containerProps: _propTypes2.default.object,
		/**
   * Sets the dialog width to the width of either 'target' (Menus attached to `input` typically follow this UX pattern), 'menu' or 'none.
   */
		inheritWidthOf: _propTypes2.default.oneOf(['target', 'menu', 'none']),
		/**
   * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. This is the opposite of "flippable."
   */
		hasStaticAlignment: _propTypes2.default.bool,
		/**
   *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px). SHOULD BE OBJECT -----------
   */
		offset: _propTypes2.default.string,
		/**
   * Called when dialog closes and unmounts.
   */
		onClose: _propTypes2.default.func,
		/**
   * Called when a key pressed.
   */
		onKeyDown: _propTypes2.default.func,
		/**
   * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseEnter: _propTypes2.default.func,
		/**
   * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseLeave: _propTypes2.default.func,
		/**
   * Called when dialog opens (that is mounts). The parameters are `undefined, { portal: this.portal }`.
   */
		onOpen: _propTypes2.default.func,
		/**
   * React component to be aligned with. Function should return a DOM `ref` from the parent component.
   */
		onRequestTargetElement: _propTypes2.default.func.isRequired,
		/**
   * Triggered when an item in the menu is clicked.
   */
		outsideClickIgnoreClass: _propTypes2.default.string,
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
		portalMount: _propTypes2.default.func,
		/**
   * Please select one of the following:
   * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
   * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
   * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
   */
		position: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']).isRequired,
		/**
   * An object of CSS styles that are applied to the immediate parent `div` of the contents. Use this instead of margin props.
   */
		style: _propTypes2.default.object,
		/**
   * Sets which focus UX pattern to follow. For instance, popovers trap focus and must be exited to regain focus. Dropdowns and Tooltips never have focus.
   */
		variant: _propTypes2.default.oneOf(['dropdown', 'popover', 'tooltip'])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			align: 'bottom left',
			offset: '0px 0px',
			outsideClickIgnoreClass: 'ignore-react-onclickoutside'
		};
	},
	getInitialState: function getInitialState() {
		return {
			triggerPopperJS: false,
			isOpen: false
		};
	},
	componentDidMount: function componentDidMount() {
		if (this.props.position === 'absolute' || this.props.position === 'relative') {
			this.handleOpen();
		}
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		if (this.state.triggerPopperJS === true && prevState.triggerPopperJS === false && (this.props.position === 'absolute' || this.props.position === 'overflowBoundaryElement') && this.dialogContent && this.props.onRequestTargetElement()) {
			this.createPopper();
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		if (this.props.variant === 'popover') {
			_domElementFocus2.default.teardownScopedFocus();
			_domElementFocus2.default.returnFocusToStoredElement();
		}

		if (this.props.position === 'absolute' || this.props.position === 'overflowBoundaryElement') {
			this.destroyPopper();
		}

		this.handleClose(undefined, { componentWillUnmount: true });
	},
	getPropOffsetsInPixels: function getPropOffsetsInPixels(offsetString) {
		var offsetArray = offsetString.split(' ');
		return {
			vertical: parseInt(offsetArray[0], 10),
			horizontal: parseInt(offsetArray[1], 10)
		};
	},
	getPopperStyles: function getPopperStyles() {
		var popperData = this.state.popperData;

		if (!this.popper || !popperData) {
			return {
				position: 'absolute',
				pointerEvents: 'none'
			};
		}

		var propOffsets = this.getPropOffsetsInPixels(this.props.offset);
		var position = popperData.offsets.popper.position;

		var left = popperData.offsets.popper.left + propOffsets.horizontal + 'px';
		var top = popperData.offsets.popper.top + propOffsets.vertical + 'px';
		return _extends({}, popperData.style, { left: left, top: top, position: position });
	},


	// Render
	setDialogContent: function setDialogContent(component) {
		this.dialogContent = component;
		if (!this.state.triggerPopperJS) {
			this.setState({ triggerPopperJS: true });
		}
	},


	/**
  * Events
  */
	handleClickOutside: function handleClickOutside() {
		this.handleClose();
	},
	handleClose: function handleClose(event, data) {
		this.setState({ triggerPopperJS: true });
		if (this.props.onClose) {
			this.props.onClose(event, data);
		}
	},
	handleClick: function handleClick(event) {
		if (event.nativeEvent) {
			event.nativeEvent.preventDefault();
			event.nativeEvent.stopPropagation();
		}
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode === _keyCode2.default.TAB) {
			if (this.props.closeOnTabKey) {
				_event2.default.trap(event);
				this.handleClose(event);
			}
		}

		if (this.props.onKeyDown) {
			this.props.onKeyDown(event);
		}
	},
	handleOpen: function handleOpen() {
		var scopedElement = this.dialogContent;

		if (this.props.variant === 'popover' && scopedElement) {
			_domElementFocus2.default.storeActiveElement();
			_domElementFocus2.default.setupScopedFocus({
				ancestorElement: scopedElement.querySelector('.slds-popover')
			}); // eslint-disable-line react/no-find-dom-node
			// Don't steal focus from inner elements
			if (!_domElementFocus2.default.hasOrAncestorHasFocus()) {
				_domElementFocus2.default.focusAncestor();
			}
		}

		if (this.props.onOpen) {
			this.props.onOpen(undefined, { portal: this.dialogContent });
		}
	},


	/**
  * Popper API and helper functions
  */

	createPopper: function createPopper() {
		var _this = this;

		var reference = this.props.onRequestTargetElement(); // eslint-disable-line react/no-find-dom-node
		var popper = this.dialogContent;
		var placement = (0, _dialogHelpers.mapPropToPopperPlacement)(this.props.align);
		var eventsEnabled = true; // Lets popper listen to events (resize, scroll, etc.)
		var modifiers = {
			applyStyle: { enabled: false },
			// moves dialog in order to not extend a boundary element such as a scrolling parent or a window/viewpoint.
			preventOverflow: {
				enabled: true,
				boundariesElement: this.props.position === 'absolute' ? 'scrollParent' : 'viewport'
			},
			// By default, dialogs will flip their alignment if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint
			removeOnDestroy: true,
			updateState: {
				enabled: true,
				order: 900,
				fn: function fn(popperData) {
					if (_this.state.popperData && !(0, _lodash2.default)(popperData.offsets, _this.state.popperData.offsets) || !_this.state.popperData) {
						_this.setState({ popperData: popperData });
					}
					return popperData;
				}
			}
			// arrow property can also point to an element
		};
		if (!reference) {
			console.error('Target node not found!', reference); // eslint-disable-line no-console
		}
		if (!popper) {
			console.error('Popper node not found!', popper); // eslint-disable-line no-console
		}
		this.popper = new _popper2.default(reference, popper, {
			placement: placement,
			eventsEnabled: eventsEnabled,
			modifiers: modifiers
		});

		this.popper.scheduleUpdate();
	},
	destroyPopper: function destroyPopper() {
		if (this.popper) {
			this.popper.destroy();
		}
	},
	render: function render() {
		var _this2 = this;

		var style = {};

		if (this.props.position === 'absolute' || this.props.position === 'overflowBoundaryElement') {
			style = this.getPopperStyles();
		}

		if (this.props.inheritWidthOf === 'target' && this.props.onRequestTargetElement()) {
			style.width = this.props.onRequestTargetElement().getBoundingClientRect().width;
		} else if (this.props.inheritWidthOf === 'menu' && this.dialogContent && this.dialogContent.querySelector('.slds-listbox')) {
			// inherit menu renderer width
			style.width = this.dialogContent.querySelector('.slds-listbox').getBoundingClientRect().width;
		}

		if (this.props.style) {
			style = Object.assign(style, this.props.style);
		}

		var contents = _react2.default.createElement(
			'div',
			_extends({ // eslint-disable-line jsx-a11y/no-static-element-interactions
				className: (0, _classnames2.default)(_defineProperty({
					'absolute-positioned': this.props.position === 'absolute',
					'portal-positioned': this.props.position === 'overflowBoundaryElement'
				}, '' + this.props.outsideClickIgnoreClass, this.props.position === 'overflowBoundaryElement'), this.props.contentsClassName) || undefined,
				style: style,
				onKeyDown: this.handleKeyDown,
				onMouseEnter: this.props.onMouseEnter,
				onMouseLeave: this.props.onMouseLeave
			}, this.props.containerProps, {
				ref: this.setDialogContent
			}),
			this.props.children
		);

		var subRenders = {
			absolute: function absolute() {
				return contents;
			},
			relative: function relative() {
				return contents;
			},
			overflowBoundaryElement: function overflowBoundaryElement() {
				return _react2.default.createElement(
					_portal2.default,
					{ onOpen: _this2.handleOpen, portalMount: _this2.props.portalMount },
					_react2.default.createElement(
						_iconSettings2.default,
						{ iconPath: _this2.context.iconPath },
						contents
					)
				);
			}
		};

		return subRenders[this.props.position] && subRenders[this.props.position]();
	}
});

Dialog.contextTypes = {
	iconPath: _propTypes2.default.string
};

exports.default = Dialog;