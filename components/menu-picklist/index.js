define(['module', 'react', 'react-dom', 'classnames', 'shortid', '../popover', '../icon', '../menu-list/list', '../menu-list/list-item-label', '../../utilities/keyboard-navigable', '../../utilities', '../../utilities/constants'], function (module, _react, _reactDom, _classnames, _shortid, _popover, _icon, _list, _listItemLabel, _keyboardNavigable, _utilities, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shortid2 = _interopRequireDefault(_shortid);

	var _popover2 = _interopRequireDefault(_popover);

	var _icon2 = _interopRequireDefault(_icon);

	var _list2 = _interopRequireDefault(_list);

	var _listItemLabel2 = _interopRequireDefault(_listItemLabel);

	var _keyboardNavigable2 = _interopRequireDefault(_keyboardNavigable);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * The MenuPicklist component is a variant of the Lightning Design System Menu component.
  */


	// ### shortid
	// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
	// shortid is a short, non-sequential, url-friendly, unique id generator
	var MenuPicklist = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.MENU_PICKLIST,

		mixins: [_keyboardNavigable2.default],

		// ### Prop Types
		propTypes: {
			className: _react.PropTypes.string,
			/**
    * If true, renders checkmark icon on the selected Menu Item.
    */
			checkmark: _react.PropTypes.bool,
			disabled: _react.PropTypes.bool,
			/**
    * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
    */
			id: _react.PropTypes.string,
			label: _react.PropTypes.string,
			/**
    * Custom element that overrides the default Menu Item component.
    */
			listItemRenderer: _react.PropTypes.func,
			/**
    * If true, component renders specifically to work inside Modal.
    */
			modal: _react.PropTypes.bool,
			onClick: _react.PropTypes.func,
			onSelect: _react.PropTypes.func,
			/**
    * Menu item data.
    */
			options: _react.PropTypes.array.isRequired,
			placeholder: _react.PropTypes.string,
			required: _react.PropTypes.bool,
			/**
    * Current selected item.
    */
			value: _react.PropTypes.node
		},

		getDefaultProps: function getDefaultProps() {
			return {
				constrainToScrollParent: false,
				disabled: false,
				inheritTargetWidth: true,
				modal: true,
				required: false,
				placeholder: 'Select an Option',
				checkmark: true
			};
		},
		getInitialState: function getInitialState() {
			return {
				focusedIndex: -1,
				selectedIndex: -1
			};
		},
		componentWillMount: function componentWillMount() {
			this.generatedId = _shortid2.default.generate();

			window.addEventListener('click', this.closeOnClick, false);

			this.setState({
				selectedIndex: this.getIndexByValue(this.props.value)
			});
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (this.props.value !== nextProps.value) {
				this.setState({
					selectedIndex: this.getIndexByValue(nextProps.value)
				});
			}
		},
		componentWillUnmount: function componentWillUnmount() {
			this.isUnmounting = true;

			window.removeEventListener('click', this.closeOnClick, false);
		},
		getId: function getId() {
			return this.props.id || this.generatedId;
		},
		getClickEventName: function getClickEventName() {
			return 'SLDS' + this.getId() + 'ClickEvent';
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
		handleSelect: function handleSelect(index) {
			this.setState({ selectedIndex: index });
			this.handleClose();
			this.setFocus();

			if (this.props.onSelect) {
				this.props.onSelect(this.getValueByIndex(index));
			}
		},
		handleClose: function handleClose() {
			this.setState({ isOpen: false });
		},
		handleClick: function handleClick(event) {
			if (event) {
				event.nativeEvent[this.getClickEventName()] = true;
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
				event.nativeEvent[this.getClickEventName()] = true;
			}
		},
		setFocus: function setFocus() {
			if (!this.isUnmounting && this.button) {
				_reactDom2.default.findDOMNode(this.button).focus();
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
			}
		},
		handleCancel: function handleCancel() {
			this.setFocus();
		},
		closeOnClick: function closeOnClick(event) {
			if (!event[this.getClickEventName()] && this.state.isOpen) {
				this.handleClose();
			}
		},
		toggleOpen: function toggleOpen() {
			this.setState({ isOpen: !this.state.isOpen });
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
		renderPopoverContent: function renderPopoverContent() {
			return _react2.default.createElement(_list2.default, {
				checkmark: this.props.checkmark,
				getListItemId: this.getListItemId,
				itemRefs: this.saveRefToListItem,
				itemRenderer: this.getListItemRenderer(),
				onCancel: this.handleCancel,
				onSelect: this.handleSelect,
				options: this.props.options,
				ref: this.saveRefToList,
				selectedIndex: this.state.selectedIndex,
				triggerId: this.getId()
			});
		},
		renderSimplePopover: function renderSimplePopover() {
			return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
				'div',
				{
					className: 'slds-dropdown slds-dropdown--left'
					// inline style override
					, style: {
						maxHeight: '20em',
						overflowX: 'hidden',
						minWidth: '100%'
					}
				},
				this.renderPopoverContent()
			) : null;
		},
		renderModalPopover: function renderModalPopover() {
			return !this.props.disabled && this.state.isOpen && this.button ? _react2.default.createElement(
				_popover2.default,
				{
					className: 'slds-dropdown slds-dropdown--left',
					closeOnTabKey: true,
					constrainToScrollParent: this.props.constrainToScrollParent,
					flippable: true,
					onClose: this.handleCancel,
					onKeyDown: this.handleKeyDown,
					targetElement: this.button,
					inheritTargetWidth: this.props.inheritTargetWidth
				},
				this.renderPopoverContent()
			) : null;
		},
		renderPlaceholder: function renderPlaceholder() {
			var option = this.props.options[this.state.selectedIndex];
			return option && option.label ? option.label : this.props.placeholder;
		},
		renderTrigger: function renderTrigger() {
			var _this = this;

			return _react2.default.createElement(
				'div',
				{
					'aria-expanded': this.state.isOpen,
					className: (0, _classnames2.default)('slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click', { 'slds-is-open': this.state.isOpen }, this.props.className),
					onKeyDown: this.handleKeyDown,
					onMouseDown: this.handleMouseDown
				},
				_react2.default.createElement(
					'button',
					{
						'aria-haspopup': 'true',
						'aria-activedescendant': '',
						className: 'slds-button slds-button--neutral slds-picklist__label',
						id: this.getId(),
						disabled: this.props.disabled,
						onClick: this.handleClick,
						ref: function ref(component) {
							_this.button = component;
						},
						tabIndex: this.state.isOpen ? -1 : 0
					},
					_react2.default.createElement(
						'span',
						{ className: 'slds-truncate' },
						this.renderPlaceholder()
					),
					_react2.default.createElement(_icon2.default, { name: 'down', category: 'utility' })
				),
				this.props.modal ? this.renderModalPopover() : this.renderSimplePopover()
			);
		},
		render: function render() {
			if (this.props.label) {
				var required = this.props.required ? _react2.default.createElement(
					'span',
					{ style: { color: 'red' } },
					'* '
				) : null;

				return _react2.default.createElement(
					'div',
					{ className: 'slds-form-element' },
					_react2.default.createElement(
						'label',
						{
							className: 'slds-form-element__label',
							htmlFor: this.getId()
							// inline style override
							, style: { width: '100%' }
						},
						required,
						this.props.label
					),
					this.renderTrigger()
				);
			}

			return this.renderTrigger();
		}
	});

	// ### Traits

	// #### KeyboardNavigable


	// ### Children


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
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	// # Picklist Component

	// Implements the [Picklist design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-picklist) in React.
	// Based on SLDS v2.1.0-rc.2

	// ### React


	module.exports = MenuPicklist;
	module.exports.ListItemLabel = _listItemLabel2.default;
});