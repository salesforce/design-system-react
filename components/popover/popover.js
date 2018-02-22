define(['exports', 'react', 'create-react-class', 'prop-types', 'lodash.assign', 'classnames', 'lodash.isboolean', 'lodash.isfunction', 'shortid', './check-props', '../button', '../utilities/dialog', '../../utilities/dialog-helpers', '../../utilities/keyboard-navigable-dialog', '../../utilities/key-code', '../../utilities/constants'], function (exports, _react, _createReactClass, _propTypes, _lodash, _classnames, _lodash3, _lodash5, _shortid, _checkProps, _button, _dialog, _dialogHelpers, _keyboardNavigableDialog, _keyCode, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PopoverNubbinPositions = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash4 = _interopRequireDefault(_lodash3);

	var _lodash6 = _interopRequireDefault(_lodash5);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _checkProps2 = _interopRequireDefault(_checkProps);

	var _button2 = _interopRequireDefault(_button);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _keyboardNavigableDialog2 = _interopRequireDefault(_keyboardNavigableDialog);

	var _keyCode2 = _interopRequireDefault(_keyCode);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	var documentDefined = typeof document !== 'undefined';

	// The overlay is an optional way to allow the popover to close on outside
	// clicks even when those clicks are over areas that wouldn't normally fire
	// click or touch events (for example, iframes). A single overlay is shared
	// between all popovers in the app.
	var overlay = documentDefined ? document.createElement('span') : { style: {} };
	overlay.style.top = 0;
	overlay.style.left = 0;
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.position = 'absolute';

	var currentOpenPopover = void 0;

	var PopoverNubbinPositions = ['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right'];

	/**
  * The Popover component is a non-modal dialog. It should be paired with a clickable trigger such as a `Button`. It traps focus from the page and must be exited if focus needs to be outside the Popover. Use a `Tooltip` if there are no call to actions within the dialog. A `Tooltip` does not need to be clicked. Multiple popovers open at the same time, each with focus trap is not supported.
  */
	var Popover = (0, _createReactClass2.default)({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.POPOVER,

		// ### Prop Types
		propTypes: {
			/**
    * Aligns the popover with the respective side of the trigger. That is `top` will place the `Popover` above the trigger.
    */
			align: _propTypes2.default.oneOf(['top', 'top left', 'top right', 'right', 'bottom', 'bottom left', 'bottom right', 'left']),
			/**
    * HTML `id` of heading for popover. Only use if your header is within your popover body.
    */
			ariaLabelledby: _propTypes2.default.string,
			/**
    * The trigger of the component. This must be a **single node**. Many props will be passed into this trigger related to popover interactions. The child needs to be a clickable element, such as a `Button` or an anchor tag (`a`).
    */
			children: _propTypes2.default.node.isRequired,
			/**
    * The contents of the popover. This should also accept arrays.
    */
			body: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.array]).isRequired,
			/**
    * CSS classes to be added to the popover. That is the element with `.slds-popover` on it.
    */
			className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
			/**
    * All popovers require a close button.
    */
			closeButtonAssistiveText: _propTypes2.default.oneOfType([_propTypes2.default.string]),
			/**
    * This prop is passed onto the triggering `Button`. Prevent popover from opening. Also applies disabled styling to trigger button.
    */
			disabled: _propTypes2.default.bool,
			/**
    * A footer is an optional. Buttons are often placed here.
    */
			footer: _propTypes2.default.node,
			/**
    * Prevents the Popover from changing position based on the viewport/window. If set to true your popover can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the popover contents scrollable to fit the menu on the screen.
    */
			hasStaticAlignment: _propTypes2.default.bool,
			/**
    * All popovers require a heading that labels the popover for assistive technology users. This text will be placed within a heading HTML tag. A heading is **highly recommended for accessibility reasons.** Please see `ariaLabelledby` prop.
    */
			heading: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
			/**
    * By default, a unique ID will be created at render to support keyboard navigation, ARIA roles, and connect the popover to the triggering button. This ID will be applied to the triggering element. `${id}-popover`, `${id}-dialog-heading`, `${id}-dialog-body` are also created.
    */
			id: _propTypes2.default.string,
			/**
    * Forces the popover to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use [](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices) You will want this if Popover is to be a controlled component.
    */
			isOpen: _propTypes2.default.bool,
			/**
    *  Offset adds pixels to the absolutely positioned dialog in the format: ([vertical]px [horizontal]px).
    */
			offset: _propTypes2.default.string,
			/**
    * This function is passed onto the triggering `Button`. Triggered when the trigger button is clicked. You will want this if Popover is to be a controlled component.
    */
			onClick: _propTypes2.default.func,
			/**
    * This function is triggered when the dialog is closed. This occurs when the Dialog child component (that is the actual popover) is unmounted and removed from the DOM. This function returns `{event, { trigger, componentWillUnmount }`. Trigger can have the values `cancel`, `clickOutside`, or `newPopover`.
    */
			onClose: _propTypes2.default.func,
			/**
    * Called when a key is pressed.
    */
			onKeyDown: _propTypes2.default.func,
			/**
    * Called when mouse clicks down on the trigger button.
    */
			onMouseDown: _propTypes2.default.func,
			/**
    * This function is triggered when the Dialog child component (that is the actual popover) is mounted and added to the DOM. The parameters are `event, { portal: }`. `portal` can be used as a React tree root node.
    */
			onOpen: _propTypes2.default.func,
			/**
    * This function is triggered when the user clicks outside the Popover or clicks the close button. You will want to define this if Popover is to be a controlled component. Most of the time you will want wnat to set `isOpen` to `false` when this is triggered unless you need to validate something.
    */
			onRequestClose: _propTypes2.default.func,
			/**
    * Please select one of the following:
    * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
    * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
    * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
    */
			position: _propTypes2.default.oneOf(['absolute', 'overflowBoundaryElement', 'relative']),
			/**
    * An object of CSS styles that are applied to the `slds-popover` DOM element.
    */
			style: _propTypes2.default.object,
			/**
    * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
    */
			overlay: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
			/**
    * CSS classes to be added to wrapping trigger `div` around the button.
    */
			triggerClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string])
		},

		getDefaultProps: function getDefaultProps() {
			return {
				align: 'right',
				closeButtonAssistiveText: 'Close dialog',
				hoverCloseDelay: 300,
				openOn: 'click',
				position: 'absolute'
			};
		},
		getInitialState: function getInitialState() {
			return {
				isOpen: false
			};
		},
		componentWillMount: function componentWillMount() {
			this.generatedId = _shortid2.default.generate();
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.POPOVER, this.props);
		},
		componentWillUnmount: function componentWillUnmount() {
			if (currentOpenPopover === this) {
				currentOpenPopover = undefined;
			}
			this.isUnmounting = true;
			this.renderOverlay(false);
		},
		getId: function getId() {
			return this.props.id || this.generatedId;
		},
		getIsOpen: function getIsOpen() {
			return !this.props.disabled && !!((0, _lodash4.default)(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);
		},
		getMenu: function getMenu() {
			// needed by keyboard navigation
			return this.dialog;
		},
		setMenuRef: function setMenuRef(component) {
			this.dialog = component;
		},
		setContainerRef: function setContainerRef(component) {
			this.trigger = component;
			// yes, this is a re-render triggered by a render.
			// Dialog/Popper.js cannot place the popover until
			// the trigger/target DOM node is mounted. This
			// way `findDOMNode` is not called and parent
			// DOM nodes are not queried.
			if (!this.state.inputRendered) {
				this.setState({ inputRendered: true });
			}
		},
		handleDialogClose: function handleDialogClose(event, data) {
			var componentWillUnmount = data && data.componentWillUnmount || false;

			if (currentOpenPopover === this) {
				currentOpenPopover = undefined;
			}

			if (this.props.onClose) {
				this.props.onClose(event, {
					// Breaking change: component object reference has been
					// removed (`this`), due to endless loop creation.
					componentWillUnmount: componentWillUnmount
				});
			}
		},
		handleClose: function handleClose(event, data) {
			var isOpen = this.getIsOpen();

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
		handleOpen: function handleOpen() {
			var isOpen = this.getIsOpen();

			if (!isOpen) {
				if (currentOpenPopover && (0, _lodash6.default)(currentOpenPopover.handleClose)) {
					currentOpenPopover.handleClose(undefined, {
						trigger: 'newPopover',
						id: currentOpenPopover.getId()
					});
				}

				currentOpenPopover = this;

				this.setState({
					isOpen: true
				});
			}
		},
		handleMouseEnter: function handleMouseEnter(event) {
			var isOpen = this.getIsOpen();

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
		handleMouseLeave: function handleMouseLeave(event) {
			var _this = this;

			var isOpen = this.getIsOpen();

			if (isOpen) {
				this.isClosing = setTimeout(function () {
					_this.handleClose();
				}, this.props.hoverCloseDelay);
			}

			if (this.props.onMouseLeave) {
				this.props.onMouseLeave(event);
			}
		},
		handleClick: function handleClick(event, _ref) {
			var triggerOnClickCallback = _ref.triggerOnClickCallback;

			var isOpen = this.getIsOpen();

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
		handleFocus: function handleFocus(event) {
			var isOpen = this.getIsOpen();

			if (!isOpen) {
				this.handleOpen();
			}

			if (this.props.onFocus) {
				this.props.onFocus(event);
			}
		},
		handleKeyDown: function handleKeyDown(event) {
			if (event.keyCode) {
				if (event.keyCode !== _keyCode2.default.TAB) {
					var isOpen = this.getIsOpen();

					(0, _keyboardNavigableDialog2.default)({
						event: event,
						isOpen: isOpen,
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
		handleCancel: function handleCancel(event) {
			this.handleClose(event, { trigger: 'cancel' });
		},
		handleClickOutside: function handleClickOutside(event) {
			this.handleClose(event, { trigger: 'clickOutside' });
		},
		toggleOpenFromKeyboard: function toggleOpenFromKeyboard(event) {
			var isOpen = this.getIsOpen();
			if (isOpen) {
				this.handleCancel(event);
			} else {
				this.handleOpen();
			}
		},
		renderDialog: function renderDialog(isOpen, outsideClickIgnoreClass) {
			var _this2 = this;

			var props = this.props;
			var offset = props.offset;
			var style = this.props.style || {};

			return isOpen ? _react2.default.createElement(
				_dialog2.default,
				{
					align: props.align,
					contentsClassName: (0, _classnames2.default)(this.props.contentsClassName, 'ignore-react-onclickoutside'),
					context: this.context,
					hasStaticAlignment: props.hasStaticAlignment,
					offset: offset,
					onCancel: this.handleClose,
					onClose: this.handleDialogClose,
					onOpen: this.props.onOpen,
					onKeyDown: this.handleKeyDown,
					onMouseEnter: props.openOn === 'hover' ? this.handleMouseEnter : null,
					onMouseLeave: props.openOn === 'hover' ? this.handleMouseLeave : null,
					outsideClickIgnoreClass: outsideClickIgnoreClass,
					onRequestTargetElement: function onRequestTargetElement() {
						return _this2.trigger;
					},
					position: this.props.position,
					style: {
						marginBottom: _dialogHelpers.getMargin.bottom(props.align),
						marginLeft: _dialogHelpers.getMargin.left(props.align),
						marginRight: _dialogHelpers.getMargin.right(props.align),
						marginTop: _dialogHelpers.getMargin.top(props.align)
					},
					variant: 'popover'
				},
				_react2.default.createElement(
					'div',
					{
						'aria-labelledby': this.props.ariaLabelledby ? this.props.ariaLabelledby : this.getId() + '-dialog-heading',
						'aria-describedby': this.getId() + '-dialog-body',
						className: (0, _classnames2.default)('slds-popover', (0, _dialogHelpers.getNubbinClassName)(props.align), props.className),
						id: this.getId() + '-popover',
						role: 'dialog',
						style: (0, _lodash2.default)({ outline: '0' }, style),
						tabIndex: '-1',
						ref: this.setMenuRef
					},
					_react2.default.createElement(_button2.default, {
						assistiveText: props.closeButtonAssistiveText,
						iconName: 'close',
						iconSize: 'small',
						className: 'slds-button slds-button--icon-small slds-float--right slds-popover__close slds-button--icon',
						onClick: this.handleCancel,
						variant: 'icon'
					}),
					this.props.heading ? _react2.default.createElement(
						'header',
						{ className: 'slds-popover__header' },
						_react2.default.createElement(
							'h2',
							{
								id: this.getId() + '-dialog-heading',
								className: 'slds-text-heading--small'
							},
							this.props.heading
						)
					) : null,
					_react2.default.createElement(
						'div',
						{
							id: this.getId() + '-dialog-body',
							className: 'slds-popover__body'
						},
						props.body
					),
					this.props.footer ? _react2.default.createElement(
						'footer',
						{ className: 'slds-popover__footer' },
						this.props.footer
					) : null
				)
			) : null;
		},
		renderOverlay: function renderOverlay(isOpen) {
			if ((0, _lodash6.default)(overlay) && documentDefined) {
				overlay(isOpen, overlay);
			} else if (this.props.overlay && isOpen && !this.overlay && documentDefined) {
				this.overlay = overlay;
				document.querySelector('body').appendChild(this.overlay);
			} else if (!isOpen && this.overlay && this.overlay.parentNode) {
				this.overlay.parentNode.removeChild(this.overlay);
				this.overlay = undefined;
			}
		},
		render: function render() {
			var _this3 = this;

			var outsideClickIgnoreClass = 'ignore-click-' + this.getId();

			var clonedTrigger = this.props.children ? _react2.default.cloneElement(this.props.children, _extends({
				id: this.getId(),
				onClick: this.props.openOn === 'click' || this.props.openOn === 'hybrid' ? function (event) {
					_this3.handleClick(event, {
						triggerOnClickCallback: _this3.props.children.props.onClick
					});
				} : this.children.props.onClick,
				onFocus: this.props.openOn === 'hover' ? this.handleFocus : null,
				onMouseDown: this.props.onMouseDown,
				onMouseEnter: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseEnter : null,
				onMouseLeave: this.props.openOn === 'hover' || this.props.openOn === 'hybrid' ? this.handleMouseLeave : null,
				tabIndex: this.props.children.props.tabIndex || '0'
			}, this.props.children.props)) : null;

			this.renderOverlay(this.getIsOpen());

			var containerStyles = { display: 'inline' };
			return _react2.default.createElement(
				'div',
				{
					className: this.props.triggerClassName,
					style: containerStyles,
					ref: this.setContainerRef
				},
				clonedTrigger,
				this.renderDialog(this.getIsOpen(), outsideClickIgnoreClass)
			);
		}
	});

	Popover.contextTypes = {
		iconPath: _propTypes2.default.string
	};

	exports.default = Popover;
	exports.PopoverNubbinPositions = PopoverNubbinPositions;
});