'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ListItemLabel = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _dialog = require('../utilities/dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _menuList = require('../utilities/menu-list');

var _menuList2 = _interopRequireDefault(_menuList);

var _itemLabel = require('../utilities/menu-list/item-label');

var _itemLabel2 = _interopRequireDefault(_itemLabel);

var _pill = require('../utilities/pill');

var _pill2 = _interopRequireDefault(_pill);

var _keyboardNavigableMenu = require('../../utilities/keyboard-navigable-menu');

var _keyboardNavigableMenu2 = _interopRequireDefault(_keyboardNavigableMenu);

var _event = require('../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _keyCode = require('../../utilities/key-code');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ** MenuPicklist is deprecated. Please use a read-only Combobox instead.**
 *
 * The MenuPicklist component is a variant of the Lightning Design System Menu component.
 */


// ### Traits

// #### KeyboardNavigable


// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
var MenuPicklist = (0, _createReactClass2.default)({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.MENU_PICKLIST,

	// ### Prop Types
	propTypes: {
		/**
   * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
   */
		buttonRef: _propTypes2.default.func,
		className: _propTypes2.default.string,
		/**
   * If true, renders checkmark icon on the selected Menu Item.
   */
		checkmark: _propTypes2.default.bool,
		disabled: _propTypes2.default.bool,
		/**
   * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
   */
		errorText: _propTypes2.default.string,
		/**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
   */
		id: _propTypes2.default.string,
		/**
   * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
   */
		isInline: _propTypes2.default.bool,
		/**
   * Form element label
   */
		label: _propTypes2.default.string,
		/**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `multipleOptionsSelected`: Text to be used when multiple items are selected. "2 Options Selected" is a good pattern to use.
   */
		labels: _propTypes2.default.shape({
			multipleOptionsSelected: _propTypes2.default.string
		}),
		/**
   * Custom element that overrides the default Menu Item component.
   */
		listItemRenderer: _propTypes2.default.func,
		/**
   * Allows multiple items to be selected. Items will be shown in pills. Clicking the item does not close the menu.
   */
		multiple: _propTypes2.default.bool,
		/**
   * Triggered when the trigger button is clicked to open.
   */
		onClick: _propTypes2.default.func,
		/**
   * Triggered when an item is selected. Passes in the option object that has been selected and a data object in the format: `{ option, optionIndex }`. The first parameter may be deprecated in the future and changed to an event for consistency. Please use the data object.
   */
		onSelect: _propTypes2.default.func,
		/**
   * Triggered when a pill is removed. Passes in the option object that has been removed and a data object in the format: `{ option, optionIndex }`. The first parameter may be deprecated in the future and changed to an event for consistency. Please use the data object.
   */
		onPillRemove: _propTypes2.default.func,
		/**
   * Menu item data.
   */
		options: _propTypes2.default.array.isRequired,
		/**
   * Text present in trigger button if no items are selected.
   */
		placeholder: _propTypes2.default.string,
		/**
   * Add styling of a required form element.
   */
		required: _propTypes2.default.bool,
		/**
   * Current selected item.
   */
		value: _propTypes2.default.node
	},

	mixins: [_keyboardNavigableMenu2.default],

	getDefaultProps: function getDefaultProps() {
		return {
			inheritTargetWidth: true,
			placeholder: 'Select an Option',
			checkmark: true,
			labels: {
				multipleOptionsSelected: 'Multiple Options Selected'
			},
			menuPosition: 'absolute'
		};
	},
	getInitialState: function getInitialState() {
		return {
			focusedIndex: -1,
			selectedIndex: -1,
			selectedIndices: [],
			currentPillLabel: ''
		};
	},
	componentWillMount: function componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		(0, _checkProps2.default)(_constants.MENU_PICKLIST, this.props);

		this.generatedId = _shortid2.default.generate();
		if (this.props.errorText) {
			this.generatedErrorId = _shortid2.default.generate();
		}

		if (typeof window !== 'undefined') {
			window.addEventListener('click', this.closeOnClick, false);
		}

		if (!this.props.multiple) {
			this.setState({
				selectedIndex: this.getIndexByValue(this.props)
			});
		} else {
			var currentSelectedIndex = this.getIndexByValue(this.props);
			var currentIndices = this.state.selectedIndices;
			if (currentSelectedIndex !== -1) {
				currentIndices.push(currentSelectedIndex);
			}
			this.setState({
				selectedIndices: currentIndices
			});
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value || this.props.options.length !== nextProps.length) {
			if (this.props.multiple !== true) {
				this.setState({
					selectedIndex: this.getIndexByValue(nextProps)
				});
			} else {
				var currentSelectedIndex = this.getIndexByValue(nextProps);
				if (currentSelectedIndex !== -1) {
					var currentIndices = this.state.selectedIndices.concat(currentSelectedIndex);
					this.setState({
						selectedIndices: currentIndices
					});
				}
			}
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		this.isUnmounting = true;
		window.removeEventListener('click', this.closeOnClick, false);
	},
	getId: function getId() {
		return this.props.id || this.generatedId;
	},
	getErrorId: function getErrorId() {
		return this.props['aria-describedby'] || this.generatedErrorId;
	},
	getClickEventName: function getClickEventName() {
		return 'SLDS' + this.getId() + 'ClickEvent';
	},
	getIndexByValue: function getIndexByValue() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props,
		    value = _ref.value,
		    options = _ref.options;

		var foundIndex = -1;

		if (options && options.length) {
			options.some(function (element, index) {
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
		return this.props.listItemRenderer ? this.props.listItemRenderer : _itemLabel2.default;
	},
	setFocus: function setFocus() {
		if (!this.isUnmounting && this.button) {
			this.button.focus();
		}
	},
	handleSelect: function handleSelect(index) {
		if (!this.props.multiple) {
			this.setState({ selectedIndex: index });
			this.handleClose();
			this.setFocus();
		} else {
			var currentIndices = void 0;

			if (this.state.selectedIndices.indexOf(index) === -1) {
				currentIndices = this.state.selectedIndices.concat(index);
			} else {
				var deselectIndex = this.state.selectedIndices.indexOf(index);
				currentIndices = this.state.selectedIndices;
				currentIndices.splice(deselectIndex, 1);
			}

			this.setState({
				selectedIndices: currentIndices
			});
		}

		if (this.props.onSelect) {
			var option = this.getValueByIndex(index);
			this.props.onSelect(option, { option: option, optionIndex: index });
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
				this.props.onClick(event);
			}
		} else {
			this.handleClose();
		}
	},
	handleMouseDown: function handleMouseDown(event) {
		if (event) {
			_event2.default.trapImmediate(event);
			event.nativeEvent[this.getClickEventName()] = true;
		}
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode) {
			if (event.keyCode === _keyCode2.default.ENTER || event.keyCode === _keyCode2.default.SPACE || event.keyCode === _keyCode2.default.DOWN || event.keyCode === _keyCode2.default.UP) {
				_event2.default.trap(event);
			}

			if (event.keyCode !== _keyCode2.default.TAB) {
				// The outer div with onKeyDown is overriding button onClick so we need to add it here.
				var openMenuKeys = event.keyCode === _keyCode2.default.ENTER || event.keyCode === _keyCode2.default.DOWN || event.keyCode === _keyCode2.default.UP;
				var isTrigger = event.target.tagName === 'BUTTON';
				if (openMenuKeys && isTrigger && this.props.onClick) {
					this.props.onClick(event);
				}

				this.handleKeyboardNavigate({
					isOpen: this.state.isOpen || false,
					keyCode: event.keyCode,
					onSelect: this.handleSelect,
					toggleOpen: this.toggleOpen
				});
			} else {
				this.handleCancel();
			}
		}
	},
	handleCancel: function handleCancel() {
		this.setFocus();
		this.handleClose();
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

		if (index === this.state.focusedIndex) {
			this.handleKeyboardFocus(this.state.focusedIndex);
		}
	},


	// Trigger opens, closes, and recieves focus on close
	saveRefToTrigger: function saveRefToTrigger(trigger) {
		this.button = trigger;
		if (this.props.buttonRef) {
			this.props.buttonRef(this.button);
		}

		if (!this.state.triggerRendered) {
			this.setState({ triggerRendered: true });
		}
	},
	renderMenuContent: function renderMenuContent() {
		return _react2.default.createElement(_menuList2.default, {
			checkmark: this.props.checkmark,
			getListItemId: this.getListItemId,
			itemRefs: this.saveRefToListItem,
			itemRenderer: this.getListItemRenderer(),
			onCancel: this.handleCancel,
			onSelect: this.handleSelect,
			options: this.props.options,
			ref: this.saveRefToList,
			selectedIndex: !this.props.multiple ? this.state.selectedIndex : undefined,
			selectedIndices: this.props.multiple ? this.state.selectedIndices : undefined,
			triggerId: this.getId()
		});
	},
	renderInlineMenu: function renderInlineMenu() {
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
			this.renderMenuContent()
		) : null;
	},
	renderDialog: function renderDialog() {
		var _this = this;

		return !this.props.disabled && this.state.isOpen ? _react2.default.createElement(
			_dialog2.default,
			{
				closeOnTabKey: true,
				constrainToScrollParent: this.props.constrainToScrollParent,
				contentsClassName: 'slds-dropdown slds-dropdown--left',
				context: this.context,
				flippable: true,
				onClose: this.handleCancel,
				onKeyDown: this.handleKeyDown,
				onRequestTargetElement: function onRequestTargetElement() {
					return _this.button;
				},
				inheritTargetWidth: this.props.inheritTargetWidth,
				position: this.props.menuPosition
			},
			this.renderMenuContent()
		) : null;
	},
	renderTrigger: function renderTrigger() {
		var isInline = void 0;
		/* eslint-disable react/prop-types */
		if (this.props.isInline) {
			isInline = true;
		} else if (this.props.modal !== undefined) {
			isInline = !this.props.modal;
		}
		/* eslint-enable react/prop-types */

		var inputValue = void 0;
		if (this.props.multiple && this.state.selectedIndices.length === 0) {
			inputValue = this.props.placeholder;
		} else if (this.props.multiple && this.state.selectedIndices.length === 1) {
			var option = this.props.options[this.state.selectedIndices];
			inputValue = option.label;
		} else if (this.props.multiple && this.state.selectedIndices.length > 1) {
			inputValue = this.props.labels.multipleOptionsSelected;
		} else {
			var _option = this.props.options[this.state.selectedIndex];
			inputValue = _option && _option.label ? _option.label : this.props.placeholder;
		}

		// TODO: make use of <Button>
		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			_react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click', { 'slds-is-open': this.state.isOpen }, this.props.className),
					onKeyDown: this.handleKeyDown,
					onMouseDown: this.handleMouseDown
				},
				_react2.default.createElement(
					'button',
					{
						'aria-describedby': this.getErrorId(),
						'aria-expanded': this.state.isOpen,
						'aria-haspopup': 'true',
						className: 'slds-button slds-button--neutral slds-picklist__label',
						disabled: this.props.disabled,
						id: this.getId(),
						onClick: !this.props.disabled && this.handleClick,
						ref: this.saveRefToTrigger,
						tabIndex: this.state.isOpen ? -1 : 0,
						type: 'button'
					},
					_react2.default.createElement(
						'span',
						{ className: 'slds-truncate' },
						inputValue
					),
					_react2.default.createElement(_icon2.default, { name: 'down', category: 'utility' })
				),
				isInline ? this.renderInlineMenu() : this.renderDialog()
			)
		);
	},
	renderPills: function renderPills() {
		var _this2 = this;

		var selectedPills = this.state.selectedIndices.map(function (selectedPill) {
			var pillLabel = _this2.getValueByIndex(selectedPill).label;
			return _react2.default.createElement(
				'li',
				{
					className: 'slds-listbox__item',
					key: 'pill-' + selectedPill,
					role: 'presentation'
				},
				_react2.default.createElement(_pill2.default, {
					eventData: {
						item: _this2.props.options[selectedPill],
						index: selectedPill
					},
					events: {
						onRequestRemove: function onRequestRemove(event, data) {
							var newData = _this2.state.selectedIndices;
							var index = data.index;
							newData.splice(_this2.state.selectedIndices.indexOf(index), 1);
							_this2.setState({ selectedIndices: newData });

							if (_this2.props.onPillRemove) {
								var option = _this2.getValueByIndex(index);
								_this2.props.onPillRemove(option, {
									option: option,
									optionIndex: index
								});
							}
						}
					},
					labels: {
						label: pillLabel
					}
				})
			);
		});
		return _react2.default.createElement(
			'div',
			{
				id: 'listbox-selections-unique-id',
				orientation: 'horizontal',
				role: 'listbox'
			},
			_react2.default.createElement(
				'ul',
				{
					className: 'slds-listbox slds-listbox_inline slds-p-top_xxx-small',
					role: 'group',
					'aria-label': 'Selected Options:'
				},
				selectedPills
			)
		);
	},
	render: function render() {
		var _props = this.props,
		    className = _props.className,
		    errorText = _props.errorText,
		    label = _props.label,
		    required = _props.required;


		var requiredElem = required ? _react2.default.createElement(
			'span',
			{ style: { color: 'red' } },
			'* '
		) : null;

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-form-element', {
					'slds-has-error': errorText
				}, className)
			},
			this.props.label ? _react2.default.createElement(
				'label',
				{
					className: 'slds-form-element__label',
					htmlFor: this.getId()
					// inline style override
					, style: { width: '100%' }
				},
				requiredElem,
				label
			) : null,
			this.renderTrigger(),
			this.renderPills(),
			errorText && _react2.default.createElement(
				'div',
				{ id: this.getErrorId(), className: 'slds-form-element__help' },
				errorText
			)
		);
	}
});

// ### Children


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Picklist Component

// Implements the [Picklist design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-picklist) in React.
// Based on SLDS v2.1.0-rc.2

// ### React


MenuPicklist.contextTypes = {
	iconPath: _propTypes2.default.string
};

exports.default = MenuPicklist;
exports.ListItemLabel = _itemLabel2.default;