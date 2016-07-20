'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                  */

// # Dropdown Component

// Implements the [Dropdown design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown) in React. Child elements that do not have the display name of the value of `MENU_DROPDOWN_TRIGGER` in `components/constants.js` will be considered custom content and rendered in the popover.
// Based on SLDS v2.1.0-rc.2

// ### React


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// ### Children


// This is the the default Dropdown Trigger, which expects one button as a child.


// ### Traits

// #### KeyboardNavigable


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _popover = require('../popover');

var _popover2 = _interopRequireDefault(_popover);

var _list = require('../menu-list/list');

var _list2 = _interopRequireDefault(_list);

var _listItem = require('../menu-list/list-item');

var _listItem2 = _interopRequireDefault(_listItem);

var _listItemLabel = require('../menu-list/list-item-label');

var _listItemLabel2 = _interopRequireDefault(_listItemLabel);

var _buttonTrigger = require('./button-trigger');

var _buttonTrigger2 = _interopRequireDefault(_buttonTrigger);

var _keyboardNavigable = require('../../utilities/keyboard-navigable');

var _keyboardNavigable2 = _interopRequireDefault(_keyboardNavigable);

var _utilities = require('../../utilities');

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The MenuDropdown component is a variant of the Lightning Design System Menu component.
 */
var MenuDropdown = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.MENU_DROPDOWN,

	mixins: [_keyboardNavigable2.default],

	// ### Prop Types
	propTypes: {
		/**
   * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
   */
		align: _react.PropTypes.oneOf(['left', 'right']),
		/**
   * This prop is passed onto the triggering `Button`. Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. You can omit this prop if you are using the `label` prop.
   */
		assistiveText: _react.PropTypes.string,
		/**
   * CSS classes to be added to triggering button.
   */
		buttonClassName: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * This prop is passed onto the triggering `Button`. Determines variant of the Button component that triggers dropdown.
   */
		buttonVariant: _react.PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon', 'inverse', 'icon-inverse']),
		/**
   * If true, renders checkmark icon on the selected Menu Item.
   */
		checkmark: _react.PropTypes.bool,
		/**
   * If no children are present, a default button will be rendered with an arrow. Import the module `design-system-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the trigger button. Any `id` prop or event hanlders (`onBlur`, `onClick`, etc.) set on the button grandchild will be overwritten by `MenuDropdown` to enable functionality and accessibility.
   * ```
   * <Dropdown>
   *   <Trigger>
   *     <Button iconCategory="utility" iconName="settings" />
   *   </Trigger>
   * </Dropdown>
   * ```
   */
		children: _react.PropTypes.node,
		/**
   * CSS classes to be added to dropdown menu container. By default, It will be added to the `Popover` component.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
   */
		disabled: _react.PropTypes.bool,
		/**
   * This prop is passed onto the triggering `Button`. Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
   */
		hint: _react.PropTypes.bool,
		/**
   * Delay on menu closing in milliseconds.
   */
		hoverCloseDelay: _react.PropTypes.number,
		/**
   * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
   */
		iconCategory: _react.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		/**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
		iconName: _react.PropTypes.string,
		/**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
		iconVariant: _react.PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),
		/**
   * Determines the size of the icon.
   */
		iconSize: _react.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
  * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
  */
		id: _react.PropTypes.string,
		/**
  * This prop is passed onto the triggering `Button`. Text within the trigger button.
  */
		label: _react.PropTypes.string,
		/**
   * Custom element that overrides the default Menu Item component.
   */
		listItemRenderer: _react.PropTypes.func,
		/**
   * Renders menu within an absolutely positioned container at an elevated z-index.
   */
		modal: _react.PropTypes.bool,
		/**
   * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling. Dropdown menus will still be contained to the closest scrolling parent.
   */
		nubbinPosition: _react.PropTypes.oneOf(['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right']),
		/**
   *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
   */
		offset: _react.PropTypes.string,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
   */
		onBlur: _react.PropTypes.func,
		/**
   * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
   */
		onClick: _react.PropTypes.func,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
   */
		onFocus: _react.PropTypes.func,
		/**
   * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
   */
		openOn: _react.PropTypes.oneOf(['hover', 'click']),
		/**
   * Set dropdown to be open. Must be returned to false to become interactive again.
   */
		forceOpen: _react.PropTypes.bool,
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
   * Triggered when an item in the menu is clicked.
   */
		onSelect: _react.PropTypes.func,
		/**
   * An array of menu item.
   */
		options: _react.PropTypes.array.isRequired,
		/**
   * An object of CSS styles that are applied to the triggering button
   */
		style: _react.PropTypes.object,
		/**
   * Current selected menu item.
   */
		value: _react.PropTypes.string,
		/**
   * This prop is passed onto the triggering `Button`. It creates a tooltip with the content of the `node` provided.
   */
		tooltip: _react.PropTypes.node
	},

	getDefaultProps: function getDefaultProps() {
		return {
			align: 'left',
			hoverCloseDelay: 300,
			modal: true,
			openOn: 'click'
		};
	},
	getInitialState: function getInitialState() {
		return {
			focusedIndex: -1,
			selectedIndex: this.getIndexByValue(this.props.value)
		};
	},
	componentWillMount: function componentWillMount() {
		this.generatedId = _shortid2.default.generate();

		window.addEventListener('click', this.closeOnClick, false);
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		var _this = this;

		if (this.state.isOpen && !prevState.isOpen) {
			this.state.isClosing = false;
		}

		if (this.state.selectedIndex !== prevState.selectedIndex) {
			this.handleClose();
		} else if (this.state.isFocused && !prevState.isFocused) {
			this.setState({ isOpen: false });
		} else if (!this.state.isFocused && prevState.isFocused) {
			if (this.list) {
				if (!this.isUnmounting && this.list) {
					if (!_reactDom2.default.findDOMNode(this.list).contains(document.activeElement)) {
						this.setState({ isOpen: false });
					}
				}
			}
		} else if (this.state.isClosing && !prevState.isClosing) {
			setTimeout(function () {
				if (_this.state.isClosing) {
					_this.setState({ isOpen: false });
				}
			}, this.props.hoverCloseDelay);
		}

		if (this.props.value !== prevProps.value) {
			this.handleSelect(this.getIndexByValue(this.props.value));
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		this.isUnmounting = true;

		window.removeEventListener('click', this.closeOnClick, false);
	},
	getId: function getId() {
		return this.props.id || this.generatedId;
	},
	getIndexByValue: function getIndexByValue(value) {
		var foundIndex = -1;

		if (this.props.options && this.props.options.length) {
			this.props.options.some(function (element, index) {
				if (element && element.value === value) {
					foundIndex = index;
					return true;
				}

				return false;
			});
		}

		return foundIndex;
	},
	getValueByIndex: function getValueByIndex(index) {
		return this.props.options[index];
	},
	getListItemRenderer: function getListItemRenderer() {
		return this.props.listItemRenderer ? this.props.listItemRenderer : _listItemLabel2.default;
	},
	handleBlur: function handleBlur(e) {
		this.setState({ isFocused: false });

		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
	},
	handleClose: function handleClose() {
		this.setState({
			isOpen: false,
			isHover: false
		});
	},
	handleFocus: function handleFocus() {
		this.setState({
			isFocused: true,
			isHover: false
		});

		if (this.props.onFocus) {
			this.props.onFocus();
		}
	},
	handleMouseEnter: function handleMouseEnter() {
		this.state.isClosing = false;

		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				isHover: true
			});
		}

		if (this.props.onMouseEnter) {
			this.props.onMouseEnter();
		}
	},
	handleMouseLeave: function handleMouseLeave() {
		this.setState({ isClosing: true });

		if (this.props.onMouseLeave) {
			this.props.onMouseLeave();
		}
	},
	handleClick: function handleClick(event) {
		if (event) {
			event.nativeEvent.SLDSDropdownClickEvent = true;
		}

		if (!this.state.isOpen) {
			this.setState({ isOpen: true });
			this.setFocus();

			if (this.props.onClick) {
				this.props.onClick();
			}
		} else {
			this.handleClose();
		}
	},
	handleMouseDown: function handleMouseDown(event) {
		if (event) {
			_utilities.EventUtil.trapImmediate(event);
			event.nativeEvent.SLDSDropdownClickEvent = true;
		}

		if (this.props.onMouseDown) {
			this.props.onMouseDown();
		}
	},
	handleSelect: function handleSelect(index) {
		this.setState({ selectedIndex: index });
		this.setFocus();

		if (this.props.onSelect) {
			this.props.onSelect(this.getValueByIndex(index));
		}
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode) {
			if (event.keyCode === _utilities.KEYS.ENTER || event.keyCode === _utilities.KEYS.SPACE || event.keyCode === _utilities.KEYS.DOWN || event.keyCode === _utilities.KEYS.UP) {
				_utilities.EventUtil.trap(event);
			}

			this.handleKeyboardNavigate({
				isOpen: this.state.isOpen || false,
				keyCode: event.keyCode,
				onSelect: this.handleSelect,
				toggleOpen: this.toggleOpen
			});

			if (this.props.onKeyDown) {
				this.props.onKeyDown();
			}
		}
	},
	handleCancel: function handleCancel() {
		if (!this.state.isHover) {
			this.setFocus();
		}
	},
	closeOnClick: function closeOnClick(event) {
		if (!event.SLDSDropdownClickEvent && this.state.isOpen) {
			this.handleClose();
		}
	},
	toggleOpen: function toggleOpen() {
		this.setState({ isOpen: !this.state.isOpen });
	},
	setFocus: function setFocus() {
		if (!this.isUnmounting && this.button) {
			_reactDom2.default.findDOMNode(this.button).focus();
		}
	},
	saveRefToList: function saveRefToList(list) {
		this.list = list;
	},
	saveRefToListItem: function saveRefToListItem(listItem, index) {
		if (!this.listItems) {
			this.listItems = {};
		}

		this.listItems[index] = listItem;

		if (index === this.state.focusedIndex) this.handleKeyboardFocus(this.state.focusedIndex);
	},
	getMenu: function getMenu() {
		return _reactDom2.default.findDOMNode(this.list);
	},
	getMenuItem: function getMenuItem(index) {
		if (index !== undefined && this.listItems) {
			return _reactDom2.default.findDOMNode(this.listItems[index]);
		}

		return undefined;
	},
	renderDefaultPopoverContent: function renderDefaultPopoverContent(customListProps) {
		return _react2.default.createElement(_list2.default, _extends({
			key: this.props.id + '-dropdown-list',
			checkmark: this.props.checkmark,
			getListItemId: this.getListItemId,
			isHover: this.state.isHover,
			itemRefs: this.saveRefToListItem,
			itemRenderer: this.getListItemRenderer(),
			onCancel: this.handleCancel,
			onSelect: this.handleSelect,
			options: this.props.options,
			ref: this.saveRefToList,
			selectedIndex: this.state.selectedIndex,
			triggerId: this.getId()
		}, customListProps));
	},
	renderPopoverContent: function renderPopoverContent(customContent) {
		var _this2 = this;

		var customContentWithListPropInjection = [];
		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		_react2.default.Children.forEach(customContent, function (child) {
			if (child && child.type.displayName === _constants.LIST) {
				customContentWithListPropInjection.push(_this2.renderDefaultPopoverContent(child.props));
			} else {
				customContentWithListPropInjection.push(child);
			}
		});
		if (customContentWithListPropInjection.length === 0) {
			customContentWithListPropInjection = null;
		}

		return customContentWithListPropInjection || this.renderDefaultPopoverContent();
	},
	renderSimplePopover: function renderSimplePopover(customContent) {
		return this.props.forceOpen || !this.props.disabled && this.state.isOpen && this.button ? _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-dropdown', 'slds-dropdown--menu', 'slds-dropdown--left', this.props.className),
				onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter : null,
				onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave : null
			},
			this.renderPopoverContent(customContent)
		) : null;
	},
	renderModalPopover: function renderModalPopover(customContent) {
		var positionClassName = void 0;
		var marginTop = void 0;
		var offset = this.props.offset;

		if (this.props.nubbinPosition) {
			var positions = this.props.nubbinPosition.split(' ');
			positionClassName = (0, _classnames2.default)('slds-nubbin--' + positions.join('-'), positions.map(function (position) {
				return 'slds-dropdown--' + position;
			}));
			marginTop = 0;
			// TODO: allow nubbinPosition prop to set the offset automatically
			// if (this.props.nubbinPosition === 'top right') {
			// 	offset = '-12px -24px';
			// }
		} else if (this.props.align) {
				positionClassName = 'slds-dropdown--' + this.props.align;
			}

		return this.props.forceOpen || !this.props.disabled && this.state.isOpen && this.button ? _react2.default.createElement(
			_popover2.default,
			{
				className: (0, _classnames2.default)('slds-dropdown', 'slds-dropdown--menu', positionClassName, this.props.className),
				closeOnTabKey: true,
				horizontalAlign: this.props.align,
				flippable: true,
				marginTop: marginTop,
				offset: offset,
				onClose: this.handleCancel,
				onKeyDown: this.handleKeyDown,
				onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter : null,
				onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave : null,
				targetElement: this.button
			},
			this.renderPopoverContent(customContent)
		) : null;
	},
	render: function render() {
		var _this3 = this;

		// Dropdowns are used by other components. The default trigger is a button, but some other components use `li` elements. The following allows `MenuDropdown` to be extended by providing a child component with the displayName of `DropdownTrigger`.
		var CurrentTrigger = _buttonTrigger2.default;
		var CustomTriggerChildProps = {};

		// Child elements that do not have the display name of the value of `MENU_DROPDOWN_TRIGGER` in `components/constants.js` will be considered custom content and rendered in the popover.
		var customContent = [];

		// Dropdown can take a Trigger component as a child and then return it as the parent DOM element.
		_react2.default.Children.forEach(this.props.children, function (child) {
			if (child && child.type.displayName === _constants.MENU_DROPDOWN_TRIGGER) {
				// `CustomTriggerChildProps` is not used by the default button Trigger, but by other triggers
				CustomTriggerChildProps = child.props;
				CurrentTrigger = child.type;
			} else {
				customContent.push(child);
			}
		});

		if (customContent.length === 0) {
			customContent = null;
		}
		/* Below are three sections of props:
   - The first are the props that may be given by the dropdown component. These may get deprecated in the future.
   - The next set of props (`CustomTriggerChildProps`) are props that can be overwritten by the end developer.
   - The final set are props that should not be overwritten, since they are ones that tie the trigger to the dropdown menu.
  */
		return _react2.default.createElement(CurrentTrigger, _extends({
			'aria-haspopup': 'true',
			assistiveText: this.props.assistiveText,
			className: this.props.buttonClassName,
			disabled: this.props.disabled,
			hint: this.props.hint,
			iconCategory: this.props.iconCategory,
			iconName: this.props.iconName,
			iconVariant: this.props.iconVariant,
			iconSize: this.props.iconSize,
			label: this.props.label,
			style: this.props.style,
			tabIndex: this.state.isOpen ? '-1' : '0',
			variant: this.props.buttonVariant,
			tooltip: this.props.tooltip

		}, CustomTriggerChildProps, {

			id: this.getId(),
			onBlur: this.props.openOn === 'hover' ? this.handleBlur : null,
			onClick: this.props.openOn === 'click' ? this.handleClick : null,
			onFocus: this.props.openOn === 'hover' ? this.handleFocus : null,
			onKeyDown: this.handleKeyDown,
			onMouseDown: this.props.openOn === 'click' ? this.handleMouseDown : null,
			onMouseEnter: this.props.openOn === 'hover' ? this.handleMouseEnter : null,
			onMouseLeave: this.props.openOn === 'hover' ? this.handleMouseLeave : null,
			ref: function ref(component) {
				_this3.button = component;
			},
			menu: this.props.modal ? this.renderModalPopover(customContent) : this.renderSimplePopover(customContent)
		}));
	}
});

module.exports = MenuDropdown;
module.exports.ListItem = _listItem2.default;
module.exports.ListItemLabel = _listItemLabel2.default;