'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _tetherDrop = require('tether-drop');

var _tetherDrop2 = _interopRequireDefault(_tetherDrop);

var _event = require('../../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _keyCode = require('../../../utilities/key-code');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _domElementFocus = require('../../../utilities/dom-element-focus');

var _domElementFocus2 = _interopRequireDefault(_domElementFocus);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Dialog creates a new top-level React tree and injects its child into it. This is necessary for proper styling (especially positioning). A dialog is a non-modal container that separates content from the rest of the web application. This library uses the Drop library (https://github.com/HubSpot/drop which is based on TetherJS) to absolutely position and align content to another item on the page. This component is not meant for external consumption or part of the published component API.
*/


// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the element itself
var Dialog = _react2.default.createClass({

	displayName: _constants.DIALOG,

	propTypes: {
		/**
   * Aligns the right or left side of the dialog with the respective side of the target.
   */
		align: _react.PropTypes.oneOf(['top', 'top left', 'top right', 'right', 'right top', 'right bottom', 'bottom', 'bottom left', 'bottom right', 'left', 'left top', 'left bottom']),
		/**
   * CSS classes to be added to the absolutely positioned element.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * CSS classes to be added to the wrapping `div` of the contents of the dialog.
   */
		contentsClassName: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Contents of dialog
  **/
		children: _react.PropTypes.node,
		/**
   * Closes dialog when tab key is pressed
  **/
		closeOnTabKey: _react.PropTypes.bool,
		/**
   * If true, the dialog is constrained to the scrolling parent and may be flipped up instead of down. This is helpful for use within modals.
   */
		constrainToScrollParent: _react.PropTypes.bool,
		/**
   * Positions the dialog horizontally.
  **/
		horizontalAlign: _react.PropTypes.oneOf(['left', 'right', 'center']),
		/**
   * Sets the dialog width to the width of the target.
   */
		inheritTargetWidth: _react.PropTypes.bool,
		/**
   * If true, the dialog is constrained to the window and may be flipped up instead of down.
   */
		flippable: _react.PropTypes.bool,
		/**
   * Top margin offset of dialog from target.
   */
		marginTop: _react.PropTypes.string,
		/**
   * Bottom margin offset of dialog from target.
   */
		marginBottom: _react.PropTypes.string,
		/**
   * Left margin offset of dialog from target.
   */
		marginLeft: _react.PropTypes.string,
		/**
   * Right margin offset of dialog from target.
   */
		marginRight: _react.PropTypes.string,
		/**
   *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
   */
		offset: _react.PropTypes.string,
		/**
   * Called when dialog closes (that is unmounts).
   */
		onClose: _react.PropTypes.func,
		/**
   * Called when a key pressed.
   */
		onKeyDown: _react.PropTypes.func,
		/**
   * Called when mouse clicks down on the trigger button.
   */
		onMouseDown: _react.PropTypes.func,
		/**
   * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseEnter: _react.PropTypes.func,
		/**
   * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseLeave: _react.PropTypes.func,
		/**
   * Called when dialog opens (that is mounts). The parameters are `undefined, { portal: this.portal }`.
   */
		onOpen: _react.PropTypes.func,
		/**
   * Triggered when an item in the menu is clicked.
   */
		outsideClickIgnoreClass: _react.PropTypes.string,
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
		portalMount: _react.PropTypes.func,
		/**
   * An object of CSS styles that are applied to the immediate parent `div` of the contents.
   */
		style: _react.PropTypes.object,
		/**
   * React component to be aligned with. This will be passed to `ReactDOM.findDOMNode()` if set and should be set from a component reference (`ref`).
   */
		targetElement: _react.PropTypes.object,
		/**
   * Informs the component on how to handle focus. Popovers trap focus and must be exited to regain focus.
  **/
		variant: _react.PropTypes.oneOf(['dropdown', 'popover', 'tooltip']),
		/**
   * Positions the dialog vertically.
  **/
		verticalAlign: _react.PropTypes.oneOf(['bottom', 'middle', 'top'])
	},

	getDefaultProps: function getDefaultProps() {
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
	getInitialState: function getInitialState() {
		return {
			isOpen: false
		};
	},
	componentWillMount: function componentWillMount() {
		this.dialogElement = document.createElement('span');
		document.querySelector('body').appendChild(this.dialogElement);
	},
	componentDidMount: function componentDidMount() {
		this.renderDialog();
	},
	componentDidUpdate: function componentDidUpdate() {
		this.renderDialog();
	},
	handleClickOutside: function handleClickOutside() {
		this.handleClose();
	},
	handleClose: function handleClose(event, data) {
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
	renderDialogContents: function renderDialogContents() {
		var _this = this;

		if (!this.state.isOpen) {
			return _react2.default.createElement('span', null);
		}

		var style = {
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

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)(this.props.contentsClassName, this.props.outsideClickIgnoreClass),
				style: style,
				onKeyDown: this.handleKeyDown,
				onMouseEnter: this.props.onMouseEnter,
				onMouseLeave: this.props.onMouseLeave,
				ref: function ref(component) {
					_this.dialogContent = component;
				}
			},
			this.props.children
		);
	},
	getHorizontalAlign: function getHorizontalAlign(align) {
		if (align.indexOf('left') > -1) {
			return 'left';
		} else if (align.indexOf('right') > -1) {
			return 'right';
		}
		return 'center';
	},
	getVerticalAlign: function getVerticalAlign(align) {
		if (align.indexOf('bottom') > -1) {
			return 'bottom';
		} else if (align.indexOf('top') > -1) {
			return 'top';
		}
		return 'middle';
	},
	isHorizontalAlign: function isHorizontalAlign(align) {
		return align === 'left' || align === 'right' || align === 'center';
	},
	isVerticalAlign: function isVerticalAlign(align) {
		return align === 'bottom' || align === 'top' || align === 'middle';
	},
	getPosition: function getPosition() {
		if (this.props.align) {
			var align = [];
			if (this.props.align) {
				var splits = this.props.align.split(' ');
				if (this.isHorizontalAlign(splits[0])) {
					var verticalAlign = splits.length > 1 ? this.getVerticalAlign(splits[1]) : this.getVerticalAlign('');
					align = [this.getHorizontalAlign(splits[0]), verticalAlign];
				} else {
					var horizontalAlign = splits.length > 1 ? this.getHorizontalAlign(splits[1]) : this.getHorizontalAlign('');
					align = [this.getVerticalAlign(splits[0]), horizontalAlign];
				}
			}

			return align.join(' ');
		}

		var positions = [];
		if (this.props.verticalAlign === 'top' || this.props.verticalAlign === 'bottom') {
			positions.push(this.props.verticalAlign);
			positions.push(this.props.horizontalAlign);
		} else {
			positions.push(this.props.horizontalAlign);
			positions.push(this.props.verticalAlign);
		}

		return positions.join(' ');
	},
	target: function target() {
		return this.props.targetElement ? _reactDom2.default.findDOMNode(this.props.targetElement) : _reactDom2.default.findDOMNode(this).parentNode;
	},
	tetherDropOptions: function tetherDropOptions() {
		// Please reference http://github.hubspot.com/drop/ for options.
		var position = this.getPosition();

		return {
			beforeClose: this.beforeClose,
			constrainToWindow: this.props.flippable,
			constrainToScrollParent: this.props.constrainToScrollParent,
			content: this.dialogElement,
			openOn: 'always',
			position: position,
			remove: true,
			target: this.target(),
			tetherOptions: {
				offset: this.props.offset
			}
		};
	},
	handleOpen: function handleOpen() {
		this.setState({ isOpen: true });

		if (this.props.variant === 'popover') {
			_domElementFocus2.default.storeActiveElement();
			_domElementFocus2.default.setupScopedFocus({ ancestorElement: _reactDom2.default.findDOMNode(this.dialogElement).querySelector('.slds-popover') });
			// Don't steal focus from inner elements
			if (!_domElementFocus2.default.hasOrAncestorHasFocus()) {
				_domElementFocus2.default.focusAncestor();
			}
		}

		if (this.props.onOpen) {
			this.props.onOpen(undefined, { portal: this.portal });
		}
	},
	renderDialog: function renderDialog() {
		// By default ReactDOM is used to create a portal mount on the `body` tag. This can be overridden with the `portalMount` prop.
		var mount = _reactDom2.default.render;

		if (this.props.portalMount) {
			mount = this.props.portalMount;
		}

		// nextElement, container, callback
		this.portal = mount(this.renderDialogContents(), this.dialogElement);

		if (this.dialogElement && this.dialogElement.parentNode && this.dialogElement.parentNode.parentNode && this.dialogElement.parentNode.parentNode.className && this.dialogElement.parentNode.parentNode.className.indexOf('drop ') > -1) {
			this.dialogElement.parentNode.parentNode.style.zIndex = 10001;
		}

		if (this.drop !== null && this.drop !== undefined) {
			if (this.drop && this.drop) {
				this.drop.position();
			}
		} else if (window && document) {
			this.drop = new _tetherDrop2.default(this.tetherDropOptions());
			this.drop.once('open', this.handleOpen);
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		if (this.props.variant === 'popover') {
			_domElementFocus2.default.teardownScopedFocus();
			_domElementFocus2.default.returnFocusToStoredElement();
		}

		this.drop.destroy();
		_reactDom2.default.unmountComponentAtNode(this.dialogElement);

		if (this.dialogElement.parentNode) {
			this.dialogElement.parentNode.removeChild(this.dialogElement);
		}

		this.handleClose(undefined, { componentWillUnmount: true });
	},
	render: function render() {
		// Must use `<noscript></noscript>` in order for `this.drop` to not be undefined when unmounting
		return _react2.default.createElement('noscript', null);
	}
});

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Dialog


module.exports = (0, _reactOnclickoutside2.default)(Dialog);